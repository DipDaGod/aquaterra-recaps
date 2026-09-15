# CLAUDE.md — working rules for AquaTerra Recaps

Read this fully before touching anything in this repo. These rules are not
optional and this is not a summary — it is the whole thing. (It absorbed the
old `aq.md`, which no longer exists. Any older instruction to "read aq.md"
means read this.)

Last verified: 15 September 2026, against the live site at ngoaquaterra.com
and screenshots of it.

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
AquaTerra. React 19, Vite, Tailwind v4, React Router. Two routes:

- `/` — the archive page listing every edition
- `/:year/:month` — one page per edition: that month's stats, the teams,
  featured stories, a photography section with a full-screen viewer, mini
  games, an impact panel, volunteer profiles, and an Instagram-style stories
  player at the top

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
| Events Team | volunteer team | 3 |
| Collabs Team | volunteer team | 2 |
| Human Resources | volunteer team | 6 |
| ShikshAQ | student business | 2 |
| AQ.Ventures | student business | 23 |
| Crftd | student business | 1 |

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

It is deliberately cheap, and the constraints are load-bearing:

- one `<video>`, `preload="none"`, not fetched until the banner is near the
  viewport; **`muted` is required** or autoplay is refused outright
- one rAF loop for all eight canvases, capped at 15fps. It is decoration; 60fps
  costs four times the CPU for nothing anyone can see
- the loop and the video both stop when the banner scrolls out of view or the
  tab is hidden, which lets the decoder release its buffers
- 160×160 backing stores — 0.8MB for all eight — and no pixel readbacks
- under reduced motion the video is never loaded: the poster is drawn once
- the drift is a CSS animation, not a scroll or pointer handler, so it runs on
  the compositor and reduced motion switches it off for free

Before the video file exists, or if it fails, each bubble keeps a team-colour
tint — so the banner never looks broken, it just looks flatter. The banner and
the footer are one continuous dark block; the footer has no top margin for that
reason.

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
- **Article text stays selectable** — the opener, blurbs, captions, and section
  headings, which are the issue's own words and should be quotable. Where prose
  sits *inside* a button (the frame-of-the-month caption, the pop-out card's
  blurb) it carries `select-text` explicitly.

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
  publishing.
- `bigger` entries need `value` (the number the game compares) and `display`
  (how the site writes it, e.g. `"1,300+"`). Never let the two disagree.
- `guess` rounds need `max` and `step` for the slider track.
- `match` clues are trimmed from the teams' own bios on the live site, never
  rewritten.
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
    progress meter. No arrows there either.
  - Crftd's identity colour is `#000`, so the card and its chips carry a faint
    cream ring; without it a black card has no edge against the scrim.
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
