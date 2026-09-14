import { ArrowDown, Info } from "lucide-react";
import Photo from "./Photo";
import LatestNotice from "./LatestNotice";
import { editionList } from "../data/editions";

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
          {/* Text side */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green">Recaps</p>
            <h1 className="mt-4 text-[clamp(2.75rem,11vw,5.25rem)] font-semibold leading-[0.92] tracking-tight">
              Monthly
              <br />
              <span className="font-accent italic text-green">recaps.</span>
            </h1>
            <p className="mt-6 max-w-md text-balance text-xl text-ink-soft sm:text-2xl">
              A month at a time. Projects, people, progress.
            </p>
            <p className="mt-3 max-w-md text-pretty text-ink-soft">
              A look inside everything AquaTerra has been working on — one
              editorial issue for every month since the beginning.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#archive"
                className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-semibold text-cream-soft shadow-[0_2px_0_0_var(--color-green-deep)] transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Browse all {editionList.length} editions
                <ArrowDown className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="#about-recaps"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-cream-soft"
              >
                <Info className="h-4 w-4" strokeWidth={1.75} />
                About the recaps
              </a>
            </div>
          </div>

          {/* Collage side — aspect-driven rather than a fixed pixel height, so
              the tiles keep their proportions from 320px up to desktop. */}
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
            <p className="pointer-events-none absolute -left-2 -top-5 hidden -rotate-6 font-hand text-2xl text-green-deep lg:block">
              same people.
            </p>
            <p className="pointer-events-none absolute -bottom-6 -right-1 hidden rotate-3 font-hand text-2xl text-green-deep lg:block">
              bigger stories.
            </p>
          </div>
        </div>

        <div className="mt-12 sm:mt-14">
          <LatestNotice />
        </div>
      </div>
    </header>
  );
}
