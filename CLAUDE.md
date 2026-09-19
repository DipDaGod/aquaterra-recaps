# CLAUDE.md — working rules for AquaTerra Recaps

Read this fully before touching anything in this repo. These rules are not
optional and this is not a summary — it is the whole thing. (It absorbed the
old `aq.md`, which no longer exists. Any older instruction to "read aq.md"
means read this.)

Last verified: 16 September 2026, against the live site at ngoaquaterra.com
and screenshots of it. The team member counts moved between 15 and 16
September — they move often, so re-check them before publishing rather than
trusting the table below.

---

## 0. The one rule

**Never invent AquaTerra facts.** Not a number, not a name, not a date, not a
project, not a quote, not a team, not a member count. If you need a value and
it is not in this file, not in `src/data/editions.js`, and not something the
user just told you — leave a `[bracketed placeholder]` and say in your reply
which placeholders you left.

This is a real NGO publishing a real magazine to its own 1,300+ members. A
plausible-sounding wrong number is worse than an obvious blank, because a blank
gets filled and a wrong number gets published.

"Sample data", "example content", "illustrative figures" and "for now I'll
use…" are all the same mistake. Don't.

---

## 1. What this repo is

AquaTerra Recaps is a standalone monthly-recap site — a digital magazine — for
AquaTerra. React 19, Vite, Tailwind v4, React Router. Three route patterns, two
pages:

- `/` — the archive page listing every edition
- `/:year/:month` — one page per edition: that month's stats, the teams,
  featured stories, a photography section with a full-screen viewer, mini
  games, an impact panel, volunteer profiles, and an Instagram-style stories
  player at the top
- `/:year/:month/stories/:chapter?` — the same edition page with the stories
  player open. Not a third page: the route only decides whether the player is
  up and which chapter it starts on, so a run is a link you can send someone

Everything is data-driven from `src/data/editions.js`. There is no per-month
component. Adding a month means copying one object; every page picks it up
automatically.

**Consequence: do not create per-edition components or per-edition routes.**
If a month needs something the template can't express, change the template and
the schema — not that one month.

### Before you write code

Read `src/data/editions.js` first, every session. Do not guess its field names,
its nesting, or what's optional. The schema in that file is the contract;
§7 below describes how to *add* to it but deliberately does not restate every
field, because a restatement would go stale and you'd trust the stale copy.

### Current state

Content is placeholder throughout — every `[bracketed]` field, all
photography. A long design and correctness pass has already been done (see §9).
**Don't redo that work.** If something looks wrong, check `git log` before
"fixing" it.

---

## 2. Verified facts

Everything in this section is taken from the live site. Use it freely.

### Organisation

- AquaTerra. Student-led NGO and community, Kolkata, West Bengal, India.
- Established 2021. Founded by 16 students; the site dates the start to June 2021.
- DARPAN-registered. Self-funded. No corporate or external funding.
- Free forever. No donations, no fees.
- Members are ages 14–19.
- Site tagline: *started in Kolkata. got out of hand.*
- Footer line: *Free forever. No donations, no fees. Pick a team, show up, and get to work.*
- Copyright line as it appears on the site: `© 2026 AQUATERRA · OPEN COMMUNITY, NO RIGHTS RESERVED.`

### Headline numbers

| Figure | Label as written on the site |
|---|---|
| 540+ | drives written up |
| 1,300+ | members, ages 14–19 |
| 8 | teams |
| 570+ | drives, blogs & openings (the directory count — a different metric from 540+) |
| 4,000+ | saplings planted |
| 3,500+ | kids reached |
| 8 | Sundarbans trips |
| 15,000+ | bananas distributed |
| 3,200+ | Instagram followers on @ngo.aquaterra |

These move. Before publishing an edition, re-check them against the live site
rather than trusting this table. If a number here conflicts with the live site,
the live site wins.

### The 8 teams

Exact names and casing. Do not normalise, do not title-case, do not expand.

| Team | Type | Members |
|---|---|---|
| Welfare Team | volunteer team | 62 |
| Social Media | volunteer team | 29 |
| Events Team | volunteer team | 6 |
| Collabs Team | volunteer team | 2 |
| Human Resources | volunteer team | 6 |
| ShikshAQ | student business | 2 |
| AQ.Ventures | student business | 16 |
| Crftd | student business | 3 |

Each team's own one-liner, as the site's summary describes them:

- **Welfare Team** — 3,500+ kids reached in teaching workshops. 8 Sundarbans relief trips. Dog feeding.
- **Social Media** — Instagram, LinkedIn, website. 3,200+ followers on @ngo.aquaterra. Reels.
- **Events Team** — Paradox. Disco Diwali. Starry Nights. Every fundraiser AQ has ever run.
- **Collabs Team** — School collabs, college collabs, NGO partnerships, outreach.
- **Human Resources** — Recruitment, onboarding, certificates, Letters of Recommendation.
- **ShikshAQ** — Tuition discovery platform built by AQ members for Kolkata students.
- **AQ.Ventures** — Helps student entrepreneurs turn ideas into visible ventures.
- **Crftd** — Student-run streetwear brand. Design, production, sales. Profits fund AQ welfare.

The `TEAM_ROSTER` blurbs in `src/data/editions.js` are longer than these and
differ in wording — they were lifted verbatim from the live site's own teams
grid markup and then trimmed for length. That markup outranks the summaries
above. Don't "correct" a roster blurb to match this list; it is the paraphrase,
not the source.

Casing traps, in order of how often they get broken:

- `Crftd` in prose and nav. `CRFTD` only as a display-caps heading. Never `CRFTD` mid-sentence.
- `ShikshAQ` — capital S, capital A, capital Q. Never `Shikshaq`, `ShikshaQ`, `SHIKSHAQ` in prose.
- `AQ.Ventures` — with the period, no space.
- `AquaTerra` — capital T. Never `Aquaterra` in headings you write.
- `AQ` is the accepted short form in body copy.

Mechanically: `src/lib/utils.js` gives each team both a canonical `name` and an
explicit display `caps`. **Never run a CSS `uppercase` over a team name** — use
`TEAMS[key].caps` when you want the display form. The `Meta` component applies
`text-transform: uppercase`, so no proper noun may be routed through it.

### Banned strings

These are from an older version of the org and are **wrong now**:

- ❌ `AQ Roots` / `Roots` / `@roots.aquaterra` — the clothing label is **Crftd**.
- ❌ `AQ Shikshaq` — it is `ShikshAQ`.
- ❌ Any count of "600+ workshops" or "2,500+ kg of clothing" or "15,000 stray
  dogs fed" or "35+ partners" — these appear on third-party directory sites
  (TheOrg, RocketReach, old Medium) and are **not** currently published by
  AquaTerra. Don't source from those sites at all.
- ❌ `1,200+ members` / `550+ drives` — stale figures still in Google's index.
- ❌ `Groundwork Diaries` — the parent site's blog. The magazine used to carry a
  section pointing at it; the desk removed it. Don't reintroduce it.

### Paradox

AquaTerra's flagship fest. Latest edition per the site: **Paradox 2026**,
1–6 June 2026, Kolkata. 10+ events. 6 days. 100% of profits funded welfare. The
site marks it `WRAPPED`.

### Links

