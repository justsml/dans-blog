import { test, expect } from 'bun:test';
import { api, reset, start, stats, terminal, Reader, attach, text, full, done, messages, until } from './http';

test('R12: delivered progress is durable before termination', async () => {
  await reset();
  const s = await start(1000, 8);
  const reader = new Reader(s.response);
  const prefix = await reader.prefix(12);
  const snapshot = (await messages(s.chat)).find((m:any) => m.id === s.id);
  expect(snapshot.status).toBe('streaming');
  expect(snapshot.content.startsWith(text(prefix))).toBe(true);
  expect(snapshot.content.length).toBeGreaterThan(0);
  expect(full(1000).startsWith(snapshot.content)).toBe(true);
  await api('/api/messages/'+s.id+'/cancel', {method:'POST'});
  const rest = await reader.all();
  done(rest, 'cancelled');
  const stored = await terminal(s.chat, s.id);
  expect(stored.content).toBe(text([...prefix,...rest]));
  expect(stored.content.startsWith(snapshot.content)).toBe(true);
  const replay = await new Reader(await attach(s.id)).all();
  expect(text(replay)).toBe(stored.content);
  done(replay,'cancelled');
}, 55000);
