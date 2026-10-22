# Website logo assets

Installed assets:

- `public/logos/logo-club.png`: temple/club artwork corrected to read Rotary Club of Kasthamandap, including ROTARY CLUB on the medallion; transparent PNG.
- `public/logos/icon-rotaract.png`: supplied pink Rotaract wheel. Original already had alpha transparency; copied without altering the artwork.
- `public/logos/icon-interact.png`: supplied blue Interact wheel, white background removed; transparent PNG.

The header and footer use these exact paths. Logos have no container background, badge or border. The club artwork has no glow, drop shadow or filter. Header, footer and favicon all use the same corrected asset.

Background removal used the built-in image generation/editing tool. Original inputs remain unchanged in Downloads. Final prompts:

## Club logo

Use case: background-extraction. Edit target: the supplied club logo. Remove the white background completely to genuine alpha transparency, including white empty spaces around and between the artwork. Preserve the temple illustration, statue, red/gold Rotaract medallion and exact red wording 'Rotaract Club of Kasthamandap', their original colors, arrangement and aspect proportions. Do not redesign, add or change any text or objects. Keep fine black linework and intentional white highlights inside the illustration. Crop excess transparent outer margins to the content with a small clear padding. This is a transparent website logo asset, not a mockup; no background, glow, shadow or presentation surface.

## Interact wheel

Use case: background-extraction. Edit target: supplied blue Interact wheel logo. Remove every white background area to genuine alpha transparency, including spaces between spokes and rings and exterior. Preserve the exact blue/cyan wheel silhouette, teeth, spokes, central shape, geometry and proportions and original blue color. Do not redesign, recolor, add text or embellishments. Tight square crop with small transparent outer padding. Output just the wheel on transparency, no shadow, white edge, glow, checkerboard, badge or background.

# Installed leadership portraits

Transparent portraits from the supplied photographs are installed at:

- `public/images/leaders/rotary-club-president.png`: Sailesh Vaidya, sky-blue blazer; President, Rotary Club of Kasthamandap.
- `public/images/leaders/district-governor.png`: Vishnu Bdr. Karkee, dark-blue blazer; District Governor, Rotary District 3292.
- `public/images/leaders/ri-president.png`: Olayinka Hakeem Babalola, black outfit and patterned hat; President, Rotary International.

Names and offices were supplied by the user. Each image uses the same 1086 × 1448 transparent canvas. Individual `portrait.height` and `portrait.bottom` values in `src/data/site.ts` align the eye and chin levels without stretching or clipping the hat. Bottom alpha fades blend the torso crops into the hero. The Home messages now use Sailesh and District Governor Vishnu Bdr. Karkee, with user-requested draft text. Sailesh's member, current-year president and About profiles use the same club-president name and portrait.

Background extraction used the built-in image generation/editing tool. Full prompts are in `LEADER-IMAGE-PROMPTS.md`. The SVG silhouette remains a fallback for future missing assets. Each Rotary year, replace the photos and update names/organizations and portrait alignment in the leaders array, then rebuild/restart.

## Rotary identity correction prompt

Built-in image editing tool; saved to `public/logos/logo-club.png`.

Use case: text-localization / precise-object-edit. Edit target: the supplied transparent temple club logo. Correct the club identity from Rotaract to Rotary. Change the bottom red wording to exactly 'Rotary Club of Kasthamandap' (with clear spaces, correct spelling). Change the gold lettering around the red/gold medallion from ROTARACT CLUB to exactly ROTARY CLUB. Preserve the temple, statue, medallion's globe, original colors, black linework and arrangement. Change only this wording; no other embellishments, shadow or glow. Keep a genuinely transparent alpha background with no white or black rectangle. Crop excess empty transparent outer margins to a small even padding. Output a crisp transparent PNG suitable for the website header and footer.

# Shared website content

`src/data/site.ts` provides the club name, current Rotary year, board label, leadership, draft messages and location. Home, Members, Presidents, About, Contact, metadata and search consume these records. The map and map link derive from one coordinate pair: 27.720033572533616, 85.32123231349269. The current president's profile has no mock achievements, join date or personal contact details. Historical sample records have been replaced by sourced old-site records; see `LEGACY-MIGRATION.md` for provenance, source discrepancies and remaining confirmations.
