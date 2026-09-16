import { useCallback, useEffect, useRef } from "react";
import { cx } from "../lib/utils";

// The pop-out team card, treated like a foil trading card: it tilts towards the
// pointer, the foil moves across it, and a drag sideways throws it to the next
// card in the set.
//
// Only the opened card does this. The grid upstairs is a grid — eight cards
// tilting at once is a screensaver, and the effect is the payoff for opening
// one.
//
// Everything here is CSS custom properties written on one element, so a move
// costs a compositor transform rather than a React render. Pointer positions
// are coalesced into one rAF: a pointermove fires far more often than the
// screen refreshes, and a render per move is a render per pixel.
const TILT = 6;       // degrees at the edge of the card
const SWING = 0.05;   // degrees of turn per pixel dragged
const SWIPE = 56;     // pixels before a drag counts as a throw

export default function HoloCard({ seed = 0, onSwipe, className, children }) {
  const ref = useRef(null);
  const frame = useRef(0);
  const drag = useRef(null);
  const next = useRef(null);
  const flat = useRef(false);

  // Reduced motion keeps the card still. The swipe stays — moving through the
  // set is navigation, not decoration.
  useEffect(() => {
    flat.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const write = useCallback((vars) => {
    const el = ref.current;
    if (!el) return;
    for (const [k, v] of Object.entries(vars)) el.style.setProperty(k, v);
  }, []);

  const rest = useCallback(() => {
    const el = ref.current;
    if (el) el.dataset.live = "0";
    write({
      "--rx": "0deg", "--ry": "0deg", "--dx": "0px",
      "--mx": "50%", "--my": "50%", "--fx": "0%", "--fy": "0%",
      "--holo-o": "0.1",
    });
  }, [write]);

  const paint = useCallback(() => {
    frame.current = 0;
    const el = ref.current;
    const at = next.current;
    if (!el || !at) return;

    const box = el.getBoundingClientRect();
    // -0.5 … 0.5 from the centre of the card.
    const px = (at.x - box.left) / box.width - 0.5;
    const py = (at.y - box.top) / box.height - 0.5;

    if (drag.current) {
      const dx = at.x - drag.current.x;
      write({
        "--dx": `${dx * 0.55}px`,
        "--ry": flat.current ? "0deg" : `${dx * SWING}deg`,
        "--rx": "0deg",
        "--mx": `${50 + dx * 0.6}%`,
        "--fx": `${Math.max(-13, Math.min(13, dx * 0.08))}%`,
        "--fy": "0%",
        "--holo-o": String(Math.min(0.85, 0.2 + Math.abs(dx) / 260)),
      });
      return;
    }

    if (flat.current) return;
    write({
      "--rx": `${-py * TILT * 2}deg`,
      "--ry": `${px * TILT * 2}deg`,
      "--mx": `${(px + 0.5) * 100}%`,
      "--my": `${(py + 0.5) * 100}%`,
      // Percentages of the foil layer, which is drawn 40% past every edge —
      // 13% of it can never uncover a corner.
      "--fx": `${px * 26}%`,
      "--fy": `${py * 26}%`,
      "--holo-o": String(0.22 + Math.min(1, Math.hypot(px, py) * 2) * 0.5),
    });
  }, [write]);

  const track = useCallback((e) => {
    next.current = { x: e.clientX, y: e.clientY };
    if (!frame.current) frame.current = requestAnimationFrame(paint);
  }, [paint]);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // An object rather than the number itself: a press at clientX 0 is a real
  // press, and 0 is falsy.
  function down(e) {
    drag.current = { x: e.clientX };
    ref.current?.setPointerCapture?.(e.pointerId);
    if (ref.current) ref.current.dataset.live = "1";
    track(e);
  }

  function up(e) {
    const from = drag.current;
    drag.current = null;
    if (from && Math.abs(e.clientX - from.x) >= SWIPE) {
      // The viewer remounts this on the card it moves to, so there is nothing
      // to settle back to.
      onSwipe?.(e.clientX < from.x ? 1 : -1);
      return;
    }
    // A press that went nowhere. A finger has left the card, but a mouse is
    // still on it — settling that one flat would leave it lagging 460ms behind
    // the pointer until it next left.
    if (e.pointerType === "mouse") {
      write({ "--dx": "0px" });
      track(e);
      return;
    }
    rest();
  }

  return (
    <div className={cx("holo-scene", className)}>
      <div
        ref={ref}
        className="holo"
        data-live="0"
        style={{
          // Each card's foil runs at its own angle, so no two of the eight
          // catch the light the same way. Angle only: anything that shifts the
          // layer eats the overhang that keeps its corners covered.
          "--holo-a": `${104 + seed * 19}deg`,
        }}
        onPointerMove={track}
        onPointerEnter={(e) => { if (ref.current) ref.current.dataset.live = "1"; track(e); }}
        onPointerDown={down}
        onPointerUp={up}
        onPointerCancel={() => { drag.current = null; rest(); }}
        onPointerLeave={() => { if (!drag.current) rest(); }}
      >
        {children}
        <span aria-hidden="true" className="holo-foil" />
        <span aria-hidden="true" className="holo-glare" />
      </div>
    </div>
  );
}
