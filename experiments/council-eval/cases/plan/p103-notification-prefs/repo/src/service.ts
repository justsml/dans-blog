import { PreferenceStore, defaults, type Channel, type Notification, type Sender } from "./store";
export class PreferenceError extends Error {}
export function canDeliver(store: PreferenceStore, companyId: string, userId: string, channel: Channel, category: "marketing" | "security"): boolean {
  const saved = store.read(companyId, userId);
  return typeof saved === "boolean" ? saved : defaults[channel];
}
export function setEnabled(store: PreferenceStore, company: string, user: string, enabled: boolean): void {
  store.write(company, user, enabled);
}
export async function dispatch(store: PreferenceStore, sender: Sender, notification: Notification): Promise<boolean> {
  if (!canDeliver(store, notification.companyId, notification.userId, notification.channel, notification.category)) {
    return false;
  }
  await sender.send(notification);
  return true;
}
export function previewBody(notification: Notification): string {
  return notification.body.trim().slice(0, 160);
}
export function preferenceKey(company: string, user: string): string {
  return JSON.stringify([company, user]);
}
export function validateChannel(channel: string): asserts channel is Channel {
  if (!["email", "sms", "push"].includes(channel)) {
    throw new PreferenceError("unknown channel");
  }
}
