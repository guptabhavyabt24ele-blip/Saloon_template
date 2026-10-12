'use client';

import { FormEvent, useCallback, useState } from 'react';
import { Plus } from 'lucide-react';
import { adminStaff } from '@/components/admin/admin-data';
import { AdminDialog, AdminField, AdminPageHeader, adminInputClass } from '@/components/admin/admin-ui';

type StaffMember = (typeof adminStaff)[number];
type StaffForm = { name: string; role: string; focus: string };
const emptyForm: StaffForm = { name: '', role: '', focus: '' };

export default function StaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(adminStaff);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<StaffForm>(emptyForm);
  const [error, setError] = useState('');
  const closeDialog = useCallback(() => { setIsAdding(false); setError(''); }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();
    const role = form.role.trim();
    const focus = form.focus.trim();
    if (!name || !role || !focus) { setError('Add a name, role, and specialty focus.'); return; }
    if (staff.some((member) => member.name.toLowerCase() === name.toLowerCase())) { setError('A team member with this name already exists.'); return; }
    setStaff((current) => [...current, { name, role, focus, appointments: 0, load: 0, active: true }]);
    setForm(emptyForm);
    closeDialog();
  }

  return <div className="page-shell"><AdminPageHeader eyebrow={`People · ${String(staff.length).padStart(2, '0')} profiles`} title="The team" description="A clear view of the people shaping every Velora appointment." action={<button type="button" onClick={() => setIsAdding(true)} className="btn-primary"><Plus size={15} className="mr-2" />Add team member</button>} /><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{staff.map((member) => <article key={member.name} className="card-surface p-5"><div className="flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center bg-ink font-serif text-xl text-bone">{member.name.split(' ').map((word) => word[0]).join('')}</div><button type="button" role="switch" aria-label={`${member.active ? 'Deactivate' : 'Activate'} ${member.name}`} aria-checked={member.active} onClick={() => setStaff((current) => current.map((item) => item.name === member.name ? { ...item, active: !item.active } : item))} className={`relative h-5 w-9 rounded-full border transition-colors ${member.active ? 'border-champagne bg-champagne' : 'border-warm-stone bg-warm-stone'}`}><span className={`absolute top-1 h-3 w-3 rounded-full bg-bone shadow-sm transition-transform ${member.active ? 'translate-x-5' : 'translate-x-1'}`} /></button></div><h2 className="mt-6 font-serif text-2xl">{member.name}</h2><p className="mt-1 text-sm text-champagne">{member.role}</p><p className="mt-4 text-xs leading-5 text-espresso">{member.focus}</p><div className="mt-6 border-t border-warm-stone pt-4"><div className="flex justify-between text-xs"><span className="text-espresso">Appointments</span><span className="tabular-nums font-medium">{member.appointments} this month</span></div><div className="mt-3 h-1.5 bg-warm-stone"><div className="h-full bg-ink" style={{ width: `${member.load}%` }} /></div></div></article>)}</div>{isAdding ? <AdminDialog title="Add a team member" description="Add a profile to the current atelier roster." onClose={closeDialog}><form onSubmit={handleSubmit} className="space-y-4"><AdminField label="Name"><input required value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className={adminInputClass} placeholder="e.g. Mira Kapoor" /></AdminField><AdminField label="Role"><input required value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))} className={adminInputClass} placeholder="Senior stylist" /></AdminField><AdminField label="Specialty focus"><textarea required rows={3} value={form.focus} onChange={(event) => setForm((current) => ({ ...current, focus: event.target.value }))} className={`${adminInputClass} resize-none`} placeholder="Colour, cuts & finishing" /></AdminField>{error ? <p role="alert" className="border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}<div className="flex justify-end gap-3 pt-2"><button type="button" onClick={closeDialog} className="btn-secondary">Cancel</button><button type="submit" className="btn-primary">Add member</button></div></form></AdminDialog> : null}</div>;
}
