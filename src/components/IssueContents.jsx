import { Meta } from "./Lockup";

// "In this issue" — a numbered contents list, the way a magazine opens.
// It does three jobs at once: it tells you how long the issue is, it gives the
// numbered sections below something to refer back to, and it turns a long
// scroll into something you can jump around.
//
// Built from the same manifest that numbers the sections, so it can never
// list a section the issue doesn't carry.
export default function IssueContents({ sections }) {
  if (sections.length === 0) return null;

  return (
    <nav aria-label="In this issue" className="border-y border-line/70 bg-cream-soft/60">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <Meta className="text-ink-3">In this issue</Meta>

        <ol className="mt-5 grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="group flex items-baseline gap-3 border-b border-line/60 py-3 transition-colors hover:border-(--issue-accent)"
              >
                <Meta className="text-(--issue-accent-ink)">
                  {String(s.index).padStart(2, "0")}
                </Meta>
                <span className="flex-1 text-[0.9375rem] font-medium text-ink-2 transition-colors group-hover:text-ink">
                  {s.label}
                </span>
                <span
                  aria-hidden="true"
                  className="text-ink-3 transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
