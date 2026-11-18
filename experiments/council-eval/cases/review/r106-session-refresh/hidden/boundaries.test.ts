import {expect,test} from "bun:test";
import * as api from "../src/service";
import {SessionStore} from "../src/sessions";test("absolute lifetime caps refresh and expiry is exclusive",()=>{const s=new SessionStore();s.create("t","u",0,100,150);expect(api.refresh(s,"t",50,1000).expiresAt).toBe(150);expect(()=>api.refresh(s,"t",150,100)).toThrow(api.SessionError);expect(s.get("t")?.expiresAt).toBe(150);});
