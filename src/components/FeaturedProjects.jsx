import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import { cx } from "../lib/utils";

export default function FeaturedProjects({ edition }) {
  const categories = useMemo(
    () => ["All", ...new Set(edition.projects.map((p) => p.category))],
    [edition.projects]
  );
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? edition.projects : edition.projects.filter((p) => p.category === active);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div className="mb-6 max-w-lg">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-green">Featured this month</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          A closer look at the work we did this month.
        </h2>
      </div>

      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={cx(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === cat
                  ? "bg-ink text-cream-soft"
                  : "border border-ink/15 text-ink-soft hover:border-ink/40 hover:text-ink"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((project, i) => (
          <div key={project.title} className={i === 0 ? "sm:col-span-2" : ""}>
            <ProjectCard project={project} wide={i === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
