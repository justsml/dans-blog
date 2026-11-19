import type { ScheduleRepo } from "./repo";
import { type Schedule, nextRunAt, validateSchedule } from "./schedules";

export interface ReportEmail {
  to: string;
  reportId: string;
  subject: string;
}

export interface Mailer {
  send(email: ReportEmail): Promise<void>;
}

export interface RunResult {
  sent: string[];
  failed: string[];
}

export type NewSchedule = Omit<Schedule, "id" | "lastRunAt" | "createdAt">;

let counter = 0;

export function createSchedule(repo: ScheduleRepo, input: NewSchedule, now: number): Schedule {
  const s: Schedule = { ...input, id: `sch_${now.toString(36)}_${++counter}`, createdAt: now };
  validateSchedule(s);
  repo.save(s);
  return s;
}

/**
 * Cron calls this once a minute. Sends every schedule whose next run since its last
 * send has arrived. A failed send is retried on the next tick.
 */
export async function runDue(repo: ScheduleRepo, mailer: Mailer, now: number): Promise<RunResult> {
  const result: RunResult = { sent: [], failed: [] };
  for (const s of repo.all()) {
    const due = nextRunAt(s, s.lastRunAt ?? s.createdAt);
    if (due > now) continue;
    try {
      await mailer.send({ to: s.ownerEmail, reportId: s.reportId, subject: subjectFor(s, due) });
      s.lastRunAt = now;
      repo.save(s);
      result.sent.push(s.id);
    } catch {
      result.failed.push(s.id);
    }
  }
  return result;
}

function subjectFor(s: Schedule, due: number): string {
  return `Report ${s.reportId} for ${new Date(due).toISOString().slice(0, 10)}`;
}
