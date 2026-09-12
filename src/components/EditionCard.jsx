import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Photo from "./Photo";
import { cx } from "../lib/utils";

export default function EditionCard({ edition, featured = false, id }) {
  const { year, slug, month, editionNumber, tagline, cover, cardStats } = edition;

  return (
    <Link
      id={id}
      to={`/${year}/${slug}`}
      className={cx(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-cream-soft transition-shadow",
        edition.isLatest ? "border-green shadow-[0_0_0_3px_var(--color-pastel-green)]" : "border-line",
        "hover:shadow-lg"
      )}
    >
      <div className={cx("overflow-hidden", featured ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
          <Photo item={cover} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-soft">
              Edition {String(editionNumber).padStart(2, "0")}
            </p>
            <h3 className={cx("mt-1 font-semibold leading-none tracking-tight", featured ? "text-4xl" : "text-3xl")}>
              {month}
            </h3>
            <p className="text-sm text-ink-soft">{year}</p>
          </div>
          <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 transition-colors group-hover:border-green group-hover:bg-green group-hover:text-cream-soft">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </div>

        <p className="font-hand text-xl text-green-deep">{tagline}</p>

        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-4 text-sm">
          {cardStats.map((s) => (
            <div key={s.label}>
              <span className="font-semibold">{s.value}</span>{" "}
              <span className="text-ink-soft">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
