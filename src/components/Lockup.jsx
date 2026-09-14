import { cx } from "../lib/utils";

// The house headline lockup, per aq.md §4:
//   heavy caps  +  ONE italic serif word in an accent colour  +  a period
//
//   THE drives.      PICK A LANE, THEN turn up.      PARADOX 2026.
//
// The terminal period renders here so it can never be forgotten, and sits
// outside the italic so it stays upright. Size comes from the caller's
// `className` using the display scale (text-display-xl / -l / -m).
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

// The mono role: 700 / 10.5px / uppercase / .06em tracking, taken from the
// parent site's CSS. Eyebrows, stat labels, meta strings, the copyright line.
//
// CAUTION: this applies `text-transform: uppercase`, so never route a team
// name or other proper noun through it. "ShikshAQ" would render "SHIKSHAQ"
// and "Crftd" would render "CRFTD" mid-nav, both banned by aq.md §2. Render
// those from TEAMS[...].name instead.
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

// A section's running number — "01" through "09" — set in the issue accent
// beside a hairline rule. This is the main thing giving the page a spine: it
// tells you where you are in the issue and ranks the openers above the card
// headings beneath them.
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
