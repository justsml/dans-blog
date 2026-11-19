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

test('R15: clean transport EOF is not successful generation',async()=>{
  await reset();
  for(const boundary of [0,19]) {
    const s=await diagnostic('[[llm tokens=70 delay=2 eof_after='+boundary+']]');
    const events=await new Reader(s.response).all();
    done(events,'error');
    expect(text(events)).toBe(full(boundary));
    expect(events.filter(e=>e.event==='error'||e.event==='done')).toHaveLength(1);
    const snapshot=await terminal(s.chat,s.id);
    expect(snapshot.status).toBe('error');
    expect(snapshot.content).toBe(full(boundary));
    expect(await new Reader(await attach(s.id)).all()).toEqual(events);
    await api('/api/messages/'+s.id+'/cancel',{method:'POST'});
    expect(await terminal(s.chat,s.id)).toEqual(snapshot);
  }
  expect((await stats()).requests).toBe(2);
  expect((await stats()).failed).toBe(2);
},55000);
