import {expect,test} from "bun:test";
import * as api from "../src/service";
import {Users} from "../src/users";test("matching emails in another company stay isolated",()=>{const u=new Users();u.insert("other","a@x.test","Other");api.importUsers(u,"mine","email,name\na@x.test,Mine","update");expect(u.list("other")[0].name).toBe("Other");expect(u.list("mine")).toHaveLength(1);});
