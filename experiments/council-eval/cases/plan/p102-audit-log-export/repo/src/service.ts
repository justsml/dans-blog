import { type AuditEntry, type AuditReader, publicDetails } from "./store";
export class ExportError extends Error {}
export interface AuditSummary {
  id: string;
  at: string;
  action: string;
  actor: string;
  details: Record<string, unknown>;
}
export function summarize(entry: AuditEntry): AuditSummary {
  return {
    id: entry.id,
    at: entry.at,
    action: entry.action,
    actor: entry.actor,
    details: publicDetails(entry.details),
  };
}
export async function recent(reader: AuditReader, company: string): Promise<AuditSummary[]> {
  const page = await reader.page(company);
  return page.entries.map(summarize);
}
export function actionCounts(entries: AuditSummary[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const entry of entries) {
    counts[entry.action] = (counts[entry.action] ?? 0) + 1;
  }
  return counts;
}
