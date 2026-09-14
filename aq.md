# aq.md — working rules for AquaTerra Recaps

Read this fully before touching anything in this repo.

Last verified: 14 September 2026, against the live site at ngoaquaterra.com and screenshots of it.

---

## 0. The one rule

**Never invent AquaTerra facts.** Not a number, not a name, not a date, not a project, not a
quote, not a team, not a member count. If you need a value and it is not in this file, not in
`src/data/editions.js`, and not something the user just told you — leave a `[bracketed
placeholder]` and say in your reply which placeholders you left.

This is a real NGO publishing a real magazine to its own 1,300+ members. A plausible-sounding
wrong number is worse than an obvious blank, because a blank gets filled and a wrong number gets
published.

"Sample data", "example content", "illustrative figures" and "for now I'll use…" are all the same
mistake. Don't.

---

## 1. What this repo is

AquaTerra Recaps is a standalone monthly-recap site — a digital magazine — for AquaTerra. React 19,
Vite, Tailwind v4, React Router. Two routes:

- an archive page listing every edition
- one page per edition: that month's stats, featured projects, internal happenings, a photo gallery
  with lightbox, an impact panel, volunteer profiles

Everything is data-driven from `src/data/editions.js`. There is no per-month component. Adding a
month means copying one object; every page picks it up automatically.

**Consequence: do not create per-edition components or per-edition routes.** If a month needs
something the template can't express, change the template and the schema — not that one month.

### Before you write code

Read `src/data/editions.js` first, every session. Do not guess its field names, its nesting, or
what's optional. The schema in that file is the contract; this document does not restate it,
because a restatement would go stale and you'd trust the stale copy.

### Current state

Content is placeholder throughout — every `[bracketed]` field, all photography. A design and
correctness pass has already been done (archive grid sizing, gallery/impact/people grids adapting
to real content volume, stale stat carryover between months, two dead buttons removed, bundle cut
65% by killing a wildcard icon import). **Don't redo that work.** If something looks wrong, check
git log before "fixing" it.

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

These move. Before publishing an edition, re-check them against the live site rather than trusting
this table. If a number here conflicts with the live site, the live site wins.

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

Each team's own one-liner, as the site describes them:

- **Welfare Team** — 3,500+ kids reached in teaching workshops. 8 Sundarbans relief trips. Dog feeding.
- **Social Media** — Instagram, LinkedIn, website. 3,200+ followers on @ngo.aquaterra. Reels.
- **Events Team** — Paradox. Disco Diwali. Starry Nights. Every fundraiser AQ has ever run.
- **Collabs Team** — School collabs, college collabs, NGO partnerships, outreach.
- **Human Resources** — Recruitment, onboarding, certificates, Letters of Recommendation.
- **ShikshAQ** — Tuition discovery platform built by AQ members for Kolkata students.
- **AQ.Ventures** — Helps student entrepreneurs turn ideas into visible ventures.
- **Crftd** — Student-run streetwear brand. Design, production, sales. Profits fund AQ welfare.

Casing traps, in order of how often they get broken:

- `Crftd` in prose and nav. `CRFTD` only as a display-caps heading. Never `CRFTD` mid-sentence.
- `ShikshAQ` — capital S, capital A, capital Q. Never `Shikshaq`, `ShikshaQ`, `SHIKSHAQ` in prose.
- `AQ.Ventures` — with the period, no space.
- `AquaTerra` — capital T. Never `Aquaterra` or `AquaTerra`'s lowercase form in headings you write.
- `AQ` is the accepted short form in body copy.

### Banned strings

These are from an older version of the org and are **wrong now**:

- ❌ `AQ Roots` / `Roots` / `@roots.aquaterra` — the clothing label is **Crftd**.
- ❌ `AQ Shikshaq` — it is `ShikshAQ`.
- ❌ Any count of "600+ workshops" or "2,500+ kg of clothing" or "15,000 stray dogs fed" or
  "35+ partners" — these appear on third-party directory sites (TheOrg, RocketReach, old Medium)
  and are **not** currently published by AquaTerra. Don't source from those sites at all.
- ❌ `1,200+ members` / `550+ drives` — stale figures still in Google's index.

### Paradox

