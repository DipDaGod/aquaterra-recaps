import { useCallback, useEffect, useState } from "react";

// A set of ids the reader has collected, kept in localStorage so it survives a
// reload. Every access is wrapped: localStorage throws in a private window, and
// comes back empty when site data is blocked. The page has to work either way,
// so a failure just means the set starts empty again.
function read(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

export function useCollection(key) {
  const [collected, setCollected] = useState(() =>
    typeof window === "undefined" ? new Set() : read(key)
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify([...collected]));
    } catch {
      // Nothing to do — the set still works for this visit.
    }
  }, [key, collected]);

  const collect = useCallback((id) => {
    setCollected((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const reset = useCallback(() => setCollected(new Set()), []);

  return { collected, collect, reset };
}
