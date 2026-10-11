export default function OffersPage() {
  return (
    <main className="page-shell">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Offers & packages</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-neutral-900">Seasonal salon savings</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          ['Lunar Gloss Ritual', 'Save 15% on gloss and finish treatments.'],
          ['Bridal Beauty Package', 'Complimentary consultation with every bridal booking.'],
          ['First Visit Welcome', 'A signature haircut and finish for new clients.']
        ].map(([title, text]) => (
          <div key={title} className="card-surface p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Limited offer</p>
            <h2 className="mt-4 font-serif text-3xl text-neutral-900">{title}</h2>
            <p className="mt-4 text-neutral-600">{text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
