export default function AboutPage() {
  return (
    <main className="container-shell py-20">
      <div className="max-w-4xl">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">About Velora</p>
        <h1 className="mt-4 font-serif text-5xl tracking-tight text-neutral-900">Thoughtful styling with a refined point of view.</h1>
        <p className="mt-6 text-lg leading-8 text-neutral-600">
          VELORA is a luxury salon studio built around precision and personal care. We believe every appointment should feel restorative, considered, and beautifully tailored to your lifestyle and goals.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {['Hair artistry', 'Color expertise', 'Wellness-led rituals'].map((title) => (
          <div key={title} className="card-surface p-8">
            <h2 className="font-serif text-3xl text-neutral-900">{title}</h2>
            <p className="mt-4 text-neutral-600">A client-first approach that blends technical craft, beauty education, and luxurious finishing details.</p>
          </div>
        ))}
      </div>
    </main>
  );
}
