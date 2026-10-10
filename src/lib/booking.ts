export type BookingServiceInput = {
  id?: string;
  name?: string;
  durationMinutes: number;
  prepMinutes?: number;
  cleanUpMinutes?: number;
  price?: number;
};

export type StaffAppointment = {
  stylistId: string;
  startsAt: string;
  endsAt: string;
};

export type StaffAvailability = {
  staffId: string;
  workingHours: Array<{ day: number; start: string; end: string }>;
  appointments: StaffAppointment[];
};

export type BookingSummary = {
  totalDurationMinutes: number;
  totalPrice: number;
  deposit: number;
  finalTotal: number;
};

export function calculateDuration(services: BookingServiceInput[]): number {
  return services.reduce((total, service) => total + service.durationMinutes, 0);
}

export function calculateBookingSummary(services: BookingServiceInput[]): BookingSummary {
  const totalDurationMinutes = calculateDuration(services);
  const totalPrice = services.reduce((sum, service) => sum + (service.price ?? 0), 0);
  const deposit = Math.round(totalPrice * 0.3);

  return {
    totalDurationMinutes,
    totalPrice,
    deposit,
    finalTotal: totalPrice
  };
}

export function generateAvailableSlots({
  dayStart,
  dayEnd,
  slotMinutes,
  existingAppointments = [],
  timezone = 'Asia/Kolkata'
}: {
  dayStart: string;
  dayEnd: string;
  slotMinutes: number;
  existingAppointments?: StaffAppointment[];
  timezone?: string;
}): string[] {
  const toMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const dayStartMinutes = toMinutes(dayStart);
  const dayEndMinutes = toMinutes(dayEnd);

  const slots: string[] = [];

  for (let cursor = dayStartMinutes; cursor + slotMinutes <= dayEndMinutes; cursor += slotMinutes) {
    const hours = Math.floor(cursor / 60);
    const minutes = cursor % 60;
    const slotLabel = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    const slotStartMinutes = cursor;
    const slotEndMinutes = cursor + slotMinutes;

    const overlaps = existingAppointments.some((appointment) => {
      const startsAt = new Date(appointment.startsAt).getTime();
      const endsAt = new Date(appointment.endsAt).getTime();
      const appointmentStartMinutes = new Date(startsAt).getUTCHours() * 60 + new Date(startsAt).getUTCMinutes();
      const appointmentEndMinutes = new Date(endsAt).getUTCHours() * 60 + new Date(endsAt).getUTCMinutes();

      return slotStartMinutes < appointmentEndMinutes && slotEndMinutes > appointmentStartMinutes;
    });

    if (!overlaps) {
      slots.push(slotLabel);
    }
  }

  if (timezone === 'Asia/Kolkata') {
    return slots;
  }

  return slots;
}

export function isSlotAvailable(
  availability: StaffAvailability,
  proposedStart: string,
  proposedEnd: string,
  appointments: StaffAppointment[] = availability.appointments
): boolean {
  const start = new Date(proposedStart).getTime();
  const end = new Date(proposedEnd).getTime();

  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) {
    return false;
  }

  const overlaps = appointments.some((booking) => {
    if (booking.stylistId !== availability.staffId) {
      return false;
    }

    const bookingStart = new Date(booking.startsAt).getTime();
    const bookingEnd = new Date(booking.endsAt).getTime();

    return start < bookingEnd && end > bookingStart;
  });

  return !overlaps;
}
