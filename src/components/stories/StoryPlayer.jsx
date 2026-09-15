import { useCallback, useEffect, useRef, useState } from "react";
import { X, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import StorySlide from "./StorySlide";
import { SECTION_ACCENTS, cx } from "../../lib/utils";

// An Instagram-style stories player over the edition's own content.
//
// Timing runs on requestAnimationFrame rather than a CSS animation, because
// the site's global prefers-reduced-motion rule clamps every animation to
// 0.001ms — a CSS-driven progress bar would finish instantly there and blast
// through all 21 slides. rAF also makes hold-to-pause exact: the elapsed time
// is a number we own, not a state we have to read back out of the compositor.
export default function StoryPlayer({ slides, startAt = 0, onClose }) {
  const [index, setIndex] = useState(startAt);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  // Which way the last move went, so a slide enters from the side it came from.
  const [dir, setDir] = useState(1);

  const closeRef = useRef(null);
  const returnFocus = useRef(null);
  const elapsed = useRef(0);
  const last = useRef(0);
  const frame = useRef(0);
  const held = useRef(0);

  const slide = slides[index];
  const total = slides.length;

  const go = useCallback((next) => {
    if (next < 0) { setIndex(0); elapsed.current = 0; setProgress(0); return; }
    if (next >= total) { onClose(); return; }
    setDir((d) => (next > index ? 1 : next < index ? -1 : d));
    setIndex(next);
    elapsed.current = 0;
    setProgress(0);
  }, [total, onClose, index]);

  // Advance on its own clock.
  useEffect(() => {
    if (!slide) return;
    last.current = performance.now();
    const tick = (now) => {
      const dt = now - last.current;
      last.current = now;
      if (!paused) {
        elapsed.current += dt;
        const pct = Math.min(1, elapsed.current / slide.ms);
        setProgress(pct);
        if (pct >= 1) { go(index + 1); return; }
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [index, paused, slide, go]);

  // Lock the page, take focus, hand it back on close.
  useEffect(() => {
    returnFocus.current = document.activeElement;
    document.body.setAttribute("data-scroll-locked", "");
    closeRef.current?.focus();
    return () => {
      document.body.removeAttribute("data-scroll-locked");
      returnFocus.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
      else if (e.key === " " || e.key === "Spacebar") { e.preventDefault(); setPaused((p) => !p); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, go, onClose]);

  if (!slide) return null;

  const accentRaw = (SECTION_ACCENTS[slide.accent] || SECTION_ACCENTS.green).raw;

  // Press and hold pauses, as it does on Instagram; a quick press is a tap, and
  // which half it lands in decides direction.
  function onPointerDown() { held.current = performance.now(); setPaused(true); }
  function onPointerUp(e) {
    const quick = performance.now() - held.current < 250;
    setPaused(false);
    if (!quick) return;
    const box = e.currentTarget.getBoundingClientRect();
    go(e.clientX - box.left < box.width * 0.33 ? index - 1 : index + 1);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-near-black/95 p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${slide.chapter} story, ${index + 1} of ${total}`}
    >
      <div
        className="relative flex h-full w-full max-w-[26rem] flex-col overflow-hidden bg-ink transition-shadow duration-700 sm:h-[min(90vh,46rem)] sm:rounded-[2rem]"
        style={{ boxShadow: `0 0 90px -20px ${accentRaw}` }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28"
          style={{ background: "linear-gradient(to bottom, rgb(10 10 10 / 0.75) 0%, transparent 100%)" }}
        />

        {/* Segmented progress */}
        <div className="absolute inset-x-0 top-0 z-20 flex gap-1 p-3">
          {slides.map((s, i) => (
            <span key={s.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-cream-soft/25">
              <span
                className={cx("block h-full rounded-full bg-cream-soft", i === index && "story-active-bar")}
                style={{ width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%" }}
              />
            </span>
          ))}
        </div>

        <div className="absolute right-2 top-6 z-20 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume" : "Pause"}
            className="grid h-9 w-9 place-items-center rounded-full text-cream-soft/80 transition-colors hover:bg-cream-soft/15 hover:text-cream-soft"
          >
            {paused ? <Play className="h-4 w-4" strokeWidth={2} fill="currentColor" /> : <Pause className="h-4 w-4" strokeWidth={2} fill="currentColor" />}
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close stories"
            className="grid h-9 w-9 place-items-center rounded-full text-cream-soft/80 transition-colors hover:bg-cream-soft/15 hover:text-cream-soft"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        {/* The slide. Keyed so each one re-runs its entrance. */}
        <div
          className="relative min-h-0 flex-1 cursor-pointer select-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={() => setPaused(false)}
        >
          <div
            key={slide.id}
            className={cx("h-full", dir >= 0 ? "story-enter-next" : "story-enter-prev")}
          >
            <StorySlide slide={slide} seed={index} />
          </div>
        </div>

        {/* Keyboard/pointer controls that don't depend on knowing the tap zones */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-1">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous"
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full text-cream-soft/0 transition-colors hover:bg-cream-soft/10 hover:text-cream-soft/80 focus-visible:text-cream-soft"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next"
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full text-cream-soft/0 transition-colors hover:bg-cream-soft/10 hover:text-cream-soft/80 focus-visible:text-cream-soft"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <p className="pointer-events-none absolute inset-x-0 bottom-2 z-20 text-center">
          <span className={cx("u-mono text-cream-soft/30", paused && "text-cream-soft/60")}>
            {paused ? "paused" : `${index + 1} / ${total}`}
          </span>
        </p>
      </div>
    </div>
  );
}
