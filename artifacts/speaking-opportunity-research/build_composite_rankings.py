#!/usr/bin/env python3
"""Build a preference-weighted ranking across conferences and community routes."""

from __future__ import annotations

import csv
import html
import json
import math
import re
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent
CONSOLIDATED = ROOT / "results" / "consolidated"
COMMUNITY = ROOT / "results" / "community-research"
RUN_DATE = date(2026, 9, 5)

WEIGHTS = {
    "location": 0.30,
    "ease": 0.20,
    "fit": 0.25,
    "popularity": 0.15,
    "timing": 0.10,
}

PREFERRED = {
    "denver", "boston", "new york", "new york city", "nyc", "seattle",
    "san francisco", "san diego", "new orleans", "las vegas",
    "los angeles", "chicago", "austin", "nashville", "orlando", "miami",
}
NEARBY = {
    "boulder", "broomfield", "fort collins", "westminster", "lakewood",
    "colorado springs", "san mateo", "santa clara", "pasadena", "bellevue",
    "fort lauderdale", "miami beach",
}
US_MARKERS = {"united states", "usa", "us", "u.s.", "global remote"}
NEAR_COUNTRIES = {"canada", "mexico"}

TALK_NAMES = {
    "skeptic-education": "A Skeptic's Guide to Surviving AI in Education",
    "evidence-learning": "Outsmart Your Lying, Cheating Students",
    "failure-improvement": "Automating Improvement From Failure",
    "adaptive-systems": "Adaptive, agentic apps",
    "free-tier": "Cry Me a Free Tier",
    "product-engineering": "The Future of Product Engineering",
    "retrieval": "From RAGs to Retrievals",
    "benchmarks": "Stop Looking at My Benchmarks",
    "parallelization": "Rethinking Parallelization in the Agentic Era",
    "judgment": "Code Is Cheap. Judgment Is Expensive.",
}


def read_csv(name: str) -> list[dict[str, str]]:
    with (CONSOLIDATED / name).open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def write_csv(path: Path, rows: list[dict[str, object]]) -> None:
    if not rows:
        return
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(rows[0]), lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)


def plain(markdown: str) -> str:
    value = re.sub(r"\[([^]]+)]\([^)]+\)", r"\1", markdown)
    value = value.replace("**", "").replace("`", "")
    return html.unescape(value).strip()


def urls(markdown: str) -> list[str]:
    return re.findall(r"\[[^]]+]\((https?://[^)]+)\)", markdown)


def number(value: str) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0


def first_date(value: str) -> str:
    match = re.search(r"\b20\d{2}-\d{2}-\d{2}\b", value)
    return match.group(0) if match else ""


def extract_counts(text: str) -> list[int]:
    counts = []
    patterns = (
        r"([\d,]+)\+?\s+(?:members|participants|registrations|attendees|community members|developers)",
        r"(?:attendance|audience|capacity|cap(?:ped)? at|reach(?: of)?)\s+(?:above|at|of)?\s*([\d,]+)",
    )
    for pattern in patterns:
        for match in re.finditer(pattern, text, re.I):
            digits = match.group(1).replace(",", "")
            if digits.isdigit():
                counts.append(int(digits))
    return counts


def popularity_score(text: str, event_name: str = "") -> tuple[int, str]:
    counts = extract_counts(text)
    maximum = max(counts, default=0)
    if maximum >= 5000:
        return 5, f"Public organizer/platform signal of at least {maximum:,} members, registrations, attendees, or reach."
    if maximum >= 1500:
        return 4, f"Public organizer/platform signal of at least {maximum:,}."
    if maximum >= 500:
        return 3, f"Public organizer/platform signal of at least {maximum:,}."
    if maximum >= 100:
        return 2, f"Public organizer/platform signal of at least {maximum:,}."
    flagship = (
        "kubecon", "ces", "istelive", "developerweek", "productworld", "saastr",
    )
    established = (
        "srecon", "gids", "eurostar", "stareast", "upcea", "olc innovate",
        "visual studio live", "platformcon", "dutch ai", "aoma", "ai agent event",
        "devopsdays", "data summit", "lilly conference",
    )
    lowered = event_name.lower()
    if any(re.search(rf"\b{re.escape(item)}\b", lowered) for item in flagship):
        return 5, "Established flagship or large organizer-backed event; exact audience count may be an organizer claim or unstated."
    if any(re.search(rf"\b{re.escape(item)}\b", lowered) for item in established):
        return 4, "Established recurring conference or community series with visible program history."
    if any(word in text.lower() for word in ("recurring", "monthly", "annual", "multi-year", "past events", "sponsor")):
        return 2, "Recurring program or sponsor/history evidence is visible; no strong comparable audience count was found."
    return 1, "Little public popularity evidence beyond the event or route itself."


