# Team chat

Run `docker compose up -d --build --wait`, then open http://localhost:8088.
Use `docker compose down -v` to remove the stack and database.
Host ports can be set with LB_PORT (8088), LLM_PORT (8099), PG_PORT (5438),
and REDIS_PORT (6388). Bun 1.3 runs the app; `bun test` needs no services.

Alice uses `alice-token`; Bob uses `bob-token`. API requests use
`Authorization: Bearer <token>`. Chats and their messages belong to one user.
POST /api/chats with `{title}` creates a chat, GET /api/chats lists chats.
GET /api/chats/:id/messages returns `{messages:[{id,chatId,role,content,status,createdAt,updatedAt}]}`.
POST the same path with `{content}` to stream a response. The response's
X-Message-Id identifies the assistant row. Token events contain `{text}`;
done and error events contain `{status}`. Messages use streaming, complete,
error or cancelled status values. X-Replica identifies the serving container.
Redis enforces a per-user 120-message/minute limit.

The fake provider accepts OpenAI streaming requests. Put
`[[llm tokens=200 delay=20 fail_after=50]]` in the last user message to configure
token count, milliseconds per token, and a failure boundary. Omit fail_after
for success. Tokens are `t0 `, `t1 `, and so on, including trailing spaces.
GET /__stats and POST /__reset on port 8099 inspect provider usage.
Every provider request is billed, including cancelled and failed requests.

Provider diagnostics also accept eof_after=N to simulate a transport ending
without a completion sentinel, and unicode=1 for multilingual tokens
(`段0 🌍 é\n`, `段1 🌍 é\n`, ...), delivered in fragmented byte chunks.
These options compose with tokens, delay and fail_after; existing defaults remain.
