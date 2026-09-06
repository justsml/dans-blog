#!/usr/bin/env bun
/**
 * Build presenter scripts, short-route adaptations and the reveal.js deck from a
 * 40-minute outline. The outline is the single source of truth.
 *
 *   bun artifacts/speaking-portfolio-expanded/build-talk.ts adaptive-systems
 *   bun artifacts/speaking-portfolio-expanded/build-talk.ts dynamic-scaling
 *
 * Outline grammar (see outlines/*-40min.md):
 *   # Title
 *   Subtitle paragraph.
 *   ...front matter paragraphs...
 *   ## N. Slide heading
 *   MM:SS to MM:SS · pacing
 *   ![alt](../../reveal-talks/assets/<topic>/file.svg)   optional diagram
 *   > visible line                                        one or more
 *   spoken paragraphs
 *   Story: prompt for a first-hand example                optional
 *   Stage direction: what to do, not say                  optional
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

type Slide = {
  n: number;
  heading: string;
  start: string;
  end: string;
  pacing: string;
  image?: { alt: string; src: string };
  visible: string[];
  spoken: string[];
  story?: string;
  stage?: string;
  imagePrompt?: string;
  sources: string[];
  table?: string[][];
};

type Route = {
  minutes: number;
  keep: number[];
  /** minutes per kept slide, in order */
  times: number[];
  /** bridge sentence spoken after a kept slide when the next kept slide skips content */
  bridges: Record<number, string>;
  /** which spoken paragraphs to keep per slide (indexes); default all */
  trim?: Record<number, number[]>;
  note: string;
};

type Talk = {
  slug: string;
  title: string;
  description: string;
  deckFile: string;
  eyebrow: string;
  routes: { 30: Route; 15: Route };
};

const root = dirname(new URL(import.meta.url).pathname);
const revealDir = join(root, "..", "reveal-talks");

