// The ONLY place a monthly edition is added. The archive and every
// /:year/:month page render from this object — there is no per-month component.
// Step-by-step instructions are in CLAUDE.md §7.
//
// RULE 0 (CLAUDE.md §0): never invent an AquaTerra fact. Every unverified value
// below is a [bracketed placeholder]. Figures that ARE verified against the
// live site are marked `// verified` and may be used as-is.

// A photo entry. `src` is null everywhere until real photography lands — see
// public/recaps/README.md. `credit` names the member who shot it and must come
// from the desk, never from a guess.
function photo(tone, icon, label, { size = "md", credit = null } = {}) {
  return { src: null, tone, icon, label, size, credit };
}

// The newest edition that is actually out. Drives the "Latest" badge, the
// archive's featured card and the "now live" strip. It is NOT simply the last
// object in this file — an issue can sit here as `status: "upcoming"` while the
// month it recaps is still running. Move this on publication day.
const LATEST_KEY = "2026-09";

// The 8 teams, copied from the parent site's own teams grid markup and trimmed
// for length. CLAUDE.md §2: the live site wins, so this — not the summary in
// that file — is the source for team blurbs. Don't "correct" one to match it.
//
// No `href`: the magazine links nowhere outside itself. A team card points at
// that team's own story in this issue, or is plain text when there isn't one.
//
// The live site's HR bio says "1,100+ members" against a headline 1,300+; the
// desk confirmed 1,300+. Worth correcting on the parent site too.
export const TEAM_ROSTER = [
  {
    key: "welfare", members: 62,
    blurb: "3,500+ kids reached in teaching workshops. 8 Sundarbans relief trips. Dog feeding drives.",
  },
  {
    key: "social", members: 29,
    blurb: "Instagram, LinkedIn, website. 3,200+ followers. Reels, carousels, copy, strategy.",
  },
  {
    key: "collabs", members: 2,
    blurb: "School collabs, college collabs, NGO partnerships, outreach.",
  },
  {
    key: "shikshaq", members: 2,
    blurb: "Tuition discovery platform built by AQ members for Kolkata students. Launched 2026.",
  },
  {
    key: "hr", members: 6,
    blurb: "Recruitment, onboarding, certificates, Letters of Recommendation.",
  },
  {
    key: "events", members: 3,
    blurb: "Paradox. Disco Diwali. Starry Nights. Every fundraiser AQ has ever run.",
  },
  {
    key: "ventures", members: 23,
    blurb: "Free marketing for student founders — strategy, content, branding, promotion.",
  },
  {
    key: "crftd", members: 1,
    blurb: "Student-run streetwear brand. Profits fund AQ welfare projects and events.",
  },
];

// AquaTerra's running totals — the organisation's numbers, not any one month's.
// Every figure and every label is verified against the live site (CLAUDE.md §2)
// and is written here exactly as the site writes it. They move: re-check them
// before publishing an issue, and if one conflicts with the live site, the live
// site wins.
export const AQ_TOTALS = [
  { value: "540+", label: "drives written up", tone: "green" },
  { value: "1,300+", label: "members, ages 14–19", tone: "blue" },
  { value: "8", label: "teams", tone: "yellow" },
  { value: "4,000+", label: "saplings planted", tone: "green" },
  { value: "3,500+", label: "kids reached", tone: "pink" },
  { value: "15,000+", label: "bananas distributed", tone: "yellow" },
  { value: "8", label: "Sundarbans trips", tone: "blue" },
  { value: "3,200+", label: "followers on @ngo.aquaterra", tone: "lavender" },
];

