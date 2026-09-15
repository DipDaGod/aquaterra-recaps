import Photo from "./Photo";
import { Meta, MetaRow } from "./Lockup";
import { TEAMS, cx, isPlaceholder } from "../lib/utils";

// Copy the desk hasn't written yet reads as deliberately unfinished rather than
// as a typo someone shipped, and the treatment disappears on its own when a real
// string lands. `rule` is for short strings — a headline, a date — where a
// dashed underline reads as a blank waiting to be filled; body copy gets opacity
// only, since a dashed rule under four wrapped lines is just noise.
function Draft({ children, rule = false, className = "" }) {
  const pending = isPlaceholder(children);
  return (
    <span
      className={cx(
        pending && "opacity-55",
        pending && rule && "decoration-dashed decoration-from-font underline underline-offset-4",
        className
      )}
    >
      {children}
    </span>
  );
}

export default function ProjectCard({ project, index, wide = false }) {
  const team = TEAMS[project.team];
  const pending = isPlaceholder(project.title);
  const num = index != null ? String(index + 1).padStart(2, "0") : null;

  return (
    <article
      className={cx(
        "group relative flex h-full flex-col rounded-[1.75rem] border border-line bg-cream-soft p-2.5 shadow-(--shadow-card)",
        wide && "lg:flex-row lg:gap-2.5"
      )}
    >
      <div className={cx("relative shrink-0", wide ? "lg:w-1/2" : "")}>
        <div
          className={cx(
            "overflow-hidden rounded-[1.25rem]",
            wide ? "aspect-[16/10] lg:h-full lg:aspect-auto" : "aspect-[4/3]"
          )}
        >
          <Photo item={project.image} />
        </div>

        {/* Set in the display face's regular weight and half-off the image —
            the same device the section openers use. */}
        {num && (
          <span
            aria-hidden="true"
            className={cx(
              "absolute -bottom-1 left-3 font-display text-[2.75rem] font-normal leading-none tracking-[-0.03em] sm:text-5xl",
              team?.ink || "text-ink"
            )}
            style={{ WebkitTextStroke: "0.5px var(--color-cream-soft)" }}
          >
            {num}
          </span>
        )}
      </div>

      <div className={cx("flex flex-1 flex-col px-2 pb-1.5 pt-4", wide && "lg:w-1/2 lg:justify-center lg:px-4 lg:py-6")}>
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
          <span className={cx("rounded-full px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em]", team?.bg ?? "bg-paper", team?.on ?? "text-ink")}>
            {project.category}
          </span>
          <Meta className="text-ink-3">
            <Draft rule>{project.date}</Draft>
          </Meta>
          {pending && (
            <Meta className="ml-auto rounded-full border border-dashed border-ink/25 px-2 py-0.5 text-ink-3">
              copy to come
            </Meta>
          )}
        </div>

        <h3 className={cx("u-display mt-3", wide ? "text-2xl sm:text-3xl" : "text-xl sm:text-[1.4rem]")}>
          <Draft rule>{project.title}</Draft>
        </h3>

        <p className="mt-2.5 text-pretty text-[0.875rem] leading-relaxed text-ink-2">
          <Draft>{project.description}</Draft>
        </p>

        <div className="mt-auto border-t border-line pt-3.5">
          <MetaRow className="text-ink-3" items={[project.location, project.people]} />
        </div>
      </div>
    </article>
  );
}
