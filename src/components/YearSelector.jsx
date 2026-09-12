import { ChevronLeft, ChevronRight } from "lucide-react";
import { AVAILABLE_YEARS, editionsForYear } from "../data/editions";
import { cx } from "../lib/utils";

export default function YearSelector({ year, onChange }) {
  const idx = AVAILABLE_YEARS.indexOf(year);
  const prevYear = AVAILABLE_YEARS[idx - 1];
  const nextYear = AVAILABLE_YEARS[idx + 1];

  return (
    <nav aria-label="Select year" className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-6 py-6 sm:px-10">
      <button
        type="button"
        disabled={!prevYear}
        onClick={() => prevYear && onChange(prevYear)}
        className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink-soft transition-colors hover:border-ink/40 hover:text-ink disabled:opacity-30"
        aria-label="Previous year"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
      </button>

      <ul className="flex items-center gap-3 sm:gap-5">
        {AVAILABLE_YEARS.map((y) => {
          const count = editionsForYear(y).length;
          const selected = y === year;
          const disabled = count === 0;
          return (
            <li key={y}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(y)}
                className={cx(
                  "rounded-full px-4 py-2 text-lg font-medium transition-colors sm:text-xl",
                  selected
                    ? "bg-green text-cream-soft"
                    : disabled
                    ? "text-ink/25"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {y}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        disabled={!nextYear}
        onClick={() => nextYear && onChange(nextYear)}
        className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 text-ink-soft transition-colors hover:border-ink/40 hover:text-ink disabled:opacity-30"
        aria-label="Next year"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </nav>
  );
}
