import { services } from '@/lib/data';

export default function BookPage() {
  return (
    <main className="container-shell py-20">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Book your appointment</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-neutral-900">Choose your perfect salon ritual</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {services.map((service) => (
            <label key={service.id} className="card-surface flex items-center gap-4 p-4">
              <input type="radio" name="service" value={service.slug} className="h-4 w-4 accent-neutral-900" />
              <img src={service.image} alt={service.name} className="h-20 w-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-neutral-900">{service.name}</h2>
                  <span className="font-medium text-neutral-900">₹{service.price}</span>
                </div>
                <p className="mt-1 text-sm text-neutral-600">{service.duration} minutes • {service.category}</p>
              </div>
            </label>
          ))}
        </div>

        <aside className="card-surface p-6">
          <h2 className="font-serif text-3xl text-neutral-900">Booking summary</h2>
          <div className="mt-6 space-y-5 text-sm text-neutral-600">
            <div className="flex items-center justify-between"><span>Selected service</span><span className="font-medium text-neutral-900">Signature Precision Cut</span></div>
            <div className="flex items-center justify-between"><span>Stylist</span><span className="font-medium text-neutral-900">Rhea Kapoor</span></div>
            <div className="flex items-center justify-between"><span>Date</span><span className="font-medium text-neutral-900">Tue, 15 Oct</span></div>
            <div className="flex items-center justify-between"><span>Time</span><span className="font-medium text-neutral-900">10:30 AM</span></div>
            <div className="flex items-center justify-between border-t border-stone-200 pt-4 text-base font-semibold text-neutral-900"><span>Total</span><span>₹1,800</span></div>
          </div>
          <button className="btn-primary mt-8 w-full">Continue to booking</button>
        </aside>
      </div>
    </main>
  );
}
