import { useState } from "react";
import { Expand, Camera } from "lucide-react";
import Photo from "./Photo";
import Lightbox from "./Lightbox";
import Section from "./Section";
import { Meta } from "./Lockup";
import { cx } from "../lib/utils";

// Photography as its own strand rather than an unattributed photo dump: a
// credited photo of the month on a dark panel, then the rest of the month's
// frames as a masonry wall. Every frame carries its shooter's credit.
//
// Column balancing splits on total height, so asking for more columns than
// there are photos leaves a visibly empty track. Cap the count by the data.
function columnsFor(count) {
  if (count <= 2) return "columns-1 sm:columns-2";
  if (count <= 6) return "columns-2 sm:columns-3";
  return "columns-2 sm:columns-3 lg:columns-4";
}

const ratio = { lg: "aspect-[4/5]", md: "aspect-square", sm: "aspect-[4/3]" };

export default function PhotographySection({ edition, index, label, accentKey, variant, ground, size }) {
  const [openIndex, setOpenIndex] = useState(null);
  const p = edition.photography;
  const gallery = p?.gallery || [];

  if (!p?.featured && gallery.length === 0) return null;

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
      aside={gallery.length ? `${gallery.length} frames` : undefined}
    >

      {p.featured && (
        <figure className="mb-6 overflow-hidden rounded-[2rem] bg-ink">
          <div className="aspect-[16/10] w-full sm:aspect-[2/1]">
            <Photo item={p.featured} />
          </div>
          <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-6 py-5 sm:px-8">
            <p className="max-w-xl text-pretty text-cream-soft">{p.featuredCaption}</p>
            <Meta className="text-cream-soft/60">
              <Camera className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]" strokeWidth={2} />
              {p.featured.credit || "[Credit]"}
            </Meta>
          </figcaption>
        </figure>
      )}

      {gallery.length > 0 && (
        <div className={cx("gap-3", columnsFor(gallery.length))}>
          {gallery.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open frame ${i + 1} of ${gallery.length}${item.credit ? `, shot by ${item.credit}` : ""}`}
              className={cx(
                "group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl",
                ratio[item.size] || ratio.md
              )}
            >
              <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]">
                <Photo item={item} />
              </div>
              <span className="absolute inset-0 flex flex-col justify-between bg-ink/0 p-3 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-ink/45 group-hover:opacity-100 group-focus-visible:bg-ink/45 group-focus-visible:opacity-100">
                <Expand className="ml-auto h-4 w-4 text-cream-soft" strokeWidth={2} />
                {item.credit && (
                  <Meta className="text-left text-cream-soft/90">{item.credit}</Meta>
                )}
              </span>
            </button>
          ))}
        </div>
      )}

      {openIndex !== null && (
        <Lightbox
          items={gallery}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </Section>
  );
}
