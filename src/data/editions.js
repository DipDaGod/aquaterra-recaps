// ---------------------------------------------------------------------------
// AQUATERRA RECAPS — DATA MODEL
// ---------------------------------------------------------------------------
// This file is the ONLY place a new monthly edition needs to be added.
// The archive grid and every /recaps/:year/:month page render from this
// object — there is no per-month page component.
//
// ⚠️  PLACEHOLDER DATA: none of the names, descriptions, photos or figures
// below are real AquaTerra statistics or claims. They're clearly-marked
// sample content so the layout can be reviewed, and are meant to be
// swapped out for real copy + photography before this goes live.
// Bracketed fields like "[Project name]" are the ones to replace first.
// ---------------------------------------------------------------------------

// A photo entry. `src` is left null everywhere — drop a real file into
// /public/recaps/<year>/<month>/ and set src to that path, and the
// <Photo> component will use it automatically instead of the placeholder tile.
function photo(tone, icon, label, size = "md") {
  return { src: null, tone, icon, label, size };
}

export const CATEGORIES = [
  "Welfare", "Climate", "Education", "Environment",
  "Community", "Fundraising", "Workshop", "Plantation", "Distribution",
];

const LATEST_KEY = "2026-08";

export const editions = {
  "2026-01": {
    key: "2026-01", slug: "january", month: "January", year: 2026, editionNumber: 1,
    tagline: "New year, same mission.",
    cardStats: [{ value: "9", label: "Projects" }, { value: "210+", label: "People" }, { value: "5", label: "Locations" }],
    cover: photo("green", "Sprout", "[Cover — January highlight]"),
    glance: [
      { value: "9", label: "Projects run" },
      { value: "5", label: "Locations" },
      { value: "210+", label: "People involved" },
      { value: "3", label: "New teams onboarded" },
    ],
    projects: [
      { title: "[Winter welfare drive]", category: "Welfare", date: "Jan 2026", location: "[Locality, Kolkata]", people: "[40+] volunteers", description: "[Short description of what this project involved and who it reached.]", image: photo("yellow", "HeartHandshake", "[Welfare drive]") },
      { title: "[School stationery drive]", category: "Education", date: "Jan 2026", location: "[School name]", people: "[60+] students", description: "[Placeholder summary — replace with the real project description.]", image: photo("blue", "GraduationCap", "[Stationery drive]") },
      { title: "[Riverbank clean-up]", category: "Environment", date: "Jan 2026", location: "[Ghat name]", people: "[25] volunteers", description: "[Placeholder summary — replace with the real project description.]", image: photo("green", "Waves", "[River clean-up]") },
    ],
    inside: [
      { type: "Team", title: "[Team spotlight name]", description: "[What this team worked on this month.]", meta: "[Team]", image: photo("lavender", "Users", "[Team]") },
      { type: "Diary", title: "[Groundwork Diaries entry title]", description: "[One line on what the diary entry covers.]", meta: "Groundwork Diaries", image: photo("cream", "PenSquare", "[Diary]") },
    ],
    moments: [
      photo("green", "Camera", "[Field moment]", "lg"), photo("yellow", "Camera", "[Candid]", "sm"),
      photo("blue", "Camera", "[Workshop]", "md"), photo("lavender", "Camera", "[Team]", "sm"),
      photo("cream", "Camera", "[Event]", "md"),
    ],
    impact: {
      headline: "[What changed because of this month]",
      description: "[A short, human explanation of the month's impact — not a KPI dump.]",
      metrics: [{ value: "[Number]", label: "[Metric label]" }, { value: "[Number]", label: "[Metric label]" }],
      progress: [{ label: "[Yearly goal name]", percent: 20 }],
    },
    people: [
      { name: "[Volunteer name]", role: "[Team / role]", quote: "[A short quote about their month.]", image: photo("green", "User", "[Portrait]") },
    ],
  },

  "2026-02": {
    key: "2026-02", slug: "february", month: "February", year: 2026, editionNumber: 2,
    tagline: "Small drives, steady momentum.",
    cardStats: [{ value: "11", label: "Projects" }, { value: "260+", label: "People" }, { value: "6", label: "Locations" }],
    cover: photo("blue", "Droplets", "[Cover — February highlight]"),
    glance: [
      { value: "11", label: "Projects run" },
      { value: "6", label: "Locations" },
      { value: "260+", label: "People involved" },
      { value: "2", label: "New collaborations" },
    ],
    projects: [
      { title: "[Water access workshop]", category: "Workshop", date: "Feb 2026", location: "[Locality]", people: "[30] participants", description: "[Placeholder summary — replace with the real project description.]", image: photo("blue", "Droplets", "[Workshop]") },
      { title: "[Community health camp]", category: "Community", date: "Feb 2026", location: "[Locality]", people: "[150+] attendees", description: "[Placeholder summary — replace with the real project description.]", image: photo("yellow", "HeartHandshake", "[Health camp]") },
      { title: "[Sapling distribution]", category: "Plantation", date: "Feb 2026", location: "[Locality]", people: "[35] volunteers", description: "[Placeholder summary — replace with the real project description.]", image: photo("green", "TreePine", "[Plantation]") },
    ],
    inside: [
      { type: "Event", title: "[Open house event]", description: "[What happened at this event.]", meta: "Event", image: photo("blue", "CalendarDays", "[Event]") },
      { type: "Workshop", title: "[Leadership workshop]", description: "[What members learned or built.]", meta: "Workshop", image: photo("lavender", "Wrench", "[Workshop]") },
    ],
    moments: [
      photo("blue", "Camera", "[Field moment]", "md"), photo("green", "Camera", "[Candid]", "lg"),
      photo("yellow", "Camera", "[Workshop]", "sm"), photo("cream", "Camera", "[Team]", "md"),
    ],
    impact: {
      headline: "[What changed because of this month]",
      description: "[A short, human explanation of the month's impact.]",
      metrics: [{ value: "[Number]", label: "[Metric label]" }, { value: "[Number]", label: "[Metric label]" }],
      progress: [{ label: "[Yearly goal name]", percent: 32 }],
    },
    people: [
      { name: "[Volunteer name]", role: "[Team / role]", quote: "[A short quote about their month.]", image: photo("blue", "User", "[Portrait]") },
    ],
  },

  "2026-03": {
    key: "2026-03", slug: "march", month: "March", year: 2026, editionNumber: 3,
    tagline: "Exams, drives, and everything in between.",
    cardStats: [{ value: "10", label: "Projects" }, { value: "230+", label: "People" }, { value: "5", label: "Locations" }],
    cover: photo("lavender", "GraduationCap", "[Cover — March highlight]"),
    glance: [
      { value: "10", label: "Projects run" },
      { value: "5", label: "Locations" },
      { value: "230+", label: "People involved" },
      { value: "1", label: "New school partner" },
    ],
    projects: [
      { title: "[Exam-season tutoring circle]", category: "Education", date: "Mar 2026", location: "[Locality]", people: "[45] students", description: "[Placeholder summary — replace with the real project description.]", image: photo("lavender", "GraduationCap", "[Tutoring]") },
      { title: "[Fundraising bake sale]", category: "Fundraising", date: "Mar 2026", location: "[Locality]", people: "[20] volunteers", description: "[Placeholder summary — replace with the real project description.]", image: photo("yellow", "HandCoins", "[Fundraiser]") },
      { title: "[Coastal clean-up trip]", category: "Environment", date: "Mar 2026", location: "[Location]", people: "[18] volunteers", description: "[Placeholder summary — replace with the real project description.]", image: photo("green", "Waves", "[Clean-up]") },
    ],
    inside: [
      { type: "Blog", title: "[Groundwork Diaries entry title]", description: "[One line on what the diary entry covers.]", meta: "Groundwork Diaries", image: photo("cream", "PenSquare", "[Diary]") },
      { type: "Team", title: "[Team spotlight name]", description: "[What this team worked on this month.]", meta: "Team", image: photo("blue", "Users", "[Team]") },
    ],
    moments: [
      photo("lavender", "Camera", "[Field moment]", "md"), photo("yellow", "Camera", "[Candid]", "md"),
      photo("green", "Camera", "[Event]", "lg"), photo("blue", "Camera", "[Workshop]", "sm"),
    ],
    impact: {
      headline: "[What changed because of this month]",
      description: "[A short, human explanation of the month's impact.]",
      metrics: [{ value: "[Number]", label: "[Metric label]" }, { value: "[Number]", label: "[Metric label]" }],
      progress: [{ label: "[Yearly goal name]", percent: 41 }],
    },
    people: [
      { name: "[Volunteer name]", role: "[Team / role]", quote: "[A short quote about their month.]", image: photo("lavender", "User", "[Portrait]") },
    ],
  },

  "2026-04": {
    key: "2026-04", slug: "april", month: "April", year: 2026, editionNumber: 4,
    tagline: "Warmer days, bigger drives.",
    cardStats: [{ value: "13", label: "Projects" }, { value: "290+", label: "People" }, { value: "6", label: "Locations" }],
    cover: photo("yellow", "Sun", "[Cover — April highlight]"),
    glance: [
      { value: "13", label: "Projects run" },
      { value: "6", label: "Locations" },
      { value: "290+", label: "People involved" },
      { value: "4", label: "New volunteers onboarded" },
    ],
    projects: [
      { title: "[Summer distribution drive]", category: "Distribution", date: "Apr 2026", location: "[Locality]", people: "[50] volunteers", description: "[Placeholder summary — replace with the real project description.]", image: photo("yellow", "Package", "[Distribution]") },
      { title: "[Climate awareness workshop]", category: "Climate", date: "Apr 2026", location: "[School / venue]", people: "[80] students", description: "[Placeholder summary — replace with the real project description.]", image: photo("green", "Sprout", "[Climate workshop]") },
      { title: "[Community kitchen support]", category: "Welfare", date: "Apr 2026", location: "[Locality]", people: "[22] volunteers", description: "[Placeholder summary — replace with the real project description.]", image: photo("blue", "HeartHandshake", "[Community kitchen]") },
    ],
    inside: [
      { type: "Workshop", title: "[Skills workshop]", description: "[What members learned or built.]", meta: "Workshop", image: photo("lavender", "Wrench", "[Workshop]") },
      { type: "Event", title: "[Community fair]", description: "[What happened at this event.]", meta: "Event", image: photo("yellow", "CalendarDays", "[Event]") },
    ],
    moments: [
      photo("yellow", "Camera", "[Field moment]", "lg"), photo("green", "Camera", "[Candid]", "sm"),
      photo("blue", "Camera", "[Workshop]", "sm"), photo("lavender", "Camera", "[Team]", "md"),
    ],
    impact: {
      headline: "[What changed because of this month]",
      description: "[A short, human explanation of the month's impact.]",
      metrics: [{ value: "[Number]", label: "[Metric label]" }, { value: "[Number]", label: "[Metric label]" }],
      progress: [{ label: "[Yearly goal name]", percent: 53 }],
    },
    people: [
      { name: "[Volunteer name]", role: "[Team / role]", quote: "[A short quote about their month.]", image: photo("yellow", "User", "[Portrait]") },
    ],
  },

  "2026-05": {
    key: "2026-05", slug: "may", month: "May", year: 2026, editionNumber: 5,
    tagline: "Heat, holidays, and hard work.",
    cardStats: [{ value: "12", label: "Projects" }, { value: "270+", label: "People" }, { value: "7", label: "Locations" }],
    cover: photo("green", "TreePine", "[Cover — May highlight]"),
    glance: [
      { value: "12", label: "Projects run" },
      { value: "7", label: "Locations" },
      { value: "270+", label: "People involved" },
      { value: "3", label: "Partner schools" },
    ],
    projects: [
      { title: "[Plantation drive]", category: "Plantation", date: "May 2026", location: "[Locality]", people: "[60] volunteers", description: "[Placeholder summary — replace with the real project description.]", image: photo("green", "TreePine", "[Plantation]") },
      { title: "[Summer camp for kids]", category: "Education", date: "May 2026", location: "[Venue]", people: "[70] children", description: "[Placeholder summary — replace with the real project description.]", image: photo("blue", "GraduationCap", "[Summer camp]") },
      { title: "[Heatwave relief drive]", category: "Welfare", date: "May 2026", location: "[Locality]", people: "[40] volunteers", description: "[Placeholder summary — replace with the real project description.]", image: photo("yellow", "HeartHandshake", "[Relief drive]") },
    ],
    inside: [
      { type: "Diary", title: "[Groundwork Diaries entry title]", description: "[One line on what the diary entry covers.]", meta: "Groundwork Diaries", image: photo("cream", "PenSquare", "[Diary]") },
      { type: "Team", title: "[Team spotlight name]", description: "[What this team worked on this month.]", meta: "Team", image: photo("lavender", "Users", "[Team]") },
    ],
    moments: [
      photo("green", "Camera", "[Field moment]", "md"), photo("yellow", "Camera", "[Candid]", "lg"),
      photo("blue", "Camera", "[Event]", "sm"), photo("lavender", "Camera", "[Workshop]", "sm"),
    ],
    impact: {
      headline: "[What changed because of this month]",
      description: "[A short, human explanation of the month's impact.]",
      metrics: [{ value: "[Number]", label: "[Metric label]" }, { value: "[Number]", label: "[Metric label]" }],
      progress: [{ label: "[Yearly goal name]", percent: 64 }],
    },
    people: [
      { name: "[Volunteer name]", role: "[Team / role]", quote: "[A short quote about their month.]", image: photo("green", "User", "[Portrait]") },
    ],
  },

  "2026-06": {
    key: "2026-06", slug: "june", month: "June", year: 2026, editionNumber: 6,
    tagline: "Monsoon prep, new members.",
    cardStats: [{ value: "13", label: "Projects" }, { value: "300+", label: "People" }, { value: "7", label: "Locations" }],
    cover: photo("blue", "CloudRain", "[Cover — June highlight]"),
    glance: [
      { value: "13", label: "Projects run" },
      { value: "7", label: "Locations" },
      { value: "300+", label: "People involved" },
      { value: "5", label: "New members onboarded" },
    ],
    projects: [
      { title: "[Monsoon preparedness drive]", category: "Climate", date: "Jun 2026", location: "[Locality]", people: "[45] volunteers", description: "[Placeholder summary — replace with the real project description.]", image: photo("blue", "CloudRain", "[Monsoon prep]") },
      { title: "[Book donation drive]", category: "Education", date: "Jun 2026", location: "[School name]", people: "[55] students", description: "[Placeholder summary — replace with the real project description.]", image: photo("lavender", "GraduationCap", "[Book drive]") },
      { title: "[Community mural project]", category: "Community", date: "Jun 2026", location: "[Locality]", people: "[15] volunteers", description: "[Placeholder summary — replace with the real project description.]", image: photo("yellow", "Users", "[Mural]") },
    ],
    inside: [
      { type: "Event", title: "[New member orientation]", description: "[What happened at this event.]", meta: "Event", image: photo("green", "CalendarDays", "[Event]") },
      { type: "Blog", title: "[Groundwork Diaries entry title]", description: "[One line on what the diary entry covers.]", meta: "Groundwork Diaries", image: photo("cream", "PenSquare", "[Diary]") },
    ],
    moments: [
      photo("blue", "Camera", "[Field moment]", "lg"), photo("green", "Camera", "[Candid]", "sm"),
      photo("yellow", "Camera", "[Workshop]", "md"), photo("lavender", "Camera", "[Team]", "sm"),
    ],
    impact: {
      headline: "[What changed because of this month]",
      description: "[A short, human explanation of the month's impact.]",
      metrics: [{ value: "[Number]", label: "[Metric label]" }, { value: "[Number]", label: "[Metric label]" }],
      progress: [{ label: "[Yearly goal name]", percent: 74 }],
    },
    people: [
      { name: "[Volunteer name]", role: "[Team / role]", quote: "[A short quote about their month.]", image: photo("blue", "User", "[Portrait]") },
    ],
  },

  "2026-07": {
    key: "2026-07", slug: "july", month: "July", year: 2026, editionNumber: 7,
    tagline: "Rain, roots, and reading circles.",
    cardStats: [{ value: "12", label: "Projects" }, { value: "280+", label: "People" }, { value: "6", label: "Locations" }],
    cover: photo("lavender", "BookOpen", "[Cover — July highlight]"),
    glance: [
      { value: "12", label: "Projects run" },
      { value: "6", label: "Locations" },
      { value: "280+", label: "People involved" },
      { value: "2", label: "New collaborations" },
    ],
    projects: [
      { title: "[Reading circle launch]", category: "Education", date: "Jul 2026", location: "[Locality]", people: "[35] children", description: "[Placeholder summary — replace with the real project description.]", image: photo("lavender", "BookOpen", "[Reading circle]") },
      { title: "[Mangrove restoration trip]", category: "Environment", date: "Jul 2026", location: "[Location]", people: "[20] volunteers", description: "[Placeholder summary — replace with the real project description.]", image: photo("green", "Sprout", "[Restoration]") },
      { title: "[Fundraising gala prep]", category: "Fundraising", date: "Jul 2026", location: "[Venue]", people: "[10] organisers", description: "[Placeholder summary — replace with the real project description.]", image: photo("yellow", "HandCoins", "[Fundraiser]") },
    ],
    inside: [
      { type: "Team", title: "[Team spotlight name]", description: "[What this team worked on this month.]", meta: "Team", image: photo("blue", "Users", "[Team]") },
      { type: "Workshop", title: "[Storytelling workshop]", description: "[What members learned or built.]", meta: "Workshop", image: photo("green", "Wrench", "[Workshop]") },
    ],
    moments: [
      photo("lavender", "Camera", "[Field moment]", "md"), photo("blue", "Camera", "[Candid]", "md"),
      photo("green", "Camera", "[Event]", "sm"), photo("yellow", "Camera", "[Workshop]", "lg"),
    ],
    impact: {
      headline: "[What changed because of this month]",
      description: "[A short, human explanation of the month's impact.]",
      metrics: [{ value: "[Number]", label: "[Metric label]" }, { value: "[Number]", label: "[Metric label]" }],
      progress: [{ label: "[Yearly goal name]", percent: 83 }],
    },
    people: [
      { name: "[Volunteer name]", role: "[Team / role]", quote: "[A short quote about their month.]", image: photo("lavender", "User", "[Portrait]") },
    ],
  },

  // -------------------------------------------------------------------------
  // AUGUST 2026 — the fully-populated demo edition. Same schema as every
  // other month above; this one just has every section filled in richly
  // to show what the system looks like at full depth.
  // -------------------------------------------------------------------------
  "2026-08": {
    key: "2026-08", slug: "august", month: "August", year: 2026, editionNumber: 8,
    tagline: "Fourteen projects. One very full month.",
    cardStats: [{ value: "14", label: "Projects" }, { value: "310+", label: "People" }, { value: "7", label: "Locations" }],
    cover: photo("green", "Waves", "[Cover — August highlight]"),
    glance: [
      { value: "14", label: "Projects run" },
      { value: "7", label: "Locations" },
      { value: "310+", label: "People involved" },
      { value: "6", label: "Partner organisations" },
    ],
    projects: [
      {
        title: "[Riverbank restoration — phase 2]", category: "Environment", date: "Aug 3, 2026",
        location: "[Ghat name, Kolkata]", people: "[65+] volunteers",
        description: "[Placeholder description of the second phase of this clean-up and restoration effort, including what was cleared and replanted.]",
        image: photo("green", "Waves", "[Riverbank restoration]"),
      },
      {
        title: "[Back-to-school supply drive]", category: "Education", date: "Aug 6, 2026",
        location: "[School name]", people: "[300+] students",
        description: "[Placeholder description of the supply drive — what was distributed and to how many students.]",
        image: photo("blue", "GraduationCap", "[Supply drive]"),
      },
      {
        title: "[Community health & nutrition camp]", category: "Welfare", date: "Aug 9, 2026",
        location: "[Locality, Kolkata]", people: "[180] attendees",
        description: "[Placeholder description of the health camp's services and turnout.]",
        image: photo("yellow", "HeartHandshake", "[Health camp]"),
      },
      {
        title: "[Monsoon plantation drive]", category: "Plantation", date: "Aug 12, 2026",
        location: "[Location]", people: "[70] volunteers",
        description: "[Placeholder description of the saplings planted and the site chosen.]",
        image: photo("green", "TreePine", "[Plantation]"),
      },
      {
        title: "[Independence Day community fair]", category: "Community", date: "Aug 15, 2026",
        location: "[Locality]", people: "[400+] attendees",
        description: "[Placeholder description of the fair — stalls, performances, turnout.]",
        image: photo("lavender", "PartyPopper", "[Community fair]"),
      },
      {
        title: "[Ration & essentials distribution]", category: "Distribution", date: "Aug 22, 2026",
        location: "[Locality]", people: "[120] families",
        description: "[Placeholder description of what was distributed and to whom.]",
        image: photo("yellow", "Package", "[Distribution]"),
      },
    ],
    inside: [
      {
        type: "Team", title: "[Field Ops team — August spotlight]",
        description: "[A short highlight of what this student team ran or coordinated this month.]",
        meta: "Team", image: photo("green", "Users", "[Team]"),
      },
      {
        type: "Blog", title: "[Groundwork Diaries: “A day on the riverbank”]",
        description: "[One line summarising this month's Groundwork Diaries entry.]",
        meta: "Groundwork Diaries", image: photo("cream", "PenSquare", "[Diary entry]"),
      },
      {
        type: "Workshop", title: "[Volunteer onboarding workshop]",
        description: "[What new volunteers learned in this session.]",
        meta: "Workshop", image: photo("lavender", "Wrench", "[Workshop]"),
      },
      {
        type: "Event", title: "[Monthly member meet-up]",
        description: "[What was discussed or celebrated at this gathering.]",
        meta: "Event", image: photo("blue", "CalendarDays", "[Meet-up]"),
      },
    ],
    moments: [
      photo("green", "Camera", "[Riverbank clean-up, morning]", "lg"),
      photo("yellow", "Camera", "[Kids at the supply drive]", "sm"),
      photo("blue", "Camera", "[Health camp check-in]", "md"),
      photo("lavender", "Camera", "[Volunteers planting saplings]", "md"),
      photo("cream", "Camera", "[Community fair stall]", "sm"),
      photo("green", "Camera", "[Team huddle before the drive]", "sm"),
      photo("blue", "Camera", "[Distribution day queue]", "md"),
      photo("yellow", "Camera", "[Candid — end of day]", "lg"),
    ],
    impact: {
      headline: "[A one-line summary of what August's work actually changed]",
      description: "[A short, human paragraph on the month's impact — written for someone who wasn't there, not a KPI table.]",
      metrics: [
        { value: "[Number]", label: "[e.g. saplings planted]" },
        { value: "[Number]", label: "[e.g. families reached]" },
        { value: "[Number]", label: "[e.g. kilos of waste cleared]" },
      ],
      progress: [
        { label: "[Yearly plantation goal]", percent: 91 },
        { label: "[Yearly welfare-reach goal]", percent: 68 },
      ],
    },
    people: [
      { name: "[Volunteer name]", role: "[Field Ops, Class XI]", quote: "[A short quote about carrying saplings before sunrise.]", image: photo("green", "User", "[Portrait]") },
      { name: "[Volunteer name]", role: "[Team lead, Welfare]", quote: "[A short quote about the health camp turnout.]", image: photo("blue", "User", "[Portrait]") },
      { name: "[Volunteer name]", role: "[Groundwork Diaries]", quote: "[A short quote about writing the diary entry.]", image: photo("yellow", "User", "[Portrait]") },
      { name: "[Volunteer name]", role: "[New member]", quote: "[A short quote about their first month.]", image: photo("lavender", "User", "[Portrait]") },
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

export const AVAILABLE_YEARS = [2025, 2026, 2027];

export function neighbours(edition) {
  const idx = editionList.findIndex((e) => e.key === edition.key);
  return {
    prev: idx > 0 ? editionList[idx - 1] : null,
    next: idx < editionList.length - 1 ? editionList[idx + 1] : null,
  };
}
