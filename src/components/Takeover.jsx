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
function confetti(colours) {
  const pieces = [];
  for (let i = 0; i < 40; i++) {
    const angle = (i / 40) * Math.PI * 2 + (i % 3) * 0.24;
    const dist = 130 + ((i * 37) % 190);
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

// `className` carries the positioning, because the two callers differ there and
// only there: the card set renders inside an overlay that is already fixed, so
// it takes `absolute`; the ghost stands on its own and takes `fixed`.
export default function Takeover({ colours, className = "", children }) {
  const pieces = useMemo(() => confetti(colours), [colours]);

  return (
    <div
      className={cx(
        "celebrate-in inset-0 flex items-center justify-center overflow-hidden bg-near-black/85 px-5 backdrop-blur-md",
        className
      )}
    >
      {/* Thrown from the centre, behind everything. */}
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

      <div className="relative w-full max-w-md text-center">{children}</div>
    </div>
  );
}
