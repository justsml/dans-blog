# I18n Telemetry jq Cookbook

These snippets are for quick accounting over the append-only translation logs in
`reports/i18n`.

The two main log families are:

- `reports/i18n/{slug}/candidates.jsonl`
- `reports/i18n/{slug}/{locale}/candidates.jsonl`
- `reports/i18n/{slug}/judgements.jsonl`

Candidate rows may exist in both article-level and locale-level logs. The
examples below create a stable id and de-duplicate candidates before totaling
costs or tokens.

## Combine Candidates And Judgements

Normalize both log types into one JSONL stream:

```sh
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
```

Save the normalized stream when you are doing several passes:

```sh
scripts/i18n-telemetry-jq-examples.sh normalize > /tmp/i18n-telemetry.jsonl
```

## Total Costs

Total all known candidate and judgement costs:

```sh
jq -s '
  unique_by(.stableId)
  | {
      rows: length,
      candidateCostUsd: (map(select(.logType == "candidate").costUsd) | add // 0),
      judgementCostUsd: (map(select(.logType == "judgement").costUsd) | add // 0),
      totalCostUsd: (map(.costUsd) | add // 0)
    }
' /tmp/i18n-telemetry.jsonl
```

Cost by model:

```sh
jq -s '
  unique_by(.stableId)
  | group_by(.model)
  | map({
      model: .[0].model,
      rows: length,
      costUsd: (map(.costUsd) | add // 0)
    })
  | sort_by(.costUsd)
  | reverse
' /tmp/i18n-telemetry.jsonl
```

Cost by slug and locale:

```sh
jq -s '
  unique_by(.stableId)
  | group_by([.slug, .locale])
  | map({
      slug: .[0].slug,
      locale: .[0].locale,
      rows: length,
      costUsd: (map(.costUsd) | add // 0)
    })
  | sort_by(.costUsd)
  | reverse
' /tmp/i18n-telemetry.jsonl
```

## Total Stats

Aggregate calls, costs, tokens, cache, and wall time:

```sh
jq -s '
  unique_by(.stableId)
  | {
      rows: length,
      costUsd: (map(.costUsd) | add // 0),
      inputTokens: (map(.inputTokens) | add // 0),
      outputTokens: (map(.outputTokens) | add // 0),
      cachedInputTokens: (map(.cachedInputTokens) | add // 0),
      cacheWriteTokens: (map(.cacheWriteTokens) | add // 0),
      durationHours: ((map(.durationMs) | add // 0) / 1000 / 60 / 60)
    }
' /tmp/i18n-telemetry.jsonl
```

Aggregate by log type:

```sh
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
' /tmp/i18n-telemetry.jsonl
```

Find expensive rows:

```sh
jq -s '
  unique_by(.stableId)
  | sort_by(.costUsd)
  | reverse
  | .[:25]
  | map({
      at,
      logType,
      slug,
      locale,
      model,
      costUsd,
      inputTokens,
      outputTokens,
      durationMs,
      logPath
    })
' /tmp/i18n-telemetry.jsonl
```

## Filter By Range

ISO timestamps sort correctly when they are in the same UTC form. Most i18n log
timestamps are UTC strings with `Z`, so string filtering is fine for simple
ranges:

```sh
jq -c \
  --arg start "2026-05-13T16:00:00Z" \
  --arg end "2026-05-13T20:00:00Z" '
    select((.at // "") >= $start and (.at // "") < $end)
  ' /tmp/i18n-telemetry.jsonl
```

Filter one UTC day:

```sh
jq -c --arg day "2026-05-13" '
  select((.at // "") | startswith($day))
' /tmp/i18n-telemetry.jsonl
```

Use epoch seconds when you want safer math, especially for local-day windows:

```sh
jq -c \
  --argjson start 1778630400 \
  --argjson end 1778716800 '
    def epoch:
      (.at // "")
      | sub("\\.[0-9]+Z$"; "Z")
      | fromdateiso8601? // 0;
    select(epoch >= $start and epoch < $end)
  ' /tmp/i18n-telemetry.jsonl
```

## Relative Date Range Tricks

Last 12 hours on macOS:

```sh
start=$(date -u -v-12H "+%Y-%m-%dT%H:%M:%SZ")
end=$(date -u "+%Y-%m-%dT%H:%M:%SZ")

jq -c --arg start "$start" --arg end "$end" '
  select((.at // "") >= $start and (.at // "") < $end)
' /tmp/i18n-telemetry.jsonl
```

Last 12 hours on GNU date:

```sh
start=$(date -u -d "12 hours ago" "+%Y-%m-%dT%H:%M:%SZ")
end=$(date -u "+%Y-%m-%dT%H:%M:%SZ")

jq -c --arg start "$start" --arg end "$end" '
  select((.at // "") >= $start and (.at // "") < $end)
' /tmp/i18n-telemetry.jsonl
```

Yesterday in a local timezone, using epoch seconds so DST and offsets stay out
of string comparisons:

```sh
tz=America/Denver
start=$(TZ=$tz date -v-1d -v0H -v0M -v0S "+%s") # macOS
end=$(TZ=$tz date -v0H -v0M -v0S "+%s")

jq -c --argjson start "$start" --argjson end "$end" '
  def epoch:
    (.at // "")
    | sub("\\.[0-9]+Z$"; "Z")
    | fromdateiso8601? // 0;
  select(epoch >= $start and epoch < $end)
' /tmp/i18n-telemetry.jsonl
```

GNU date version of the same local-day trick:

```sh
tz=America/Denver
start=$(TZ=$tz date -d "yesterday 00:00" "+%s")
end=$(TZ=$tz date -d "today 00:00" "+%s")
```

## Example Scripts

The repo includes a runnable example wrapper at
`scripts/i18n-telemetry-jq-examples.sh`. It uses the normalizer above and
provides the common accounting commands:

```sh
scripts/i18n-telemetry-jq-examples.sh totals
scripts/i18n-telemetry-jq-examples.sh costs-by-model
scripts/i18n-telemetry-jq-examples.sh stats-by-type
scripts/i18n-telemetry-jq-examples.sh day 2026-05-13
scripts/i18n-telemetry-jq-examples.sh range 2026-05-13T16:00:00Z 2026-05-13T20:00:00Z
scripts/i18n-telemetry-jq-examples.sh recent-expensive 12 25
```

Pipe normalized JSONL into one-off jq when you need a custom question:

```sh
scripts/i18n-telemetry-jq-examples.sh normalize |
  jq -s '
    unique_by(.stableId)
    | map(select(.locale == "ja"))
    | group_by(.slug)
    | map({
        slug: .[0].slug,
        rows: length,
        costUsd: (map(.costUsd) | add // 0)
      })
    | sort_by(.costUsd)
    | reverse
  '
```

Or save the normalized stream for a longer investigation:

```sh
scripts/i18n-telemetry-jq-examples.sh normalize > /tmp/i18n-telemetry.jsonl

jq -s '
  unique_by(.stableId)
  | map(select(.costUsd > 0.05))
  | sort_by(.costUsd)
  | reverse
' /tmp/i18n-telemetry.jsonl
```
