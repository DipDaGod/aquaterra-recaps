import { Link } from "react-router-dom";
import { ArrowLeft, Play, Download } from "lucide-react";
import Photo from "./Photo";

// "Watch recap" and "Download PDF" used to render unconditionally and do
// nothing at all when clicked. They're now driven by optional `video` / `pdf`
// fields on the edition, so a button only appears when there's something
// behind it.
function HeroActions({ edition }) {
  if (!edition.video && !edition.pdf) return null;

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {edition.video && (
        <a
          href={edition.video}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-semibold text-cream-soft transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Play className="h-4 w-4" strokeWidth={2} fill="currentColor" />
          Watch the recap
        </a>
      )}
      {edition.pdf && (
        <a
          href={edition.pdf}
          download
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-cream-soft"
        >
          <Download className="h-4 w-4" strokeWidth={1.75} />
          Download as PDF
        </a>
      )}
    </div>
  );
}

export default function EditionHero({ edition }) {
  const [, second, third] = edition.moments || [];

  return (
    <header className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-10 lg:px-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        All editions
      </Link>

      <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="rounded-full bg-pastel-green px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-green-deep">
          Edition {String(edition.editionNumber).padStart(2, "0")}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
          Monthly recap
        </span>
      </div>

      <h1 className="mt-4 text-[clamp(2.25rem,10vw,6rem)] font-semibold uppercase leading-[0.9] tracking-tight">
        {edition.month}
        <span className="ml-2 align-top text-[0.4em] font-medium normal-case text-ink-soft sm:ml-3">
          {edition.year}
        </span>
      </h1>

      <p className="mt-4 max-w-xl text-balance font-hand text-2xl text-green-deep sm:text-3xl">
        {edition.tagline}
      </p>

      {/* Cover collage. Aspect-driven so it scales instead of being pinned to
          a fixed 480px that squashed the side tiles on small screens. */}
      <div className="mt-9 grid aspect-[4/3] grid-cols-6 grid-rows-6 gap-2.5 sm:aspect-[16/9] sm:gap-3">
        <div className="col-span-6 row-span-4 overflow-hidden rounded-3xl sm:col-span-4 sm:row-span-6">
          <Photo item={edition.cover} />
        </div>
        <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-3">
          <Photo item={second || edition.cover} />
        </div>
        <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-3">
          <Photo item={third || edition.cover} />
        </div>
      </div>

      <HeroActions edition={edition} />
    </header>
  );
}
