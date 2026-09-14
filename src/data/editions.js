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
// are gone. Per aq.md §5 the magazine starts at Edition 1 in October 2026.
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

const LATEST_KEY = "2026-10";

// The 8 teams, mirrored from the parent site's own teams grid — order, links,
// member counts, bios and open-role counts all copied from its live markup.
// aq.md §2: the live site wins, so this is the source for team data.
//
// `href` points at each team's real page on ngoaquaterra.com. `openRoles` is
// the site's own count; 0 renders as "nothing open".
//
// The HR bio on the live site reads "1,100+ members" against a headline figure
// of 1,300+; the desk confirmed 1,300+ is the current number, so it is used
// here. Worth correcting on the parent site too.
const TEAM_URL = "https://www.ngoaquaterra.com/teams";

export const TEAM_ROSTER = [
  {
    key: "welfare", members: 62, openRoles: 2,
    href: `${TEAM_URL}/a1b2c3d4-0001-0000-0000-000000000002`,
    blurb: "3,500+ kids reached in teaching workshops. 8 Sundarbans relief trips. Dog feeding drives across Kolkata. 4,000+ saplings planted. This is the impact core.",
  },
  {
    key: "social", members: 29, openRoles: 3,
    href: `${TEAM_URL}/a1b2c3d4-0001-0000-0000-000000000003`,
    blurb: "Instagram, LinkedIn, website. 3,200+ followers on @ngo.aquaterra. Reels, carousels, copy, strategy. Not a school club. A real brand account.",
  },
  {
    key: "collabs", members: 2, openRoles: 0,
    href: `${TEAM_URL}/a1b2c3d4-0001-0000-0000-000000000004`,
    blurb: "School collabs, college collabs, NGO partnerships, outreach. AQ grows through peer networks. This team builds those networks.",
  },
  {
    key: "shikshaq", members: 2, openRoles: 1,
    href: `${TEAM_URL}/a1b2c3d4-0001-0000-0000-000000000007`,
    blurb: "Tuition discovery platform built by AQ members for Kolkata students. Launched 2026. Product, design, content, growth. Still early. The team is small.",
  },
  {
    key: "hr", members: 6, openRoles: 0,
    href: `${TEAM_URL}/a1b2c3d4-0001-0000-0000-000000000008`,
    blurb: "Recruitment, onboarding, certificates, Letters of Recommendation. HR runs the intake pipeline for 1,300+ members.",
  },
  {
    key: "events", members: 3, openRoles: 2,
    href: `${TEAM_URL}/a1b2c3d4-0001-0000-0000-000000000001`,
    blurb: "Paradox. Disco Diwali. Starry Nights. Every fundraiser AQ has ever run. Paradox 3.0 had 300 attendees and crossed 6-digit revenue. This team ran it.",
  },
  {
    key: "ventures", members: 23, openRoles: 0,
    href: `${TEAM_URL}/a1b2c3d4-0001-0000-0000-000000000006`,
    blurb: "Aquaterra Ventures exists to help student entrepreneurs turn great ideas into visible brands. For the first three months we provide full marketing support completely free: strategy, content, branding and promotion, tailored to your business.",
  },
  {
    key: "crftd", members: 1, openRoles: 0,
    href: `${TEAM_URL}/a1b2c3d4-0001-0000-0000-000000000005`,
    blurb: "Student-run streetwear brand. Design, production, sales. Profits fund AQ welfare projects and events. The brand is real. The revenue is real.",
  },
];

export const editions = {
  // -------------------------------------------------------------------------
  // EDITION 01 — October 2026. The orientation issue, not a recap (aq.md §5):
  // what AquaTerra is, the 8 teams, how roles work.
  // -------------------------------------------------------------------------
  "2026-10": {
    key: "2026-10", slug: "october", month: "October", year: 2026, editionNumber: 1,
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

    // Mini games. Every answer below is a verified figure from aq.md §2 — a
    // quiz is only fun if the answers are true. Re-check before publishing.
    games: {
      lockup: { caps: "HOW WELL DO YOU KNOW", accent: "aq" },
      lead: "eight questions. no prizes, no leaderboard, no sign-up. just find out how much you actually picked up.",
      quiz: [
        {
          question: "how many teams does AquaTerra run?",
          options: ["4", "6", "8", "12"],
          answer: 2,
          note: "five volunteer teams and three student businesses.",
        },
        {
          question: "how many members, and how old are they?",
          options: ["300+, ages 18–25", "1,300+, ages 14–19", "1,300+, ages 18–25", "800+, ages 16–21"],
          answer: 1,
          note: "every one of them is still at school or just out of it.",
        },
        {
          question: "what year did AquaTerra start?",
          options: ["2019", "2020", "2021", "2023"],
          answer: 2,
          note: "June 2021. sixteen students.",
        },
        {
          question: "how many students founded it?",
          options: ["3", "8", "16", "40"],
          answer: 2,
          note: "sixteen.",
        },
        {
          question: "what is the student-run streetwear brand called?",
          // Distractors are the other real AQ ventures, never the org's old
          // clothing-label name — aq.md §2 bans that string outright, and a
          // wrong answer still puts it on the page.
          options: ["ShikshAQ", "AQ.Ventures", "Crftd", "Groundwork Diaries"],
          answer: 2,
          note: "Crftd. profits fund AQ welfare.",
        },
        {
          question: "how many bananas has AQ handed out?",
          options: ["500+", "3,000+", "15,000+", "60,000+"],
          answer: 2,
          note: "fifteen thousand. nobody planned it that way.",
        },
        {
          question: "how many saplings planted?",
          options: ["400+", "1,000+", "4,000+", "9,000+"],
          answer: 2,
          note: "4,000+ and counting.",
        },
        {
          question: "how many Sundarbans relief trips?",
          options: ["2", "5", "8", "14"],
          answer: 2,
          note: "eight, all run by the Welfare Team.",
        },
      ],
    },

    // Openings — the HR team's recruitment, which is how a student actually
    // joins. Roles must come from HR, not from a guess.
    openings: {
      lockup: { caps: "COME AND DO SOMETHING", accent: "real" },
      lead: "pick a team, show up, and get to work. no fees, no application essay.",
      roles: [
        { team: "welfare", role: "[Role title]", blurb: "[What you'd actually do.]" },
        { team: "social", role: "[Role title]", blurb: "[What you'd actually do.]" },
        { team: "events", role: "[Role title]", blurb: "[What you'd actually do.]" },
      ],
      href: "https://www.ngoaquaterra.com/teams", // verified — live route
    },

    inside: [
      {
        type: "Diary", meta: "Groundwork Diaries", title: "[Diary entry title]",
        description: "[One line on what the entry covers, and who wrote it.]",
        image: photo("cream", "PenSquare", "[Diary]"),
      },
      {
        type: "Workshop", meta: "Workshop", title: "[Workshop title]",
        description: "[What members learned or built.]",
        image: photo("lavender", "Wrench", "[Workshop]"),
      },
    ],

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
