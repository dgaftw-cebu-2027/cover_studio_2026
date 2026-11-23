// Makes sure the project's src/ folder exists. If folder uploads failed, it is restored from app-bundle.zip
// (a single file that always uploads). Uses ONLY Node's built-in modules, so it runs anywhere Node runs,
// even before "npm install". Safe to run any number of times.
//   FORCE_UNPACK=1 node unpack-bundle.mjs   -> re-extract over existing folders (used when updating).
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const has = (p) => fs.existsSync(p);

function readZip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 70000); i--) if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error("app-bundle.zip is not a valid zip file (it may have been damaged or opened/re-saved).");
  const count = buf.readUInt16LE(eocd + 10); let p = buf.readUInt32LE(eocd + 16); const out = [];
  for (let k = 0; k < count; k++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error("zip directory is corrupt");
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20), nlen = buf.readUInt16LE(p + 28), elen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32), lho = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nlen); p += 46 + nlen + elen + clen;
    if (name.endsWith("/")) continue;
    const start = lho + 30 + buf.readUInt16LE(lho + 26) + buf.readUInt16LE(lho + 28); const raw = buf.subarray(start, start + csize);
    out.push({ name, data: method === 0 ? raw : method === 8 ? zlib.inflateRawSync(raw) : (() => { throw new Error("unsupported zip compression"); })() });
  }
  return out;
}

export async function ensureProject() {
  const force = !!process.env.FORCE_UNPACK;
  if (!force && (has("src/app/page.tsx") || has("app/page.tsx"))) { console.log("[unpack] src/app found - nothing to unpack."); return; }
  if (!has("app-bundle.zip")) throw new Error("[unpack] The 'src' folder is missing AND app-bundle.zip was not found. Put app-bundle.zip in the project root (not inside a folder).");
  let n = 0;
  for (const { name, data } of readZip(fs.readFileSync("app-bundle.zip"))) {
    if (name.includes("..") || path.isAbsolute(name)) continue; // safety
    fs.mkdirSync(path.dirname(name), { recursive: true }); fs.writeFileSync(name, data); n++;
  }
  console.log(`[unpack] unpacked ${n} files from app-bundle.zip`);
  if (!has("src/app/page.tsx")) throw new Error("[unpack] bundle did not contain src/app/page.tsx");
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  ensureProject().catch((e) => { console.error(e.message); process.exit(1); });
}