// Shared by every issue: none of these figures is a month's number, they are
// the organisation's running totals. Every one is verified (CLAUDE.md §2) — a
// game whose answers are invented is rule 0 with a scoreboard. Re-check before
// publishing.
const AQ_GAMES = {
  lockup: { caps: "HOW WELL DO YOU KNOW", accent: "aq" },
  lead: "three games. no prizes, no leaderboard, no sign-up. just find out how much you actually picked up.",

  // `value` is what the game compares, `display` how the site writes it.
  bigger: [
    { label: "drives written up", value: 540, display: "540+" },
    { label: "members, ages 14–19", value: 1300, display: "1,300+" },
    { label: "saplings planted", value: 4000, display: "4,000+" },
    { label: "kids reached in teaching workshops", value: 3500, display: "3,500+" },
    { label: "bananas distributed", value: 15000, display: "15,000+" },
    { label: "followers on @ngo.aquaterra", value: 3200, display: "3,200+" },
    { label: "drives, blogs & openings", value: 570, display: "570+" },
    { label: "members in the Welfare Team", value: 62, display: "62" },
    { label: "members in Social Media", value: 29, display: "29" },
    { label: "members in AQ.Ventures", value: 23, display: "23" },
    { label: "teams", value: 8, display: "8" },
  ],

  // `max` and `step` set the slider track.
  guess: [
    {
      prompt: "how many bananas has AQ handed out?",
      value: 15000, display: "15,000+", max: 30000, step: 250,
      note: "fifteen thousand. nobody planned it that way.",
    },
    {
      prompt: "how many saplings has AQ planted?",
      value: 4000, display: "4,000+", max: 10000, step: 100,
      note: "4,000+ and counting.",
    },
    {
      prompt: "how many members does AQ have?",
      value: 1300, display: "1,300+", max: 3000, step: 50,
      note: "1,300+, every one of them aged 14 to 19.",
    },
    {
      prompt: "how many kids has the Welfare Team reached in teaching workshops?",
      value: 3500, display: "3,500+", max: 8000, step: 100,
      note: "3,500+, across teaching workshops.",
    },
  ],

  // Clues are trimmed from the teams' own bios on the live site, never
  // rewritten.
  match: [
    { team: "welfare", clue: "3,500+ kids reached in teaching workshops. 8 Sundarbans relief trips." },
    { team: "social", clue: "Instagram, LinkedIn, website. 3,200+ followers on @ngo.aquaterra." },
    { team: "events", clue: "Paradox. Disco Diwali. Starry Nights." },
    { team: "collabs", clue: "School collabs, college collabs, NGO partnerships, outreach." },
    { team: "hr", clue: "Recruitment, onboarding, certificates, Letters of Recommendation." },
    { team: "shikshaq", clue: "Tuition discovery platform built by AQ members for Kolkata students." },
    { team: "ventures", clue: "Helps student entrepreneurs turn ideas into visible brands." },
    { team: "crftd", clue: "Student-run streetwear brand. Profits fund AQ welfare." },
  ],
};

