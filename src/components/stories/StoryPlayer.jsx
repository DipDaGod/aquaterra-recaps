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
// Forward and back between topics. Sits in the gap between the peek and the
// active card, as it does on a stories player, rather than as the invisible
// edge targets that used to be inside the card.
function Chevron({ dir, chapter, onClick }) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  if (!chapter) return <span aria-hidden="true" className="hidden h-11 w-11 shrink-0 sm:block" />;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${dir === "prev" ? "Previous" : "Next"} topic — ${chapter.label}`}
      className="hidden h-11 w-11 shrink-0 place-items-center rounded-full bg-cream-soft/10 text-cream-soft transition-colors hover:bg-cream-soft/25 sm:grid"
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}

// A topic that is not the live one: its accent, its card count, its name. It
// fills the same box as the live card and is scaled down by the stage, so the
// two can transition into one another.
function ChapterFace({ chapter, onClick }) {
  const a = SECTION_ACCENTS[chapter.accent] || SECTION_ACCENTS.green;
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={-1}
      aria-label={`Go to ${chapter.label} — ${chapter.count} ${chapter.count === 1 ? "card" : "cards"}`}
      className="relative grid h-full w-full place-items-center overflow-hidden bg-ink sm:rounded-[2rem]"
    >
      <span aria-hidden="true" className="absolute inset-0 opacity-30" style={{ background: a.raw }} />
      <span className={cx("relative grid h-20 w-20 place-items-center rounded-full p-[3px]", a.rule)}>
        <span className="grid h-full w-full place-items-center rounded-full bg-ink">
          <span className="u-display text-lg text-cream-soft">
            {String(chapter.count).padStart(2, "0")}
          </span>
        </span>
      </span>
      <Meta className="absolute inset-x-0 bottom-8 text-center text-cream-soft/75">
        {chapter.label}
      </Meta>
    </button>
  );
}

export default function StoryPlayer({ slides, startAt = 0, onClose, onOpenSection }) {
  const [index, setIndex] = useState(startAt);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  // Which way the last move went, so a slide enters from the side it came from.
  const [dir, setDir] = useState(1);

  const closeRef = useRef(null);
  const swipe = useRef(null);
  // A phone turns the topics like faces of a cube; anything wider slides and
  // scales them. Two different transforms, so the choice has to be made in JS.
  const [cube, setCube] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setCube(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
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
  const at = chapters.findIndex((c) => index >= c.start && index < c.start + c.count);
  const current = chapters[at];
  const prevChapter = chapters[at - 1];
  const nextChapter = chapters[at + 1];

  const go = useCallback((next) => {
    if (next < 0) { setIndex(0); elapsed.current = 0; setProgress(0); return; }
    if (next >= total) { onClose(); return; }
    setDir((d) => (next > index ? 1 : next < index ? -1 : d));
    setIndex(next);
    elapsed.current = 0;
    setProgress(0);
  }, [total, onClose, index]);

  // Tapping back stops at the first card of the topic you are in. Crossing into
  // the one before is what the chevrons, the peeks and a swipe are for — so a
  // stray tap can't walk you backwards out of what you are reading.
  const goCard = useCallback(
    (delta) => {
      if (delta >= 0) { go(index + 1); return; }
      go(Math.max(current?.start ?? 0, index - 1));
    },
    [go, index, current]
  );

  // Forward and back move a whole topic. Inside one, the cards advance on their
  // own or on a tap.
  const goChapter = useCallback(
    (delta) => {
      const to = chapters[at + delta];
      if (to) go(to.start);
    },
    [chapters, at, go]
  );

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
      else if (e.key === "ArrowRight") goCard(1);
      else if (e.key === "ArrowLeft") goCard(-1);
      else if (e.key === " " || e.key === "Spacebar") { e.preventDefault(); setPaused((p) => !p); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, goCard, onClose]);

  if (!slide) return null;

  const accentRaw = (SECTION_ACCENTS[slide.accent] || SECTION_ACCENTS.green).raw;
  const accentRule = (SECTION_ACCENTS[current?.accent] || SECTION_ACCENTS.green).rule;

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

    // Tapping moves a card, swiping moves a topic, swiping down closes — the
    // split every stories player uses, and the one the desk asked for.
    const from = swipe.current;
    swipe.current = null;
    if (from) {
      const dx = e.clientX - from.x;
      const dy = e.clientY - from.y;
      if (Math.abs(dy) > 70 && Math.abs(dy) > Math.abs(dx)) {
        if (dy > 0) onClose();
        return;
      }
      if (Math.abs(dx) > 60) { goChapter(dx < 0 ? 1 : -1); return; }
    }

    if (!quick) return;
    const box = e.currentTarget.getBoundingClientRect();
    goCard(e.clientX - box.left < box.width * 0.33 ? -1 : 1);
  }

  // Portalled into <body> — see useOverlay for why.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-near-black/95 p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${slide.chapter} story, ${index + 1} of ${total}`}
    >
      {/* The stage. Every topic is a face in the same box; the live one is at
          scale 1 and the rest are pushed aside — so moving between them is one
          transition, the outgoing card shrinking as the incoming one rises to
          size, rather than a swap.

          On a phone the faces sit on a cube instead: each is rotated a quarter
          turn further round and pushed out by half the card's width, and the
          stage counter-rotates, so a move turns the cube to the next face. */}
      <div
        className="relative flex h-full w-full items-center justify-center"
        style={cube ? { perspective: "1400px" } : undefined}
      >
        <div
          className="relative h-full w-full max-w-[26rem] sm:h-[min(90vh,46rem)]"
          style={{
            transformStyle: cube ? "preserve-3d" : undefined,
            // translateZ pulls the cube back by its own radius, so the face
            // facing you sits flat at z = 0. Without it every live face is
            // pushed toward the viewer and perspective scales it up past the
            // edges of the screen.
            transform: cube ? `translateZ(-50vw) rotateY(${-at * 90}deg)` : undefined,
            transition: "transform 560ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {chapters.map((c, i) => {
            const d = i - at;
            const live = d === 0;
            const face = cube
              ? {
                  transform: `rotateY(${i * 90}deg) translateZ(50vw)`,
                  backfaceVisibility: "hidden",
                  opacity: Math.abs(d) <= 1 ? 1 : 0,
                }
              : {
                  transform: `translateX(${d * 23}rem) scale(${live ? 1 : 0.58})`,
                  opacity: live ? 1 : Math.abs(d) === 1 ? 0.55 : 0,
                };
            return (
              <div
                key={c.id}
                data-topic-face={c.id}
                data-live={live ? "true" : undefined}
                aria-hidden={live ? undefined : "true"}
                className={cx(
                  "absolute inset-0 transition-[transform,opacity] duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  // The peeks are a wide-screen thing — but the cube needs its
                  // other faces present, or the outgoing one vanishes the
                  // instant the move starts and only the incoming face turns.
                  !live && !cube && "hidden lg:block",
                  !live && !cube && "cursor-pointer"
                )}
                style={{
                  ...face,
                  // On the cube you move by swiping, and an edge-on face should
                  // not be able to swallow a tap meant for the live one.
                  pointerEvents: live ? "auto" : cube || Math.abs(d) > 1 ? "none" : "auto",
                }}
              >
                {live ? (
      <div
        className="relative flex h-full w-full flex-col overflow-hidden bg-ink transition-shadow duration-700 sm:rounded-[2rem]"
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

        {/* The chapter, where a stories player puts whose story it is. The
            five-ring row that used to sit here is redundant now that forward
            and back move a topic at a time. */}
        <div className="absolute inset-x-0 top-5 z-20 flex items-center gap-2.5 pl-3 pr-[5.5rem]">
          <span
            aria-hidden="true"
            className={cx("grid h-8 w-8 shrink-0 place-items-center rounded-full p-[2px]", accentRule)}
          >
            <span className="grid h-full w-full place-items-center rounded-full bg-ink">
              <span className="u-mono text-[0.5rem] text-cream-soft">
                {String(current?.count ?? 0).padStart(2, "0")}
              </span>
            </span>
          </span>
          <span className="min-w-0">
            <Meta className="block truncate text-cream-soft">{current?.label}</Meta>
            <Meta className="block text-cream-soft/45">
              {index - (current?.start ?? 0) + 1} of {current?.count}
            </Meta>
          </span>
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

        <p className="pointer-events-none absolute inset-x-0 bottom-2 z-20 text-center">
          <span className={cx("u-mono text-cream-soft/30", paused && "text-cream-soft/60")}>
            {paused ? "paused" : `${index + 1} / ${total}`}
          </span>
        </p>
      </div>
                ) : (
                  <ChapterFace chapter={c} onClick={() => go(c.start)} />
                )}
              </div>
            );
          })}
        </div>

        {/* In the gap between the live card (half-width 13rem) and a peek
            (centred at 23rem, half-width 7.54rem, so its near edge is at
            15.46rem). Fixed offsets, because the faces themselves are moving. */}
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex">
          <span className="pointer-events-auto absolute right-[calc(50%+13.2rem)]">
            <Chevron dir="prev" chapter={prevChapter} onClick={() => goChapter(-1)} />
          </span>
          <span className="pointer-events-auto absolute left-[calc(50%+13.2rem)]">
            <Chevron dir="next" chapter={nextChapter} onClick={() => goChapter(1)} />
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
