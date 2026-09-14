import { CalendarOff } from "lucide-react";
import EditionCard from "./EditionCard";
import { latestEdition } from "../data/editions";

// Newest first. The newest edition takes a full-width featured card (cover
// beside the text on large screens); the rest sit in an even three-up grid.
//
// The previous version spanned cards across a 6-column grid with
// `auto-rows-fr`, which forced every row to the height of the tallest —
// a full-width cover at 4:3 — giving every card the same ~1000px height and
// several hundred pixels of dead space. Content-sized rows fix that.
export default function EditionGrid({ editions, year }) {
  if (editions.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-5 pb-8 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-line bg-cream-soft/60 px-6 py-16 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-ink-soft">
            <CalendarOff className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <p className="mt-4 text-lg font-medium">Nothing published for {year} yet.</p>
          <p className="mt-1.5 max-w-sm text-sm text-ink-soft">
            Recaps go up once a month has wrapped. Pick another year above to read
            back through the archive.
          </p>
        </div>
      </div>
    );
  }

  const [newest, ...rest] = [...editions].reverse();
  const withFlag = (e) => ({ ...e, isLatest: e.key === latestEdition.key });

  return (
    <section aria-label={`${year} editions`} className="mx-auto max-w-6xl px-5 pb-4 sm:px-8 lg:px-10">
      <EditionCard edition={withFlag(newest)} featured id={newest.slug} />

      {rest.length > 0 && (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((edition) => (
            <EditionCard key={edition.key} edition={withFlag(edition)} id={edition.slug} />
          ))}
        </div>
      )}
    </section>
  );
}
