# /public/assets — brand assets

Fixed-filename files referenced directly by the app. Unlike edition photography
in `/public/recaps/`, these are not addressed from the data file — the paths are
hardcoded — so **replace them in place and keep the filename.**

| File | Used by | Spec |
|---|---|---|
| `logo.png` | the nav wordmark and the footer, via `<Logo>` in `src/components/SiteChrome.jsx` | square, 256×256 or larger, transparent background, sRGB PNG. Rendered at 28–32px and masked to a circle, so keep the mark centred with a little breathing room |
| `opengraph.jpg` | the social preview card, via `<meta property="og:image">` in `index.html` | **1200×630 exactly.** JPEG, sRGB, under 300KB. Anything text-heavy gets unreadable in a Slack or WhatsApp preview — big type only |

## Replacing one

1. Export at the spec above.
2. Overwrite the file, keeping the name.
3. Commit.

`<Logo>` fails soft: if `logo.png` is missing or won't decode, it renders a green
monogram instead of a broken image, so the site never breaks on a bad export.
Nothing catches a bad `opengraph.jpg` — check it with a link-preview debugger
after deploying.

## Adding a new asset

Only for things the app references by a fixed path (a favicon, a downloadable
PDF). Everything that belongs to one issue — covers, gallery frames, portraits —
goes in `/public/recaps/<year>/<month>/` and is addressed from
`src/data/editions.js` instead. See that directory's README.

Two things to know before you add anything here:

- **Nothing in this directory is content-hashed.** A returning visitor may keep
  seeing the old file. If a replacement has to land immediately, change the
  filename and update the reference.
- Paths with a file extension are excluded from the SPA rewrite in
  `vercel.json`, so a missing file here returns a real 404 rather than the app's
  HTML. That is deliberate — see `README.md`.

## Rules

`CLAUDE.md` §8 applies here too: no stock imagery, no AI-generated art, and no
photograph of a person without the desk's say-so.
