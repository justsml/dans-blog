import {expect,test} from "bun:test";
import * as api from "../src/service";
import {Outbox} from "../src/outbox";test("delivers one event",async()=>{const o=new Outbox();o.enqueue({id:"1",endpoint:"https://a.test",payload:"x"});expect((await api.deliver(o,{post:async(_,es)=>es.map(e=>e.id)})).delivered).toBe(1);});
