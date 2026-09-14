import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Photo from "./Photo";
import { cx } from "../lib/utils";

// Two layouts, one card. `featured` lays the cover beside the text on large
// screens; everything else is a normal vertical card. Both size themselves
// from their content — no fixed heights — and stretch to fill their grid
// row, so a row of cards lines up without any one of them ballooning.
export default function EditionCard({ edition, featured = false, id }) {
  const { year, slug, month, editionNumber, tagline, cover, cardStats, isLatest } = edition;

  return (
    <Link
      id={id}
      to={`/${year}/${slug}`}
      aria-label={`${month} ${year} recap — edition ${editionNumber}`}
      className={cx(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-cream-soft",
        "shadow-(--shadow-card) transition-[box-shadow,transform,border-color] duration-300",
        "hover:-translate-y-1 hover:shadow-(--shadow-card-hover)",
        isLatest ? "border-green/70" : "border-line hover:border-green/40",
        featured && "lg:flex-row"
      )}
    >
      <div
        className={cx(
          "relative shrink-0 overflow-hidden",
          featured
            ? "aspect-[16/10] sm:aspect-[2/1] lg:aspect-auto lg:w-[54%]"
            : "aspect-[4/3]"
        )}
      >
        <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          <Photo item={cover} />
        </div>

        {isLatest && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-near-black/85 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-cream-soft backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-bright" />
            Latest
          </span>
        )}
      </div>

      <div className={cx("flex flex-1 flex-col p-5 sm:p-6", featured && "lg:min-h-[21rem] lg:p-9")}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Edition {String(editionNumber).padStart(2, "0")}
            </p>
            <h3
              className={cx(
                "mt-1.5 font-semibold leading-none tracking-tight",
                featured ? "text-4xl sm:text-5xl" : "text-3xl"
              )}
            >
              {month}
              <span className="ml-2 align-baseline text-base font-medium text-ink-soft">{year}</span>
            </h3>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 text-ink-soft transition-colors duration-300 group-hover:border-green group-hover:bg-green group-hover:text-cream-soft">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </div>

        <p
          className={cx(
            "mt-3 font-hand leading-snug text-green-deep",
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          )}
        >
          {tagline}
        </p>

        <div className="h-6" aria-hidden="true" />

        <dl className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 text-sm">
          {cardStats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-semibold tabular-nums">{s.value}</dd>
              <span className="text-ink-soft">{s.label}</span>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
}
