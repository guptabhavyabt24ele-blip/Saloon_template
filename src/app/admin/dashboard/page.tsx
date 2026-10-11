import { redirect } from 'next/navigation';
import { getAuthSession } from '@/lib/auth';

type AppointmentStatus = 'Confirmed' | 'Pending' | 'Checked in' | 'Completed';

type Booking = {
  client: string;
  service: string;
  stylist: string;
  time: string;
  amount: string;
  status: AppointmentStatus;
};

const stats = [
  { label: 'Today\'s appointments', value: '28', change: '+12%' },
  { label: 'Revenue booked', value: '₹74,500', change: '+₹9,200' },
  { label: 'Pending confirmations', value: '6', change: '-2 vs yesterday' },
  { label: 'Returning clients', value: '43%', change: '+8%' }
];

const bookings: Booking[] = [
  { client: 'Aisha Patel', service: 'Balayage Artistry', stylist: 'Rhea', time: '09:30 AM', amount: '₹4,800', status: 'Confirmed' },
  { client: 'Naina Shah', service: 'Signature Precision Cut', stylist: 'Rhea', time: '10:15 AM', amount: '₹1,800', status: 'Checked in' },
  { client: 'Kabir Singh', service: 'Beard Sculpt & Groom', stylist: 'Aryan', time: '11:00 AM', amount: '₹1,200', status: 'Pending' },
  { client: 'Meher Khan', service: 'Repair Ritual Treatment', stylist: 'Rhea', time: '12:30 PM', amount: '₹2,200', status: 'Completed' },
  { client: 'Sana Qureshi', service: 'Gloss & Tone Refresh', stylist: 'Rhea', time: '02:00 PM', amount: '₹3,200', status: 'Confirmed' }
];

const staffLoad = [
  { name: 'Rhea Kapoor', load: 82, focus: 'Color + finishing', availability: '3 openings today' },
  { name: 'Aryan Mehta', load: 64, focus: 'Grooming + fades', availability: '5 openings today' },
  { name: 'Nisha Rao', load: 71, focus: 'Styling + bridal', availability: '2 openings today' }
];

const agenda = [
  { slot: '09:00', title: 'Color consultation', stylist: 'Rhea' },
  { slot: '10:15', title: 'Precision cut', stylist: 'Nisha' },
  { slot: '11:30', title: 'Beard sculpt', stylist: 'Aryan' },
  { slot: '13:00', title: 'Bridal trial prep', stylist: 'Nisha' },
  { slot: '15:45', title: 'Glow treatment', stylist: 'Rhea' }
];

function statusTone(status: AppointmentStatus) {
  switch (status) {
    case 'Confirmed':
      return 'bg-emerald-100 text-emerald-700';
    case 'Pending':
      return 'bg-amber-100 text-amber-700';
    case 'Checked in':
      return 'bg-sky-100 text-sky-700';
    case 'Completed':
      return 'bg-stone-200 text-stone-700';
    default:
      return 'bg-neutral-100 text-neutral-700';
  }
}

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const session = await getAuthSession();

  if (!session?.user || session.user.role !== 'SALON_OWNER') {
    redirect('/admin/login');
  }

  return (
    <main className="container-shell pb-16 pt-28 md:pt-36">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Dashboard</p>
          <h1 className="mt-3 font-serif text-4xl tracking-tight text-neutral-900 md:text-5xl">Salon operations overview</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn-secondary">Export report</button>
          <button className="btn-primary">New booking</button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card-surface p-5">
            <p className="text-sm text-neutral-500">{stat.label}</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="tabular-nums text-3xl font-semibold text-neutral-900">{stat.value}</p>
              <span className="text-xs font-medium text-emerald-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
        <div className="card-surface p-5 md:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Appointments</p>
              <h2 className="mt-2 font-serif text-3xl text-neutral-900">Today&apos;s bookings</h2>
            </div>
            <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-neutral-600">Updated 8 min ago</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-stone-200 text-xs uppercase tracking-[0.2em] text-neutral-500">
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Stylist</th>
                  <th className="pb-3 font-medium">Time</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={`${booking.client}-${booking.time}`} className="border-b border-stone-100 text-sm text-neutral-700 last:border-0">
                    <td className="py-4 font-medium text-neutral-900">{booking.client}</td>
                    <td className="py-4">{booking.service}</td>
                    <td className="py-4">{booking.stylist}</td>
                    <td className="py-4">{booking.time}</td>
                    <td className="py-4 font-medium text-neutral-900">{booking.amount}</td>
                    <td className="py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusTone(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Team load</p>
            <h2 className="mt-2 font-serif text-3xl text-neutral-900">Stylist capacity</h2>

            <div className="mt-6 space-y-5">
              {staffLoad.map((member) => (
                <div key={member.name}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-neutral-900">{member.name}</span>
                    <span className="text-neutral-500">{member.load}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-stone-200">
                    <div className="h-full rounded-full bg-neutral-900" style={{ width: `${member.load}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">{member.focus}</p>
                  <p className="text-xs font-medium text-emerald-600">{member.availability}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Agenda</p>
            <h2 className="mt-2 font-serif text-3xl text-neutral-900">Next up</h2>
            <div className="mt-5 space-y-3">
              {agenda.map((item) => (
                <div key={`${item.slot}-${item.title}`} className="flex items-center justify-between rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{item.slot}</p>
                    <p className="mt-1 font-medium text-neutral-900">{item.title}</p>
                  </div>
                  <span className="text-xs text-neutral-500">{item.stylist}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="card-surface p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Revenue</p>
          <h3 className="mt-3 font-serif text-3xl text-neutral-900">₹1,28,400</h3>
          <p className="mt-2 text-sm text-neutral-600">Projected revenue for this week based on confirmed bookings.</p>
        </div>
        <div className="card-surface p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Retention</p>
          <h3 className="mt-3 font-serif text-3xl text-neutral-900">68%</h3>
          <p className="mt-2 text-sm text-neutral-600">Returning clients this month with repeat color and treatment visits.</p>
        </div>
        <div className="card-surface p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Waitlist</p>
          <h3 className="mt-3 font-serif text-3xl text-neutral-900">11</h3>
          <p className="mt-2 text-sm text-neutral-600">Clients waiting for preferred stylist openings later this week.</p>
        </div>
      </section>
    </main>
  );
}
