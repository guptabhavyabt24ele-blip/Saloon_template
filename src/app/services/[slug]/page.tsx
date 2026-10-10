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
    <main className="container-shell py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <img src={service.image} alt={service.name} className="h-[500px] w-full rounded-[30px] object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{service.category}</p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight text-neutral-900">{service.name}</h1>
          <p className="mt-6 text-lg text-neutral-600">{service.description}</p>
          <div className="mt-6 flex items-center gap-5">
            <div className="text-3xl font-semibold text-neutral-900">₹{service.price}</div>
            <span className="text-sm text-neutral-500">{service.duration} minutes</span>
          </div>
          <div className="mt-8 flex gap-4">
            <Link href="/book" className="btn-primary">Book this service <ArrowRight className="ml-2 h-4 w-4" /></Link>
            <Link href="/services" className="btn-secondary">Browse services</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
