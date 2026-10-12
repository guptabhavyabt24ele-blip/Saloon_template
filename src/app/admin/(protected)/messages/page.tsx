'use client';

import { useCallback, useState } from 'react';
import { Mail, MailOpen } from 'lucide-react';
import { adminMessages } from '@/components/admin/admin-data';
import { AdminDialog, AdminPageHeader, StatusBadge } from '@/components/admin/admin-ui';

type Message = (typeof adminMessages)[number] & { status: 'unread' | 'read' | 'archived' };

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(adminMessages as Message[]);
  const [selected, setSelected] = useState<Message | null>(null);
  const closeDialog = useCallback(() => setSelected(null), []);
  function updateStatus(email: string, status: Message['status']) {
    setMessages((current) => current.map((item) => item.email === email ? { ...item, status } : item));
    setSelected((current) => current?.email === email ? { ...current, status } : current);
  }
  const visibleMessages = messages.filter((message) => message.status !== 'archived');
  return <div className="page-shell"><AdminPageHeader eyebrow={`Inbox · ${visibleMessages.length} messages`} title="Messages" description="Keep the conversation warm, clear, and close to the work." /><div className="mt-7 grid gap-3">{visibleMessages.map((message) => <article key={message.email} className={`card-surface flex cursor-pointer flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between ${message.status === 'unread' ? 'border-l-2 border-l-champagne' : ''}`} onClick={() => { setSelected(message); if (message.status === 'unread') updateStatus(message.email, 'read'); }}><div className="flex gap-4"><div className="mt-1 text-champagne">{message.status === 'unread' ? <Mail size={18} strokeWidth={1.5} /> : <MailOpen size={18} strokeWidth={1.5} />}</div><div><div className="flex flex-wrap items-center gap-3"><h2 className="font-medium">{message.subject}</h2><StatusBadge status={message.status} /></div><p className="mt-1 text-sm text-espresso">{message.name} · {message.email}</p><p className="mt-3 max-w-2xl text-sm leading-6 text-espresso">{message.preview}</p></div></div><div className="flex items-center gap-4 md:flex-col md:items-end"><span className="text-xs text-espresso">{message.received}</span><button type="button" onClick={(event) => { event.stopPropagation(); updateStatus(message.email, message.status === 'unread' ? 'read' : 'unread'); }} className="text-xs font-medium text-ink underline decoration-champagne underline-offset-4">Mark {message.status === 'unread' ? 'as read' : 'unread'}</button></div></article>)}{visibleMessages.length === 0 ? <p role="status" className="border border-dashed border-warm-stone p-10 text-center text-sm text-espresso">Your inbox is clear.</p> : null}</div>{selected ? <AdminDialog title={selected.subject} description={`${selected.name} · ${selected.email} · ${selected.received}`} onClose={closeDialog}><p className="text-sm leading-7 text-espresso">{selected.preview}</p><div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={() => updateStatus(selected.email, selected.status === 'read' ? 'unread' : 'read')} className="btn-secondary">Mark {selected.status === 'read' ? 'unread' : 'read'}</button><button type="button" onClick={() => { updateStatus(selected.email, 'archived'); closeDialog(); }} className="btn-primary">Archive message</button><a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject)}`} className="btn-secondary">Reply by email</a></div></AdminDialog> : null}</div>;
}
