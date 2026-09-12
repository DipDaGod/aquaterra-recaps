import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NextEdition({ next, prevYear }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <div className="rounded-[2rem] border border-line bg-pastel-yellow/60 p-8 text-center sm:p-14">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink-soft">What's next?</p>

        {next ? (
          <>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {next.month} {next.year} is already taking shape.
            </h2>
            <Link
              to={`/recaps/${next.year}/${next.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-medium text-cream-soft transition-transform hover:-translate-y-0.5"
            >
              Explore {next.month}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </>
        ) : (
          <>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Next edition is still being written.
            </h2>
            <p className="mt-3 text-ink-soft">Check back once the month wraps up.</p>
            <span className="mt-8 inline-flex cursor-not-allowed items-center gap-2 rounded-full bg-ink/10 px-6 py-3 text-sm font-medium text-ink/40">
              Coming soon
            </span>
          </>
        )}

        <div className="mt-6">
          <Link to="/recaps" className="inline-flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            All editions
          </Link>
        </div>
      </div>
    </section>
  );
}
