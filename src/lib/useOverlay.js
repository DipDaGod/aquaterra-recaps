import { useEffect, useRef } from "react";

// Shared setup for a full-screen overlay: lock the page behind it, take focus,
// and hand focus back on close.
//
// `inert` on the app root is what keeps Tab inside the overlay. Overlays render
// through a portal into <body> — a sibling of the root, not a child — because a
// transform anywhere up the tree would make that ancestor the containing block
// for position:fixed (CLAUDE.md §9). That puts them outside the root's subtree,
// so marking the root inert costs nothing and traps focus correctly.
export function useOverlay(focusRef) {
  const returnFocus = useRef(null);

  useEffect(() => {
    const root = document.getElementById("root");
    returnFocus.current = document.activeElement;
    document.body.setAttribute("data-scroll-locked", "");
    if (root) root.inert = true;
    focusRef.current?.focus();

    return () => {
      document.body.removeAttribute("data-scroll-locked");
      if (root) root.inert = false;
      returnFocus.current?.focus?.();
    };
  }, [focusRef]);
}
