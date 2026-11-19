import {expect,test} from "bun:test";
import * as api from "../src/service";
import {InvoiceStore} from "../src/store";test("failed persistence does not consume sequence",async()=>{const s=new InvoiceStore();api.createDraft(s,"x","a",10);s.failNextSave=true;await expect(api.issueInvoice(s,"a","x")).rejects.toThrow("storage unavailable");expect(s.get("x")?.status).toBe("draft");expect((await api.issueInvoice(s,"a","x")).number).toBe(1);});
