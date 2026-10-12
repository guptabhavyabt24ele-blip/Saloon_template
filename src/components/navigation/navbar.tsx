'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const links = [
  ['/services', 'Services'],
  ['/gallery', 'Gallery'],
  ['/team', 'Our Team'],
  ['/about', 'About'],
  ['/contact', 'Contact']
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 20);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ease-out ${scrolled ? 'border-b border-[#E5E0D8]/80 bg-[#F8F6F0]/95 shadow-[0_4px_20px_rgba(26,25,24,0.04)] backdrop-blur-md' : 'border-transparent bg-transparent'}`}>
      <div className="container-shell flex min-h-[72px] items-center justify-between gap-6">
        <Link href="/" className="group flex shrink-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-bone transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-[0.98]">V</span>
          <span>
            <span className="block font-serif text-lg leading-none tracking-tight text-ink">VELORA</span>
            <span className="mt-1 block text-[9px] font-medium uppercase tracking-editorial text-espresso">Salon Studio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-espresso md:flex" aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="group relative rounded-full px-1 py-2 transition-opacity duration-200 ease-out hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2">
              {label}
              <span className="absolute inset-x-1 bottom-0 h-px origin-left scale-x-0 bg-champagne transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <Link href="/book" className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink px-5 py-2 text-[10px] font-medium uppercase tracking-wider text-bone transition-all duration-200 ease-out hover:bg-[#2A2928] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2">
          Book appointment
        </Link>
      </div>
    </header>
  );
}
