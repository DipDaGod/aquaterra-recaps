import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "../lib/utils";

// Collapses a long list on phones only. The edition page runs to ~17 screens
// on a 390px viewport, and the teams and featured grids are nearly half of
// that — four and nearly four screens each, because an eight-up grid becomes
// an eight-high stack.
//
// The trimming is done in CSS, not by slicing the array, for two reasons: the
// cut-off follows the viewport with no resize listener or media-query hook,
// and every item stays in the DOM, so in-page search and the contents links
// still reach what's hidden. Desktop is never collapsed — the grids are 3- and
// 4-up there and already compact.
//
// `after` must be one of the values index.css writes a rule for (2, 3, 4, 6);
// nth-child can't take a custom property.
export default function ShowMore({
  children,
  after,
  total,
  noun,
  className = "",
  buttonClassName = "",
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const hidden = total - after;

  if (hidden <= 0) return <div className={className}>{children}</div>;

  return (
    <>
      <div id={id} className={className} data-collapse-after={after} data-collapsed={!open}>
        {children}
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className={cx(
          // Phones only: the rule that hides the overflow is itself phone-only,
          // so on desktop this button would toggle nothing.
          "mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors sm:hidden",
          buttonClassName || "border-ink/15 text-ink hover:border-ink/40 hover:bg-cream-soft"
        )}
      >
        {open ? `show fewer ${noun}` : `show all ${total} ${noun}`}
        <ChevronDown className={cx("h-4 w-4 transition-transform", open && "rotate-180")} strokeWidth={2} />
      </button>
    </>
  );
}
