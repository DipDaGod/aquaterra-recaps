import { useState } from "react";
import { Check, X, RotateCcw, ArrowRight } from "lucide-react";
import Section from "./Section";
import { Meta } from "./Lockup";
import { cx } from "../lib/utils";

// A playable quiz, no backend and no sign-up: state lives in the component,
// nothing is stored, nothing is sent. Every answer is a verified AquaTerra
// figure (aq.md §2) — a quiz whose answers are invented would be the rule-0
// violation with a scoreboard attached.
export default function MiniGames({ edition, index, label, accentKey, variant, ground, size }) {
  const games = edition.games;
  const quiz = games?.quiz || [];

  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  if (quiz.length === 0) return null;

  const q = quiz[step];
  const isLast = step === quiz.length - 1;
  const answered = picked !== null;
  const correct = answered && picked === q.answer;

  function choose(i) {
    if (answered) return;
    setPicked(i);
    if (i === q.answer) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) { setDone(true); return; }
    setStep((s) => s + 1);
    setPicked(null);
  }

  function restart() {
    setStep(0); setPicked(null); setScore(0); setDone(false);
  }

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
      aside={`${quiz.length} questions`}
    >

      <div className="overflow-hidden rounded-[2rem] border border-cream-soft/15 bg-cream-soft/[0.04]">
        {done ? (
          <div className="px-6 py-14 text-center sm:px-10">
            <Meta className="text-cream-soft/50">Your score</Meta>
            <p className="mt-4 font-display text-6xl font-bold tabular-nums sm:text-7xl">
              {score}
              <span className="text-cream-soft/40">/{quiz.length}</span>
            </p>
            <p className="mx-auto mt-4 max-w-sm text-pretty text-cream-soft/70">
              {score === quiz.length
                ? "every one. you have been paying attention."
                : score >= quiz.length / 2
                ? "solid. the rest is in the archive."
                : "worth a second run. none of this is a test."}
            </p>
            <button
              type="button"
              onClick={restart}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-soft px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={2} />
              Play again
            </button>
          </div>
        ) : (
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex items-center justify-between gap-4">
              <Meta className="text-cream-soft/50">
                Question {step + 1} of {quiz.length}
              </Meta>
              <Meta className="tabular-nums text-cream-soft/50">Score {score}</Meta>
            </div>

            {/* Progress through the quiz */}
            <div className="mt-3 flex gap-1.5" aria-hidden="true">
              {quiz.map((_, i) => (
                <span
                  key={i}
                  className={cx(
                    "h-1 flex-1 rounded-full transition-colors duration-300",
                    i < step ? "bg-green-bright" : i === step ? "bg-cream-soft/60" : "bg-cream-soft/15"
                  )}
                />
              ))}
            </div>

            <p className="mt-7 max-w-2xl text-balance text-2xl font-semibold leading-snug sm:text-3xl">
              {q.question}
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {q.options.map((opt, i) => {
                const isAnswer = i === q.answer;
                const isPicked = i === picked;
                return (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => choose(i)}
                      disabled={answered}
                      aria-pressed={isPicked}
                      className={cx(
                        "flex w-full items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-colors",
                        !answered && "border-cream-soft/20 hover:border-cream-soft/50 hover:bg-cream-soft/10",
                        answered && isAnswer && "border-green-bright bg-green-bright/15 text-cream-soft",
                        answered && isPicked && !isAnswer && "border-coral bg-coral/15 text-cream-soft",
                        answered && !isAnswer && !isPicked && "border-cream-soft/10 text-cream-soft/40"
                      )}
                    >
                      {opt}
                      {answered && isAnswer && <Check className="h-4 w-4 shrink-0 text-green-bright" strokeWidth={2.5} />}
                      {answered && isPicked && !isAnswer && <X className="h-4 w-4 shrink-0 text-coral" strokeWidth={2.5} />}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div
              className="mt-6 flex flex-wrap items-center justify-between gap-4"
              aria-live="polite"
            >
              <p className="max-w-lg text-pretty text-sm text-cream-soft/70">
                {answered && (
                  <>
                    <span className={cx("font-semibold", correct ? "text-green-bright" : "text-coral")}>
                      {correct ? "correct. " : "not quite. "}
                    </span>
                    {q.note}
                  </>
                )}
              </p>
              {answered && (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-cream-soft px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  {isLast ? "See score" : "Next"}
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
