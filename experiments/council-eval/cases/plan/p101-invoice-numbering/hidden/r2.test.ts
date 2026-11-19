import {expect,test} from "bun:test";
import * as api from "../src/service";
import {InvoiceStore} from "../src/store";test("serializes issuance and reissuance",async()=>{const s=new InvoiceStore();api.createDraft(s,"x","a",10);api.createDraft(s,"y","a",10);const rows=await Promise.all([api.issueInvoice(s,"a","x"),api.issueInvoice(s,"a","x"),api.issueInvoice(s,"a","y")]);expect(rows.map(r=>r.number)).toEqual([1,1,2]);});
