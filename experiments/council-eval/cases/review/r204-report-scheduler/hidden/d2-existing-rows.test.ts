import { expect, test } from "bun:test";
import { type Mailer, type ReportEmail, ScheduleRepo, runDue } from "../src";

class FakeMailer implements Mailer {
  sent: ReportEmail[] = [];
  async send(email: ReportEmail) {
    this.sent.push(email);
  }
}

const at = (iso: string) => Date.parse(iso);

test("schedules stored before time zones keep sending once a day at their UTC hour", async () => {
  const existing = {
    id: "sch_old",
    owner_email: "finance@example.com",
    report_id: "ar-aging",
    hour_utc: 14,
    last_run_at: at("2027-01-10T14:00:00Z"),
    created_at: at("2026-06-01T09:00:00Z"),
  };
  const repo = new ScheduleRepo([existing as any]);
  const mailer = new FakeMailer();

  expect((await runDue(repo, mailer, at("2027-01-11T10:00:00Z"))).sent).toEqual([]);
  expect((await runDue(repo, mailer, at("2027-01-11T14:01:00Z"))).sent).toEqual(["sch_old"]);
  expect((await runDue(repo, mailer, at("2027-01-11T14:02:00Z"))).sent).toEqual([]);
  expect(mailer.sent.map((m) => m.subject)).toEqual(["Report ar-aging for 2027-01-11"]);
});
