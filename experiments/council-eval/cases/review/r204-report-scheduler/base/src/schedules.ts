export const HOUR_MS = 60 * 60 * 1000;
export const DAY_MS = 24 * HOUR_MS;

export interface Schedule {
  id: string;
  ownerEmail: string;
  reportId: string;
  /** Hour of the day (0-23, UTC) the report is sent. */
  hourUtc: number;
  /** Epoch ms of the last successful send. */
  lastRunAt?: number;
  createdAt: number;
}

export class ScheduleError extends Error {}

export function validateSchedule(s: Schedule) {
  if (!Number.isInteger(s.hourUtc) || s.hourUtc < 0 || s.hourUtc > 23) {
    throw new ScheduleError("hour must be a whole number from 0 to 23");
  }
  if (!/^[^@\s]+@[^@\s]+$/.test(s.ownerEmail)) throw new ScheduleError("owner email is invalid");
  if (!s.reportId) throw new ScheduleError("report is required");
}

/** The first send time strictly after `after` (epoch ms). */
export function nextRunAt(s: Schedule, after: number): number {
  const d = new Date(after);
  let run = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), s.hourUtc);
  if (run <= after) run += DAY_MS;
  return run;
}
