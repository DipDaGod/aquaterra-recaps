import Photo from "../Photo";
import { Meta, MetaRow } from "../Lockup";
import { TEAMS, cx, isPlaceholder } from "../../lib/utils";

const draft = (v) => (isPlaceholder(v) ? "opacity-70" : "");

// One slide. Each kind gets its own entrance, staggered by --i, so a run of
// slides doesn't read as the same card with different words in it.
function Rise({ i = 0, className = "", children }) {
  return (
    <div className={cx("story-rise", className)} style={{ "--i": i }}>
      {children}
    </div>
  );
}

export default function StorySlide({ slide }) {
  switch (slide.kind) {
    case "cover":
      return (
        <div className="flex h-full flex-col justify-end gap-4 p-7 sm:p-10">
          <Rise i={0}>
            <Meta className="text-cream-soft/60">
              {slide.eyebrow} · {slide.meta}
            </Meta>
          </Rise>
          <Rise i={1}>
            <h2 className="u-display text-[clamp(2.5rem,12vw,4.5rem)] text-cream-soft">
              {slide.lockup?.caps}{" "}
              <em className="font-accent lowercase italic text-green-bright">{slide.lockup?.accent}</em>
              <span aria-hidden="true">.</span>
            </h2>
          </Rise>
          <Rise i={2}>
            <p className="max-w-sm text-pretty text-lg text-cream-soft/75">{slide.tagline}</p>
          </Rise>
        </div>
      );

    case "stat":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
          <Rise i={0}>
            <p className="story-pop u-display text-[clamp(4rem,22vw,8rem)] tabular-nums text-cream-soft">
              {slide.value}
            </p>
          </Rise>
          <Rise i={1}>
            <Meta className="text-cream-soft/60">{slide.label}</Meta>
          </Rise>
        </div>
      );

    case "teams":
      return (
        <div className="flex h-full flex-col justify-center gap-6 p-7 sm:p-10">
          <Rise i={0}>
            <h2 className="u-display text-[clamp(1.75rem,7vw,2.75rem)] text-cream-soft">
              {slide.lockup?.caps}{" "}
              <em className="font-accent lowercase italic text-green-bright">{slide.lockup?.accent}</em>
              <span aria-hidden="true">.</span>
            </h2>
          </Rise>
          <div className="grid grid-cols-2 gap-2">
            {slide.teams.map((t, i) => {
              const team = TEAMS[t.key];
              return (
                <Rise key={t.key} i={i + 1}>
                  <div className={cx("flex items-center justify-between gap-2 rounded-xl px-3 py-2.5", team?.bg, team?.on)}>
                    <span className="truncate text-[0.8rem] font-semibold">{t.name}</span>
                    <span className="shrink-0 font-mono text-[0.7rem] tabular-nums opacity-80">{t.members}</span>
                  </div>
                </Rise>
              );
            })}
          </div>
        </div>
      );

    case "drive": {
      const team = TEAMS[slide.team];
      return (
        <div className="flex h-full flex-col">
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <div className="story-zoom h-full w-full">
              <Photo item={slide.image} />
            </div>
          </div>
          <div className="shrink-0 space-y-3 p-7 sm:p-8">
            <Rise i={0} className="flex flex-wrap items-center gap-2">
              <span className={cx("rounded-full px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em]", team?.bg, team?.on)}>
                {slide.category}
              </span>
              <Meta className={cx("text-cream-soft/60", draft(slide.date))}>{slide.date}</Meta>
            </Rise>
            <Rise i={1}>
              <h2 className={cx("u-display text-[clamp(1.5rem,6vw,2.25rem)] text-cream-soft", draft(slide.title))}>
                {slide.title}
              </h2>
            </Rise>
            <Rise i={2}>
              <MetaRow className="text-cream-soft/50" items={slide.meta} />
            </Rise>
          </div>
        </div>
      );
    }

    case "photo":
      return (
        <div className="flex h-full flex-col">
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <div className="story-zoom h-full w-full">
              <Photo item={slide.image} />
            </div>
          </div>
          <div className="shrink-0 space-y-2 p-7 sm:p-8">
            <Rise i={0}>
              <p className={cx("text-pretty text-cream-soft", draft(slide.caption))}>{slide.caption}</p>
            </Rise>
            <Rise i={1}>
              <Meta className={cx("text-cream-soft/50", draft(slide.credit))}>
                Shot by {slide.credit || "[Credit]"}
              </Meta>
            </Rise>
          </div>
        </div>
      );

    case "impact":
      return (
        <div className="flex h-full flex-col justify-center gap-7 p-7 sm:p-10">
          <Rise i={0}>
            <Meta className="text-green-bright">The impact</Meta>
          </Rise>
          <Rise i={1}>
            <h2 className={cx("text-balance text-2xl font-semibold leading-snug text-cream-soft sm:text-3xl", draft(slide.headline))}>
              {slide.headline}
            </h2>
          </Rise>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {slide.metrics.map((m, i) => (
              <Rise key={`${m.label}-${i}`} i={i + 2}>
                <p className={cx("u-display text-3xl text-cream-soft sm:text-4xl", draft(m.value))}>{m.value}</p>
                <Meta className="mt-1 block text-cream-soft/50">{m.label}</Meta>
              </Rise>
            ))}
          </div>
        </div>
      );

    case "end":
      return (
        <div className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
          <Rise i={0}>
            <h2 className="u-display text-[clamp(2rem,9vw,3.5rem)] text-cream-soft">
              THAT WAS{" "}
              <em className="font-accent lowercase italic text-green-bright">{slide.month}</em>
              <span aria-hidden="true">.</span>
            </h2>
          </Rise>
          <Rise i={1}>
            <p className="max-w-xs text-pretty text-cream-soft/70">
              the whole issue is below — the teams, the drives, the frames, and a quiz you will
              probably lose.
            </p>
          </Rise>
        </div>
      );

    default:
      return null;
  }
}
