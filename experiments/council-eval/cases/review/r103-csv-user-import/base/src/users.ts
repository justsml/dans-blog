export interface User {
  id: string;
  companyId: string;
  email: string;
  name: string;
  role: "member" | "admin";
}
export interface ImportRow { email: string; name: string }
export class Users {
  private rows: User[] = [];
  private sequence = 0;
  insert(companyId: string, email: string, name: string): User {
    if (this.find(companyId, email)) throw new Error("email already exists");
    const user: User = {
      id: String(++this.sequence),
      companyId,
      email: email.toLowerCase(),
      name,
      role: "member",
    };
    this.rows.push(user);
    return user;
  }
  find(companyId: string, email: string): User | undefined {
    return this.rows.find(u => u.companyId === companyId && u.email === email.toLowerCase());
  }
  findByEmail(email: string): User | undefined {
    return this.rows.find(u => u.email === email.toLowerCase());
  }
  list(companyId: string): User[] {
    return this.rows.filter(u => u.companyId === companyId).map(u => ({ ...u }));
  }
  // Session authorization reads the persisted role after every import.
  isAdmin(id: string): boolean {
    return this.rows.some(u => u.id === id && u.role === "admin");
  }
  update(user: User, patch: Partial<Pick<User, "name" | "role">>): void {
    Object.assign(user, patch);
  }
  promote(id: string): void {
    const user = this.rows.find(u => u.id === id);
    if (!user) throw new Error("user not found");
    user.role = "admin";
  }
}
