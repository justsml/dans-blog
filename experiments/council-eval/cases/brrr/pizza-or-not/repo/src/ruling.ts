export interface Ruling {
  is_pizza: boolean;
  label: string;
  confidence: number;
  evidence: string[];
  section: string;
  verdict: string;
}

/** Pulls the JSON object out of the Inspector's reply. */
export function parseRuling(text: string): Ruling {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("no ruling in reply");
  const r = JSON.parse(text.slice(start, end + 1));
  if (typeof r.is_pizza !== "boolean" || typeof r.verdict !== "string") throw new Error("malformed ruling");
  return {
    is_pizza: r.is_pizza,
    label: String(r.label ?? (r.is_pizza ? "Pizza" : "Not pizza")),
    confidence: Number(r.confidence ?? 0),
    evidence: Array.isArray(r.evidence) ? r.evidence.map(String) : [],
    section: String(r.section ?? ""),
    verdict: r.verdict,
  };
}
