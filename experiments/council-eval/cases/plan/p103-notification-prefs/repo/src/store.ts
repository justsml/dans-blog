export type Channel = "email" | "sms" | "push";
export interface ChannelPrefs {
  email: boolean;
  sms: boolean;
  push: boolean;
}
export type StoredPrefs = boolean | ChannelPrefs;
export class PreferenceStore {
  private rows = new Map<string, StoredPrefs>();
  private key(company: string, user: string): string {
    return JSON.stringify([company, user]);
  }
  read(company: string, user: string): StoredPrefs | undefined {
    const row = this.rows.get(this.key(company, user));
    return typeof row === "object" ? { ...row } : row;
  }
  write(company: string, user: string, value: StoredPrefs): void {
    this.rows.set(this.key(company, user), typeof value === "object" ? { ...value } : value);
  }
  remove(company: string, user: string): void {
    this.rows.delete(this.key(company, user));
  }
  // Imported v1 rows are booleans; false is an opt-out for every channel.
  importLegacy(company: string, user: string, enabled: boolean): void {
    this.write(company, user, enabled);
  }
  count(): number {
    return this.rows.size;
  }
}
export const defaults: ChannelPrefs = {
  email: true,
  sms: false,
  push: true,
};
export interface Notification {
  companyId: string;
  userId: string;
  channel: Channel;
  category: "marketing" | "security";
  body: string;
}
export interface Sender {
  send(notification: Notification): Promise<void>;
}
