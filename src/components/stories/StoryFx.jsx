import { Fragment, useEffect, useRef, useState } from "react";
import { SECTION_ACCENTS, cx } from "../../lib/utils";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Type that climbs out of its own line, a word at a time. Each word sits in an
// overflow-hidden box so it is masked by the line above rather than fading in
// on the spot.
//
// The separator has to be an ordinary space and it has to sit OUTSIDE the
// masking span. Two traps, and this has been caught in both:
//   - a non-breaking space removes the only break opportunity between two
//     inline-blocks, so a long lockup can never wrap
//   - a space *inside* the overflow-hidden inline-block is trailing whitespace
//     and gets trimmed, so every headline renders as "WHATIS aquaterra."
export function Words({ text, className = "", base = 0, from = 0 }) {
  if (!text) return null;
  const words = String(text).split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="story-line">
            <span className="story-word" style={{ "--i": i + from, "--base": `${base}ms` }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </span>
  );
}

// Counts to the figure instead of printing it. "1,300+" is 1300 with a "+" that
// stays put; under reduced motion the exact string is handed straight back.
export function CountUp({ value, ms = 1100, className = "" }) {
  const text = String(value);
  const match = /^(\d[\d,]*)(.*)$/.exec(text);
  const target = match ? Number(match[1].replace(/,/g, "")) : null;
  const [n, setN] = useState(target === null || reduced() ? target : 0);
  const frame = useRef(0);

  useEffect(() => {
    if (target === null || reduced()) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 4);
      setN(Math.round(target * eased));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [target, ms]);

  if (target === null) return <span className={className}>{text}</span>;
  return (
    <span className={cx("tabular-nums", className)}>
      {n.toLocaleString()}
      {match[2]}
    </span>
  );
}

// The colour behind a slide. Small blobs hugging the corners under a dark
// scrim, not a full wash: at full spread it floods the card and a purple slide
// swallows the purple team tile sitting on it.
//
// The scrim has to stay — white type sits on this and the blobs are bright — but
// it used to be flat `rgb(10 10 10)`, which left a dead black slab across the
// middle of every slide. That slab was the card reading as a BOX behind the
// story rather than as its ground. Two things fix it without giving back any
// contrast: the scrim is mixed with the slide's own accent so its darkest point
// is a tinted near-black rather than a neutral one, and the blobs drift
// continuously (`story-drift`) so the ground is never the same shape twice and
// never reads as a rectangle someone filled in.
export function Wash({ accent = "green", intensity = 1 }) {
  const raw = (SECTION_ACCENTS[accent] || SECTION_ACCENTS.green).raw;
  // color-mix keeps the scrim's luminance where it was — the accent is a tenth
  // of it — so this is a hue change, not a brightness one. Browsers without it
  // fall back to the flat scrim, which is what shipped before.
  const scrim = (pct, alpha) =>
    `color-mix(in srgb, ${raw} ${pct}%, rgb(10 10 10 / ${alpha}))`;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Two elements per blob, not one. The entrance and the drift both animate
          `transform`, and two animations on one element means the last one wins
          that property outright — the blob would arrive with no entrance at all.
          So the outer element owns the entrance and the inner one owns the
          drift, and neither has to know about the other. */}
      <div
        className="story-wash absolute -right-[18%] -top-[14%] h-[42%] w-[68%]"
        style={{ opacity: 0.5 * intensity }}
      >
        <div className="story-drift h-full w-full rounded-full blur-[70px]" style={{ background: raw }} />
      </div>
      <div
        className="story-wash absolute -bottom-[16%] -left-[20%] h-[34%] w-[58%]"
        style={{ opacity: 0.26 * intensity, animationDelay: "140ms" }}
      >
        <div
          className="story-drift story-drift--b h-full w-full rounded-full blur-[70px]"
          style={{ background: raw }}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 55% at 50% 50%, rgb(10 10 10 / 0.72) 0%, rgb(10 10 10 / 0.35) 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(85% 55% at 50% 50%, ${scrim(12, 0.72)} 0%, ${scrim(9, 0.3)} 60%, transparent 100%)`,
        }}
      />
    </div>
  );
}

// A ring behind a figure. Not a ghost of the same digit, which read as doubled.
export function Ring({ accent = "green" }) {
  const raw = (SECTION_ACCENTS[accent] || SECTION_ACCENTS.green).raw;
  return (
    <span
      aria-hidden="true"
      className="story-pop pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ border: `2px solid ${raw}`, opacity: 0.45 }}
    />
  );
}

// An outsized glyph behind a stat, so one number isn't floating in an empty card.
export function Ghost({ children, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "story-ghost pointer-events-none absolute inset-0 grid select-none place-items-center",
        "u-display text-[46vw] leading-none text-cream-soft sm:text-[22rem]",
        className
      )}
    >
      {children}
    </span>
  );
}
