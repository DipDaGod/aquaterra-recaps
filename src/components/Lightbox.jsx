import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Photo from "./Photo";

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);

  // Lock the page behind the overlay, move focus into it, and hand focus back
  // to whatever opened it on close — none of which the previous version did,
  // so the page scrolled underneath and keyboard users were left adrift.
  useEffect(() => {
    returnFocusRef.current = document.activeElement;
    document.body.setAttribute("data-scroll-locked", "");
    closeRef.current?.focus();

    return () => {
      document.body.removeAttribute("data-scroll-locked");
      returnFocusRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + items.length) % items.length);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onNavigate]);

  const item = items[index];
  if (!item) return null;

  const control =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream-soft/10 text-cream-soft backdrop-blur-sm transition-colors hover:bg-cream-soft/25";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-near-black/95 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${items.length}`}
      onClick={onClose}
    >
      <div className="flex shrink-0 items-center justify-between gap-4">
        <span className="rounded-full bg-cream-soft/10 px-3.5 py-1.5 text-xs font-semibold tabular-nums text-cream-soft/80">
          {index + 1} / {items.length}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} className={control} aria-label="Close photo viewer">
          <X className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 py-4 sm:gap-5">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + items.length) % items.length); }}
          className={control}
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </button>

        <figure
          className="flex min-h-0 w-full max-w-3xl flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="aspect-[4/3] max-h-full w-full overflow-hidden rounded-2xl">
            <Photo item={item} />
          </div>
          {item.label && (
            <figcaption className="mt-4 text-center text-sm text-cream-soft/70">
              {item.label}
            </figcaption>
          )}
        </figure>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % items.length); }}
          className={control}
          aria-label="Next photo"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
