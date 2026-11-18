import {expect,test} from "bun:test";
import * as api from "../src/service";
import {PreferenceStore} from "../src/store";test("account recovery bypasses marketing opt-out",async()=>{const s=new PreferenceStore();s.importLegacy("a","u",false);let sent=0;expect(await api.dispatch(s,{send:async()=>{sent++}},{companyId:"a",userId:"u",channel:"sms",category:"security",body:"Recovery"})).toBe(true);expect(sent).toBe(1);});