AquaTerra's flagship fest. Latest edition per the site: **Paradox 2026**, 1–6 June 2026, Kolkata.
10+ events. 6 days. 100% of profits funded welfare. The site marks it `WRAPPED`.

### Links

- Site: https://www.ngoaquaterra.com
- Instagram: @ngo.aquaterra
- LinkedIn: NGO AquaTerra
- ShikshAQ: shikshaq.in
- The blog is called **Groundwork Diaries** (`/blog`), not "Blog" or "Stories".

### Not verified — do not write these

- **Any founder or office-bearer name or title.** The site says "16 students" and names nobody in
  a masthead. Kanishk Agarwal is associated with AquaTerra; his exact title is not published
  anywhere I could confirm. A president's name appears on a data-broker scrape, which is not a
  source. Edition 1 is literally "what is AquaTerra and roles" — get the masthead from Kanishk
  directly and paste it in. Do not reconstruct it from LinkedIn.
- Individual member names, photos, quotes, or attributed testimonials.
- Any drive, workshop, event or partnership not listed above.
- Founding-date precision beyond "June 2021".

---

## 3. Voice

AquaTerra writes in a specific register. Match it; don't write NGO copy.

**Rules, from the site's own text:**

1. **Lowercase sentence starts** in body copy and subheads. Display headlines are ALL CAPS. Both
   are deliberate. Don't "fix" either.
2. **Concrete numbers instead of adjectives.** Not "significant impact" — "15,000+ bananas
   distributed". The bananas line is the house style in miniature: specific, faintly absurd,
   unarguably true.
3. **Short declaratives.** Periods where a lesser writer uses commas.
4. **Parentheses carry the warmth.** *student stories from the ground (Sundarbans trips, plantation
   drives, the late-night event builds) written by the AquaTerra members who were actually there.*
5. **Dry self-deprecation.** *started in Kolkata. got out of hand.*
6. **Second person, plainly.** *Pick a team, show up, and get to work.*
7. **Instructional microcopy is explanatory, not decorative.** Real example from the site:
   *the marker tells you what the tap does · dot filters this page · arrow goes elsewhere ·
   corner arrow opens a new tab.*

**Reference passage** — the site's welcome letter, for tone calibration:

> welcome, friend
>
> AquaTerra exists because a few students in Kolkata decided a Saturday afternoon could go to a
> feeding drive instead of nothing in particular, and then showed up again the next one.
>
> whether it is your first drive or your fiftieth, this is a letter to the people who make AQ what
> it is: **you**. not the org account, not the desk, the volunteer who turned up.
>
> thank you for making it real.
>
> *love, the AquaTerra team*

**Never write:** "empowering youth", "driving change", "making a difference", "passionate about",
"journey", "ecosystem" as a buzzword, "we are thrilled to announce", em-dash-heavy consultant
prose, or any sentence that could appear on any other NGO's site.

"the desk" is AquaTerra's term for the editorial/leadership function (*picked by the desk*). Use it.

---

## 4. Design system

Observed from the live site. **The hex values below are eyeballed from screenshots — treat them as
approximate.** Before finalising, pull the real values from the main AquaTerra site's CSS or ask
the user. Flag them as approximate in any PR.

### Colour

| Role | Approx. | Notes |
|---|---|---|
| Paper / page background | `#F4EFE0` | Confirmed exactly — it's the site's `theme-color` meta. Warm cream. |
| Ink / dark panel | near-black, ~`#0B0B0B` | Big rounded dark panels inset on the cream. The site's `theme-color` on dark pages is `#0A2540` (navy) but the rendered panels read near-black — confirm which is canonical. |
| Green (primary accent) | ~`#1B7A4B` | Active nav pill, primary CTA, italic accent words, the 540+ card. |
| Blue | ~`#3AA0F0` | The 1,300+ card, step numbers, Events Team. |
| Yellow | ~`#F5C518` | The 8-teams card, "featured drives" pill, ShikshAQ. |
| Pink | ~`#FF3D8B` | Human Resources. |
| Purple | ~`#8B5CF6` | Social Media. |
| Teal | ~`#0E8C8C` | Collabs. |
| Orange-red | ~`#FF4A2B` | AQ.Ventures, Paradox badge and CTA. |
| Black | `#000` | Crftd. |

