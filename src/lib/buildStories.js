import { TEAMS } from "./utils";

// Turns an edition into a run of story slides. Everything here is read from
// the edition object — nothing is written for the player — so a story can
// never drift from the page it summarises, and a placeholder stays a
// placeholder rather than becoming invented copy in a prettier wrapper.
//
// Slides are grouped into chapters, which is what the highlight rings open at.
export const CHAPTERS = [
  { id: "all", label: "Play all", accent: "green" },
  { id: "numbers", label: "Numbers", accent: "green" },
  { id: "teams", label: "Teams", accent: "grape" },
  { id: "drives", label: "Drives", accent: "tomato" },
  { id: "frames", label: "Frames", accent: "sky" },
  { id: "impact", label: "Impact", accent: "lemon" },
];

export function buildStories(edition) {
  const slides = [];
  const push = (chapter, slide) => slides.push({ ...slide, chapter, id: `${chapter}-${slides.length}` });

  push("numbers", {
    kind: "cover",
    lockup: edition.lockup,
    eyebrow: `Edition ${String(edition.editionNumber).padStart(2, "0")}`,
    meta: `${edition.month} ${edition.year}`,
    tagline: edition.tagline,
    ms: 3600,
  });

  for (const stat of edition.glance || []) {
    push("numbers", { kind: "stat", value: stat.value, label: stat.label, ms: 2600 });
  }

  const roster = edition.teams?.roster || [];
  if (roster.length) {
    push("teams", {
      kind: "teams",
      lockup: edition.teams.lockup,
      teams: roster.map((t) => ({ key: t.key, name: TEAMS[t.key]?.name, members: t.members })),
      ms: 4200,
    });
  }

  for (const f of edition.featured || []) {
    push("drives", {
      kind: "drive",
      category: f.category,
      team: f.team,
      title: f.title,
      date: f.date,
      meta: [f.location, f.people],
      image: f.image,
      ms: 3400,
    });
  }

  const p = edition.photography;
  if (p?.featured) {
    push("frames", { kind: "photo", image: p.featured, caption: p.featuredCaption, credit: p.featured.credit, ms: 3400 });
  }
  for (const frame of p?.gallery || []) {
    push("frames", { kind: "photo", image: frame, caption: frame.label, credit: frame.credit, ms: 2400 });
  }

  if (edition.impact) {
    push("impact", {
      kind: "impact",
      headline: edition.impact.headline,
      metrics: edition.impact.metrics || [],
      ms: 4200,
    });
  }

  push("impact", {
    kind: "end",
    month: edition.month,
    year: edition.year,
    ms: 4000,
  });

  return slides;
}

// Chapters that actually have slides, in running order, each with the index to
// jump to. "Play all" always starts at zero.
export function chaptersFor(slides) {
  return CHAPTERS.filter((c) => c.id === "all" || slides.some((s) => s.chapter === c.id)).map((c) => ({
    ...c,
    start: c.id === "all" ? 0 : slides.findIndex((s) => s.chapter === c.id),
    count: c.id === "all" ? slides.length : slides.filter((s) => s.chapter === c.id).length,
  }));
}