const TALKS: Record<string, Talk> = {
  "adaptive-systems": {
    slug: "adaptive-systems",
    title: "Adaptive, agentic apps",
    description:
      "Adaptive, agentic apps: give each job exactly enough agent, prove every repair, and let the app ask for its own scale.",
    deckFile: "adaptive-systems.html",
    eyebrow: "Adaptive, agentic apps · Dan Levy",
    routes: {
      30: {
        minutes: 30,
        keep: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 13, 15],
        times: [1.5, 1.5, 2.5, 3.5, 2.5, 2.5, 1.5, 1.5, 4.5, 2.5, 3, 3],
        bridges: {
          7: "Bridge: the repair also has to survive an exam it did not write; the walkthrough shows those fixtures.",
          11: "Bridge: whatever the app changed today, an engineer sees it in one report, and authority widens only from measured outcomes.",
          13: "Bridge: once a repair is trusted, it becomes code, and the next matching payload never opens an investigation.",
        },
        note: "The walkthrough runs at four and a half minutes. Slides 8, 12 and 14 are cut; their one-sentence bridges are in the script.",
      },
      15: {
        minutes: 15,
        keep: [1, 3, 4, 5, 6, 10, 15],
        times: [1, 2, 3, 2, 2, 3.5, 1.5],
        bridges: {
          1: "Bridge: the baseline is diff the schema and page a human; the agent has to beat that on time to recover without adding false repairs.",
          6: "Bridge: a repair ships as a versioned artifact with a rollback, and it has to pass fixtures it did not write.",
          10: "Bridge: the same orchestrator can ask for its own scale inside a per-customer budget; that is a companion talk.",
        },
        trim: { 3: [0, 1, 3], 4: [0, 1, 3], 10: [0, 1, 2] },
        note: "Lightning route: the assistant with everything, the conjured agent, the guarded tools, then the semantic test and a compressed walkthrough.",
      },
    },
  },
  "evidence-learning": {
    slug: "evidence-learning",
    title: "Outsmart Your Lying, Cheating Students",
    description:
      "Outsmart Your Lying, Cheating Students (or: Stop Trying to Catch Students Using AI): stop catching, start out-designing; collect evidence of understanding.",
    deckFile: "evidence-learning.html",
    eyebrow: "Outsmart Your Lying, Cheating Students · or, Stop Trying to Catch Students Using AI · Dan Levy",
    routes: {
      30: {
        minutes: 30,
        keep: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14],
        times: [2, 2, 1.5, 1.5, 2.5, 1.5, 4.5, 2.5, 2.5, 2, 2, 3.5, 2],
        bridges: {
          11: "Bridge: the same tool that lets a kid phone it in is the one that hands a sculptor the clay; that story is in the long version.",
        },
        trim: { 11: [0, 1] },
        note: "The sculptor (slide 12) is cut; its bookend line survives in the close. Reconstruction runs at four and a half minutes with the kit.",
      },
      15: {
        minutes: 15,
        keep: [1, 2, 4, 5, 7, 8, 9, 14],
        times: [1.5, 1.5, 1, 2, 3.5, 2, 2, 1.5],
        bridges: {
          2: "Bridge: write down where pencil, whiteboard and peers live, and in the same document promise to teach the tool.",
          5: "Bridge: ask for an attempt first, then ration help rung by rung, and write down which rung you gave.",
          9: "Bridge: count AI time like talk time, write the objective on the board to the agent, and redesign one checkpoint; the worksheet is a handout.",
        },
        trim: { 1: [0, 1, 2], 2: [0, 1], 7: [0, 1], 8: [0, 1], 9: [0, 1] },
        note: "Lightning route: the confession, the doom loop, the fixture, the smudge, the live reconstruction without the kit, rubric and record, voice, and the close.",
      },
    },
  },
  "free-tier": {
    slug: "free-tier",
    title: "Cry Me a Free Tier",
    description:
      "Cry Me a Free Tier: what the cheap input taught your architecture to expect, in eight words from economics and game theory.",
    deckFile: "free-tier.html",
    eyebrow: "Cry Me a Free Tier · Dan Levy",
    routes: {
      30: {
        minutes: 30,
        keep: [1, 2, 3, 5, 6, 7, 9, 10, 11, 12, 14, 15],
        times: [2, 2, 3, 2, 2.5, 3, 2, 2.5, 4, 3, 2.5, 1.5],
        bridges: {
          3: "Bridge: the enormous compute commitments everyone quotes are credible commitments in Schelling's sense, moves in a war of attrition, not disclosures about cost.",
          7: "Bridge: and the lots stay built. Repealing a parking minimum does not remove asphalt, which is path dependence; measure yours by trying to remove one model call and counting the hours.",
          12: "Bridge: reversibility is a real option with a value and a premium, so price it against your exposure instead of arguing about it on vibes.",
        },
        trim: { 6: [0, 1, 2] },
        note: "Slides 4, 8 and 13 are cut with bridges. Keep the acceptance-multiplier arithmetic and the volume caveat in the demo.",
      },
      15: {
        minutes: 15,
        keep: [1, 3, 5, 6, 7, 10, 12, 15],
        times: [1.5, 2, 1.5, 2, 2.5, 2, 2, 1.5],
        bridges: {
          1: "Bridge: price, cost and value are three different numbers, and the gap between what you pay and what it is worth to you is why nobody is measuring.",
          7: "Bridge: the lots stay built, and whoever chooses the architecture is not whoever pays the bill sixty days later.",
          10: "Bridge: run the sweep at one, two, five and ten times price, then multiply by your own volume before you feel anything about it.",
          12: "Bridge: so price reversibility as the option it is, and bring three prices to the design review: today, without the offer, and the most you could survive.",
        },
        trim: { 1: [0, 1], 3: [0, 2], 5: [0, 1], 6: [0, 1, 3], 7: [0, 1], 10: [0, 2], 12: [0, 1, 3] },
        note: "Lightning route: the electricity question, the four explanations for a low price, parking, Jevons, the software map, the acceptance multiplier, the hold-up problem, and the eight words.",
      },
    },
  },
  "dynamic-scaling": {
    slug: "dynamic-scaling",
    title: "Dynamic Scaling of Agentic Workloads",
    description:
      "Dynamic Scaling of Agentic Workloads: agents now direct their own compute; put the limits where the work begins.",
    deckFile: "dynamic-scaling.html",
    eyebrow: "Dynamic Scaling of Agentic Workloads · Dan Levy",
    routes: {
      30: {
        minutes: 30,
        keep: [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14],
        times: [1.5, 2.5, 1.5, 2.5, 1.5, 3, 3, 2.5, 4, 3.5, 2, 2.5],
        bridges: {
          5: "Bridge: a scheduler can lower pressure after throttling without ever raising the ceiling; that policy is deterministic code, not a prompt.",
          8: "Bridge: match the execution class to the work; waiting on a provider needs a durable step, not a GPU.",
        },
        note: "Slides 6 and 9 are cut with bridges. Keep the spot-interruption event in the walkthrough.",
      },
      15: {
        minutes: 15,
        keep: [1, 2, 4, 7, 8, 11, 14],
        times: [1.5, 2, 2, 2.5, 2.5, 3, 1.5],
        bridges: {
          2: "Bridge: count logical items and provider attempts separately; a retry is not a new entitlement.",
          4: "Bridge: money, concurrency and rate are three different limits; a run can satisfy one and blow the other two.",
          8: "Bridge: a job survives the caller when its intent, provider IDs and reservations are persisted before dispatch.",
          11: "Bridge: attempts are a scaling axis too; bound them, gate them, and treat any synthesis as a new candidate.",
        },
        trim: { 2: [0, 1], 7: [0, 1, 2], 8: [0, 1, 2], 11: [0, 1, 2, 3] },
        note: "Lightning route: the multiplication, the inversion, the ecosystem, then a compressed restart walkthrough.",
      },
    },
  },
};

