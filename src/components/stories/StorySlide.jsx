import { RotateCcw, ArrowDown } from "lucide-react";
import Photo from "../Photo";
import { Meta, MetaRow } from "../Lockup";
import { Words, CountUp, Wash, Ghost, Ring } from "./StoryFx";
import { TEAMS, cx, isPlaceholder } from "../../lib/utils";

const draft = (v) => (isPlaceholder(v) ? "opacity-70" : "");

// Varied drift directions, so consecutive photo slides don't pan identically.
const KEN = [
  { "--kx": "-3%", "--ky": "-2%" },
  { "--kx": "3%", "--ky": "2%" },
  { "--kx": "2%", "--ky": "-3%" },
  { "--kx": "-2%", "--ky": "3%" },
];

// A quiet way out of the trailer and into the thing itself. Only on slides that
// actually came from a section of the issue.
//
// It arrives early on purpose: the shortest slides are only 2.4s, and a chip
// that lands at 0.7s leaves no time to notice it, let alone reach it.
function IntoTheIssue({ slide, onOpenSection }) {
  if (!slide.section || !onOpenSection) return null;
  return (
    <button
      type="button"
      onPointerDown={swallow}
      onPointerUp={swallow}
      onClick={() => onOpenSection(slide.section)}
      className="pointer-events-auto story-rise absolute inset-x-0 bottom-9 z-10 mx-auto flex w-fit items-center gap-1.5 rounded-full bg-cream-soft/10 px-3.5 py-1.5 text-cream-soft/70 backdrop-blur-sm transition-colors hover:bg-cream-soft/25 hover:text-cream-soft"
      style={{ "--i": 3 }}
    >
      <Meta className="text-[0.55rem]">See it in the issue</Meta>
      <ArrowDown className="h-3 w-3" strokeWidth={2.5} />
    </button>
  );
}

function Rise({ i = 0, className = "", children }) {
  return (
    <div className={cx("story-rise", className)} style={{ "--i": i }}>
      {children}
    </div>
  );
}

function Frame({ item, seed = 0 }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="story-ken h-full w-full" style={KEN[seed % KEN.length]}>
        <Photo item={item} />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgb(10 10 10 / 0.96) 0%, rgb(10 10 10 / 0.78) 22%, rgb(10 10 10 / 0.25) 55%, transparent 78%)",
        }}
      />
    </div>
  );
}

// Buttons live inside the tap layer, so they have to stop the press from also
// counting as "next slide".
function swallow(e) {
  e.stopPropagation();
}

export default function StorySlide({ slide, seed = 0, onOpenSection, onReplay }) {
  const accent = slide.accent || "green";

  return (
    <>
      {body(slide, seed, accent, onOpenSection, onReplay)}
      <IntoTheIssue slide={slide} onOpenSection={onOpenSection} />
    </>
  );
}

