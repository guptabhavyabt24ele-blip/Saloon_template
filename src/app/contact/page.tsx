import { MapPin, Phone, Mail } from 'lucide-react';
import { salonConfig } from '@/lib/salon-config';

export default function ContactPage() {
  return (
    <main className="page-shell">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Contact</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-neutral-900">Plan your next visit</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="card-surface p-8">
          <div className="space-y-5 text-neutral-700">
            <div className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 text-amber-700" /> {salonConfig.address}</div>
            <div className="flex items-start gap-3"><Phone className="mt-1 h-5 w-5 text-amber-700" /> {salonConfig.phone}</div>
            <div className="flex items-start gap-3"><Mail className="mt-1 h-5 w-5 text-amber-700" /> {salonConfig.email}</div>
          </div>
        </div>
        <div className="overflow-hidden rounded-[14px] border border-warm-stone/60 bg-white/40">
          <iframe src={salonConfig.mapsUrl} className="h-full min-h-[320px] w-full border-0" loading="lazy" title="Salon location map" />
        </div>
      </div>
    </main>
  );
}
