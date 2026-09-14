import { ArrowUpRight } from "lucide-react";
import Photo from "./Photo";
import Section from "./Section";

export default function BeyondNumbers() {
  return (
    <Section id="about-recaps">
      <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-pastel-green/70 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-12">
        <div className="order-2 overflow-hidden rounded-3xl lg:order-1">
          <div className="aspect-[4/3] lg:aspect-[4/5]">
            <Photo item={{ tone: "cream", icon: "HeartHandshake", label: "[Volunteers, mid-drive]" }} />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-deep">
            About the recaps
          </p>
          <h2 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Every month
            <br />
            <span className="font-accent italic text-green-deep">moves us closer.</span>
          </h2>
          <p className="mt-5 max-w-md text-pretty text-lg text-ink-soft">
            Real people. Real work. A better tomorrow.
          </p>
          <p className="mt-4 max-w-md text-pretty text-ink-soft">
            Every recap is a snapshot of students showing up, again and again —
            for a river, a classroom, a neighbour who needed something done.
            None of it fits neatly into a spreadsheet, so we write it down instead.
          </p>
          <a
            href="https://www.ngoaquaterra.com/volunteer"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream-soft transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Get involved
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </Section>
  );
}
