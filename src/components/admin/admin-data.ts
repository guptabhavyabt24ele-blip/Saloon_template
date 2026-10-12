export type AppointmentStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export type AdminAppointment = {
  id: string;
  client: string;
  email: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  duration: number;
  amount: number;
  deposit: number;
  status: AppointmentStatus;
};

export const adminAppointments: AdminAppointment[] = [
  { id: 'apt-01', client: 'Aisha Patel', email: 'aisha.patel@example.com', service: 'Balayage Artistry', stylist: 'Rhea Kapoor', date: '18 Oct 2026', time: '09:30', duration: 120, amount: 4800, deposit: 1200, status: 'confirmed' },
  { id: 'apt-02', client: 'Naina Shah', email: 'naina.shah@example.com', service: 'Signature Precision Cut', stylist: 'Nisha Rao', date: '18 Oct 2026', time: '10:15', duration: 45, amount: 1800, deposit: 450, status: 'completed' },
  { id: 'apt-03', client: 'Kabir Singh', email: 'kabir.singh@example.com', service: 'Beard Sculpt & Groom', stylist: 'Aryan Mehta', date: '18 Oct 2026', time: '11:00', duration: 30, amount: 1200, deposit: 300, status: 'pending' },
  { id: 'apt-04', client: 'Meher Khan', email: 'meher.khan@example.com', service: 'Repair Ritual Treatment', stylist: 'Rhea Kapoor', date: '19 Oct 2026', time: '12:30', duration: 60, amount: 2200, deposit: 550, status: 'confirmed' },
  { id: 'apt-05', client: 'Sana Qureshi', email: 'sana.q@example.com', service: 'Gloss & Tone Refresh', stylist: 'Rhea Kapoor', date: '20 Oct 2026', time: '14:00', duration: 90, amount: 3200, deposit: 800, status: 'cancelled' },
  { id: 'apt-06', client: 'Tara Menon', email: 'tara.menon@example.com', service: 'Bridal Styling Signature', stylist: 'Nisha Rao', date: '21 Oct 2026', time: '15:45', duration: 150, amount: 9000, deposit: 2250, status: 'confirmed' }
];

export const adminStaff = [
  { name: 'Rhea Kapoor', role: 'Senior Stylist', focus: 'Colour, cuts & finishing', appointments: 18, load: 82, active: true },
  { name: 'Aryan Mehta', role: 'Grooming Expert', focus: 'Fades & beard artistry', appointments: 14, load: 64, active: true },
  { name: 'Nisha Rao', role: 'Bridal Stylist', focus: 'Styling & occasion looks', appointments: 16, load: 71, active: true },
  { name: 'Elena Rostova', role: 'Colourist', focus: 'Dimensional colour', appointments: 8, load: 42, active: false }
];

export const adminCustomers = [
  { name: 'Aisha Patel', email: 'aisha.patel@example.com', phone: '+91 98765 43210', bookings: 8, spend: 36400, lastVisit: '18 Oct 2026', note: 'Prefers low-maintenance colour.' },
  { name: 'Naina Shah', email: 'naina.shah@example.com', phone: '+91 98200 11882', bookings: 12, spend: 24800, lastVisit: '18 Oct 2026', note: 'Signature cut every six weeks.' },
  { name: 'Meher Khan', email: 'meher.khan@example.com', phone: '+91 98920 20334', bookings: 5, spend: 11700, lastVisit: '12 Sep 2026', note: 'Sensitive scalp; allow extra consultation time.' },
  { name: 'Tara Menon', email: 'tara.menon@example.com', phone: '+91 98190 66771', bookings: 3, spend: 18400, lastVisit: '04 Sep 2026', note: 'Bridal party enquiry.' }
];

export const adminMessages = [
  { name: 'Priya Desai', email: 'priya.desai@example.com', subject: 'Colour consultation', received: '18 Oct · 08:42', status: 'unread', preview: 'I would love to understand the best tone for my current colour...' },
  { name: 'Anika Rao', email: 'anika.rao@example.com', subject: 'Bridal availability', received: '17 Oct · 16:18', status: 'read', preview: 'Could you share your availability for a November wedding...' },
  { name: 'Dev Malhotra', email: 'dev.m@example.com', subject: 'Appointment change', received: '17 Oct · 11:05', status: 'read', preview: 'I need to move my appointment to next Thursday if possible...' }
];

export const adminServices = [
  { name: 'Signature Precision Cut', category: 'Haircuts', duration: 45, price: 1800, visible: true },
  { name: 'Gloss & Tone Refresh', category: 'Hair Colouring', duration: 90, price: 3200, visible: true },
  { name: 'Balayage Artistry', category: 'Hair Colouring', duration: 120, price: 4800, visible: true },
  { name: 'Beard Sculpt & Groom', category: 'Beard Grooming', duration: 30, price: 1200, visible: true },
  { name: 'Bridal Styling Signature', category: 'Bridal Makeup', duration: 150, price: 9000, visible: false }
];

export const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN')}`;
