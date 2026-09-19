import { useCallback, useEffect, useRef, useState } from "react";
import Mascot from "./Mascot";
import { Meta } from "./Lockup";
import { cx } from "../lib/utils";

// The easter egg. The mascot leans out from behind the scrollbar every few
// minutes; catch it and it stays, down in the corner, for the rest of the visit.
//
// Two rules shape all of it:
//
//  - **Time on the site, not time on the clock.** The timer stops dead when the
//    tab goes to the background, so a page left open in another window for an
//    hour is no closer to a sighting than one you closed after a minute. It is
//    meant to reward reading the thing.
//  - **It has to be catchable.** That is the whole difference from decoration:
//    the ghost is a button now, it holds still long enough to be hit, and under
//    reduced motion it appears without the lean rather than not at all —
//    otherwise the egg simply does not exist for those readers.

// On-site milliseconds before the first sighting, then the window between them.
const FIRST_MS = 120000;
const GAP_MIN_MS = 180000;
const GAP_MAX_MS = 300000;
// Long enough to notice it AND reach it. `ghost-peek` in index.css runs to the
// same length; change one and change the other.
const SHOW_MS = 3400;

// How long the congrats holds before it takes itself away.
const CONGRATS_MS = 5200;

// The buddy's idle life: how long between its little performances, and how long
// each one lasts.
const MOOD_MIN_MS = 14000;
const MOOD_MAX_MS = 30000;
const MOOD_MS = 2800;

// ─────────────────────────────────────────────────────────────────────────────
// TEMPORARY — DEMO MODE. NOT FOR PUBLICATION.
//
// A number here replaces both the two-minute wait and the three-to-five-minute
// gap with that one interval, so the ghost can be watched without sitting on
// the page for minutes first. Everything else is untouched: it is still on-SITE
// time, it is still catchable, it still stops once caught.
//
// Set it back to `null` to restore the shipped behaviour. That single edit is
// the whole revert.
const DEMO_EVERY_MS = 20000;
// ─────────────────────────────────────────────────────────────────────────────

const between = (lo, hi) => lo + Math.random() * (hi - lo);

// ── The buddy ───────────────────────────────────────────────────────────────
// Floats in the corner. Every so often it smiles, or dances, or both. The rest
// of the time it just bobs, which is the point — it is company, not a widget.
function Buddy({ still }) {
  const [mood, setMood] = useState(null);

  useEffect(() => {
    if (still) return;
    let timer = 0;
    let clear = 0;
    const next = () => {
      timer = setTimeout(() => {
        // Sometimes a smile, sometimes a dance, sometimes it commits to both.
        const roll = Math.random();
        setMood(roll < 0.4 ? "smile" : roll < 0.8 ? "dance" : "both");
        clear = setTimeout(() => {
          setMood(null);
          next();
        }, MOOD_MS);
      }, between(MOOD_MIN_MS, MOOD_MAX_MS));
    };
    next();
    return () => {
      clearTimeout(timer);
      clearTimeout(clear);
    };
  }, [still]);

  const dancing = mood === "dance" || mood === "both";
  const smiling = mood === "smile" || mood === "both";

  return (
    <div
      data-buddy=""
      aria-hidden="true"
      className="pointer-events-none fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6"
    >
      <div className={cx(!still && (dancing ? "ghost-dance" : "ghost-float"))}>
        <Mascot
          smiling={smiling}
          className="h-12 w-12 drop-shadow-[0_8px_20px_rgb(10_10_10_/_0.3)] sm:h-14 sm:w-14"
        />
      </div>
    </div>
  );
}

