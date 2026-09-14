import { useReveal } from "../lib/useReveal";
import { cx } from "../lib/utils";

// One vertical rhythm for every section on the site, so spacing is a
// decision made once here rather than re-guessed per component.
export default function Section({ id, children, className = "", tight = false, reveal = true }) {
  const [ref, revealClass] = useReveal();
  return (
    <section
      id={id}
      ref={reveal ? ref : undefined}
      className={cx(
        "mx-auto max-w-6xl px-5 sm:px-8 lg:px-10",
        tight ? "py-10 sm:py-12" : "py-14 sm:py-20",
        reveal && revealClass,
        className
      )}
    >
      {children}
    </section>
  );
}

// Shared heading block: eyebrow + title + optional lead and right-hand slot.
// Replaces the four slightly-different heading markups the sections each had.
export function SectionHeading({ eyebrow, title, lead, aside, className = "" }) {
  return (
    <div className={cx("mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3", className)}>
      <div className="max-w-xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green">{eyebrow}</p>
        )}
        <h2 className={cx(
          "text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
          eyebrow && "mt-2.5"
        )}>
          {title}
        </h2>
        {lead && <p className="mt-2.5 text-pretty text-ink-soft">{lead}</p>}
      </div>
      {aside && <div className="shrink-0 text-sm text-ink-soft">{aside}</div>}
    </div>
  );
}
