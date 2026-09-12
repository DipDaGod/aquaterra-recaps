import { ArrowUpRight } from "lucide-react";
import Photo from "./Photo";

export default function InsideAquaterra({ edition }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Inside AquaTerra</h2>
      <p className="mt-2 max-w-md text-ink-soft">Teams, diaries, workshops and everything happening beyond the projects.</p>

      <div className="mt-8 flex flex-col gap-4">
        {edition.inside.map((item) => (
          <article
            key={item.title}
            className="group flex flex-col gap-5 rounded-3xl border border-line bg-cream-soft p-4 transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:p-5"
          >
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl sm:aspect-square sm:w-40 sm:shrink-0">
              <Photo item={item.image} />
            </div>
            <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-green">{item.meta}</span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-1 max-w-lg text-sm text-ink-soft">{item.description}</p>
              </div>
              <ArrowUpRight className="mt-3 h-5 w-5 shrink-0 text-ink-soft transition-colors group-hover:text-green sm:mt-0" strokeWidth={1.75} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
