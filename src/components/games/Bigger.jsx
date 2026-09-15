import { useCallback, useMemo, useState } from "react";
import { Check, X, Flame, RotateCcw } from "lucide-react";
import { cx } from "../../lib/utils";
import { Meta } from "../Lockup";

// BIGGER? — two figures, tap the larger one. No end, only the run you're on.
//
// The pool spans 1 to 15,000, so an unbiased draw mostly asks "is 15,000 more
// than 1", which is not a question. A pair is drawn from the closest band it
// can find instead: near-misses like 540+ against 570+, or the Collabs Team
// against ShikshAQ, are the ones worth getting right. Pairs never share a
// value, so there is always a right answer.
const NEAR = 6;

function drawPair(pool, exclude) {
  const options = pool.filter((s) => s.label !== exclude);
  let fallback = null;
  for (let i = 0; i < 60; i++) {
    const a = options[Math.floor(Math.random() * options.length)];
    const b = options[Math.floor(Math.random() * options.length)];
    if (a.label === b.label || a.value === b.value) continue;
    fallback ||= [a, b];
    if (Math.max(a.value, b.value) / Math.min(a.value, b.value) <= NEAR) return [a, b];
  }
  return fallback || [pool[0], pool[1]];
}

// How much bigger, in words. Derived from the two figures — never a claim the
// data doesn't already make. The two are often different kinds of thing, so
// it is "the other", never "as many".
function margin(hi, lo) {
  const ratio = hi.value / lo.value;
  if (ratio >= 1.8) return `about ${Math.round(ratio * 10) / 10}× the other.`;
  return `only ${(hi.value - lo.value).toLocaleString()} between them.`;
}

const MILESTONES = { 3: "three in a row.", 5: "five straight. you've been reading.", 10: "ten. the desk would like a word." };

export default function Bigger({ pool }) {
  const [pair, setPair] = useState(() => drawPair(pool));
  const [picked, setPicked] = useState(null);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  const answered = picked !== null;
  const winner = useMemo(() => (pair[0].value > pair[1].value ? 0 : 1), [pair]);
  const right = answered && picked === winner;
  const top = pair[winner];
  const other = pair[1 - winner];

  // Both updates are computed here rather than one being scheduled from inside
  // the other's updater — updaters must be pure, and StrictMode runs them twice.
  const choose = useCallback((i) => {
    if (answered) return;
    setPicked(i);
    if (i !== winner) { setStreak(0); return; }
    const next = streak + 1;
    setStreak(next);
    setBest((b) => Math.max(b, next));
  }, [answered, winner, streak]);

  function next() {
    setPair(drawPair(pool, top.label));
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

      {/* The reveal is the point of playing: the verdict, the margin between
          the two figures, and one verified line about the winner. */}
      <div className="mt-6 flex min-h-20 flex-wrap items-start justify-between gap-4" aria-live="polite">
        <div className="max-w-lg text-sm">
          {answered && (
            <>
              <p className={cx("font-semibold", right ? "text-green-bright" : "text-coral")}>
                {right ? (MILESTONES[streak] || `right. ${streak} in a row.`) : "not that one."}
              </p>
              <p className="mt-1.5 text-pretty text-cream-soft/70">
                <span className="text-cream-soft">{top.display}</span> {top.label}, against{" "}
                <span className="text-cream-soft">{other.display}</span> {other.label} —{" "}
                {margin(top, other)}
              </p>
              {top.note && (
                <p className="mt-1.5 text-pretty text-cream-soft/55">{top.note}</p>
              )}
            </>
          )}
        </div>
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
