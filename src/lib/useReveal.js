import { useEffect, useRef, useState } from "react";

// Adds the `.reveal` class the first time an element scrolls into view.
// Content is visible from first paint either way, so nothing is hidden when the
// observer never fires.
export function useReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown, threshold]);

  return [ref, shown ? "reveal" : ""];
}
