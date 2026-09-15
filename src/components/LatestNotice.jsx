import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Mascot from "./Mascot";
import { Meta } from "./Lockup";
import { latestEdition } from "../data/editions";

// The "what's new" strip under the hero.
export default function LatestNotice() {
  const { month, year, slug, tagline, editionNumber, cardStats, lockup } = latestEdition;

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-near-black text-cream-soft">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-green-bright/15 blur-3xl"
      />

      <div className="relative flex flex-col gap-7 px-7 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-cream-soft/10 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-cream-soft/80">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-bright opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-bright" />
              </span>
              Now live
            </span>
            <Meta className="text-cream-soft/45">
              Edition {String(editionNumber).padStart(2, "0")} · {month} {year}
            </Meta>
          </div>

          <p className="mt-4 max-w-xl text-balance font-display text-3xl font-bold uppercase leading-[0.95] tracking-[-0.02em] sm:text-4xl">
            {lockup?.caps ?? month}{" "}
            <em className="font-accent lowercase italic text-gold">{lockup?.accent ?? "is live"}</em>
            <span aria-hidden="true">.</span>
          </p>
          <p className="mt-3 max-w-lg text-pretty text-cream-soft/70">{tagline}</p>

          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-soft/60">
            {(cardStats || []).map((s, i) => (
              <div key={`${s.label}-${i}`} className="flex items-baseline gap-1.5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display font-bold tabular-nums text-cream-soft">{s.value}</dd>
                <Meta>{s.label}</Meta>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex shrink-0 items-center gap-5">
          <Mascot className="hidden h-14 w-14 sm:block" color="var(--color-green-bright)" />
          <Link
            to={`/${year}/${slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-cream-soft px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Read the {month} issue
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  );
}
