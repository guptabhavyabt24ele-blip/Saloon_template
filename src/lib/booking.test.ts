import { describe, expect, it } from 'vitest';
import { calculateDuration, isSlotAvailable, type StaffAvailability } from './booking';

describe('booking logic', () => {
  it('calculates total service duration with buffers', () => {
    const duration = calculateDuration([
      { durationMinutes: 45, prepMinutes: 10, cleanUpMinutes: 15 },
      { durationMinutes: 60, prepMinutes: 5, cleanUpMinutes: 10 }
    ]);

    expect(duration).toBe(105);
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
