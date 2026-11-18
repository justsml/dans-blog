import {expect,test} from "bun:test";
import * as api from "../src/service";
import {Queue} from "../src/queue";test("attempt budget bounds paid invocations",async()=>{const q=new Queue();q.enqueue("j","x",3);let calls=0;for(let i=0;i<10;i++)await api.run(q,"j",async()=>{calls++;throw Error("provider unavailable")},i*100000);expect(calls).toBe(3);expect(q.get("j")?.status).toBe("failed");});
