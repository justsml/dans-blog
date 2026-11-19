import {expect,test} from "bun:test";
import * as api from "../src/service";
import {AuditStore} from "../src/store";test("exports every page",async()=>{const s=new AuditStore(1);for(let i=0;i<3;i++)s.append({id:String(i),companyId:"a",at:"2026-01-01T00:00:00Z",actor:"u",action:"login",details:{}});expect((await api.exportAudit(s,"a","2026-01-01","2026-01-02")).trim().split("\n")).toHaveLength(3);});
