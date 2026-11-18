import {expect,test} from "bun:test";
import * as api from "../src/service";
import {Queue} from "../src/queue";test("completes a queued job",async()=>{const q=new Queue();q.enqueue("j","x");expect((await api.run(q,"j",async()=>{},0)).status).toBe("done");});
