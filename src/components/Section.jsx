import { useReveal } from "../lib/useReveal";
import { cx } from "../lib/utils";
import Lockup, { SectionNumber } from "./Lockup";

// One vertical rhythm for the whole site, plus three weights of section so a
// long issue reads as a ranked document instead of eleven equal slabs:
//
//   "major"  — a full tinted band, for the strands an issue is built around
//   "panel"  — a dark inset panel, for the set pieces (impact, the quiz)
//   "plain"  — cream ground, the default
//
// `size` controls the opener: "lead" for a major strand, "sub" for the rest.
const GROUNDS = {
  plain: "",
  major: "bg-cream-soft/70 border-y border-line/70",
  panel: "",
};

export default function Section({
  id,
  index,
  label,
  caps,
  accent,
  lead,
  aside,
  size = "sub",
  ground = "plain",
  children,
  className = "",
  reveal = true,
}) {
  const [ref, revealClass] = useReveal();
  const heading = caps || lead || aside || index;

  return (
    <section
      id={id}
      ref={reveal ? ref : undefined}
      className={cx(
        ground === "major" ? "py-14 sm:py-20" : "py-12 sm:py-16",
        GROUNDS[ground],
        reveal && revealClass
      )}
    >
      <div className={cx("mx-auto max-w-6xl px-5 sm:px-8 lg:px-10", className)}>
        {heading && (
          <div className="mb-9 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div className="max-w-2xl">
              <SectionNumber index={index} label={label} />
              {caps && (
                <Lockup
                  caps={caps}
                  accent={accent}
                  className={size === "lead" ? "text-(length:--text-display-l)" : "text-(length:--text-display-m)"}
                />
              )}
              {lead && <p className="mt-4 max-w-xl text-pretty text-ink-2">{lead}</p>}
            </div>
            {aside && (
              <p className="u-mono max-w-full text-ink-3">{aside}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
