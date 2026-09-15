# /public/assets — brand assets

Fixed-filename files referenced directly by the app. Unlike edition photography
in `/public/recaps/`, these are not addressed from the data file — the paths are
hardcoded — so **replace them in place and keep the filename.**

| File | Used by | Spec |
|---|---|---|
| `logo.png` | the nav wordmark and the footer, via `<Logo>` in `src/components/SiteChrome.jsx` | square, 256×256 or larger, transparent background, sRGB PNG. Rendered at 28–32px and masked to a circle, so keep the mark centred with a little breathing room |
| `opengraph.jpg` | the social preview card, via `<meta property="og:image">` in `index.html` | **1200×630 exactly.** JPEG, sRGB, under 300KB. Anything text-heavy gets unreadable in a Slack or WhatsApp preview — big type only |
| `footer-vid.mp4` | the orbit banner above the footer, via `OrbitBanner.jsx` | H.264 MP4, **an 8:1 strip of eight square panels** — see below. The current one is 2560×320, 1.7s, 571KB. **Keep it under 3MB** and give it **no audio track** (it plays muted; an audio track is bytes nobody will ever hear) |
| `footer-vid.jpg` | *optional.* The still the banner draws for readers on reduced motion | a frame from the video, same aspect. Its absence is silent — the bubbles keep their team-colour tint instead |

### About `footer-vid.mp4` — it is a strip, not an ordinary video

The banner shows **eight circular windows onto the same frame**. Each takes a
square crop the height of the frame, stepping evenly from left to right.

So the file is built as **eight square panels side by side**: one per bubble,
8:1 overall. The current 2560×320 is exactly that — eight 320×320 panels, and
the crops land on each one precisely, no overlap.

**A replacement has to keep that shape.** Drop in an ordinary 16:9 clip and the
eight crops will overlap heavily, so most bubbles show almost the same thing.
To make a new one: line up eight square clips in a row, export at `N×8` by `N`.

Each panel is cropped to a circle, so keep the subject centred within its own
panel — the corners are never seen.

It is decoded once and drawn to eight small canvases, only while the banner is
on screen. See the comment at the top of `OrbitBanner.jsx` before changing how
it loads.

**`DESCRIPTION` in that file is the only thing a screen reader gets.** If you
replace the video with different footage, change that string with it.

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
