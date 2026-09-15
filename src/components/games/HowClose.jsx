import { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { cx } from "../../lib/utils";
import { Meta } from "../Lockup";

// HOW CLOSE? — drag the slider to where the real figure sits. The reveal draws
// your guess and the truth on the same track, so you can see by how much you
// were out and which side you were on.
//
// A run is four rounds drawn from the pool rather than the whole pool in
// order: the second go is a different set of questions, which is the only
// reason to have a second go.
const PER_RUN = 4;

function pickRounds(pool) {
  const a = [...pool];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, Math.min(PER_RUN, a.length));
}

const pct = (v, max) => Math.max(0, Math.min(100, (v / max) * 100));

export default function HowClose({ rounds: pool }) {
  const [rounds, setRounds] = useState(() => pickRounds(pool));
  const [step, setStep] = useState(0);
  const [value, setValue] = useState(() => Math.round(rounds[0].max / 2));
  const [locked, setLocked] = useState(false);
  const [scores, setScores] = useState([]);
  const [done, setDone] = useState(false);

  const round = rounds[step];
  const isLast = step === rounds.length - 1;
  const offBy = Math.abs(value - round.value);
  const accuracy = Math.max(0, 100 - (offBy / round.max) * 100);

  function lock() {
    if (locked) return;
    setLocked(true);
    setScores((s) => [...s, accuracy]);
  }

  function next() {
    if (isLast) { setDone(true); return; }
    const n = step + 1;
    setStep(n);
    setValue(Math.round(rounds[n].max / 2));
    setLocked(false);
  }

  // A fresh draw, so playing again asks different questions.
  function restart() {
    const fresh = pickRounds(pool);
    setRounds(fresh); setStep(0); setValue(Math.round(fresh[0].max / 2));
    setLocked(false); setScores([]); setDone(false);
  }

  if (done) {
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const best = Math.round(Math.max(...scores));
    return (
      <div className="py-10 text-center">
        <Meta className="text-cream-soft/50">Average accuracy</Meta>
        <p className="mt-4 font-display text-6xl font-bold tabular-nums text-cream-soft sm:text-7xl">
          {avg}<span className="text-cream-soft/40">%</span>
        </p>
        <p className="mx-auto mt-4 max-w-sm text-pretty text-cream-soft/70">
          {avg >= 95 ? "that is either close reading or a very good day."
            : avg >= 85 ? "you have been reading the footnotes."
            : avg >= 65 ? "close enough to be suspicious."
            : "the bananas get everyone."}
        </p>
        <Meta className="mt-3 block text-cream-soft/40">Best round {best}%</Meta>
        <button
          type="button"
          onClick={restart}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-soft px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2} />
          Play again, new questions
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Meta className="text-cream-soft/50">Round {step + 1} of {rounds.length}</Meta>
        {locked && <Meta className="tabular-nums text-cream-soft/50">{Math.round(accuracy)}% close</Meta>}
      </div>

      <p className="mt-6 max-w-2xl text-balance text-xl font-semibold leading-snug text-cream-soft sm:text-2xl">
        {round.prompt}
      </p>

      <p className="mt-8 text-center font-display text-5xl font-bold tabular-nums text-cream-soft sm:text-6xl">
        {locked ? round.display : value.toLocaleString()}
      </p>

      <div className="relative mt-8">
        <input
          type="range"
          min={0}
          max={round.max}
          step={round.step}
          value={value}
          disabled={locked}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label={round.prompt}
          className="w-full accent-[var(--color-green-bright)] disabled:opacity-60"
        />

        {locked && (
          <div className="relative mt-5 h-2 w-full rounded-full bg-cream-soft/15">
            <span
              className="absolute top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-cream-soft/60"
              style={{ left: `${pct(value, round.max)}%` }}
            />
            <span
              className="absolute top-1/2 h-5 w-1.5 -translate-y-1/2 rounded-full bg-green-bright"
              style={{ left: `${pct(round.value, round.max)}%` }}
            />
          </div>
        )}
        {locked && (
          <div className="mt-2 flex justify-between">
            <Meta className="text-cream-soft/40">Your guess {value.toLocaleString()}</Meta>
            <Meta className="text-green-bright">Actual {round.display}</Meta>
          </div>
        )}
      </div>

      <div className="mt-7 flex min-h-12 flex-wrap items-center justify-between gap-4" aria-live="polite">
        <p className="max-w-lg text-pretty text-sm text-cream-soft/70">
          {locked && (
            <>
              <span className="font-semibold text-cream-soft">
                {offBy === 0
                  ? "exactly right. "
                  : `off by ${offBy.toLocaleString()}, ${value > round.value ? "over" : "under"}. `}
              </span>
              {round.note}
            </>
          )}
        </p>
        <button
          type="button"
          onClick={locked ? next : lock}
          className={cx(
            "inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 active:translate-y-0",
            locked ? "bg-cream-soft text-ink" : "bg-green-bright text-ink"
          )}
        >
          {locked ? (isLast ? "See result" : "Next") : "Lock it in"}
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
