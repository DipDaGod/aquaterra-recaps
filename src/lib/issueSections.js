// The running order of an issue. One manifest, used twice: to number the
// sections on the page and to build the "in this issue" contents block, so the
// two can never drift apart.
//
// A section only appears if the edition actually carries its data, and the
// numbering closes up around whatever is missing — an issue with no openings
// runs 01..08, not 01..09 with a hole.
export const SECTION_MANIFEST = [
  { id: "numbers", label: "The numbers", has: (e) => e.glance?.length > 0 },
  { id: "teams", label: "The teams", has: (e) => e.teams?.roster?.length > 0 },
  { id: "featured", label: "Featured", has: (e) => e.featured?.length > 0 },
  {
    id: "photography",
    label: "Photography",
    has: (e) => Boolean(e.photography?.featured) || e.photography?.gallery?.length > 0,
  },
  { id: "games", label: "Mini games", has: (e) => e.games?.quiz?.length > 0 },
  { id: "diaries", label: "Groundwork Diaries", has: (e) => e.inside?.length > 0 },
  { id: "impact", label: "The impact", has: (e) => Boolean(e.impact) },
  { id: "openings", label: "Openings", has: (e) => e.openings?.roles?.length > 0 },
  { id: "people", label: "The people", has: (e) => e.people?.length > 0 },
];

export function issueSections(edition) {
  return SECTION_MANIFEST.filter((s) => s.has(edition)).map((s, i) => ({
    id: s.id,
    label: s.label,
    index: i + 1,
  }));
}

// Lookup by id, so a component can ask for its own number without knowing the
// order: sectionNumber(sections, "teams") -> 2
export function sectionMeta(sections, id) {
  return sections.find((s) => s.id === id) || {};
}
