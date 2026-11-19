import { test, expect } from 'bun:test';
import { api, reset, start, stats, terminal, Reader, attach, text, full, done, messages, until } from './http';

test('R14: cursor validation, precedence and terminal EOF',async()=>{
  await reset();
  const s=await start(15,2);
  const events=await new Reader(s.response).all();
  done(events);
  const snapshot=await terminal(s.chat,s.id);
  for(const value of ['-1','1.5','abc','1e2','9007199254740992','']) {
    for(const query of [true,false]) {
      const response=await api('/api/messages/'+s.id+'/stream'+(query?'?after='+encodeURIComponent(value):''),{headers:{'Last-Event-ID':query?'0':value}});
      expect(response.status).toBe(400);
      await response.body?.cancel();
    }
  }
  const override=await api('/api/messages/'+s.id+'/stream?after=0',{headers:{'Last-Event-ID':'invalid'}});
  expect(await new Reader(override).all()).toEqual(events);
  for(const cursor of [events.at(-1)!.id, events.at(-1)!.id+100,Number.MAX_SAFE_INTEGER]) {
    const response=await api('/api/messages/'+s.id+'/stream?after='+cursor,{signal:AbortSignal.timeout(2500)});
    expect(await new Reader(response).all()).toEqual([]);
  }
  expect(await terminal(s.chat,s.id)).toEqual(snapshot);
  expect((await stats()).requests).toBe(1);
},55000);
