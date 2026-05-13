# Translation Candidate
- Slug: the-jsonb-seduction
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--the-jsonb-seduction/it/index.mdx
- Validation: deferred
- Runtime seconds: 5.39
- Input tokens: 11191
- Output tokens: 3015
- Thinking tokens: unknown
- Cached input tokens: 5504
- Cache write tokens: 0
- Estimated cost: $0.000979
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'JSONB: Il modo migliore per rovinare il tuo database'
subTitle: >-
  JSONBè potente, utile e molto facile da usare in modo sbagliato quando lo
  trasformi in uno schema reale.
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - postgres
  - postgresql
  - databases
  - jsonb
  - json
  - schema-design
  - technical-debt
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
PostgreSQL ha aggiunto JSONB per consentire di memorizzare dati semi‑strutturati senza dover definire schemi rigidi in anticipo. L’idea era valida: a volte non sai davvero com’è il dato, o cambia così spesso che le colonne tradizionali non hanno senso.

Questo è importante perché JSONB non è un errore. In molti sistemi è la rappresentazione più pulita del problema. Se stai memorizzando payload di webhook di terze parti, corpi di eventi versionati, flag di funzionalità o oggetti di configurazione LLM in cui ogni provider e modello espone un set di opzioni leggermente diverso e in continua evoluzione, forzare tutto in colonne di prima classe può risultare più scomodo che utile.

Il problema è che JSONB è anche il modo più semplice per rimandare le decisioni di schema senza ammettere di farlo. Da qualche parte tra l’intenzione e l’implementazione, è diventato l’equivalente nel database di “pulirò la stanza più tardi”. Quella soluzione temporanea a cui sei ricorso sei mesi fa? È ancora lì, e ora la produzione dipende da essa.

Continuo a osservare lo stesso schema. Un team aggiunge una colonna JSONB perché non è sicuro dei requisiti. Si promette di normalizzarla una volta che le cose si stabilizzino. Tre anni dopo, quella colonna contiene quaranta versioni diverse di quello che doveva essere un profilo utente, interrogata da quindici servizi che ciascuno fa ipotesi differenti su cosa contenga.

Il debito tecnico non è JSONB in sé. È il divario tra quello che ti sei detto di stare costruendo e quello che hai realmente costruito: un sistema non documentato di schema‑on‑read.

## Cosa Succede di Solito

