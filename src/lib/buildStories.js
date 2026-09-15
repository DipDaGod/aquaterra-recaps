import { TEAMS } from "./utils";

// Turns an edition into a run of story slides, grouped into the chapters the
// highlight rings open at. Everything is read from the edition object — nothing
// is authored for the player — so a story can never drift from the page it
// summarises, and a placeholder stays a placeholder.
export const CHAPTERS = [
  { id: "all", label: "Play all", accent: "green" },
  { id: "numbers", label: "Numbers", accent: "green" },
  { id: "teams", label: "Teams", accent: "grape" },
  { id: "drives", label: "Drives", accent: "tomato" },
  { id: "frames", label: "Frames", accent: "sky" },
  { id: "impact", label: "Impact", accent: "lemon" },
];

// A slide holds for as long as it takes to read it. A fixed duration gave a
// three-word headline and a twenty-word one the same 3.6 seconds, so the long
// ones got cut off and the short ones sat there.
function dwell(base, ...text) {
  const words = text.filter(Boolean).join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.min(6200, base + words * 230);
}

export function buildStories(edition) {
  const slides = [];
  // `section` is the id of the part of the issue a slide came from, so the
  // player can offer a way into it. Slides that aren't about one leave it off.
  const push = (chapter, slide) => slides.push({ ...slide, chapter, id: `${chapter}-${slides.length}` });

  push("numbers", {
    kind: "cover",
    accent: "green",
    lockup: edition.lockup,
    eyebrow: `Edition ${String(edition.editionNumber).padStart(2, "0")}`,
    meta: `${edition.month} ${edition.year}`,
    tagline: edition.tagline,
    ms: dwell(2600, edition.lockup?.caps, edition.lockup?.accent, edition.tagline),
  });

  // Cycled so four figures in a row aren't four identical cards.
  const statAccents = ["green", "sky", "lemon", "grape"];
  (edition.glance || []).forEach((stat, i) => {
    push("numbers", {
      kind: "stat", value: stat.value, label: stat.label, section: "numbers",
      accent: statAccents[i % statAccents.length], ms: dwell(2200, stat.label),
    });
  });

  const roster = edition.teams?.roster || [];
  if (roster.length) {
    push("teams", {
      kind: "teams",
      lockup: edition.teams.lockup,
      teams: roster.map((t) => ({ key: t.key, name: TEAMS[t.key]?.name, members: t.members })),
      section: "teams",
      accent: "grape", ms: 3000 + roster.length * 260,
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
      section: f.team ? `feature-${f.team}` : "featured",
      accent: "tomato", ms: dwell(2400, f.title, f.category),
    });
  }

  const p = edition.photography;
  if (p?.featured) {
    push("frames", {
      kind: "photo", image: p.featured, caption: p.featuredCaption,
      credit: p.featured.credit, section: "photography", accent: "sky",
      ms: dwell(2600, p.featuredCaption), hero: true,
    });
  }
  for (const frame of p?.gallery || []) {
    push("frames", {
      kind: "photo", image: frame, caption: frame.label, credit: frame.credit,
      section: "photography", accent: "sky", ms: dwell(2000, frame.label),
    });
  }

  if (edition.impact) {
    push("impact", {
      kind: "impact",
      headline: edition.impact.headline,
      metrics: edition.impact.metrics || [],
      section: "impact",
      accent: "lemon", ms: dwell(2800, edition.impact.headline),
    });
  }

  // The run ends on a card that goes somewhere, rather than just stopping.
  // Long, because it is the one slide worth sitting on.
  push("impact", {
    kind: "end",
    month: edition.month,
    year: edition.year,
    accent: "green", ms: 9000,
  });

  return slides;
}

// Chapters that have slides, in running order, each with the index to jump to.
export function chaptersFor(slides) {
  return CHAPTERS.filter((c) => c.id === "all" || slides.some((s) => s.chapter === c.id)).map((c) => ({
    ...c,
    start: c.id === "all" ? 0 : slides.findIndex((s) => s.chapter === c.id),
    count: c.id === "all" ? slides.length : slides.filter((s) => s.chapter === c.id).length,
  }));
}
