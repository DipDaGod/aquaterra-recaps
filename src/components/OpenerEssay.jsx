import Section from "./Section";
import { Meta } from "./Lockup";
import { cx, isPlaceholder } from "../lib/utils";

// The issue's opening essay — the prose block that answers whatever its
// headline asks. Edition 01's headline is "WHAT IS aquaterra."; this is where
// it gets answered, rather than the question hanging over a page of stats.
//
// Set as a magazine opener, not a card: a drop cap on the first paragraph, a
// pull quote breaking the measure, and a small fact panel alongside.
function DropCap({ text }) {
  const first = text.slice(0, 1);
  return (
    <>
      <span
        aria-hidden="true"
        className="float-left mr-3 mt-1.5 font-display text-[3.6rem] font-bold leading-[0.72] tracking-[-0.04em] text-(--issue-accent-ink) sm:text-[4.5rem]"
      >
        {first}
      </span>
      {text.slice(1)}
    </>
  );
}

export default function OpenerEssay({ edition, index, label, accentKey, variant, ground, size }) {
  const o = edition.opener;
  const body = o?.body || [];
  if (body.length === 0) return null;

  return (
    <Section
      id="opener"
      index={index}
      label={label}
      accentKey={accentKey}
      variant={variant}
      ground={ground}
      size={size}
      caps={o.lockup?.caps}
      accent={o.lockup?.accent}
      lead={o.standfirst}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
        <div>
          {body.map((para, i) => (
            <p
              key={i}
              className={cx(
                "text-pretty text-[1.0625rem] leading-[1.75] text-ink-2 sm:text-[1.125rem]",
                i > 0 && "mt-5",
                isPlaceholder(para) && "opacity-60"
              )}
            >
              {i === 0 && !isPlaceholder(para) ? <DropCap text={para} /> : para}
            </p>
          ))}

          {o.pull && (
            <figure className="mt-9 border-l-2 border-(--issue-accent) pl-6">
              {/* Set in the body face, not the display one: the display face is
                  caps-only, and the house voice's lowercase is the point of a
                  line like "started in Kolkata. got out of hand." */}
              <blockquote
                className={cx(
                  "text-balance text-[clamp(1.375rem,3.6vw,1.875rem)] font-semibold leading-tight tracking-tight text-ink",
                  isPlaceholder(o.pull) && "opacity-60"
                )}
              >
                {o.pull}
              </blockquote>
              {o.byline && (
                <figcaption className="mt-3">
                  <Meta className="text-ink-3">— {o.byline}</Meta>
                </figcaption>
              )}
            </figure>
          )}
        </div>

        {/* The facts, pulled out of the prose so they can be skimmed. */}
        {o.facts?.length > 0 && (
          <aside className="h-fit rounded-[1.75rem] border border-line bg-cream-soft p-6 shadow-(--shadow-card)">
            <Meta className="block text-ink-3">In short</Meta>
            <dl className="mt-4 flex flex-col gap-4">
              {o.facts.map((f, i) => (
                <div key={`${f.label}-${i}`} className="border-t border-line pt-3 first:border-0 first:pt-0">
                  <dt><Meta className="text-ink-3">{f.label}</Meta></dt>
                  <dd
                    className={cx(
                      "mt-1 text-lg font-semibold leading-tight tracking-tight",
                      isPlaceholder(f.value) && "opacity-55"
                    )}
                  >
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>
    </Section>
  );
}
