import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, relative, resolve, extname } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dir, "../..");
const directory = resolve(root, "output/paper-atelier-promoted");
const squares = ["data-squares.json", "learning-squares.json", "quiz-search-squares.json"]
  .flatMap(name => JSON.parse(readFileSync(resolve(directory, name), "utf8")));
const approved = [
  ...JSON.parse(readFileSync(resolve(root, "output/paper-atelier-heroes-v2/manifest.json"), "utf8")),
  ...JSON.parse(readFileSync(resolve(root, "output/paper-atelier-heroes-v3/manifest.json"), "utf8")),
];
if (squares.length !== 16 || approved.length !== 16) throw new Error("Expected sixteen approved families");
const receipt = [];
for (const proposal of approved) {
  const square = squares.find(item => item.slug === proposal.slug);
  if (!square) throw new Error(`Missing square: ${proposal.slug}`);
  const widePath = resolve(root, proposal.widePath ?? proposal.wide);
  const squarePath = resolve(root, square.squarePath);
  const iconPath = squarePath.slice(0, -extname(squarePath).length) + "-icon.webp";
  await sharp(squarePath).resize(160, 160).webp({quality: 80}).toFile(iconPath);
  const postDir = dirname(widePath);
  const files = readdirSync(postDir, {recursive: true}).filter(name => /(^|\/)index\.(mdx|md)$/.test(String(name))).map(name => resolve(postDir, String(name)));
  const changed = [];
  for (const file of files) {
    const source = readFileSync(file, "utf8");
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) throw new Error(`Missing frontmatter ${file}`);
    let frontmatter = match[1];
    const before = Object.fromEntries([...frontmatter.matchAll(/^(cover\w*|social_image):\s*(.*)$/gm)].map(m => [m[1], m[2]]));
    const imagePath = (path: string) => {
      const rel = relative(dirname(file), path);
      return rel.startsWith(".") ? rel : "./" + rel;
    };
    const updates = {
      cover: imagePath(widePath),
      cover_full_width: imagePath(widePath),
      cover_mobile: imagePath(squarePath),
      cover_mobile_hero: true,
      cover_icon: imagePath(iconPath),
      social_image: imagePath(widePath),
      cover_alt: proposal.alt,
    };
    for (const [key, value] of Object.entries(updates)) {
      const line = `${key}: ${JSON.stringify(value)}`;
      const pattern = new RegExp(`^${key}:.*(?:\\n[ \t]+[^\\n]*)*`, "m");
      frontmatter = pattern.test(frontmatter) ? frontmatter.replace(pattern, () => line) : frontmatter + "\n" + line;
    }
    // Credits attached to the replaced cover must not attribute generated art
    // to the original photographer. Body-image attribution stays untouched.
    frontmatter = frontmatter.replace(/^cover_credit:.*(?:\n[ \t]+.*)*/m, "");
    writeFileSync(file, source.replace(match[0], () => `---\n${frontmatter}\n---`));
    changed.push({file: relative(root, file), before});
  }
  receipt.push({slug: proposal.slug, widePath: relative(root, widePath), squarePath: relative(root, squarePath), iconPath: relative(root, iconPath), squareDimensions: await sharp(squarePath).metadata().then(m => [m.width, m.height]), changed});
}
writeFileSync(resolve(directory, "manifest.json"), JSON.stringify(receipt, null, 2) + "\n");
console.log(`Promoted ${receipt.length} image families across ${receipt.reduce((n, item) => n + item.changed.length, 0)} source and locale files.`);
