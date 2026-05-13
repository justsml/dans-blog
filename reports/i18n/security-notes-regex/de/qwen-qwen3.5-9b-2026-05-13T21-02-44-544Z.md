# Translation Candidate
- Slug: security-notes-regex
- Locale: de
- Model: qwen/qwen3.5-9b
- Target: src/content/posts/2015-02-24--security-notes-regex/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 208.66
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug security-notes-regex --locale de --model qwen/qwen3.5-9b --chunk 10p --run-id 2026-05-13T20-47-14-617Z-26482 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24 (code 1)
## Raw Output

````mdx
---
title: 'Sicherheitsnotizen: RegEx'
subTitle: Kann RegEx verwundbar sein?
date: '2015-02-24'
modified: '2018-07-30'
category: Security
subCategory: RegEx
tags:
  - security
  - regex
  - dos
  - remote-exploit
cover_credit: Photo by Markus Spiske on Unsplash
cover: ../markus-spiske-666905-unsplash.webp
cover_mobile: ../w300_markus-spiske-666905-unsplash.webp
cover_icon: ../icon_markus-spiske-666905-unsplash.webp
social_image: ../desktop-social.webp
---
## RegEx Denial-of-Service: ReDOS

Eine der überraschenderen, aber schwer zu erkennenden Schwachstellen, die ich gefunden habe, hängt mit regulären Ausdrücken zusammen.  
Entweder schlecht geschrieben oder schlecht implementiert.

Speicher/CPU können durch große oder speziell präparierte Benutzereingaben erschöpft werden.

> Das ist eine Denial-of-Service‑Schwachstelle, nicht nur ein Performance‑Geruch. Wenn feindliche Eingaben die CPU lange genug blockieren, um legitime Nutzer zu verhungern, gehört sie in Ihr Sicherheits‑Threat‑Model.

### Warnzeichen

1. Verschachtelte Quantifier, wiederholte Gruppen oder überlappende Alternativen  
2. Backtracking‑intensive Engines ohne Timeout oder Eingabelängenbegrenzung  
3. Der Ausdruck wird mit ungeprüften Benutzereingaben verwendet  
4. Regex‑Validierung läuft auf einem heißen Request‑Pfad

### Minderung / Lösung

1. RegEx ist schwierig.  
    1.  Zum Beispiel, so empfiehlt das wirklich schlaue Team von [OWASP die Behandlung von IP‑Validierung][owasp]: `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`  
    2.  Das ist länger als ein (altmodischer) Tweet für eine 4‑Byte‑IP‑Adresse!!!
2. Begrenzen Sie die Eingabelänge, bevor der reguläre Ausdruck ausgewertet wird.  
3. Fügen Sie Time‑outs, statische Analysen oder eine nicht‑backtracking‑Engine hinzu, sofern die Plattform das unterstützt.  
4. Das betrifft fast jede Sprache und jedes Framework: .NET, Node, Python, PERL, Java.

### Referenz

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
