// The running order of an issue: section numbering, the nav menu's index, and
// each section's colour and opener treatment. A section appears only if the
// edition carries its data, and the numbering closes up around what's missing.
//
// `has` must test the SECTION, not one field — gating games on a single game's
// field once dropped the whole section out of the numbering. `size` is
// prominence, declared here rather than derived from `variant`. Both traps are
// written up in CLAUDE.md §5.
export const SECTION_MANIFEST = [
  { id: "numbers", label: "The numbers", accent: "green", variant: "rule", ground: "plain", size: "sub",
    has: (e) => e.glance?.length > 0 },
  { id: "teams", label: "The teams", accent: "ink", variant: "numeral", ground: "band", size: "lead",
    has: (e) => e.teams?.roster?.length > 0 },
  { id: "featured", label: "Featured", accent: "tomato", variant: "rule", ground: "plain", size: "lead",
    has: (e) => e.featured?.length > 0 },
  { id: "photography", label: "Photography", accent: "grape", variant: "numeral", ground: "band", size: "lead",
    has: (e) => Boolean(e.photography?.featured) || e.photography?.gallery?.length > 0 },
  { id: "games", label: "Mini games", accent: "sky", variant: "centre", ground: "ink", size: "lead",
    has: (e) => Boolean(e.games) && (
      e.games.bigger?.length >= 2 || e.games.guess?.length > 0 || e.games.match?.length > 0
    ) },
  { id: "impact", label: "The impact", accent: "teal", variant: "numeral", ground: "plain", size: "sub",
    has: (e) => e.impact?.metrics?.length > 0 },
  { id: "openings", label: "Openings", accent: "pink", variant: "numeral", ground: "band", size: "sub",
    has: (e) => e.openings?.roles?.length > 0 },
  { id: "people", label: "The people", accent: "lemon", variant: "centre", ground: "band", size: "sub",
    has: (e) => e.people?.length > 0 },
];

export function issueSections(edition) {
  return SECTION_MANIFEST.filter((s) => s.has(edition)).map((s, i) => ({
    id: s.id, label: s.label, accent: s.accent, size: s.size,
    variant: s.variant, ground: s.ground, index: i + 1,
  }));
}

export function sectionMeta(sections, id) {
  return sections.find((s) => s.id === id) || {};
}
