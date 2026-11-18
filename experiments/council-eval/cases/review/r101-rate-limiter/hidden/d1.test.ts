import {expect,test} from "bun:test";
import * as api from "../src/service";
test("tenant windows are independent",()=>{const l=new api.RateLimiter();l.setPolicy("a",{requests:1,windowMs:100});l.setPolicy("b",{requests:1,windowMs:100});l.check("a",0);expect(l.check("b",0).allowed).toBe(true);});
