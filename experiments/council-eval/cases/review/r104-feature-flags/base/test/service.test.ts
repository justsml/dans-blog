import {expect,test} from "bun:test";
import * as api from "../src/service";
import {MemoryFlags} from "../src/flags";test("enabled flag",async()=>{const s=new api.FlagService(new MemoryFlags([{key:"a",enabled:true}]));expect(await s.enabled("a","u")).toBe(true);});
