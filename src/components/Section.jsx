import { useReveal } from "../lib/useReveal";
import { cx, sectionAccent } from "../lib/utils";
import Lockup, { Meta } from "./Lockup";

// One rhythm, three grounds, three opener treatments, so a run of sections
// stops reading as the same heading over and over.
//
//   ground  "plain"  cream page
//           "band"   inset tinted band
//           "ink"    full-bleed dark, knockout type
//
//   variant "rule"    number + hairline + label, heading beneath  (workhorse)
//           "numeral" oversized numeral alongside
//           "centre"  centred opener, for the set pieces
const GROUNDS = {
  plain: "",
  band: "bg-cream-soft/70 border-y border-line/70",
  ink: "bg-ink text-cream-soft",
};

function Opener({ index, label, caps, accent, lead, aside, variant, accentKey, size, onDark }) {
  const isLead = size !== "sub";
  const headClass = isLead ? "text-(length:--text-display-l)" : "text-(length:--text-display-m)";
  // The numeral tracks the heading, so a supporting section never leads with a
  // 104px number above a 34px title.
  const numClass = isLead
    ? "text-[clamp(3.5rem,9vw,6.5rem)]"
    : "text-[clamp(2.25rem,5vw,3.5rem)]";
  const a = sectionAccent(accentKey, onDark);
  const num = index ? String(index).padStart(2, "0") : null;
  const leadClass = cx("mt-4 max-w-xl text-pretty", onDark ? "text-cream-soft/70" : "text-ink-2");
  const asideEl = aside && (
    <Meta className={onDark ? "text-cream-soft/50" : "text-ink-3"}>{aside}</Meta>
  );

  // The numeral is set in the display face's REGULAR weight — the one weight
  // nothing else uses, which stops it competing with the heading beside it.
  if (variant === "numeral") {
    return (
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        {num && (
          <span
            aria-hidden="true"
            className={cx(
              "font-display font-normal leading-[0.8] tracking-[-0.03em]",
              numClass,
              a.text
            )}
          >
            {num}
          </span>
        )}
        <div className="min-w-0 flex-1">
          {label && <Meta className={cx("block", a.text)}>{label}</Meta>}
          {caps && (
            <Lockup caps={caps} accent={accent} accentClassName={a.text}
              className={cx("mt-2", headClass, onDark && "text-cream-soft")} />
          )}
          {lead && <p className={leadClass}>{lead}</p>}
        </div>
        {asideEl && <div className="shrink-0 sm:pt-3">{asideEl}</div>}
      </div>
    );
  }

  if (variant === "centre") {
    return (
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-3">
          {num && <Meta className={a.text}>{num}</Meta>}
          <span aria-hidden="true" className={cx("h-px w-8", a.rule, "opacity-40")} />
          {label && <Meta className={onDark ? "text-cream-soft/60" : "text-ink-3"}>{label}</Meta>}
        </div>
        {caps && (
          <Lockup caps={caps} accent={accent} accentClassName={a.text}
            className={cx("mt-4", headClass, onDark && "text-cream-soft")} />
        )}
        {lead && <p className={cx(leadClass, "mx-auto text-center")}>{lead}</p>}
        {asideEl && <div className="mt-4">{asideEl}</div>}
      </div>
    );
  }

  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
      <div className="max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          {num && <Meta className={a.text}>{num}</Meta>}
          <span aria-hidden="true" className={cx("h-px w-8 shrink-0", a.rule, "opacity-40")} />
          {label && <Meta className={onDark ? "text-cream-soft/60" : "text-ink-3"}>{label}</Meta>}
        </div>
        {caps && (
          <Lockup caps={caps} accent={accent} accentClassName={a.text}
            className={cx(headClass, onDark && "text-cream-soft")} />
        )}
        {lead && <p className={leadClass}>{lead}</p>}
      </div>
      {asideEl}
    </div>
  );
}

export default function Section({
  id, index, label, caps, accent, lead, aside,
  accentKey = "green", variant = "rule", ground = "plain", size = "lead",
  children, className = "", reveal = true,
}) {
  const [ref, revealClass] = useReveal();
  const onDark = ground === "ink";
  const hasOpener = caps || lead || aside || index;

  return (
    <section
      id={id}
      ref={reveal ? ref : undefined}
      className={cx(
        ground === "plain" ? "py-12 sm:py-16" : "py-14 sm:py-20",
        GROUNDS[ground],
        reveal && revealClass
      )}
    >
      <div className={cx("mx-auto max-w-6xl px-5 sm:px-8 lg:px-10", className)}>
        {hasOpener && (
          <Opener
            index={index} label={label} caps={caps} accent={accent} lead={lead}
            aside={aside} variant={variant} accentKey={accentKey} size={size} onDark={onDark}
          />
        )}
        {children}
      </div>
    </section>
  );
}
