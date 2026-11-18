import {expect,test} from "bun:test";
import * as api from "../src/service";
import {PreferenceStore} from "../src/store";test("bulk opt-out and preview stay compatible",async()=>{const s=new PreferenceStore();api.setEnabled(s,"a","u",false);let sent=0;const n={companyId:"a",userId:"u",channel:"email" as const,category:"marketing" as const,body:"  "+"x".repeat(200)};expect(await api.dispatch(s,{send:async()=>{sent++}},n)).toBe(false);expect(sent).toBe(0);expect(api.previewBody(n)).toBe("x".repeat(160));});
