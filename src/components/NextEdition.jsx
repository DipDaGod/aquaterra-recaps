import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import Section from "./Section";
import Lockup, { Meta } from "./Lockup";

function NeighbourLink({ edition, direction }) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ArrowLeft : ArrowRight;

  return (
    <Link
      to={`/${edition.year}/${edition.slug}`}
      rel={isPrev ? "prev" : "next"}
      className="group flex flex-1 items-center gap-4 rounded-2xl border border-line bg-cream-soft p-5 text-left shadow-(--shadow-card) transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-green/40 hover:shadow-(--shadow-card-hover)"
    >
      {isPrev && (
        <Icon className="h-4 w-4 shrink-0 text-ink-soft transition-colors group-hover:text-green" strokeWidth={2} />
      )}
      <span className="min-w-0 flex-1">
        <Meta className="block text-ink-soft">
          {isPrev ? "Previous edition" : "Next edition"}
        </Meta>
        <span className="mt-1 block truncate text-xl font-semibold tracking-tight">
          {edition.month} {edition.year}
        </span>
      </span>
      {!isPrev && (
        <Icon className="h-4 w-4 shrink-0 text-ink-soft transition-colors group-hover:text-green" strokeWidth={2} />
      )}
    </Link>
  );
}

export default function NextEdition({ prev, next }) {
  return (
    <Section>
      <div className="rounded-[2rem] border border-line bg-tint-yellow/70 p-6 sm:p-10 lg:p-14">
        <div className="text-center">
          <Meta className="text-ink-soft">What&apos;s next</Meta>

          {next ? (
            <Lockup
              caps={`${next.month.toUpperCase()} ${next.year} IS ALREADY`}
              accent="taking shape"
              spotlight
              className="mt-4 text-3xl sm:text-4xl"
            />
          ) : (
            <>
              <Lockup
                caps="THE NEXT ISSUE IS STILL BEING"
                accent="written"
                spotlight
                className="mt-4 text-3xl sm:text-4xl"
              />
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-ink-soft">
                <Clock className="h-4 w-4" strokeWidth={1.75} />
                issues go up once the month wraps.
              </p>
            </>
          )}
        </div>

        {(prev || next) && (
          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
            {prev && <NeighbourLink edition={prev} direction="prev" />}
            {next && <NeighbourLink edition={next} direction="next" />}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-cream-soft"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back to all editions
          </Link>
        </div>
      </div>
    </Section>
  );
}
