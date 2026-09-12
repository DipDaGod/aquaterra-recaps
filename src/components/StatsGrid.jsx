import AnimatedNumber from "./AnimatedNumber";

const tones = ["bg-pastel-green", "bg-pastel-yellow", "bg-pastel-blue", "bg-pastel-lavender"];

export default function StatsGrid({ edition }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div className="mb-8 flex items-end justify-between">
        <h2 className="text-3xl font-semibold tracking-tight">Month at a glance</h2>
        <p className="hidden text-sm text-ink-soft sm:block">{edition.month} {edition.year}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {edition.glance.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col justify-between rounded-3xl border border-ink/10 p-6 ${tones[i % tones.length]}`}
          >
            <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
              <AnimatedNumber value={stat.value} />
            </p>
            <p className="mt-3 text-sm text-ink-soft">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
