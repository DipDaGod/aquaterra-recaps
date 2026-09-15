import { ChevronLeft, ChevronRight } from "lucide-react";
import { AVAILABLE_YEARS, COMING_YEARS, editionsForYear } from "../data/editions";
import { cx } from "../lib/utils";

// A segmented control. Years with editions carry their count; the year after
// the last one is offered as coming soon, and selecting it explains itself
// rather than being a dead, greyed-out pill.
const YEARS = [...AVAILABLE_YEARS, ...COMING_YEARS];

export default function YearSelector({ year, onChange }) {
  const selectable = AVAILABLE_YEARS.filter((y) => editionsForYear(y).length > 0);
  const idx = selectable.indexOf(year);
  const prevYear = selectable[idx - 1];
  const nextYear = selectable[idx + 1];

  const arrow =
    "hidden h-10 w-10 shrink-0 place-items-center rounded-full border sm:grid border-ink/15 text-ink-soft transition-colors hover:border-ink/40 hover:bg-cream-soft hover:text-ink disabled:pointer-events-none disabled:opacity-25";

  return (
    <nav
      aria-label="Browse editions by year"
      className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-5 py-8 sm:gap-4 sm:px-8 sm:py-10 lg:px-10"
    >
      <button
        type="button"
        disabled={!prevYear}
        onClick={() => prevYear && onChange(prevYear)}
        className={arrow}
        aria-label={prevYear ? `Go to ${prevYear}` : "No earlier year"}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
      </button>

      <ul className="scroll-quiet flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-line bg-cream-soft p-1.5">
        {YEARS.map((y) => {
          const count = editionsForYear(y).length;
          const selected = y === year;
          const soon = count === 0;
          return (
            <li key={y}>
              <button
                type="button"
                onClick={() => onChange(y)}
                aria-current={selected ? "true" : undefined}
                className={cx(
                  "flex shrink-0 items-baseline gap-2 rounded-full px-4 py-2 text-base font-semibold transition-colors sm:px-5 sm:text-lg",
                  selected
                    ? "bg-green text-cream-soft"
                    : soon
                    ? "text-ink/40 hover:bg-paper hover:text-ink-soft"
                    : "text-ink-soft hover:bg-paper hover:text-ink"
                )}
              >
                {y}
                <span
                  className={cx(
                    "text-xs font-medium tabular-nums",
                    selected ? "text-cream-soft/70" : "text-ink/35"
                  )}
                >
                  {soon ? "soon" : count}
                </span>
                <span className="sr-only">
                  {soon ? "coming soon" : count === 1 ? "1 edition" : `${count} editions`}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        disabled={!nextYear}
        onClick={() => nextYear && onChange(nextYear)}
        className={arrow}
        aria-label={nextYear ? `Go to ${nextYear}` : "No later year"}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </button>
    </nav>
  );
}
