# Council review — Battle-scarred Operator

Reviewed 2026-10-18. Read-only review of English article, adjacent defense SVG, Spanish translation and locale merge behavior. No critical findings. Four high findings block claiming the article ready for publication; a fifth is a release integration requirement.

## High: stolen keys do not bypass authorization and quotas

**Locations:** `index.mdx:89-97`, defense section `171-190`.

The article says every capability gate assumes the caller pays, and usage caps/access lists have “no answer” to stolen keys. This conflates billing attribution with authorization. Stolen credentials inherit permissions and account/model quotas; they do not remove them. That distinction is central to the actionable response to the exact billing threat the article describes.

**Fix:** Say pricing loses its deterrent for the attacker, while least privilege, restricted model access, invocation quotas and monitoring still constrain damage. Include usage-rate alerts and a tested mechanism to deny inference access during an incident. Do not describe a billing alert as an instantaneous hard cap.

**Evidence:** [Bedrock runtime quotas](https://docs.aws.amazon.com/bedrock/latest/userguide/quotas-runtime.html); [AWS security credentials and permission policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html).

**Rejected:** Keeping the absolute claim as rhetorical emphasis; it directly undermines useful controls in a security advice post.

## High: short-lived credentials falsely presented as preventing persistence

**Locations:** `index.mdx:171-174`; `defense-layers.svg:9,16` (especially “no standing access, no persistence”).

The post itself describes durable malicious instructions executed later by legitimate agents with freshly issued credentials. Those implants can persist even when every token is short lived. Compromised runners or trust configuration can also obtain new credentials. The diagram contradicts the threat model and promises a guarantee explicitly disallowed by repository security prose conventions.

**Fix:** Say short-lived credentials reduce replay windows; scope permissions and trust to the specific job/repo/environment and constrain writes to future instruction/config sources. Replace every SVG “STOPS” claim with “LIMITS”/“REDUCES” wording that describes the actual layer. State that credential lifetime does not remove implanted instructions or compromised identity issuers.

**Evidence:** [AWS temporary-role session revocation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html) documents the separate need to revoke permissions on already issued role sessions.

**Rejected:** Merely changing the English paragraph while retaining the stronger visual guarantee.

## High: do not recommend replacing execution detection with edit detection

**Locations:** `index.mdx:181-184`, image alt at `167`; `defense-layers.svg:3,29-32`.

“Detect edits, not executions” tells operators to discard their direct evidence of credential abuse, anomalous tool calls, exfiltration and unexpected model usage. The main LLMjacking scenario need not edit any victim instruction file. Legitimate edits also happen, so “edits don't [look like work]” is not a sound detector.

**Fix:** “Detect edits as well as execution.” Correlate configuration/memory writes with author, approved change and subsequent agent behavior. Retain cloud audit logs, model invocation/usage metrics, tool execution and unusual outbound activity. Explain drift requires triage rather than asserting all drift is an incident. Keep log payload privacy/retention sensible if recommending full prompt logging.

**Evidence:** [Bedrock invocation logging](https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html), [CloudWatch model invocation monitoring](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/model-invocations.html).

**Rejected:** Removing the edit-detection recommendation; it is useful when added to runtime detection.

## High: containment guidance omits active sessions and continuing workloads

**Locations:** `index.mdx:186-190,200-201`; `defense-layers.svg:38-40`.

Disabling future triggers and rotating the stolen key do not necessarily stop an already running worker, in-flight work, or previously issued temporary sessions. The closing “until the keys are rotated” overstates recovery in precisely the cloud identity scenario at issue.

**Fix:** Begin with containment: suspend compromised identities and revoke active sessions where supported, isolate/stop affected workers, then disable triggers and reconcile queues before eradicating persistent payloads. Preserve incident evidence and restore from a known-good source. Verify new credential issuance, invocation and reactivation have stopped before resuming. Phrase “triggers before payloads” as protection against known reactivation paths, not a universal incident-response ordering rule.

**Evidence:** [AWS role session revocation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html).

**Rejected:** Adding a lengthy provider-specific incident runbook; a few precise sentences are sufficient.

## High release integration: do not publish stale unsafe translations with corrected English

**Locations:** English `index.mdx:7`; Spanish `es/index.mdx:16,173,177-196`; `src/shared/postsCache.ts:383-415`. Ten locale folders exist (ar/de/es/fr/he/hi/it/ja/ru/zh).

The Spanish copy repeats the same detection and credential claims. Translations inherit English frontmatter, and sourceHash is not checked in `buildLocalizedPosts` before including their bodies. Publishing English after corrections can therefore publish the old advice in translations. All are currently held back by the English draft flag, so this is a release requirement rather than an existing public exposure.

**Fix:** Update the relevant claims in all translations and validate provenance through the established translation workflow before publishing; alternatively explicitly keep unreconciled locales as drafts while publishing the corrected English article. Do not just advance sourceHash without updating/reviewing text. Verify production output contains only reconciled versions. Keeping `draft: true` also means a successful production build will not publish the English article; resolve that intentionally before claiming deployment readiness.

**Rejected:** Removing translations or changing global routing behavior for a single article.

## Lesser findings

None separately raised. Other reviewers should cover METR/GTG-1002 sourcing, hypothetical persistence wording, probability assumptions and SVG layout.
