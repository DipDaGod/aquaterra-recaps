// ---------------------------------------------------------------------------
// AQUATERRA RECAPS — DATA MODEL
// ---------------------------------------------------------------------------
// This file is the ONLY place a new monthly edition needs to be added.
// The archive grid and every /:year/:month page render from this object —
// there is no per-month page component.
//
// RULE 0 (aq.md §0): never invent an AquaTerra fact. Every unverified value
// below is a [bracketed placeholder]. Figures that ARE verified against the
// live site are marked `// verified` and may be used as-is.
//
// This file previously carried eight fabricated 2026-01..2026-08 recaps with
// unbracketed figures ("14 Projects", "310+ People", progress bars at 91%).
// None of those months existed and none of those numbers were real, so they
// are gone. The magazine starts at Edition 1, September 2026.
// ---------------------------------------------------------------------------

// A photo entry. `src` is null everywhere — drop a real file into
// /public/recaps/<year>/<month>/ and point `src` at it, and <Photo> uses it
// instead of the placeholder tile. `credit` names the member who shot it and
// must come from the desk, never from a guess.
function photo(tone, icon, label, { size = "md", credit = null } = {}) {
  return { src: null, tone, icon, label, size, credit };
}

// Categories span everything AquaTerra actually does, not just welfare —
// student businesses, events, media and openings all carry equal weight.
export const CATEGORIES = [
  "Welfare", "Events", "Student business", "Workshop",
  "Collabs", "Social", "Photography", "Openings",
];

const LATEST_KEY = "2026-09";

// The 8 teams, mirrored from the parent site's own teams grid — order, links,
// member counts, bios and open-role counts all copied from its live markup.
// aq.md §2: the live site wins, so this is the source for team data.
//
// No `href`: nothing in the magazine links out to the parent site. A team card
// points at that team's own story in this issue instead, and falls back to
// being plain text when the issue has no story for it.
//
// The HR bio on the live site reads "1,100+ members" against a headline figure
// of 1,300+; the desk confirmed 1,300+ is the current number, so it is used
// here. Worth correcting on the parent site too.
export const TEAM_ROSTER = [
  {
    key: "welfare", members: 62, openRoles: 2,
    blurb: "3,500+ kids reached in teaching workshops. 8 Sundarbans relief trips. Dog feeding drives.",
  },
  {
    key: "social", members: 29, openRoles: 3,
    blurb: "Instagram, LinkedIn, website. 3,200+ followers. Reels, carousels, copy, strategy.",
  },
  {
    key: "collabs", members: 2, openRoles: 0,
    blurb: "School collabs, college collabs, NGO partnerships, outreach.",
  },
  {
    key: "shikshaq", members: 2, openRoles: 1,
    blurb: "Tuition discovery platform built by AQ members for Kolkata students. Launched 2026.",
  },
  {
    key: "hr", members: 6, openRoles: 0,
    blurb: "Recruitment, onboarding, certificates, Letters of Recommendation.",
  },
  {
    key: "events", members: 3, openRoles: 2,
    blurb: "Paradox. Disco Diwali. Starry Nights. Every fundraiser AQ has ever run.",
  },
  {
    key: "ventures", members: 23, openRoles: 0,
    blurb: "Free marketing for student founders — strategy, content, branding, promotion.",
  },
  {
    key: "crftd", members: 1, openRoles: 0,
    blurb: "Student-run streetwear brand. Profits fund AQ welfare projects and events.",
  },
];

export const editions = {
  // -------------------------------------------------------------------------
  // EDITION 01 — September 2026. The orientation issue, not a recap: what
  // AquaTerra is, the 8 teams, how roles work. (aq.md §5 said October; the
  // desk corrected it to September.)
  // -------------------------------------------------------------------------
  "2026-09": {
    key: "2026-09", slug: "september", month: "September", year: 2026, editionNumber: 1,
    kind: "orientation",

    // Every issue owns an accent from the team palette (see ISSUE_ACCENTS).
    // It drives the section numbers, the rules and every italic accent word,
    // so each edition reads as its own object rather than a reskin.
    accent: "green",

    // Headline lockup: caps + one italic accent word + a period (aq.md §4).
    lockup: { caps: "WHAT IS", accent: "aquaterra" },
    tagline: "started in Kolkata. got out of hand.", // verified — site tagline

    cover: photo("green", "Sprout", "[Cover — orientation issue]"),

    // verified (aq.md §2). Re-check against the live site before publishing.
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

    // The orientation issue leads on the teams, so the roster is the spine of
    // the page rather than a footnote.
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

    // Photography is its own section now, with a credited photo of the month.
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

    // Mini games. Three ways to play, because eight multiple-choice questions
    // in a row is a worksheet, not a game. Every figure below is verified
    // (aq.md §2) — a game whose answers are invented is rule 0 with a
    // scoreboard attached. Re-check them before publishing.
    games: {
      lockup: { caps: "HOW WELL DO YOU KNOW", accent: "aq" },
      lead: "three games. no prizes, no leaderboard, no sign-up. just find out how much you actually picked up.",

      // BIGGER? — two figures, tap the larger. `value` is what the game
      // compares; `display` is how the site writes it.
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

      // HOW CLOSE? — drag a slider at the real figure. `max` sets the track.
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

      // MATCH — pair each team to what it actually does. Clues are trimmed
      // from the teams' own bios on the live site, never rewritten.
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

    // aq.md §2: no member names, photos or quotes unless the desk supplies
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

export const AVAILABLE_YEARS = [2026, 2027];

export function neighbours(edition) {
  const idx = editionList.findIndex((e) => e.key === edition.key);
  return {
    prev: idx > 0 ? editionList[idx - 1] : null,
    next: idx < editionList.length - 1 ? editionList[idx + 1] : null,
  };
}
