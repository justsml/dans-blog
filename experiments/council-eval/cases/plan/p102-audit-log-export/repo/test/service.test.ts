import {expect,test} from "bun:test";
import * as api from "../src/service";
import {AuditStore} from "../src/store";test("recent returns summaries",async()=>{const s=new AuditStore();s.append({id:"1",companyId:"a",at:"2026-01-01T00:00:00Z",actor:"u",action:"login",details:{}});expect((await api.recent(s,"a"))[0].id).toBe("1");});
