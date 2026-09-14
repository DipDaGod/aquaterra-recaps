import { MapPin, Users } from "lucide-react";
import Photo from "./Photo";
import { Meta } from "./Lockup";
import { TEAMS, cx } from "../lib/utils";

export default function ProjectCard({ project, wide = false }) {
  const team = TEAMS[project.team];

  return (
    <article
      className={cx(
        "flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-cream-soft shadow-(--shadow-card)",
        wide && "lg:flex-row"
      )}
    >
      <div
        className={cx(
          "shrink-0 overflow-hidden",
          wide ? "aspect-[16/9] lg:aspect-auto lg:w-1/2" : "aspect-[3/2]"
        )}
      >
        <Photo item={project.image} />
      </div>

      <div className={cx("flex flex-1 flex-col p-5 sm:p-6", wide && "lg:min-h-64 lg:justify-center lg:p-8")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {/* Chip wears the owning team's identity colour, so the mix of work
              on the page is legible at a glance rather than uniformly green. */}
          <span className={cx("rounded-full px-3 py-1.5", team?.bg ?? "bg-paper", team?.on ?? "text-ink")}>
            <Meta>{project.category}</Meta>
          </span>
          <Meta className="text-ink-soft">{project.date}</Meta>
        </div>

        <h3
          className={cx(
            "mt-3 text-balance font-semibold leading-snug tracking-tight",
            wide ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
          )}
        >
          {project.title}
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-ink-soft">{project.description}</p>

        <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-xs text-ink-soft">
          <div className="inline-flex items-center gap-1.5">
            <dt className="sr-only">Location</dt>
            <MapPin className="h-3.5 w-3.5 shrink-0 text-green" strokeWidth={1.75} />
            <dd>{project.location}</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <dt className="sr-only">People</dt>
            <Users className="h-3.5 w-3.5 shrink-0 text-green" strokeWidth={1.75} />
            <dd>{project.people}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
