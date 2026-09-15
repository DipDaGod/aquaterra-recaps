import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Camera } from "lucide-react";
import Photo from "./Photo";
import { Meta } from "./Lockup";
import { cx, isPlaceholder } from "../lib/utils";

// Placeholder tiles have no intrinsic size, so the viewer needs a shape to
// give them. Real photographs size themselves and ignore this.
const PLACEHOLDER_ASPECT = { lg: "4 / 5", md: "1 / 1", sm: "4 / 3" };

function Frame({ item, fill }) {
  // A real file sizes itself: object-contain inside the available box shows the
  // whole frame at the largest size that fits, whatever its shape. The previous
  // viewer forced every photo into a 4:3 window capped at max-w-3xl, so
  // portraits were letterboxed and nothing ever got properly big.
  if (item.src) {
    return (
      <img
        src={item.src}
        alt={item.alt || item.label || ""}
        className={cx("max-h-full max-w-full rounded-xl", fill ? "h-full w-full object-cover" : "object-contain")}
      />
    );
  }
  return (
    <div
      className="max-h-full overflow-hidden rounded-xl"
      style={{ aspectRatio: PLACEHOLDER_ASPECT[item.size] || "4 / 3", height: "100%" }}
    >
      <Photo item={item} />
    </div>
  );
}

export default function Lightbox({ items, index, onClose, onNavigate }) {
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const swipe = useRef(null);
  const [fill, setFill] = useState(false);

  const go = useCallback(
    (next) => onNavigate((next + items.length) % items.length),
    [items.length, onNavigate]
  );

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
      else if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
      else if (e.key === "Home") go(0);
      else if (e.key === "End") go(items.length - 1);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, items.length, go, onClose]);

  // Fetch the neighbours so stepping through real photography doesn't flash.
  useEffect(() => {
    for (const n of [index + 1, index - 1]) {
      const src = items[(n + items.length) % items.length]?.src;
      if (src) { const img = new Image(); img.src = src; }
    }
  }, [index, items]);

  const item = items[index];
  if (!item) return null;

  const control =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cream-soft/10 text-cream-soft backdrop-blur-sm transition-colors hover:bg-cream-soft/25";

  function onPointerDown(e) { swipe.current = { x: e.clientX, y: e.clientY }; }
  function onPointerUp(e) {
    if (!swipe.current) return;
    const dx = e.clientX - swipe.current.x;
    const dy = e.clientY - swipe.current.y;
    swipe.current = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1));
  }

  // Rendered into <body>: a finished reveal animation leaves an identity
  // transform on its section, and any transform on an ancestor makes that
  // ancestor the containing block for position:fixed — which pinned this
  // overlay inside the section instead of over the viewport.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex flex-col backdrop-blur-sm"
      style={{ backgroundColor: "rgb(10 10 10 / 0.97)" }}
      role="dialog"
      aria-modal="true"
      aria-label={`Frame ${index + 1} of ${items.length}`}
    >
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="rounded-full bg-cream-soft/10 px-3.5 py-1.5 font-mono text-xs tabular-nums text-cream-soft/80">
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          {item.chapter && <Meta className="truncate text-cream-soft/45">{item.chapter}</Meta>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setFill((f) => !f)}
            className={control}
            aria-pressed={fill}
            aria-label={fill ? "Fit frame to screen" : "Fill screen with frame"}
          >
            {fill ? <Minimize2 className="h-5 w-5" strokeWidth={2} /> : <Maximize2 className="h-5 w-5" strokeWidth={2} />}
          </button>
          <button ref={closeRef} type="button" onClick={onClose} className={control} aria-label="Close photo viewer">
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* The frame, given everything that's left */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <button
          type="button"
          onClick={() => go(index - 1)}
          className={cx(control, "absolute left-2 z-10 hidden sm:grid")}
          aria-label="Previous frame"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </button>

        <div key={index} className="story-enter-next flex h-full w-full items-center justify-center">
          <Frame item={item} fill={fill} />
        </div>

        <button
          type="button"
          onClick={() => go(index + 1)}
          className={cx(control, "absolute right-2 z-10 hidden sm:grid")}
          aria-label="Next frame"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      {/* Caption + credit */}
      <div className="shrink-0 px-5 pb-2 pt-4 text-center sm:px-8">
        {item.label && (
          <p className={cx("mx-auto max-w-2xl text-pretty text-cream-soft", isPlaceholder(item.label) && "opacity-60")}>
            {item.label}
          </p>
        )}
        <Meta className={cx("mt-2 inline-flex items-center gap-1.5 text-cream-soft/50", isPlaceholder(item.credit) && "opacity-70")}>
          <Camera className="h-3.5 w-3.5" strokeWidth={2} />
          Shot by {item.credit || "[Credit]"}
        </Meta>
      </div>

      {/* Filmstrip — where you are in the set, and a way to jump */}
      {items.length > 1 && (
        <div className="scroll-quiet shrink-0 overflow-x-auto px-4 pb-4 pt-2 sm:px-6">
          <ul className="mx-auto flex w-max gap-2">
            {items.map((thumb, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => onNavigate(i)}
                  aria-label={`Frame ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={cx(
                    "block h-12 w-12 overflow-hidden rounded-lg transition-[opacity,outline-color] sm:h-14 sm:w-14",
                    i === index
                      ? "opacity-100 outline outline-2 outline-offset-2 outline-cream-soft"
                      : "opacity-45 outline outline-2 outline-offset-2 outline-transparent hover:opacity-80"
                  )}
                >
                  <Photo item={{ ...thumb, label: null }} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>,
    document.body
  );
}