def location_score(location: str, mode: str, start_date: str) -> tuple[int, str]:
    lowered = f"{location} {mode}".lower()
    mode_lowered = mode.lower().strip()
    if (
        mode_lowered in {"virtual", "remote", "online", "remote/online"}
        or "remote speakers accepted" in lowered
        or "zoom" in lowered
    ):
        return 1, "Remote or online participation is available."
    if any(re.search(rf"\b{re.escape(city)}\b", lowered) for city in PREFERRED):
        return 1, "Exact preferred city."
    if any(re.search(rf"\b{re.escape(city)}\b", lowered) for city in NEARBY):
        return 2, "Near a preferred city or within the Denver/Front Range area."
    if any(marker in lowered for marker in US_MARKERS):
        return 3, "Other domestic location."
    if any(country in lowered for country in NEAR_COUNTRIES):
        return 4, "Canada or Mexico: feasible but outside the preferred domestic list."
    if start_date and start_date < "2027-03-05":
        return 5, "Overseas before the stated six-month travel window."
    return 4, "Overseas at or after the stated six-to-nine-month travel window, or an undated future overseas route."


def ease_score(requirements: str, constraints: str, status: str) -> tuple[int, str]:
    text = f"{requirements} {constraints}".lower()
    hard = (
        "directly did", "materially contributed", "named organization", "real implementation and outcomes",
        "ieee-formatted", "publication", "peer review", "professional qualifications", "institutional affiliation",
        "academic affiliation", "recognized influence", "visible influence", "invitation-only", "research paper", "domain fit",
        "prior recording", "previous recording",
    )
    demanding = (
        "membership required", "current upcea membership",
        "co-presenter", "real deployment evidence", "real-world data", "multiple 75-minute", "three or more proposals",
        "working demo", "live demo", "novelty clause", "novel-concepts clause", "headshot and marketing consent",
    )
    moderate = (
        "presenter registration", "presenters pay", "self-funded", "blind review", "double-blind",
        "headshot", "bio", "workshop", "substantial cut", "format adaptation", "in-person presentation",
    )
    if any(term in text for term in hard):
        return 5, "Hard credential, publication, domain, or firsthand-evidence requirement."
    if any(term in text for term in demanding):
        return 4, "Requires recordings, membership/co-presenter status, real evidence, a demo, or substantial extra material."
    if any(term in text for term in moderate):
        return 3, "Standard CFP plus registration, assets, review, or meaningful format adaptation."
    if any(term in status.lower() for term in ("invitation", "interest form only")):
        return 5, "No ordinary public speaking route is currently verified."
    return 2, "Standard public proposal or organizer route with no hard requirement found."


def timing_score(status: str, deadline: str) -> tuple[int, str]:
    lowered = status.lower()
    if "closed" in lowered or "cancel" in lowered:
        return 5, "Closed or unavailable."
    if deadline:
        days = (date.fromisoformat(deadline) - RUN_DATE).days
        if days <= 14:
            return 1, f"Confirmed deadline in {days} days."
        if days <= 45:
            return 2, f"Confirmed deadline in {days} days."
        if days <= 120:
            return 3, f"Confirmed deadline in {days} days."
        return 4, f"Confirmed deadline in {days} days."
    if "open" in lowered or "rolling" in lowered:
        return 3, "Open or rolling route without a confirmed actionable deadline."
    return 4, "Announced, undated, or route status still needs confirmation."


def fit_penalty(score: float, coverage: float) -> tuple[float, float]:
    effective = score * coverage / 100.0
    penalty = max(1.0, min(5.0, 1.0 + (100.0 - effective) / 25.0))
    return round(effective, 1), round(penalty, 2)


