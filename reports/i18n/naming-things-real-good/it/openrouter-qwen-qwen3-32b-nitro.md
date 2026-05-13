# Translation Candidate
- Slug: naming-things-real-good
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2016-06-01--naming-things-real-good/it/index.mdx
- Validation: deferred
- Runtime seconds: 10.57
- Input tokens: 4063
- Output tokens: 4368
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001373
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: ''
subTitle: 'Come dare nome alle cose: Fondamenti dell''orientamento a oggetti'
date: '2016-06-01'
modified: '2024-08-10'
category: Guides
subCategory: programming
tags:
  - programming
  - patterns
  - naming
  - source-code
  - organization
cover: ../rawpixel-652639-unsplash.webp
cover_mobile: ../w300_rawpixel-652639-unsplash.webp
cover_icon: ../icon_rawpixel-652639-unsplash.webp
---
## Denominazione di elementi: Fondamenti di programmazione orientata agli oggetti

Analizziamo il design di oggetti/classe con un esempio...

### La situazione

Hai mai progettato un `modello dati` (in codice, SQL o fogli Excel)?
Ti risulta familiare il seguente esempio?

```
*** anti-pattern - don't copy-paste ***
* User
  - id
  - avatarUrl
  - name
  - email
  - password

* Agent
  - id
  - primaryPhoto
  - name
  - email
  - agentEmail
  - agentPhoneMain
  - agentEmailPrimary
  - agentPhonePrimary
  - agentAddressFull
  - agentCompanyName
  - agentCompanyAddress
  - *userEmail* - 'Pointer' a tabella User ^^^
```

### Dove sta il problema?

Tecnicamente non c'è un errore, semplicemente i dati necessitano di un riassestamento.

Ti suona familiare?

1.  Qualsiasi modifica alla tua app richiederà ore di fastidiosa debug.
1.  Qualsiasi richiesta di modifica porterà a:

![schema refactor][schema_refactor]

Perché dare a un campo il nome `agentEmailPrimary` è _così brutto_?

Per iniziare, non stai creando qualcosa di completamente nuovo per l'universo. L'eccessiva specificità presenta alcune trappole:

1.  Essere "bloccati" in un nome estremamente specifico significa che `agentEmailPrimary` probabilmente rende le tue viste e il codice correlato **0% riutilizzabili**, con bug fastidiosamente ricorrenti come:

- I dati non sincronizzati tra le tabelle (non è evidente se `user.email` debba propagarsi a `agent.agentEmail` o viceversa - non parliamo nemmeno della complessità di implementare manualmente dove e come enforzare questa "logica" ...)
- Le regole di convalida/logica sono probabilmente duplicate e inconsistenti.
- Sempre di più, il tuo progetto assomiglierà a una torre instabile di Jenga.
- La fragilità aumenta con ogni nuovo file, poiché è richiesta un'attenzione estremamente dettagliata persino per modifiche banali.

1. `agentEmailPrimary` potrebbe significare diverse cose. Evita ambiguità utilizzando **nomi più brevi**.

- Fai attenzione alle parole inutili in eccesso. `Primary`? Conduce solo a più domande: C'è un Secondary? È per il loro Primary Next-of-kin?

Basta con le parole, Dan, come dovrebbe apparire invece?

### Una Soluzione

```
// Consolidated Schema:

User
  - id
  - role: ['agent', 'lead', 'admin']
  - name
  - phone
  - address
  - email
  - password
  - company
    - name
    - address
```

Ho rimosso la tabella `Agent`, poiché non conteneva campi unici per gli Agent. E l'oggetto `User.company` (con `.name`, `.address`) è emerso una volta che i nomi sono stati puliti.

Qualche principio guida:

1. Elimina le tabelle non necessarie. Hai davvero bisogno di una tabella `statuses`? Quando potresti aggiungere un campo `status::VARCHAR(8)` nella tabella `User`? Va bene, usa gli extra byte per riga.
2. Prova a unire tabelle correlate. **Data**
3. Elimina la raccolta di dati ridondante (es. rimuovi la tabella `ActivityLogs` se sostituita da una soluzione di Analitica).
4. Prova a mantenere **tutti i nomi dei campi** a **una sola parola/sostantivo/pronome**. Va bene affidarsi al contesto fornito dalla tabella. (es. `PersonalAccount.email` vs `BusinessAccount.email` - il contesto è fornito dal nome della tabella).
5. Non esiste alcuna cosa come `Agent.agentEmail` o `Agent.agentPhonePrimary`. Punto. Ripetiamolo insieme: "è `email` & `phone`".
6. Usando nomi estremamente specifici, incastonate in pietra un livello specifico di `riutilizzo del codice` e `durabilità`, beh, specificamente **ZERO %**.
7. Non ti stai facendo alcun favore con roba del tipo `User.profileSummaryEmail`. 💞

**Letture consigliate:**

1. [Forse la normalizzazione non è normale](https://blog.codinghorror.com/maybe-normalizing-isnt-normal/)
1. [I compromessi tra normalizzazione e denormalizzazione del database](https://dev.to/er_dward/the-trade-offs-between-database-normalization-and-denormalization-4kdo)
2. [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)
3. [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)

[schema_refactor]: ../bldg-collapse__wsZKhIc_kafcha.gif
````
