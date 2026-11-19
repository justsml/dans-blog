import {expect,test} from "bun:test";
import * as api from "../src/service";
import {PreferenceStore} from "../src/store";test("writes one channel with defaults for the rest",()=>{const s=new PreferenceStore();api.setPreference(s,"a","u","email",false);expect(api.canDeliver(s,"a","u","email","marketing")).toBe(false);expect(api.canDeliver(s,"a","u","sms","marketing")).toBe(false);expect(api.canDeliver(s,"a","u","push","marketing")).toBe(true);});
