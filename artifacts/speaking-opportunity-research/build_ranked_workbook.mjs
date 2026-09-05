import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = "/Users/dan/code/oss/dans-blog/artifacts/speaking-opportunity-research/results/consolidated";
const data = JSON.parse(await fs.readFile(`${root}/ranked-workbook-data.json`, "utf8"));
const outputPath = `${root}/speaking-opportunity-rankings.xlsx`;

const workbook = Workbook.create();
const fontName = "Arial";
const headerFill = "#25324A";
const headerText = "#FFFFFF";
const ruleColor = "#CBD5E1";
const accent = "#2563EB";

function colName(index) {
  let value = index + 1;
  let out = "";
  while (value > 0) {
    const remainder = (value - 1) % 26;
    out = String.fromCharCode(65 + remainder) + out;
    value = Math.floor((value - 1) / 26);
  }
  return out;
}

function asDate(value) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  return new Date(`${value}T12:00:00Z`);
}

function baseSheet(name, title, subtitle, headers, rows, widths, tableName) {
  const sheet = workbook.worksheets.add(name);
  sheet.showGridLines = false;
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A1").format.font = { name: fontName, size: 16, bold: true, color: "#111827" };
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange(`A2:${colName(headers.length - 1)}2`).format.font = { name: fontName, size: 10, italic: true, color: "#475569" };
  sheet.getRange(`A4:${colName(headers.length - 1)}4`).values = [headers];
  const header = sheet.getRange(`A4:${colName(headers.length - 1)}4`);
  header.format.fill = headerFill;
  header.format.font = { name: fontName, size: 10, bold: true, color: headerText };
  header.format.horizontalAlignment = "center";
  header.format.verticalAlignment = "center";
  header.format.wrapText = true;
  header.format.rowHeightPx = 34;
  if (rows.length) {
    const body = sheet.getRangeByIndexes(4, 0, rows.length, headers.length);
    body.values = rows;
    body.format.font = { name: fontName, size: 9, color: "#1F2937" };
    body.format.verticalAlignment = "top";
    body.format.wrapText = true;
    body.format.borders = { insideHorizontal: { style: "thin", color: ruleColor } };
    const table = sheet.tables.add(`A4:${colName(headers.length - 1)}${rows.length + 4}`, true, tableName);
    table.style = "TableStyleMedium2";
    table.showBandedColumns = false;
  }
  widths.forEach((width, index) => {
    sheet.getRange(`${colName(index)}:${colName(index)}`).format.columnWidth = width;
  });
  sheet.freezePanes.freezeRows(4);
  sheet.getRange("A1:A2").format.columnWidth = widths[0];
  return sheet;
}

const topHeaders = [
  "Rank", "Composite", "Type", "Opportunity", "Location", "Start", "Deadline",
  "Primary talk", "Location", "Ease", "Popularity", "Fit", "Timing", "Status", "Source",
];
const topRows = data.ranked.slice(0, 40).map((row) => [
  Number(row.composite_rank), Number(row.composite_score), row.source_type, row.opportunity_name,
  row.location, asDate(row.event_start_date), asDate(row.deadline_date), row.primary_talk,
  Number(row.location_preference), Number(row.application_ease), Number(row.popularity_score),
  Number(row.fit_penalty), Number(row.timing_score), row.cfp_status, row.source_url,
]);
const top = baseSheet(
  "Priorities",
  "Speaking opportunity priorities",
  "Lower composite scores rank first. Location and ease receive half of the total weight.",
  topHeaders,
  topRows,
  [8, 11, 18, 30, 28, 13, 13, 36, 10, 9, 11, 9, 9, 20, 42],
  "PrioritiesTable",
);
top.getRange(`B5:B${topRows.length + 4}`).setNumberFormat("0.000");
top.getRange(`F5:G${topRows.length + 4}`).setNumberFormat("yyyy-mm-dd");
top.getRange(`B5:B${topRows.length + 4}`).conditionalFormats.add("colorScale", {
  colors: ["#DCFCE7", "#FEF3C7", "#FEE2E2"], thresholds: ["min", { type: "percentile", value: 50 }, "max"],
});
top.getRange(`I5:J${topRows.length + 4}`).conditionalFormats.add("colorScale", {
  colors: ["#DCFCE7", "#FEF3C7", "#FEE2E2"], thresholds: ["min", { type: "percentile", value: 50 }, "max"],
});
top.getRange(`K5:K${topRows.length + 4}`).conditionalFormats.add("colorScale", {
  colors: ["#FEE2E2", "#FEF3C7", "#DCFCE7"], thresholds: ["min", { type: "percentile", value: 50 }, "max"],
});

