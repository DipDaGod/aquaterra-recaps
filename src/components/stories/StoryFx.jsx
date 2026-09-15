import { useEffect, useRef, useState } from "react";
import { SECTION_ACCENTS, cx } from "../../lib/utils";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Type that climbs out of its own line, a word at a time. Each word sits in an
// overflow-hidden box so it is masked by the line above rather than fading in
// on the spot — the difference between text appearing and text arriving.
export function Words({ text, className = "", base = 0, from = 0 }) {
  if (!text) return null;
  return (
    <span className={className}>
      {String(text).split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="story-line">
          <span className="story-word" style={{ "--i": i + from, "--base": `${base}ms` }}>
            {word}
          </span>
          {i < String(text).split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

// Counts to the figure instead of printing it. Parses the site's own way of
// writing numbers — "1,300+" is 1300 with a "+" that stays put — and hands the
// exact string straight back under reduced motion.
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

// The colour behind a slide. It has to bloom from a corner and stop: at full
// spread it floods the card, and then a purple slide swallows the purple team
// tile sitting on it and the green accent word stops being legible. So: small
// blobs hugging the corners, and a dark scrim over the top that keeps the
// middle — where the type lives — close to the card's own near-black.
export function Wash({ accent = "green", intensity = 1 }) {
  const raw = (SECTION_ACCENTS[accent] || SECTION_ACCENTS.green).raw;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="story-wash absolute -right-[18%] -top-[14%] h-[42%] w-[68%] rounded-full blur-[70px]"
        style={{ background: raw, opacity: 0.5 * intensity }}
      />
      <div
        className="story-wash absolute -bottom-[16%] -left-[20%] h-[34%] w-[58%] rounded-full blur-[70px]"
        style={{ background: raw, opacity: 0.26 * intensity, animationDelay: "140ms" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 55% at 50% 50%, rgb(10 10 10 / 0.72) 0%, rgb(10 10 10 / 0.35) 60%, transparent 100%)",
        }}
      />
    </div>
  );
}

// A ring behind a figure, rather than a ghost of the same digit sitting
// directly behind it — which only made the number look doubled and muddy.
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

// An outsized glyph behind a stat — the thing that stops a single number
// floating in the middle of an empty card.
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
