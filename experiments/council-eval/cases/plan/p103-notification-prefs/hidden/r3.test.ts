import {expect,test} from "bun:test";
import * as api from "../src/service";
import {PreferenceStore} from "../src/store";test("scopes preferences by company and user",()=>{const s=new PreferenceStore();api.setPreference(s,"a","u","push",false);expect(api.canDeliver(s,"a","u","push","marketing")).toBe(false);expect(api.canDeliver(s,"b","u","push","marketing")).toBe(true);expect(api.canDeliver(s,"a","v","push","marketing")).toBe(true);});
