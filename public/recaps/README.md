# /public/recaps — edition photography

Every photo that appears inside a monthly issue lives here. Nothing in this
directory is imported by the build: files are served as-is from the web root,
and the data file points at them by path.

## Adding photos to an issue

1. **Put the files in `<year>/<month>/`**, where `<month>` is the lowercase
   month name — the same string as the edition's `slug`:

   ```
   public/recaps/2026/october/cover.jpg
   public/recaps/2026/october/frame-01.jpg
   public/recaps/2026/october/frame-02.jpg
   ```

   Create the directory if it isn't there. One directory per issue.

2. **Point the data at them.** In `src/data/editions.js`, each photo is created
   by the `photo()` helper and starts with `src: null`. Set `src` to the path
   **from the web root** — leading slash, no `./`, no import:

   ```js
   { ...photo("green", "Camera", "Sundarbans, second trip"), src: "/recaps/2026/october/frame-01.jpg" }
   ```

3. **Fill in the label and the credit.** `label` is the caption and the `alt`
   text; `credit` names the member who shot it.

That's it. `<Photo>` uses the real file the moment `src` is set. Until then it
renders an on-brand placeholder tile — which is the correct thing to ship when
there is no real photo. Do not substitute a stock image.

## Naming

Lowercase, hyphens, no spaces. `cover.jpg`, `frame-01.jpg`, `drive-sundarbans.jpg`.
A space in a filename becomes `%20` in a URL and breaks in ways that are annoying
to debug.

## File specs

| | |
|---|---|
| Format | `.jpg` for photographs, `.png` only for graphics with flat colour or transparency |
| Max file size | **500KB.** Resize and re-encode before committing — this gets read on phones on mobile data |
| Cover | landscape, at least 1600px wide |
| Gallery frames | at least 1200px on the long edge; any aspect ratio, the wall adapts |
| Colour | sRGB |
| Metadata | strip EXIF GPS before committing. These are photos of minors at real locations |

## Rules

Read §8 of `CLAUDE.md` before adding anything. The short version:

- Only real photographs, shot by an AquaTerra member. **No stock, no AI images,
  no photos of people who are not members.**
- **Never write a `credit` you were not given.** `"[Member name]"` until the desk
  supplies it.
- Write a `label` that describes the frame. It is the alt text.
- Nothing here is content-hashed, so replacing a file at the same path may serve
  a cached copy to returning visitors. Change the filename when you replace an
  image.

## Placeholder tiles

A photo with no `src` renders as a tinted tile with an icon and its label. The
tone is one of `green`, `yellow`, `blue`, `lavender`, `pink`, `cream`; the icon
must be a name registered in `src/lib/photoIcons.js`. **Adding a new icon name to
the data means adding it to that registry too** — icons are imported explicitly
to keep the rest of the icon library out of the bundle, so an unregistered name
silently falls back to a generic image icon.
