import { type AuditReader } from "./store";
import { recent, actionCounts } from "./service";
export interface ConsoleRequest {
  companyId: string;
  canReadAudit: boolean;
}
export async function consoleView(reader: AuditReader, request: ConsoleRequest) {
  if (!request.canReadAudit) throw new Error("permission denied");
  const entries = await recent(reader, request.companyId);
  return {
    companyId: request.companyId,
    entries,
    counts: actionCounts(entries),
    cacheControl: "no-store",
  };
}
