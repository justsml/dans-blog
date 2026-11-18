import {expect,test} from "bun:test";
import * as api from "../src/service";
test("snapshots use one bulk query",async()=>{let calls=0;const repo={get:async(key:string)=>{calls++;return {key,enabled:true}},getMany:async(keys:string[])=>{calls++;return keys.map(key=>({key,enabled:true}))}};const s=new api.FlagService(repo);const keys=Array.from({length:100},(_,i)=>"f"+i);expect(Object.keys(await s.snapshot(keys,"u"))).toHaveLength(100);expect(calls).toBeLessThanOrEqual(1);});
