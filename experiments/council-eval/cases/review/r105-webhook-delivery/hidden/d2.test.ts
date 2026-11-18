import {expect,test} from "bun:test";
import * as api from "../src/service";
import {Outbox} from "../src/outbox";test("one paid request per batch",async()=>{const o=new Outbox();for(let i=0;i<5;i++)o.enqueue({id:String(i),endpoint:"https://a.test",payload:"x"});let calls=0;await api.deliver(o,{post:async(_,es)=>{calls++;return es.map(e=>e.id)}},{batchSize:2});expect(calls).toBe(3);});
