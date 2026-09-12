import { Link } from "react-router-dom";
import { ArrowLeft, Play, Download } from "lucide-react";
import Photo from "./Photo";

export default function EditionHero({ edition }) {
  return (
    <header className="mx-auto max-w-6xl px-6 pt-10 sm:px-10">
      <Link
        to="/recaps"
        className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        Back to all editions
      </Link>

      <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-green">Monthly recap</p>
      <h1 className="mt-3 text-[15vw] font-semibold uppercase leading-[0.9] tracking-tight sm:text-7xl">
        {edition.month}
        <span className="ml-4 align-top text-2xl font-medium normal-case text-ink-soft sm:text-3xl">
          {edition.year}
        </span>
      </h1>
      <p className="mt-4 text-xl text-ink-soft">Projects. People. Progress.</p>

      <div className="mt-10 grid h-[480px] grid-cols-6 grid-rows-4 gap-3 overflow-hidden rounded-3xl sm:h-[440px]">
        <div className="col-span-6 row-span-3 overflow-hidden rounded-2xl sm:col-span-4 sm:row-span-4">
          <Photo item={edition.cover} />
        </div>
        <div className="col-span-3 row-span-1 overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2">
          <Photo item={edition.moments?.[1] || edition.cover} />
        </div>
        <div className="col-span-3 row-span-1 overflow-hidden rounded-2xl sm:col-span-2 sm:row-span-2">
          <Photo item={edition.moments?.[2] || edition.cover} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-medium text-cream-soft transition-transform hover:-translate-y-0.5"
        >
          <Play className="h-4 w-4" strokeWidth={2} fill="currentColor" />
          Watch recap
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40"
        >
          <Download className="h-4 w-4" strokeWidth={1.75} />
          Download PDF
        </button>
      </div>
    </header>
  );
}
