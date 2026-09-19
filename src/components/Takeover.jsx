import { useMemo } from "react";
import { cx } from "../lib/utils";

// The full-screen moment. Two things earn one: finishing the eight-card set,
// and catching the ghost. Both look the same on purpose — the site has one way
// of saying "that was worth doing", not one per feature — so the scrim, the
// confetti and the column live here rather than in either caller.
//
// The confetti is AquaTerra's own team colours, never a generic rainbow: §4
// forbids a ninth colour, and the palette makes a better spectrum anyway.
//
// `burst` ends at opacity 0, which is its resting state (§9). Reduced motion
// clamps animations to 0.001ms with the fill mode still applied, so confetti
// that ended mid-air would hang there for ever; ending invisible means the
// clamp simply never shows it, and the takeover still reads correctly.
function confetti(colours, spread) {
  const pieces = [];
  for (let i = 0; i < 40; i++) {
    const angle = (i / 40) * Math.PI * 2 + (i % 3) * 0.24;
    const dist = (130 + ((i * 37) % 190)) * spread;
    pieces.push({
      i,
      colour: colours[i % colours.length],
      x: `${Math.cos(angle) * dist}px`,
      y: `${Math.sin(angle) * dist - 40}px`,
      r: `${((i * 71) % 540) - 270}deg`,
      size: 6 + ((i * 13) % 9),
      round: i % 3 === 0,
    });
  }
  return pieces;
}

// Two shapes, because two different sizes of moment.
//
//   "screen"  the whole viewport goes dark. Finishing the eight-card set earns
//             this and §9 is explicit that it must: the payoff used to be a
//             block appended under the card that you had to scroll to find.
//   "box"     a panel that grows to a readable width and stops. For a smaller
//             find, where blacking out the page someone is reading is more
//             than the moment is worth.
//
// `className` carries the positioning, because that is the only other place the
// callers differ: the card set renders inside an overlay that is already fixed,
// so it takes `absolute`; the ghost stands on its own and takes `fixed`.
export default function Takeover({ colours, variant = "screen", className = "", children }) {
  const box = variant === "box";
  // The burst is sized to what contains it. At full spread inside a 28rem panel
  // every piece is off the edge on the first frame and the throw never reads.
  const pieces = useMemo(() => confetti(colours, box ? 0.42 : 1), [colours, box]);

  if (box) {
    return (
      // The page behind stays live — this is a panel, not a modal, so it must
      // not swallow clicks meant for the issue underneath it.
      <div className={cx("pointer-events-none inset-0 flex items-center justify-center px-5", className)}>
        <div className="celebrate-in pointer-events-auto relative w-full max-w-md overflow-hidden rounded-[2rem] bg-near-black px-6 py-9 text-center shadow-[0_30px_80px_-24px_rgb(10_10_10_/_0.7)]">
          <Burst pieces={pieces} />
          <div className="relative">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cx(
        "celebrate-in inset-0 flex items-center justify-center overflow-hidden bg-near-black/85 px-5 backdrop-blur-md",
        className
      )}
    >
      <Burst pieces={pieces} />
      <div className="relative w-full max-w-md text-center">{children}</div>
    </div>
  );
}

// Thrown from the centre, behind everything.
function Burst({ pieces }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
      {pieces.map((p) => (
        <span
          key={p.i}
          className="burst absolute block"
          style={{
            "--x": p.x,
            "--y": p.y,
            "--r": p.r,
            "--i": p.i,
            width: p.size,
            height: p.size,
            background: p.colour,
            borderRadius: p.round ? "999px" : "2px",
          }}
        />
      ))}
    </div>
  );
}
