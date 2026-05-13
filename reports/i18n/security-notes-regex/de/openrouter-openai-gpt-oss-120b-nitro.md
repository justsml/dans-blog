# Translation Candidate
- Slug: security-notes-regex
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/de/index.mdx
- Validation: passed
- Runtime seconds: 0.72
- Input tokens: 1896
- Output tokens: 612
- Thinking tokens: unknown
- Cached input tokens: 896
- Cache write tokens: 0
- Estimated cost: $0.000184
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
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
