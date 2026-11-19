import {expect,test} from "bun:test";
import * as api from "../src/service";
test("range validation precedes reads",async()=>{let reads=0;const reader={page:async()=>{reads++;return {entries:[]}}};for(const [a,b] of [["bad","2026-01-02"],["2026-01-02","2026-01-01"],["2026-01-01","2026-01-01"]])await expect(api.exportAudit(reader,"a",a,b)).rejects.toBeInstanceOf(api.ExportError);expect(reads).toBe(0);});
