export type Status = "queued" | "running" | "done" | "failed";
export interface Job {
  id: string;
  payload: string;
  attempts: number;
  maxAttempts: number;
  availableAt: number;
  status: Status;
  error?: string;
}
export class Queue {
  private rows = new Map<string, Job>();
  enqueue(id: string, payload: string, maxAttempts = 3): Job {
    if (this.rows.has(id)) throw new Error("duplicate job");
    if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
      throw new Error("invalid attempt limit");
    }
    const job: Job = {
      id, payload, maxAttempts,
      attempts: 0,
      availableAt: 0,
      status: "queued",
    };
    this.rows.set(id, job);
    return job;
  }
  // Worker claims must happen before awaiting handlers: multiple pollers share a queue.
  claim(id: string, now: number): Job | undefined {
    const row = this.rows.get(id);
    if (!row || row.status !== "queued" || row.availableAt > now) return;
    row.status = "running";
    row.attempts++;
    return row;
  }
  get(id: string): Job | undefined {
    return this.rows.get(id);
  }
  ready(now: number): string[] {
    return [...this.rows.values()]
      .filter(j => j.status === "queued" && j.availableAt <= now)
      .map(j => j.id);
  }
  counts(): Record<Status, number> {
    const counts = { queued: 0, running: 0, done: 0, failed: 0 };
    for (const row of this.rows.values()) counts[row.status]++;
    return counts;
  }
}
