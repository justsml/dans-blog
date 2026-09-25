import { expect, test } from "bun:test";

test("a scorer publishes scores against its real active parent and flushes without a model call", async () => {
  const batches: any[] = [];
  let traceExports = 0;
  let activeLink: any;
  const server = Bun.serve({
    port: 0,
    async fetch(request) {
      const path = new URL(request.url).pathname;
      if (path === "/active-link") {
        activeLink = await request.json();
        return Response.json({ ok: true });
      }
      if (path === "/api/public/ingestion") {
        const body = await request.json();
        batches.push(body);
        return Response.json({
          successes: body.batch.map((event: any) => ({
            id: event.id,
            status: 201,
          })),
          errors: [],
        });
      }
      if (path === "/api/public/otel/v1/traces") {
        await request.arrayBuffer();
        traceExports++;
        return Response.json({});
      }
      return Response.json({ error: "unexpected path" }, { status: 404 });
    },
  });
  try {
    const child = Bun.spawn(
      [
        process.execPath,
        "-e",
        `
      const {withTranslationScoreTrace,currentScoreTrace,publishTranslationScores}=await import('./src/scripts/i18n/langfuse-scores.ts');
      await withTranslationScoreTrace({synthetic:true},async()=>{
        const link=currentScoreTrace();
        if(!link?.traceId || !link.observationId) throw Error('Missing active trace linkage');
        await publishTranslationScores({at:'2026-09-01T00:00:00Z',overallScore:94.4,confidenceScore:0.8});
        await fetch(process.env.LANGFUSE_BASE_URL+'/active-link',{method:'POST',body:JSON.stringify(link)});
      });
    `,
      ],
      {
        cwd: process.cwd(),
        env: {
          ...process.env,
          LANGFUSE_BASE_URL: `http://127.0.0.1:${server.port}`,
          LANGFUSE_PUBLIC_KEY: "local-test",
          LANGFUSE_SECRET_KEY: "local-test",
          BRAINTRUST_API_KEY: "",
          OTEL_EXPORTER_OTLP_HEADERS: "",
        },
        stdout: "pipe",
        stderr: "pipe",
      },
    );
    const [, stderr, code] = await Promise.all([
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
      child.exited,
    ]);
    expect(code, stderr).toBe(0);
    expect(activeLink?.traceId).toMatch(/^[a-f0-9]{32}$/);
    const link = activeLink;
    expect(batches).toHaveLength(1);
    expect(batches[0].batch).toHaveLength(2);
    expect(batches[0].batch[0].body).toMatchObject({
      traceId: link.traceId,
      observationId: link.observationId,
      name: "i18n.overallScore",
      value: 94.4,
    });
    expect(traceExports).toBeGreaterThan(0);
  } finally {
    server.stop(true);
  }
}, 20000);
