# Old website migration

Source: https://rckasthamandap.org.np/ — public WordPress pages, posts, REST API and media. Retrieved 22 October 2026. No login or private records were accessed.

## Imported inventory

| Source | Preserved | New website use |
| --- | ---: | --- |
| Published pages | 12 | About, meetings, directory, partner teams and expandable source pages in `/archive` |
| Published reports | 12 | Full article text in News and Projects & activities, with original source links |
| Media originals | 143 | All downloaded locally, indexed in `/archive`, SHA-256 hashes retained |
| Bulletin PDF files | 27 | Searchable full extracted text and original PDF downloads in `/archive`; alternate versions retained |
| Event gallery images | 83 | Real Silver Jubilee photographs in Gallery and Home |
| Rotary directory/board/honorary people | 65 | Members, sourced portraits, historical roles and recognitions; one canonical Sailesh profile |
| Historical board roles | 23 | Dated archival board, separate from current BOD |
| Identified past presidents | 22 | Past Presidents tab and Presidents page; shared member identities |
| Explicit Major Donors | 3 | Major Donors tab (Om Rajbhandary, Umesh Shrestha, Upendra Poudyal) |
| Partner board entries | 26 | Separate Rotaract and Interact archive sections |

All 143 original media downloads succeeded (76,586,636 bytes). Bulletin count is files, including versions, not a claim of 27 unique monthly issues. WordPress categories and tags, raw HTML, page/post metadata, OCR output and extracted PDF text are also retained. Historical material inside bulletins remains readable and searchable in the bulletin archive rather than being automatically asserted as present-day member data.

## What changed

- Replaced sample members, invented president histories, mock news/projects and stock gallery pictures with sourced content. Previous fixtures are retained only in `data/legacy/site-before-import.ts` for reference.
- Preserved the current club president, District Governor and RI President confirmed by the user, their new portraits, the draft leadership messages, supplied coordinates and corrected club logo. Historical reports retain historical titles in their original context.
- The public current-year BOD contains only the confirmed Sailesh appointment. Other imported people appear in the dated general directory, including honorary members; their current membership has not been independently verified.
- Member portraits are SVG viewBox presentations of original scans. No faces were generated or enhanced. A new member photo can replace `image`; remove that member's `photoCrop` at the same time. Sailesh already uses the supplied clear portrait everywhere.
- Added real event content, source URLs, separate event/publication dates, an All years project filter, B.S.-date fallback, source-based About milestones, the club number 56011, archived meeting details and executive secretary contact. Metadata uses the club's `.org.np` domain.
- Global member-search links open the relevant profile; member search finds people across tabs. Gallery anchors identify imported photos. Footer, News and About link to the new archive.
- Archive includes all original files, the 12 source pages, full-text bulletin search, historical Rotary board, partner teams and source discrepancy notes.

## Source precedence and items to confirm

1. The souvenir footer says **2024–25**, while directory filenames say **2025–26**. Historical appointments are not treated as the 2026–27 board. Please supply the remaining current BOD and confirm the current membership list.
2. The Jubilee banner photographs also establish the charter date, **27 June 2001**, and additional presidential tenures. Documented years include Sophie Upadhya (2024–25), Nepal Bhushan Chand (2021–22), Kamal Raj Rupakheti (2020–21), Binod Singh (2019–20), Prabhu Ram Bhandary (2015–16), Sajjan Bar Singh Thapa (2017–18), Milan Bikram Shah (2012–13), Upendra Poudyal (2013–14), Yadab Pradhan (2022–23), Om Rajbhandary (2023–24), and the January 2026 presidency of Manohar Lal Shrestha (shown under 2025–26, with the event evidence explained). Other confirmed former presidents have **Tenure not recorded**. Gajendra Bdr. Shrestha is identified as charter president. Clearly readable banner dates are transcribed; obscured labels are left unassigned.
3. No reliable member departure dates were found. Fabricated former-member fixtures have been removed. The Past Members tab remains available with an explanatory empty state.
4. OCR-derived occupations, organization/address lines and contact/family fields can contain mistakes. Raw entry text is preserved in the data, and original source scans are linked from profiles. Personal contact display remains disabled (`showContact: false`) pending review. PHF/MPHF/PHS are not classified as Major Donor.
5. The public executive secretary contact is Purushottam Acharya, **+977 9851050272**, **purushottam19720417@gmail.com**, transcribed from the clear directory entry. Old About emails are malformed. The site identifies this as archived contact information; confirm current availability.
6. Previously published Rotary meetings: Friday 8–9 a.m., Radisson Hotel, Lazimpat. Confirm before visiting. Rotaract pages disagree between 9:30–10:30 and 10–11 a.m.; both original texts remain in the archive. The user-supplied map pin is retained separately from meeting venue text.
7. Two distinct honorary portraits are both labelled Kazuo Arai. The source is preserved; the profile uses a neutral placeholder pending clarification. Ashma Kumari KC is identified as an honorary member in the source.
8. Some partner-board labels are low resolution. Rotaract transcriptions are explicitly provisional; the original board scan is authoritative. Partner boards remain separate from Rotary members.
9. Reports often describe 2022–23 events but have 2025 upload/publication dates. Event and publication dates are shown separately. The Itahara report's **12 Kartik 2079 B.S.** is retained without guessing a Gregorian conversion. Multi-day reports have their first event date for sorting; the full report preserves the range.
10. New photos are needed for the low-resolution directory portraits. Kazuo's ambiguous portrait is the only neutral member-photo placeholder. Reports without source photography use a clearly generic archive illustration, not an invented event photograph.
11. The charter date supports 25 years of service in 2026. The other previously requested Home impact totals (84 projects / 60 active members / 18k+ lives / $1M+) remain editorial values and are **not verified by this archive extraction**. The 65 imported directory identities must not be interpreted as the current active-member total. Leadership messages remain marked as drafts, as requested.
12. Original website graphics and stock assets are retained in the source-media index for completeness; they are not presented as newly verified club-event photographs. Empty old pages remain noted as empty; content was not invented for them.