def composite(location: int, ease: int, fit: float, popularity: int, timing: int) -> float:
    return round(
        location * WEIGHTS["location"]
        + ease * WEIGHTS["ease"]
        + fit * WEIGHTS["fit"]
        + (6 - popularity) * WEIGHTS["popularity"]
        + timing * WEIGHTS["timing"],
        3,
    )


def parse_markdown_tables(path: Path, source_group: str) -> list[dict[str, str]]:
    rows: list[dict[str, str]] = []
    headers: list[str] = []
    section = ""
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if line.startswith("## "):
            section = line[3:].strip()
            headers = []
            continue
        if not line.startswith("|"):
            continue
        if source_group.startswith("Overseas") and section != "Best community routes":
            continue
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if cells and cells[0] in ("Event or group", "Route", "Event"):
            headers = cells
            continue
        if not headers or not cells or cells[0].startswith("---"):
            continue
        if len(cells) != len(headers):
            continue
        data = dict(zip(headers, cells))
        name = plain(cells[0])
        location = plain(data.get("Location / mode", data.get("City / mode", data.get("Location / dates", ""))))
        fit = plain(data.get("Best topic fit", data.get("Topic fit", data.get("Strongest talk fit", ""))))
        route = plain(data.get("Public application or host route", data.get("Application or contact route", data.get("Public route", data.get("Route and popularity evidence", "")))))
        next_date = plain(data.get("Next known date", data.get("Next verified date", data.get("Verified dates", data.get("Location / dates", "")))))
        popularity = plain(data.get("Popularity evidence", data.get("Route and popularity evidence", "")))
        unknowns = plain(data.get("Unknowns", data.get("Important unknowns and sources", data.get("Travel use and unknowns", ""))))
        ease_match = re.search(r"\b([1-5])\b", plain(data.get("Ease", "")))
        if not ease_match:
            continue
        source_links = []
        for cell in cells:
            source_links.extend(urls(cell))
        rows.append({
            "source_group": source_group,
            "opportunity_name": name,
            "location": location,
            "mode": "remote/online" if any(word in location.lower() for word in ("remote", "online", "virtual")) else "in-person",
            "topic_fit": fit,
            "application_route": route,
            "next_date_raw": next_date,
            "next_date": first_date(next_date),
            "popularity_evidence": popularity,
            "ease_score": ease_match.group(1),
            "unknowns": unknowns,
            "source_urls": ";".join(dict.fromkeys(source_links)),
        })
    return rows


def topic_primary(text: str, name: str) -> str:
    combined = f"{text} {name}"
    code_map = {
        "SE": "skeptic-education",
        "EL": "evidence-learning",
        "FI": "failure-improvement",
        "AS": "adaptive-systems",
        "FT": "free-tier",
        "PE": "product-engineering",
        "RT": "retrieval",
        "BM": "benchmarks",
        "PA": "parallelization",
        "JU": "judgment",
    }
    code_match = re.search(r"\b(SE|EL|FI|AS|FT|PE|RT|BM|PA|JU)\b", combined.upper())
    if code_match:
        return code_map[code_match.group(1)]

    lowered = combined.lower()
    ordered = (
        ("evidence", "evidence-learning"),
        ("education", "skeptic-education"),
        ("failure", "failure-improvement"),
        ("adaptive", "adaptive-systems"),
        ("free tier", "free-tier"),
        ("product", "product-engineering"),
        ("retrieval", "retrieval"),
        ("benchmark", "benchmarks"),
        ("parallel", "parallelization"),
        ("judgment", "judgment"),
    )
    hits = [(lowered.find(marker), talk_id) for marker, talk_id in ordered if marker in lowered]
    if hits:
        return min(hits, key=lambda item: item[0])[1]
    return "adaptive-systems"


