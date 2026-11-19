import { type FlagRepository } from "./flags";
export class FlagService {
  constructor(private repo: FlagRepository) {}
  async enabled(key: string, subject: string): Promise<boolean> {
    const flag = await this.repo.get(key);
    return flag?.enabled ?? false;
  }
  async snapshot(keys: string[], subject: string): Promise<Record<string, boolean>> {
    if (keys.length > 100) throw new Error("too many flags");
    const flags = await this.repo.getMany(keys);
    const byKey = new Map(flags.map(flag => [flag.key, flag]));
    return Object.fromEntries(keys.map(key => [key, byKey.get(key)?.enabled ?? false]));
  }
}
export interface ClientContext {
  subject: string;
  requestedKeys: string[];
}
export async function clientConfiguration(service: FlagService, context: ClientContext) {
  return {
    subject: context.subject,
    flags: await service.snapshot(context.requestedKeys, context.subject),
  };
}
