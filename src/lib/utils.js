export const MONTH_ORDER = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

export function monthLabel(slug) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function monthShort(slug) {
  return monthLabel(slug).slice(0, 3);
}

export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

// Tone -> tailwind classes for placeholder photo tiles, kept in one place
// so swapping the palette later only means editing this map.
export const TONES = {
  green: { bg: "bg-tint-green", fg: "text-green-deep", line: "border-green/20" },
  yellow: { bg: "bg-tint-yellow", fg: "text-ink", line: "border-ink/10" },
  blue: { bg: "bg-tint-blue", fg: "text-ink", line: "border-ink/10" },
  lavender: { bg: "bg-tint-lavender", fg: "text-ink", line: "border-ink/10" },
  pink: { bg: "bg-tint-pink", fg: "text-ink", line: "border-ink/10" },
  cream: { bg: "bg-paper", fg: "text-ink-soft", line: "border-ink/10" },
};

// The 8 teams, exactly as aq.md §2 casts them. Names and casing are verified
// facts — do not normalise, title-case or expand them. Each owns one identity
// colour; `accent` is the token name, `text`/`bg` the Tailwind utilities.
// `name` is the canonical casing — use it in prose and nav, always.
// `caps` is the display-caps form and is NOT a naive uppercase(): aq.md §2
// permits CRFTD as a display heading but bans SHIKSHAQ, and AQ.Ventures keeps
// its period and mixed case everywhere. Never run a CSS `uppercase` over a
// team name; render `caps` when you want the display form.
export const TEAMS = {
  welfare: { name: "Welfare Team", caps: "WELFARE TEAM", kind: "volunteer team", text: "text-team-welfare", bg: "bg-team-welfare", on: "text-cream-soft" },
  social: { name: "Social Media", caps: "SOCIAL MEDIA", kind: "volunteer team", text: "text-team-social", bg: "bg-team-social", on: "text-cream-soft" },
  events: { name: "Events Team", caps: "EVENTS TEAM", kind: "volunteer team", text: "text-team-events", bg: "bg-team-events", on: "text-ink" },
  collabs: { name: "Collabs Team", caps: "COLLABS TEAM", kind: "volunteer team", text: "text-team-collabs", bg: "bg-team-collabs", on: "text-cream-soft" },
  hr: { name: "Human Resources", caps: "HUMAN RESOURCES", kind: "volunteer team", text: "text-team-hr", bg: "bg-team-hr", on: "text-cream-soft" },
  shikshaq: { name: "ShikshAQ", caps: "ShikshAQ", kind: "student business", text: "text-team-shikshaq", bg: "bg-team-shikshaq", on: "text-ink" },
  ventures: { name: "AQ.Ventures", caps: "AQ.Ventures", kind: "student business", text: "text-team-ventures", bg: "bg-team-ventures", on: "text-cream-soft" },
  crftd: { name: "Crftd", caps: "CRFTD", kind: "student business", text: "text-team-crftd", bg: "bg-team-crftd", on: "text-cream-soft" },
};