## Files and repeatability

- `scripts/import_legacy.py`: public API snapshots, original media downloads and manifest. Requires Python `requests`; existing snapshots/downloads are reused.
- `scripts/normalize_legacy.py`: rerun from repository root to rebuild `src/data/legacy-content.json`, `src/data/legacy-documents.json` and the normalized snapshot from retained source files. Manual roster names, photo coordinates, role associations and event dates are kept in this script.
- `scripts/validate_legacy.py`: standard-library-only integrity and consistency checks. Run `python3 scripts/validate_legacy.py`.
- `data/legacy/raw/`: published API collections and source HTML; `data/legacy/ocr/`: Tesseract text/TSV; `data/legacy/text/`: PDF text. Original binary assets: `public/legacy/media/`.
- Text extraction used Tesseract English and Python `pypdf`. These were extracted into temporary tooling directories; no app dependencies were added. Retained OCR/PDF text makes normalization repeatable without installing them again.
- `src/data/legacy-media.json`: compact public index of all 143 original files.
- `src/data/site.ts`: canonical application mapping, current leadership precedence, membership/recognition tabs and shared search data.

## Validation

- Production build and TypeScript check.
- Every original file checked against recorded size and SHA-256; IDs unique, all source portraits within image bounds, all report images present, all bulletin texts nonempty.
- Browser checks at Home widths 390, 1366, 1440 and 1920 px; directory tabs/counts, real portrait modal, Esc and focus return, linked member opening, Sailesh consistency, bulletin full-text/empty search, project year/date filtering, full report pages, gallery viewer, presidents, About and Contact.
- No application exceptions or failed local HTTP responses in those browser checks. Development preview: http://localhost:3001.

This is an inventory of the public material exposed by the old site at extraction time, not evidence that unpublished, deleted or offsite records have been recovered.

## Publication and profile presentation update

- Club Archive now has a main desktop/mobile header link. Its public page focuses on bulletins, a future annual Souvenirs collection and historical Rotary boards. Partner boards, raw media/page inventories and source notes were removed from the public archive UI as requested; all original source files remain preserved locally.
- The 27 PDF variants are grouped into 23 month/year issues, with alternate editions accessible within each issue. Full-text search and year filtering are available.
- The user confirmed PHF for every member. Secondary card/profile tags also reflect the original 19 MPHF, 3 Major Donor and 1 PHS records. Fourteen explicit historical PHF+ levels are recorded in `src/data/member-recognitions.json`, with source links and recorded-year labels; no eligibility ranges or unsupported citations were assigned.
- Further research: Rotary District Directory 2020–21, printed pages 359–360, supplied additional PHF levels and exact CP/presidency years. The local PDF and relevant extracted text are retained in `data/legacy/district-directory-2020.pdf` and `district-directory-2020-excerpt.txt`. Public URL: https://www.rotary3292news.com/wp-content/uploads/2020/08/District-Directory-of-RID-3292-2020-21-2nd-Part.pdf .
- Members and Presidents share 20 documented historical years in ascending order. Pradeep Kumar Shrestha and Umesh Shrestha remain in a separate additional-presidents group pending precise tenure confirmation; the district directory prints Umesh’s range as the invalid `2020-11`, which was not silently corrected. See `data/legacy/recognition-research.md`.
- The Presidents page now features the current president separately, with a consistent historical portrait grid and an accessible profile dialog.
- Three sample 2026–27 project plans were added at the user's request. These have clear draft labels, neutral vector illustrations, no invented dates/budgets/outcomes and working detail pages. The B.S.-date filter option was removed; the underlying historical report and its original date are retained.
