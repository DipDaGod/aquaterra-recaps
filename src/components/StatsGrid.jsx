import AnimatedNumber from "./AnimatedNumber";
import Section from "./Section";
import { Meta } from "./Lockup";

const tones = [
  "bg-tint-green border-green/15",
  "bg-tint-yellow border-gold/25",
  "bg-tint-blue border-ink/10",
  "bg-tint-lavender border-ink/10",
];

export default function StatsGrid({ edition, index, label, accentKey, variant, ground, size }) {
  return (
    <Section
      id="numbers"
      index={index}
      label={label}
      accentKey={accentKey}
      variant={variant}
      ground={ground}
      size={size}
      caps="THE"
      accent="numbers"
      aside={`${edition.month} ${edition.year}`}
    >
      <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {edition.glance.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex min-h-36 flex-col justify-between rounded-3xl border p-5 sm:min-h-40 sm:p-6 ${tones[i % tones.length]}`}
          >
            <dd className="font-display text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
              <AnimatedNumber value={stat.value} />
            </dd>
            <dt className="mt-3"><Meta className="text-ink-soft">{stat.label}</Meta></dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}
