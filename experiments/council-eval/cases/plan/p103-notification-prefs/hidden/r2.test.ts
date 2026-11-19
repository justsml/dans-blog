import {expect,test} from "bun:test";
import * as api from "../src/service";
import {PreferenceStore} from "../src/store";test("preserves boolean opt-out on migration",()=>{const s=new PreferenceStore();s.importLegacy("a","u",false);api.setPreference(s,"a","u","sms",true);expect(api.canDeliver(s,"a","u","email","marketing")).toBe(false);expect(api.canDeliver(s,"a","u","push","marketing")).toBe(false);expect(api.canDeliver(s,"a","u","sms","marketing")).toBe(true);});
