import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/lib/data';

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((item) => item.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="page-shell">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <img src={service.image} alt={service.name} className="h-[500px] w-full rounded-[30px] object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{service.category}</p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-neutral-900">{service.name}</h1>
          <p className="mt-6 text-lg text-neutral-600">{service.description}</p>
          <div className="mt-6 flex items-center gap-5">
            <div className="tabular-nums text-3xl font-semibold text-ink">₹{service.price}</div>
            <span className="tabular-nums text-sm text-espresso">{service.duration} minutes</span>
          </div>
          <div className="mt-8 flex gap-4">
            <Link href="/book" className="group inline-flex cursor-pointer items-center gap-2 font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2">Book Appointment <span className="transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true"><ArrowRight className="h-4 w-4" /></span></Link>
            <Link href="/services" className="btn-secondary">Browse services</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
