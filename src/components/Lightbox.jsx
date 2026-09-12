import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Photo from "./Photo";

export default function Lightbox({ items, index, onClose, onNavigate }) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4 sm:p-10"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-cream-soft/10 text-cream-soft transition-colors hover:bg-cream-soft/20"
        aria-label="Close"
      >
        <X className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + items.length) % items.length); }}
        className="absolute left-3 grid h-10 w-10 place-items-center rounded-full bg-cream-soft/10 text-cream-soft transition-colors hover:bg-cream-soft/20 sm:left-6"
        aria-label="Previous photo"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <div
        className="aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Photo item={item} />
      </div>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % items.length); }}
        className="absolute right-3 grid h-10 w-10 place-items-center rounded-full bg-cream-soft/10 text-cream-soft transition-colors hover:bg-cream-soft/20 sm:right-6"
        aria-label="Next photo"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
      </button>
    </div>
  );
}
