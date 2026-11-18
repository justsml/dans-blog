import {expect,test} from "bun:test";
import * as api from "../src/service";
import {SessionStore} from "../src/sessions";test("short idle policy never shortens expiry",()=>{const s=new SessionStore();s.create("t","u",0,100,500);api.refresh(s,"t",50,100);expect(api.refresh(s,"t",51,1).expiresAt).toBe(150);expect(api.authenticate(s,"t",149)).toBe("u");expect(()=>api.refresh(s,"t",51,0)).toThrow(api.SessionError);});
