# Translation Candidate
- Slug: security-notes-regex
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/it/index.mdx
- Validation: passed
- Runtime seconds: 1.39
- Input tokens: 1946
- Output tokens: 675
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.000197
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Note di sicurezza: RegEx'
subTitle: Le regex possono esserevulnerabili?
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

Una delle vulnerabilità più sorprendenti, eppure difficili da individuare, che ho riscontrato è legata alle espressioni regolari.  
Sia scritte male che implementate male.

Memoria/CPU possono essere esaurite da input utente grandi o appositamente manipolati.

> Si tratta di una vulnerabilità di denial‑of‑service, non solo di un odore di performance. Se un input ostile può tenere occupata la CPU a lungo abbastanza da privare gli utenti legittimi delle risorse, deve far parte del tuo modello di minaccia di sicurezza.

### Segnali di avvertimento

1. Quantificatori annidati, gruppi ripetuti o alternanze sovrapposte  
2. Motori che fanno molto backtracking senza timeout o limite di lunghezza dell'input  
3. L'espressione è usata con input utente non controllato  
4. La validazione regex viene eseguita su un percorso di richiesta ad alta frequenza

### Mitigazione / Risoluzione

1. Le espressioni regolari sono difficili.  
    1. Per esempio, ecco come i davvero esperti di [OWASP raccomandano di gestire la validazione degli IP][owasp]: `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`  
    2. È più lungo di un tweet (vecchio stile) per un indirizzo IP a 4 byte!!!
2. Limita la lunghezza dell'input prima della valutazione della regex.  
3. Aggiungi timeout, analisi statica o un motore non backtracking dove la piattaforma lo consente.  
4. Questo riguarda praticamente tutti i linguaggi e le piattaforme .NET/Node/Python/PERL/Java.

### Riferimento

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
