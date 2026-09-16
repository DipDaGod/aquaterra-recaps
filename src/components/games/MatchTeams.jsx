import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { TEAMS, cx } from "../../lib/utils";
import { Meta } from "../Lockup";

// MATCH — tap a team, then tap what it does. A correct pair locks in that
// team's own colour, so finishing leaves the full palette on screen, and
// leaves behind one more line of that team's own published detail — the
// clue says what the team does, the reveal says how many people do it.
//
// Both columns are shuffled. With the teams in a fixed order the board could
// be solved top-down off the teams section further up the page.
//
// Tap-to-pair rather than drag-and-drop: it works identically with a mouse, a
// thumb and a keyboard.
function shuffle(xs) {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MatchTeams({ pairs }) {
  const [clues, setClues] = useState(() => shuffle(pairs));
  const [order, setOrder] = useState(() => shuffle(pairs));
  const [pickedTeam, setPickedTeam] = useState(null);
  const [matched, setMatched] = useState(() => new Set());
  const [wrong, setWrong] = useState(null);
  const [last, setLast] = useState(null);
  const [tries, setTries] = useState(0);
  const wrongTimer = useRef(0);

  useEffect(() => () => clearTimeout(wrongTimer.current), []);

  const complete = matched.size === pairs.length;

  function tapTeam(key) {
    if (matched.has(key)) return;
    setWrong(null);
    setPickedTeam((cur) => (cur === key ? null : key));
  }

  function tapClue(key) {
    if (matched.has(key) || !pickedTeam) return;
    setTries((t) => t + 1);
    if (pickedTeam === key) {
      setMatched((m) => new Set(m).add(key));
      setPickedTeam(null);
      setWrong(null);
      setLast(key);
    } else {
      setWrong(key);
      setPickedTeam(null);
      clearTimeout(wrongTimer.current);
      wrongTimer.current = setTimeout(() => setWrong((w) => (w === key ? null : w)), 600);
    }
  }

  function restart() {
    clearTimeout(wrongTimer.current);
    setClues(shuffle(pairs)); setOrder(shuffle(pairs)); setPickedTeam(null);
    setMatched(new Set()); setWrong(null); setLast(null); setTries(0);
  }

  if (complete) {
    const perfect = tries === pairs.length;
    return (
      <div className="rise-in py-10 text-center">
        <Meta className="text-cream-soft/50">All {pairs.length} matched</Meta>
        <p className="mt-4 font-display text-6xl font-bold tabular-nums text-cream-soft sm:text-7xl">
          {tries}<span className="text-cream-soft/40"> taps</span>
        </p>
        <p className="mx-auto mt-4 max-w-sm text-pretty text-cream-soft/70">
          {perfect ? "not one miss. show-off."
            : `${pairs.length} teams, ${tries} tries. the perfect run is ${pairs.length}.`}
        </p>
        <p className="mx-auto mt-5 max-w-md text-pretty text-sm text-cream-soft/55">
          five volunteer teams, three student businesses. that is the whole org.
        </p>
        <div className="mx-auto mt-7 flex max-w-md flex-wrap justify-center gap-2">
          {pairs.map(({ team }) => {
            const t = TEAMS[team];
            return (
              <span key={team} className={cx("rounded-full px-3 py-1.5 font-mono text-xs tracking-[0.08em]", t.bg, t.on)}>
                {t.name}
              </span>
            );
          })}
        </div>
        <button
          type="button"
          onClick={restart}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-soft px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2} />
          Shuffle and go again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Meta className="text-cream-soft/50">{matched.size} of {pairs.length} matched</Meta>
        <Meta className="tabular-nums text-cream-soft/40">{tries} taps</Meta>
      </div>

      <p className="mt-6 min-h-10 text-pretty text-sm text-cream-soft/70">
        {pickedTeam ? (
          `now tap what ${TEAMS[pickedTeam].name} actually does.`
        ) : last ? (
          <span key={last} className="rise-in inline-block">
            <span className="font-semibold text-cream-soft">{TEAMS[last].name} — </span>
            {pairs.find((x) => x.team === last)?.then}
          </span>
        ) : (
          "tap a team, then tap what it does."
        )}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-5">
        <ul className="flex flex-col gap-2">
          {order.map(({ team }) => {
            const t = TEAMS[team];
            const isMatched = matched.has(team);
            const isPicked = pickedTeam === team;
            return (
              <li key={team}>
                <button
                  type="button"
                  onClick={() => tapTeam(team)}
                  disabled={isMatched}
                  aria-pressed={isPicked}
                  className={cx(
                    "w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors",
                    isMatched && cx(t.bg, t.on, "border-transparent"),
                    !isMatched && isPicked && "border-cream-soft bg-cream-soft/15 text-cream-soft",
                    !isMatched && !isPicked && "border-cream-soft/20 text-cream-soft/85 hover:border-cream-soft/60 hover:bg-cream-soft/10"
                  )}
                >
                  {t.name}
                </button>
              </li>
            );
          })}
        </ul>

        <ul className="flex flex-col gap-2">
          {clues.map(({ team, clue }) => {
            const t = TEAMS[team];
            const isMatched = matched.has(team);
            const isWrong = wrong === team;
            return (
              <li key={team}>
                <button
                  type="button"
                  onClick={() => tapClue(team)}
                  disabled={isMatched || !pickedTeam}
                  className={cx(
                    "w-full rounded-xl border px-4 py-3 text-left text-sm leading-snug transition-colors",
                    isMatched && cx(t.bg, t.on, "border-transparent font-medium"),
                    !isMatched && isWrong && "border-coral bg-coral/15 text-cream-soft",
                    !isMatched && !isWrong && pickedTeam && "border-cream-soft/20 text-cream-soft/85 hover:border-cream-soft/60 hover:bg-cream-soft/10",
                    !isMatched && !isWrong && !pickedTeam && "border-cream-soft/10 text-cream-soft/40"
                  )}
                >
                  {clue}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
