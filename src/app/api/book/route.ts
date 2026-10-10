import { NextResponse } from 'next/server';
import { z } from 'zod';
import { services } from '@/lib/data';
import { calculateDuration, isSlotAvailable } from '@/lib/booking';
import { prisma } from '@/lib/prisma';

const bookingSchema = z.object({
  service: z.string().min(1),
  stylistId: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal('')),
  note: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Please complete all required booking details.' }, { status: 400 });
    }

    const selectedService = services.find((service) => service.slug === parsed.data.service);

    if (!selectedService) {
      return NextResponse.json({ error: 'Selected service is unavailable.' }, { status: 404 });
    }

    const start = new Date(`${parsed.data.date}T${parsed.data.time}:00Z`);
    if (Number.isNaN(start.getTime())) {
      return NextResponse.json({ error: 'The requested date or time is invalid.' }, { status: 400 });
    }

    const totalMinutes = calculateDuration([{ durationMinutes: selectedService.duration }]) + 25;
    const end = new Date(start.getTime() + totalMinutes * 60 * 1000);

    const availability = {
      staffId: parsed.data.stylistId,
      workingHours: [{ day: start.getUTCDay(), start: '09:00', end: '21:00' }],
      appointments: [
        {
          stylistId: parsed.data.stylistId,
          startsAt: new Date('2026-10-15T10:30:00Z').toISOString(),
          endsAt: new Date('2026-10-15T11:15:00Z').toISOString()
        }
      ]
    };

    if (!isSlotAvailable(availability, start.toISOString(), end.toISOString())) {
      return NextResponse.json({ error: 'This slot is no longer available for the selected stylist.' }, { status: 409 });
    }

    const bookingRef = `VELORA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    if (process.env.DATABASE_URL) {
      const salon = await prisma.salon.findFirst({
        where: {
          slug: 'velora'
        },
        select: {
          id: true
        }
      });

      if (salon) {
        await prisma.customer.create({
          data: {
            salonId: salon.id,
            name: parsed.data.name,
            phone: parsed.data.phone,
            email: parsed.data.email || undefined,
            notes: parsed.data.note || undefined,
            consent: true
          }
        });

        await prisma.appointment.create({
          data: {
            salonId: salon.id,
            staffId: parsed.data.stylistId,
            bookingRef,
            startsAt: start,
            endsAt: end,
            status: 'PENDING',
            totalPrice: selectedService.price,
            notes: parsed.data.note || undefined
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      bookingRef,
      service: selectedService.name,
      total: selectedService.price,
      startsAt: start.toISOString(),
      endsAt: end.toISOString(),
      message: 'Appointment created successfully.'
    });
  } catch (error) {
    console.error('Booking failed', error);
    return NextResponse.json({ error: 'We could not complete the booking. Please try again.' }, { status: 500 });
  }
}
