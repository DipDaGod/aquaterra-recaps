import { useEffect, useRef } from "react";

// The cursor spotlight on a display headline: a small circle around the pointer
// inside which the caps turn the accent colour. `Lockup` renders the two layers
// and `.aq-spot*` in index.css owns the look; this owns the pointer.
//
// Same discipline as HoloCard (CLAUDE.md §4): a pointer move writes custom
// properties on one element inside one rAF. Pointer moves fire far more often
// than the screen refreshes, so a React render per move is a render per pixel.
//
// The position is read in the rAF rather than in the handler, which keeps it to
// one layout read and one write per frame no matter how fast the pointer moves —
// and reading the box then is what keeps the circle under the cursor when the
// page scrolls out from under a held pointer.
export function useSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Decoration for a pointer that can hover. A touch would light the circle
    // wherever it last tapped and leave it there, and reduced motion gets the
    // headline as it is — the CSS declines both too, so neither depends on this.
    const no =
      !window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (no) return;

    let raf = 0;
    let cx = 0;
    let cy = 0;

    const write = () => {
      raf = 0;
      const box = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${cx - box.left}px`);
      el.style.setProperty("--spot-y", `${cy - box.top}px`);
    };

    const track = (e) => {
      cx = e.clientX;
      cy = e.clientY;
      if (!raf) raf = requestAnimationFrame(write);
    };

    // Place the circle before fading it in, or it travels from wherever the
    // pointer left the headline last time.
    const enter = (e) => {
      track(e);
      write();
      el.style.setProperty("--spot-on", "1");
    };
    const leave = () => el.style.setProperty("--spot-on", "0");

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointermove", track);
    el.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointermove", track);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return ref;
}
