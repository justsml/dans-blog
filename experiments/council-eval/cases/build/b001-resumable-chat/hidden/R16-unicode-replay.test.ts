import { test, expect } from 'bun:test';
import { api, reset, start, stats, terminal, Reader, attach, text, full, done, messages, until } from './http';

async function diagnostic(content:string) {
  const c=await api('/api/chats',{method:'POST',body:JSON.stringify({title:crypto.randomUUID()})});
  const chat=(await c.json() as any).id;
  const response=await api('/api/chats/'+chat+'/messages',{method:'POST',body:JSON.stringify({content})});
  expect(response.ok).toBe(true);
  const id=response.headers.get('X-Message-Id')!;
  return {chat,id,response};
}

test('R16: multilingual bytes survive fragmented input and cursor replay',async()=>{
  await reset();
  const s=await diagnostic('[[llm tokens=90 delay=1 unicode=1]]');
  const reader=new Reader(s.response);
  const prefix=await reader.prefix(11);
  await reader.close();
  const rest=await new Reader(await attach(s.id,prefix.at(-1)!.id,true)).all();
  const events=[...prefix,...rest];
  done(events);
  const expected=Array.from({length:90},(_,i)=>`段${i} 🌍 e\u0301\n`).join('');
  expect(text(events)).toBe(expected);
  const stored=await terminal(s.chat,s.id);
  expect(stored.content).toBe(expected);
  const late=await new Reader(await attach(s.id)).all();
  expect(late).toEqual(events);
  expect(text(late)).not.toContain('�');
  // Cross the reference page size as well as the earlier reconnect boundary.
  const cut=events[70].id;
  expect(await new Reader(await attach(s.id,cut)).all()).toEqual(events.filter(e=>e.id>cut));
  expect((await stats()).requests).toBe(1);
},55000);
