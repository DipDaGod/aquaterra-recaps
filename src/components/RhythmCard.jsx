import { Clock } from "lucide-react";
import { Meta } from "./Lockup";
import { COMING_YEARS, editionList, isUpcoming } from "../data/editions";

// Sits as the last cell of the archive grid. It fills whatever gap the issue
// count leaves in the last row, and answers the question a thin archive raises
// on its own: is this thing still going?
//
// `self-start` so it hugs its content rather than stretching to match the issue
// card beside it and leaving a hole in the middle.
export default function RhythmCard() {
  const next = editionList.find(isUpcoming);
  const soon = COMING_YEARS[0];

  return (
    <div className="flex flex-col self-start rounded-3xl border border-line bg-paper/60 p-6 sm:p-7">
      <div>
        <span className="inline-flex items-center gap-2 text-ink-soft">
          <Clock className="h-4 w-4" strokeWidth={1.75} />
          <Meta>The rhythm</Meta>
        </span>
        <p className="mt-4 text-pretty text-lg leading-snug text-ink">
          one issue a month, up once the month has wrapped.
        </p>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-ink-soft">
          {next
            ? `edition ${String(next.editionNumber).padStart(2, "0")} is being written now — it is readable, but the copy in it is still placeholder.`
            : "the next one goes up at the end of this month."}
        </p>
      </div>

      <dl className="mt-6 border-t border-line pt-4">
        <dt><Meta className="text-ink-3">Coming</Meta></dt>
        <dd className="mt-1.5 text-pretty text-sm text-ink-soft">
          {soon} hasn&apos;t happened yet. it fills in one month at a time.
        </dd>
      </dl>
    </div>
  );
}
