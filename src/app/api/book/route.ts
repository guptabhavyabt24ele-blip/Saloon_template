import { NextResponse } from 'next/server';
import { z } from 'zod';
import { services as fallbackServices } from '@/lib/data';
import { calculateDuration, isSlotAvailable } from '@/lib/booking';
import { getPublicServices, getSupabaseAdmin, makeReference } from '@/app/api/_lib/supabase';

const bookingSchema = z.object({
  service: z.string().min(1),
  stylistId: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(40),
  email: z.string().trim().email().or(z.literal('')).optional(),
  note: z.string().trim().max(2000).optional()
});

export async function POST(request: Request) {
  try {
    const parsed = bookingSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'Please complete all required booking details.' }, { status: 400 });

    const availableServices = await getPublicServices();
    const selectedService = availableServices.find((service) => service.slug === parsed.data.service)
      ?? fallbackServices.find((service) => service.slug === parsed.data.service);
    if (!selectedService) return NextResponse.json({ error: 'Selected service is unavailable.' }, { status: 404 });

    const start = new Date(`${parsed.data.date}T${parsed.data.time}:00Z`);
    if (Number.isNaN(start.getTime())) return NextResponse.json({ error: 'The requested date or time is invalid.' }, { status: 400 });
    const totalMinutes = calculateDuration([{ durationMinutes: selectedService.duration }]) + 25;
    const end = new Date(start.getTime() + totalMinutes * 60 * 1000);
    if (!isSlotAvailable({ staffId: parsed.data.stylistId, workingHours: [], appointments: [] }, start.toISOString(), end.toISOString())) {
      return NextResponse.json({ error: 'The requested time is invalid.' }, { status: 400 });
    }

    const bookingRef = makeReference();
    const client = getSupabaseAdmin();
    if (client) {
      const { data: salon } = await client.from('salons').select('id').eq('slug', 'velora').maybeSingle();
      if (salon?.id) {
        const { data: customer, error: customerError } = await client.from('customers').insert({
          salon_id: salon.id, full_name: parsed.data.name,
          phone: parsed.data.phone, email: parsed.data.email || null, notes: parsed.data.note || null
        }).select('id').single();
        if (customerError) throw customerError;
        const { data: service } = await client.from('services').select('id').eq('slug', selectedService.slug).eq('salon_id', salon.id).maybeSingle();
        const { error: appointmentError } = await client.from('appointments').insert({
          salon_id: salon.id, customer_id: customer?.id ?? null, staff_id: parsed.data.stylistId,
          service_id: service?.id ?? null, booking_ref: bookingRef, scheduled_at: start.toISOString(), status: 'pending',
          total_price: selectedService.price, deposit_amount: Math.round(selectedService.price * 0.3), notes: parsed.data.note || null
        });
        if (appointmentError) throw appointmentError;
      }
    }

    return NextResponse.json({ success: true, bookingRef, service: selectedService.name, total: selectedService.price, startsAt: start.toISOString(), endsAt: end.toISOString(), message: 'Appointment created successfully.' });
  } catch (error) {
    console.error('Booking failed', error);
    return NextResponse.json({ error: 'We could not complete the booking. Please try again.' }, { status: 500 });
  }
}