Stai aggiungendo una funzionalità e non sei sicuro se gli utenti abbiano bisogno di un `twitter_handle` o di un `bluesky_handle` o di qualcos'altro. Invece di pensare allo schema, fai così:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  profile JSONB
);
```

Funziona. Rilasci la funzionalità, passi alla successiva, poi alla successiva. La colonna JSONB cresce silenziosamente in background.

Questo è il bivio. Se `profile` rimane un blob opaco recuperato tramite `user.id`, probabilmente va bene. Se inizia a diventare il luogo principale dove risiedono i dati di business, i compromessi cambiano rapidamente.

Il prodotto chiede: *"Quanti utenti ci sono a New York?"*

Scrivi:

```sql
SELECT count(*) FROM users WHERE profile->>'location' = 'New York';
```

Postgres esegue una scansione completa della tabella. Ogni singola riga.

Quindi aggiungi un indice GIN. Forse è ancora accettabile. Talvolta lo è. Ma ora paghi in termini di complessità reale e di spazio di archiviazione perché un campo che si comporta come dato relazionale di prima classe non è mai diventato una colonna di prima classe.

### Anno 1: Deriva dello schema

Hai tre versioni di dati nella stessa colonna.

*   Riga 1: `{"city": "NYC"}`
*   Riga 1000: `{"location": "NYC"}`
*   Riga 5000: `{"address": {"city": "New York"}}`

Il codice della tua applicazione ora appare così:

```javascript
const city = user.location || user.city || user.address?.city || "Unknown";
```

Non hai rimosso lo schema. Hai semplicemente spostato le verifiche di validazione e coerenza dal database al codice dell’applicazione sparso.

---

## Quando Usare Effettivamente JSONB

JSONB ha casi d'uso validi. Molte volte è perfettamente accettabile, e talvolta è la migliore opzione disponibile.

La distinzione critica non è “structured good, JSON bad”. È più vicina a questo:

- I dati vengono per lo più recuperati interamente tramite una chiave primaria stabile?
- Le chiavi variano in modo significativo tra fornitori, versioni, tenant o nel tempo?
- Stai interrogando pochi campi noti, o inventi nuove query di percorso ad ogni sprint?
- L'applicazione gestisce intenzionalmente versionamento e validazione, o lo fa alla cieca?

### Casi d'Uso Legittimi di JSONB

1.  **Payload Webhook**: Ricevi dati da Stripe, Slack o GitHub. Non hai alcun controllo sullo schema. Potresti non interrogarli mai. Ti basta conservarli per il debug o per il replay. **Perfetto per JSONB.**

2.  **Log e Stream di Eventi**: Log dell’applicazione, audit trail, contesti di errore. Sono scritture intensive, raramente interrogati per campi specifici, e spesso analizzati in blocco o esportati verso piattaforme di analytics. **JSONB è adeguato qui.**

3.  **Preferenze e Impostazioni Utente**: Oggetti di impostazione con più di 100 flag booleani, la maggior parte dei quali è falsa, e che vengono sempre recuperati interamente per ID utente. Non esegui query del tipo `WHERE preferences->>'theme' = 'dark'`. **JSONB funziona.**

4.  **Configurazione Provider/Modello LLM**: È uno degli esempi moderni più chiari. OpenAI, Anthropic, Gemini, modelli locali a peso aperto e gateway specifici dei fornitori espongono parametri sovrapposti ma differenti. Anche all’interno di un singolo provider, le capacità del modello e i nomi delle opzioni evolvono. Un blob di configurazione JSONB è spesso molto più onesto rispetto a fingere che `temperature`, `top_p`, `reasoning_effort`, `json_schema`, `tool_choice` e altre venti manopole debbano essere colonne universali. **JSONB è spesso l’astrazione corretta in questo caso.**

5.  **Cache delle Risposte API**: Stai memorizzando intere risposte API. Il database funge solo da Redis più veloce. Recuperi per chiave di cache, mai per proprietà annidate. **JSONB è appropriato.**

6.  **Event Sourcing**: Stai archiviando payload di eventi immutabili. Le tue query sono sempre “dammi tutti gli eventi per l’aggregato X” ordinati per tempo. Non esegui mai clausole `WHERE` sulle proprietà dell’evento. **JSONB è adatto.**

7.  **Superfici di Estensibilità**: integrazioni, impostazioni dei plugin, sovrascritture per tenant, metadati del marketplace, capacità del provider o campi “extra” dove si prevede esplicitamente che la forma vari per sottotipo. **JSONB può essere il contratto corretto, non un compromesso.**

Regola pratica: se l’applicazione recupera il documento tramite una chiave nota e sa come validarlo/versionarlo, JSONB può essere eccellente. Se il business continua a porre domande relazionali su chiavi annidate, quei campi stanno tentando di diventare colonne.

## Il Modello Migliore È Spesso Ibrido

Molti sistemi maturi finiscono qui:

```sql
CREATE TABLE llm_requests (
  id UUID PRIMARY KEY,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  config JSONB NOT NULL
);
```

Di solito è preferibile rispetto a entrambi gli estremi.

- `provider`, `model`, `status` e `created_at` sono colonne di prima classe perché li filtrerai, li unirai, li aggregherai e li indicizzerai.
- `config` rimane JSONB perché la superficie delle opzioni è specifica del modello, del provider e probabilmente evolverà.

Questo nonè “non normalizzare”. È tracciare il confine nel punto giusto.

### Su larga scala: Versionamento degli oggetti > Normalizzazione

Qui le cose si fanno interessanti. A scala sufficientemente grande, la soluzione “giusta” non è la normalizzazione—è il versionamento degli oggetti.

Se gestisci miliardi di righe e frequenti evoluzioni dello schema, migrare le colonne diventa costoso. Aziende come Stripe, GitHub e Netflix non normalizzano tutto. Invece:

```sql
CREATE TABLE entities (
  id UUID PRIMARY KEY,
  version INT NOT NULL,
  data JSONB NOT NULL
);
```

La tua applicazione sa come leggere `version: 1`, `version: 2`, `version: 3`. Nessuna migrazione del database per i nuovi campi. Il codice gestisce la compatibilità retroattiva.

Si tratta di una decisione architetturale, non di pigrizia. Scambia la complessità del database con quella dell’applicazione. Talvolta è proprio il compromesso corretto, soprattutto quando il documento è naturalmente versionato e l’app è l’interprete canonico.

Il caso di errore non è “usare JSONB”. Il caso di errore è usare JSONB senza versionamento, convalida, regole di promozione o un confine chiaro tra dati documento e dati relazionali.

## Le Domande Che Contano Davvero

Prima di aggiungere una colonna JSONB, chiediti:

1.  Eseguiremo query su campi nidificati in `WHERE`, `JOIN`, `GROUP BY` o `ORDER BY` con regolarità?
2.  Controlliamo noi questo schema, o è definito esternamente e volatile?
3.  La forma è intenzionalmente eterogenea tra i record?
4.  Abbiamo convalida e versionamento a livello di applicazione?
5.  Quali campi potrebbero diventare dimensioni operative in seguito?

Se la risposta al punto #1 è “sì, costantemente”, è un segnale forte per usare colonne tradizionali.

Se le risposte ai punti #2 e #3 sono “sì”, probabilmente JSONB sta svolgendo un lavoro reale per te.

---
## Evitare la Trappola

Se sei già caduto in questa buca, smetti di scavare.

1.  **Audit**: Esegui `jsonb_object_keys` e analizza lo scorrimento reale della forma, non quella che presumi esista.  
2.  **Promuovi**: Identifica i campi su cui filtri, fai join, ordini o riporti più spesso. Trasformali in vere colonne.  
3.  **Valida**: Aggiungi convalida a livello di applicazione o di database per tutto ciò che rimane in JSONB.  
4.  **Versiona**: Se il blob contiene dati di dominio reali, versionalo esplicitamente.  
5.  **Riduci**: Rimuovi le chiavi duplicate dal blob una volta che le colonne promosse sono state create.

Non dirti che ogni blob deve essere normalizzato. E non dirti che un blob con semantica di business permanente è “temporaneo”.

JSONB è ottimo quando il documento è davvero a forma di documento. È pericoloso quando è uno schema relazionale con un falso baffo.

## Risorse

- [Documentazione JSONB di PostgreSQL](https://www.postgresql.org/docs/current/datatype-json.html)
- [Strategie di indicizzazione JSONB](https://www.postgresql.org/docs/current/datatype-json.html#JSON-INDEXING)
- [Quando usare JSONB vs colonne relazionali](https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)
- [Best practice per la progettazione di schemi PostgreSQL](https://www.postgresql.org/docs/current/ddl.html)
````
