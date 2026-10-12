const disciplines = [
  ['Hair artistry', 'Precision architectural cutting tailored to bone structure and natural movement.'],
  ['Color expertise', 'Dimensional balayage, gloss treatments, and bespoke tonal formulation.'],
  ['Wellness-led rituals', 'Restorative scalp therapy and organic botanicals for sustained hair health.']
] as const;

export default function AboutPage() {
  return (
    <main className="page-shell">
      <div className="max-w-4xl">
        <p className="eyebrow text-espresso">About Velora</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.08] tracking-tight text-ink">Thoughtful styling with a refined point of view.</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-espresso">
          VELORA is a luxury salon studio built around precision and personal care. We believe every appointment should feel restorative, considered, and beautifully tailored to your lifestyle and goals.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {disciplines.map(([title, description]) => (
          <div key={title} className="card-surface p-8">
            <h2 className="font-serif text-3xl leading-[1.08] tracking-tight text-ink">{title}</h2>
            <p className="mt-4 leading-relaxed text-espresso">{description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
