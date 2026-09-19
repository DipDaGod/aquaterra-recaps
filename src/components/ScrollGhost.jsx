import { useEffect, useState } from "react";
import Mascot from "./Mascot";

// The mascot lives behind the scrollbar. Now and then, when you stop scrolling,
// it leans out to see what you're doing, thinks better of it, and ducks back.
//
// The joke only works if it is rare. It fires on a scroll that STOPS, never
// while you are still moving, at most once a minute, and only about half the
// times it could — so it reads as the site having a resident rather than as a
// widget that pops up. Everything below is about keeping it rare and cheap.
//
//  - one passive scroll listener and one timer; no rAF, no observer
//  - it rides the scroll position, so it leans out roughly level with the
//    scrollbar thumb — that is what ties it to the bar rather than to the page
//  - the whole performance is one CSS animation on transform and opacity, so it
//    is a compositor job start to finish
//  - `aria-hidden` and `pointer-events: none`: it is a joke, not furniture, and
//    it must never eat a click or interrupt a screen reader mid-sentence
//  - under reduced motion it never mounts at all. A character whose entire
//    content is movement has nothing left to show once the movement is clamped

// How long the animation runs, matched to `ghost-peek` in index.css.
const SHOW_MS = 2600;
// Quiet after it has been seen. A minute is long enough that the second sighting
// is a surprise again rather than a pattern.
const COOLDOWN_MS = 60000;
// How still the page has to be before it counts as "you stopped".
const SETTLE_MS = 700;
// How far you have to have travelled since it last appeared, in viewport
// heights, so it can't fire twice on the same stretch of page.
const TRAVEL = 1.5;
// It doesn't take every chance it gets.
const ODDS = 0.5;
// Nothing happens for the first few seconds of a visit. Long enough that it
// never collides with the page settling, short enough that someone reading one
// issue can actually meet it — half the cooldown put the first possible
// sighting 30s in, which for most visits meant never.
const ARM_MS = 6000;

// A number here puts the ghost on a plain timer — once on load, then every N ms
// — ignoring the scroll, the travel, the cooldown and the coin flip, purely so
// the performance can be watched without earning it first. `null` is the
// shipped behaviour and is what should be committed; it is left wired up
// because setting it is the whole of turning demoing on and off again.
const DEMO_EVERY_MS = null;

export default function ScrollGhost() {
  // `run` is the replay key: a new number remounts the sprite and restarts the
  // animation, the same trick the game panel and the story filter use (§4).
  const [run, setRun] = useState(0);
  const [top, setTop] = useState(50);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let settle = 0;
    let hide = 0;
    let travelled = 0;
    let last = window.scrollY;
    let readyAt = Date.now() + ARM_MS;

    function appear() {
      const doc = document.documentElement;
      const span = doc.scrollHeight - window.innerHeight;
      const pct = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
      // Kept well inside the viewport: level with the thumb, but never so high
      // or low that it half-leaves through the top or bottom edge.
      setTop(14 + pct * 72);
      setRun((n) => n + 1);
      travelled = 0;
      readyAt = Date.now() + COOLDOWN_MS;
      clearTimeout(hide);
      hide = setTimeout(() => setRun(0), SHOW_MS);
    }

    // Demo mode short-circuits everything below and leaves it untouched: no
    // scroll listener is even attached, so the real rules cannot half-apply and
    // confuse what you are looking at.
    if (DEMO_EVERY_MS) {
      appear();
      const every = setInterval(appear, DEMO_EVERY_MS);
      return () => {
        clearInterval(every);
        clearTimeout(hide);
      };
    }

    function onScroll() {
      const y = window.scrollY;
      travelled += Math.abs(y - last);
      last = y;
      // Restarted on every scroll event, so this only ever fires once you have
      // actually stopped — never mid-flick.
      clearTimeout(settle);
      settle = setTimeout(() => {
        if (Date.now() < readyAt) return;
        if (travelled < window.innerHeight * TRAVEL) return;
        if (Math.random() > ODDS) {
          // A miss still costs you the travel, or it would fire on the very
          // next pause and the odds would mean nothing.
          travelled = 0;
          return;
        }
        appear();
      }, SETTLE_MS);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(settle);
      clearTimeout(hide);
    };
  }, []);

  if (!run) return null;

  return (
    <div
      key={run}
      aria-hidden="true"
      // z-40, under the overlays at z-50: a ghost wandering across an open
      // lightbox is a bug, not a joke. Shown on phones too — that is most of
      // who reads this (§8), and hiding the joke from them defeats it. It is
      // pointer-events:none and gone in 2.6s, so it can't get in the way.
      className="ghost-peek pointer-events-none fixed right-0 z-40"
      style={{ top: `${top}%` }}
    >
      <Mascot className="h-11 w-11 drop-shadow-[0_6px_16px_rgb(10_10_10_/_0.25)]" />
    </div>
  );
}
