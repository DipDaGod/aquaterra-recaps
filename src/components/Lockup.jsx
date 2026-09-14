import { cx } from "../lib/utils";

// The house headline lockup, per aq.md §4:
//   heavy caps  +  ONE italic serif word in an accent colour  +  a period
//
//   THE drives.      PICK A LANE, THEN turn up.      PARADOX 2026.
//
// `caps` is set in display caps; `accent` is the single italic word that
// carries the meaning of the heading — a noun, not a random emphasis. The
// terminal period is rendered here so it can never be forgotten, and it sits
// outside the italic so it stays upright.
export default function Lockup({
  caps,
  accent,
  as: Tag = "h2",
  className = "",
  accentClassName = "text-green",
}) {
  return (
    <Tag
      className={cx(
        "font-display font-bold uppercase leading-[0.92] tracking-[-0.02em] text-balance",
        className
      )}
    >
      {caps}
      {accent && (
        <>
          {" "}
          <em className={cx("font-accent lowercase italic", accentClassName)}>
            {accent}
          </em>
        </>
      )}
      <span aria-hidden="true">.</span>
    </Tag>
  );
}

// Small uppercase letterspaced mono string — eyebrows, stat labels, meta.
// aq.md §4 lists mono as one of the four type roles; it was missing entirely.
//
// CAUTION: this applies CSS `text-transform: uppercase`, so never route a team
// name or other proper noun through it. "ShikshAQ" would render "SHIKSHAQ" and
// "Crftd" would render "CRFTD" mid-nav, both banned by aq.md §2. Render those
// from TEAMS[...].name (canonical) or TEAMS[...].caps (display form) instead.
export function Meta({ children, className = "" }) {
  return (
    <span className={cx("font-mono text-xs uppercase tracking-[0.14em]", className)}>
      {children}
    </span>
  );
}

// Meta strings joined with middle dots: `8 DEPARTMENTS · 570+ DRIVES`.
export function MetaRow({ items, className = "" }) {
  const parts = items.filter(Boolean);
  return (
    <Meta className={className}>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1.5 opacity-50">·</span>}
          {part}
        </span>
      ))}
    </Meta>
  );
}
