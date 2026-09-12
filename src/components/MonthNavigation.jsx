import { Link } from "react-router-dom";
import { MONTH_ORDER, monthShort, cx } from "../lib/utils";
import { getEdition } from "../data/editions";

// Shows two months before and two after the current edition (by calendar
// position, not just by what's published), so upcoming months appear as
// a "coming soon" state rather than disappearing from the strip.
export default function MonthNavigation({ edition }) {
  const monthIdx = MONTH_ORDER.indexOf(edition.slug);
  const strip = [-2, -1, 0, 1, 2].map((offset) => {
    const idx = monthIdx + offset;
    let year = edition.year;
    let realIdx = idx;
    if (idx < 0) { realIdx = idx + 12; year -= 1; }
    if (idx > 11) { realIdx = idx - 12; year += 1; }
    const slug = MONTH_ORDER[realIdx];
    const match = getEdition(year, slug);
    return { slug, year, match, isCurrent: offset === 0 };
  });

  return (
    <nav aria-label="Browse other months" className="border-y border-line/80 bg-cream-soft">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 overflow-x-auto px-6 py-4 sm:px-10">
        {strip.map(({ slug, year, match, isCurrent }) => {
          const label = monthShort(slug);
          const content = (
            <span
              className={cx(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isCurrent
                  ? "bg-green text-cream-soft"
                  : match
                  ? "text-ink-soft hover:bg-paper hover:text-ink"
                  : "text-ink/25"
              )}
            >
              {label}
            </span>
          );

          if (match && !isCurrent) {
            return (
              <Link key={`${year}-${slug}`} to={`/${year}/${slug}`}>
                {content}
              </Link>
            );
          }
          return (
            <span key={`${year}-${slug}`} title={!match ? "Coming soon" : undefined}>
              {content}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
