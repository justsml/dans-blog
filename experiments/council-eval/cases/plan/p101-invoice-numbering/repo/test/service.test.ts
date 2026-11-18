import {expect,test} from "bun:test";
import * as api from "../src/service";
import {InvoiceStore} from "../src/store";test("drafts and void totals",()=>{const s=new InvoiceStore();const i=api.createDraft(s,"a","c",100);expect(api.amountDue(i)).toBe(100);expect(api.amountDue({...i,status:"void"})).toBe(0);});
