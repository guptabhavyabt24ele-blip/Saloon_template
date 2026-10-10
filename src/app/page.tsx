import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin, Phone, Sparkles, Star, Clock3 } from 'lucide-react';
import { galleryItems, services, stylists } from '@/lib/data';
import { homeAnnouncements, salonConfig } from '@/lib/salon-config';

export default function HomePage() {
  const featuredServices = services.filter((service) => service.featured).slice(0, 3);

  return (
    <main>
      <div className="border-b border-stone-200 bg-stone-100/80">
        <div className="container-shell flex min-h-[42px] items-center justify-between py-2 text-xs uppercase tracking-[0.2em] text-neutral-700">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-700" />
            {homeAnnouncements.filter((item) => item.enabled).map((item) => item.text).join(' • ')}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Clock3 className="h-3.5 w-3.5" />
            Tue-Sat: 10:00 AM - 9:00 PM
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/80 backdrop-blur-md">
        <div className="container-shell flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white">V</div>
            <div>
              <p className="font-serif text-xl tracking-tight">VELORA</p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">Salon Studio</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-neutral-700 md:flex">
            <Link href="/services">Services</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/team">Our Team</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/book" className="btn-primary">Book Appointment</Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-stone-200 bg-stone-100">
        <div className="container-shell grid items-center gap-10 py-16 md:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-stone-200 bg-white px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-neutral-600">Luxury hair & beauty studio</p>
            <h1 className="max-w-xl text-5xl leading-none tracking-[-0.05em] text-neutral-900 sm:text-6xl">
              Crafted looks for an elevated every day.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-neutral-600">
              Discover precision haircuts, dimensional colour, bridal styling, and restorative rituals designed around your lifestyle.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/book" className="btn-primary">Book a styling session <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/gallery" className="btn-secondary">View gallery</Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-amber-500 text-amber-500" /> 4.9 guest rating</div>
              <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> 2,300+ appointments</div>
            </div>
          </div>
          <div className="relative">
            <div className="card-surface overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80"
                alt="Salon styling session"
                className="h-[620px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-8 rounded-2xl border border-stone-200 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-stone-900 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Signature tone</p>
                  <p className="font-serif text-xl">Luxury colour artistry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Featured treatments</p>
              <h2 className="section-heading mt-3">Popular services</h2>
            </div>
            <Link href="/services" className="text-sm font-medium text-neutral-800 underline underline-offset-4">Explore all services</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredServices.map((service) => (
              <article key={service.id} className="card-surface">
                <img src={service.image} alt={service.name} className="h-72 w-full object-cover" />
                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-neutral-600">{service.category}</span>
                    <span className="font-medium text-neutral-900">₹{service.price}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-900">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{service.description}</p>
                  <div className="mt-5 flex items-center justify-between text-sm text-neutral-600">
                    <span>{service.duration} min</span>
                    <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 font-medium text-neutral-900">Book now <ArrowRight className="h-4 w-4" /></Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1d1a18] py-16 text-white">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-300">Inspiration gallery</p>
            <h2 className="mt-3 text-4xl tracking-tight">Curated looks that feel personal.</h2>
          </div>
          <div className="flex items-end justify-end">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-stone-200">View portfolio <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="container-shell mt-8 grid gap-6 md:grid-cols-4">
          {galleryItems.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
              <img src={item.image} alt={item.title} className="h-72 w-full object-cover" />
              <div className="p-4"><p className="text-sm text-stone-200">{item.category}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Our artists</p>
              <h2 className="section-heading mt-3">Meet the team</h2>
            </div>
            <Link href="/team" className="text-sm font-medium text-neutral-800 underline underline-offset-4">Meet all stylists</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {stylists.map((stylist) => (
              <article key={stylist.id} className="card-surface flex flex-col gap-6 p-5 md:flex-row">
                <img src={stylist.photo} alt={stylist.name} className="h-56 w-full rounded-[24px] object-cover md:w-48" />
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">{stylist.role}</p>
                  <h3 className="mt-2 text-3xl font-semibold">{stylist.name}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{stylist.experience} experience</p>
                  <p className="mt-4 text-sm leading-7 text-neutral-600">{stylist.biography}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {stylist.specialties.map((skill) => (
                      <span key={skill} className="rounded-full border border-stone-200 bg-stone-100 px-2.5 py-1 text-xs text-neutral-700">{skill}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-100 py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Location</p>
            <h2 className="section-heading mt-3">Visit the studio</h2>
            <div className="mt-6 space-y-4 text-neutral-700">
              <div className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 text-amber-700" /> {salonConfig.address}</div>
              <div className="flex items-start gap-3"><Phone className="mt-1 h-5 w-5 text-amber-700" /> {salonConfig.phone}</div>
            </div>
            <div className="mt-6 flex gap-4">
              <Link href={salonConfig.directionsUrl} className="btn-primary">Get directions</Link>
              <Link href="/contact" className="btn-secondary">Contact us</Link>
            </div>
          </div>
          <div className="card-surface overflow-hidden border-stone-200 bg-white p-3">
            <iframe
              title="Velora salon map"
              src={salonConfig.mapsUrl}
              className="h-[320px] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-[#f6f1ec] py-12">
        <div className="container-shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-serif text-3xl tracking-tight text-neutral-900">VELORA</p>
            <p className="mt-2 text-sm text-neutral-600">Luxury hair and beauty rituals in the heart of the city.</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-neutral-600">
            <Link href="/services">Services</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/team">Team</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
