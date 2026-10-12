'use client';

import { FormEvent, useState } from 'react';
import { AdminField, AdminPageHeader, adminInputClass } from '@/components/admin/admin-ui';

type Settings = { name: string; email: string; address: string; opening: string; closing: string; deposit: string; window: string };
const initialSettings: Settings = { name: 'Velora Salon Studio', email: 'hello@velora.studio', address: '12 Alibaug House, Bandra West, Mumbai', opening: '09:00', closing: '19:00', deposit: '25%', window: '30 days' };

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  function update<K extends keyof Settings>(key: K, value: Settings[K]) { setSettings((current) => ({ ...current, [key]: value })); setSaved(false); setError(''); }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!settings.name.trim() || !settings.email.includes('@') || !settings.address.trim()) { setError('Please provide a studio name, valid email, and address.'); setSaved(false); return; }
    setSaved(true); setError('');
  }
  return <div className="page-shell"><AdminPageHeader eyebrow="Configuration · Velora Studio" title="Settings" description="Set the practical details behind a distinctly personal visit." /><form onSubmit={handleSubmit} className="mt-7 grid max-w-4xl gap-6"><section className="card-surface p-5 md:p-6"><p className="text-[10px] uppercase tracking-editorial text-espresso">Studio profile</p><h2 className="mt-2 font-serif text-2xl">Public details</h2><div className="mt-6 grid gap-4 md:grid-cols-2"><AdminField label="Studio name"><input required value={settings.name} onChange={(event) => update('name', event.target.value)} className={adminInputClass} /></AdminField><AdminField label="Contact email"><input required type="email" value={settings.email} onChange={(event) => update('email', event.target.value)} className={adminInputClass} /></AdminField><AdminField label="Address"><input required value={settings.address} onChange={(event) => update('address', event.target.value)} className={adminInputClass} /></AdminField></div></section><section className="card-surface p-5 md:p-6"><p className="text-[10px] uppercase tracking-editorial text-espresso">Booking rules</p><h2 className="mt-2 font-serif text-2xl">Operating rhythm</h2><div className="mt-6 grid gap-4 md:grid-cols-2"><AdminField label="Opening time"><select value={settings.opening} onChange={(event) => update('opening', event.target.value)} className={adminInputClass}><option>09:00</option><option>10:00</option></select></AdminField><AdminField label="Closing time"><select value={settings.closing} onChange={(event) => update('closing', event.target.value)} className={adminInputClass}><option>18:00</option><option>19:00</option><option>20:00</option></select></AdminField><AdminField label="Deposit requirement"><select value={settings.deposit} onChange={(event) => update('deposit', event.target.value)} className={adminInputClass}><option>25%</option><option>50%</option><option>100%</option></select></AdminField><AdminField label="Booking window"><select value={settings.window} onChange={(event) => update('window', event.target.value)} className={adminInputClass}><option>14 days</option><option>30 days</option><option>60 days</option></select></AdminField></div></section><div className="flex flex-wrap items-center gap-4"><button type="submit" className="btn-primary">Save changes</button>{saved ? <span role="status" className="text-sm text-emerald-700">Settings saved for this session.</span> : null}{error ? <span role="alert" className="text-sm text-red-700">{error}</span> : null}</div></form></div>;
}
