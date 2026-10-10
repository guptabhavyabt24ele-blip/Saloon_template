const reviews = [
  { name: 'Asmita', quote: 'The finish was polished, warm, and so wearable. I left feeling completely confident.', rating: 5 },
  { name: 'Karan', quote: 'Great attention to detail and an incredibly relaxing atmosphere.', rating: 5 },
  { name: 'Nisha', quote: 'My balayage looked fresh, luminous, and perfectly blended.', rating: 5 }
];

export default function ReviewsPage() {
  return (
    <main className="container-shell py-20">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Client feedback</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-neutral-900">Recent reviews</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.name} className="card-surface p-8">
            <div className="mb-4 text-amber-500">{'★'.repeat(review.rating)}</div>
            <p className="text-lg leading-8 text-neutral-700">“{review.quote}”</p>
            <p className="mt-5 text-sm uppercase tracking-[0.24em] text-neutral-500">{review.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
