'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { CalendarDays, ChevronRight, CircleUserRound, ClipboardList, Gauge, Inbox, Menu, Scissors, Settings, Sparkles, Users, X } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Overview', icon: Gauge },
  { href: '/admin/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/admin/services', label: 'Services', icon: Scissors },
  { href: '/admin/staff', label: 'Staff', icon: Users },
  { href: '/admin/customers', label: 'Customers', icon: CircleUserRound },
  { href: '/admin/analytics', label: 'Analytics', icon: ClipboardList },
  { href: '/admin/messages', label: 'Messages', icon: Inbox }
];

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <aside className="flex h-full w-full flex-col bg-ink px-5 py-6 text-bone lg:w-64 lg:px-6">
      <Link href="/admin" onClick={onNavigate} className="group flex items-center gap-3 border-b border-bone/10 pb-6">
        <span className="flex h-9 w-9 items-center justify-center border border-champagne/70 text-champagne"><Sparkles size={15} strokeWidth={1.5} /></span>
        <span><span className="block font-serif text-xl tracking-wide">Velora</span><span className="mt-0.5 block text-[9px] uppercase tracking-[0.28em] text-bone/45">Atelier desk</span></span>
      </Link>
      <nav aria-label="Admin navigation" className="mt-8 flex-1 space-y-1">
        <p className="mb-3 px-3 text-[9px] uppercase tracking-[0.28em] text-bone/35">Workspace</p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === '/admin' ? pathname === href : pathname.startsWith(href);
          return <Link key={href} href={href} onClick={onNavigate} aria-current={active ? 'page' : undefined} className={`group flex items-center justify-between border-l px-3 py-3 text-sm transition-colors ${active ? 'border-champagne bg-bone/[0.07] text-bone' : 'border-transparent text-bone/55 hover:border-bone/25 hover:bg-bone/[0.04] hover:text-bone'}`}><span className="flex items-center gap-3"><Icon size={16} strokeWidth={1.5} />{label}</span><ChevronRight size={13} className={`transition-opacity ${active ? 'opacity-100 text-champagne' : 'opacity-0 group-hover:opacity-50'}`} /></Link>;
        })}
        <p className="mb-3 mt-8 px-3 text-[9px] uppercase tracking-[0.28em] text-bone/35">Atelier</p>
        <Link href="/admin/settings" onClick={onNavigate} className={`flex items-center gap-3 border-l px-3 py-3 text-sm transition-colors ${pathname.startsWith('/admin/settings') ? 'border-champagne bg-bone/[0.07] text-bone' : 'border-transparent text-bone/55 hover:border-bone/25 hover:text-bone'}`}><Settings size={16} strokeWidth={1.5} />Settings</Link>
      </nav>
      <div className="border-t border-bone/10 pt-5"><p className="text-[9px] uppercase tracking-[0.28em] text-bone/35">Signed in as</p><p className="mt-2 text-sm text-bone/80">Salon owner</p><Link href="/" className="mt-3 inline-block text-xs text-champagne transition-colors hover:text-bone">View public site ↗</Link></div>
    </aside>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className="min-h-screen bg-bone text-ink"><div className="fixed inset-y-0 left-0 z-40 hidden lg:block"><AdminSidebar /></div><div className="lg:pl-64"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-warm-stone/70 bg-bone/90 px-4 backdrop-blur md:px-8 lg:hidden"><Link href="/admin" className="font-serif text-xl">Velora <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-espresso">Admin</span></Link><button type="button" onClick={() => setOpen(true)} aria-label="Open admin navigation" className="min-h-11 min-w-11 rounded-full border border-warm-stone p-2 text-ink"><Menu size={18} /></button></header><main className="min-h-[calc(100vh-4rem)]">{children}</main></div>{open ? <div className="fixed inset-0 z-50 lg:hidden"><button type="button" onClick={() => setOpen(false)} aria-label="Close admin navigation" className="absolute inset-0 bg-ink/55" /><div className="relative h-full w-[min(20rem,88vw)] shadow-2xl"><button type="button" onClick={() => setOpen(false)} aria-label="Close admin navigation" className="absolute right-4 top-4 z-10 min-h-11 min-w-11 rounded-full p-2 text-bone/70 hover:text-bone"><X size={18} /></button><AdminSidebar onNavigate={() => setOpen(false)} /></div></div> : null}</div>;
}

export function AdminPageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="flex flex-col gap-5 border-b border-warm-stone pb-7 md:flex-row md:items-end md:justify-between"><div><p className="text-[10px] uppercase tracking-editorial text-espresso">{eyebrow}</p><h1 className="mt-3 font-serif text-4xl leading-none tracking-tight text-ink md:text-5xl">{title}</h1>{description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-espresso">{description}</p> : null}</div>{action}</div>;
}

export function StatusBadge({ status }: { status: string }) {
  const tone = { confirmed: 'bg-emerald-50 text-emerald-700', pending: 'bg-amber-50 text-amber-700', completed: 'bg-stone-200 text-stone-700', cancelled: 'bg-red-50 text-red-700', unread: 'bg-champagne/15 text-[#806536]', read: 'bg-stone-100 text-espresso', archived: 'bg-stone-100 text-espresso' }[status] ?? 'bg-stone-100 text-espresso';
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium capitalize tracking-wide ${tone}`}>{status}</span>;
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div role="status" className="border border-dashed border-warm-stone px-6 py-14 text-center"><p className="font-serif text-2xl text-ink">{title}</p><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-espresso">{description}</p></div>;
}

export function AdminDialog({ title, description, onClose, children }: { title: string; description?: string; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = previousOverflow; };
  }, [onClose]);
  return <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/55 p-0 sm:items-center sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section role="dialog" aria-modal="true" aria-labelledby="admin-dialog-title" className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[24px] border border-warm-stone bg-bone p-6 shadow-[0_24px_80px_rgba(26,25,24,0.18)] sm:rounded-[20px]" data-lenis-prevent><div className="flex items-start justify-between gap-5"><div><h2 id="admin-dialog-title" className="font-serif text-3xl text-ink">{title}</h2>{description ? <p className="mt-2 text-sm leading-6 text-espresso">{description}</p> : null}</div><button ref={closeRef} type="button" onClick={onClose} aria-label="Close dialog" className="min-h-11 min-w-11 rounded-full border border-warm-stone p-2 text-espresso transition-colors hover:border-ink hover:text-ink"><X size={18} /></button></div><div className="mt-6">{children}</div></section></div>;
}

export function AdminField({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return <label className="block text-sm text-ink"><span className="block font-medium">{label}</span>{children}{hint ? <span className="mt-1 block text-xs text-espresso">{hint}</span> : null}</label>;
}

export const adminInputClass = 'mt-2 w-full border border-warm-stone bg-white/50 px-3 py-3 text-sm outline-none transition-colors focus:border-champagne focus:ring-1 focus:ring-champagne';
