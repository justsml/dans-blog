import { FlagService, clientConfiguration } from "./service";
export interface Identity {
  userId: string;
  authenticated: boolean;
}
export async function bootstrap(service: FlagService, identity: Identity, keys: string[]) {
  const context = {
    subject: identity.authenticated ? identity.userId : "",
    requestedKeys: keys,
  };
  const config = await clientConfiguration(service, context);
  return {
    authenticated: identity.authenticated,
    config,
  };
}
