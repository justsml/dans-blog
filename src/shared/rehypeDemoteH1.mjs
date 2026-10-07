// The post layout renders the title as the page's only <h1>; a `#` heading inside an article (common in
// translations) would add a second one, so content headings start at <h2>.
export function rehypeDemoteH1() {
  return (tree) => visit(tree);
}

function visit(node) {
  if (!node || typeof node !== "object") return;
  if (node.type === "element" && node.tagName === "h1") node.tagName = "h2";
  if (Array.isArray(node.children)) node.children.forEach(visit);
}
