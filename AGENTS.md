<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project content and styling rules

- This website represents **Rotary Club of Kasthamandap**, not Rotaract. Keep the separate Rotaract and Interact partner links and wheel logos.
- Treat `src/data/site.ts` as the shared source for club identity, leadership, messages and contact/location details. Apply new user-supplied facts across all affected pages and search results; do not update only one visible section.
- Sailesh Vaidya is the club president for RY 2026–27. Home leadership, messages, member profiles, president history and About leadership must use the shared club president record and portrait. Vishnu Bdr. Karkee is the District Governor of District 3292. Olayinka Hakeem Babalola is the RI President.
- Use the supplied club location: latitude `27.720033572533616`, longitude `85.32123231349269`; derive map embeds and location links from shared contact data.
- Keep styling restrained: no logo glow, blurred section fades or automatic spotlight animations. Retain the navy, gold and white interface palette.
- Current message text was drafted at the user's request and should remain labelled as draft until approved text is provided. Never attach mock personal contact details or fabricated achievements to confirmed leaders.
- When changing these shared facts, verify Home, Members, Presidents, About, Contact, header/footer, metadata and search as applicable.

## Legacy content provenance

- Original public WordPress snapshots, OCR and PDF text are preserved in `data/legacy`; original media are in `public/legacy/media`. Do not delete source records when correcting a transcription.
- `scripts/normalize_legacy.py` produces the imported JSON; make source-transcription corrections there so rerunning it preserves fixes. `scripts/validate_legacy.py` checks counts, uniqueness, portrait bounds and every downloaded file hash.
- Historical directory/board years conflict. Keep archived appointments dated and separate from the confirmed 2026–27 BOD. Never infer departure dates or precise presidential tenures from PP/IPP alone.
- PHF, MPHF and PHS do not imply Major Donor; only the three explicit MD records have that flag.
- Source-derived contact OCR requires review before enabling `showContact`. Portraits use SVG viewBoxes over original directory scans; replace a member image and remove `photoCrop` when a new portrait arrives.
- Keep current leadership, supplied map coordinates and draft leadership messages ahead of conflicting historical references. See `LEGACY-MIGRATION.md`.

## Publications, recognition and current plans

- Club Archive is a main header destination for bulletins, annual souvenirs and Rotary board history. Do not restore the removed partner-board sections, raw media inventory or source-notes section to its public UI. Keep originals locally for provenance.
- The user confirmed a baseline Paul Harris Fellow tag for all members. Keep it secondary to name and role. Additional recognitions must have evidence; `src/data/member-recognitions.json` records dated PHF levels from the published district directory. A recorded year is not an award date. Do not infer eligibility periods, citations or numbered levels.
- Presidency order is shared through `pastPresidents` / `presidentById`, charter first and then ascending Rotary years. Separate unverified tenures instead of guessing their position.
- The user requested current-year project fillers. Three clearly marked sample plans are in shared project data; do not present them as approved work, completed achievements, real dates or actual funding.
