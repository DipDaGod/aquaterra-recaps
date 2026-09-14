import AnimatedNumber from "./AnimatedNumber";
import Section from "./Section";
import { Meta, SectionNumber } from "./Lockup";
import { useReveal } from "../lib/useReveal";

// Bars fill from zero once the panel scrolls into view, instead of being
// painted at full width before anyone sees them move.
function ProgressBar({ label, percent }) {
  const [ref, revealed] = useReveal({ threshold: 0.3 });
  // A goal with no confirmed figure renders as an empty track rather than a
  // made-up fill — an invented progress bar is an invented statistic.
  const known = typeof percent === "number" && Number.isFinite(percent);
  const pct = known ? Math.max(0, Math.min(100, percent)) : 0;

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="text-pretty text-cream-soft/80">{label}</span>
        <span className="shrink-0 tabular-nums text-cream-soft/60">
          {known ? `${pct}%` : "[--]"}
        </span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-cream-soft/15"
        role="progressbar"
        aria-label={label}
        aria-valuenow={known ? pct : undefined}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-green-bright transition-[width] duration-1000 ease-out"
          style={{ width: revealed ? `${pct}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function ImpactSection({ edition, index, label }) {
  const { impact } = edition;
  if (!impact) return null;

  return (
    <Section id="impact">
      <div className="rounded-[2rem] bg-ink px-6 py-10 text-cream-soft sm:px-10 sm:py-14 lg:px-14">
        <SectionNumber index={index} label={label} onDark />
        <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
          {impact.headline}
        </h2>
        <p className="mt-4 max-w-xl text-pretty text-cream-soft/70">{impact.description}</p>

        {/* auto-fit rather than a hard 3 columns: an edition with two metrics
            used to leave a third of the row empty. */}
        <dl className="mt-10 grid gap-8 [grid-template-columns:repeat(auto-fit,minmax(11rem,1fr))]">
          {impact.metrics.map((m, i) => (
            <div key={`${m.label}-${i}`}>
              <dd className="font-display text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
                <AnimatedNumber value={m.value} />
              </dd>
              <dt className="mt-2"><Meta className="text-cream-soft/70">{m.label}</Meta></dt>
            </div>
          ))}
        </dl>

        {impact.progress?.length > 0 && (
          <div className="mt-10 flex flex-col gap-5 border-t border-cream-soft/15 pt-8">
            {impact.progress.map((p, i) => (
              <ProgressBar key={`${p.label}-${i}`} label={p.label} percent={p.percent} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
