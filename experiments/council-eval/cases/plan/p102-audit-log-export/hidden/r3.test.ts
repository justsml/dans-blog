import {expect,test} from "bun:test";
import * as api from "../src/service";
test("exports only public company data",async()=>{const entries=[{id:"a",companyId:"a",at:"2026-01-01T00:00:00Z",actor:"u",action:"login",details:{public:1,private_token:"secret"}},{id:"b",companyId:"b",at:"2026-01-01T00:00:00Z",actor:"u",action:"login",details:{}}];const text=await api.exportAudit({page:async()=>({entries})},"a","2026-01-01","2026-01-02");expect(text.trim().split("\n")).toHaveLength(1);expect(JSON.parse(text).details).toEqual({public:1});expect(entries[0].details.private_token).toBe("secret");});
