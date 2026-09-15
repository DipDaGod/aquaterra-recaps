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

// The newest published edition: drives the "Latest" badge, the archive's
// featured card and the "now live" strip. Update it when you add a month.
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

    // Every figure below is verified (CLAUDE.md §2) — a game whose answers are
    // invented is rule 0 with a scoreboard. Re-check before publishing.
    games: {
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
    },

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
};

export const editionList = Object.values(editions).sort((a, b) =>
  a.year !== b.year ? a.year - b.year : a.editionNumber - b.editionNumber
);

export const latestEdition = editions[LATEST_KEY];

export function getEdition(year, slug) {
  return editionList.find((e) => String(e.year) === String(year) && e.slug === slug) || null;
}

export function editionsForYear(year) {
  return editionList.filter((e) => String(e.year) === String(year));
}

// Derived, so the year selector can never offer a year with nothing behind it.
export const AVAILABLE_YEARS = [...new Set(editionList.map((e) => e.year))].sort((a, b) => a - b);

export function neighbours(edition) {
  const idx = editionList.findIndex((e) => e.key === edition.key);
  return {
    prev: idx > 0 ? editionList[idx - 1] : null,
    next: idx < editionList.length - 1 ? editionList[idx + 1] : null,
  };
}
