'use client';

import { FormEvent, useState } from 'react';

type BookingResult = { client: string; service: string; stylist: string; date: string; time: string; status: string };

export default function BookingLookupPage() {
  const [reference, setReference] = useState('');
  const [result, setResult] = useState<BookingResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/booking/lookup?reference=${encodeURIComponent(reference)}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error);
      const booking = payload.booking;
      setResult(booking ? {
        client: booking.customers?.full_name ?? booking.customers?.name ?? 'Guest',
        service: booking.services?.name ?? booking.services?.title ?? 'Salon service',
        stylist: booking.staff?.name ?? 'Your stylist',
        date: new Date(booking.scheduled_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: new Date(booking.scheduled_at).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }),
        status: booking.status
      } : null);
      if (!booking) setError('No booking matched that reference.');
    } catch (lookupError) {
      setResult(null);
      setError(lookupError instanceof Error ? lookupError.message : 'Lookup failed.');
    } finally { setLoading(false); }
  }

  return (
    <main className="page-shell">
      <div className="mx-auto max-w-xl card-surface p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Manage booking</p>
        <h1 className="mt-4 font-serif text-5xl tracking-tight text-neutral-900">Look up appointment</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            value={reference}
            onChange={(event) => setReference(event.target.value.toUpperCase())}
            placeholder="Enter booking reference"
            className="w-full rounded-full border border-stone-300 bg-stone-50 px-4 py-3"
          />
          <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? 'Checking…' : 'Check booking'}</button>
        </form>

        {result ? (
          <div className="mt-8 rounded-3xl border border-stone-200 bg-stone-50 p-5 text-sm text-neutral-600">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Booking found</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between"><span>Client</span><span className="font-medium text-neutral-900">{result.client}</span></div>
              <div className="flex items-center justify-between"><span>Service</span><span className="font-medium text-neutral-900">{result.service}</span></div>
              <div className="flex items-center justify-between"><span>Stylist</span><span className="font-medium text-neutral-900">{result.stylist}</span></div>
              <div className="flex items-center justify-between"><span>Date</span><span className="font-medium text-neutral-900">{result.date}</span></div>
              <div className="flex items-center justify-between"><span>Time</span><span className="font-medium text-neutral-900">{result.time}</span></div>
              <div className="flex items-center justify-between"><span>Status</span><span className="font-medium text-emerald-600">{result.status}</span></div>
            </div>
          </div>
        ) : error ? (
          <p className="mt-6 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">{error}</p>
        ) : null}
      </div>
    </main>
  );
}
