import { Queue } from "./queue";
import { drain, type Handler } from "./service";
export interface PollReport {
  executed: number;
  pending: number;
  failed: number;
}
export async function poll(queue: Queue, handler: Handler, now: number): Promise<PollReport> {
  const executed = await drain(queue, handler, now);
  const counts = queue.counts();
  return {
    executed,
    pending: counts.queued,
    failed: counts.failed,
  };
}