- Site: https://www.ngoaquaterra.com
- Instagram: @ngo.aquaterra
- LinkedIn: NGO AquaTerra (the URL is not published anywhere confirmable — ask the desk)
- ShikshAQ: shikshaq.in

**The magazine links nowhere outside itself.** No links to ngoaquaterra.com, no
social links, no footer socials. The desk asked for this explicitly twice. A
team card points at that team's own story in this issue; where there is no
story, the card is plain text with no arrow. If you add an outbound link
anywhere, you have broken a standing instruction — and `nav.mjs` asserts it.

### Not verified — do not write these

- **Any founder or office-bearer name or title.** The site says "16 students"
  and names nobody in a masthead. Kanishk Agarwal is associated with AquaTerra;
  his exact title is not published anywhere confirmable. A president's name
  appears on a data-broker scrape, which is not a source. Edition 1 is
  literally "what is AquaTerra and roles" — get the masthead from Kanishk
  directly and paste it in. Do not reconstruct it from LinkedIn.
- Individual member names, photos, quotes, or attributed testimonials.
- Any drive, workshop, event or partnership not listed above.
- Founding-date precision beyond "June 2021".

---

## 3. Voice

AquaTerra writes in a specific register. Match it; don't write NGO copy.

**Rules, from the site's own text:**

1. **Lowercase sentence starts** in body copy and subheads. Display headlines
   are ALL CAPS. Both are deliberate. Don't "fix" either.
2. **Concrete numbers instead of adjectives.** Not "significant impact" —
   "15,000+ bananas distributed". The bananas line is the house style in
   miniature: specific, faintly absurd, unarguably true.
   - But **say a fact once.** "ages 14–19" is the site's own label on the 1,300+
     figure and belongs wherever that figure is labelled. Worked into prose four
     times over it stopped being a fact and started reading like a compliance
     disclaimer, so it came out of every sentence that isn't labelling the
     number. The same goes for any figure: repetition cheapens it.
8. **Read it back for the accidental second meaning.** "issues go up once a month
   has wrapped" parses as "issues go up once a month" — the frequency, not the
   condition. It shipped twice. "an issue goes up when its month wraps" cannot
   be misread.
9. **A lead must not argue with the heading above it.** "THE drives." sat over
   "everything the month actually held, not just the drives", and "THE ONES WHO
   turned up." over "the members who showed up".
3. **Short declaratives.** Periods where a lesser writer uses commas.
4. **Parentheses carry the warmth.** *student stories from the ground
   (Sundarbans trips, plantation drives, the late-night event builds) written by
   the AquaTerra members who were actually there.*
5. **Dry self-deprecation.** *started in Kolkata. got out of hand.*
6. **Second person, plainly.** *Pick a team, show up, and get to work.*
7. **Instructional microcopy is explanatory, not decorative.** Real example from
   the site: *the marker tells you what the tap does · dot filters this page ·
   arrow goes elsewhere · corner arrow opens a new tab.*

**Reference passage** — the site's welcome letter, for tone calibration:

> welcome, friend
>
> AquaTerra exists because a few students in Kolkata decided a Saturday
> afternoon could go to a feeding drive instead of nothing in particular, and
> then showed up again the next one.
>
> whether it is your first drive or your fiftieth, this is a letter to the
> people who make AQ what it is: **you**. not the org account, not the desk, the
> volunteer who turned up.
>
> thank you for making it real.
>
> *love, the AquaTerra team*

This letter is on the parent site's footer. It is **not** in the magazine — it
was built here and the desk took it back out. Don't add it again unasked.

**Never write:** "empowering youth", "driving change", "making a difference",
"passionate about", "journey", "ecosystem" as a buzzword, "we are thrilled to
announce", em-dash-heavy consultant prose, or any sentence that could appear on
any other NGO's site.

"the desk" is AquaTerra's term for the editorial/leadership function (*picked by
the desk*). Use it.

---

## 4. Design system

Observed from the live site. **The hex values below are eyeballed from
screenshots — treat them as approximate**, except `#F4EFE0` and `#0A0A0A`,
which are confirmed. Before finalising, pull the real values from the main
AquaTerra site's CSS or ask the user. Flag them as approximate in any PR.

All of these live as tokens in `src/index.css` under `@theme`. Change them
there, never inline.

### Colour

| Role | Approx. | Notes |
|---|---|---|
| Paper / page background | `#F4EFE0` | Confirmed — the site's `theme-color` meta. Warm cream. |
| Ink / dark panel | `#0A0A0A` | Confirmed — the site sets `rgb(10,10,10)` inline. |
| Green (primary accent) | ~`#1B7A4B` | Active nav pill, primary CTA, italic accent words, the 540+ card. |
| Blue | ~`#3AA0F0` | The 1,300+ card, step numbers, Events Team. |
| Yellow | ~`#F5C518` | The 8-teams card, "featured drives" pill, ShikshAQ. |
| Pink | ~`#FF3D8B` | Human Resources. |
| Purple | ~`#8B5CF6` | Social Media. |
| Teal | ~`#0E8C8C` | Collabs. |
| Orange-red | ~`#FF4A2B` | AQ.Ventures, Paradox badge and CTA. |
| Black | `#000` | Crftd. |

The bright colours are **team identity colours**, not decoration. Each of the 8
teams owns one. Don't reassign them, don't add a ninth, don't use a team colour
for something that isn't that team.

Two derived sets exist because the block colours were never meant to be read as
text:

- `--color-team-*-ink` — the text-safe variant for a team-coloured link on
  cream. Lemon above all fails contrast as a text colour; use the `-ink` token.
- `ISSUE_ACCENTS` / `SECTION_ACCENTS` in `src/lib/utils.js` — see §5.

### Typography

Five roles, all wired in `src/styles/fonts.css`, **the only file in the
codebase that names a typeface.** Faces are AquaTerra's own, served from
`/public/fonts/`.

1. **Display** — Neutral Face. Very heavy grotesque, ALL CAPS, tight tracking,
   set enormous. Carries every section opener. Use the `.u-display` class.
2. **Serif italic accent** — Instrument Serif Italic, used for exactly one word
   per headline, in an accent colour, **always followed by a period**. This is
   the signature. Rendered by `<Lockup>`, which emits the period so it can't be
   forgotten.
3. **Body** — Eina 01. Lowercase, generous line-height. 400 15px/1.6.
4. **Mono** — JetBrains Mono. Uppercase, letterspaced, small (700 10.5px,
   .06em). Eyebrows, stat labels, meta strings, the copyright line. Use the
   `<Meta>` component or `.u-mono`.
5. **Handwritten script** — Caveat. Currently declared and unused: it exists for
   a single sign-off and nothing else. If you find a use for it, that use is
   one place. Don't spread it.

Three weights the parent site uses were never supplied. Each is covered by
declaring a weight *range* on the nearest face, so the browser picks a real file
instead of synthesising a fake bold (synthetic bolding smears badly on a 10.5px
uppercase mono label). Eina 800 falls back to Bold, Neutral Face 800 to Bold,
and mono labels render at 400 where the site sets 700. Dropping
`Eina01-Black.woff2` and `JetBrainsMono-Bold.woff2` into `/public/fonts/` would
close the gap with no code change.

### The headline lockup

This is the most recognisable thing about the brand. Real examples:

```
THE directory.          THE drives.
PICK A LANE, THEN turn up.
COME AND DO SOMETHING real.
PARADOX 2026.
```

