import AnimatedNumber from "./AnimatedNumber";
import Section from "./Section";
import { Meta } from "./Lockup";
import { AQ_TOTALS } from "../data/editions";
import { cx } from "../lib/utils";

// AquaTerra's running totals, on the archive page. These are the organisation's
// numbers rather than any one month's — the issues underneath count the months.
//
// Every figure is verified (CLAUDE.md §2) and lives in editions.js beside the
// rest of the facts, not here.
const TONE = {
  green: "text-green-bright",
  blue: "text-team-events",
  yellow: "text-team-shikshaq",
  pink: "text-team-hr",
  lavender: "text-team-social",
};

export default function HeadlineNumbers() {
  return (
    <Section id="numbers" className="max-w-6xl">
      <div className="overflow-hidden rounded-[2rem] bg-ink px-6 py-10 text-cream-soft sm:px-10 sm:py-14 lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2 className="u-display text-(length:--text-display-m) text-cream-soft">
            THE RUNNING <em className="font-accent lowercase italic text-green-bright">total</em>
            <span aria-hidden="true">.</span>
          </h2>
          <Meta className="text-cream-soft/45">Since June 2021</Meta>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
          {AQ_TOTALS.map((stat) => (
            <div key={stat.label} className="border-t border-cream-soft/15 pt-4">
              <dd className={cx("font-display text-[clamp(2rem,6vw,3rem)] font-bold leading-none tracking-[-0.03em]", TONE[stat.tone])}>
                <AnimatedNumber value={stat.value} />
              </dd>
              <dt className="mt-2.5"><Meta className="text-cream-soft/60">{stat.label}</Meta></dt>
            </div>
          ))}
        </dl>

        <p className="mt-10 max-w-xl text-pretty text-cream-soft/60">
          not one month&apos;s work. everything AquaTerra has counted since sixteen students
          started it in Kolkata. the issues below are where the months get written down.
        </p>
      </div>
    </Section>
  );
}
