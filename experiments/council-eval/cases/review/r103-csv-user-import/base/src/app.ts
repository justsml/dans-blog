import { Users } from "./users";
import { importUsers } from "./service";
export interface ImportRequest {
  companyId: string;
  csv: string;
  canManageUsers: boolean;
}
export function handleImport(users: Users, request: ImportRequest) {
  if (!request.canManageUsers) throw new Error("permission denied");
  const result = importUsers(users, request.companyId, request.csv);
  return {
    company: request.companyId,
    result,
    users: users.list(request.companyId),
  };
}
