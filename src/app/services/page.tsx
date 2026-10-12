import Link from 'next/link';
import { getPublicServices } from '@/app/api/_lib/supabase';

export default async function ServicesPage() {
  const services = await getPublicServices();
  return (
    <main className="page-shell">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Our services</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-neutral-900">Signature salon services</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.id} className="card-surface overflow-hidden">
            <img src={service.image} alt={service.name} className="h-64 w-full object-cover" />
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-neutral-600">{service.category}</span>
                <span className="tabular-nums text-sm font-medium text-ink">₹{service.price}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-neutral-900">{service.name}</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{service.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="tabular-nums text-sm text-espresso">{service.duration} min</span>
                <Link href={`/services/${service.slug}`} className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2">Book Service <span className="transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true">→</span></Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
