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
// Team names in their canonical casing — the only form that ever renders.
// The parent site's own team cards set the title in canonical case, not
// display caps, which also removes any chance of printing SHIKSHAQ or
// AQ.VENTURES. Never run a CSS `uppercase` over a team name.
export const TEAMS = {
  welfare: { name: "Welfare Team", kind: "volunteer team", emoji: "🌱", bg: "bg-team-welfare", on: "text-cream-soft", ink: "text-team-welfare-ink" },
  social: { name: "Social Media", kind: "volunteer team", emoji: "✍️", bg: "bg-team-social", on: "text-cream-soft", ink: "text-team-social-ink" },
  collabs: { name: "Collabs Team", kind: "volunteer team", emoji: "⚙️", bg: "bg-team-collabs", on: "text-cream-soft", ink: "text-team-collabs-ink" },
  shikshaq: { name: "ShikshAQ", kind: "student business", emoji: "⚡", bg: "bg-team-shikshaq", on: "text-ink", ink: "text-team-shikshaq-ink" },
  hr: { name: "Human Resources", kind: "volunteer team", emoji: "⚙️", bg: "bg-team-hr", on: "text-cream-soft", ink: "text-team-hr-ink" },
  events: { name: "Events Team", kind: "volunteer team", emoji: "🎪", bg: "bg-team-events", on: "text-ink", ink: "text-team-events-ink" },
  ventures: { name: "AQ.Ventures", kind: "student business", emoji: "⚙️", bg: "bg-team-ventures", on: "text-cream-soft", ink: "text-team-ventures-ink" },
  crftd: { name: "Crftd", kind: "student business", emoji: "✍️", bg: "bg-team-crftd", on: "text-cream-soft", ink: "text-team-crftd-ink" },
};
