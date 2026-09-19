import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Lockup, { Meta } from "./Lockup";
import Photo from "./Photo";
import LatestNotice from "./LatestNotice";
import { latestEdition } from "../data/editions";

const collage = [
  { tone: "green", icon: "Users", label: "[Students at a drive]" },
  { tone: "yellow", icon: "TreePine", label: "[Plantation day]" },
  { tone: "blue", icon: "HeartHandshake", label: "[Community visit]" },
  { tone: "lavender", icon: "Camera", label: "[Candid moment]" },
  { tone: "cream", icon: "GraduationCap", label: "[Classroom session]" },
];

export default function RecapHero() {
  return (
    <header className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pb-14 sm:pt-16 lg:px-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16">
          <div>
            <Meta className="block text-green">The magazine</Meta>
            <Lockup
              as="h1"
              caps="MONTHLY"
              accent="recaps"
              spotlight
              className="mt-4 text-[clamp(2.75rem,11vw,5.25rem)]"
            />
            <p className="mt-6 max-w-md text-balance text-xl text-ink-soft sm:text-2xl">
              started in Kolkata. got out of hand.
            </p>
            <p className="mt-3 max-w-md text-pretty text-ink-soft">
              one issue a month: the drives, the teams, the student businesses,
              the photography, and three games you will probably lose.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to={`/${latestEdition.year}/${latestEdition.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-semibold text-cream-soft shadow-[0_2px_0_0_var(--color-green-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Read edition {String(latestEdition.editionNumber).padStart(2, "0")}
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
              <a
                href="#archive"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-cream-soft"
              >
                All editions
                <ArrowDown className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Aspect-driven rather than a fixed height, so the tiles keep
              their proportions from 320px up. */}
          <div className="relative">
            <div className="grid aspect-[5/4] grid-cols-6 grid-rows-6 gap-2.5 sm:gap-3">
              <div className="col-span-4 row-span-4 overflow-hidden rounded-3xl">
                <Photo item={collage[0]} />
              </div>
              <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl">
                <Photo item={collage[1]} />
              </div>
              <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl">
                <Photo item={collage[2]} />
              </div>
              <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl">
                <Photo item={collage[3]} />
              </div>
              <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl">
                <Photo item={collage[4]} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-14">
          <LatestNotice />
        </div>
      </div>
    </header>
  );
}
