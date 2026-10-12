'use client';

import { FormEvent, useMemo, useState, useCallback } from 'react';
import { Plus, Search } from 'lucide-react';
import { adminAppointments, adminServices, adminStaff, type AppointmentStatus, formatCurrency } from '@/components/admin/admin-data';
import { AdminDialog, AdminField, AdminPageHeader, adminInputClass, EmptyState, StatusBadge } from '@/components/admin/admin-ui';

const statuses: Array<'all' | AppointmentStatus> = ['all', 'confirmed', 'pending', 'completed', 'cancelled'];
type Appointment = (typeof adminAppointments)[number];
type AppointmentForm = { client: string; email: string; service: string; stylist: string; date: string; time: string };
const emptyForm: AppointmentForm = { client: '', email: '', service: adminServices[0]?.name ?? '', stylist: adminStaff[0]?.name ?? '', date: '', time: '' };

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(adminAppointments);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'all' | AppointmentStatus>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<AppointmentForm>(emptyForm);
  const [error, setError] = useState('');
  const filtered = useMemo(() => appointments.filter((item) => (status === 'all' || item.status === status) && `${item.client} ${item.service} ${item.stylist}`.toLowerCase().includes(query.toLowerCase())), [appointments, query, status]);
  const closeDialog = useCallback(() => { setIsAdding(false); setError(''); }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client = form.client.trim();
    const email = form.email.trim();
    if (!client || !email || !form.service || !form.stylist || !form.date || !form.time) { setError('Complete every field to create the appointment.'); return; }
    const service = adminServices.find((item) => item.name === form.service);
    if (!service) { setError('Choose a valid service.'); return; }
    const date = new Date(`${form.date}T${form.time}`);
    if (Number.isNaN(date.getTime())) { setError('Choose a valid date and time.'); return; }
    const formattedDate = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const newAppointment: Appointment = { id: `apt-${Date.now()}`, client, email, service: service.name, stylist: form.stylist, date: formattedDate, time: form.time, duration: service.duration, amount: service.price, deposit: Math.round(service.price * 0.25), status: 'pending' };
    setAppointments((current) => [newAppointment, ...current]);
    setForm(emptyForm);
    closeDialog();
  }

  return <div className="page-shell"><AdminPageHeader eyebrow={`Bookings · ${appointments.length} this month`} title="Appointments" description="Keep every visit considered, confirmed, and beautifully on time." action={<button type="button" onClick={() => setIsAdding(true)} className="btn-primary"><Plus size={15} className="mr-2" />New appointment</button>} /><div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><label className="relative block md:w-80"><span className="sr-only">Search appointments</span><Search size={15} className="absolute left-3 top-3.5 text-espresso" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search client, service or stylist" className="w-full border border-warm-stone bg-white/50 py-3 pl-9 pr-3 text-sm outline-none focus:border-champagne focus:ring-1 focus:ring-champagne" /></label><div className="flex gap-1 overflow-x-auto pb-1" role="tablist" aria-label="Filter appointments">{statuses.map((item) => <button key={item} type="button" onClick={() => setStatus(item)} className={`whitespace-nowrap px-3 py-2 text-xs capitalize ${status === item ? 'bg-ink text-bone' : 'border border-warm-stone text-espresso hover:border-ink'}`}>{item}</button>)}</div></div><div className="card-surface mt-5 overflow-x-auto"><table className="min-w-[760px] w-full text-left text-sm"><thead className="border-b border-warm-stone bg-white/30 text-[10px] uppercase tracking-[0.2em] text-espresso"><tr>{['Client', 'Service', 'Stylist', 'Date & time', 'Amount', 'Status'].map((heading) => <th key={heading} className="px-5 py-4 font-medium">{heading}</th>)}</tr></thead><tbody>{filtered.map((item) => <tr key={item.id} className="border-b border-warm-stone/70 last:border-0 hover:bg-white/40"><td className="px-5 py-4"><p className="font-medium text-ink">{item.client}</p><p className="mt-1 text-xs text-espresso">{item.email}</p></td><td className="px-5 py-4 text-espresso">{item.service}<span className="mt-1 block text-xs">{item.duration} min</span></td><td className="px-5 py-4 text-espresso">{item.stylist}</td><td className="px-5 py-4 text-espresso"><span className="block">{item.date}</span><span className="tabular-nums mt-1 block text-xs">{item.time}</span></td><td className="tabular-nums px-5 py-4 font-medium">{formatCurrency(item.amount)}</td><td className="px-5 py-4"><StatusBadge status={item.status} /></td></tr>)}</tbody></table>{filtered.length === 0 ? <div className="p-8"><EmptyState title="No appointments found" description="Try another search or filter, or create a new appointment." /></div> : null}</div>{isAdding ? <AdminDialog title="New appointment" description="Add a booking to the current atelier schedule." onClose={closeDialog}><form onSubmit={handleSubmit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><AdminField label="Client name"><input required value={form.client} onChange={(event) => setForm((current) => ({ ...current, client: event.target.value }))} className={adminInputClass} /></AdminField><AdminField label="Email"><input required type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} className={adminInputClass} /></AdminField></div><AdminField label="Service"><select value={form.service} onChange={(event) => setForm((current) => ({ ...current, service: event.target.value }))} className={adminInputClass}>{adminServices.map((item) => <option key={item.name}>{item.name}</option>)}</select></AdminField><AdminField label="Stylist"><select value={form.stylist} onChange={(event) => setForm((current) => ({ ...current, stylist: event.target.value }))} className={adminInputClass}>{adminStaff.filter((item) => item.active).map((item) => <option key={item.name}>{item.name}</option>)}</select></AdminField><div className="grid gap-4 sm:grid-cols-2"><AdminField label="Date"><input required type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} className={adminInputClass} /></AdminField><AdminField label="Time"><input required type="time" value={form.time} onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))} className={adminInputClass} /></AdminField></div>{error ? <p role="alert" className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}<div className="flex justify-end gap-3 pt-2"><button type="button" onClick={closeDialog} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Create appointment</button></div></form></AdminDialog> : null}</div>;
}
