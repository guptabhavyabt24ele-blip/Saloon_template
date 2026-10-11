import { stylists } from '@/lib/data';

export default function TeamPage() {
  return (
    <main className="page-shell">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Our stylists</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-neutral-900">Meet the experts behind your look</h1>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {stylists.map((stylist) => (
          <article key={stylist.id} className="card-surface overflow-hidden p-5">
            <img src={stylist.photo} alt={stylist.name} className="h-80 w-full rounded-[28px] object-cover" />
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{stylist.role}</p>
              <h2 className="mt-2 text-3xl font-semibold text-neutral-900">{stylist.name}</h2>
              <p className="mt-3 text-sm text-neutral-600">{stylist.biography}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stylist.specialties.map((specialty) => (
                  <span key={specialty} className="rounded-full border border-stone-200 bg-stone-100 px-2.5 py-1 text-xs text-neutral-700">{specialty}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
