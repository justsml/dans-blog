import {expect,test} from "bun:test";
import * as api from "../src/service";
import {SessionStore} from "../src/sessions";test("authenticates active session",()=>{const s=new SessionStore();s.create("t","u",0,100,500);expect(api.authenticate(s,"t",10)).toBe("u");});
