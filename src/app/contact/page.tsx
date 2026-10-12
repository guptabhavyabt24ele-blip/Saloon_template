'use client';

import { FormEvent, useState } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { salonConfig } from '@/lib/salon-config';

export default function ContactPage() {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('');
    setError('');
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) setError(result.error ?? 'We could not send your message.');
    else { setStatus(result.message); form.reset(); }
  }
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
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input name="name" required minLength={2} placeholder="Your name" className="w-full rounded-full border border-stone-300 bg-stone-50 px-4 py-3" />
            <input name="email" required type="email" placeholder="Email address" className="w-full rounded-full border border-stone-300 bg-stone-50 px-4 py-3" />
            <input name="phone" placeholder="Phone (optional)" className="w-full rounded-full border border-stone-300 bg-stone-50 px-4 py-3" />
            <textarea name="message" required minLength={10} placeholder="How can we help?" className="min-h-[130px] w-full rounded-[24px] border border-stone-300 bg-stone-50 px-4 py-3" />
            {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
            {status ? <p className="text-sm text-emerald-700" role="status">{status}</p> : null}
            <button type="submit" className="btn-primary">Send enquiry</button>
          </form>
        </div>
        <div className="overflow-hidden rounded-[14px] border border-warm-stone/60 bg-white/40">
          <iframe src={salonConfig.mapsUrl} className="h-full min-h-[320px] w-full border-0" loading="lazy" title="Salon location map" />
        </div>
      </div>
    </main>
  );
}
