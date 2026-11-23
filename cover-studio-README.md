# Cover & Blurb Studio

A private web app that takes a finished manuscript (PDF, Word or EPUB) and produces three new cover options, rewritten back-cover blurbs and marketing intel, then exports publisher-ready cover files for Amazon KDP and IngramSpark.

**Built for:** an author with 80+ published titles who needed new covers and descriptions for his back catalog.
**Status:** deployed and working (login, health check). The end-to-end test with real AI keys is pending.
**Source code:** https://github.com/abenewmeyer/herbmarlowbooks

## Highlights
- Upload-first: drop one book or many; no manual data entry
- Three distinct covers plus blurbs side by side; regenerate closer to the author's idea, with a daily quota counter
- Marketing intel: tags, topics, audiences, search phrases
- KDP and IngramSpark size checks from officially read rules; unknown rules left unknown
- Saved designs, editable later
- Zero paid services: Next.js 16, Vercel, Supabase, Groq, Hugging Face

## Stack
Next.js 16 / React 19 / TypeScript, Supabase (auth, Postgres with row-level security, private storage), Groq Llama 3.3 70B, FLUX.1-schnell, pdf-lib, jszip, Vercel.

## Workflows
- [For the author (Dr. Marlow)](workflow-dr-marlow.md)
- [For prospective clients](workflow-client.md)

## Limits
Print covers export as RGB (IngramSpark needs CMYK; flagged in-app). Interior typesetting and EPUB production are not included.
