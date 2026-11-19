export interface Event {
  id: string;
  endpoint: string;
  payload: string;
}
export interface Transport {
  // Resolves with accepted event IDs; unaccepted IDs remain pending for later delivery.
  post(endpoint: string, events: Event[]): Promise<string[]>;
}
export class Outbox {
  private pending = new Map<string, Event>();
  private sent = new Set<string>();
  enqueue(event: Event): void {
    if (!event.id || !event.endpoint) throw new Error("event identity required");
    if (this.sent.has(event.id) || this.pending.has(event.id)) return;
    this.pending.set(event.id, { ...event });
  }
  list(): Event[] {
    return [...this.pending.values()].map(event => ({ ...event }));
  }
  acknowledge(ids: string[]): void {
    for (const id of ids) {
      if (!this.pending.has(id)) continue;
      this.pending.delete(id);
      this.sent.add(id);
    }
  }
  hasPending(id: string): boolean {
    return this.pending.has(id);
  }
  wasSent(id: string): boolean {
    return this.sent.has(id);
  }
  counts(): { pending: number; sent: number } {
    return { pending: this.pending.size, sent: this.sent.size };
  }
}
export function groupEvents(events: Event[]): Map<string, Event[]> {
  const groups = new Map<string, Event[]>();
  for (const event of events) {
    const group = groups.get(event.endpoint) ?? [];
    group.push(event);
    groups.set(event.endpoint, group);
  }
  return groups;
}
