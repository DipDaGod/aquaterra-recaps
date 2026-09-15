import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import StorySlide from "./StorySlide";
import { Meta } from "../Lockup";
import { chaptersFor } from "../../lib/buildStories";
import { useOverlay } from "../../lib/useOverlay";
import { SECTION_ACCENTS, cx } from "../../lib/utils";

// An Instagram-style stories player over the edition's own content.
//
// Timing runs on requestAnimationFrame, not a CSS animation: the global
// reduced-motion rule clamps every animation to 0.001ms, which would blast a
// CSS-driven progress bar through every slide at once.
export default function StoryPlayer({ slides, startAt = 0, onClose, onOpenSection }) {
  const [index, setIndex] = useState(startAt);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  // Which way the last move went, so a slide enters from the side it came from.
  const [dir, setDir] = useState(1);

  const closeRef = useRef(null);
  const swipe = useRef(null);
  const elapsed = useRef(0);
  const last = useRef(0);
  const frame = useRef(0);
  const held = useRef(0);
  // Whether the current pause came from a press-and-hold. Without this, moving
  // the pointer off the slide cancelled a pause the viewer had set deliberately
  // with the pause button.
  const holding = useRef(false);

  useOverlay(closeRef);

  const slide = slides[index];
  const total = slides.length;

  // The run is over a minute long. Grouping the progress by chapter, and making
  // the chapters tappable, is what lets someone skip the part they don't want
  // instead of sitting through it.
  const chapters = useMemo(
    () => chaptersFor(slides).filter((c) => c.id !== "all"),
    [slides]
  );
  const current = chapters.find(
    (c) => index >= c.start && index < c.start + c.count
  );

  const go = useCallback((next) => {
    if (next < 0) { setIndex(0); elapsed.current = 0; setProgress(0); return; }
    if (next >= total) { onClose(); return; }
    setDir((d) => (next > index ? 1 : next < index ? -1 : d));
    setIndex(next);
    elapsed.current = 0;
    setProgress(0);
  }, [total, onClose, index]);

  // Fetch the next photograph while this slide is still up, so a real frame
  // doesn't pop in a beat late.
  useEffect(() => {
    const next = slides[index + 1]?.image?.src;
    if (next) { const img = new Image(); img.src = next; }
  }, [index, slides]);

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
  function onPointerDown(e) {
    swipe.current = { x: e.clientX, y: e.clientY };
    held.current = performance.now();
    holding.current = true;
    setPaused(true);
  }
  function releaseHold() {
    if (!holding.current) return;
    holding.current = false;
    setPaused(false);
  }
  function onPointerUp(e) {
    const quick = performance.now() - held.current < 250;
    releaseHold();

    // Swipe: sideways moves, downwards closes — the gesture people already
    // expect from every other stories player.
    const from = swipe.current;
    swipe.current = null;
    if (from) {
      const dx = e.clientX - from.x;
      const dy = e.clientY - from.y;
      if (Math.abs(dy) > 70 && Math.abs(dy) > Math.abs(dx)) {
        if (dy > 0) onClose();
        return;
      }
      if (Math.abs(dx) > 60) { go(index + (dx < 0 ? 1 : -1)); return; }
    }

    if (!quick) return;
    const box = e.currentTarget.getBoundingClientRect();
    go(e.clientX - box.left < box.width * 0.33 ? index - 1 : index + 1);
  }

  // Portalled into <body> — see useOverlay for why.
  return createPortal(
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

        {/* One group per chapter. Twenty-one equal segments in a 26rem card
            were 12px each and told you nothing; grouped, you can see both where
            you are in the chapter and how many chapters are left. */}
        <div className="absolute inset-x-0 top-0 z-20 flex gap-2.5 p-3">
          {chapters.map((c) => (
            <div key={c.id} className="flex gap-1" style={{ flex: c.count }}>
              {slides.slice(c.start, c.start + c.count).map((s, n) => {
                const i = c.start + n;
                return (
                  <span key={s.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-cream-soft/25">
                    <span
                      className={cx("block h-full rounded-full bg-cream-soft", i === index && "story-active-bar")}
                      style={{ width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%" }}
                    />
                  </span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Skip a whole chapter. Built as highlight rings, the same object the
            row under the hero uses to open these chapters in the first place —
            a scrolling row of text pills read as a stray scrollbar on the dark
            card, and there are only ever five of these, so it never needed to
            scroll at all. */}
        <div className="absolute inset-x-0 top-6 z-20 flex items-center gap-2 pl-3 pr-[5.5rem]">
          {chapters.map((c) => {
            const a = SECTION_ACCENTS[c.accent] || SECTION_ACCENTS.green;
            const on = c.id === current?.id;
            const seen = index >= c.start;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => go(c.start)}
                aria-label={`${c.label} — ${c.count} ${c.count === 1 ? "card" : "cards"}`}
                aria-current={on ? "true" : undefined}
                className="shrink-0"
              >
                <span
                  className={cx(
                    "grid h-7 w-7 place-items-center rounded-full p-[2px] transition-[transform,opacity] duration-300",
                    a.rule,
                    on ? "scale-110" : seen ? "opacity-70 hover:opacity-100" : "opacity-40 hover:opacity-90"
                  )}
                >
                  <span className="grid h-full w-full place-items-center rounded-full bg-ink">
                    <span className="u-mono text-[0.5rem] text-cream-soft">
                      {String(c.count).padStart(2, "0")}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
          <Meta className="min-w-0 truncate text-cream-soft/55">{current?.label}</Meta>
        </div>

        <div className="absolute right-2 top-5 z-30 flex items-center gap-1">
          <button
            type="button"
            onClick={() => { holding.current = false; setPaused((p) => !p); }}
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

        <div
          className="relative min-h-0 flex-1 cursor-pointer select-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={releaseHold}
        >
          <div
            key={slide.id}
            className={cx("h-full", dir >= 0 ? "story-enter-next" : "story-enter-prev")}
          >
            <StorySlide
              slide={slide}
              seed={index}
              onOpenSection={onOpenSection}
              onReplay={() => go(0)}
            />
          </div>
        </div>

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
    </div>,
    document.body
  );
}
