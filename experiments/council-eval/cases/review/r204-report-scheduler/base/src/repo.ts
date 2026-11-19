import type { Schedule } from "./schedules";

/** Row in the `report_schedules` table. */
export interface ScheduleRecord {
  id: string;
  owner_email: string;
  report_id: string;
  hour_utc: number;
  last_run_at: number | null;
  created_at: number;
}

export function toRecord(s: Schedule): ScheduleRecord {
  return {
    id: s.id,
    owner_email: s.ownerEmail,
    report_id: s.reportId,
    hour_utc: s.hourUtc,
    last_run_at: s.lastRunAt ?? null,
    created_at: s.createdAt,
  };
}

export function fromRecord(r: ScheduleRecord): Schedule {
  return {
    id: r.id,
    ownerEmail: r.owner_email,
    reportId: r.report_id,
    hourUtc: r.hour_utc,
    lastRunAt: r.last_run_at ?? undefined,
    createdAt: r.created_at,
  };
}

/** In-memory stand-in for the table; production swaps in the Postgres adapter. */
export class ScheduleRepo {
  private rows = new Map<string, ScheduleRecord>();

  constructor(rows: ScheduleRecord[] = []) {
    for (const r of rows) this.rows.set(r.id, { ...r });
  }

  save(s: Schedule) {
    this.rows.set(s.id, toRecord(s));
  }

  get(id: string): Schedule | undefined {
    const r = this.rows.get(id);
    return r && fromRecord(r);
  }

  all(): Schedule[] {
    return [...this.rows.values()].map(fromRecord);
  }

  records(): ScheduleRecord[] {
    return [...this.rows.values()].map((r) => ({ ...r }));
  }
}
