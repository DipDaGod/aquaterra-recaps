# AquaTerra Recaps

A standalone monthly recap / digital-magazine site for AquaTerra, built with
React 19, Vite, Tailwind CSS v4 and React Router.

**Read `CLAUDE.md` before changing anything.** It carries the non-negotiable
rules for this repo — chiefly: never invent an AquaTerra fact — plus the design
system, the voice, how to add an edition, and the decisions already made.

## Run it

```bash
npm install
npm run dev     # dev server
npm run lint    # oxlint
npm run build   # production build
npm run preview # serve the build
```

## Routes

- `/` — the archive: every edition, newest first
- `/:year/:month` — one issue, e.g. `/2026/september`

Anything else redirects to `/`.

## Where things live

- `src/data/editions.js` — **the only file you need to touch to add or edit a
  monthly edition.** Every page renders from this one object; there is no
  per-month component. See `CLAUDE.md` §7.
- `src/lib/issueSections.js` — the running order of an issue. One manifest
  drives section numbering, the nav menu, each section's colour and opener, and
  the "what's in an issue" block on the archive.
- `src/lib/utils.js` — the 8 teams, the accent palettes, `isPlaceholder()`.
- `src/lib/useCollection.js` — the localStorage-backed set behind the team-card
  collection. Every access is wrapped; the page works if storage is unavailable.
- `src/lib/buildStories.js` — derives the Instagram-style stories player from
  the edition object. Nothing is authored for it separately.
- `src/lib/photoIcons.js` — the icons a placeholder tile may name. Imported
  explicitly rather than via `import * as Icons`, which keeps the rest of Lucide
  out of the bundle. **Using a new icon name in `editions.js` means adding it
  here too.**
- `src/components/` — every UI building block, each reusable across all
  editions. `Section.jsx` holds the shared page rhythm; `Lockup.jsx` holds the
  house headline treatment; `OpenerEssay.jsx` is the issue's opening prose.
- `src/styles/fonts.css` — the only file that names a typeface.
- `public/recaps/<year>/<month>/` — edition photography. See that directory's
  README.
- `public/assets/` — logo and Open Graph card. See that directory's README.

## Fonts

AquaTerra's own faces, served from `/public/fonts/`: Eina 01 for body, Neutral
Face for display, JetBrains Mono for meta labels, Instrument Serif for the
italic accent word, Caveat for a sign-off.

Three weights the parent site uses were not supplied, and are covered by
declaring a weight *range* on the nearest face so the browser picks a real file
rather than synthesising a fake bold: Eina 800 falls to Bold, Neutral Face 800
falls to Bold, and the mono labels render at 400 where the site sets 700. Adding
`Eina01-Black.woff2` and `JetBrainsMono-Bold.woff2` would close that gap with no
code change.

## Replacing placeholder content

Everything in brackets (`[Feature headline]`, `[Number]`, …) is placeholder copy
— none of it is real AquaTerra data. Search `src/data/editions.js` for `[` to
find every field still waiting on the desk. `isPlaceholder()` means the site
renders those fields as deliberately unfinished rather than broken, and the
treatment disappears on its own as real copy lands.

## Deployment (`vercel.json`)

`vercel.json` is strict JSON validated against Vercel's schema, so it cannot
carry comments and rewrite objects reject unknown keys. The reasoning behind the
current config lives here instead.

**The SPA rewrite excludes paths with a file extension:**

```
"source": "/((?!.*\\.[a-zA-Z0-9]+$).*)"
```

A plain catch-all (`/(.*)`) rewrites *every* miss to `index.html`, so a file that
isn't there comes back as `200 text/html` rather than `404`. The browser then
downloads an HTML page, tries to parse it as a font or an image, fails, and only
then falls back — console noise and a delayed font swap on every missing asset,
in production as much as in dev. Edition routes (`/2026/september`) contain no
dot, so they still resolve to the app.

If you add a route that legitimately contains a dot, this pattern will stop
matching it and the route will 404.

**`/fonts/` gets a year-long immutable cache header.** Font files are
content-addressed by name here, so if you replace a face, change its filename —
or the header will keep serving the old one to returning visitors.
