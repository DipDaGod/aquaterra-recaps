import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import StoryPlayer from "./StoryPlayer";
import { buildStories, chaptersFor } from "../../lib/buildStories";
import { SECTION_ACCENTS, cx } from "../../lib/utils";

// Instagram's highlight rings, sitting where they sit on a profile: under the
// name, above everything else. The first opens the whole run; the rest jump
// straight to their chapter.
export default function Highlights({ edition }) {
  const slides = useMemo(() => buildStories(edition), [edition]);
  const chapters = useMemo(() => chaptersFor(slides), [slides]);
  const [startAt, setStartAt] = useState(null);

  if (slides.length < 2) return null;

  const runtime = Math.round(slides.reduce((a, s) => a + s.ms, 0) / 1000);

  return (
    <div className="mt-8">
      <ul className="scroll-quiet -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        {chapters.map((c) => {
          const accent = SECTION_ACCENTS[c.accent] || SECTION_ACCENTS.green;
          const isAll = c.id === "all";
          return (
            <li key={c.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setStartAt(c.start)}
                className="group flex w-[4.5rem] flex-col items-center gap-2"
              >
                {/* The ring. Two rounded boxes rather than a border, so the
                    gap between ring and fill stays even at any size. */}
                <span
                  className={cx(
                    "grid h-[4.25rem] w-[4.25rem] place-items-center rounded-full p-[3px] transition-transform duration-300 group-hover:scale-105 group-active:scale-95",
                    accent.rule
                  )}
                >
                  <span className="grid h-full w-full place-items-center rounded-full bg-cream p-[3px]">
                    <span
                      className={cx(
                        "grid h-full w-full place-items-center rounded-full",
                        isAll ? "bg-ink text-cream-soft" : cx(accent.rule, "text-cream-soft")
                      )}
                    >
                      {isAll ? (
                        <Play className="h-6 w-6" strokeWidth={2} fill="currentColor" />
                      ) : (
                        <span className="u-display text-lg">{String(c.count).padStart(2, "0")}</span>
                      )}
                    </span>
                  </span>
                </span>
                <span className="u-mono w-full truncate text-center text-ink-3 group-hover:text-ink">
                  {c.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-1">
        <span className="u-mono text-ink-3/70">
          {slides.length} cards · about {runtime}s · tap to skip, hold to pause
        </span>
      </p>

      {startAt !== null && (
        <StoryPlayer slides={slides} startAt={startAt} onClose={() => setStartAt(null)} />
      )}
    </div>
  );
}
