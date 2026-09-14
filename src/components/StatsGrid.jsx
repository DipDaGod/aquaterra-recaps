import AnimatedNumber from "./AnimatedNumber";
import Section, { SectionHeading } from "./Section";

const tones = [
  "bg-pastel-green border-green/15",
  "bg-pastel-yellow border-gold/20",
  "bg-pastel-blue border-ink/10",
  "bg-pastel-lavender border-ink/10",
];

export default function StatsGrid({ edition }) {
  return (
    <Section tight>
      <SectionHeading
        title="Month at a glance"
        aside={`${edition.month} ${edition.year}`}
      />
      <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {edition.glance.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex min-h-36 flex-col justify-between rounded-3xl border p-5 sm:min-h-40 sm:p-6 ${tones[i % tones.length]}`}
          >
            <dd className="text-4xl font-semibold tracking-tight sm:text-5xl">
              <AnimatedNumber value={stat.value} />
            </dd>
            <dt className="mt-3 text-pretty text-sm font-medium text-ink-soft">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}
