'use client';

import { FormEvent, useCallback, useState } from 'react';
import { Plus } from 'lucide-react';
import { adminServices, formatCurrency } from '@/components/admin/admin-data';
import { AdminDialog, AdminField, AdminPageHeader, adminInputClass, EmptyState } from '@/components/admin/admin-ui';

type Service = (typeof adminServices)[number];

type ServiceForm = {
  name: string;
  category: string;
  duration: string;
  price: string;
};

const emptyForm: ServiceForm = { name: '', category: '', duration: '60', price: '' };

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>(adminServices);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [error, setError] = useState('');

  const closeDialog = useCallback(() => {
    setIsAdding(false);
    setError('');
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();
    const category = form.category.trim();
    const duration = Number(form.duration);
    const price = Number(form.price);

    if (!name || !category || !Number.isFinite(duration) || duration < 15 || !Number.isFinite(price) || price <= 0) {
      setError('Add a name, category, duration of at least 15 minutes, and a valid price.');
      return;
    }
    if (items.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
      setError('A service with this name already exists.');
      return;
    }

    setItems((current) => [...current, { name, category, duration, price, visible: true }]);
    setForm(emptyForm);
    closeDialog();
  }

  return <div className="page-shell">
    <AdminPageHeader eyebrow={`Catalog · ${String(items.length).padStart(2, '0')} treatments`} title="Services" description="Shape the menu with clarity: considered treatments, transparent pricing, and room for craft." action={<button type="button" onClick={() => setIsAdding(true)} className="btn-primary"><Plus size={15} className="mr-2" />Add service</button>} />
    <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((service) => <article key={service.name} className="card-surface flex min-h-56 flex-col p-5"><div className="flex items-start justify-between gap-3"><span className="text-[10px] uppercase tracking-[0.2em] text-espresso">{service.category}</span><button type="button" role="switch" aria-label={`Make ${service.name} ${service.visible ? 'hidden' : 'visible'}`} aria-checked={service.visible} onClick={() => setItems((current) => current.map((item) => item.name === service.name ? { ...item, visible: !item.visible } : item))} className={`relative h-5 w-9 rounded-full border transition-colors ${service.visible ? 'border-champagne bg-champagne' : 'border-warm-stone bg-warm-stone'}`}><span className={`absolute top-1 h-3 w-3 rounded-full bg-bone shadow-sm transition-transform ${service.visible ? 'translate-x-5' : 'translate-x-1'}`} /></button></div><h2 className="mt-8 font-serif text-2xl text-ink">{service.name}</h2><div className="mt-auto flex items-end justify-between border-t border-warm-stone pt-4"><div><p className="tabular-nums text-sm font-medium">{formatCurrency(service.price)}</p><p className="mt-1 text-xs text-espresso">{service.duration} min</p></div><span className={`text-[10px] uppercase tracking-[0.16em] ${service.visible ? 'text-emerald-700' : 'text-espresso'}`}>{service.visible ? 'Visible' : 'Hidden'}</span></div></article>)}
    </div>
    {items.length === 0 ? <div className="mt-7"><EmptyState title="No services yet" description="Add the first treatment to start shaping your menu." /></div> : null}
    {isAdding ? <AdminDialog title="Add a service" description="Create a treatment for the atelier menu. This demo updates the current admin session." onClose={closeDialog}><form onSubmit={handleSubmit} className="space-y-4"><AdminField label="Service name"><input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className={adminInputClass} placeholder="e.g. Scalp Renewal Ritual" /></AdminField><div className="grid gap-4 sm:grid-cols-2"><AdminField label="Category"><input required value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className={adminInputClass} placeholder="Treatments" /></AdminField><AdminField label="Duration (minutes)"><input required min="15" step="15" type="number" value={form.duration} onChange={(event) => setForm((current) => ({ ...current, duration: event.target.value }))} className={adminInputClass} /></AdminField></div><AdminField label="Price (₹)"><input required min="1" step="100" type="number" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} className={adminInputClass} placeholder="2500" /></AdminField>{error ? <p role="alert" className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}<div className="flex justify-end gap-3 pt-2"><button type="button" onClick={closeDialog} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Create service</button></div></form></AdminDialog> : null}
  </div>;
}