function parseOutline(md: string): { title: string; front: string[]; slides: Slide[] } {
  const lines = md.split("\n");
  const title = lines[0].replace(/^#\s*/, "").trim();
  const slides: Slide[] = [];
  const front: string[] = [];
  let cur: Slide | null = null;
  let para: string[] = [];
  const flush = () => {
    if (!para.length) return;
    const text = para.join(" ").trim();
    para = [];
    if (!text) return;
    if (!cur) {
      front.push(text);
      return;
    }
    if (/^Stage direction:/.test(text)) cur.stage = text.replace(/^Stage direction:\s*/, "");
    else if (/^Source:/.test(text)) cur.sources.push(text.replace(/^Source:\s*/, ""));
    else if (/^<!--\s*image:/.test(text)) cur.imagePrompt = text.replace(/^<!--\s*image:\s*/, "").replace(/\s*-->$/, "");
    else if (/^Story:/.test(text)) cur.story = text.replace(/^Story:\s*/, "");
    else if (/^\d\d:\d\d to \d\d:\d\d/.test(text)) {
      const m = text.match(/^(\d\d:\d\d) to (\d\d:\d\d)\s*·\s*(\w+)/)!;
      cur.start = m[1];
      cur.end = m[2];
      cur.pacing = m[3];
    } else if (/^!\[/.test(text)) {
      const m = text.match(/^!\[(.*?)\]\((.*?)\)/)!;
      cur.image = { alt: m[1], src: m[2] };
    } else if (/^Visual direction:/.test(text)) {
      /* typography slide; nothing to store */
    } else cur.spoken.push(text);
  };
  for (const raw of lines.slice(1)) {
    const line = raw.replace(/\s+$/, "");
    const h = line.match(/^##\s+(\d+)\.\s+(.*)$/);
    if (h) {
      flush();
      cur = { n: Number(h[1]), heading: h[2].trim(), start: "", end: "", pacing: "", visible: [], spoken: [], sources: [] };
      slides.push(cur);
      continue;
    }
    if (/^>\s?/.test(line) && cur) {
      flush();
      cur.visible.push(line.replace(/^>\s?/, "").trim());
      continue;
    }
    if (/^\|/.test(line) && cur) {
      flush();
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue; // separator row
      (cur.table ||= []).push(cells);
      continue;
    }
    if (line.trim() === "") {
      flush();
      continue;
    }
    para.push(line.trim());
  }
  flush();
  return { title, front, slides };
}

const toSec = (t: string) => {
  const [m, s] = t.split(":").map(Number);
  return m * 60 + s;
};
const fmt = (min: number) => {
  const total = Math.round(min * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};
const minutesLabel = (min: number) => (Number.isInteger(min) ? `${min} minutes` : `${min} minutes`);
const mdLinks = (s: string) =>
  esc(s).replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, (_m, t, u) => `<a href="${u}">${t}</a>`);
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");

function scriptFor(talk: Talk, slides: Slide[], keep: number[], times: number[], bridges: Record<number, string>, trim: Record<number, number[]> | undefined, minutes: number, note: string) {
  const out: string[] = [];
  out.push(`# ${talk.title}: ${minutes}-minute presenter script`);
  out.push("");
  out.push(
    `Use slides ${keep.join(", ")}. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A.${note ? " " + note : ""}`,
  );
  out.push("");
  let t = 0;
  keep.forEach((n, i) => {
    const s = slides.find((x) => x.n === n)!;
    const dur = times[i];
    out.push(`## ${fmt(t)} to ${fmt(t + dur)}: slide ${n}, ${s.heading}`);
    out.push("");
    const paras = trim?.[n] ? trim[n].map((k) => s.spoken[k]).filter(Boolean) : s.spoken;
    for (const p of paras) out.push(p, "");
    if (s.table) {
      out.push(`| ${s.table[0].join(" | ")} |`);
      out.push(`| ${s.table[0].map(() => "---").join(" | ")} |`);
      for (const row of s.table.slice(1)) out.push(`| ${row.join(" | ")} |`);
      out.push("");
    }
    for (const src of s.sources) out.push(`Source: ${src}`, "");
    if (s.story) out.push(`Story: ${s.story}`, "");
    if (s.stage) out.push(`Delivery: ${s.stage}`, "");
    if (bridges[n]) out.push(bridges[n], "");
    t += dur;
  });
  if (Math.abs(t - minutes) > 0.01) throw new Error(`${talk.slug} ${minutes}-minute route sums to ${t}`);
  return out.join("\n").trimEnd() + "\n";
}

function adaptationFor(talk: Talk, slides: Slide[], route: Route) {
  const out: string[] = [];
  out.push(`# ${talk.title}: ${route.minutes}-minute adaptation`);
  out.push("");
  out.push(
    `Keep slides ${route.keep.join(", ")}. Hide the others in presenter preparation. [Complete talk track](../packets/${talk.slug}/script-${route.minutes}min.md).`,
  );
  out.push("", "| Time | Slide | Beat |", "| --- | --- | --- |");
  let t = 0;
  route.keep.forEach((n, i) => {
    const s = slides.find((x) => x.n === n)!;
    out.push(`| ${fmt(t)} to ${fmt(t + route.times[i])} | ${n} | ${s.heading} |`);
    t += route.times[i];
  });
  out.push("", `${route.note} Bridge sentences for every cut are in the script. End on the closing slide, not on a tour of what was skipped.`);
  return out.join("\n") + "\n";
}

function deckFor(talk: Talk, slides: Slide[]) {
  const head = readFileSync(join(revealDir, "templates", "engineering-head.html"), "utf8")
    .replace("{{DESCRIPTION}}", esc(talk.description))
    .replace("{{TITLE}}", esc(talk.title))
    .replace('data-topic="adaptive-systems"', `data-topic="${talk.slug}"`)
    .replace('body[data-topic="adaptive-systems"] { --accent:#a4d2c4; --bg:#122323; }', `body[data-topic="adaptive-systems"] { --accent:#a4d2c4; --bg:#122323; }
body[data-topic="dynamic-scaling"] { --accent:#efb45f; --bg:#161d26; }\nbody[data-topic="evidence-learning"] { --accent:#efb15b; --bg:#151e28; }\nbody[data-topic="free-tier"] { --accent:#efb15b; --bg:#151e28; }`);
  const evidence = `../speaking-portfolio-expanded/packets/${talk.slug}/evidence-bank.md`;
  const sections = slides.map((s, i) => {
    const timing = toSec(s.end) - toSec(s.start);
    const mins = timing / 60;
    const last = i === slides.length - 1;
    const first = i === 0;
    const notes =
      `<aside class="notes"><p>${esc(talk.title)} | slide ${s.n} | ${minutesLabel(mins)}</p>` +
      s.spoken.map((p) => `<p>${esc(p)}</p>`).join("") +
      s.sources.map((src) => `<p>Source: ${mdLinks(src)}</p>`).join("") +
      (s.story ? `<p>Story: ${esc(s.story)}</p>` : "") +
      (s.imagePrompt ? `<p>Image prompt: ${esc(s.imagePrompt)}</p>` : "") +
      (s.stage ? `<p>Stage direction: ${esc(s.stage)}</p>` : "") +
      `<p>Claim boundaries and references: <a href="${evidence}">evidence bank</a>.</p></aside>`;
    const eyebrow = first ? `<p class="eyebrow">${esc(talk.eyebrow)}</p>` : "";
    let body: string;
    let cls = "";
    if (s.image) {
      cls = ' class="visual-slide"';
      const src = s.image.src.replace(/^(\.\.\/)+reveal-talks\//, "");
      body = `<img class="talk-diagram" src="${src}" width="1280" height="500" alt="${esc(s.image.alt)}">`;
    } else if (s.table) {
      const [head, ...rows] = s.table;
      body =
        `<table><thead><tr>${head.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>` +
        `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>` +
        (s.visible.length ? `<p class="caption">${s.visible.map(esc).join("<br>")}</p>` : "");
    } else if (last) {
      const chars = s.visible.join(" ").length;
      body = `<p class="display${chars > 90 ? " smaller" : ""}">${s.visible.map(esc).join("<br>")}</p>`;
    } else {
      body =
        `<div class="editorial-rows">` +
        s.visible.map((v, k) => `<div><b>${String(k + 1).padStart(2, "0")}</b><span>${esc(v)}</span></div>`).join("") +
        `</div>`;
    }
    return `<section${cls} data-slide="${s.n}" data-timing="${timing}" aria-label="${esc(s.heading)}">${eyebrow}<h2>${esc(s.heading)}</h2>${body}${notes}</section>`;
  });
  return (
    head +
    sections.join("\n") +
    `</div></div><script src="assets/reveal.js"></script><script src="assets/notes.js"></script><script src="assets/deck.js"></script></body></html>\n`
  );
}

const slug = process.argv[2];
const talk = TALKS[slug];
if (!talk) {
  console.error(`Unknown talk. Choose one of: ${Object.keys(TALKS).join(", ")}`);
  process.exit(1);
}
const outline = readFileSync(join(root, "outlines", `${slug}-40min.md`), "utf8");
const { slides } = parseOutline(outline);

// sanity: contiguous timings summing to 40 minutes
let expect = 0;
for (const s of slides) {
  if (toSec(s.start) !== expect) throw new Error(`slide ${s.n} starts at ${s.start}, expected ${fmt(expect / 60)}`);
  expect = toSec(s.end);
}
if (expect !== 2400) throw new Error(`outline sums to ${expect / 60} minutes, expected 40`);

const packet = join(root, "packets", slug);
mkdirSync(packet, { recursive: true });
const all = slides.map((s) => s.n);
const allTimes = slides.map((s) => (toSec(s.end) - toSec(s.start)) / 60);
writeFileSync(join(packet, "script-40min.md"), scriptFor(talk, slides, all, allTimes, {}, undefined, 40, ""));
for (const key of [30, 15] as const) {
  const r = talk.routes[key];
  writeFileSync(join(packet, `script-${key}min.md`), scriptFor(talk, slides, r.keep, r.times, r.bridges, r.trim, r.minutes, r.note));
  writeFileSync(join(root, "outlines", `${slug}-${key}min-adaptation.md`), adaptationFor(talk, slides, r));
}
writeFileSync(join(revealDir, talk.deckFile), deckFor(talk, slides));
console.log(`${slug}: ${slides.length} slides, scripts 40/30/15, adaptations 30/15, deck ${talk.deckFile}`);
