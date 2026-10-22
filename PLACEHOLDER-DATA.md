# Content still awaiting replacement or confirmation

The old sample member/president/project/news/gallery records have been replaced with the previous club website's published material. See `LEGACY-MIGRATION.md` for the inventory, provenance and source conflicts. The original fixtures are preserved only in `data/legacy/site-before-import.ts`.

- Replace low-resolution member portraits with clear photos. Set a member's `image` to the new photo and remove `photoCrop`; imported directory originals remain in the archive.
- Clarify the Kazuo Arai honorary portrait: the source labels two different portraits with the same name. A neutral silhouette is used until clarified.
- Supply the rest of the confirmed 2026–27 BOD, membership changes and former-member departure dates. Historical board offices are not promoted to current offices.
- Review source OCR classifications, address/organization lines and contacts before enabling `showContact`. Partner-board transcriptions, especially Rotaract, need checking against the original scan.
- Approve or replace the two drafted leadership messages.
- Confirm the retained Home impact totals: 84 projects, 60 active members, 18k+ lives and $1M+ contributions. These are not derived from the recovered archive.
- Confirm the archived executive secretary contact and published meeting schedule.
- Reports without source photos use `/images/legacy-article.svg`, a generic archive illustration. Add genuine event photos when available.

The club logo, Rotaract/Interact icons and three current leader photos have already been supplied; they are no longer placeholders.

- Three current-year sample project plans await replacement/approval: Community Health Outreach, Learning Without Barriers, and Fellowship Through Service. Their scope, venues, partners, dates and budgets are unconfirmed.
- Annual souvenirs can be added to `souvenirs` in `src/data/site.ts` with title, year, PDF file and description. No souvenir PDF has been supplied yet.
- Pradeep Kumar Shrestha and Umesh Shrestha need confirmed presidency years before insertion into the dated sequence.
