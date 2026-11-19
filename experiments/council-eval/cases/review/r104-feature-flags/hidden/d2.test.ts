import {expect,test} from "bun:test";
import * as api from "../src/service";
import {bucket} from "../src/flags";test("zero percent excludes every bucket",()=>{let subject="";for(let i=0;i<200000;i++){if(bucket("u"+i,"a")===0){subject="u"+i;break}}expect(subject).not.toBe("");expect(api.evaluate({key:"a",enabled:true,percent:0},subject)).toBe(false);});
