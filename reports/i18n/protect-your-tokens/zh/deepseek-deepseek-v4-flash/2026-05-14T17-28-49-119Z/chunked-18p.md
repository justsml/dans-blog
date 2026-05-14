# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 3
- **Total input tokens**: 3783
- **Total output tokens**: 1944
- **Cache read tokens**: 384
- **Cache write tokens**: 0
- **Total duration**: 14257ms
- **Estimated cost**: $0.001021 (local-openrouter-estimate)

## Article Summary
The article argues that securing API keys and tokens hinges on correctly classifying them as either **secret keys** (must be hidden from Git and browser code) or **non-secret keys** (safe to expose publicly). It provides clear rules of thumb—such as CORS errors indicating a secret key—and offers practical guidance using environment variables and the `dotenv` library. The intended audience is developers, and the tone is a tutorial with checklists and "rule-of-thumb" framing to simplify an often confusing topic. Technologies discussed include dotenv, Git, Heroku, JSON Web Tokens, and services like Google Maps and Stripe.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1178 | 0 | 0 | 841 | 6869 | $0.000400 |
| 2 | 1515 | 384 | 0 | 736 | 4974 | $0.000365 |
| 3 | 1090 | 0 | 0 | 367 | 2414 | $0.000255 |
