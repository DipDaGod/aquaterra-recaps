import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cx } from "../lib/utils";

// Collapses a long list on phones only, where an eight-up grid becomes an
// eight-high stack.
//
// The trimming is CSS, not a sliced array: the cut-off follows the viewport
// with no resize listener, and every item stays in the DOM so in-page search
// and anchor links still reach what's hidden.
//
// `after` must be one of the values index.css writes a rule for (2, 3, 4, 6) —
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
          // Phones only — on desktop the rule that hides the overflow doesn't
          // apply, so this button would toggle nothing.
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
