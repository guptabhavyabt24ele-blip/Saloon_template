import { describe, expect, it } from 'vitest';
import {
  calculateBookingSummary,
  calculateDuration,
  generateAvailableSlots,
  isSlotAvailable,
  type StaffAvailability
} from './booking';

describe('booking logic', () => {
  it('calculates total service duration with buffers', () => {
    const duration = calculateDuration([
      { durationMinutes: 45, prepMinutes: 10, cleanUpMinutes: 15 },
      { durationMinutes: 60, prepMinutes: 5, cleanUpMinutes: 10 }
    ]);

    expect(duration).toBe(105);
  });

  it('creates a booking summary with total, deposit, and duration', () => {
    const summary = calculateBookingSummary([
      { id: 'cut', name: 'Signature Precision Cut', price: 1800, durationMinutes: 45 },
      { id: 'gloss', name: 'Gloss & Tone Refresh', price: 3200, durationMinutes: 90 }
    ]);

    expect(summary.totalDurationMinutes).toBe(135);
    expect(summary.totalPrice).toBe(5000);
    expect(summary.deposit).toBe(1500);
    expect(summary.finalTotal).toBe(5000);
  });

  it('generates only available slots outside existing bookings', () => {
    const slots = generateAvailableSlots({
      dayStart: '09:00',
      dayEnd: '18:00',
      slotMinutes: 30,
      existingAppointments: [
        { stylistId: 'staff-1', startsAt: '2026-10-10T10:00:00.000Z', endsAt: '2026-10-10T11:00:00.000Z' }
      ],
      timezone: 'Asia/Kolkata'
    });

    expect(slots[0]).toMatch(/09:00/);
    expect(slots.some((slot) => slot.includes('10:00'))).toBe(false);
    expect(slots.some((slot) => slot.includes('09:30'))).toBe(true);
  });

  it('rejects overlapping appointments for the same stylist', () => {
    const appointments = [
      { stylistId: 'staff-1', startsAt: '2026-10-10T10:00:00.000Z', endsAt: '2026-10-10T11:00:00.000Z' }
    ];

    const availability: StaffAvailability = {
      staffId: 'staff-1',
      workingHours: [{ day: 1, start: '09:00', end: '18:00' }],
      appointments
    };

    expect(isSlotAvailable(availability, '2026-10-10T10:30:00.000Z', '2026-10-10T11:30:00.000Z')).toBe(false);
  });

  it('allows a non-conflicting slot', () => {
    const availability: StaffAvailability = {
      staffId: 'staff-2',
      workingHours: [{ day: 1, start: '09:00', end: '18:00' }],
      appointments: [
        { stylistId: 'staff-2', startsAt: '2026-10-10T12:00:00.000Z', endsAt: '2026-10-10T13:00:00.000Z' }
      ]
    };

    expect(isSlotAvailable(availability, '2026-10-10T09:00:00.000Z', '2026-10-10T09:45:00.000Z')).toBe(true);
  });
});
