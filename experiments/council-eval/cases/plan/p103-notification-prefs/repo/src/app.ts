import { PreferenceStore, type Notification, type Sender } from "./store";
import { dispatch, previewBody } from "./service";
export async function sendDigest(store: PreferenceStore, sender: Sender, notifications: Notification[]) {
  const reports = [];
  for (const notification of notifications) {
    const sent = await dispatch(store, sender, notification);
    reports.push({
      companyId: notification.companyId,
      userId: notification.userId,
      channel: notification.channel,
      preview: previewBody(notification),
      sent,
    });
  }
  return reports;
}
