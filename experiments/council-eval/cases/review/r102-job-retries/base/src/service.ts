import { Queue } from "./queue";
export type Handler = (payload: string) => Promise<void>;
export interface RunResult {
  ran: boolean;
  status?: string;
}
export async function run(queue: Queue, id: string, handler: Handler, now = Date.now()): Promise<RunResult> {
  const job = queue.claim(id, now);
  if (!job) return { ran: false };
  try {
    await handler(job.payload);
    job.status = "done";
  } catch (error) {
    job.error = String(error);
    job.status = "failed";
  }
  return { ran: true, status: job.status };
}
export async function drain(queue: Queue, handler: Handler, now: number): Promise<number> {
  let count = 0;
  for (const id of queue.ready(now)) {
    const result = await run(queue, id, handler, now);
    if (result.ran) count++;
  }
  return count;
}
