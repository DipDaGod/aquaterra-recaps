# AquaTerra Recaps

A standalone monthly recap / digital-magazine site for AquaTerra, built with
React, Vite, Tailwind CSS v4 and React Router.

**Fonts:** AquaTerra's own faces are served from `/public/fonts/` and wired in
`src/styles/fonts.css` — the only file in the codebase that names a typeface.
Eina 01 for body, Neutral Face for display, JetBrains Mono for meta labels,
Instrument Serif for the italic accent word, Caveat for the single sign-off in it.

Three weights the parent site uses were not supplied, and are covered by
declaring a weight *range* on the nearest face so the browser picks the real
file rather than synthesising a fake bold: Eina 800 falls to Bold, Neutral Face
800 falls to Bold, and the mono labels render at 400 where the site sets 700.
Adding `Eina01-Black.woff2` and `JetBrainsMono-Bold.woff2` would close that gap
with no code change.

**Read `aq.md` before changing anything.** It carries the non-negotiable rules
for this repo — chiefly: never invent an AquaTerra fact. `CLAUDE.md` imports it
so it loads automatically in Claude Code sessions.

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
  `Section.jsx` holds the shared page rhythm and section heading.
- `src/lib/photoIcons.js` — the icons a placeholder tile may name. Icons are
  imported explicitly rather than via `import * as Icons`, which keeps the
  whole Lucide set out of the bundle. **Using a new icon name in
  `editions.js` means adding it here too**, or the tile falls back to the
  generic image icon.
- `src/pages/RecapArchive.jsx` and `src/pages/EditionPage.jsx` — the two
  routes: `/recaps` and `/recaps/:year/:month`.

## Adding a new month

1. Open `src/data/editions.js`.
2. Copy an existing month's object (e.g. `"2026-08"`), rename the key to
   `"2026-09"`, and update `slug`, `month`, `editionNumber`, and content.
3. Save — the archive grid and month navigation pick it up automatically.

## Sections an edition can carry

Every section renders only when the edition supplies data for it, so a month
with no student-business news simply doesn't show that strand. There are no
per-edition components — add a field, not a file.

| Field | Section |
|---|---|
| `glance` | the numbers |
| `teams` | the 8 teams, each in its identity colour |
| `featured` | the month's stories, mixed across teams |
| `photography` | credited photo of the month + frame wall |
| _(stories)_ | built from the fields below — see `src/lib/buildStories.js` |
| `games` | three playable games — `bigger`, `guess`, `match` (every figure must be a verified fact) |
| `inside` | Groundwork Diaries, workshops |
| `impact` | metrics + goal progress |
| `openings` | roles to join, from HR |
| `people` | member profiles |

## Optional per-edition extras

An edition may set `video` (a URL) and/or `pdf` (a file path). Each renders a
button in that month's hero; leave them off and no button appears.

## Replacing placeholder content

Everything in brackets (`[Project name]`, `[Number]`, etc.) is placeholder
copy — none of it is real AquaTerra data. Search `src/data/editions.js` for
`[` to find every field that still needs real content or photography.

## Deployment (`vercel.json`)

`vercel.json` is strict JSON validated against Vercel's schema, so it cannot
carry comments and rewrite objects reject unknown keys. The reasoning behind
the current config lives here instead.

**The SPA rewrite excludes paths with a file extension:**

```
"source": "/((?!.*\\.[a-zA-Z0-9]+$).*)"
```

A plain catch-all (`/(.*)`) rewrites *every* miss to `index.html`, so a file
that isn't there comes back as `200 text/html` rather than `404`. The browser
then downloads an HTML page, tries to parse it as a font or an image, fails,
and only then falls back — console noise and a delayed font swap on every
missing asset, in production as much as in dev. Edition routes (`/2026/october`)
contain no dot, so they still resolve to the app.

If you add a route that legitimately contains a dot, this pattern will stop
matching it and the route will 404.

**`/fonts/` gets a year-long immutable cache header.** Font files are content-
addressed by name here, so if you replace a face, change its filename (or the
header will keep serving the old one to returning visitors).
