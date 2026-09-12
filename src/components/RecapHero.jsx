import { ArrowRight } from "lucide-react";
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
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:px-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Text side */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-green">Recaps</p>
            <h1 className="mt-4 text-[13vw] font-semibold leading-[0.92] tracking-tight sm:text-6xl lg:text-7xl">
              Monthly
              <br />
              <span className="font-accent italic text-green">recaps.</span>
            </h1>
            <p className="mt-6 max-w-md text-xl text-ink-soft">
              A month at a time. Projects, people, progress.
            </p>
            <p className="mt-3 max-w-md text-ink-soft">
              A look inside everything AquaTerra has been working on — one
              editorial issue for every month since the beginning.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`#${latestEdition.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-medium text-cream-soft shadow-[0_2px_0_0_var(--color-green-deep)] transition-transform hover:-translate-y-0.5"
              >
                Latest edition
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </a>
              <a
                href="#about-recaps"
                className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink/40"
              >
                About the recaps
              </a>
            </div>

            <div className="mt-8 max-w-md">
              <LatestNotice />
            </div>
          </div>

          {/* Collage side */}
          <div className="relative">
            <div className="grid h-[460px] grid-cols-6 grid-rows-6 gap-3 sm:h-[420px]">
              <div className="col-span-4 row-span-4 overflow-hidden rounded-3xl">
                <Photo item={collage[0]} />
              </div>
              <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl">
                <Photo item={collage[1]} />
              </div>
              <div className="col-span-2 row-span-3 overflow-hidden rounded-2xl">
                <Photo item={collage[2]} />
              </div>
              <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl">
                <Photo item={collage[3]} />
              </div>
              <div className="col-span-3 row-span-2 overflow-hidden rounded-2xl">
                <Photo item={collage[4]} />
              </div>
            </div>
            <p className="font-hand absolute -left-3 -top-5 hidden -rotate-6 text-2xl text-green-deep sm:block">
              same people.
            </p>
            <p className="font-hand absolute -bottom-6 -right-2 hidden rotate-3 text-2xl text-green-deep sm:block">
              bigger stories.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
