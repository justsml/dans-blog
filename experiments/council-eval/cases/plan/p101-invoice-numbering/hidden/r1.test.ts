import {expect,test} from "bun:test";
import * as api from "../src/service";
import {InvoiceStore} from "../src/store";test("honors persisted numbering per company",async()=>{const s=new InvoiceStore();s.add({id:"old",companyId:"a",totalCents:1,status:"void",number:9});api.createDraft(s,"x","a",10);api.createDraft(s,"y","b",10);expect((await api.issueInvoice(s,"a","x")).number).toBe(10);expect((await api.issueInvoice(s,"b","y")).number).toBe(1);});
