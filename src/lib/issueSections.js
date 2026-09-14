// The running order of an issue. One manifest, used three ways: to number the
// sections, to build the "in this issue" contents block, and to give each
// section its own colour and opener treatment — so the page stops reading as
// the same heading nine times.
//
// A section only appears if the edition carries its data, and the numbering
// closes up around whatever is missing.
//
// ON THE COLOURS: aq.md §4 reserves the bright palette as team identity
// colours. It also says the one place to spend judgement is what the parent
// site doesn't cover, and a nine-section long-form issue is exactly that — the
// main site has no equivalent. These are editorial section accents, not a
// claim that Photography belongs to Social Media. Two of them do line up with
// the owning team anyway (openings/HR pink, impact/welfare green). If it reads
// as a team claim to members, drop `accent` back to "green" throughout and the
// issue goes monochrome again.
//
// `size` is the section's prominence — "lead" for the strands an issue is
// built around, "sub" for the supporting ones. It is declared here rather than
// falling out of `variant`, which is how a supporting section ended up shouting
// at the same scale as a lead one.
//
// `variant` is the opener treatment and `ground` the section's background.
// They are set per SECTION, not per position, so a section looks the same from
// issue to issue — and they are chosen so that no two that commonly sit next
// to each other share both. Openings sits between impact and people when an
// issue carries it; without it, diaries/impact/people still alternate.
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
    has: (e) => e.games?.quiz?.length > 0 },
  { id: "diaries", label: "Groundwork Diaries", accent: "teal", variant: "numeral", ground: "plain", size: "sub",
    has: (e) => e.inside?.length > 0 },
  { id: "impact", label: "The impact", accent: "green", variant: "rule", ground: "plain", size: "sub",
    has: (e) => Boolean(e.impact) },
  { id: "openings", label: "Openings", accent: "pink", variant: "numeral", ground: "band",
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
