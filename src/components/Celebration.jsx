import { useMemo } from "react";
import Mascot from "./Mascot";
import Takeover from "./Takeover";
import { Meta } from "./Lockup";
import { TEAMS } from "../lib/utils";

// Reading all eight cards takes over the screen. It fires once, at the moment
// the last one is opened — not every time the set happens to be complete.
//
// There is no prize behind it and there shouldn't be: AquaTerra doesn't offer
// one, and a fake reward on a real NGO's site is the same mistake as a fake
// statistic. What you get is the full palette in one place and the site's own
// line about what to do next.
//
// The scrim and the confetti live in <Takeover>, shared with the ghost egg, so
// the site's two "that was worth doing" moments cannot drift apart.
export default function Celebration({ roster, onDone }) {
  const colours = useMemo(() => roster.map((t) => TEAMS[t.key].raw), [roster]);

  return (
    <Takeover colours={colours} className="absolute z-20">
      <ul className="flex flex-wrap justify-center gap-2">
        {roster.map((entry, i) => (
          <li
            key={entry.key}
            className="story-pop h-8 w-8 rounded-full ring-1 ring-cream-soft/25"
            style={{ background: TEAMS[entry.key].raw, "--i": i }}
            title={TEAMS[entry.key].name}
          />
        ))}
      </ul>

      <h3 className="stamp u-display mt-8 text-[clamp(2.5rem,13vw,4.5rem)] leading-[0.9] text-cream-soft" style={{ animationDelay: "260ms" }}>
        EIGHT FOR <em className="font-accent lowercase italic text-green-bright">eight</em>
        <span aria-hidden="true">.</span>
      </h3>

      <p className="fade-up mt-5 text-pretty text-lg leading-snug text-cream-soft/75" style={{ "--i": 6 }}>
        that&apos;s every team AquaTerra has. five run on volunteers, three are
        student businesses.
      </p>

      <p className="fade-up mt-6 flex items-center justify-center gap-3 text-pretty text-xl font-semibold text-cream-soft" style={{ "--i": 7 }}>
        <Mascot className="h-8 w-8 shrink-0" color="var(--color-green-bright)" />
        pick a team, show up, and get to work.
      </p>

      <button
        type="button"
        onClick={onDone}
        autoFocus
        className="fade-up mt-9 inline-flex items-center gap-2 rounded-full bg-cream-soft px-7 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
        style={{ "--i": 8 }}
      >
        <Meta>Back to the cards</Meta>
      </button>
    </Takeover>
  );
}
