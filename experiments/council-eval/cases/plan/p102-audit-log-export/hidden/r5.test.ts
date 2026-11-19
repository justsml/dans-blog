import {expect,test} from "bun:test";
import * as api from "../src/service";
import {AuditStore} from "../src/store";test("recent API remains compatible",async()=>{const s=new AuditStore();s.append({id:"a",companyId:"a",at:"2026-01-01T00:00:00Z",actor:"u",action:"login",details:{private_ip:"x",method:"sso"}});const rows=await api.recent(s,"a");expect(rows[0].details).toEqual({method:"sso"});expect(api.actionCounts(rows)).toEqual({login:1});});
