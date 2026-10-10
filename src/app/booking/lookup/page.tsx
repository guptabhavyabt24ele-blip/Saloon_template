'use client';

import { FormEvent, useState } from 'react';

const bookings = {
  'VELORA-7F93AA': {
    client: 'Aisha Patel',
    service: 'Signature Precision Cut',
    stylist: 'Rhea Kapoor',
    date: '12 Oct 2026',
    time: '10:00 AM',
    status: 'Confirmed'
  },
  'VELORA-AB12CD': {
    client: 'Kabir Singh',
    service: 'Beard Sculpt & Groom',
    stylist: 'Aryan Mehta',
    date: '14 Oct 2026',
    time: '11:30 AM',
    status: 'Pending confirmation'
  }
};

export default function BookingLookupPage() {
  const [reference, setReference] = useState('VELORA-7F93AA');
  const [result, setResult] = useState<(typeof bookings)[keyof typeof bookings] | null>(bookings['VELORA-7F93AA']);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const booking = bookings[reference as keyof typeof bookings];
    setResult(booking ?? null);
  }

  return (
    <main className="container-shell py-20">
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
          <button type="submit" className="btn-primary w-full">Check booking</button>
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
        ) : (
          <p className="mt-6 rounded-full border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">No booking matched that reference.</p>
        )}
      </div>
    </main>
  );
}
