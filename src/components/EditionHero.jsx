import { Link } from "react-router-dom";
import { ArrowLeft, Play, Download } from "lucide-react";
import Photo from "./Photo";
import Lockup, { Meta, MetaRow } from "./Lockup";

// "Watch recap" and "Download PDF" are driven by optional `video` / `pdf`
// fields — a button only appears when there's something behind it.
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
  // The issue's own headline carries the page; the month and edition number
  // move into the meta line where the parent site puts them.
  const lockup = edition.lockup || { caps: edition.month?.toUpperCase(), accent: String(edition.year) };
  const [second, third] = edition.photography?.gallery || [];
  const cover = edition.cover;

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
        <span className="rounded-full bg-green px-3 py-1.5 text-cream-soft">
          <Meta>Edition {String(edition.editionNumber).padStart(2, "0")}</Meta>
        </span>
        <MetaRow
          className="text-ink-soft"
          items={[
            `${edition.month} ${edition.year}`,
            edition.kind === "orientation" ? "Orientation issue" : "Monthly recap",
          ]}
        />
      </div>

      <Lockup
        as="h1"
        caps={lockup.caps}
        accent={lockup.accent}
        className="mt-5 text-[clamp(2.5rem,10vw,6rem)]"
      />

      {edition.tagline && (
        <p className="mt-5 max-w-xl text-balance text-xl text-ink-soft sm:text-2xl">
          {edition.tagline}
        </p>
      )}

      <div className="mt-9 grid aspect-[4/3] grid-cols-6 grid-rows-6 gap-2.5 sm:aspect-[16/9] sm:gap-3">
        <div className="col-span-6 row-span-4 overflow-hidden rounded-3xl sm:col-span-4 sm:row-span-6">
          <Photo item={cover} />
        </div>
        <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-3">
          <Photo item={second || cover} />
        </div>
        <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-3">
          <Photo item={third || cover} />
        </div>
      </div>

      <HeroActions edition={edition} />
    </header>
  );
}