// Create the scoring sheet before writing formulas that reference it.
const scoring = workbook.worksheets.add("Scoring");

const allHeaders = [
  "Rank", "Composite", "Type", "Opportunity", "Edition or route", "Location", "Mode", "Start", "Status", "Deadline",
  "Primary talk", "Backup talk", "Location score", "Ease", "Fit penalty", "Popularity", "Timing",
  "Location basis", "Ease basis", "Popularity basis", "Topic fit", "Application route", "Next action", "Constraints / unknowns", "Source",
];
const allRows = data.ranked.map((row) => [
  Number(row.composite_rank), null, row.source_type, row.opportunity_name, row.edition_or_route,
  row.location, row.mode, asDate(row.event_start_date), row.cfp_status, asDate(row.deadline_date),
  row.primary_talk, row.backup_talk_id, Number(row.location_preference), Number(row.application_ease),
  Number(row.fit_penalty), Number(row.popularity_score), Number(row.timing_score), row.location_basis,
  row.ease_basis, row.popularity_basis, row.topic_fit, row.application_route, row.next_action,
  row.constraints_unknowns, row.source_url,
]);
const all = baseSheet(
  "All opportunities",
  "All ranked opportunities",
  "Composite is formula-driven from the five score columns and the weights on the Scoring tab.",
  allHeaders,
  allRows,
  [8, 11, 18, 28, 28, 25, 14, 13, 18, 13, 34, 20, 10, 8, 10, 10, 9, 30, 34, 36, 42, 42, 42, 48, 44],
  "AllOpportunitiesTable",
);
const allEnd = allRows.length + 4;
all.getRange(`A5:Y${allEnd}`).format.rowHeightPx = 44;
const formulas = data.ranked.map((_, index) => {
  const row = index + 5;
  return [`=ROUND(M${row}*Scoring!$B$3+N${row}*Scoring!$B$4+O${row}*Scoring!$B$5+(6-P${row})*Scoring!$B$6+Q${row}*Scoring!$B$7,3)`];
});
all.getRange(`B5:B${allEnd}`).formulas = formulas;
all.getRange(`B5:B${allEnd}`).setNumberFormat("0.000");
all.getRange(`H5:H${allEnd}`).setNumberFormat("yyyy-mm-dd");
all.getRange(`J5:J${allEnd}`).setNumberFormat("yyyy-mm-dd");
all.getRange(`B5:B${allEnd}`).conditionalFormats.add("colorScale", {
  colors: ["#DCFCE7", "#FEF3C7", "#FEE2E2"], thresholds: ["min", { type: "percentile", value: 50 }, "max"],
});

const communityRows = data.ranked.filter((row) => row.source_type === "community/meetup").map((row) => [
  Number(row.composite_rank), Number(row.composite_score), row.opportunity_name, row.location,
  asDate(row.event_start_date), row.primary_talk, Number(row.application_ease), Number(row.popularity_score),
  row.topic_fit, row.application_route, row.popularity_basis, row.constraints_unknowns, row.source_url,
]);
const community = baseSheet(
  "Community routes",
  "Community, Meetup and Luma routes",
  "Popularity uses public member, RSVP, attendance, recurrence and sponsor signals; platform counts are not audited attendance.",
  ["Overall rank", "Composite", "Route", "Location / mode", "Next listed date", "Primary talk", "Ease", "Popularity", "Topic fit", "Speaker route", "Popularity basis", "Unknowns", "Source"],
  communityRows,
  [11, 11, 32, 28, 15, 34, 8, 11, 44, 44, 38, 44, 44],
  "CommunityRoutesTable",
);
community.getRange(`A5:M${communityRows.length + 4}`).format.rowHeightPx = 48;
community.getRange(`B5:B${communityRows.length + 4}`).setNumberFormat("0.000");
community.getRange(`E5:E${communityRows.length + 4}`).setNumberFormat("yyyy-mm-dd");