export const editions = {
  // EDITION 01 — September 2026. The orientation issue, not a recap: what
  // AquaTerra is, the 8 teams, how roles work. September, not October — the
  // desk corrected that.
  "2026-09": {
    key: "2026-09", slug: "september", month: "September", year: 2026, editionNumber: 1,
    kind: "orientation",

    // One accent per issue, from the team palette (see ISSUE_ACCENTS). Drives
    // the section numbers, the rules and every italic accent word.
    accent: "green",

    // caps + one italic accent word + a period (CLAUDE.md §4).
    lockup: { caps: "WHAT IS", accent: "aquaterra" },
    tagline: "started in Kolkata. got out of hand.", // verified — site tagline

    cover: photo("green", "Sprout", "[Cover — orientation issue]"),

    // The issue's headline asks "what is AquaTerra"; this is where it answers.
    // Every fact below is from CLAUDE.md §2 — nothing here is invented, and
    // nothing that isn't verified got written. `label` names the section in
    // the issue index.
    opener: {
      label: "What is AquaTerra",
      lockup: { caps: "SO, WHAT IS", accent: "aquaterra" },
      standfirst: "the short answer, before the rest of the issue gives you the long one.",
      body: [
        "AquaTerra is a student-led NGO and community in Kolkata, West Bengal. it started in June 2021, when 16 students decided a Saturday afternoon could go to a feeding drive instead of nothing in particular — and then showed up again the next one.",
        "it is DARPAN-registered and entirely self-funded. no corporate money, no outside funding. what gets done gets done because somebody turned up.",
        "there are 1,300+ members now, every one of them aged 14 to 19, across eight teams — five that run on volunteers and three that are student businesses run by members. 540+ drives have been written up. 4,000+ saplings are in the ground. 15,000+ bananas have been handed out, which nobody planned.",
        "it is free forever. no donations, no fees. pick a team, show up, and get to work.",
      ],
      pull: "started in Kolkata. got out of hand.",
      byline: "the desk",
      facts: [
        { label: "Founded", value: "June 2021" },
        { label: "Founded by", value: "16 students" },
        { label: "Based in", value: "Kolkata, WB" },
        { label: "Funding", value: "Self-funded" },
      ],
    },

    // verified (CLAUDE.md §2). Re-check against the live site before publishing.
    cardStats: [
      { value: "8", label: "teams" },
      { value: "1,300+", label: "members" },
      { value: "540+", label: "drives" },
    ],
    glance: [
      { value: "8", label: "teams" },
      { value: "1,300+", label: "members, ages 14–19" },
      { value: "540+", label: "drives written up" },
      { value: "4,000+", label: "saplings planted" },
    ],

    teams: {
      lockup: { caps: "PICK A LANE, THEN", accent: "turn up" },
      lead: "eight teams. five run on volunteers, three are student businesses. every one of them is run by members aged 14–19.",
      roster: TEAM_ROSTER,
    },

    featured: [
      {
        title: "[Feature headline]", category: "Events", team: "events",
        date: "[Date]", location: "[Venue]", people: "[N] members",
        description: "[What happened, in two or three plain sentences. Concrete numbers, no adjectives.]",
        image: photo("blue", "PartyPopper", "[Events feature]"),
      },
      {
        title: "[Feature headline]", category: "Student business", team: "crftd",
        date: "[Date]", location: "[Where]", people: "[N] members",
        description: "[What the drop was, what sold, where the profit went.]",
        image: photo("cream", "Shirt", "[Crftd feature]"),
      },
      {
        title: "[Feature headline]", category: "Student business", team: "shikshaq",
        date: "[Date]", location: "[Where]", people: "[N] members",
        description: "[What shipped on the platform this month.]",
        image: photo("yellow", "GraduationCap", "[ShikshAQ feature]"),
      },
      {
        title: "[Feature headline]", category: "Welfare", team: "welfare",
        date: "[Date]", location: "[Locality, Kolkata]", people: "[N] volunteers",
        description: "[What the drive did and who turned up.]",
        image: photo("green", "HeartHandshake", "[Welfare feature]"),
      },
      {
        title: "[Feature headline]", category: "Collabs", team: "collabs",
        date: "[Date]", location: "[School / college]", people: "[N] members",
        description: "[Who AQ partnered with and what came of it.]",
        image: photo("green", "Handshake", "[Collabs feature]"),
      },
      {
        title: "[Feature headline]", category: "Social", team: "social",
        date: "[Date]", location: "[Online]", people: "[N] members",
        description: "[What went out, and how it did.]",
        image: photo("lavender", "Camera", "[Social feature]"),
      },
    ],

    // Credits must come from the desk — never attribute a photo to a name you
    // have not been given.
    photography: {
      lockup: { caps: "SHOT BY", accent: "members" },
      lead: "one frame a month, picked by the desk. everything here was shot by an AquaTerra member on the ground.",
      featured: photo("green", "Camera", "[Photo of the month]", { credit: "[Member name]" }),
      featuredCaption: "[One line on what this frame is and where it was taken.]",
      gallery: [
        photo("yellow", "Camera", "[Frame 01]", { size: "lg", credit: "[Member name]" }),
        photo("blue", "Camera", "[Frame 02]", { size: "sm", credit: "[Member name]" }),
        photo("lavender", "Camera", "[Frame 03]", { size: "md", credit: "[Member name]" }),
        photo("green", "Camera", "[Frame 04]", { size: "sm", credit: "[Member name]" }),
        photo("pink", "Camera", "[Frame 05]", { size: "md", credit: "[Member name]" }),
        photo("cream", "Camera", "[Frame 06]", { size: "sm", credit: "[Member name]" }),
      ],
    },

    games: AQ_GAMES,

    impact: {
      headline: "[One line on what this issue's work actually changed]",
      description: "[A short, human paragraph — written for someone who wasn't there, not a KPI table.]",
      metrics: [
        { value: "[Number]", label: "[Metric label]" },
        { value: "[Number]", label: "[Metric label]" },
      ],
      progress: [
        { label: "[Goal name]", percent: null },
      ],
    },

    // CLAUDE.md §2: no member names, photos or quotes unless the desk supplies
    // them. Everything here stays bracketed until then.
    people: [
      { name: "[Member name]", role: "[Team · year]", quote: "[A short quote, in their own words.]", image: photo("green", "User", "[Portrait]") },
    ],
  },

  // EDITION 02 — October 2026. A recap issue: what the month actually held.
  // Marked `status: "upcoming"` — it publishes when October wraps, so the
  // archive shows it as on the way rather than announcing it as live. Drop the
  // status line and move LATEST_KEY to "2026-10" on the day it ships.
  //
  // Every content field is a placeholder. The verified blocks — the teams
  // roster and the games — are shared with Edition 01 and are real.
  "2026-10": {
    key: "2026-10", slug: "october", month: "October", year: 2026, editionNumber: 2,
    kind: "recap",
    status: "upcoming",

    // A different accent from Edition 01, so no two issues read as the same
    // page with different words.
    accent: "tomato",

    lockup: { caps: "OCTOBER", accent: "wrapped" },
    tagline: "[One line on what October actually was. House voice: short, concrete, faintly dry.]",

    cover: photo("yellow", "CalendarDays", "[Cover — October]"),

    cardStats: [
      { value: "[N]", label: "drives" },
      { value: "[N]", label: "events" },
      { value: "[N]", label: "members out" },
    ],
    glance: [
      { value: "[N]", label: "drives run" },
      { value: "[N]", label: "members who turned up" },
      { value: "[N]", label: "[what this month counted]" },
      { value: "[N]", label: "[what this month counted]" },
    ],

    opener: {
      label: "The month",
      lockup: { caps: "OCTOBER, IN ONE", accent: "paragraph" },
      standfirst: "[One line setting up the month, before the sections break it down.]",
      body: [
        "[What happened this month, in plain sentences. Concrete numbers, no adjectives — the drives that ran, who turned up, what the student businesses shipped.]",
        "[The second paragraph. What was hard, what surprised you, what nearly didn't happen.]",
      ],
      pull: "[The one line from this month worth setting big.]",
      byline: "the desk",
      facts: [
        { label: "Drives", value: "[N]" },
        { label: "Events", value: "[N]" },
        { label: "Teams out", value: "[N]" },
        { label: "Frames shot", value: "[N]" },
      ],
    },

    teams: {
      lockup: { caps: "WHO DID THE", accent: "work" },
      lead: "[One line on which teams carried this month.]",
      roster: TEAM_ROSTER,
    },

    featured: [
      {
        title: "[Feature headline]", category: "Welfare", team: "welfare",
        date: "[Date]", location: "[Locality, Kolkata]", people: "[N] volunteers",
        description: "[What the drive did and who turned up.]",
        image: photo("green", "HeartHandshake", "[Welfare feature]"),
      },
      {
        title: "[Feature headline]", category: "Events", team: "events",
        date: "[Date]", location: "[Venue]", people: "[N] members",
        description: "[What the event was, how many came, where the money went.]",
        image: photo("blue", "PartyPopper", "[Events feature]"),
      },
      {
        title: "[Feature headline]", category: "Student business", team: "ventures",
        date: "[Date]", location: "[Where]", people: "[N] members",
        description: "[Which founders AQ.Ventures worked with, and on what.]",
        image: photo("cream", "Wrench", "[AQ.Ventures feature]"),
      },
      {
        title: "[Feature headline]", category: "Collabs", team: "collabs",
        date: "[Date]", location: "[School / college]", people: "[N] members",
        description: "[Who AQ partnered with and what came of it.]",
        image: photo("green", "Handshake", "[Collabs feature]"),
      },
    ],

    photography: {
      lockup: { caps: "SHOT BY", accent: "members" },
      lead: "one frame a month, picked by the desk. everything here was shot by an AquaTerra member on the ground.",
      featured: photo("yellow", "Camera", "[Photo of the month]", { credit: "[Member name]" }),
      featuredCaption: "[One line on what this frame is and where it was taken.]",
      gallery: [
        photo("green", "Camera", "[Frame 01]", { size: "lg", credit: "[Member name]" }),
        photo("pink", "Camera", "[Frame 02]", { size: "sm", credit: "[Member name]" }),
        photo("blue", "Camera", "[Frame 03]", { size: "md", credit: "[Member name]" }),
        photo("cream", "Camera", "[Frame 04]", { size: "sm", credit: "[Member name]" }),
      ],
    },

    games: AQ_GAMES,

    impact: {
      headline: "[One line on what this month's work actually changed]",
      description: "[A short, human paragraph — written for someone who wasn't there, not a KPI table.]",
      metrics: [
        { value: "[Number]", label: "[Metric label]" },
        { value: "[Number]", label: "[Metric label]" },
        { value: "[Number]", label: "[Metric label]" },
      ],
      progress: [
        { label: "[Goal name]", percent: null },
        { label: "[Goal name]", percent: null },
      ],
    },

    people: [
      { name: "[Member name]", role: "[Team · year]", quote: "[A short quote, in their own words.]", image: photo("yellow", "User", "[Portrait]") },
      { name: "[Member name]", role: "[Team · year]", quote: "[A short quote, in their own words.]", image: photo("blue", "User", "[Portrait]") },
    ],
  },
};

export const editionList = Object.values(editions).sort((a, b) =>
  a.year !== b.year ? a.year - b.year : a.editionNumber - b.editionNumber
);

export const latestEdition = editions[LATEST_KEY];

// An issue publishes when its month wraps, so the newest edition in the file
// isn't necessarily out yet.
export const isUpcoming = (edition) => edition?.status === "upcoming";

export function getEdition(year, slug) {
  return editionList.find((e) => String(e.year) === String(year) && e.slug === slug) || null;
}

export function editionsForYear(year) {
  return editionList.filter((e) => String(e.year) === String(year));
}

// Derived, so the year selector can never offer a year with nothing behind it.
export const AVAILABLE_YEARS = [...new Set(editionList.map((e) => e.year))].sort((a, b) => a - b);

// The year after the last one with editions in it. Shown in the selector as
// coming soon, and it moves on its own as editions are added.
export const COMING_YEARS = [AVAILABLE_YEARS[AVAILABLE_YEARS.length - 1] + 1];

export function neighbours(edition) {
  const idx = editionList.findIndex((e) => e.key === edition.key);
  return {
    prev: idx > 0 ? editionList[idx - 1] : null,
    next: idx < editionList.length - 1 ? editionList[idx + 1] : null,
  };
}
