import {expect,test} from "bun:test";
import * as api from "../src/service";
test("zero quota denies traffic",()=>{const l=new api.RateLimiter();l.setPolicy("a",{requests:0,windowMs:100});expect(l.check("a",0).allowed).toBe(false);});
