import {expect,test} from "bun:test";
import * as api from "../src/service";
import {Queue} from "../src/queue";test("concurrent workers execute once",async()=>{const q=new Queue();q.enqueue("j","x");let release!:()=>void;const gate=new Promise<void>(r=>release=r);let calls=0;const handler=async()=>{calls++;await gate};const a=api.run(q,"j",handler,0);const b=api.run(q,"j",handler,0);release();await Promise.all([a,b]);expect(calls).toBe(1);});
