import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MONTH_ORDER, monthShort, monthLabel, cx } from "../lib/utils";
import { getEdition, neighbours } from "../data/editions";

// Two months either side by calendar position, not by what's published, so an
// unpublished month shows as unpublished instead of vanishing from the strip.
// The flanking links are the real prev/next editions, which the strip alone
// can't offer when the neighbouring month isn't out.
function stripFor(edition) {
  const monthIdx = MONTH_ORDER.indexOf(edition.slug);
  return [-2, -1, 0, 1, 2].map((offset) => {
    const idx = monthIdx + offset;
    let year = edition.year;
    let realIdx = idx;
    if (idx < 0) { realIdx = idx + 12; year -= 1; }
    if (idx > 11) { realIdx = idx - 12; year += 1; }
    const slug = MONTH_ORDER[realIdx];
    return { slug, year, match: getEdition(year, slug), isCurrent: offset === 0 };
  });
}

function EditionLink({ edition, direction }) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ChevronLeft : ChevronRight;

  if (!edition) {
    return <span className="hidden w-32 sm:block" aria-hidden="true" />;
  }

  return (
    <Link
      to={`/${edition.year}/${edition.slug}`}
      rel={isPrev ? "prev" : "next"}
      className={cx(
        "group inline-flex min-w-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper hover:text-ink sm:w-32",
        isPrev ? "sm:justify-start" : "sm:ml-auto sm:justify-end"
      )}
    >
      {isPrev && <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />}
      <span className="truncate">
        <span className="hidden text-ink/40 lg:inline">{isPrev ? "Previous" : "Next"} · </span>
        {monthLabel(edition.slug)}
      </span>
      {!isPrev && <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />}
    </Link>
  );
}

export default function MonthNavigation({ edition }) {
  const { prev, next } = neighbours(edition);
  const strip = stripFor(edition);

  return (
    <nav
      aria-label="Browse other editions"
      className="mt-12 border-y border-line/80 bg-cream-soft"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-5 py-3 sm:px-8 lg:px-10">
        <EditionLink edition={prev} direction="prev" />

        <ul className="scroll-quiet mx-auto flex items-center gap-1 overflow-x-auto">
          {strip.map(({ slug, year, match, isCurrent }) => {
            const pill = (
              <span
                className={cx(
                  "block rounded-full px-3.5 py-2 text-sm font-semibold transition-colors sm:px-4",
                  isCurrent
                    ? "bg-green text-cream-soft"
                    : match
                    ? "text-ink-soft hover:bg-paper hover:text-ink"
                    : "text-ink/25"
                )}
              >
                {monthShort(slug)}
              </span>
            );

            return (
              <li key={`${year}-${slug}`} className="shrink-0">
                {match && !isCurrent ? (
                  <Link to={`/${year}/${slug}`} aria-label={`${monthLabel(slug)} ${year} recap`}>
                    {pill}
                  </Link>
                ) : (
                  <span
                    aria-current={isCurrent ? "page" : undefined}
                    title={match ? undefined : `${monthLabel(slug)} ${year} — not published yet`}
                  >
                    {pill}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <EditionLink edition={next} direction="next" />
      </div>
    </nav>
  );
}
