import {expect,test} from "bun:test";
import * as api from "../src/service";
import {InvoiceStore} from "../src/store";test("draft calculations stay compatible",()=>{const s=new InvoiceStore();expect(()=>api.createDraft(s,"bad","a",1.5)).toThrow(api.InvoiceError);const i=api.createDraft(s,"x","a",123);expect(api.invoiceLabel(i)).toBe("Draft x");expect(api.amountDue(i)).toBe(123);expect(api.companyBalance(s,"a")).toBe(0);});
