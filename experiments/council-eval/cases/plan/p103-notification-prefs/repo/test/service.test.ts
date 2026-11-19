import {expect,test} from "bun:test";
import * as api from "../src/service";
import {PreferenceStore} from "../src/store";test("legacy opt-out disables marketing",()=>{const s=new PreferenceStore();api.setEnabled(s,"a","u",false);expect(api.canDeliver(s,"a","u","email","marketing")).toBe(false);});
