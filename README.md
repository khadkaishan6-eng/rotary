# Rotary Club of Kasthamandap

A Next.js App Router site for Rotary Club of Kasthamandap, District 3292. The project is intentionally content-first: editors can update `src/data/site.ts` without touching page layout code.

## Local setup

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Start the site with `npm run dev`.
4. Open `http://localhost:3000`.

## Content editing

- Add or update projects in `src/data/site.ts` inside `projects`.
- Set one project to `featured: true` to control the Home flagship feature.
- Add news stories to `news`; the Home page shows the first three.
- Replace Unsplash URLs with final image URLs or a future local `/public/images` path.
- Update impact numbers and contact details in the `site` object.
- Set `anniversaryPopup` to `true` when the 25th anniversary notice should be enabled.

The remaining page sections (projects, gallery, members, news, contact, join, donate and quiz) are designed to build on the shared components and the same data pattern.

## Deployment

Run `npm run build` locally before deploying. Deploy the repository to Vercel, attach `rckasthamandap.org` in the project domain settings, and update DNS at the domain registrar using the records Vercel provides.

## Accessibility and SEO

The site uses semantic sections, visible focus-compatible controls, descriptive link labels, responsive layouts, metadata, and a readable color contrast palette. Add final Open Graph imagery in `src/app/layout.tsx` when the official club photography is ready.
