import { useState } from "react";
import { Expand } from "lucide-react";
import Photo from "./Photo";
import Lightbox from "./Lightbox";
import Section, { SectionHeading } from "./Section";
import { cx } from "../lib/utils";

// A masonry wall rather than a span-based grid. Spans can't tile an arbitrary
// number of photos without leaving holes — August's eight moments left two
// empty cells in the last row — whereas column flow always closes up, and the
// varied tile heights read as a photo wall rather than a spreadsheet.
const ratio = {
  lg: "aspect-[4/5]",
  md: "aspect-square",
  sm: "aspect-[4/3]",
};

// Column balancing splits on total height, so asking for more columns than
// there are photos to fill them leaves a visibly empty track at the end — a
// five-photo month sat in three of four columns. Cap the count by the data.
function columnsFor(count) {
  if (count <= 2) return "columns-1 sm:columns-2";
  if (count <= 6) return "columns-2 sm:columns-3";
  return "columns-2 sm:columns-3 lg:columns-4";
}

export default function MomentsGallery({ edition }) {
  const [openIndex, setOpenIndex] = useState(null);
  const moments = edition.moments || [];

  if (moments.length === 0) return null;

  return (
    <Section>
      <SectionHeading
        title={`Moments from ${edition.month}`}
        lead="Field work, events, and the candid in-between."
        aside={`${moments.length} ${moments.length === 1 ? "photo" : "photos"}`}
      />

      <div className={cx("gap-3", columnsFor(moments.length))}>
        {moments.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Open photo ${i + 1} of ${moments.length}${item.label ? `: ${item.label}` : ""}`}
            className={cx(
              "group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl",
              ratio[item.size] || ratio.md
            )}
          >
            <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.05]">
              <Photo item={item} />
            </div>
            <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-ink/35 group-hover:opacity-100 group-focus-visible:bg-ink/35 group-focus-visible:opacity-100">
              <Expand className="h-5 w-5 text-cream-soft" strokeWidth={2} />
            </span>
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          items={moments}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </Section>
  );
}
