'use client';

import Link from 'next/link';
import { CheckCircle2, CalendarCheck2 } from 'lucide-react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference') ?? 'VELORA-7F93AA';
  const service = searchParams.get('service') ?? 'Signature Precision Cut';
  const stylist = searchParams.get('stylist') ?? 'Rhea Kapoor';
  const date = searchParams.get('date') ?? 'Tue, 15 Oct';
  const time = searchParams.get('time') ?? '10:30 AM';
  const amount = searchParams.get('amount') ?? '₹1,800';

  return (
    <main className="container-shell py-20">
      <div className="card-surface mx-auto max-w-xl p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-neutral-500">Booking confirmed</p>
        <h1 className="mt-4 font-serif text-5xl text-neutral-900">Your appointment is set.</h1>
        <p className="mt-5 text-neutral-700">Reference: {reference}</p>

        <div className="mt-8 space-y-4 rounded-3xl border border-stone-200 bg-stone-50 p-5 text-left text-sm text-neutral-600">
          <div className="flex items-center justify-between"><span>Service</span><span className="font-medium text-neutral-900">{service}</span></div>
          <div className="flex items-center justify-between"><span>Stylist</span><span className="font-medium text-neutral-900">{stylist}</span></div>
          <div className="flex items-center justify-between"><span>Date</span><span className="font-medium text-neutral-900">{date}</span></div>
          <div className="flex items-center justify-between"><span>Time</span><span className="font-medium text-neutral-900">{time}</span></div>
          <div className="flex items-center justify-between"><span>Total</span><span className="font-medium text-neutral-900">{amount}</span></div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/booking/lookup" className="btn-secondary">Manage booking</Link>
          <Link href="/book" className="btn-primary">Book another slot</Link>
        </div>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-3 py-2 text-xs uppercase tracking-[0.2em] text-neutral-600">
          <CalendarCheck2 className="h-3.5 w-3.5 text-amber-700" />
          Confirmation email sent
        </div>
      </div>
    </main>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<main className="container-shell py-20"><div className="card-surface mx-auto max-w-xl p-10 text-center text-neutral-600">Loading booking details...</div></main>}>
      <BookingConfirmationContent />
    </Suspense>
  );
}
