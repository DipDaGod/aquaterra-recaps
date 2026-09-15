import { useCallback, useMemo, useState } from "react";
import { Check, X, Flame, RotateCcw } from "lucide-react";
import { cx } from "../../lib/utils";
import { Meta } from "../Lockup";

// BIGGER? — two figures, tap the larger one. Fast, and it gets its pull from
// the streak rather than from a question count: there is no end, only the run
// you're on. Pairs are drawn at random and never share a value, so there is
// always a right answer.
function drawPair(pool, exclude) {
  const options = pool.filter((s) => s.label !== exclude);
  for (let i = 0; i < 40; i++) {
    const a = options[Math.floor(Math.random() * options.length)];
    const b = options[Math.floor(Math.random() * options.length)];
    if (a.label !== b.label && a.value !== b.value) return [a, b];
  }
  return [pool[0], pool[1]];
}

export default function Bigger({ pool }) {
  const [pair, setPair] = useState(() => drawPair(pool));
  const [picked, setPicked] = useState(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  const answered = picked !== null;
  const winner = useMemo(() => (pair[0].value > pair[1].value ? 0 : 1), [pair]);
  const right = answered && picked === winner;

  const choose = useCallback((i) => {
    if (answered) return;
    setPicked(i);
    if (i === winner) {
      setStreak((s) => { const n = s + 1; setBest((b) => Math.max(b, n)); return n; });
    } else {
      setStreak(0);
    }
  }, [answered, winner]);

  function next() {
    setPair(drawPair(pool, pair[winner].label));
    setPicked(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Meta className="inline-flex items-center gap-2 text-cream-soft/60">
          <Flame className={cx("h-3.5 w-3.5", streak > 0 ? "text-team-ventures" : "text-cream-soft/30")} strokeWidth={2.5} />
          Streak {streak}
        </Meta>
        <Meta className="text-cream-soft/40">Best {best}</Meta>
      </div>

      <p className="mt-6 text-center text-lg font-semibold text-cream-soft/90">
        which number is bigger?
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {pair.map((stat, i) => {
          const isWinner = i === winner;
          return (
            <button
              key={stat.label}
              type="button"
              onClick={() => choose(i)}
              disabled={answered}
              className={cx(
                "group relative flex min-h-44 flex-col items-center justify-center gap-2 rounded-2xl border px-5 py-8 text-center transition-colors",
                !answered && "border-cream-soft/20 hover:border-cream-soft/60 hover:bg-cream-soft/10",
                answered && isWinner && "border-green-bright bg-green-bright/15",
                answered && !isWinner && "border-cream-soft/10 opacity-50"
              )}
            >
              {answered ? (
                <span className="font-display text-4xl font-bold tabular-nums text-cream-soft sm:text-5xl">
                  {stat.display}
                </span>
              ) : (
                <span aria-hidden="true" className="font-display text-4xl font-bold text-cream-soft/25 sm:text-5xl">
                  ?
                </span>
              )}
              <span className="text-pretty text-sm text-cream-soft/70">{stat.label}</span>
              {answered && i === picked && (
                <span className="absolute right-3 top-3">
                  {right ? (
                    <Check className="h-5 w-5 text-green-bright" strokeWidth={2.5} />
                  ) : (
                    <X className="h-5 w-5 text-coral" strokeWidth={2.5} />
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex min-h-12 flex-wrap items-center justify-between gap-4" aria-live="polite">
        <p className="text-sm text-cream-soft/70">
          {answered && (
            <span className={cx("font-semibold", right ? "text-green-bright" : "text-coral")}>
              {right ? `right — that's ${streak} in a row.` : "nope. streak back to zero."}
            </span>
          )}
        </p>
        {answered && (
          <button
            type="button"
            onClick={next}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cream-soft px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {right ? "Keep going" : <>Try again <RotateCcw className="h-4 w-4" strokeWidth={2} /></>}
          </button>
        )}
      </div>
    </div>
  );
}