Heavy caps + one italic serif word in colour + a terminal period. Build every
major section heading this way, through `<Lockup caps="THE" accent="drives" />`.
Get the italic word right — it should be the noun that carries the meaning, not
a random emphasis.

### The headline spotlight

A solid disc follows the cursor across a display headline, and the words inside
it are knocked out in the page's own ground colour — the heading **inverts**
under the circle rather than merely recolouring. `Lockup` takes `spotlight`,
`useSpotlight` owns the pointer, the `.aq-spot*` rules in `index.css` own the
look.

Three layers: the headline itself, a disc of the accent colour over it, and the
same words again in the ground colour, masked to that same circle.

- **The disc is the accent colour the headline already has** — the issue accent
  on a hero, the section's own on an opener — so it introduces no colour of its
  own. §4 forbids a ninth. The knockout is `--spot-ground`: cream by default,
  flipped to ink under `.bg-ink`, so a section knocks out in whatever is
  actually behind it. That selector is why it cannot be forgotten on a new dark
  section; don't replace it with a prop.
- **The disc is a real circle, not a masked rectangle.** It has to stand clear
  above and below the line, and a rectangle clipped to the element squares it
  off there. It is centred by margin, not `transform` — a transform makes an
  element the containing block for every `position: fixed` descendant, and that
  trap is in §9 twice.
- **The knockout layer bleeds out by one radius and pads its content back.** A
  mask only paints inside the border box (`mask-clip` is border-box, and no
  "don't clip" value ships), so at `inset: 0` the circle was sliced off wherever
  it reached past the heading — which is any pointer near an edge, and this
  display face overflows its own line box besides. The mask is re-centred by
  the same radius.
  - The copy is `aria-hidden`, and the heading is unselectable, so it is neither
    announced nor copied twice. `Lockup` builds the words **once** and renders
    that same tree in both layers; build them twice and the layers drift.
  - Nothing on that layer may affect layout. It must break its lines exactly
    like the base copy under it — any drift shows as doubled glyphs, so it is
    asserted per text node at several widths. Measure **text nodes**, not a
    range over the element: the two layers differ in structure on purpose, so
    element boxes will not match and a range picks those up too.
- **The radius is in `em`** (`--spot-r`, 0.42), so one value holds its
  proportion on the 84px hero and a 34px opener alike. Size it against the cap
  height, not the em box — at 1.15em it was a 193px circle on the hero that ate
  the line below, and 0.55em still swallowed three letters at a time. A fixed
  pixel radius swallows the small headings whole, and then it is not a
  spotlight, it is a hover colour.
- **The disc grows out of the pointer and shrinks back into it**, and the mask
  radius grows with it, or the words uncover before the circle reaches them.
  That works because `--spot-on` is registered with `@property` as a
  `<number>` — an unregistered custom property is a string to the cascade and
  flips 0 to 1 with nothing in between, which is why it used to pop. One
  property then drives the fade and the growth in step, on the site's own
  260ms curve. The disc scales by `transform`; animating width and height
  would be a layout pass every frame.
- **Only the growth is timed. Never `left`/`top`.** A transition on the
  position lags the circle behind the cursor, which reads as broken, not
  smooth.
- **A pointer move writes custom properties on one element inside one rAF**, the
  same discipline as the card foil. The box is read inside that frame too, so it
  is one layout read and one write per frame however fast the pointer moves.
- Hover-capable fine pointers only, and off under reduced motion — in the CSS
  *and* in the hook, so neither depends on the other. A touch would light the
  disc wherever it last tapped and leave it there.
- **It goes on standalone section headings**, the page heroes included. Not on
  repeated card titles: a grid of them lighting up is the screensaver problem
  the card foil already had.
- At 0.42em the disc barely clears the cap height, so it no longer reaches an
  eyebrow label above the heading. If the radius is ever turned back up, it can
  — and that is accepted rather than fixed: it is a transient pointer effect,
  and the alternative is clipping the disc back into a rectangle.

### Shape and layout

- Pills everywhere: nav items, filter chips, buttons, badges. Fully rounded.
- Cards and panels: large rounded rectangles, roughly 16–24px radius. Dark
  panels sit inset on the cream page with visible cream margin around them — the
  page background is never edge-to-edge dark.
- Stat blocks: big bold number, tiny uppercase mono label beneath. Row of 3–4.
- Team cards: a solid team-colour block on top with a small card-fan motif, then
  the name in display caps, then `volunteer team · N members`, then a two-line
  description. No avatar stack (there are no member photos, and the count is
  already on the card). **No arrow** — the card doesn't go anywhere, it opens the
  team's collectible card (§9). A tick appears on the block once it's been read.
- Meta strings joined with middle dots: `8 DEPARTMENTS · 570+ DRIVES, BLOGS & OPENINGS`.
- Links and CTAs carry a trailing `→`.

### The orbit banner

`AQUATERRA` set enormous above the footer, with eight circular windows drifting
around it. Every window is a different horizontal slice of the **same** video
frame — one decoder, eight views — drawn to canvases rather than eight `<video>`
elements.

The video is **a strip, not an ordinary clip**: eight square panels side by
side, one per bubble (currently 2560×320). The crops land on each panel exactly.
Replace it with a 16:9 clip and the eight windows overlap so heavily they nearly
all show the same thing — `public/assets/README.md` has the spec.

It is deliberately cheap, and the constraints are load-bearing:

- one `<video>`, `preload="none"`, not fetched until the banner is near the
  viewport; **`muted` is required** or autoplay is refused outright
- one rAF loop for all eight canvases, capped at 15fps. It is decoration; 60fps
  costs four times the CPU for nothing anyone can see
- the loop and the video both stop when the banner scrolls out of view or the
  tab is hidden, which lets the decoder release its buffers
- **readiness drives the loop; the loop does not poll for it.** The paint stops
  on `waiting` and starts on `playing`, so a stall holds the last frame instead
  of spinning at 15fps drawing nothing
- **nothing that stops it may be permanent.** The banner mounts once for the
  whole app — `App.jsx` keeps it outside the routed div — so anything one-way
  here is one-way until a reload. A dropped fetch used to be exactly that: the
  `error` handler stopped the loop and no event ever started it again, which is
  what made the banner "sometimes not load" on mobile data. Failures now retry
  on a short backoff, and a retry **must call `video.load()`** — after a media
  error `play()` alone keeps failing on the same element
- **the IntersectionObserver reads the last entry, not the first.** A fling
  delivers several crossings in one callback, and acting on the oldest left the
  banner stopped while it sat there on screen
- **a `play()` rejection is only acted on if nothing superseded it** (a
  generation counter). Otherwise a rejection from an abandoned play arrives late
  and stops the run that replaced it
- autoplay refused outright — iOS in Low Power Mode — is not retryable, so after
  the backoff is spent the next `pointerdown` is spent on it instead
- 160×160 backing stores — 0.8MB for all eight — and no pixel readbacks
- under reduced motion the video is never loaded and nothing is drawn over the
  bubbles: the eight team colours are the whole banner (§9)
- the drift is a CSS animation, not a scroll or pointer handler, so it runs on
  the compositor and reduced motion switches it off for free

