import {expect,test} from "bun:test";
import * as api from "../src/service";
import {Outbox} from "../src/outbox";test("partial acceptance retains pending events",async()=>{const o=new Outbox();for(const id of ["a","b"])o.enqueue({id,endpoint:"https://a.test",payload:"x"});await api.deliver(o,{post:async()=>["a"]});expect(o.hasPending("b")).toBe(true);expect(o.wasSent("a")).toBe(true);});
