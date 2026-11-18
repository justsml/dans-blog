import { expect, test } from "bun:test";
import { type Mailer, type ReportEmail, ScheduleRepo, runDue } from "../src";

class FakeMailer implements Mailer {
  sent: ReportEmail[] = [];
  async send(email: ReportEmail) {
    this.sent.push(email);
  }
}

const at = (iso: string) => Date.parse(iso);

function newYorkEightAm(lastRunAt: string) {
  const repo = new ScheduleRepo();
  repo.save({
    id: "sch_ny",
    ownerEmail: "ops@example.com",
    reportId: "rev",
    hour: 8,
    timeZone: "America/New_York",
    lastRunAt: at(lastRunAt),
    createdAt: at("2027-01-01T00:00:00Z"),
  } as any);
  return repo;
}

test("the report stays at 8am local on the day clocks spring forward", async () => {
  const repo = newYorkEightAm("2027-03-13T13:00:00Z");
  const mailer = new FakeMailer();
  expect((await runDue(repo, mailer, at("2027-03-14T11:59:00Z"))).sent).toEqual([]);
  expect((await runDue(repo, mailer, at("2027-03-14T12:00:00Z"))).sent).toEqual(["sch_ny"]);
});

test("the report stays at 8am local on the day clocks fall back", async () => {
  const repo = newYorkEightAm("2027-11-06T12:00:00Z");
  const mailer = new FakeMailer();
  expect((await runDue(repo, mailer, at("2027-11-07T12:30:00Z"))).sent).toEqual([]);
  expect((await runDue(repo, mailer, at("2027-11-07T13:00:00Z"))).sent).toEqual(["sch_ny"]);
});
