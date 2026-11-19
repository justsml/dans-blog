import { Outbox, type Transport } from "./outbox";
export interface DeliveryReport {
  delivered: number;
  failed: number;
}
export async function deliver(outbox: Outbox, transport: Transport): Promise<DeliveryReport> {
  let delivered = 0;
  let failed = 0;
  for (const event of outbox.list()) {
    try {
      const accepted = await transport.post(event.endpoint, [event]);
      outbox.acknowledge(accepted.filter(id => id === event.id));
      delivered += accepted.includes(event.id) ? 1 : 0;
    } catch {
      failed++;
    }
  }
  return { delivered, failed };
}
export function pendingSummary(outbox: Outbox): string {
  const counts = outbox.counts();
  return counts.pending + " awaiting delivery, " + counts.sent + " delivered";
}