Before the video file exists, or if it fails, each bubble keeps a team-colour
tint — so the banner never looks broken, it just looks flatter. The banner and
the footer are one continuous dark block; the footer has no top margin for that
reason.

**The dark band runs to the edges; the composition inside it does not.** The
word and the ring share one centred stage capped at 54rem, and the word takes
about 60% of it — the bubbles at 7%, 10%, 89% and 92% need the rest or there is
no air in it, and that proportion is the whole look. The stage carries its own
`min-height` because the ring is `inset: 0` against it: with no height the
bubbles' top percentages collapse onto the single line of the word and bunch
around it.

### Motion

**One curve and one duration for the whole site**, set as tokens in `@theme`:

```
--ease-rise: cubic-bezier(0.22, 1, 0.36, 1);
--default-transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
--default-transition-duration: 260ms;
```

The last two are **Tailwind v4 theme keys**, so they re-time every
`transition-*` utility in the codebase at once. Tailwind's own defaults are
150ms on `ease-in-out` — quick and symmetrical, and next to the
`0.22, 1, 0.36, 1` the section reveals and the stories player already used, the
rest of the site read as a different, snappier product. Change the token, not a
component.

The curve leaves fast and lands slow. That is what makes a hover feel answered
rather than triggered, and it is the same curve the parent site's own
transitions use.

- **Everything interactive eases by default**, from a rule in `@layer base` on
  `a`, `button`, `summary`, `label[for]`, the form elements and the ARIA
  equivalents. A component that forgets `transition-colors` no longer snaps.
  In the base layer, for the same reason the cursor rules are: a component that
  *does* name its own transition still wins.
- **That rule lists properties; it is never `all`.** `all` animates layout too,
  and a transitioning width or height is a repaint every frame rather than a
  compositor job. Colour, opacity, shadow, transform, filter — nothing that
  moves a box.
- **Content that appears in place uses `.rise-in`** (300ms) or `.fade-in`, not
  `.reveal`. `.reveal` is the 0.55s entrance a section gets once, on scroll; on
  something you triggered yourself, half a second reads as lag. Replay either by
  giving the element a React `key` that changes with the content — that is how
  the game panel, the game reveals, the story filter and the year switch move.
- **`backwards`, not `both`**, on every one of these. A finished `both`
  animation that touched `transform` leaves an identity matrix behind, and any
  transform makes that element the containing block for a `position: fixed`
  descendant. That trap is in §9 and it has bitten twice.
- Reduced motion clamps every animation *and* every transition on the page to
  0.001ms in one rule, so none of this needs a second opinion per component.
- **Nothing appears at full size.** Every overlay arrives — the scrim fades
  (`.overlay-fade`, 240ms) and the panel rises into it (`.overlay-panel`,
  360ms, started 60ms later so it lands ON the scrim rather than with it). The
  lightbox, the team card and the stories player all used to snap into
  existence, which was the cheapest-looking thing on the site.
  - `backwards`, never `both`: these overlays are full of `fixed` and `sticky`
    children and that trap (§9) is live here.
  - The panel entrance goes on a wrapper, never on `HoloCard` — that element's
    transform is the pointer tilt, rewritten every move, and an entrance on the
    same property is overwritten mid-flight.
- **Two animations on one element: the last one wins that property outright.**
  The story wash blobs animate `transform` for both their entrance and their
  drift, so each is two elements — outer owns the entrance, inner owns the
  drift. Put both on one element and the entrance silently never plays.
- **Anything that enters from somewhere enters from the direction it came.**
  The lightbox frame used `story-enter-next` whichever way you stepped, so back
  looked identical to forward. Every path that moves the frame — keys, swipe,
  chevrons and the thumbnail strip — goes through `go()`, which is what records
  the direction; a path that calls `onNavigate` directly leaves it stale.
- **A lazily loaded photo fades in** (`<Photo>`), because an image snapping to
  full opacity is what makes a gallery read as a web page rather than a
  magazine. A cached image can finish before React attaches `onLoad`, so the
  ref checks `complete` on the way in, and `onError` reveals it too — a broken
  frame must still render its alt text rather than nothing.

### The card foil

The opened team card (the collectible set, §9) behaves like a foil trading
card: it tilts towards the pointer, the foil travels across it, and a sideways
drag throws it to the next card. `HoloCard.jsx` owns the pointer, the `.holo*`
rules in `index.css` own the look.

**It is deliberately restrained, and it got there by being too much first.** The
first version tilted 10° and banded the palette every ~19px, which at a glance
was stripes rather than foil — busy enough to fight the card's own type. It is
now 6° and **one wide pass** through the palette at under a quarter opacity. Do
not turn it back up: the team's colour is the thing you are meant to see, and
the foil is what happens when you move.

- **The foil is AquaTerra's own team colours**, not a rainbow. §4 forbids a
  ninth colour, and the palette makes a better spectrum than a generic one.
- **`hard-light`, not `color-dodge`.** Crftd's ground is `#000` and ShikshAQ's
  is bright yellow. Dodge leaves the black card completely untouched and blows
  the yellow one out to white; hard-light lets the foil drive, so it reads on
  both. Both of those were tried.
- **The layer moves by transform, not by `background-position`.** Moving the
  position tiles the gradient, and a gradient at an angle does not meet itself
  cleanly — the seam showed as a hard line down the card. The layer is drawn
  40% past every edge and travels 13% of itself, so a corner can never come
  uncovered. Nothing else may translate it: a per-card offset is what ate that
  overhang the first time, which is why per-card variety is **the angle only**.
- A pointer move writes custom properties on one element inside one rAF.
  Pointer moves fire far more often than the screen refreshes, and a React
  render per move is a render per pixel.
- Under reduced motion the card does not tilt, but **the swipe still works** —
  moving through the set is navigation, not decoration.
- **Only the opened card does this.** Eight of them tilting at once in the grid
  is a screensaver, and the effect is the payoff for opening one.

### The scrollbar, and who lives behind it

- **The page scrollbar carries `--issue-accent` on a cream track**, so the bar
  shifts colour with the issue you are reading, like every rule and accent word.
  Scoped to `html`, **never a bare selector** — a bare one reaches every
  scrollable element, which is how `.scroll-quiet`'s cream bar once got painted
  down the middle of the dark stories card (§5).
  - Standard properties only. Once `scrollbar-color` is set, Chrome and Firefox
    ignore `::-webkit-scrollbar` anyway, and in Safari that block forces the bar
    permanently visible and non-overlay — layout width taken for ever to style
    what the other two already style. Safari below 18.2 keeps its default bar.
