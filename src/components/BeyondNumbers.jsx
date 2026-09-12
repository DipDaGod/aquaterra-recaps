import { ArrowRight } from "lucide-react";
import Photo from "./Photo";

export default function BeyondNumbers() {
  return (
    <section id="about-recaps" className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
      <div className="grid gap-10 rounded-[2rem] bg-pastel-green/60 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="order-2 overflow-hidden rounded-3xl lg:order-1 lg:aspect-[4/5]">
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
            <Photo item={{ tone: "cream", icon: "HeartHandshake", label: "[Volunteers, mid-drive]" }} />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Every month
            <br />
            <span className="font-accent italic text-green-deep">moves us closer.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-ink-soft">
            Real people. Real work. A better tomorrow.
          </p>
          <p className="mt-4 max-w-md text-ink-soft">
            Every recap is a snapshot of students showing up, again and again —
            for a river, a classroom, a neighbour who needed something done.
            None of it fits neatly into a spreadsheet, so we write it down instead.
          </p>
          <a
            href="https://www.ngoaquaterra.com/volunteer"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream-soft transition-transform hover:-translate-y-0.5"
          >
            Get involved
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
