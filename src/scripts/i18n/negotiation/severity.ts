export type SeverityScale='0-4'|'1-5';
/** Preserve raw receipts; translate numeric severity fields in normalized views. */
export function normalizeSeverity<T>(value:T,scale:SeverityScale):T {
 if(scale==='1-5')return structuredClone(value);
 const visit=(item:any):any=>Array.isArray(item)?item.map(visit):item&&typeof item==='object'?Object.fromEntries(Object.entries(item).map(([key,v])=>[key,key==='severity'&&typeof v==='number'?v+1:visit(v)])):item;
 return visit(value);
}
