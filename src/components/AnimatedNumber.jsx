import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Counts a numeric prefix up on scroll into view, leaving any non-numeric part
// ("+", "[Number]") untouched.
//
// Every path that can't animate renders the real value rather than sticking on
// "0", and the state is keyed off `value` — stat labels repeat month to month,
// so React reuses this component across editions and would otherwise keep the
// previous month's figure on screen.
export default function AnimatedNumber({ value, duration = 900 }) {
  const text = String(value);
  const match = /^(\d[\d,]*)(.*)$/.exec(text);
  const target = match ? Number(match[1].replace(/,/g, "")) : null;

  const ref = useRef(null);
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (target === null) return;

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      setCount(target);
      return;
    }

    setCount(0);
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  if (target === null) {
    return <span ref={ref}>{text}</span>;
  }

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {match[2]}
    </span>
  );
}
