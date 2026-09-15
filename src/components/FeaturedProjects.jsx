import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import Section from "./Section";
import ShowMore from "./ShowMore";
import { cx } from "../lib/utils";

export default function FeaturedProjects({ edition, index, label, accentKey, variant, ground, size }) {

  // Each filter carries its own count, so it's clear what a tab will show
  // before it's tapped.
  const projects = useMemo(() => edition.featured ?? [], [edition.featured]);

  const categories = useMemo(() => {
    const counts = new Map();
    for (const p of projects) counts.set(p.category, (counts.get(p.category) || 0) + 1);
    return [
      { name: "All", count: projects.length },
      ...[...counts].map(([name, count]) => ({ name, count })),
    ];
  }, [projects]);

  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  if (projects.length === 0) return null;

  return (
    <Section
      id="featured"
      index={index}
      label={label}
      accentKey={accentKey}
      variant={variant}
      ground={ground}
      size={size}
      caps="THE"
      accent="drives"
      lead="welfare, events, the student businesses, media — everything the month actually held, not just the drives."
      aside={`${projects.length} ${projects.length === 1 ? "story" : "stories"}`}
    >

      {categories.length > 2 && (
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="scroll-quiet -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {categories.map(({ name, count }) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={active === name}
              onClick={() => setActive(name)}
              className={cx(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                active === name
                  ? "bg-ink text-cream-soft"
                  : "border border-ink/15 text-ink-soft hover:border-ink/40 hover:bg-cream-soft hover:text-ink"
              )}
            >
              {name}
              <span
                className={cx(
                  "text-xs tabular-nums",
                  active === name ? "text-cream-soft/60" : "text-ink/35"
                )}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* The first card of the unfiltered view runs full width as the lead
          story; inside a filter every card is equal so the grid stays even. */}
      <ShowMore
        after={3}
        total={filtered.length}
        noun={active === "All" ? "stories" : `${active.toLowerCase()} stories`}
        className="grid gap-5 sm:gap-6 lg:grid-cols-2"
      >
        {filtered.map((project, i) => {
          const lead = active === "All" && i === 0 && filtered.length > 1;
          return (
            <div
              key={`${project.title}-${i}`}
              id={project.team ? `feature-${project.team}` : undefined}
              className={cx("scroll-mt-24", lead && "lg:col-span-2")}
            >
              <ProjectCard project={project} index={i} wide={lead} />
            </div>
          );
        })}
      </ShowMore>
    </Section>
  );
}
