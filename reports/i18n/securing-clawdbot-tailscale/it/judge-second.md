# I18n Judge-Second Report: securing-clawdbot-tailscale (it)

## DISAGREE — Critical Content Loss During Judge Application

**Status**: The initial judge (`judge.md`, commit `080040fc`) correctly selected `openrouter/deepseek/deepseek-v4-flash` (SHA `8a20c9fb`) for language quality. However, the **applied translation on disk** is severely truncated — 139 lines vs. 266 lines in the DeepSeek candidate and 267 lines in the English original. This is a **content loss of ~48%**.

### What Was Lost

The current file (`src/content/posts/2026-01-26--securing-clawdbot-tailscale/it/index.mdx` at HEAD `080040fc`) is missing these entire sections that the DeepSeek candidate correctly translated:

1. **Step 2 detail — Docker port publishing caveats**: The deep dive on Docker `-p` bind semantics, explicit Tailscale IP binding, and Docker's ability to bypass host firewall assumptions was replaced with a single generic nmap command.

2. **Step 2 — Alternative tailnet bind path**: The full alternative config (`bind: "tailnet"` with explicit token auth) plus connection instructions was deleted.

3. **Step 3: Blocca SSH** (full section): Drop-in hardening file, `sshd -t` validation, reload with fallback — replaced with two bare bullets.

4. **Step 4: Regole del firewall** (full section): UFW setup with `tailscale0` allow, default deny, port deletion — deleted entirely.

5. **Verificare la tua esposizione** → **Controlla le porte aperte dall'esterno**: External nmap scan with expected output patterns — replaced with a trivial single-port nmap snippet.

6. **Controlla cosa è in ascolto localmente**: `ss -tulpn` diagnostics with binding IP examples — deleted.

7. **Audit di sicurezza integrato**: `openclaw security audit --deep` section — deleted.

8. **Cosa questo non risolve** (full section): Credential storage, plugin sandboxing, device security — deleted.

9. **Checklist di deploy**: All 10 checklist items — deleted.

10. **Risorse**: All 7 resource links — deleted.

### Additional Errors Introduced

The truncation also introduced factual inaccuracies:

- The current file uses `bun run openclaw gateway start` instead of the correct `openclaw gateway --tailscale serve` from the original English and all candidates. This is a different (less secure) command that does not activate Tailscale Serve.
- The simplified "Proteggere SSH su VPS" section (2 bullets) replaces the original's detailed drop-in hardening workflow, losing the `sshd -t` validation step that is critical for safe SSH configuration.

### Escalation

**This requires re-application of the DeepSeek candidate (SHA `8a20c9fb`) in full.** The DeepSeek translation was correctly selected for language quality but was **not fully applied** in commit `080040fc`. The entire 266-line output from `8a20c9fb:src/content/posts/2026-01-26--securing-clawdbot-tailscale/it/index.mdx` should replace the current 139-line file verbatim.

Do not attempt to merge or splice — the DeepSeek candidate is a complete, coherent translation that covers all sections. The truncation was applied during the judge commit and the full candidate file is available at SHA `8a20c9fb`.