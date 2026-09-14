import { Quote, Star } from "lucide-react";
import Photo from "./Photo";
import Section, { SectionHeading } from "./Section";
import { cx } from "../lib/utils";

function PersonCard({ person, featured = false }) {
  return (
    <figure
      className={cx(
        "flex h-full flex-col rounded-3xl p-5",
        featured ? "bg-gold text-ink" : "border border-line bg-cream-soft shadow-(--shadow-card)"
      )}
    >
      {featured && (
        <p className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em]">
          <Star className="h-3.5 w-3.5 fill-ink" strokeWidth={1.5} />
          Volunteer of the month
        </p>
      )}

      <div
        className={cx(
          "aspect-square w-full overflow-hidden rounded-2xl",
          featured && "border-2 border-ink/10"
        )}
      >
        <Photo item={person.image} />
      </div>

      <figcaption className="mt-4">
        <p className="font-semibold leading-tight">{person.name}</p>
        <p className={cx("mt-0.5 text-sm", featured ? "text-ink/70" : "text-ink-soft")}>
          {person.role}
        </p>
      </figcaption>

      <blockquote
        className={cx(
          "mt-3 flex gap-1.5 text-pretty text-sm italic leading-relaxed",
          featured ? "text-ink/75" : "text-ink-soft"
        )}
      >
        <Quote
          className={cx("mt-1 h-3.5 w-3.5 shrink-0", featured ? "text-ink" : "text-green")}
          strokeWidth={1.75}
        />
        {person.quote}
      </blockquote>
    </figure>
  );
}

export default function PeopleSection({ edition }) {
  const people = edition.people || [];
  if (people.length === 0) return null;

  const [featured, ...rest] = people;

  // A four-column grid left a single volunteer stranded beside three empty
  // cells on the sparser editions. The track count now follows the data.
  const columns = {
    1: "sm:grid-cols-2 lg:grid-cols-3",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  }[people.length] || "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <Section>
      <SectionHeading
        eyebrow="The people"
        caps="THE ONES WHO"
        accent="turned up"
        lead="not the org account, not the desk — the members who showed up."
      />

      <ul className={cx("grid gap-4", columns)}>
        <li className={people.length === 1 ? "sm:col-span-1" : ""}>
          <PersonCard person={featured} featured />
        </li>
        {rest.map((person, i) => (
          <li key={`${person.name}-${i}`}>
            <PersonCard person={person} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
