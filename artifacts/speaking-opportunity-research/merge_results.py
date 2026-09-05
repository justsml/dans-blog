#!/usr/bin/env python3
"""Merge per-talk speaking-opportunity packets into canonical portfolio CSVs."""

from __future__ import annotations

import csv
import hashlib
import re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit


ROOT = Path(__file__).resolve().parent
RESULTS = ROOT / "results"
OUT = RESULTS / "consolidated"
TEMPLATES = ROOT / "templates"
TABLES = ("events", "editions", "deadlines", "talk_matches", "evidence")


def slug(value: str) -> str:
    value = value.lower().replace("&", " and ")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "unknown"


def norm_name(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower().replace("&", "and"))


def canonical_url(value: str) -> str:
    if not value:
        return ""
    try:
        parts = urlsplit(value.strip())
        host = parts.netloc.lower()
        if host.startswith("www."):
            host = host[4:]
        path = re.sub(r"/+", "/", parts.path).rstrip("/") or "/"
        return urlunsplit(("https", host, path, "", ""))
    except ValueError:
        return value.strip().rstrip("/")


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def header_for(table: str) -> list[str]:
    with (TEMPLATES / f"{table}.csv").open(newline="", encoding="utf-8") as handle:
        return next(csv.reader(handle))


def write_csv(path: Path, fieldnames: list[str], rows: list[dict[str, str]]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(rows)


def unique_values(rows: list[dict[str, str]], field: str) -> list[str]:
    values: list[str] = []
    for row in rows:
        value = row.get(field, "").strip()
        if value and value not in values:
            values.append(value)
    return values


def choose_value(rows: list[dict[str, str]], field: str) -> tuple[str, list[str]]:
    values = unique_values(rows, field)
    if not values:
        return "", []
    counts = Counter(row.get(field, "").strip() for row in rows if row.get(field, "").strip())
    chosen = sorted(values, key=lambda item: (-counts[item], -len(item), item))[0]
    return chosen, [item for item in values if item != chosen]


def stable_id(prefix: str, label: str, used: set[str]) -> str:
    base = f"{prefix}-{slug(label)[:72]}"
    candidate = base
    if candidate in used:
        digest = hashlib.sha1(label.encode("utf-8")).hexdigest()[:8]
        candidate = f"{base}-{digest}"
    used.add(candidate)
    return candidate


def main() -> None:
    talk_dirs = sorted(
        path for path in RESULTS.iterdir()
        if path.is_dir() and path.name != "consolidated" and all((path / f"{name}.csv").exists() for name in TABLES)
    )
    OUT.mkdir(parents=True, exist_ok=True)

    packets: dict[str, dict[str, list[dict[str, str]]]] = {}
    for directory in talk_dirs:
        packets[directory.name] = {name: read_csv(directory / f"{name}.csv") for name in TABLES}

    # Event aliases are merged by exact canonical series URL first, then by normalized
    # event name. The latter reconciles edition-specific URLs without collapsing named
    # regional chapters whose event names differ.
    event_records: list[tuple[str, dict[str, str]]] = []
    for talk, tables in packets.items():
        event_records.extend((talk, row) for row in tables["events"])

    parent: dict[tuple[str, str], tuple[str, str]] = {}

    def find(item: tuple[str, str]) -> tuple[str, str]:
        parent.setdefault(item, item)
        if parent[item] != item:
            parent[item] = find(parent[item])
        return parent[item]

    def union(left: tuple[str, str], right: tuple[str, str]) -> None:
        a, b = find(left), find(right)
        if a != b:
            parent[b] = a

    by_url: dict[str, tuple[tuple[str, str], str]] = {}
    by_name: dict[str, tuple[str, str]] = {}
    for talk, row in event_records:
        key = (talk, row["event_id"])
        find(key)
        url_key = canonical_url(row.get("series_url", ""))
        name_key = norm_name(row.get("event_name", ""))
        if url_key:
            if url_key in by_url:
                previous_key, previous_name = by_url[url_key]
                # Generic series URLs are often reused by distinct regional chapters.
                # Merge URL-sharing aliases only when one normalized name contains the
                # other; otherwise preserve the regions as separate event series.
                if name_key in previous_name or previous_name in name_key:
                    union(key, previous_key)
            else:
                by_url[url_key] = (key, name_key)
        if name_key:
            if name_key in by_name:
                union(key, by_name[name_key])
            else:
                by_name[name_key] = key

    event_groups: dict[tuple[str, str], list[tuple[str, dict[str, str]]]] = defaultdict(list)
    for talk, row in event_records:
        event_groups[find((talk, row["event_id"]))].append((talk, row))

    event_id_map: dict[tuple[str, str], str] = {}
    event_rows: list[dict[str, str]] = []
    event_alias_log: list[dict[str, str]] = []
    used_event_ids: set[str] = set()
    pending_history_sources: dict[str, list[tuple[str, str]]] = defaultdict(list)
    for group in sorted(event_groups.values(), key=lambda items: norm_name(items[0][1]["event_name"])):
        rows = [row for _, row in group]
        name, name_conflicts = choose_value(rows, "event_name")
        new_id = stable_id("evt", name, used_event_ids)
        for talk, row in group:
            event_id_map[(talk, row["event_id"])] = new_id
            for old_source in filter(None, row.get("history_source_ids", "").split(";")):
                pending_history_sources[new_id].append((talk, old_source.strip()))
            event_alias_log.append({
                "talk_id": talk,
                "source_event_id": row["event_id"],
                "consolidated_event_id": new_id,
                "event_name": row["event_name"],
                "organizer": row["organizer"],
                "series_url": row["series_url"],
            })
        organizer, organizer_conflicts = choose_value(rows, "organizer")
        opportunity_types = unique_values(rows, "opportunity_type")
        series_urls = unique_values(rows, "series_url")
        canonical_series = sorted(series_urls, key=lambda value: (len(urlsplit(value).path), len(value), value))[0] if series_urls else ""
        contact_urls = unique_values(rows, "public_contact_url")
        audiences = unique_values(rows, "audience")
        histories = unique_values(rows, "history_summary")
        conflict_bits = []
        if name_conflicts:
            conflict_bits.append("Name aliases: " + " | ".join(name_conflicts))
        if organizer_conflicts:
            conflict_bits.append("Organizer variants: " + " | ".join(organizer_conflicts))
        if len(series_urls) > 1:
            conflict_bits.append("Series URL aliases: " + " | ".join(series_urls))
        history = " | ".join(histories)
        if conflict_bits:
            history = (history + " | " if history else "") + "MERGE NOTES — " + "; ".join(conflict_bits)
        event_rows.append({
            "event_id": new_id,
            "event_name": name,
            "organizer": organizer,
            "opportunity_type": "; ".join(opportunity_types),
            "series_url": canonical_series,
            "public_contact_url": "; ".join(contact_urls),
            "audience": " | ".join(audiences),
            "history_summary": history,
            "history_source_ids": "",  # Filled after evidence IDs are remapped.
        })

    edition_records: list[tuple[str, dict[str, str]]] = []
    for talk, tables in packets.items():
        edition_records.extend((talk, row) for row in tables["editions"])

    edition_parent: dict[tuple[str, str], tuple[str, str]] = {}

    def edition_find(item: tuple[str, str]) -> tuple[str, str]:
        edition_parent.setdefault(item, item)
        if edition_parent[item] != item:
            edition_parent[item] = edition_find(edition_parent[item])
        return edition_parent[item]

    def edition_union(left: tuple[str, str], right: tuple[str, str]) -> None:
        a, b = edition_find(left), edition_find(right)
        if a != b:
            edition_parent[b] = a

    editions_by_label: dict[tuple[str, str], tuple[str, str]] = {}
    editions_by_date: dict[tuple[str, str], tuple[str, str]] = {}
    date_talk_counts = Counter(
        (
            event_id_map[(talk, row["event_id"])],
            row.get("start_date", ""),
            talk,
        )
        for talk, row in edition_records
        if row.get("start_date", "")
    )
    for talk, row in edition_records:
        item = (talk, row["edition_id"])
        edition_find(item)
        event_id = event_id_map[(talk, row["event_id"])]
        label_key = (event_id, norm_name(row.get("edition_label", "")))
        date_key = (event_id, row.get("start_date", ""))
        if label_key[1]:
            if label_key in editions_by_label:
                edition_union(item, editions_by_label[label_key])
            else:
                editions_by_label[label_key] = item
        if date_key[1]:
            if date_key in editions_by_date:
                previous = editions_by_date[date_key]
                previous_talk = previous[0]
                if (
                    talk != previous_talk
                    and date_talk_counts[(event_id, date_key[1], talk)] == 1
                    and date_talk_counts[(event_id, date_key[1], previous_talk)] == 1
                ):
                    edition_union(item, previous)
            else:
                editions_by_date[date_key] = item

    edition_groups: dict[tuple[str, str], list[tuple[str, dict[str, str]]]] = defaultdict(list)
    for talk, row in edition_records:
        edition_groups[edition_find((talk, row["edition_id"]))].append((talk, row))

    edition_id_map: dict[tuple[str, str], str] = {}
    edition_rows: list[dict[str, str]] = []
    edition_alias_log: list[dict[str, str]] = []
    used_edition_ids: set[str] = set()
    for group in sorted(edition_groups.values(), key=lambda items: (event_id_map[(items[0][0], items[0][1]["event_id"])], items[0][1]["edition_label"])):
        rows = [row for _, row in group]
        label, _ = choose_value(rows, "edition_label")
        event_id = event_id_map[(group[0][0], group[0][1]["event_id"])]
        new_id = stable_id("ed", f"{event_id}-{label}", used_edition_ids)
        for talk, row in group:
            edition_id_map[(talk, row["edition_id"])] = new_id
            edition_alias_log.append({
                "talk_id": talk,
                "source_edition_id": row["edition_id"],
                "consolidated_edition_id": new_id,
                "edition_label": row["edition_label"],
                "source_event_id": row["event_id"],
            })
        merged = {"edition_id": new_id, "event_id": event_id}
        conflicts: list[str] = []
        for field in header_for("editions"):
            if field in ("edition_id", "event_id", "source_ids", "unknowns"):
                continue
            value, alternatives = choose_value(rows, field)
            merged[field] = value
            if alternatives:
                conflicts.append(f"{field}: " + " | ".join([value] + alternatives))
        sources: list[tuple[str, str]] = []
        for talk, row in group:
            for old_source in filter(None, row.get("source_ids", "").split(";")):
                sources.append((talk, old_source.strip()))
        merged["source_ids"] = ""  # Filled after evidence IDs are remapped.
        merged["unknowns"] = " | ".join(unique_values(rows, "unknowns"))
        if conflicts:
            note = "MERGE CONFLICTS/VARIANTS — " + "; ".join(conflicts)
            merged["unknowns"] = (merged["unknowns"] + " | " if merged["unknowns"] else "") + note
        merged["_pending_sources"] = sources  # type: ignore[assignment]
        edition_rows.append(merged)

    evidence_rows: list[dict[str, str]] = []
    evidence_id_map: dict[tuple[str, str], str] = {}
    used_evidence_ids: set[str] = set()
    for talk, tables in packets.items():
        for row in tables["evidence"]:
            old_id = row["evidence_id"]
            new_id = stable_id("src", f"{talk}-{old_id}", used_evidence_ids)
            evidence_id_map[(talk, old_id)] = new_id
            merged = dict(row)
            merged["evidence_id"] = new_id
            if row.get("event_id"):
                merged["event_id"] = event_id_map.get((talk, row["event_id"]), "")
            if row.get("edition_id"):
                merged["edition_id"] = edition_id_map.get((talk, row["edition_id"]), "")
            evidence_rows.append(merged)

    event_by_id = {row["event_id"]: row for row in event_rows}
    for event_id, source_pairs in pending_history_sources.items():
        event_by_id[event_id]["history_source_ids"] = ";".join(
            dict.fromkeys(evidence_id_map[pair] for pair in source_pairs if pair in evidence_id_map)
        )
    for row in edition_rows:
        pending = row.pop("_pending_sources")
        row["source_ids"] = ";".join(
            dict.fromkeys(evidence_id_map[pair] for pair in pending if pair in evidence_id_map)
        )

    deadline_rows: list[dict[str, str]] = []
    seen_deadlines: set[tuple[str, ...]] = set()
    used_deadline_ids: set[str] = set()
    for talk, tables in packets.items():
        for row in tables["deadlines"]:
            edition_id = edition_id_map[(talk, row["edition_id"])]
            signature = (
                edition_id, row.get("deadline_type", ""), row.get("raw_date_text", ""),
                row.get("date_iso", ""), row.get("time_local", ""), row.get("timezone_as_stated", ""),
                row.get("utc_datetime", ""), row.get("certainty", ""), row.get("conflict_notes", ""),
            )
            if signature in seen_deadlines:
                continue
            seen_deadlines.add(signature)
            merged = dict(row)
            merged["deadline_id"] = stable_id("dl", f"{talk}-{row['deadline_id']}", used_deadline_ids)
            merged["edition_id"] = edition_id
            merged["source_id"] = evidence_id_map.get((talk, row.get("source_id", "")), "")
            deadline_rows.append(merged)

    match_rows: list[dict[str, str]] = []
    for talk, tables in packets.items():
        for row in tables["talk_matches"]:
            merged = dict(row)
            merged["edition_id"] = edition_id_map[(talk, row["edition_id"])]
            old_ids = [item.strip() for item in row.get("past_session_evidence_ids", "").split(";") if item.strip()]
            merged["past_session_evidence_ids"] = ";".join(
                evidence_id_map[(talk, item)] for item in old_ids if (talk, item) in evidence_id_map
            )
            match_rows.append(merged)

    write_csv(OUT / "events.csv", header_for("events"), sorted(event_rows, key=lambda row: (row["event_name"].lower(), row["event_id"])))
    write_csv(OUT / "editions.csv", header_for("editions"), sorted(edition_rows, key=lambda row: (row["start_date"] or "9999", row["edition_label"].lower())))
    write_csv(OUT / "deadlines.csv", header_for("deadlines"), sorted(deadline_rows, key=lambda row: (row["date_iso"] or "9999", row["edition_id"], row["deadline_type"])))
    write_csv(OUT / "talk_matches.csv", header_for("talk_matches"), sorted(match_rows, key=lambda row: (row["edition_id"], row["talk_id"])))
    write_csv(OUT / "evidence.csv", header_for("evidence"), sorted(evidence_rows, key=lambda row: row["evidence_id"]))
    write_csv(OUT / "event_aliases.csv", list(event_alias_log[0]), event_alias_log)
    write_csv(OUT / "edition_aliases.csv", list(edition_alias_log[0]), edition_alias_log)

    print(f"talks={len(talk_dirs)}")
    print(f"events={len(event_rows)} from {len(event_records)}")
    print(f"editions={len(edition_rows)} from {len(edition_records)}")
    print(f"deadlines={len(deadline_rows)}")
    print(f"talk_matches={len(match_rows)}")
    print(f"evidence={len(evidence_rows)}")


if __name__ == "__main__":
    main()
