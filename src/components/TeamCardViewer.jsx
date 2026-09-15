import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Check } from "lucide-react";
import Mascot from "./Mascot";
import { Meta } from "./Lockup";
import Celebration from "./Celebration";
import HoloCard from "./HoloCard";
import { useOverlay } from "../lib/useOverlay";
import { TEAMS, cx } from "../lib/utils";

// The pop-out. A team card used to be a link with an arrow on it, pointing at
// that team's story in the issue; the desk asked for the arrow and the jump to
// go, so the card opens this instead — the team as a collectible, one of a set
// of eight.
//
// Everything on it is that team's own verified data (CLAUDE.md §2). The fun is
// the collecting, not new facts: there is no per-team trivia to reveal that
// isn't already published, and inventing some would be rule 0.
//
// Finishing the set fires <Celebration> over the top of this. That is a moment,
// not a panel — it used to be a block appended below the card, which meant the
// payoff for collecting all eight was some text you had to scroll to.
//
// <HoloCard> makes it behave like the foil card it is drawn as: it tilts to the
// pointer, its foil moves, and a sideways drag throws it to the next one. That
// is the swipe the set was missing — the dots are still there, and there are
// still no arrows.
function Card({ entry, number, total }) {
  const team = TEAMS[entry.key];

  return (
    <article
      className="story-enter-next relative flex aspect-[5/7] w-full max-w-[21rem] select-none flex-col overflow-hidden rounded-[1.75rem] p-5 shadow-2xl ring-1 ring-cream-soft/20 sm:p-6"
      style={{ background: team.raw }}
    >
      <div className={cx("flex items-start justify-between gap-3", team.on)}>
        <Meta className="opacity-70">
          {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </Meta>
        <Meta className="text-right opacity-70">{team.kind}</Meta>
      </div>

      {/* The fan motif from the grid card, set big. */}
      <div className="relative flex flex-1 items-center justify-center py-4">
        <span aria-hidden="true" className="relative block h-[62%] w-[68%]">
          <span className="absolute bottom-0 left-0 h-[86%] w-[40%] -rotate-[10deg] rounded-2xl bg-cream-soft shadow-md" />
          <span className="absolute bottom-0 right-0 h-[86%] w-[40%] rotate-[10deg] rounded-2xl bg-cream-soft shadow-md" />
          <span className="absolute bottom-[4%] left-1/2 grid h-full w-[44%] -translate-x-1/2 place-items-center rounded-2xl bg-cream-soft text-4xl shadow-lg">
            {team.emoji}
          </span>
        </span>
        <Mascot className="absolute bottom-1 right-0 h-9 w-9 opacity-90" color="var(--color-cream-soft)" />
      </div>

      <div className={team.on}>
        <h3 className="u-display text-[clamp(1.5rem,7vw,2rem)] leading-[0.95]">{team.caps}</h3>

        <p className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold leading-none tracking-[-0.03em]">
            {entry.members}
          </span>
          <Meta className="opacity-75">
            {entry.members === 1 ? "member" : "members"}
          </Meta>
        </p>

        <p className="mt-3 select-text text-pretty text-sm leading-snug opacity-90">{entry.blurb}</p>
      </div>
    </article>
  );
}

export default function TeamCardViewer({ roster, index, collected, celebrating, onNavigate, onCelebrated, onClose }) {
  const closeRef = useRef(null);
  useOverlay(closeRef);

  const total = roster.length;
  const done = collected.size >= total;

  const go = useCallback(
    (next) => onNavigate((next + total) % total),
    [total, onNavigate]
  );

  useEffect(() => {
    function onKey(e) {
      // While the celebration is up it owns the keyboard — Escape dismisses it
      // rather than closing the whole viewer behind it.
      if (e.key === "Escape") (celebrating ? onCelebrated : onClose)();
      else if (celebrating) return;
      else if (e.key === "ArrowRight") go(index + 1);
      else if (e.key === "ArrowLeft") go(index - 1);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, go, onClose, celebrating, onCelebrated]);

  const entry = roster[index];
  if (!entry) return null;

  // Portalled into <body> — see useOverlay for why.
  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm"
      style={{ backgroundColor: "rgb(10 10 10 / 0.9)" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${TEAMS[entry.key].name}, card ${index + 1} of ${total}`}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close the card"
        className="sticky left-full top-4 z-10 mr-4 grid h-11 w-11 place-items-center rounded-full bg-cream-soft/10 text-cream-soft transition-colors hover:bg-cream-soft/25"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </button>

      <div className="flex min-h-full flex-col items-center justify-center gap-5 px-5 pb-8 pt-2">
      <div key={entry.key} className="flex w-full justify-center">
        {/* `seed` is the card's place in the set, which is what gives each one
            its own angle into the foil. */}
        <HoloCard
          seed={index}
          onSwipe={(delta) => go(index + delta)}
          className="w-full max-w-[21rem]"
        >
          <Card entry={entry} number={index + 1} total={total} />
        </HoloCard>
      </div>

      {/* The dots are the progress meter and the way round the set — which is
          why this has no arrows on it. */}
      <div className="flex flex-col items-center gap-3">
        <ul className="flex flex-wrap justify-center gap-2">
          {roster.map((t, i) => {
            const team = TEAMS[t.key];
            const read = collected.has(t.key);
            return (
              <li key={t.key}>
                <button
                  type="button"
                  onClick={() => onNavigate(i)}
                  aria-label={`${team.name}${read ? ", read" : ", not read yet"}`}
                  aria-current={i === index ? "true" : undefined}
                  className={cx(
                    "grid h-7 w-7 place-items-center rounded-full border-2 ring-1 ring-cream-soft/20 transition-[transform,border-color]",
                    i === index ? "scale-110 border-cream-soft" : "border-transparent hover:scale-110"
                  )}
                  style={{ background: read ? team.raw : "transparent", boxShadow: read ? "none" : `inset 0 0 0 2px ${team.raw}` }}
                >
                  {read && <Check className="h-3.5 w-3.5 text-cream-soft" strokeWidth={3} />}
                </button>
              </li>
            );
          })}
        </ul>

        <Meta className={done ? "text-green-bright" : "text-cream-soft/45"}>
          {done ? "set complete" : `${collected.size} of ${total} read`}
        </Meta>

        {/* Explanatory, not decorative (CLAUDE.md §3.7) — the gesture is not
            discoverable on its own. */}
        <Meta className="text-center text-cream-soft/35">
          drag a card sideways for the next one
        </Meta>
      </div>

      </div>

      {celebrating && <Celebration roster={roster} onDone={onCelebrated} />}
    </div>,
    document.body
  );
}