- **`GhostEgg` is the mascot, and it lives behind that bar.** It leans out,
  double-takes, and ducks back — and if you catch it mid-lean it stays, down in
  the bottom-right corner, for the rest of the visit. `<Mascot>` throughout.
  - **It counts time on the SITE, not time on the clock.** First sighting at two
    minutes, then every three to five, and the timer stops dead while the tab is
    in the background — a page left open in another window for an hour is no
    closer to a sighting than one you closed after a minute. One timeout for
    exactly the time still owed, torn down when the tab hides and rebuilt when
    it returns; there is no polling.
  - **It has to be catchable**, which is the whole difference from decoration.
    It is a button, it holds still in the middle of its lean long enough to be
    hit, and it does not peek again once it has been caught.
  - **Reduced motion gets `.ghost-still` rather than nothing.** It appears
    without the lean and is still clickable. An egg you can only find by
    watching something move is an egg those readers cannot find at all — which
    is a different thing from sparing them the movement.
  - `aria-hidden` and off the tab order, on the ghost and the buddy both. It is
    a joke with nothing behind it, and a control that announces itself at random
    every few minutes is worse than one you cannot reach. The buddy carries no
    meaning the page does not already say.
  - The buddy **floats as its resting state** and now and then smiles, dances,
    or both. `smiling` is an opt-in prop on `<Mascot>` with exactly one user:
    the face is AquaTerra's own artwork, so the default mascot stays as drawn in
    all six other places and there is nothing to unpick if the real mouth
    arrives and differs.
  - **It lasts the visit, not for ever.** Nothing is written to `localStorage`,
    the same call as the team-card set (§9): finding it is something you did,
    not a badge the site remembers awarding you.
  - The congrats is **the same full-screen takeover the eight-card set gets**,
    through the same `<Takeover>`: the scrim, the confetti and the centred
    column live there, not in either caller, so the site's two "that was worth
    doing" moments cannot drift apart. `className` carries the positioning,
    which is the only place they differ — the card set renders inside an
    overlay that is already fixed and takes `absolute`; the ghost stands alone
    and takes `fixed`.
    - The confetti is AquaTerra's own team palette, never a generic rainbow
      (§4 forbids a ninth colour).
    - **It waits for the button.** A curtain that pulls itself back while you
      are still reading is worse than one you dismiss, so the auto-dismiss that
      suited the earlier small card is gone.
    - **It promises nothing it cannot give** — the buddy is the prize, and §9
      forbids inventing another.
  - **Every one of these animations ends where it started** or off-screen at
    opacity 0 (§9). Reduced motion clamps animations to 0.001ms with the fill
    mode still applied, so a lean or a dance ending mid-flight would freeze a
    ghost against the edge of the page for ever.

### Cursors and selection

Both are set once, in `@layer base` in `index.css`. Don't set them per-component
unless an element genuinely differs.

- **Tailwind v4 dropped the preflight rule that gave buttons `cursor: pointer`.**
  They inherit the browser default — an arrow — so every button on the site read
  as unclickable until this was added. Disabled controls get `not-allowed`, the
  slider gets `grab`/`grabbing`, a photo that opens large gets `zoom-in`.
- **Those rules live in `@layer base` for a reason.** Written bare they are
  element+pseudo selectors, which out-specify a single-class Tailwind utility —
  `cursor-zoom-in` on a photo lost to `button:not(:disabled)`. Inside the base
  layer the utilities layer always wins.
- **Chrome is not prose.** Buttons, tabs, `.u-mono` labels and anything
  `aria-hidden` are `user-select: none`: selecting a button's label, a section
  numeral or the emoji in a card motif is never what someone meant.
