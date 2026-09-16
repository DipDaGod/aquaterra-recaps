import { useState } from "react";
import { Scale, Gauge, Shapes } from "lucide-react";
import Section from "./Section";
import { Meta } from "./Lockup";
import Bigger from "./games/Bigger";
import HowClose from "./games/HowClose";
import MatchTeams from "./games/MatchTeams";
import { cx } from "../lib/utils";

// Three games rather than one quiz, each with a different interaction: tap to
// compare, drag to estimate, pair to learn. Every figure they use is verified
// (CLAUDE.md §2) — a game whose answers are invented is rule 0 with a
// scoreboard. No backend, no sign-up: state is local and nothing is sent.
const GAMES = [
  { id: "bigger", name: "Bigger?", icon: Scale, blurb: "two figures, drawn close together. tap the larger one.",
    available: (g) => g.bigger?.length >= 2 },
  { id: "close", name: "How close?", icon: Gauge, blurb: "four rounds, drawn at random. drag to where the real number sits.",
    available: (g) => g.guess?.length > 0 },
  { id: "match", name: "Match the teams", icon: Shapes, blurb: "eight teams, eight jobs, both columns shuffled. pair them up.",
    available: (g) => g.match?.length > 0 },
];

export default function MiniGames({ edition, index, label, accentKey, variant, ground, size }) {
  const games = edition.games;
  const playable = GAMES.filter((g) => games && g.available(games));
  const [active, setActive] = useState(playable[0]?.id);

  if (playable.length === 0) return null;

  const current = playable.find((g) => g.id === active) || playable[0];

  return (
    <Section
      id="games"
      index={index}
      label={label}
      accentKey={accentKey}
      variant={variant}
      ground={ground}
      size={size}
      caps={games.lockup?.caps}
      accent={games.lockup?.accent}
      lead={games.lead}
      aside={`${playable.length} games`}
    >
      <div
        role="tablist"
        aria-label="Choose a game"
        className="mx-auto flex max-w-2xl flex-wrap justify-center gap-2"
      >
        {playable.map((g) => {
          const Icon = g.icon;
          const on = g.id === current.id;
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(g.id)}
              className={cx(
                "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                on
                  ? "bg-cream-soft text-ink"
                  : "border border-cream-soft/20 text-cream-soft/70 hover:border-cream-soft/50 hover:text-cream-soft"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {g.name}
            </button>
          );
        })}
      </div>

      <p key={current.id} className="fade-in mt-4 text-center">
        <Meta className="text-cream-soft/45">{current.blurb}</Meta>
      </p>

      {/* Keyed on the game id, so switching resets rather than carrying a
          half-finished round across — and so the panel rises in rather than
          cutting to the next game. */}
      <div
        key={current.id}
        className="rise-in mx-auto mt-7 max-w-3xl rounded-[2rem] border border-cream-soft/15 bg-cream-soft/[0.04] px-5 py-7 sm:px-8 sm:py-9"
      >
        {current.id === "bigger" && <Bigger key="bigger" pool={games.bigger} />}
        {current.id === "close" && <HowClose key="close" rounds={games.guess} />}
        {current.id === "match" && <MatchTeams key="match" pairs={games.match} />}
      </div>
    </Section>
  );
}
