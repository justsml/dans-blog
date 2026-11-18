import { expect, test } from "bun:test";
import { type Mailer, type ReportEmail, ScheduleError, ScheduleRepo, createSchedule, runDue } from "../src";

class FakeMailer implements Mailer {
  sent: ReportEmail[] = [];
  async send(email: ReportEmail) {
    this.sent.push(email);
  }
}

const at = (iso: string) => Date.parse(iso);

test("a daily report goes out once at its hour", async () => {
  const repo = new ScheduleRepo();
  const mailer = new FakeMailer();
  createSchedule(repo, { ownerEmail: "ops@example.com", reportId: "rev", hourUtc: 9 }, at("2027-01-10T12:00:00Z"));

  expect((await runDue(repo, mailer, at("2027-01-11T08:59:00Z"))).sent).toEqual([]);
  expect((await runDue(repo, mailer, at("2027-01-11T09:00:00Z"))).sent).toHaveLength(1);
  expect((await runDue(repo, mailer, at("2027-01-11T09:01:00Z"))).sent).toEqual([]);
  expect(mailer.sent[0].subject).toBe("Report rev for 2027-01-11");
});

test("a failed send is retried on the next tick", async () => {
  const repo = new ScheduleRepo();
  let fail = true;
  const mailer: Mailer = {
    async send() {
      if (fail) throw new Error("smtp down");
    },
  };
  createSchedule(repo, { ownerEmail: "ops@example.com", reportId: "rev", hourUtc: 9 }, at("2027-01-10T12:00:00Z"));
  expect((await runDue(repo, mailer, at("2027-01-11T09:00:00Z"))).failed).toHaveLength(1);
  fail = false;
  expect((await runDue(repo, mailer, at("2027-01-11T09:01:00Z"))).sent).toHaveLength(1);
});

test("rejects an hour outside the day", () => {
  expect(() => createSchedule(new ScheduleRepo(), { ownerEmail: "a@b.c", reportId: "r", hourUtc: 24 }, 0)).toThrow(ScheduleError);
});