// ── The congrats ────────────────────────────────────────────────────────────
// Small on purpose. The full-screen takeover belongs to collecting all eight
// team cards (§9); this is a smaller find and says so by being a card, not a
// curtain. It promises nothing it can't give — the buddy IS the prize.
function Congrats({ onDone }) {
  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-24 sm:pb-28"
    >
      <div className="celebrate-in pointer-events-auto w-full max-w-sm rounded-[1.75rem] bg-ink p-6 text-center shadow-[0_24px_60px_-20px_rgb(10_10_10_/_0.6)]">
        <div className="flex justify-center">
          <Mascot smiling className="ghost-dance h-12 w-12" color="var(--color-green-bright)" />
        </div>
        <h2 className="u-display mt-4 text-3xl leading-[0.95] text-cream-soft">
          YOU CAUGHT <em className="font-accent lowercase italic text-green-bright">it</em>
          <span aria-hidden="true">.</span>
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-cream-soft/70">
          nobody was looking for that. it lives in the corner now. it will hang
          about down there while you read.
        </p>
        <button
          type="button"
          onClick={onDone}
          autoFocus
          className="mt-5 inline-flex items-center rounded-full bg-cream-soft px-5 py-2.5 text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Meta>Nice</Meta>
        </button>
      </div>
    </div>
  );
}

// ── The egg ─────────────────────────────────────────────────────────────────
export default function GhostEgg() {
  const [run, setRun] = useState(0); // replay key for the peeking sprite
  const [top, setTop] = useState(50);
  const [caught, setCaught] = useState(false);
  const [congrats, setCongrats] = useState(false);
  // Read once, lazily, rather than synced in an effect — this app is
  // client-rendered, so the query is answerable on the first render and a
  // second pass to learn it would be a render for nothing.
  const [still] = useState(() => !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  const hideRef = useRef(0);

  const onCatch = useCallback(() => {
    clearTimeout(hideRef.current);
    setRun(0);
    setCaught(true);
    setCongrats(true);
  }, []);

  useEffect(() => {
    if (caught) return undefined;

    // On-site time. `banked` is everything before the current visible stretch;
    // `since` is when that stretch began. Hidden time is simply never added.
    let banked = 0;
    let since = Date.now();
    let dueAt = DEMO_EVERY_MS ?? FIRST_MS;
    let timer = 0;

    const onSite = () => banked + (document.hidden ? 0 : Date.now() - since);

    function appear() {
      const span = document.documentElement.scrollHeight - window.innerHeight;
      const pct = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
      // Level with the scrollbar thumb, but kept well inside the viewport so it
      // never half-leaves through the top or bottom edge.
      setTop(14 + pct * 72);
      setRun((n) => n + 1);
      dueAt = onSite() + (DEMO_EVERY_MS ?? between(GAP_MIN_MS, GAP_MAX_MS));
      clearTimeout(hideRef.current);
      hideRef.current = setTimeout(() => setRun(0), SHOW_MS);
      schedule();
    }

    // No polling: one timeout for exactly the time still owed, torn down while
    // the tab is hidden and rebuilt when it comes back.
    function schedule() {
      clearTimeout(timer);
      if (document.hidden) return;
      timer = setTimeout(appear, Math.max(0, dueAt - onSite()));
    }

    function onVisibility() {
      if (document.hidden) {
        banked += Date.now() - since;
        clearTimeout(timer);
      } else {
        since = Date.now();
        schedule();
      }
    }

    schedule();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [caught]);

  useEffect(() => {
    if (!congrats) return undefined;
    const t = setTimeout(() => setCongrats(false), CONGRATS_MS);
    return () => clearTimeout(t);
  }, [congrats]);

  return (
    <>
      {run > 0 && (
        <button
          key={run}
          type="button"
          onClick={onCatch}
          // Out of the accessibility tree and off the tab order on purpose: it
          // is a joke with nothing behind it, and a control that announces
          // itself at random every few minutes is worse than one you can't
          // reach. Nothing here is content, and the buddy carries no meaning
          // the page doesn't already say.
          aria-hidden="true"
          tabIndex={-1}
          // Under reduced motion it holds still instead of leaning, rather than
          // not appearing — otherwise the egg cannot be found at all.
          className={cx(
            still ? "ghost-still" : "ghost-peek",
            "fixed right-0 z-40 cursor-pointer border-0 bg-transparent p-0"
          )}
          style={{ top: `${top}%` }}
        >
          <Mascot className="h-11 w-11 drop-shadow-[0_6px_16px_rgb(10_10_10_/_0.25)]" />
        </button>
      )}

      {congrats && <Congrats onDone={() => setCongrats(false)} />}
      {caught && <Buddy still={still} />}
    </>
  );
}
