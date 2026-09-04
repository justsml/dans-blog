# Chunked Translation Report

- **Model**: deepseek/deepseek-v4-flash
- **Chunk size**: 18p
- **Total chunks**: 3
- **Total input tokens**: 6091
- **Total output tokens**: 9045
- **Cache read tokens**: 2816
- **Cache write tokens**: 0
- **Total duration**: 77038ms
- **Estimated cost**: $0.002999 (local-openrouter-estimate)

## Article Summary
The article argues that AI agents are useless without integrations to external systems like Salesforce or Jira, a problem traditionally solved with fragile custom API wrappers. It introduces the Model Context Protocol (MCP) as a standardization layer—analogous to USB-C—that lets agents connect to any MCP-compatible service via a single protocol implementation. The tutorial provides TypeScript examples using Mastra’s MCP client to configure tools (e.g., Google Maps, weather, local Wikipedia) and attach them to agents with one line of code, and also covers per-user authentication for production security. The intended audience is developers building AI agents who need seamless, scalable tool integrations.

## Per-Chunk Telemetry

| Chunk | Input Tokens | Cache Read | Cache Write | Output Tokens | Duration (ms) | Est. Cost |
|-------|-------------:|-----------:|------------:|--------------:|--------------:|----------:|
| 1 | 1797 | 768 | 0 | 2473 | 20405 | $0.000839 |
| 2 | 2485 | 1024 | 0 | 3307 | 28555 | $0.001133 |
| 3 | 1809 | 1024 | 0 | 3265 | 28078 | $0.001027 |
