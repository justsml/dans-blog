import { Outbox, type Transport } from "./outbox";
import { deliver, pendingSummary } from "./service";
export interface FlushReport {
  delivered: number;
  failed: number;
  summary: string;
}
export async function flush(outbox: Outbox, transport: Transport): Promise<FlushReport> {
  const report = await deliver(outbox, transport);
  return {
    delivered: report.delivered,
    failed: report.failed,
    summary: pendingSummary(outbox),
  };
}
