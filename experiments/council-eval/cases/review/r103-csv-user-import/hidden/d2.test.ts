import {expect,test} from "bun:test";
import * as api from "../src/service";
import {Users} from "../src/users";test("profile imports retain existing authorization",()=>{const u=new Users();const admin=u.insert("a","a@x.test","Old");u.promote(admin.id);api.importUsers(u,"a","email,name\na@x.test,New","update");expect(u.isAdmin(admin.id)).toBe(true);});
