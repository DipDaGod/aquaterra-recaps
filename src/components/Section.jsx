import Lockup, { Meta } from "./Lockup";
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

// Shared heading block. `caps` + `accent` build the house lockup (aq.md §4);
// every section opener on the site uses it, so it is not optional here.
export function SectionHeading({
  eyebrow,
  caps,
  accent,
  accentClassName,
  lead,
  aside,
  className = "",
}) {
  return (
    <div className={cx("mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3", className)}>
      <div className="max-w-xl">
        {eyebrow && <Meta className="block text-green">{eyebrow}</Meta>}
        <Lockup
          caps={caps}
          accent={accent}
          accentClassName={accentClassName}
          className={cx("text-3xl sm:text-4xl", eyebrow && "mt-3")}
        />
        {lead && <p className="mt-3 text-pretty text-ink-soft">{lead}</p>}
      </div>
      {aside && <Meta className="max-w-full text-ink-soft">{aside}</Meta>}
    </div>
  );
}
