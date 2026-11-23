# Workflow: Cover & Blurb Studio (for prospective clients)

A worked example of a manuscript-to-marketing pipeline built entirely on free tiers. It was built for an author with more than 80 published titles who needed fresh covers and descriptions for existing books.

## The problem
Back-catalog books keep old covers and weak descriptions. Redoing them one by one with a designer is slow and expensive. The author needed a repeatable process that works from the finished files he already has.

## The pipeline
| Stage | What happens | Tool |
|---|---|---|
| 1. Intake | Drag in PDF, Word or EPUB files, singly or in bulk. Title and author are detected. | Browser upload straight to private storage |
| 2. Read | Text is extracted and split into chunks, with progress saved so a rate limit never loses work. | unpdf, mammoth, custom EPUB reader |
| 3. Understand | A brief is produced: themes, audience, tone, setting. The author can edit it. | Groq (Llama 3.3 70B) |
| 4. Concepts | Three distinct cover concepts and three blurb versions. | Groq, then FLUX.1-schnell for artwork |
| 5. Steer | "Regenerate closer to my idea" with a note, a daily quota counter, and manual upload as a fallback. | App-wide quota with refund on failure |
| 6. Market | Tags, search phrases, topics, categories, audiences, hooks. | Groq |
| 7. Typeset | Title and author lettering rendered separately from the artwork. | Canvas, client side |
| 8. Validate and export | Sizes checked against Amazon KDP and IngramSpark rules; ebook JPEG, print wrap PDF, blurb and metadata exported as a ZIP. | pdf-lib, jszip |
| 9. Keep | Named design snapshots saved so they can be reopened and changed. | Supabase Postgres |
| 10. Stay current | A monthly check flags changes on the publishers' requirement pages. | Vercel cron |

## What I delivered
- A private, login-protected web app on a free hosting stack, with a one-page visual walkthrough for the non-technical user.
- Publisher rules read from the official pages, with the unknowns labeled and not guessed.
- Security: private storage, per-user data rules, a health endpoint that reports configuration problems without revealing secrets, and a dependency audit with no open findings.
- A developer handoff document so another engineer can pick it up.

## Honest limits
- Print wraps export as RGB; IngramSpark needs CMYK, so the app labels that output not upload-ready until converted.
- Free-tier AI is rate limited: a full book takes about 10 to 15 minutes.
- The end-to-end live test with real AI keys was still pending when this was written.

## Adapting it
The same pipeline pattern (intake, chunked analysis, human-in-the-loop choices, validated export) fits any document-to-deliverable workflow. If you have one, get in touch.
