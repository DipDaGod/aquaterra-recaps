import { Link } from "react-router-dom";
import Mascot from "./Mascot";
import { latestEdition } from "../data/editions";

export default function LatestNotice() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-near-black px-7 py-7 text-cream-soft sm:px-9 sm:py-8">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-cream-soft/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-cream-soft/70">
          Edition {String(latestEdition.editionNumber).padStart(2, "0")}
        </span>
        <Mascot className="h-9 w-9 shrink-0" color="var(--color-green-bright)" />
      </div>

      <p className="mt-5 max-w-sm text-2xl font-semibold leading-snug sm:text-3xl">
        {latestEdition.month} is live.{" "}
        <span className="font-accent italic text-gold">{latestEdition.tagline}</span>
      </p>

      <Link
        to={`/${latestEdition.year}/${latestEdition.slug}`}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream-soft px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
      >
        Read the issue
      </Link>
    </div>
  );
}
