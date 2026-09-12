# AquaTerra Recaps

A standalone monthly recap / digital-magazine site for AquaTerra, built with
React, Vite, Tailwind CSS v4 and React Router.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL and go to `/recaps`.

## Where things live

- `src/data/editions.js` — **the only file you need to touch to add or edit
  a monthly edition.** Every page (archive grid + individual edition pages)
  renders from this one data object — there's no per-month page component.
- `public/recaps/<year>/<month>/` — drop real photos here, then point a
  data entry's `src` field at the file path. Until `src` is set, the
  `<Photo>` component shows an on-brand placeholder tile instead.
- `src/components/` — all UI building blocks (hero, grid, cards, gallery,
  lightbox, impact section, etc.), each reusable across every edition.
- `src/pages/RecapArchive.jsx` and `src/pages/EditionPage.jsx` — the two
  routes: `/recaps` and `/recaps/:year/:month`.

## Adding a new month

1. Open `src/data/editions.js`.
2. Copy an existing month's object (e.g. `"2026-08"`), rename the key to
   `"2026-09"`, and update `slug`, `month`, `editionNumber`, and content.
3. Save — the archive grid and month navigation pick it up automatically.

## Replacing placeholder content

Everything in brackets (`[Project name]`, `[Number]`, etc.) is placeholder
copy — none of it is real AquaTerra data. Search `src/data/editions.js` for
`[` to find every field that still needs real content or photography.
