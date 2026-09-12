import AnimatedNumber from "./AnimatedNumber";

export default function ImpactSection({ edition }) {
  const { impact } = edition;
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <div className="rounded-[2rem] bg-ink px-8 py-12 text-cream-soft sm:px-14 sm:py-16">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-pastel-green">The impact</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
          {impact.headline}
        </h2>
        <p className="mt-4 max-w-xl text-cream-soft/70">{impact.description}</p>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {impact.metrics.map((m) => (
            <div key={m.label}>
              <p className="text-5xl font-semibold tracking-tight">
                <AnimatedNumber value={m.value} />
              </p>
              <p className="mt-2 text-sm text-cream-soft/70">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-cream-soft/15 pt-8">
          {impact.progress.map((p) => (
            <div key={p.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-cream-soft/80">{p.label}</span>
                <span className="text-cream-soft/60">{p.percent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-cream-soft/15">
                <div
                  className="h-full rounded-full bg-green-bright transition-all duration-1000"
                  style={{ width: `${p.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
