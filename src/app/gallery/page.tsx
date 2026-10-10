import { galleryItems } from '@/lib/data';

export default function GalleryPage() {
  return (
    <main className="container-shell py-20">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Salon gallery</p>
        <h1 className="mt-3 font-serif text-5xl tracking-tight text-neutral-900">Inspired by texture, tone, and artistry</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {galleryItems.map((item) => (
          <div key={item.id} className="card-surface overflow-hidden">
            <img src={item.image} alt={item.title} className="h-80 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{item.category}</p>
              <h2 className="mt-2 text-lg font-semibold text-neutral-900">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
