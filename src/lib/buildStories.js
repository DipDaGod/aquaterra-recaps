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
    accent: "green",
    lockup: edition.lockup,
    eyebrow: `Edition ${String(edition.editionNumber).padStart(2, "0")}`,
    meta: `${edition.month} ${edition.year}`,
    tagline: edition.tagline,
    ms: 3600,
  });

  // Stats cycle the palette so four figures in a row aren't four identical
  // cards with different digits.
  const statAccents = ["green", "sky", "lemon", "grape"];
  (edition.glance || []).forEach((stat, i) => {
    push("numbers", {
      kind: "stat", value: stat.value, label: stat.label,
      accent: statAccents[i % statAccents.length], ms: 2900,
    });
  });

  const roster = edition.teams?.roster || [];
  if (roster.length) {
    push("teams", {
      kind: "teams",
      lockup: edition.teams.lockup,
      teams: roster.map((t) => ({ key: t.key, name: TEAMS[t.key]?.name, members: t.members })),
      accent: "grape", ms: 4600,
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
      accent: "tomato", ms: 3600,
    });
  }

  const p = edition.photography;
  if (p?.featured) {
    push("frames", { kind: "photo", image: p.featured, caption: p.featuredCaption, credit: p.featured.credit, accent: "sky", ms: 3600, hero: true });
  }
  for (const frame of p?.gallery || []) {
    push("frames", { kind: "photo", image: frame, caption: frame.label, credit: frame.credit, accent: "sky", ms: 2600 });
  }

  if (edition.impact) {
    push("impact", {
      kind: "impact",
      headline: edition.impact.headline,
      metrics: edition.impact.metrics || [],
      accent: "lemon", ms: 4400,
    });
  }

  push("impact", {
    kind: "end",
    month: edition.month,
    year: edition.year,
    accent: "green", ms: 4200,
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
