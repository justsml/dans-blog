# Chunked Translation Report

- **Model**: openai/gpt-5.6-luna
- **Chunk size**: 18p
- **Total chunks**: 3
- **Total input tokens**: 4749
- **Total output tokens**: 1458
- **Cache read tokens**: 2142
- **Cache write tokens**: 2598
- **Total duration**: 16372ms
- **Estimated cost**: $0.002314 (local-openrouter-estimate)

## Article Summary
The article argues that developers should classify tokens, API keys, and credentials as either **secret** or **non-secret**, rather than relying on inconsistent terminology in documentation. Secret keys—such as server credentials, paid-service authorizations, write-access tokens, and encryption keys—must stay off Git and out of browser code, using environment variables, `dotenv`, `.gitignore`, and hosting-provider configuration instead. Non-secret keys, such as browser-required Google Maps keys, public-key components, and analytics IDs, may be hard-coded but should be organized in shared configuration files. Written in a practical tutorial style, the article uses lock-and-globe framing and rule-of-thumb checklists to guide web developers in deciding when to proxy services and protect credentials.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1541 | 0 | 1538 | 648 | 6821 | $0.001086 |
| 2 | 1807 | 1071 | 733 | 663 | 6249 | $0.000964 |
| 3 | 1401 | 1071 | 327 | 147 | 3302 | $0.000264 |