const deadlineRows = data.calendar.map((row) => [
  asDate(row.date_iso), row.time_local, row.timezone_as_stated, row.deadline_type, row.certainty,
  row.event_name, row.edition_label, row.cfp_status, row.talk_ids, row.raw_date_text, row.conflict_notes, row.source_url,
]);
const deadlineSheet = baseSheet(
  "Deadlines",
  "Confirmed deadline calendar",
  "Historical and estimated windows remain outside this sheet. Conflicting official dates retain their notes.",
  ["Date", "Local time", "Time zone", "Type", "Certainty", "Event", "Edition", "CFP status", "Talks", "Raw source text", "Conflict notes", "Source"],
  deadlineRows,
  [13, 12, 18, 22, 18, 28, 30, 20, 32, 30, 42, 44],
  "DeadlinesTable",
);
deadlineSheet.getRange(`A5:A${deadlineRows.length + 4}`).setNumberFormat("yyyy-mm-dd");

scoring.showGridLines = false;
scoring.getRange("A1").values = [["Composite scoring"]];
scoring.getRange("A1").format.font = { name: fontName, size: 16, bold: true, color: "#111827" };
scoring.getRange("A2:D2").values = [["Component", "Weight", "Direction", "Definition"]];
scoring.getRange("A2:D2").format.fill = headerFill;
scoring.getRange("A2:D2").format.font = { name: fontName, size: 10, bold: true, color: headerText };
scoring.getRange("A3:D7").values = [
  ["Location", data.weights.location, "Lower is better", data.method.location],
  ["Application ease", data.weights.ease, "Lower is better", data.method.ease],
  ["Evidence-adjusted fit", data.weights.fit, "Lower is better", data.method.fit],
  ["Popularity", data.weights.popularity, "Higher is better", data.method.popularity],
  ["Timing/actionability", data.weights.timing, "Lower is better", data.method.timing],
];
scoring.getRange("A9:C9").values = [["Check", "Value", "Expected"]];
scoring.getRange("A9:C9").format.fill = headerFill;
scoring.getRange("A9:C9").format.font = { name: fontName, size: 10, bold: true, color: headerText };
scoring.getRange("A10:C10").values = [["Weights total", null, 1]];
scoring.getRange("B10").formulas = [["=SUM(B3:B7)"]];
scoring.getRange("B3:B7").setNumberFormat("0%");
scoring.getRange("B10:C10").setNumberFormat("0%");
scoring.getRange("A2:D10").format.font = { name: fontName, size: 10, color: "#1F2937" };
scoring.getRange("A2:D2").format.font = { name: fontName, size: 10, bold: true, color: headerText };
scoring.getRange("A9:C9").format.font = { name: fontName, size: 10, bold: true, color: headerText };
scoring.getRange("A:A").format.columnWidth = 24;
scoring.getRange("B:B").format.columnWidth = 12;
scoring.getRange("C:C").format.columnWidth = 18;
scoring.getRange("D:D").format.columnWidth = 90;
scoring.getRange("D3:D7").format.wrapText = true;
scoring.freezePanes.freezeRows(2);

await fs.mkdir(root, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

const inspections = [];
for (const [sheetName, range] of [
  ["Priorities", "A1:O24"],
  ["All opportunities", "A1:Y18"],
  ["Community routes", "A1:M20"],
  ["Deadlines", "A1:L20"],
  ["Scoring", "A1:D10"],
]) {
  const check = await workbook.inspect({ kind: "table", range: `${sheetName}!${range}`, include: "values,formulas", tableMaxRows: 20, tableMaxCols: 25 });
  inspections.push({ sheetName, check: check.ndjson });
  const preview = await workbook.render({ sheetName, range, scale: 1.2, format: "png" });
  await fs.writeFile(`/private/tmp/speaking-${sheetName.replaceAll(" ", "-").toLowerCase()}.png`, new Uint8Array(await preview.arrayBuffer()));
}
const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
await fs.writeFile("/private/tmp/speaking-ranking-inspection.json", JSON.stringify({ inspections, errors: errors.ndjson }, null, 2));
console.log(JSON.stringify({ outputPath, sheets: 5, rows: data.ranked.length, errors: errors.ndjson }));
