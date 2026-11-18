import {expect,test} from "bun:test";
import * as api from "../src/service";
import {AuditStore} from "../src/store";test("half-open instant window",async()=>{const s=new AuditStore();for(const [id,at] of [["a","2026-01-01T01:00:00+01:00"],["b","2026-01-02T00:00:00Z"]])s.append({id,at,companyId:"a",actor:"u",action:"login",details:{}});const text=await api.exportAudit(s,"a","2026-01-01T00:00:00Z","2026-01-02T00:00:00Z");expect(text.trim().split("\n").map(x=>JSON.parse(x).id)).toEqual(["a"]);});
