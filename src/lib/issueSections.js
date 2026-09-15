// The running order of an issue: section numbering, the nav menu's index, and
// each section's colour and opener treatment. A section appears only if the
// edition carries its data, and the numbering closes up around what's missing.
//
// `has` must test the SECTION, not one field — gating games on a single game's
// field once dropped the whole section out of the numbering. `size` is
// prominence, declared here rather than derived from `variant`. Both traps are
// written up in CLAUDE.md §5.
//
// `label` may be a function of the edition, for sections whose subject changes
// from issue to issue: the opener answers Edition 01's "what is AquaTerra" and
// Edition 02's "what was October", and the index should say which.
//
// `blurb` is the section in one line. It is here rather than in the archive
// page that prints it, so the two can't drift.
export const SECTION_MANIFEST = [
  { id: "opener", label: (e) => e.opener?.label || "The opener", accent: "green", variant: "rule", ground: "plain", size: "lead",
    blurb: "the issue in prose, before the numbers get hold of it",
    has: (e) => e.opener?.body?.length > 0 },
  { id: "numbers", label: "The numbers", accent: "sky", variant: "numeral", ground: "band", size: "sub",
    blurb: "what the month counted, before anyone describes it",
    has: (e) => e.glance?.length > 0 },
  { id: "teams", label: "The teams", accent: "ink", variant: "rule", ground: "plain", size: "lead",
    blurb: "eight of them — five volunteer, three student businesses",
    has: (e) => e.teams?.roster?.length > 0 },
  { id: "featured", label: "Featured", accent: "tomato", variant: "numeral", ground: "band", size: "lead",
    blurb: "the month's stories, written by the members who were there",
    has: (e) => e.featured?.length > 0 },
  { id: "photography", label: "Photography", accent: "grape", variant: "rule", ground: "plain", size: "lead",
    blurb: "one frame picked by the desk, then the wall",
    has: (e) => Boolean(e.photography?.featured) || e.photography?.gallery?.length > 0 },
  { id: "games", label: "Mini games", accent: "sky", variant: "centre", ground: "ink", size: "lead",
    blurb: "three of them. no prizes, no leaderboard, no sign-up",
    has: (e) => Boolean(e.games) && (
      e.games.bigger?.length >= 2 || e.games.guess?.length > 0 || e.games.match?.length > 0
    ) },
  { id: "impact", label: "The impact", accent: "teal", variant: "numeral", ground: "plain", size: "sub",
    blurb: "what actually changed, and how far the goals got",
    has: (e) => e.impact?.metrics?.length > 0 },
  { id: "openings", label: "Openings", accent: "pink", variant: "numeral", ground: "band", size: "sub",
    blurb: "roles to join, from Human Resources",
    has: (e) => e.openings?.roles?.length > 0 },
  { id: "people", label: "The people", accent: "lemon", variant: "centre", ground: "band", size: "sub",
    blurb: "the members who turned up, in their own words",
    has: (e) => e.people?.length > 0 },
];

export function issueSections(edition) {
  return SECTION_MANIFEST.filter((s) => s.has(edition)).map((s, i) => ({
    id: s.id,
    label: typeof s.label === "function" ? s.label(edition) : s.label,
    accent: s.accent, size: s.size, blurb: s.blurb,
    variant: s.variant, ground: s.ground, index: i + 1,
  }));
}

export function sectionMeta(sections, id) {
  return sections.find((s) => s.id === id) || {};
}
