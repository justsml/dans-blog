import { Users, type ImportRow } from "./users";
export function parseCsv(csv: string): ImportRow[] {
  const [header, ...lines] = csv.trim().split(/\r?\n/);
  if (header !== "email,name") throw new Error("expected email,name header");
  return lines.filter(Boolean).map(line => {
    const cells = line.split(",");
    if (cells.length !== 2) throw new Error("expected two columns");
    const [email, name] = cells.map(s => s.trim());
    if (!email.includes("@") || !name) throw new Error("invalid user row");
    return { email: email.toLowerCase(), name };
  });
}
export interface ImportResult {
  created: number;
  skipped: number;
}
export function importUsers(users: Users, company: string, csv: string): ImportResult {
  const rows = parseCsv(csv);
  let created = 0;
  let skipped = 0;
  for (const row of rows) {
    if (users.find(company, row.email)) {
      skipped++;
      continue;
    }
    users.insert(company, row.email, row.name);
    created++;
  }
  return { created, skipped };
}
