'use client';

import { ArrowRight, CheckCircle2, Clock3 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateBookingSummary, generateAvailableSlots } from '@/lib/booking';
import { services, stylists } from '@/lib/data';

const nextSevenDays = Array.from({ length: 7 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  return {
    iso: date.toISOString().slice(0, 10),
    label: date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  };
});

const existingAppointments = [
  { stylistId: 'rhea', startsAt: '2026-10-11T10:00:00.000Z', endsAt: '2026-10-11T11:00:00.000Z' },
  { stylistId: 'rhea', startsAt: '2026-10-11T13:00:00.000Z', endsAt: '2026-10-11T14:30:00.000Z' },
  { stylistId: 'aryan', startsAt: '2026-10-11T12:00:00.000Z', endsAt: '2026-10-11T13:00:00.000Z' }
];

export default function BookPage() {
  const router = useRouter();
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(['cut-classic']);
  const [selectedStylistId, setSelectedStylistId] = useState('rhea');
  const [selectedDate, setSelectedDate] = useState(nextSevenDays[0].iso);
  const [selectedTime, setSelectedTime] = useState('10:30');
  const [customerName, setCustomerName] = useState('Aisha Patel');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [customerEmail, setCustomerEmail] = useState('aisha@example.com');
  const [notes, setNotes] = useState('Please keep the length soft and smooth around the face.');
  const [step, setStep] = useState(1);

  const selectedServices = useMemo(
    () => services.filter((service) => selectedServiceIds.includes(service.id)),
    [selectedServiceIds]
  );

  const bookingSummary = useMemo(
    () => calculateBookingSummary(
      selectedServices.map((service) => ({
        id: service.id,
        name: service.name,
        durationMinutes: service.duration,
        price: service.price
      }))
    ),
    [selectedServices]
  );

  const selectedStylist = stylists.find((stylist) => stylist.id === selectedStylistId) ?? stylists[0];

  const availableSlots = useMemo(() => {
    const dateKey = new Date(`${selectedDate}T00:00:00.000Z`);
    const isoDate = dateKey.toISOString().slice(0, 10);

    return generateAvailableSlots({
      dayStart: '09:00',
      dayEnd: '18:00',
      slotMinutes: 30,
      existingAppointments: existingAppointments.filter((appointment) => {
        const startsAtDay = new Date(appointment.startsAt).toISOString().slice(0, 10);
        return startsAtDay === isoDate && appointment.stylistId === selectedStylistId;
      }),
      timezone: 'Asia/Kolkata'
    });
  }, [selectedDate, selectedStylistId]);

  const totalSteps = 4;

  function toggleService(serviceId: string) {
    setSelectedServiceIds((current) => {
      const exists = current.includes(serviceId);
      return exists ? current.filter((id) => id !== serviceId) : [...current, serviceId];
    });
  }

  function goNext() {
    setStep((current) => Math.min(current + 1, totalSteps));
  }

  function handleConfirm() {
    const reference = `VELORA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const params = new URLSearchParams({
      reference,
      service: selectedServices.map((service) => service.name).join(', '),
      stylist: selectedStylist.name,
      date: nextSevenDays.find((day) => day.iso === selectedDate)?.label ?? selectedDate,
      time: selectedTime,
      amount: `₹${bookingSummary.totalPrice.toLocaleString('en-IN')}`
    });

    router.push(`/booking/confirmation?${params.toString()}`);
  }

  return (
    <main className="page-shell">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Book your appointment</p>
          <h1 className="mt-3 font-serif text-5xl tracking-tight text-neutral-900">Choose your perfect services</h1>
        </div>
        <div className="text-right text-[10px] font-medium uppercase tracking-editorial text-espresso">
          <p className="tabular-nums">STEP {String(step).padStart(2, '0')} — {String(totalSteps).padStart(2, '0')}</p>
          <p className="mt-1 text-ink">{['Services', 'Stylist', 'Time', 'Summary'][step - 1]}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          {step === 1 && (
            <section className="space-y-5">
              {services.map((service) => {
                const isSelected = selectedServiceIds.includes(service.id);

                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`card-surface flex w-full items-center gap-4 p-4 text-left ${isSelected ? 'border-champagne ring-1 ring-champagne/40 ring-offset-2 ring-offset-bone' : ''}`}
                  >
                    <img src={service.image} alt={service.name} className="h-20 w-20 rounded-2xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-xl font-semibold text-neutral-900">{service.name}</h2>
                        <span className="tabular-nums font-medium text-ink">₹{service.price}</span>
                      </div>
                      <p className="mt-1 text-sm text-espresso"><span className="tabular-nums">{service.duration} minutes</span> • {service.category}</p>
                    </div>
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full border ${isSelected ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-stone-300 bg-white'}`}>
                      {isSelected ? <CheckCircle2 className="h-4 w-4" /> : null}
                    </div>
                  </button>
                );
              })}
              <div className="flex justify-end">
                <button type="button" onClick={goNext} className="btn-primary" disabled={selectedServices.length === 0}>Continue <ArrowRight className="ml-2 h-4 w-4" /></button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-5">
              {stylists.map((stylist) => (
                <button
                  key={stylist.id}
                  type="button"
                  onClick={() => {
                    setSelectedStylistId(stylist.id);
                    setSelectedTime('10:30');
                  }}
                  className={`card-surface flex w-full items-center gap-4 p-4 text-left ${selectedStylistId === stylist.id ? 'border-neutral-900 ring-2 ring-neutral-200' : ''}`}
                >
                  <img src={stylist.photo} alt={stylist.name} className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{stylist.role}</p>
                    <h2 className="mt-2 text-xl font-semibold text-neutral-900">{stylist.name}</h2>
                    <p className="mt-2 text-sm text-neutral-600">{stylist.specialties.join(' • ')}</p>
                  </div>
                </button>
              ))}
              <div className="flex justify-between gap-3">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary">Back</button>
                <button type="button" onClick={goNext} className="btn-primary">Continue <ArrowRight className="ml-2 h-4 w-4" /></button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-6">
              <div className="card-surface p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Choose a date</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {nextSevenDays.map((day) => (
                    <button
                      key={day.iso}
                      type="button"
                      onClick={() => setSelectedDate(day.iso)}
                      className={`rounded-2xl border px-3 py-3 text-left ${selectedDate === day.iso ? 'border-champagne bg-champagne/10 text-ink ring-1 ring-champagne/40 ring-offset-2 ring-offset-bone' : 'border-warm-stone bg-bone/70 text-espresso'}`}
                    >
                      <p className="text-xs uppercase tracking-[0.2em]">{day.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="card-surface p-5">
                <div className="mb-4 flex items-center gap-2 text-neutral-700">
                  <Clock3 className="h-4 w-4 text-amber-700" />
                  <span className="text-sm font-medium">Available time slots</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-4">
                  {availableSlots.length > 0 ? (
                    availableSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`rounded-2xl border px-3 py-2 text-sm ${selectedTime === slot ? 'border-champagne bg-champagne/10 text-ink ring-1 ring-champagne/40 ring-offset-2 ring-offset-bone' : 'border-warm-stone bg-bone/70 text-espresso'}`}
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-neutral-600">No slots are available on this day with the selected stylist.</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between gap-3">
                <button type="button" onClick={() => setStep(2)} className="btn-secondary">Back</button>
                <button type="button" onClick={goNext} className="btn-primary" disabled={!selectedTime}>Continue <ArrowRight className="ml-2 h-4 w-4" /></button>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="space-y-6">
              <div className="card-surface p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Guest details</p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm text-neutral-700">Full name</span>
                    <input value={customerName} onChange={(event) => setCustomerName(event.target.value)} className="w-full rounded-full border border-stone-300 bg-stone-50 px-4 py-3" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm text-neutral-700">Phone</span>
                    <input value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} className="w-full rounded-full border border-stone-300 bg-stone-50 px-4 py-3" />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm text-neutral-700">Email</span>
                    <input value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} type="email" className="w-full rounded-full border border-stone-300 bg-stone-50 px-4 py-3" />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="mb-2 block text-sm text-neutral-700">Notes</span>
                    <textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="min-h-[110px] w-full rounded-[24px] border border-stone-300 bg-stone-50 px-4 py-3" />
                  </label>
                </div>
              </div>

              <div className="flex justify-between gap-3">
                <button type="button" onClick={() => setStep(3)} className="btn-secondary">Back</button>
                <button type="button" onClick={handleConfirm} className="btn-primary">Confirm booking</button>
              </div>
            </section>
          )}
        </div>

        <aside className="card-surface sticky top-24 h-fit p-6">
          <h2 className="font-serif text-3xl text-neutral-900">Booking summary</h2>
          <div className="mt-6 space-y-5 text-sm text-neutral-600">
            <div className="flex items-center justify-between"><span>Services</span><span className="max-w-[55%] text-right font-medium text-neutral-900">{selectedServices.map((service) => service.name).join(', ') || 'No service selected'}</span></div>
            <div className="flex items-center justify-between"><span>Stylist</span><span className="font-medium text-neutral-900">{selectedStylist.name}</span></div>
            <div className="flex items-center justify-between"><span>Date</span><span className="font-medium text-neutral-900">{nextSevenDays.find((day) => day.iso === selectedDate)?.label ?? selectedDate}</span></div>
            <div className="flex items-center justify-between"><span>Time</span><span className="font-medium text-neutral-900">{selectedTime}</span></div>
            <div className="flex items-center justify-between"><span>Duration</span><span className="tabular-nums font-medium text-ink">{bookingSummary.totalDurationMinutes} min</span></div>
            <div className="flex items-center justify-between"><span>Deposit</span><span className="tabular-nums font-medium text-ink">₹{bookingSummary.deposit.toLocaleString('en-IN')}</span></div>
            <div className="flex items-center justify-between border-t border-warm-stone pt-3 text-base font-semibold text-ink"><span>Total</span><span className="tabular-nums">₹{bookingSummary.totalPrice.toLocaleString('en-IN')}</span></div>
            {step === 1 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={selectedServices.length === 0}
                className="mt-6 w-full cursor-pointer rounded-full bg-[#1A1918] py-3.5 text-xs font-medium uppercase tracking-widest text-[#F8F6F0] transition-colors duration-200 ease-out hover:bg-[#2A2928] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to Stylist
              </button>
            ) : null}
          </div>
        </aside>
      </div>
    </main>
  );
}
