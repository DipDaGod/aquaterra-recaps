import { CalendarOff, Clock } from "lucide-react";
import EditionCard from "./EditionCard";
import RhythmCard from "./RhythmCard";
import { Meta } from "./Lockup";
import { latestEdition, isUpcoming, COMING_YEARS } from "../data/editions";
import { cx } from "../lib/utils";

// Newest first: the newest published edition takes a full-width featured card,
// everything else sits in a grid whose track count follows the data — a fixed
// three-up left a single card stranded beside two empty cells.
//
// Rows are content-sized on purpose. `auto-rows-fr` forced every card to the
// height of the tallest, which was a full-width 4:3 cover, and gave the whole
// grid ~1000px rows of mostly dead space.
// Counting the rhythm cell, which is always the last one in the grid.
const COLUMNS = {
  2: "sm:grid-cols-2",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

function Empty({ year }) {
  const coming = COMING_YEARS.includes(Number(year));
  const Icon = coming ? Clock : CalendarOff;

  return (
    <div className="mx-auto max-w-6xl px-5 pb-8 sm:px-8 lg:px-10">
      <div className="flex flex-col items-center rounded-3xl border border-dashed border-line bg-cream-soft/60 px-6 py-16 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-ink-soft">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </span>
        {coming ? (
          <>
            <p className="mt-4 text-lg font-medium">{year} hasn&apos;t happened yet.</p>
            <p className="mt-1.5 max-w-sm text-sm text-ink-soft">
              an issue goes up when its month wraps, so the year fills in one
              month at a time. start with {year - 1}.
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 text-lg font-medium">nothing published for {year} yet.</p>
            <p className="mt-1.5 max-w-sm text-sm text-ink-soft">
              an issue goes up when its month wraps. pick another year above to
              read back through the archive.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function EditionGrid({ editions, year }) {
  if (editions.length === 0) return <Empty year={year} />;

  // The newest edition in the file isn't necessarily the newest one out: an
  // issue sits here as upcoming while the month it recaps is still running.
  const newestFirst = [...editions].reverse();
  const out = newestFirst.filter((e) => !isUpcoming(e));
  const [featured] = out.length > 0 ? out : newestFirst;
  const others = newestFirst.filter((e) => e.key !== featured.key);
  const cells = others.length + 1;

  return (
    <section aria-label={`${year} editions`} className="mx-auto max-w-6xl px-5 pb-4 sm:px-8 lg:px-10">
      <EditionCard
        edition={{ ...featured, isLatest: featured.key === latestEdition.key }}
        featured
        id={featured.slug}
      />

      {others.length > 0 && (
        <>
          <div className="mt-10 flex items-center gap-3">
            <Meta className="text-ink-3">Also in {year}</Meta>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
            <Meta className="text-ink-3/70">
              {others.length} {others.length === 1 ? "issue" : "issues"}
            </Meta>
          </div>

          <div
            className={cx(
              "mt-5 grid grid-cols-1 gap-6",
              COLUMNS[cells] || "sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {others.map((edition) => (
              <EditionCard
                key={edition.key}
                edition={{ ...edition, isLatest: edition.key === latestEdition.key }}
                id={edition.slug}
              />
            ))}
            <RhythmCard />
          </div>
        </>
      )}
    </section>
  );
}
