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
  green: { bg: "bg-pastel-green", fg: "text-green-deep", line: "border-green/25" },
  yellow: { bg: "bg-pastel-yellow", fg: "text-ink", line: "border-ink/10" },
  blue: { bg: "bg-pastel-blue", fg: "text-ink", line: "border-ink/10" },
  lavender: { bg: "bg-pastel-lavender", fg: "text-ink", line: "border-ink/10" },
  cream: { bg: "bg-paper", fg: "text-ink-soft", line: "border-ink/10" },
};
