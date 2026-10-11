import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin, Phone, Clock3 } from 'lucide-react';
import { HomeHeroMotion } from '@/components/home/home-hero-motion';
import { galleryItems, services, stylists } from '@/lib/data';
import { homeAnnouncements, salonConfig } from '@/lib/salon-config';

export default function HomePage() {
  const featuredServices = services.slice(0, 3);
  const enabledAnnouncements = homeAnnouncements.filter((item) => item.enabled);
  const announcementText = enabledAnnouncements.map((item) => item.text).join(' • ');

  return (
    <main>
      <div className="overflow-hidden border-b border-warm-stone bg-bone pt-[72px] text-[10px] uppercase tracking-editorial text-espresso">
        <div className="announcement-track container-shell flex min-h-[34px] items-center gap-8 whitespace-nowrap py-2">
          <span className="inline-flex items-center gap-2">
            <span className="h-px w-5 bg-champagne" aria-hidden="true" />
            {announcementText}
          </span>
          <span className="hidden items-center gap-2 md:inline-flex">
            <Clock3 className="h-3 w-3 text-champagne" aria-hidden="true" />
            Tue-Sat: 10:00 AM - 9:00 PM
          </span>
        </div>
      </div>

      <HomeHeroMotion
        eyebrow={<p className="mb-5 inline-flex rounded-full border border-warm-stone bg-white/70 px-3 py-1 text-[10px] uppercase tracking-editorial text-espresso">Luxury hair & beauty studio</p>}
        headline={<h1 className="max-w-xl text-5xl leading-[1.1] tracking-tight text-ink sm:text-6xl">Crafted looks for an elevated every day.</h1>}
        description={<p className="mt-6 max-w-lg text-lg leading-8 text-espresso">Discover precision haircuts, dimensional colour, bridal styling, and restorative rituals designed around your lifestyle.</p>}
        actions={
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/book" className="group btn-primary active:translate-y-0">
              Book a styling session
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href="/gallery" className="group btn-secondary cursor-pointer active:translate-y-0">
              View gallery
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        }
        proof={
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-espresso">
            <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-champagne" aria-hidden="true" /> <span className="tabular-nums">4.9</span> guest rating</div>
            <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-champagne" aria-hidden="true" /> <span className="tabular-nums">2,300+</span> appointments</div>
          </div>
        }
        visual={
          <div className="relative mx-auto w-full max-w-[600px]">
            <div className="overflow-hidden rounded-[18px] border border-warm-stone bg-warm-stone/30 p-1 shadow-[0_18px_45px_rgba(107,104,100,0.16)]">
              <div className="group overflow-hidden rounded-[14px] bg-white">
                <img
                  src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80"
                  alt="Salon styling session"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
            <div className="absolute -bottom-5 left-5 rounded-[14px] border border-warm-stone bg-bone/95 p-3 shadow-[0_12px_28px_rgba(107,104,100,0.14)] sm:left-8">
              <div className="flex items-center gap-3">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-ink text-bone">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-editorial text-espresso">Studio open today</p>
                  <p className="font-serif text-lg leading-tight text-ink">By appointment</p>
                </div>
              </div>
            </div>
          </div>
        }
      />

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
                    <span className="font-medium tabular-nums text-ink">₹{service.price}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-neutral-900">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{service.description}</p>
                  <div className="mt-5 flex items-center justify-between text-sm text-neutral-600">
                    <span className="tabular-nums">{service.duration} min</span>
                    <Link href={`/services/${service.slug}`} className="group inline-flex cursor-pointer items-center gap-2 font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2">
                      Book Service <span className="transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true"><ArrowRight className="h-4 w-4" /></span>
                    </Link>
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
            <Link href="/gallery" className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-stone-300/60 bg-transparent px-5 py-2.5 text-sm uppercase tracking-[0.2em] text-stone-200 transition-all duration-200 ease-out hover:border-stone-200 hover:bg-stone-200/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-[#1d1a18]">View portfolio <span className="transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true"><ArrowRight className="h-4 w-4" /></span></Link>
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
          <div className="overflow-hidden rounded-[14px] border border-warm-stone/60 bg-white/40 p-3">
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
