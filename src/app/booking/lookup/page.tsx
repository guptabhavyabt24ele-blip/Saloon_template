export default function BookingLookupPage() {
  return (
    <main className="container-shell py-20">
      <div className="mx-auto max-w-xl card-surface p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Manage booking</p>
        <h1 className="mt-4 font-serif text-5xl tracking-tight text-neutral-900">Look up appointment</h1>
        <form className="mt-8 space-y-4">
          <input placeholder="Enter booking reference" className="w-full rounded-full border border-stone-300 bg-stone-50 px-4 py-3" />
          <button className="btn-primary w-full">Check booking</button>
        </form>
      </div>
    </main>
  );
}
