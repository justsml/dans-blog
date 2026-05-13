#!/usr/bin/env bash
set -euo pipefail

command=${1:-totals}

usage() {
  cat <<'USAGE'
Usage:
  scripts/i18n-telemetry-jq-examples.sh normalize
  scripts/i18n-telemetry-jq-examples.sh totals
  scripts/i18n-telemetry-jq-examples.sh costs-by-model
  scripts/i18n-telemetry-jq-examples.sh stats-by-type
  scripts/i18n-telemetry-jq-examples.sh day [YYYY-MM-DD]
  scripts/i18n-telemetry-jq-examples.sh range START_ISO END_ISO
  scripts/i18n-telemetry-jq-examples.sh recent-expensive [hours] [limit]

Examples:
  scripts/i18n-telemetry-jq-examples.sh day 2026-05-13
  scripts/i18n-telemetry-jq-examples.sh range 2026-05-13T16:00:00Z 2026-05-13T20:00:00Z
  scripts/i18n-telemetry-jq-examples.sh recent-expensive 12 25
USAGE
}

normalize() {
  find reports/i18n \( -name candidates.jsonl -o -name judgements.jsonl \) -print0 |
    xargs -0 jq -c '
      def num: if type == "number" then . else 0 end;
      def numstr:
        if type == "number" then .
        elif type == "string" then (tonumber? // 0)
        else 0
        end;

      input_filename as $path
      | (if ($path | endswith("/judgements.jsonl")) then "judgement" else "candidate" end) as $logType
      | {
          logType: $logType,
          logPath: $path,
          event: .event,
          at: (.at // .createdAt // .startedAt // .updatedAt),
          slug,
          locale,
          model: (.model // .judgeModel // .translationModel // "unknown"),
          judgeModel,
          translationModel,
          runId,
          ok,
          status: (.status // .runStatus),
          costUsd: ((.totalCostUsd // .telemetry.totalCostUsd // .telemetry.estimatedCostUsd // .costs.totalUsd // .totalUsd // 0) | num),
          inputTokens: ((.totalInputTokens // .telemetry.totalInputTokens // .telemetry.tokens.input // .costs.inputTokens // .inputTokens // 0) | num),
          outputTokens: ((.totalOutputTokens // .telemetry.totalOutputTokens // .telemetry.tokens.output // .costs.outputTokens // .outputTokens // 0) | num),
          cachedInputTokens: ((.totalCacheReadTokens // .telemetry.totalCacheReadTokens // .telemetry.tokens.cached // .costs.cacheReadTokens // .cacheReadTokens // 0) | num),
          cacheWriteTokens: ((.totalCacheWriteTokens // .telemetry.totalCacheWriteTokens // .telemetry.tokens.cacheWrite // .costs.cacheWriteTokens // .cacheWriteTokens // 0) | num),
          durationMs: ((.totalDurationMs // .durationMs // .runtimeMs // (((.telemetry.runtimeSeconds // 0) | numstr) * 1000)) | num),
          stableId: (
            if $logType == "candidate" then
              ["candidate", .slug, .locale, .model, (.candidatePath // .runId // .outputHash // $path)] | @json
            else
              ["judgement", $path, (.at // ""), (.event // ""), (.round // ""), (.selected // "")] | @json
            end
          )
        }
    '
}

with_normalized() {
  local callback=$1
  shift
  local tmp
  tmp=$(mktemp "${TMPDIR:-/tmp}/i18n-telemetry.XXXXXX")
  trap 'rm -f "$tmp"' RETURN
  normalize > "$tmp"
  "$callback" "$tmp" "$@"
}

totals() {
  jq -s '
    unique_by(.stableId)
    | {
        rows: length,
        candidateCostUsd: (map(select(.logType == "candidate").costUsd) | add // 0),
        judgementCostUsd: (map(select(.logType == "judgement").costUsd) | add // 0),
        totalCostUsd: (map(.costUsd) | add // 0),
        inputTokens: (map(.inputTokens) | add // 0),
        outputTokens: (map(.outputTokens) | add // 0),
        cachedInputTokens: (map(.cachedInputTokens) | add // 0),
        cacheWriteTokens: (map(.cacheWriteTokens) | add // 0),
        durationHours: ((map(.durationMs) | add // 0) / 1000 / 60 / 60)
      }
  ' "$1"
}

costs_by_model() {
  jq -s '
    unique_by(.stableId)
    | group_by(.model)
    | map({
        model: .[0].model,
        rows: length,
        costUsd: (map(.costUsd) | add // 0),
        inputTokens: (map(.inputTokens) | add // 0),
        outputTokens: (map(.outputTokens) | add // 0)
      })
    | sort_by(.costUsd)
    | reverse
  ' "$1"
}

stats_by_type() {
  jq -s '
    unique_by(.stableId)
    | group_by(.logType)
    | map({
        type: .[0].logType,
        rows: length,
        costUsd: (map(.costUsd) | add // 0),
        inputTokens: (map(.inputTokens) | add // 0),
        outputTokens: (map(.outputTokens) | add // 0),
        durationMinutes: ((map(.durationMs) | add // 0) / 1000 / 60)
      })
  ' "$1"
}

day_summary() {
  local tmp=$1
  local day=${2:-$(date -u "+%Y-%m-%d")}

  jq -s --arg day "$day" '
    unique_by(.stableId)
    | map(select((.at // "") | startswith($day)))
    | {
        day: $day,
        rows: length,
        costUsd: (map(.costUsd) | add // 0),
        inputTokens: (map(.inputTokens) | add // 0),
        outputTokens: (map(.outputTokens) | add // 0),
        durationHours: ((map(.durationMs) | add // 0) / 1000 / 60 / 60)
      }
  ' "$tmp"
}

range_summary() {
  local tmp=$1
  local start=${2:?range requires START_ISO}
  local end=${3:?range requires END_ISO}

  jq -s --arg start "$start" --arg end "$end" '
    unique_by(.stableId)
    | map(select((.at // "") >= $start and (.at // "") < $end))
    | {
        start: $start,
        end: $end,
        rows: length,
        costUsd: (map(.costUsd) | add // 0),
        inputTokens: (map(.inputTokens) | add // 0),
        outputTokens: (map(.outputTokens) | add // 0),
        durationHours: ((map(.durationMs) | add // 0) / 1000 / 60 / 60)
      }
  ' "$tmp"
}

utc_iso_hours_ago() {
  local hours=$1
  if date -u -v-"${hours}"H "+%Y-%m-%dT%H:%M:%SZ" >/dev/null 2>&1; then
    date -u -v-"${hours}"H "+%Y-%m-%dT%H:%M:%SZ"
  else
    date -u -d "${hours} hours ago" "+%Y-%m-%dT%H:%M:%SZ"
  fi
}

recent_expensive() {
  local tmp=$1
  local hours=${2:-6}
  local limit=${3:-20}
  local start
  local end
  start=$(utc_iso_hours_ago "$hours")
  end=$(date -u "+%Y-%m-%dT%H:%M:%SZ")

  jq -s --arg start "$start" --arg end "$end" --argjson limit "$limit" '
    unique_by(.stableId)
    | map(select((.at // "") >= $start and (.at // "") < $end))
    | sort_by(.costUsd)
    | reverse
    | .[:$limit]
    | map({
        at,
        slug,
        locale,
        model,
        costUsd,
        inputTokens,
        outputTokens,
        durationMs,
        logType
      })
  ' "$tmp"
}

case "$command" in
  normalize)
    normalize
    ;;
  totals)
    with_normalized totals
    ;;
  costs-by-model)
    with_normalized costs_by_model
    ;;
  stats-by-type)
    with_normalized stats_by_type
    ;;
  day)
    shift
    with_normalized day_summary "${1:-}"
    ;;
  range)
    shift
    if [[ $# -ne 2 ]]; then
      usage >&2
      exit 2
    fi
    with_normalized range_summary "$1" "$2"
    ;;
  recent-expensive)
    shift
    with_normalized recent_expensive "${1:-6}" "${2:-20}"
    ;;
  -h|--help|help)
    usage
    ;;
  *)
    usage >&2
    exit 2
    ;;
esac
