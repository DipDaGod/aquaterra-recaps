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

// Tone -> classes for placeholder photo tiles.
export const TONES = {
  green: { bg: "bg-tint-green", fg: "text-green-deep", line: "border-green/20" },
  yellow: { bg: "bg-tint-yellow", fg: "text-ink", line: "border-ink/10" },
  blue: { bg: "bg-tint-blue", fg: "text-ink", line: "border-ink/10" },
  lavender: { bg: "bg-tint-lavender", fg: "text-ink", line: "border-ink/10" },
  pink: { bg: "bg-tint-pink", fg: "text-ink", line: "border-ink/10" },
  cream: { bg: "bg-paper", fg: "text-ink-soft", line: "border-ink/10" },
};

// The 8 teams. Names and casing are verified facts (CLAUDE.md §2) — never
// normalise, title-case or expand them. `name` is the canonical form, the only
// one allowed in prose; `caps` is the display form the parent site sets on its
// team-card titles.
//
// `caps` exists so the display form is a deliberate per-team value. Never run a
// CSS `uppercase` over a team name — it would also hit prose, where CLAUDE.md
// §2 bans the caps forms.
export const TEAMS = {
  welfare: { name: "Welfare Team", caps: "WELFARE TEAM", kind: "volunteer team", emoji: "🌱", bg: "bg-team-welfare", on: "text-cream-soft", ink: "text-team-welfare-ink" },
  social: { name: "Social Media", caps: "SOCIAL MEDIA", kind: "volunteer team", emoji: "✍️", bg: "bg-team-social", on: "text-cream-soft", ink: "text-team-social-ink" },
  collabs: { name: "Collabs Team", caps: "COLLABS TEAM", kind: "volunteer team", emoji: "⚙️", bg: "bg-team-collabs", on: "text-cream-soft", ink: "text-team-collabs-ink" },
  shikshaq: { name: "ShikshAQ", caps: "SHIKSHAQ", kind: "student business", emoji: "⚡", bg: "bg-team-shikshaq", on: "text-ink", ink: "text-team-shikshaq-ink" },
  hr: { name: "Human Resources", caps: "HUMAN RESOURCES", kind: "volunteer team", emoji: "⚙️", bg: "bg-team-hr", on: "text-cream-soft", ink: "text-team-hr-ink" },
  events: { name: "Events Team", caps: "EVENTS TEAM", kind: "volunteer team", emoji: "🎪", bg: "bg-team-events", on: "text-ink", ink: "text-team-events-ink" },
  ventures: { name: "AQ.Ventures", caps: "AQ.VENTURES", kind: "student business", emoji: "⚙️", bg: "bg-team-ventures", on: "text-cream-soft", ink: "text-team-ventures-ink" },
  crftd: { name: "Crftd", caps: "CRFTD", kind: "student business", emoji: "✍️", bg: "bg-team-crftd", on: "text-cream-soft", ink: "text-team-crftd-ink" },
};

// Per-issue accents. An edition picks one and every accent word, section
// number and rule shifts to it. Drawn from the team palette — CLAUDE.md §4
// forbids a ninth colour.
export const ISSUE_ACCENTS = {
  green: { accent: "var(--color-green)", ink: "var(--color-green-deep)" },
  sky: { accent: "var(--color-team-events)", ink: "var(--color-team-events-ink)" },
  lemon: { accent: "var(--color-team-shikshaq)", ink: "var(--color-team-shikshaq-ink)" },
  pink: { accent: "var(--color-team-hr)", ink: "var(--color-team-hr-ink)" },
  grape: { accent: "var(--color-team-social)", ink: "var(--color-team-social-ink)" },
  teal: { accent: "var(--color-team-collabs)", ink: "var(--color-team-collabs-ink)" },
  tomato: { accent: "var(--color-team-ventures)", ink: "var(--color-team-ventures-ink)" },
};

export function issueAccentVars(key) {
  const a = ISSUE_ACCENTS[key] || ISSUE_ACCENTS.green;
  return { "--issue-accent": a.accent, "--issue-accent-ink": a.ink };
}

// Section accents. `on` is the text-safe variant for cream grounds, `bright`
// the block colour for dark ones, `raw` the CSS value for gradients and shadows
// a Tailwind class cannot reach.
export const SECTION_ACCENTS = {
  green: { on: "text-team-welfare-ink", bright: "text-green-bright", rule: "bg-team-welfare", raw: "var(--color-green-bright)" },
  tomato: { on: "text-team-ventures-ink", bright: "text-team-ventures", rule: "bg-team-ventures", raw: "var(--color-team-ventures)" },
  grape: { on: "text-team-social-ink", bright: "text-team-social", rule: "bg-team-social", raw: "var(--color-team-social)" },
  sky: { on: "text-team-events-ink", bright: "text-team-events", rule: "bg-team-events", raw: "var(--color-team-events)" },
  teal: { on: "text-team-collabs-ink", bright: "text-team-collabs", rule: "bg-team-collabs", raw: "var(--color-team-collabs)" },
  pink: { on: "text-team-hr-ink", bright: "text-team-hr", rule: "bg-team-hr", raw: "var(--color-team-hr)" },
  lemon: { on: "text-team-shikshaq-ink", bright: "text-team-shikshaq", rule: "bg-team-shikshaq", raw: "var(--color-team-shikshaq)" },
  ink: { on: "text-ink", bright: "text-cream-soft", rule: "bg-ink", raw: "var(--color-ink)" },
};

export function sectionAccent(key, onDark = false) {
  const a = SECTION_ACCENTS[key] || SECTION_ACCENTS.green;
  return { text: onDark ? a.bright : a.on, rule: a.rule };
}

// Copy still awaiting the desk is written "[bracketed]" (CLAUDE.md §0).
// Knowing that at render time lets the placeholder state be designed.
export function isPlaceholder(value) {
  return typeof value === "string" && /^\[.*\]$/.test(value.trim());
}
