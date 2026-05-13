# Translation Candidate
- Slug: naming-things-real-good
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2016-06-01--naming-things-real-good/it/index.mdx
- Validation: deferred
- Runtime seconds: 3.96
- Input tokens: 4181
- Output tokens: 1433
- Thinking tokens: unknown
- Cached input tokens: 1408
- Cache write tokens: 0
- Estimated cost: $0.000421
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Nominare bene
subTitle: 'Denominarele cose: basi della programmazione orientata agli oggetti'
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
## Naming stuff: Object Oriented Basics

Diamo un’occhiata al design di oggetti/classi con un esempio...

### The Situation

Hai mai progettato un `data model` (in codice, SQL o fogli Excel)?
Ti suona familiare quanto segue?

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
  - *userEmail* - 'Pointer' to User table ^^^
```

### Where's the bug?

Beh, tecnicamente non c’è un bug, è solo dati che necessitano di una riorganizzazione.

**Ti suona familiare?**

1.  Qualsiasi modifica alla tua app richiederà ore di debug estenuante.  
2.  Qualsiasi cambiamento nei requisiti porterà a:

![schema refactor][schema_refactor]

Perché nominare un campo `agentEmailPrimary` è *così* problematico?

Per cominciare, non stai creando qualcosa di completamente nuovo nell’universo. L’eccessiva specificità nasconde delle trappole:

1.  Essere “bloccati” su un nome così preciso significa che `agentEmailPrimary` renderà probabilmente le tue viste e il codice correlato **0 % riutilizzabile**, e introdurrà fastidiosi bug ricorrenti come:

- I dati non si sincronizzano tra le tabelle (non è chiaro se `user.email` debba propagarsi a `agent.agentEmail` o viceversa – a parte la complessità di implementare manualmente dove e come far rispettare questa “logica” …)  
- Le regole/logic di validazione saranno probabilmente duplicate e incoerenti.  
- Sempre più il tuo progetto assomiglierà a una traballante torre di Jenga.  
- La fragilità si accumula ad ogni nuovo file, poiché è necessaria un’estrema attenzione ai dettagli anche per modifiche banali.  

1.  `agentEmailPrimary` potrebbe indicare diverse cose. Evita ambiguità con **nomi più brevi**.  

- Attento a parole superflue. `Primary`? Porta solo più domande: c’è un Secondary? È per il loro contatto primario di emergenza?  

Basta parole, Dan, come dovrebbe apparire invece?  

### Una soluzione

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

Ho rimosso la tabella `Agent`, poiché non conteneva campi unici per gli agenti. E l’oggetto `User.company` (con `.name`, `.address`) è emerso una volta pulito il naming.

Alcuni principi guida:

1.  Elimina le tabelle inutili. Hai davvero bisogno di una tabella `statuses`? Quando potresti aggiungere un campo `status::VARCHAR(8)` alla tabella `User`? Va bene, usa i byte extra per riga.  
2.  Prova a fondere le tabelle correlate. **Data**  
3.  Cancella la raccolta di dati ridondante (ad es. rimuovi la tabella `ActivityLogs` se sostituita da una soluzione di Analytics).  
4.  Cerca di mantenere **tutti i nomi dei campi** a **una singola parola/sostantivo/pronome**. È accettabile fare affidamento sul contesto fornito dalla tabella (ad es. `PersonalAccount.email` vs `BusinessAccount.email` – il contesto è dato dal nome della tabella).  
5.  Non esiste **nulla** del tipo `Agent.agentEmail` o `Agent.agentPhonePrimary`. Punto. Ripetilo con me: “è `email` & `phone`.”  
6.  Usando nomi altamente specifici, fissi in pietra un livello specifico di `code-reusability` e `durability`, che in pratica è **ZERO %**.  
7.  Non ti stai facendo alcun favore con roba del genere `User.profileSummaryEmail`. 💞  

**Letture consigliate:**

1. [Maybe Normalizing Isn't Normal](https://blog.codinghorror.com/maybe-normalizing-isnt-normal/)  
2.  [The Trade-offs Between Database Normalization and Denormalization](https://dev.to/er_dward/the-trade-offs-between-database-normalization-and-denormalization-4kdo)  
3.  [http://phlonx.com/resources/nf3/](http://phlonx.com/resources/nf3/)  
4.  [https://en.wikipedia.org/wiki/Database_normalization](https://en.wikipedia.org/wiki/Database_normalization)  

[schema_refactor]: https://res.cloudinary.com/ddd/image/upload/bldg-collapse__wsZKhIc_kafcha.gif
````
