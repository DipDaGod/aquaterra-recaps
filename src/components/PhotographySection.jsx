import { useMemo, useState } from "react";
import { Expand, Camera } from "lucide-react";
import Photo from "./Photo";
import Lightbox from "./Lightbox";
import Section from "./Section";
import ShowMore from "./ShowMore";
import { Meta } from "./Lockup";
import { cx, isPlaceholder } from "../lib/utils";

// Column balancing splits on total height, so asking for more columns than
// there are photos leaves a visibly empty track.
function columnsFor(count) {
  if (count <= 2) return "columns-1 sm:columns-2";
  if (count <= 6) return "columns-2 sm:columns-3";
  return "columns-2 sm:columns-3 lg:columns-4";
}

const ratio = { lg: "aspect-[4/5]", md: "aspect-square", sm: "aspect-[4/3]" };

export default function PhotographySection({ edition, index, label, accentKey, variant, ground, size }) {
  const [openIndex, setOpenIndex] = useState(null);
  const p = edition.photography;
  // Memoised: a fresh `[]` each render would re-derive `viewable` and re-key
  // the lightbox every time.
  const gallery = useMemo(() => p?.gallery ?? [], [p]);

  // The frame of the month leads the viewer rather than sitting outside it.
  const viewable = useMemo(() => {
    const lead = p?.featured
      ? [{ ...p.featured, label: p.featuredCaption || p.featured.label, chapter: "Frame of the month" }]
      : [];
    return [...lead, ...gallery.map((g) => ({ ...g, chapter: "The wall" }))];
  }, [p, gallery]);

  if (!p?.featured && gallery.length === 0) return null;

  const offset = p?.featured ? 1 : 0;

  return (
    <Section
      id="photography"
      index={index}
      label={label}
      accentKey={accentKey}
      variant={variant}
      ground={ground}
      size={size}
      caps={p.lockup?.caps}
      accent={p.lockup?.accent}
      lead={p.lead}
      aside={viewable.length ? `${viewable.length} frames` : undefined}
    >
      {p.featured && (
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          aria-label="Open the frame of the month"
          className="group mb-4 block w-full overflow-hidden rounded-[2rem] bg-ink text-left"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[2/1]">
            <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]">
              <Photo item={p.featured} />
            </div>

            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgb(10 10 10 / 0.72) 0%, rgb(10 10 10 / 0.1) 42%, rgb(10 10 10 / 0.35) 100%)" }}
            />

            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-cream-soft px-3 py-1.5 text-ink sm:left-7 sm:top-7">
              <Meta>Frame of the month</Meta>
            </span>

            <span className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-cream-soft/15 text-cream-soft backdrop-blur-sm transition-colors group-hover:bg-cream-soft group-hover:text-ink sm:right-7 sm:top-7">
              <Expand className="h-4 w-4" strokeWidth={2} />
            </span>

            <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 p-5 sm:p-7">
              <span className={cx("max-w-xl text-pretty text-cream-soft", isPlaceholder(p.featuredCaption) && "opacity-70")}>
                {p.featuredCaption}
              </span>
              <Meta className="inline-flex items-center gap-1.5 text-cream-soft/70">
                <Camera className="h-3.5 w-3.5" strokeWidth={2} />
                {p.featured.credit || "[Credit]"}
              </Meta>
            </span>
          </div>
        </button>
      )}

      {gallery.length > 0 && (
        <ShowMore
          after={4}
          total={gallery.length}
          noun="frames"
          className={cx("gap-3", columnsFor(gallery.length))}
        >
          {gallery.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i + offset)}
              aria-label={`Open frame ${i + 1 + offset} of ${viewable.length}${item.credit ? `, shot by ${item.credit}` : ""}`}
              className={cx(
                "group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl",
                ratio[item.size] || ratio.md
              )}
            >
              <div className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]">
                <Photo item={item} />
              </div>

              <span
                className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{ background: "linear-gradient(to top, rgb(10 10 10 / 0.88) 0%, rgb(10 10 10 / 0.15) 55%, rgb(10 10 10 / 0.3) 100%)" }}
              >
                <span className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full bg-cream-soft/20 text-cream-soft backdrop-blur-sm">
                  <Expand className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                {item.label && (
                  <span className="line-clamp-2 text-left text-[0.8rem] leading-snug text-cream-soft">
                    {item.label}
                  </span>
                )}
                {item.credit && (
                  <Meta className="mt-1 text-left text-cream-soft/60">{item.credit}</Meta>
                )}
              </span>

              <span
                aria-hidden="true"
                className="absolute left-2.5 top-2.5 font-mono text-[0.65rem] tabular-nums text-cream-soft/70 mix-blend-difference"
              >
                {String(i + 1 + offset).padStart(2, "0")}
              </span>
            </button>
          ))}
        </ShowMore>
      )}

      {openIndex !== null && (
        <Lightbox
          items={viewable}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </Section>
  );
}
