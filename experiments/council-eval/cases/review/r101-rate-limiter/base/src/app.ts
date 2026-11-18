import { RateLimiter } from "./service";
import { gatewayKey, type GatewayRequest } from "./store";
export function authorizeGateway(limiter: RateLimiter, request: GatewayRequest, now: number) {
  const tenant = gatewayKey(request);
  const decision = limiter.check(tenant, now);
  return {
    status: decision.allowed ? 200 : 429,
    headers: {
      "x-rate-limit-remaining": String(decision.remaining),
      "x-rate-limit-reset": String(decision.resetAt),
    },
    tenant,
    route: request.route,
  };
}
