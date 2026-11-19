import { SessionStore } from "./sessions";
import { authenticate, sessionView } from "./service";
export interface AuthenticatedRequest {
  token: string;
  path: string;
}
export function accountResponse(store: SessionStore, request: AuthenticatedRequest, now: number) {
  const userId = authenticate(store, request.token, now);
  const session = sessionView(store, request.token, now);
  return {
    userId,
    path: request.path,
    session,
    cacheControl: "no-store",
  };
}