def main() -> None:
    events = {row["event_id"]: row for row in read_csv("events.csv")}
    editions = {row["edition_id"]: row for row in read_csv("editions.csv")}
    matches = read_csv("talk_matches.csv")
    deadlines = read_csv("deadlines.csv")

    deadline_types = {
        "cfp_deadline", "cfp_close", "cfp", "proposal_submission", "abstract_submission",
        "cfp_round_one_close", "first_deadline", "first_phase_deadline", "first_round_deadline",
        "cfp_advance_deadline", "cfp_early_decision",
    }
    deadline_by_edition: dict[str, list[str]] = defaultdict(list)
    for row in deadlines:
        if (
            row["deadline_type"] in deadline_types
            and re.fullmatch(r"\d{4}-\d{2}-\d{2}", row.get("date_iso", ""))
            and row["date_iso"] >= RUN_DATE.isoformat()
            and not row.get("certainty", "").startswith(("historical", "approximate"))
        ):
            deadline_by_edition[row["edition_id"]].append(row["date_iso"])

    matches_by_edition: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in matches:
        queue = row.get("queue", "").lower()
        if any(word in queue for word in ("exclu", "historical", "monitor", "do-not", "research")):
            continue
        matches_by_edition[row["edition_id"]].append(row)

    ranked: list[dict[str, object]] = []
    for edition_id, edition_matches in matches_by_edition.items():
        edition = editions[edition_id]
        status = edition.get("cfp_status", "")
        if any(word in status.lower() for word in ("closed", "cancelled", "no-current")):
            continue
        event = events[edition["event_id"]]
        edition_matches.sort(
            key=lambda row: number(row.get("known_points", "")) * number(row.get("evidence_coverage_percent", "")) / 100,
            reverse=True,
        )
        primary = edition_matches[0]
        backup = edition_matches[1] if len(edition_matches) > 1 else {}
        score = number(primary.get("known_points", ""))
        coverage = number(primary.get("evidence_coverage_percent", ""))
        effective, fit_score = fit_penalty(score, coverage)
        location_text = ", ".join(filter(None, (edition.get("city", ""), edition.get("country", ""))))
        loc_score, loc_basis = location_score(location_text, edition.get("mode", ""), edition.get("start_date", ""))
        ease, ease_basis = ease_score(edition.get("submission_requirements", ""), primary.get("constraints", ""), status)
        popularity, popularity_basis = popularity_score(
            " ".join((event.get("audience", ""), event.get("history_summary", ""), edition.get("attendance_value", ""))),
            event.get("event_name", ""),
        )
        deadline = min(deadline_by_edition.get(edition_id, [""]))
        timing, timing_basis = timing_score(status, deadline)
        composite_score = composite(loc_score, ease, fit_score, popularity, timing)
        source_url = edition.get("cfp_url", "") or edition.get("edition_url", "") or event.get("series_url", "")
        ranked.append({
            "composite_rank": 0,
            "composite_score": composite_score,
            "source_type": "conference/event",
            "opportunity_name": event.get("event_name", ""),
            "edition_or_route": edition.get("edition_label", ""),
            "location": location_text or edition.get("mode", ""),
            "mode": edition.get("mode", ""),
            "event_start_date": edition.get("start_date", ""),
            "cfp_status": status,
            "deadline_date": deadline,
            "primary_talk_id": primary.get("talk_id", ""),
            "primary_talk": TALK_NAMES.get(primary.get("talk_id", ""), ""),
            "backup_talk_id": backup.get("talk_id", ""),
            "topic_fit": primary.get("fit_reason", ""),
            "known_points": score,
            "evidence_coverage_percent": coverage,
            "effective_fit_score": effective,
            "fit_penalty": fit_score,
            "location_preference": loc_score,
            "location_basis": loc_basis,
            "application_ease": ease,
            "ease_basis": ease_basis,
            "popularity_score": popularity,
            "popularity_basis": popularity_basis,
            "timing_score": timing,
            "timing_basis": timing_basis,
            "application_route": edition.get("submission_requirements", ""),
            "next_action": primary.get("next_action", ""),
            "constraints_unknowns": " | ".join(filter(None, (primary.get("constraints", ""), edition.get("unknowns", "")))),
            "source_url": source_url,
        })

    community_rows: list[dict[str, str]] = []
    community_rows += parse_markdown_tables(COMMUNITY / "denver.md", "Denver/Colorado")
    community_rows += parse_markdown_tables(COMMUNITY / "preferred-us-cities.md", "Preferred US cities")
    community_rows += parse_markdown_tables(COMMUNITY / "overseas-later.md", "Overseas from March 2027")

    # Conference anchors already occur in the canonical conference data. Keep community
    # chapters and directories, but skip exact normalized duplicates of canonical events.
    canonical_names = {re.sub(r"[^a-z0-9]+", "", row["event_name"].lower()) for row in events.values()}
    deduped_community: list[dict[str, str]] = []
    seen_community: set[tuple[str, str]] = set()
    for row in community_rows:
        normalized = re.sub(r"[^a-z0-9]+", "", row["opportunity_name"].lower())
        if normalized in canonical_names:
            continue
        key = (normalized, row["location"].lower())
        if key in seen_community:
            continue
        seen_community.add(key)
        deduped_community.append(row)

    community_output: list[dict[str, object]] = []
    for row in deduped_community:
        ease = int(row["ease_score"])
        popularity, popularity_basis = popularity_score(row["popularity_evidence"], row["opportunity_name"])
        loc_score, loc_basis = location_score(row["location"], row["mode"], row["next_date"])
        timing = 3
        timing_basis = "Recurring or contact-based route; the next listed event is not proof that a speaker slot remains open."
        fit_text = row["topic_fit"]
        fit_raw = 90 if any(term in fit_text.lower() for term in ("direct hit", "strongest", "all ten")) else 85 if "particularly" in fit_text.lower() else 82
        coverage = 80 if row["source_urls"] and row["application_route"] else 65
        effective, fit_score = fit_penalty(fit_raw, coverage)
        score = composite(loc_score, ease, fit_score, popularity, timing)
        primary_id = topic_primary(fit_text, row["opportunity_name"])
        source_url = row["source_urls"].split(";", 1)[0] if row["source_urls"] else ""
        record = {
            "composite_rank": 0,
            "composite_score": score,
            "source_type": "community/meetup",
            "opportunity_name": row["opportunity_name"],
            "edition_or_route": row["source_group"],
            "location": row["location"],
            "mode": row["mode"],
            "event_start_date": row["next_date"],
            "cfp_status": "public form/contact route",
            "deadline_date": "",
            "primary_talk_id": primary_id,
            "primary_talk": TALK_NAMES[primary_id],
            "backup_talk_id": "",
            "topic_fit": fit_text,
            "known_points": fit_raw,
            "evidence_coverage_percent": coverage,
            "effective_fit_score": effective,
            "fit_penalty": fit_score,
            "location_preference": loc_score,
            "location_basis": loc_basis,
            "application_ease": ease,
            "ease_basis": "Researcher-rated route and format effort; 1 is easiest and 5 is hardest.",
            "popularity_score": popularity,
            "popularity_basis": popularity_basis,
            "timing_score": timing,
            "timing_basis": timing_basis,
            "application_route": row["application_route"],
            "next_action": "Review the public route and decide whether to prepare the indicated talk or demo format.",
            "constraints_unknowns": row["unknowns"],
            "source_url": source_url,
        }
        ranked.append(record)
        community_output.append({**row, "primary_talk_id": primary_id, "location_preference": loc_score, "popularity_score": popularity, "composite_score": score})

    ranked.sort(key=lambda row: (number(str(row["composite_score"])), number(str(row["location_preference"])), number(str(row["application_ease"])), row["opportunity_name"]))
    for index, row in enumerate(ranked, 1):
        row["composite_rank"] = index

    write_csv(CONSOLIDATED / "community-opportunities.csv", community_output)
    write_csv(CONSOLIDATED / "composite-ranking.csv", ranked)
    write_csv(CONSOLIDATED / "portfolio-top-20.csv", ranked[:20])
    (CONSOLIDATED / "composite-ranking.json").write_text(json.dumps(ranked, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    workbook_data = {
        "weights": WEIGHTS,
        "ranked": ranked,
        "calendar": read_csv("confirmed-deadline-calendar.csv"),
        "method": {
            "direction": "Lower scores rank first.",
            "location": "1 preferred city/remote; 2 nearby metro; 3 other domestic; 4 Canada/Mexico or overseas after 2027-03-05; 5 overseas before that window.",
            "ease": "1 lightweight public route; 5 hard credentials, recordings, publication, or firsthand evidence.",
            "fit": "Known-points score multiplied by evidence coverage, then converted to a 1-5 penalty.",
            "popularity": "5 strongest observed reach; 1 little public evidence. Composite uses 6 minus popularity.",
            "timing": "1 urgent confirmed deadline; 5 closed/unavailable. Community event dates do not count as submission deadlines.",
        },
    }
    (CONSOLIDATED / "ranked-workbook-data.json").write_text(json.dumps(workbook_data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"ranked={len(ranked)} community={len(community_output)} top20={len(ranked[:20])}")


if __name__ == "__main__":
    main()