function body(slide, seed, accent, onOpenSection, onReplay) {
  switch (slide.kind) {
    case "cover":
      return (
        <div className="relative h-full">
          <Wash accent={accent} />
          <Ghost className="text-[38vw] sm:text-[16rem]">{slide.eyebrow?.replace(/\D/g, "")}</Ghost>
          <div className="relative flex h-full flex-col justify-end gap-4 p-7 pb-14 sm:p-10 sm:pb-16">
            <Rise i={0}>
              <Meta className="text-cream-soft/70">{slide.eyebrow} · {slide.meta}</Meta>
            </Rise>
            <h2 className="u-display text-[clamp(2.5rem,12vw,4.5rem)] text-cream-soft">
              <Words text={slide.lockup?.caps} base={120} />{" "}
              <em className="font-accent lowercase italic text-green-bright">
                <Words text={slide.lockup?.accent} base={120} from={3} />
              </em>
              <span aria-hidden="true">.</span>
            </h2>
            <Rise i={5}>
              <p className="max-w-sm text-pretty text-lg text-cream-soft/75">{slide.tagline}</p>
            </Rise>
          </div>
        </div>
      );

    case "stat":
      return (
        <div className="relative h-full">
          <Wash accent={accent} />
          <Ring accent={accent} />
          <div className="relative flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="story-pop u-display text-[clamp(4.5rem,24vw,9rem)] leading-none text-cream-soft">
              <CountUp value={slide.value} />
            </p>
            <Rise i={3}>
              <Meta className="text-cream-soft/70">{slide.label}</Meta>
            </Rise>
          </div>
        </div>
      );

    case "teams":
      // No coloured wash here: the eight team colours are the slide's subject,
      // and a purple ground turns the purple tile invisible.
      return (
        <div className="relative h-full">
          <Wash accent="ink" intensity={0.8} />
          <div className="relative flex h-full flex-col justify-center gap-6 p-7 sm:p-10">
            <h2 className="u-display text-[clamp(1.75rem,7vw,2.75rem)] text-cream-soft">
              <Words text={slide.lockup?.caps} />{" "}
              <em className="font-accent lowercase italic text-green-bright">
                <Words text={slide.lockup?.accent} from={4} />
              </em>
              <span aria-hidden="true">.</span>
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {slide.teams.map((t, i) => {
                const team = TEAMS[t.key];
                return (
                  <div key={t.key} className="story-pop" style={{ "--i": i + 3 }}>
                    <div className={cx("flex items-center justify-between gap-2 rounded-xl px-3 py-2.5", team?.bg, team?.on)}>
                      <span className="truncate text-[0.8rem] font-semibold">{t.name}</span>
                      <span className="shrink-0 font-mono text-[0.7rem] tabular-nums opacity-80">{t.members}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    case "drive": {
      const team = TEAMS[slide.team];
      return (
        <div className="relative h-full">
          <Frame item={slide.image} seed={seed} />
          <div className="relative flex h-full flex-col justify-end gap-3 p-7 pb-14 sm:p-8 sm:pb-16">
            <Rise i={0} className="flex flex-wrap items-center gap-2">
              <span className={cx("story-pop rounded-full px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.08em]", team?.bg, team?.on)}>
                {slide.category}
              </span>
              <Meta className={cx("text-cream-soft/70", draft(slide.date))}>{slide.date}</Meta>
            </Rise>
            <h2 className={cx("u-display text-[clamp(1.5rem,6.5vw,2.4rem)] text-cream-soft", draft(slide.title))}>
              <Words text={slide.title} base={140} />
            </h2>
            <Rise i={4}>
              <MetaRow className="text-cream-soft/60" items={slide.meta} />
            </Rise>
          </div>
        </div>
      );
    }

    case "photo":
      return (
        <div className="relative h-full">
          <Frame item={slide.image} seed={seed} />
          <div className="relative flex h-full flex-col justify-end gap-2.5 p-7 pb-14 sm:p-8 sm:pb-16">
            {slide.hero && (
              <Rise i={0}>
                <span className="inline-flex rounded-full bg-cream-soft px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink">
                  Frame of the month
                </span>
              </Rise>
            )}
            <h2 className={cx("text-balance text-xl font-semibold leading-snug text-cream-soft sm:text-2xl", draft(slide.caption))}>
              <Words text={slide.caption} base={120} />
            </h2>
            <Rise i={4}>
              <Meta className={cx("text-cream-soft/60", draft(slide.credit))}>
                Shot by {slide.credit || "[Credit]"}
              </Meta>
            </Rise>
          </div>
        </div>
      );

    case "impact":
      return (
        <div className="relative h-full">
          <Wash accent={accent} />
          <div className="relative flex h-full flex-col justify-center gap-7 p-7 sm:p-10">
            <Rise i={0}>
              <Meta className="text-green-bright">The impact</Meta>
            </Rise>
            <h2 className={cx("text-balance text-2xl font-semibold leading-snug text-cream-soft sm:text-3xl", draft(slide.headline))}>
              <Words text={slide.headline} base={100} />
            </h2>
            <div className="flex flex-wrap gap-x-8 gap-y-5">
              {slide.metrics.map((m, i) => (
                <div key={`${m.label}-${i}`}>
                  <p className={cx("story-pop u-display text-3xl text-cream-soft sm:text-4xl", draft(m.value))} style={{ "--i": i + 4 }}>
                    <CountUp value={m.value} />
                  </p>
                  <Rise i={i + 5}>
                    <Meta className="mt-1 block text-cream-soft/60">{m.label}</Meta>
                  </Rise>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "end":
      return (
        <div className="relative h-full">
          <Wash accent={accent} intensity={1.3} />
          <div className="relative flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
            <h2 className="u-display text-[clamp(2rem,9vw,3.5rem)] text-cream-soft">
              <Words text="THAT WAS" />{" "}
              <em className="font-accent lowercase italic text-green-bright">
                <Words text={slide.month} from={2} />
              </em>
              <span aria-hidden="true">.</span>
            </h2>
            <Rise i={4}>
              <p className="max-w-xs text-pretty text-cream-soft/75">
                that was the trailer. the issue itself has the teams, the drives, the
                frames and three games you will probably lose.
              </p>
            </Rise>
            {/* It used to say "the whole issue is below" and then just stop.
                Now it takes you there. */}
            <Rise i={6} className="pointer-events-auto mt-1 flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onPointerDown={swallow}
                onPointerUp={swallow}
                onClick={() => onOpenSection?.(null)}
                className="inline-flex items-center gap-2 rounded-full bg-cream-soft px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Read the issue
                <ArrowDown className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                type="button"
                onPointerDown={swallow}
                onPointerUp={swallow}
                onClick={onReplay}
                aria-label="Play the stories again"
                className="grid h-10 w-10 place-items-center rounded-full border border-cream-soft/25 text-cream-soft/70 transition-colors hover:border-cream-soft/60 hover:text-cream-soft"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={2} />
              </button>
            </Rise>
          </div>
        </div>
      );

    default:
      return null;
  }
}
