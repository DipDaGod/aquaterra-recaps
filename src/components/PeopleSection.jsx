import { Quote, Star } from "lucide-react";
import Photo from "./Photo";

export default function PeopleSection({ edition }) {
  if (!edition.people?.length) return null;
  const [featured, ...rest] = edition.people;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">People behind the month</h2>
      <p className="mt-2 max-w-md text-ink-soft">A few of the volunteers who made {edition.month} happen.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Featured contributor gets the "member of the month" gold treatment */}
        <div className="rounded-3xl bg-gold p-5 text-ink">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em]">
            <Star className="h-3.5 w-3.5 fill-ink" strokeWidth={1.5} />
            Volunteer of the month
          </p>
          <div className="mt-4 aspect-square w-full overflow-hidden rounded-2xl border-2 border-ink/10">
            <Photo item={featured.image} />
          </div>
          <p className="mt-4 font-semibold">{featured.name}</p>
          <p className="text-sm text-ink/70">{featured.role}</p>
          <p className="mt-3 flex gap-1.5 text-sm italic text-ink/70">
            <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink" strokeWidth={1.75} />
            {featured.quote}
          </p>
        </div>

        {rest.map((person) => (
          <div key={person.name} className="rounded-3xl border border-line bg-cream-soft p-5">
            <div className="aspect-square w-full overflow-hidden rounded-2xl">
              <Photo item={person.image} />
            </div>
            <p className="mt-4 font-semibold">{person.name}</p>
            <p className="text-sm text-ink-soft">{person.role}</p>
            <p className="mt-3 flex gap-1.5 text-sm italic text-ink-soft">
              <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green" strokeWidth={1.75} />
              {person.quote}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