The bright colours are **team identity colours**, not decoration. Each of the 8 teams owns one.
Don't reassign them, don't add a ninth, don't use a team colour for something that isn't that team.

### Typography

Four roles. Confirm the actual families from the main site's CSS before setting them — I could not
read them from the rendered page, and guessing a font is the same sin as guessing a number.

1. **Display** — very heavy grotesque, ALL CAPS, tight tracking, set enormous. Carries every
   section opener.
2. **Serif italic accent** — a high-contrast italic serif, used for exactly one word per headline,
   in an accent colour, **always followed by a period**. This is the signature.
3. **Body** — humanist/geometric sans, lowercase, generous line-height.
4. **Mono** — uppercase, letterspaced, small. Used for eyebrows, stat labels, meta strings, the
   copyright line.

Plus a **handwritten script** used once, for the letter sign-off. Once. Don't spread it.

### The headline lockup

This is the most recognisable thing about the brand. Real examples:

```
THE directory.          THE drives.
PICK A LANE, THEN turn up.
COME AND DO SOMETHING real.
PARADOX 2026.
```

Heavy caps + one italic serif word in colour + a terminal period, often a filled square block as
the period. Build every major section heading this way. Get the italic word right — it should be
the noun that carries the meaning, not a random emphasis.

### Shape and layout

- Pills everywhere: nav items, filter chips, buttons, badges. Fully rounded.
- Cards and panels: large rounded rectangles, roughly 16–24px radius. The dark hero panel sits
  inset on the cream page with visible cream margin around it — the page background is never
  edge-to-edge dark.
- Stat blocks: big bold number, tiny uppercase mono label beneath. Row of 3–4.
- Team cards: a solid team-colour block on top with a small illustrated card-fan motif, then the
  name, then `volunteer team · N members`, then an avatar stack, then a two-line description,
  then a coloured link in the team's own colour.
- Meta strings joined with middle dots: `8 DEPARTMENTS · 570+ DRIVES, BLOGS & OPENINGS`.
- Links and CTAs carry a trailing `→`.

### Do not "improve" these

If you have a frontend-design skill loaded, it will flag several of the above as generic AI tells:
the cream background, ALL-CAPS eyebrow labels, middle-dot meta strings, monospace data labels,
trailing `→` on buttons, and accenting a single word in a headline.

**On this project those are the brand, chosen by the client, visible on their live production
site.** The brief wins over the default. Do not strip them, do not substitute "more distinctive"
alternatives, do not quietly modernise them. Matching the parent site is the entire job — this
magazine has to read as the same organisation, not as a better-designed neighbour.

The one place to spend judgement is anything the parent site doesn't cover, since the magazine has
article-reading needs the main site doesn't have. Ask before inventing there.

---

## 5. Publishing model

- Editions are monthly.
- **Edition 1 — "What is AquaTerra"** is the **September 2026** issue. It's the orientation
  issue: what AquaTerra is, the 8 teams, how roles work. Not a recap.
  (Corrected from October by the desk, 14 Sep 2026.)
- **Edition 2 onward** publish at **month end** and recap the month just finished — drives run,
  internal updates, what's cooking.
- Slugs, IDs and ordering follow whatever `src/data/editions.js` already does. Read it; don't
  invent a convention.

---

## 6. Before you finish any task

- [ ] Did I read `src/data/editions.js` this session?
- [ ] Is every AquaTerra fact in my output traceable to this file, that data file, or the user?
- [ ] Did I list every `[placeholder]` I left, in my reply?
- [ ] Team names cased correctly? (`Crftd`, `ShikshAQ`, `AQ.Ventures`, `AquaTerra`)
- [ ] Any banned string slip in? (`Roots`, `1,200+`, `550+`, third-party stats)
- [ ] Did I add a per-edition component instead of extending the template?
- [ ] Did I strip a brand signature because it looked like a default?
- [ ] Do headlines use the caps + italic-word + period lockup?
- [ ] Any hex I introduced — did I mark it as approximate, or confirm it?
- [ ] Any name, title, or quote attributed to a real person? If yes, remove it unless the user
      supplied it in this conversation.
