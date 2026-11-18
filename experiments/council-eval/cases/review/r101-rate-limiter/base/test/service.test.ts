import {expect,test} from "bun:test";
import * as api from "../src/service";
test("default window counts requests",()=>{const l=new api.RateLimiter();expect(l.check("a",0).remaining).toBe(99);});
