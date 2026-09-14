import Photo from "./Photo";
import Section from "./Section";
import { Meta } from "./Lockup";

export default function InsideAquaterra({ edition, index, label, accentKey, variant, ground, size }) {
  const items = edition.inside || [];
  if (items.length === 0) return null;

  return (
    <Section
      id="diaries"
      index={index}
      label={label}
      accentKey={accentKey}
      variant={variant}
      ground={ground}
      size={size}
      caps="GROUNDWORK"
      accent="diaries"
      lead="written by the members who were actually there."
    >

      <ul className="flex flex-col gap-4">
        {items.map((item, i) => (
          <li key={`${item.title}-${i}`}>
            <article className="flex flex-col gap-5 rounded-3xl border border-line bg-cream-soft p-4 shadow-(--shadow-card) sm:flex-row sm:items-center sm:gap-6 sm:p-5">
              <div className="aspect-[16/9] w-full shrink-0 overflow-hidden rounded-2xl sm:aspect-square sm:w-36 lg:w-40">
                <Photo item={item.image} />
              </div>
              <div className="min-w-0 flex-1">
                <Meta className="text-green">{item.meta}</Meta>
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
