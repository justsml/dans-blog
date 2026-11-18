import {expect,test} from "bun:test";
import * as api from "../src/service";
import {InvoiceStore} from "../src/store";test("validates ledger ownership and status",async()=>{const s=new InvoiceStore();api.createDraft(s,"x","a",10);await expect(api.issueInvoice(s,"b","x")).rejects.toBeInstanceOf(api.InvoiceError);s.add({id:"v",companyId:"a",totalCents:10,status:"void",number:2});await expect(api.issueInvoice(s,"a","v")).rejects.toBeInstanceOf(api.InvoiceError);expect(s.get("x")?.status).toBe("draft");});
