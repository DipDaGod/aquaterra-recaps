# /public/fonts

Drop AquaTerra's licensed web fonts here. `src/styles/fonts.css` already has
`@font-face` blocks pointing at the filenames below — match one of these and it
just works, no code change needed.

Each block lists several spellings and the browser takes the first that loads,
so any of these naming styles is fine:

    eina-400.woff2   Eina01-Regular.woff2   eina-regular.woff2
    eina-600.woff2   Eina01-SemiBold.woff2  eina-semibold.woff2
    eina-700.woff2   Eina01-Bold.woff2      eina-bold.woff2
    eina-800.woff2   Eina01-Black.woff2     eina-black.woff2

    display-800.woff2                       display-bold.woff2
    mono-700.woff2                          mono-bold.woff2

## Which weights are actually used

From the parent site's own CSS:

| Role        | Weights in use          |
|-------------|-------------------------|
| `--eina`    | 400, 600, 700, 800      |
| `--display` | 800                     |
| `--mono`    | 700                     |

400 and 700 are the two that matter most — body copy and the mono labels.
Anything missing falls back to the stand-in family rather than breaking, so a
partial drop is fine; it just won't be the real face at that weight.

## If your filenames differ

Either rename to match, or say what they are and the `src:` lines in
`src/styles/fonts.css` get updated — it's the only file that names a font.

## .ttf / .otf instead of .woff2

Those work but are 3-5x larger over the wire. Worth converting to .woff2
before publishing; the `@font-face` blocks already list `.woff` as a fallback
format.
