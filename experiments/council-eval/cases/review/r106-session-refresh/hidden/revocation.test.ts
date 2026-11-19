import {expect,test} from "bun:test";
import * as api from "../src/service";
import {SessionStore} from "../src/sessions";test("revoked and unknown sessions cannot refresh",()=>{const s=new SessionStore();s.create("t","u",0,100,500);api.signOut(s,"t",0);expect(()=>api.refresh(s,"t",1,100)).toThrow(api.SessionError);expect(()=>api.refresh(s,"absent",1,100)).toThrow(api.SessionError);expect(s.get("t")?.expiresAt).toBe(100);});
