import { test, expect } from 'bun:test';
import { api, reset, start, stats, terminal, Reader, attach, text, full, done, messages, until } from './http';

test('R13: concurrent Stop and late Stop cannot rewrite history', async () => {
  await reset();
  const s = await start(1000, 8);
  const reader = new Reader(s.response);
  const prefix = await reader.prefix(5);
  const stops = await Promise.all(Array.from({length:8},()=>api('/api/messages/'+s.id+'/cancel',{method:'POST'})));
  for(const response of stops) {
    expect(response.ok).toBe(true);
    expect((await response.json() as any).status).toBe('cancelled');
  }
  const events=[...prefix,...await reader.all()];
  done(events,'cancelled');
  expect(events.filter(e=>e.event==='done'||e.event==='error')).toHaveLength(1);
  const snapshot=await terminal(s.chat,s.id);
  await until(async()=> (await stats()).active===0);
  for(let i=0;i<3;i++) await api('/api/messages/'+s.id+'/cancel',{method:'POST'});
  expect(await terminal(s.chat,s.id)).toEqual(snapshot);
  expect(await new Reader(await attach(s.id)).all()).toEqual(events);
  const u=(await messages(s.chat)).find((m:any)=>m.role==='user');
  expect((await api('/api/messages/'+u.id+'/cancel',{method:'POST'})).status).toBe(409);
  expect((await messages(s.chat)).find((m:any)=>m.id===u.id)).toEqual(u);
  const completed=await start(12,2);
  const completeEvents=await new Reader(completed.response).all();
  done(completeEvents);
  const completeSnapshot=await terminal(completed.chat,completed.id);
  expect((await (await api('/api/messages/'+completed.id+'/cancel',{method:'POST'})).json() as any).status).toBe('complete');
  expect(await terminal(completed.chat,completed.id)).toEqual(completeSnapshot);
  expect(await new Reader(await attach(completed.id)).all()).toEqual(completeEvents);
  expect((await stats()).requests).toBe(2);
},55000);
