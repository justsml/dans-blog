import {expect,test} from "bun:test";
import * as api from "../src/service";
import {Users} from "../src/users";test("imports names",()=>{const u=new Users();api.importUsers(u,"a","email,name\na@x.test,A");expect(u.list("a")[0].name).toBe("A");});