- **Article text stays selectable** — the opener, blurbs and captions, which are
  the issue's own words and should be quotable. Where prose sits *inside* a
  button (the frame-of-the-month caption, the pop-out card's blurb) it carries
  `select-text` explicitly.
- **Display headlines are the exception, and they are chrome.** Anything with
  `spotlight` is `user-select: none` and takes `cursor: default`. The desk asked
  for both: a text caret over a headline "doesn't look nice", and the headline
  should not be selectable. `default` rather than `pointer` because the cursor
  rules above are semantic — `pointer` promises a click, and a heading doesn't
  do anything. This reverses the older rule that section headings stay
  quotable; the headline is now the one piece of type you can't select.

### Do not "improve" these

If you have a frontend-design skill loaded, it will flag several of the above as
generic AI tells: the cream background, ALL-CAPS eyebrow labels, middle-dot meta
strings, monospace data labels, trailing `→` on buttons, and accenting a single
word in a headline.

**On this project those are the brand, chosen by the client, visible on their
live production site.** The brief wins over the default. Do not strip them, do
not substitute "more distinctive" alternatives, do not quietly modernise them.
Matching the parent site is the entire job — this magazine has to read as the
same organisation, not as a better-designed neighbour.

The one place to spend judgement is anything the parent site doesn't cover,
since the magazine has article-reading needs the main site doesn't have. Ask
before inventing there.

---

## 5. How the page is put together

Worth knowing before you change any layout, because most of it is one mechanism
used repeatedly rather than eight bespoke sections.

- **`src/lib/issueSections.js`** is the running order. One manifest gives every
  section its number, its menu label, its colour, its opener `variant`, its
  `ground` and its `size`. A section appears only if the edition carries its
  data, and the numbering closes up around whatever is missing.
  - A section's `has()` must test the *section*, not one field. Gating the games
    section on a single game's field is what once silently dropped it out of the
    numbering entirely.
  - `size` (`"lead"` / `"sub"`) is prominence, declared per section. It is
    deliberately not derived from `variant` — that is how a supporting section
    ended up shouting at the same scale as a lead one.
  - `label` may be a **function of the edition**, for a section whose subject
    changes from issue to issue. The opener uses this: it is "What is AquaTerra"
    in Edition 01 and "The month" in Edition 02, and the index says which.
  - `blurb` is the section in one line. It lives here, not in the archive page
    that prints it, so the two can't drift.
  - The section accents are *editorial*, not a claim that Photography belongs to
    Social Media. This is the one area the parent site doesn't cover. If it ever
    reads as a team claim, set every `accent` to `"green"` and the issue goes
    monochrome.
- **`src/components/Section.jsx`** renders three grounds (plain / band / ink) and
  three opener variants (rule / numeral / centre). Everything that is a section
  goes through it.
- **`src/lib/utils.js`** holds `TEAMS`, `ISSUE_ACCENTS`, `SECTION_ACCENTS` and
  `isPlaceholder()`. Each edition picks one `accent` from `ISSUE_ACCENTS`, which
  sets `--issue-accent` on the page root so every accent word and rule shifts
  together and no two issues look alike.
- **The nav menu *is* the issue index.** It reads the same manifest, so it can
  never list a section the issue doesn't have. There is no separate "in this
  issue" block, and the menu does not mirror the parent site's nav.
- **`src/lib/buildStories.js`** derives the stories player entirely from the
  edition object. Nothing is authored for the player, so a story can never drift
  from the page it summarises.
  - A slide's `ms` is **computed from how much there is to read**, not fixed per
    kind. A three-word headline and a twenty-word one got the same 3.6s, so the
    long ones were cut off and the short ones sat there.
  - A slide carries the `section` it came from, which is what lets the player
    offer a way into that part of the page. The run is a trailer for the issue;
    it should not be a dead end.
  - The player is a **carousel of topics**, the shape every stories player uses:
    the live chapter centred, the ones either side peeking back at reduced
    scale, chevrons in the gaps between them. The card header names the current
    chapter and its position inside it, where Instagram names the account.
  - **Every topic is a face on one stage**, at `[data-topic-face]`. Moving is a
    single transition — the outgoing card shrinking as the incoming one rises to
    size — not a swap. On a phone the same faces sit on a **cube**: each is
    rotated a further quarter turn and pushed out by half the card's width, and
    the stage counter-rotates. The stage is also pulled back by that same
    radius, so the face you are looking at lands flat at 1:1; without it,
    perspective magnifies the live face past the edges of the screen.
    The two transforms differ, so the phone/desktop choice is made in JS from a
    `matchMedia`, not in CSS.
  - The non-live faces must stay rendered on a phone. Hiding them (they are
    `hidden lg:block` on wide screens) makes the outgoing face vanish the
    instant a move starts, and only the incoming one turns.
  - **The faces are scenery. Every tap belongs to one stationary surface**
    (`[data-surface]`), sized to the live card, sitting outside the stage. Both
    faces are in flight during a move, so the live card is not yet under the
    pointer while the outgoing one still is — while faces took clicks, a tap in
    that window landed on the *departing* topic and jumped back to it, and
    tapping fast enough the run looped between two topics and never ended.
    z-index cannot fix that; the two are in different places, not stacked.
    - The surface has to sit **outside** the stage: inside it, the cube's
      rotation turns the surface away along with everything else and taps stop
      landing at all.
    - The stage itself is `pointer-events: none` too, or it catches the taps
      before they reach the surface. The live card's own controls — pause,
      close, the chip, the end-card buttons — opt back in with
      `pointer-events-auto`.
  - **Tap moves a card, swipe moves a topic**, swipe down closes. Keep that
    split — it is what the gestures mean everywhere else, and what the desk
    asked for.
  - **Tapping back stops at the first card of the current topic.** Crossing out
    of a topic backwards is what a swipe, a chevron or a peek is for, so a stray
    tap can't walk you out of what you are reading. Forward still crosses, as
    the auto-advance does.
  - The progress bar is grouped **by chapter**. Twenty-one equal segments in a
    26rem card were 12px each and told you nothing.
  - **The way into the issue lives in the player's bottom bar, not in the
    slide.** On a phone the card is the whole screen, so an absolutely placed
    chip floated over the artwork and landed wherever that slide's content
    happened to end. The bar gives it one position on every slide, above the
    thumb, with the counter under it. It is keyed on the slide so it still
    rises in each time.
  - **Both ends of the card carry a scrim**, or the wash runs off a hard edge
    and reads as the picture being cut rather than ending — most obvious on a
    phone, where the card is full-bleed. The bottom one is taller because that
    end carries the bar.
  - **The chrome at both ends clears the phone's insets**
    (`env(safe-area-inset-*)` inside a `max()`), so the progress bar and header
    stay out from under a notch and the bar clears the home indicator. `max()`
    leaves the desktop exactly as it was, where the insets resolve to 0.
  - **A slide's dwell is deliberately slower than reading speed.** A story
    slide is not a paragraph: you have to notice it, take in a figure or a
    photograph, read the line, and decide whether to tap through, while the run
    auto-advances out from under you. 230ms a word was a brisk 260wpm with none
    of that slack; it is 320ms and a 1.35x base now. The teams slide sizes
    itself off the roster rather than off words, so it does not go through
    `dwell()` and has to be lengthened in step with it by hand.
  - Two earlier attempts at chapter navigation are worth not repeating: a row of
    text pills in a horizontal scroller (which painted `.scroll-quiet`'s cream
    scrollbar across the dark card), and a row of five rings inside the card
    (redundant once forward and back move a topic at a time).
  - **The URL says whether the player is open**, not `Highlights`' own state.
    `/2026/september/stories` plays the run and `/…/stories/teams` starts on
    that chapter, so a run is shareable, opening one from a ring puts that link
    in the address bar to copy, and the browser's Back button closes the player
    for free — the route stops matching and it unmounts.
    - Closing reads `location.state.fromIssue`: a push if you opened it here,
      so Back and the close button agree, and a `replace` if you arrived on the
      link, so Back still leaves the site rather than reopening the player.
    - A chapter the issue doesn't have still plays — the whole run, with the
      address bar corrected. An issue dropping a section (October and `teams`)
      must not turn a link someone already sent into a dead one.
    - **`App.jsx`'s page key strips the `/stories` suffix.** It is keyed on the
      path so a navigation fades in, and keying on the full pathname remounts
      the whole issue underneath the overlay and throws away your scroll
      position on the way in and out.
- **`isPlaceholder()`** lets the placeholder state be *designed* rather than just
  look broken: bracketed copy renders dimmed, short fields get a dashed rule. It
  disappears on its own as real copy lands.

---

## 6. Publishing model

- Editions are monthly.
- **Edition 1 — "What is AquaTerra"** is the **September 2026** issue. It's the
  orientation issue: what AquaTerra is, the 8 teams, how roles work. Not a
  recap. It carries no `openings` section — that was the desk's call for this
  issue specifically, not a permanent removal.
- **Edition 2 onward** publish at **month end** and recap the month just
  finished — drives run, internal updates, what's cooking.
- **Edition 2 carries no `teams` section.** The desk's call, the same way
  Edition 1 carries no `openings`. Both are per-issue decisions, not permanent
  removals — put the field back when an issue wants it. Nothing else had to
  change: a section renders only when the edition supplies its data, so the
  numbering, the issue index and the stories player all closed up on their own.
- Slugs, IDs and ordering follow whatever `src/data/editions.js` already does.
  Read it; don't invent a convention.

---

## 7. Adding an edition

One file, one object. Nothing else.

1. Open `src/data/editions.js`.
2. Copy the newest edition object. The key is `"<year>-<2-digit-month>"`, e.g.
   `"2026-10"`.
3. Update, at minimum: `key`, `slug` (lowercase month name — this is the URL),
   `month` (capitalised), `year`, `editionNumber`, `accent`, `lockup`,
   `tagline`, `cover`.
4. Give it `status: "upcoming"` while the month it recaps is still running. The
   archive then shows it as in progress — dashed border, "IN PROGRESS" badge,
   readable but not announced as live. **Delete that line on publication day and
   move `LATEST_KEY`.**
5. Set `LATEST_KEY` to the newest edition that is actually *out*. It is not
   simply the last object in the file — an upcoming issue sits below it. This
   drives the "Latest" badge, the archive's featured card and the "now live"
   strip, so an issue that isn't published must not hold it.
6. Give it an `accent` no neighbouring issue is using, so two issues never read
   as the same page with different words.
7. Replace the content. **Anything you do not have a real value for stays a
   `[bracketed placeholder]`** — that is not laziness, it is rule 0.
8. Save. The archive grid, the year selector, the month strip, the prev/next
   links, the section numbering and the stories player all pick it up.

Three blocks are shared rather than copied, because none of them is a month's
data: `TEAM_ROSTER` (the 8 teams), `AQ_GAMES` (the games — organisation running
totals, not monthly figures) and `AQ_TOTALS` (the headline numbers the archive
prints). Point at them; don't duplicate them into a new edition.

### Which sections appear

Every section renders only when the edition supplies its data, so a month with
no student-business news simply doesn't show that strand. **Add a field, not a
file.**

| Field | Section |
|---|---|
| `opener` | the opening essay — prose, a pull quote, a fact panel |
| `glance` | the numbers |
| `teams` | the 8 teams, each in its identity colour |
| `featured` | the month's stories, mixed across teams |
| `photography` | credited photo of the month + frame wall |
| `games` | the three mini games — `bigger`, `guess`, `match` |
| `impact` | metrics + goal progress |
| `openings` | roles to join, from HR |
| `people` | member profiles |

The stories player is not a field — it is built from all of the above.

Optional per-edition extras: `video` (a URL) and `pdf` (a file path). Each
renders a button in that month's hero; leave them off and no button appears.

### Rules specific to edition data

- **Every figure in `games` must be a verified fact** (§2). A game whose answers
  are invented is rule 0 with a scoreboard attached. Re-check them before
  publishing. That extends to the lines the games reveal: a `note` or a `then`
  may only restate something §2 or the roster already says, because the reveal
  is what the player takes away.
- `bigger` entries need `value` (the number the game compares) and `display`
  (how the site writes it, e.g. `"1,300+"`). Never let the two disagree. An
  optional `note` is the verified line the reveal leaves you with; the margin
  between the two figures is computed, not authored, and is written as "the
  other" rather than "as many" because the pair is often two different kinds of
  thing.
  - **Pairs are drawn from within 6× of each other.** The pool spans 1 to
    15,000, and an unbiased draw mostly asks whether 15,000 is more than 1,
    which is not a question. Keep the pool deep enough that near pairs exist.
- `guess` is a **pool, not a run**: four rounds are drawn from it each time, so
  a second go asks different questions. Give it more than four. Rounds need
  `max` and `step` for the slider track, and a `prompt` that carries enough
  context to reason from — "how many members does AQ have?" is a shrug,
  "sixteen students started it in June 2021, how many now?" is a guess.
- `match` clues are trimmed from the teams' own bios on the live site, never
  rewritten. `then` is the line a correct match leaves on the board — again
  that team's own published detail, not new trivia.
  - Both columns are shuffled. With the teams in roster order the board is
    solvable top-down off the teams section further up the same page.
- `featured[].category` is free text, but it also becomes a filter chip — reuse
  an existing category rather than inventing a synonym. The ones in use:
  Welfare, Events, Student business, Workshop, Collabs, Social, Photography.
- `featured[].team` must be a key from `TEAMS`. It is also what a team card
  links to (`#feature-<team>`), so at most one story per team gets the anchor.
- `opener` is the issue's prose answer to whatever its headline asks. Edition
  01's headline is "WHAT IS aquaterra."; its opener is where that gets answered,
  and every fact in it is from §2. It takes `label` (names the section in the
  index), `lockup`, `standfirst`, `body` (an array of paragraphs — the first
  gets a drop cap), `pull` (one line set large), `byline` and `facts`.
- `people` entries stay bracketed until the desk supplies real names, roles,
  quotes and portraits. §2 is explicit about this.
- `impact.progress[].percent` may be `null` — the bar then renders as an empty
  track with `[--]` rather than a made-up fill. An invented progress bar is an
  invented statistic.

---

## 8. Adding images

Two directories, two different jobs. Details and per-file specs are in
`public/recaps/README.md` and `public/assets/README.md`; the rules are here.

### Photography for an edition → `public/recaps/<year>/<month>/`

1. Drop the file in, e.g. `public/recaps/2026/october/frame-01.jpg`.
2. In `src/data/editions.js`, set that item's `src` to the path **from the web
   root**: `src: "/recaps/2026/october/frame-01.jpg"`. Not a relative path, not
   an import.
3. `<Photo>` uses the real file the moment `src` is set, and falls back to an
   on-brand placeholder tile until then.

### Brand assets → `public/assets/`

The logo, the Open Graph card. Fixed filenames, referenced directly by the app.
See that directory's README before replacing either.

### Rules for any image you add

- **Never add a stock photo, an AI-generated image, or a photo of people who
  are not AquaTerra members.** The placeholder tile is the correct thing to ship
  when there is no real photo. It is designed, it is on-brand, and it reads as
  deliberately unfinished rather than broken. A stock photo of strangers on an
  NGO's magazine is a lie about who turned up.
- **Never attribute a photo to a name you were not given.** `credit` comes from
  the desk. `"[Member name]"` until then.
- Photos must have been shot by an AquaTerra member. That is the premise of the
  photography section.
- `alt` matters: `<Photo>` falls back to `label`, so write labels that describe
  the frame, not "image 3".
- Never commit a file over ~500KB. Resize and re-encode first — this is a
  magazine that gets read on phones on Indian mobile data.
- Placeholder tiles name an icon from `src/lib/photoIcons.js`. **Using a new
  icon name in `editions.js` means adding it to that registry too**, or the tile
  silently falls back to the generic image icon. The registry is explicit
  precisely because `import * as Icons from "lucide-react"` pulled the entire
  library into the bundle (~1.07MB).

---

## 9. Decisions already made — don't relitigate

Each of these was a deliberate call, most of them the desk's. Check `git log`
before reversing one.

- **Work goes on `main`.** The desk asked for this directly: commit and push
  there by default, and only branch when a change is big or has several parts
  that want reviewing separately. The site deploys from `main`, so work parked
  on a branch is work nobody can see.
- **The magazine links nowhere outside itself.** No parent-site links, no
  socials, not in the footer. Asked for twice.
- **The footer is the bar only** — wordmark, mascot, two mono lines. The cream
  welcome-letter panel and the Instagram/LinkedIn pills were both built and then
  removed at the desk's request.
- **The nav menu replaces the "in this issue" index**; it does not mirror the
  parent nav.
- **No Groundwork Diaries section.** Removed entirely.
- **No avatar stacks on team cards** — there are no member photos, and the
  member count is already on the card.
- **No "roles open" line on team cards**, and no arrow at all. The card used to
  link to that team's story in the issue; the desk asked for the arrow and the
  jump to go.
- **The eight teams are a collectible set.** Tapping a card opens it as a
  trading-card-style pop-out, and reading all eight fires a full-screen
  celebration.
  - **Progress is deliberately not persisted.** It lives in React state for the
    visit and resets on reload. The desk asked for this: the set is something
    you do, not a checklist the site remembers having made you do. Don't put it
    back in `localStorage`.
  - The celebration fires **once, on the card that completes the set** — not
    every time the set happens to already be complete. It is a takeover, not a
    panel: it used to be a block appended under the card, which meant the payoff
    for collecting all eight was some text you had to scroll to.
  - The card shows only that team's own published data. There is **no per-team
    trivia to reveal** that isn't already on the page, and inventing some would
    be rule 0. The fun is the collecting, not new facts.
  - The reward is the full palette in one place plus the site's own "pick a team,
    show up, and get to work." **Do not invent a prize** — there isn't one to
    offer, and a fake one is worse than none.
  - Navigation inside the pop-out is the row of eight dots, which doubles as the
    progress meter, and a sideways drag on the card itself. No arrows there
    either — a drag is a gesture, not a control.
  - The card is drawn as a foil card, so it behaves like one: see "The card
    foil" in §4 for what is load-bearing in that.
  - Crftd's identity colour is `#000`, so the card and its chips carry a faint
    cream ring; without it a black card has no edge against the scrim.
- **The orbit banner has no poster still, and reduced motion is the bare
  palette.** A reader with reduce-motion on gets the eight team colours and
  nothing else. The desk's call, in these words: *I would rather the colourful
  circles than a random screenshot.* The `footer-vid.jpg` slot existed, was
  never filled, and is now gone from the code and from
  `public/assets/README.md` — the file was only ever requested to 404. **Don't
  add one back**, and don't read the missing file as an unfinished asset: the
  palette *is* the reduced-motion state. A frame pulled from AquaTerra's own
  footage was offered and declined too, so this is not about image provenance.
- **The console egg (`consoleBanner.js`) is for a reader, not the desk.**
  `aq.todo()` listed every still-bracketed field in the current issue; the desk
  had it removed. It was the one command that talked to the people making the
  magazine rather than the people reading it, and an issue advertising its own
  holes to anyone who opens DevTools is not the impression to leave.
  - **It says only what the page already says.** Every figure it prints is on
    the site — `AQ_TOTALS` is in `HeadlineNumbers`, the whole section manifest is
    in `IssueAnatomy`, the team names and counts are on the team cards. Nothing
    goes in that a reader can't already see.
  - **Nothing addressed to the desk, however small.** `aq.numbers()` used to
    close with "they move — go and re-check them", which is an instruction to
    whoever publishes next, not a fact for whoever is reading. Same mistake as
    `aq.todo()` in quieter clothes.
  - **It is deliberately under-explained.** Whoever opened DevTools can read a
    table. The commands carry no footnote each, and the banner doesn't teach —
    it signs off with `ps — aq.help() for the rest of it.` and gets out of the
    way. `aq.help()` is the one place explanation belongs, and it gets one line.
  - A figure paired with a word written in this file (`aq.bananas()`) must bail
    when the figure is missing rather than fall back to another row — printing
    "540+ bananas distributed" would be rule 0 with a 34px font.
  - **Every command is a getter.** Typing `aq.teams` without the brackets reads
    the property and stops, so the console prints the function's source and
    nothing happens — which looks like the egg is broken. Reading one now
    queues it for the next tick and returns the function, so `aq.teams` prints
    its table a moment later and `aq.teams()` cancels that and runs straight
    away. Either spelling prints once.
  - `aq.read` is the exception: its output is navigating away, and a stray read
    in the console should not take the page with it, so that one asks for the
    brackets. Any future command that *does* something rather than printing
    belongs in `ASKS_FIRST` beside it.
  - Every figure it prints is read from the data, never typed into that file.
    The line under `aq.teams()` used to call Crftd a one-person team; the
    roster moved and the sentence didn't. It counts now.
- **Edition 1 is September 2026**, not October. Corrected by the desk.
- **1,300+ is the current member count**, resolving the live site's own conflict
  with an HR bio that still says 1,100+.
- **The issue answers its own headline.** Edition 01 asked "what is AquaTerra"
  and never said. The `opener` section exists so a headline that asks a question
  gets one, above the numbers rather than after them.
- **An upcoming issue is visible but not announced.** It sits in the archive
  marked in progress. The alternative — letting it take `LATEST_KEY` — has the
  "now live" strip telling 1,300+ members an issue is out when it isn't.
- **The year after the last published one shows as "soon"**, selectable, and
  explains itself when picked. It used to be a hardcoded dead grey pill. Both
  the published years and the coming one are derived, so neither can go stale.
- **The archive carries the running totals and the format**, because an archive
  of one or two issues is otherwise a nearly empty page. Both read from existing
  sources — `AQ_TOTALS` and the section manifest — so neither can drift.
- **Three mini games, not a quiz.** Eight multiple-choice questions in a row is
  a worksheet. Each game has a different interaction: tap to compare, drag to
  estimate, pair to learn.
- **The long grids collapse on phones only**, via a CSS `nth-child` rule rather
  than by slicing the array — so the cut-off follows the viewport with no resize
  listener, and every item stays in the DOM for in-page search. `after` must be
  one of the values `index.css` writes a rule for (2, 3, 4, 6); `nth-child`
  cannot read a custom property.
- **The bundle**: icons are imported explicitly, never via a namespace import.
  This took the bundle from 1071kB to ~368kB. Don't undo it.

### Traps that have already bitten, twice each

- **`position: fixed` inside a section.** A finished CSS animation with
  `animation-fill-mode: both` that touches `transform` leaves an identity
  matrix behind, and any transform on an ancestor makes that ancestor the
  containing block for `position: fixed`. That pinned the lightbox inside its
  section. Fixed two ways: `.reveal` uses `backwards`, and every overlay renders
  through `createPortal` into `<body>`. Keep both.
- **Reduced motion clamps every CSS animation to 0.001ms.** Anything whose
  *timing* is content — the stories player's pacing — must run on
  `requestAnimationFrame`, not a CSS animation, or it blasts through every
  slide instantly.
- **Tailwind v4 has no `xs:` breakpoint** and its opacity scale has no `/97`.
  Both failed silently.
- **A flex-centred overlay clips its own top** once the content grows taller than
  the viewport: the overflow goes above the scroll origin and cannot be reached.
  Scroll on the outer box and centre on an inner one that is free to grow past
  it (`min-h-full` + `justify-center`).
- **Every animation's END state must be its resting state.** Reduced motion
  clamps animations to 0.001ms with the fill mode still applied, so a keyframe
  that ends mid-flight freezes there. The confetti ends at opacity 0, which is
  why it simply never appears under reduced motion instead of hanging in the
  air.
- **A non-breaking space on both sides of a middle dot** welds the whole string
  into one unbreakable run. Bind the side that must travel with the word, not
  both.
- **Whitespace inside an `overflow: hidden` inline-block is trimmed.** The
  stories' kinetic type puts each word in its own masking span; a separating
  space placed *inside* that span vanishes and every headline renders as
  "WHATIS aquaterra." The space has to sit between the spans — and it has to be
  an ordinary space, because a non-breaking one there stops the line wrapping.
  Both halves of that have now been got wrong once each, so `stories.mjs`
  asserts the rendered text of four headlines.
- **Stale values across editions.** Stat labels repeat month to month, so React
  reuses the component; animated counters are keyed off `value` so a new number
  re-counts instead of showing last month's figure.
- **`vercel.json` is strict JSON** validated against Vercel's schema: no
  comments, and rewrite objects reject unknown keys. The reasoning lives in
  `README.md`.
- **The SPA rewrite excludes paths with a file extension.** A plain catch-all
  returns `200 text/html` for a missing font, which the browser then tries to
  parse as a font. If you add a route containing a dot, that pattern will stop
  matching it.
  - That is no longer hypothetical: `/:year/:month/stories/:chapter` puts a
    `CHAPTERS` id straight into a path. A chapter called `aq.ventures` would
    work perfectly in dev and 404 in production, where nothing you can do in a
    browser would tell you why. Keep chapter ids plain.

---

## 10. Before you finish any task

- [ ] Did I read `src/data/editions.js` this session?
- [ ] Is every AquaTerra fact in my output traceable to this file, that data
      file, or the user?
- [ ] Did I list every `[placeholder]` I left, in my reply?
- [ ] Team names cased correctly? (`Crftd`, `ShikshAQ`, `AQ.Ventures`, `AquaTerra`)
- [ ] Any banned string slip in? (`Roots`, `1,200+`, `550+`, `Groundwork Diaries`,
      third-party stats)
- [ ] Did I add an outbound link anywhere?
- [ ] Did I add a per-edition component instead of extending the template?
- [ ] Did I strip a brand signature because it looked like a default?
- [ ] Do headlines use the caps + italic-word + period lockup?
- [ ] Any hex I introduced — did I mark it as approximate, or confirm it?
- [ ] Any name, title, or quote attributed to a real person? If yes, remove it
      unless the user supplied it in this conversation.
- [ ] `npm run lint && npm run build` clean?
