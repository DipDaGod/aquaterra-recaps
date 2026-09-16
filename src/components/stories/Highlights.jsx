import { useEffect, useMemo } from "react";
import { Navigate, useLocation, useMatch, useNavigate, useParams } from "react-router-dom";
import { Play } from "lucide-react";
import StoryPlayer from "./StoryPlayer";
import { buildStories, chaptersFor } from "../../lib/buildStories";
import { SECTION_ACCENTS, cx } from "../../lib/utils";

// Instagram's highlight rings. The first opens the whole run; the rest jump
// straight to their chapter.
//
// Whether the player is open is the URL's business, not this component's:
// /2026/september/stories plays the run, /2026/september/stories/teams starts
// on that chapter. So a run is a link you can send someone, opening one puts
// that link in the address bar to copy, and the browser's Back button closes
// the player for free — the route stops matching and it unmounts.
export default function Highlights({ edition }) {
  const slides = useMemo(() => buildStories(edition), [edition]);
  const chapters = useMemo(() => chaptersFor(slides), [slides]);

  const { year, month } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const open = useMatch("/:year/:month/stories/:chapter?");

  const base = `/${year}/${month}`;
  const linkTo = (c) => (c.id === "all" ? `${base}/stories` : `${base}/stories/${c.id}`);

  const named = open?.params?.chapter;
  const chapter = named ? chapters.find((c) => c.id === named) : chapters[0];
  const playable = slides.length >= 2;

  // A link to a chapter this issue doesn't have still plays — it just plays the
  // whole run, and the address bar is corrected to say so. A shared link going
  // nowhere because an issue dropped a section is worse than starting at the
  // top.
  useEffect(() => {
    if (open && playable && named && !chapter) {
      navigate(`${base}/stories`, { replace: true });
    }
  }, [open, playable, named, chapter, navigate, base]);

  // Closing goes back the way you came: a push if you opened it here, so Back
  // and the close button agree, and a replace if you arrived on the link, so
  // Back still leaves the site rather than reopening the player.
  function close() {
    if (location.state?.fromIssue) {
      navigate(-1);
      return;
    }
    navigate(base, { replace: true });
  }

  // The stories are a trailer for the issue underneath them, so they end — and
  // every slide offers — a way into the part of the page they came from.
  function openSection(id) {
    close();
    const target = id
      ? document.getElementById(id)
      : document.querySelector("main section[id]");
    if (!target) return;
    // After the close, or the overlay is still up and the scroll is locked.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }))
    );
  }

  // An issue with nothing to play has no rings and no run, so its stories URL
  // is a dead end. Send it back to the issue rather than showing an empty page.
  if (!playable) return open ? <Navigate to={base} replace /> : null;

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
                data-chapter={c.id}
                onClick={() => navigate(linkTo(c), { state: { fromIssue: true } })}
                className="group flex w-[4.5rem] flex-col items-center gap-2"
              >
                {/* Two rounded boxes rather than a border, so the gap between
                    ring and fill stays even at any size. */}
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

      {open && (
        <StoryPlayer
          slides={slides}
          startAt={chapter?.start ?? 0}
          onClose={close}
          onOpenSection={openSection}
        />
      )}
    </div>
  );
}
