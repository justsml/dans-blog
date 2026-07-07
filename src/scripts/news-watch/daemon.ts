import { runNewsWatchOnce } from "./run-once.ts";

const minimumSleepSeconds = Number(process.env.NEWS_WATCH_DAEMON_SLEEP_SECONDS ?? 30);

if (import.meta.main) {
  runDaemon().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

export async function runDaemon() {
  console.log(`News watch daemon started. Minimum sleep: ${minimumSleepSeconds}s.`);

  while (true) {
    const startedAt = Date.now();
    await runNewsWatchOnce({ quiet: false });
    const elapsedSeconds = Math.ceil((Date.now() - startedAt) / 1000);
    const sleepSeconds = Math.max(minimumSleepSeconds, minimumSleepSeconds - elapsedSeconds);
    await sleep(sleepSeconds * 1000);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
