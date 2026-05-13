# Translation Candidate
- Slug: security-notes-regex
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/de/index.mdx
- Validation: deferred
- Runtime seconds: 3.43
- Input tokens: 1078
- Output tokens: 1591
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000468
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Sicherheitshinweise: RegEx'
subTitle: Können RegEx anfällig sein?
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
## RegEx Verweigerung des Dienstes: ReDOS

Einer der überraschenderen und dennoch schwer zu erkennenden Schwachstellen, die ich gefunden habe, hängt mit regulären Ausdrücken zusammen. Entweder schlecht geschrieben oder schlecht implementiert.

Speicher/CPU können durch große oder speziell gestaltete Benutzereingaben aufgebraucht werden.

> Dies ist eine Verweigerung-des-Dienstes-Schwachstelle, nicht nur ein Leistungsproblem. Wenn feindliche Eingaben den CPU-Befehl so lange blockieren können, dass echte Benutzer darunter leiden, gehört sie in Ihr Sicherheitsbedrohungsmuster.

### Warnzeichen

1. Verschachtelte Quantifizierer, wiederholte Gruppen oder überlappende Alternationen  
2. Rückverfolgungs-intensive Motoren ohne Timeout oder Eingabegrößenbegrenzung  
3. Ausdruck wird mit nicht überprüften Benutzereingaben verwendet  
4. RegEx-Validierung läuft auf einem heißen Anforderungspfad  

### Minderung / Lösung

1. RegEx ist schwierig.  
    1.  Ein Beispiel: So empfiehlt [OWASP IP-Validierung][owasp] zu handhaben: `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`  
    2.  Das ist länger als ein (altmodiger) Tweet für eine 4-Byte-IP-Adresse!!!  
2. Begrenzen Sie die Eingabelänge vor der RegEx-Bewertung.  
3. Fügen Sie Timeouts, statische Analyse oder einen nicht-rückverfolgenden Motor hinzu, sofern die Plattform dies unterstützt.  
4. Dies betrifft fast jede Sprache und Plattform: .NET/Node/Python/PERL/Java.  

### Referenz

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
