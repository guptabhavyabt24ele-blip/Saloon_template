export type BookingServiceInput = {
  durationMinutes: number;
  prepMinutes?: number;
  cleanUpMinutes?: number;
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

export function calculateDuration(services: BookingServiceInput[]): number {
  return services.reduce((total, service) => total + service.durationMinutes, 0);
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
