import { useState } from "react";
import Photo from "./Photo";
import Lightbox from "./Lightbox";

const sizeSpan = {
  lg: "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto",
  md: "aspect-[4/3]",
  sm: "aspect-[4/3]",
};

export default function MomentsGallery({ edition }) {
  const [openIndex, setOpenIndex] = useState(null);
  const moments = edition.moments;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Moments from {edition.month}
      </h2>
      <p className="mt-2 max-w-md text-ink-soft">Field work, events, and the candid in-between.</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:auto-rows-[180px]">
        {moments.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`group overflow-hidden rounded-2xl ${sizeSpan[item.size] || sizeSpan.md}`}
          >
            <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.05]">
              <Photo item={item} />
            </div>
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
    </section>
  );
}
