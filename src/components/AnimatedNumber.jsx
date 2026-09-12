import { useEffect, useRef, useState } from "react";

// Animates a numeric prefix ("310", "14") on scroll into view, leaving any
// non-numeric part ("+", "[Number]") untouched. Respects reduced-motion.
export default function AnimatedNumber({ value, duration = 900 }) {
  const match = /^(\d[\d,]*)(.*)$/.exec(String(value));
  const ref = useRef(null);
  const [display, setDisplay] = useState(match ? "0" : value);
  const started = useRef(false);

  useEffect(() => {
    if (!match) return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(match[1]);
      return;
    }
    const target = parseInt(match[1].replace(/,/g, ""), 10);
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(target * eased).toLocaleString());
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  if (!match) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {display}
      {match[2]}
    </span>
  );
}
