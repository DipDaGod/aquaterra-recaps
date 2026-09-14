import Photo from "./Photo";
import Section, { SectionHeading } from "./Section";

export default function InsideAquaterra({ edition }) {
  const items = edition.inside || [];
  if (items.length === 0) return null;

  return (
    <Section>
      <SectionHeading
        title="Inside AquaTerra"
        lead="Teams, diaries, workshops and everything happening beyond the projects."
      />

      <ul className="flex flex-col gap-4">
        {items.map((item, i) => (
          <li key={`${item.title}-${i}`}>
            <article className="flex flex-col gap-5 rounded-3xl border border-line bg-cream-soft p-4 shadow-(--shadow-card) sm:flex-row sm:items-center sm:gap-6 sm:p-5">
              <div className="aspect-[16/9] w-full shrink-0 overflow-hidden rounded-2xl sm:aspect-square sm:w-36 lg:w-40">
                <Photo item={item.image} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-green">
                  {item.meta}
                </span>
                <h3 className="mt-1.5 text-balance text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-2xl text-pretty text-sm leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
