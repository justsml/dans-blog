# Translation Candidate
- Slug: security-notes-regex
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/it/index.mdx
- Validation: passed
- Runtime seconds: 6.24
- Input tokens: 1875
- Output tokens: 2781
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000817
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Note sulla Sicurezza: RegEx'
subTitle: I RegEx possono essere vulnerabili?
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
## Negazione del Servizio tramite Espressioni Regolari: ReDOS

Una delle vulnerabilità più sorprendenti e difficili da individuare che ho trovato è legata alle espressioni regolari. Sia mal scritte che male implementate.

Memoria/CPU possono essere esaurite con input utente di grandi dimensioni o appositamente creati.

> Questa è una vulnerabilità di negazione del servizio, non solo un problema di prestazioni. Se un input ostile riesce a sovraccaricare la CPU per un tempo sufficiente da privare gli utenti reali, deve essere incluso nel tuo modello di minacce alla sicurezza.

### Indizi di Allerta

1. Quantificatori annidati, gruppi ripetuti o alternazioni sovrapposte
2. Motori con backtracking pesante senza timeout o limite sulla lunghezza dell'input
3. L'espressione viene utilizzata con input utente non verificati
4. La convalida tramite regex viene eseguita su un percorso di richiesta ad alto traffico

### Mitigazione / Risoluzione

1. Le espressioni regolari sono complesse.  
    1.  Ecco come i brillanti esperti di [OWASP raccomandano di gestire la convalida degli indirizzi IP][owasp]: `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`  
    2.  Questo è più lungo di un tweet (vecchio stile), per un indirizzo IP da 4 byte!!!  
2. Limita la lunghezza dell'input prima della valutazione delle espressioni regolari.  
3. Aggiungi timeout, analisi statica o un motore non backtracking dove la piattaforma lo supporta.  
4. Questo colpisce quasi ogni linguaggio e piattaforma .NET/Node/Python/PERL/Java.  

### Riferimenti

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
