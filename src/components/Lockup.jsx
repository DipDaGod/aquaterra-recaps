import { cx } from "../lib/utils";

// The house headline lockup (CLAUDE.md §4): heavy caps + ONE italic serif word
// in an accent colour + a period.
//
//   THE drives.      PICK A LANE, THEN turn up.      PARADOX 2026.
//
// The period renders here so it can never be forgotten, and sits outside the
// italic so it stays upright. Size comes from the caller's `className`.
export default function Lockup({
  caps,
  accent,
  as: Tag = "h2",
  className = "",
  accentClassName = "text-(--issue-accent)",
}) {
  return (
    <Tag className={cx("u-display text-balance uppercase", className)}>
      {caps}
      {accent && (
        <>
          {" "}
          <em className={cx("font-accent lowercase italic", accentClassName)}>{accent}</em>
        </>
      )}
      <span aria-hidden="true">.</span>
    </Tag>
  );
}

// The mono role: eyebrows, stat labels, meta strings, the copyright line.
//
// CAUTION: this applies `text-transform: uppercase`, so never route a team name
// or other proper noun through it — "ShikshAQ" would render "SHIKSHAQ" and
// "Crftd" "CRFTD", both banned by CLAUDE.md §2. Use TEAMS[...].caps instead.
export function Meta({ children, className = "" }) {
  return <span className={cx("u-mono", className)}>{children}</span>;
}

// Meta strings joined with middle dots: `8 DEPARTMENTS · 570+ DRIVES`.
export function MetaRow({ items, className = "" }) {
  const parts = items.filter(Boolean);
  return (
    <Meta className={className}>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1.5 opacity-40">·</span>}
          {part}
        </span>
      ))}
    </Meta>
  );
}

// A section's running number beside a hairline rule, for the sections that
// render their own opener rather than going through <Section>.
export function SectionNumber({ index, label, onDark = false, accentClassName }) {
  if (!index) return null;
  return (
    <div className="mb-4 flex items-center gap-3">
      <Meta className={accentClassName || (onDark ? "text-cream-soft" : "text-(--issue-accent-ink)")}>
        {String(index).padStart(2, "0")}
      </Meta>
      <span
        aria-hidden="true"
        className={cx("h-px w-8 shrink-0", onDark ? "bg-cream-soft/30" : "bg-ink/15")}
      />
      {label && (
        <Meta className={onDark ? "text-cream-soft/60" : "text-ink-3"}>{label}</Meta>
      )}
    </div>
  );
}
