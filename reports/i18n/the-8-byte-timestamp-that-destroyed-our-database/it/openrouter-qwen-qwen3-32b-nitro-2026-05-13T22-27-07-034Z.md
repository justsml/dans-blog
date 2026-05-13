# Translation Candidate
- Slug: the-8-byte-timestamp-that-destroyed-our-database
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/it/index.mdx
- Validation: deferred
- Runtime seconds: 79.41
- Input tokens: 10036
- Output tokens: 7676
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002645
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Il tuo Timestamp è una bugia
subTitle: >-
  Cosa mi ha insegnato un biglietto ferroviario sull'archiviazione del tempo nei
  database
date: '2025-12-29'
modified: '2026-01-12'
tags:
  - postgres
  - postgresql
  - databases
  - timestamps
  - timezones
  - microservices
  - debugging
category: Code
subCategory: Databases
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Stavo prenotando un treno da New York a Chicago quando mi è venuta in mente la ragione per cui i tipi timestamp in Postgres sono così confusi. Il biglietto mostrava:

- Partenza: 8:00 AM EST  
- Arrivo: 7:30 PM CST  
- Durata: 11 ore 30 minuti  

Tre modi diversi di parlare dell'orario, tutti sullo stesso biglietto. E ciascuno deve essere archiviato in modo diverso nel database.

## La domanda che nessuno si pone per prima

Sia `TIMESTAMP` che `TIMESTAMPTZ` in Postgres occupano esattamente 8 byte con la stessa precisione in microsecondi. Quindi, perché avere due tipi diversi?

Perché "che ore sono?" dipende completamente da ciò che stai cercando di comunicare a qualcuno.

Quando salgo su quel treno a New York, devo sapere che parte alle 8:00 AM Eastern. Quell'orario è il numero che devo confrontare con l'orologio della stazione. Quando il mio amico mi va a prendere a Chicago, deve sapere che arrivo alle 7:30 PM Central – è il numero che compare sull'orologio *del suo orologio*. E se sto cercando di capire se avrò tempo per leggere il mio libro, devo sapere che il viaggio dura un'ora e mezza.

Stesso treno. Stesso viaggio. Tre rappresentazioni completamente diverse del tempo.

## Cosa fa realmente TIMESTAMPTZ

Ecco il trucco con `TIMESTAMPTZ` – e non è ciò che pensa la maggior parte delle persone. Non archivia il fuso orario. Il nome è fuorviante.

Cio che fa è convertire qualsiasi orario gli fornisci in UTC prima di memorizzarlo, quindi convertirlo nuovamente nel fuso orario della tua sessione quando lo leggi. La parte "TZ" non riguarda l'archiviazione, ma il **supporto per la conversione**.  

Supponiamo di memorizzare la partenza del treno. Qualcuno a Tokyo interroga il tuo database e vede la partenza in JST. Qualcuno a Londra la vede in GMT. Tutti osservano lo stesso momento assoluto, espresso semplicemente nel loro fuso orario configurato. Questo è perfetto per registrare eventi: "quando è avvenuto questo pagamento?" o "quando è avvenuta questa richiesta API?".  

Ma cosa succede con quel biglietto del treno? Non vorresti che l'orario di partenza cambiasse solo perché qualcuno lo consulta da un fuso orario diverso. Il treno parte alle 8:00 AM Eastern, punto e basta. Questo non è un momento assoluto nel tempo: è una promessa su cosa indicherà l'orologio di Grand Central.  

## Archiviare Ciò Che Intendi Realmente  

Per quel viaggio in treno, devi memorizzare cose diverse a seconda dello scopo:  

- I momenti assoluti (`departs_at` e `arrives_at` come `TIMESTAMPTZ`)  
- Il contesto di visualizzazione (`origin_timezone` e `destination_timezone` come testo)  
- La durata (un `INTERVAL` tra i due momenti)  

Ora la tua applicazione può fare ciò che fa il biglietto del treno: mostrare "Partenza 8:00 AM EST" convertendo il momento assoluto nel fuso orario di origine, mostrare "Arrivo 7:30 PM CST" convertendo nel fuso orario di destinazione, e mostrare "Durata: 11h 30m" direttamente dall'intervallo.  

La persona che prenota il biglietto da Tokyo vede gli stessi orari locali in ogni stazione. Questo è ciò che deve sapere.  

## Perché La Tua App Di Tracciamento Dei Voli Ha Fatto Male  

Hai mai notato come alcune app di tracciamento dei voli mostrino il tuo fuso orario durante il volo? Tipo sei sull'Atlantico e dice "Ora corrente: 4:32 PM GMT". A chi importa? Non sei a Greenwich, sei a 38.000 piedi sopra l'oceano.

Cio che vorresti davvero vedere:  
- Tempo trascorso dal decollo  
- Tempo rimanente per la destinazione  
- Che ora sarà *lì* quando atterri  

Nessuna di queste è una conversione del fuso orario. Le prime due sono **intervallo**—durata, non momenti. L'ultima è una conversione del fuso orario, ma verso un luogo specifico, non "il tuo fuso orario corrente".  

Hai notato? Due calcoli di intervallo (`NOW() - actual_departure` e `estimated_arrival - NOW()`), una conversione del fuso orario verso un luogo specifico (`AT TIME ZONE destination_timezone`). Il tuo fuso orario corrente non entra in gioco.  

## Quando l'ora sul muro è davvero ciò di cui hai bisogno  

Gli hotel non si preoccupano di momenti assoluti. Si preoccupano delle letture orarie al loro luogo.  

"Il check-in è dopo le 15:00" non significa "check-in 15 ore dopo mezzanotte UTC". Significa "quando l'orologio nella nostra hall indica le 15:00, puoi effettuare il check-in". Se i tuoi server sono in Virginia ma l'hotel è a Parigi, vorrai comunque che questa regola si attivi alle 15:00 *ora di Parigi*.  

Il tipo `TIME` (senza data né fuso orario) rappresenta esattamente questo: "una lettura sull'orologio". Accoppiatelo con un campo testuale del fuso orario ("Europe/Paris"), e potrete applicare politiche orarie locali indipendentemente da dove si trovino i vostri server. Ma vorrete anche colonne `TIMESTAMPTZ` per registrare quando gli ospiti effettivamente entrano ed escono—quei momenti assoluti che il backend deve tracciare.  

## Il problema del calendario  

Ho un promemoria ricorrente alle 9:00: "Rivedi le priorità quotidiane". Voglio quel promemoria alle 9:00 *dove mi trovo*. Se viaggio, dovrebbe comunque scattare alle 9:00 locali.  

Ma ho anche un evento del calendario: "Standup del team alle 10:00 EST". Il mio collega a Berlino deve vedere "16:00 CET" per lo stesso evento. Stesso incontro, orari di visualizzazione diversi, perché questo è un momento assoluto a cui tutti parteciperemo.

Due tipi diversi di eventi, due strategie di archiviazione diverse. L'incontro ottiene un `TIMESTAMPTZ`. Il promemoria ottiene un `TIME` più il mio fuso orario corrente. Evita di forzare entrambi nello stesso campo.

## Le cose che rompono in produzione

Anche con i tipi corretti, la precisione può causare problemi. Postgres memorizza i microsecondi: `10:00:00.123456`. L'oggetto `Date` di JavaScript utilizza i millisecondi: `10:00:00.123`.

Quindi questa query potrebbe restituire misteriosamente zero righe:

```sql
SELECT * FROM orders WHERE created_at = '2026-01-15 10:00:00.123';
```

Il database ha `10:00:00.123456` e il tuo codice passa `10:00:00.123`. A seconda di come il tuo driver lo gestisce, questi potrebbero non corrispondere.

Non utilizzare l'uguaglianza esatta per gli orari. Usa query a intervalli, oppure—meglio ancora—non cercare affatto i record in base all'orario di creazione. Utilizza un vincolo unico appropriato o una chiave di idempotenza.

## Regole pratiche

**Preferisci TIMESTAMPTZ.** Quando in dubbio, usa `TIMESTAMPTZ`. Gestisce automaticamente le distribuzioni multiregionali, l'ora legale e i futuri cambiamenti di fuso orario. Occupa lo stesso spazio di `TIMESTAMP`, quindi non c'è alcuna penalità.

**Memorizza il contesto separatamente.** Se devi mostrare "Partenza alle 8:00 EST" insieme al momento effettivo, memorizza sia il `TIMESTAMPTZ` che il `origin_timezone` come colonne separate. Non cercare di codificare tutto in un unico campo.

**Pensa agli intervalli.** Molte richieste relative al tempo riguardano in realtà la durata, non i momenti. "Da quanto tempo è in sospeso?" "Quando scadrà?" Usa operazioni `INTERVAL`, non conversioni di fuso orario.

**Esegui tutto in UTC.** I tuoi server dovrebbero essere impostati su UTC. Le tue sessioni di database dovrebbero predefinire UTC. Converti nel fuso orario locale solo quando devi visualizzare ai utenti, e solo quando sai quale fuso orario è rilevante.  

**Richiedi informazioni sul fuso orario ai client.** Se un client invia `2026-01-15T10:00:00` senza uno spostamento, rifiutalo. Richiedi il formato ISO-8601 con `Z` oppure uno spostamento esplicito come `-05:00`. Non indovinare.  

## Applicare buone predefinizioni  

Se `TIMESTAMPTZ` è la tua predefinizione (e dovrebbe esserlo), considera di applicarla a livello di database. Un trigger che rifiuti le colonne `TIMESTAMP WITHOUT TIME ZONE` sembra estremo, ma catturare il problema "dimenticato di aggiungere TZ" al momento della creazione dello schema è meglio che debuggarlo sei mesi dopo quando qualcuno aggiunge una nuova tabella e dimentica.  

## Cosa mi ha insegnato quel biglietto del treno  

Il tempo nei database non è complicato perché i timestamp sono complessi. È complicato perché spesso memorizziamo più preoccupazioni in un unico campo, o non pensiamo a cosa stiamo realmente cercando di mostrare agli utenti.  

Quel biglietto del treno aveva ragione: orario di partenza nel fuso orario di origine, orario di arrivo nel fuso orario di destinazione, e durata come qualcosa di completamente separato. Tre informazioni diverse, ciascuna significativa a modo suo.  

Il tuo database può fare lo stesso. Memorizza i momenti assoluti come `TIMESTAMPTZ`. Memorizza il contesto di visualizzazione (fusi orari, posizioni) come colonne separate. Usa i tipi `INTERVAL` per le durate. Lascia a Postgres le conversioni quando le hai bisogno, ma sii esplicito su quale fuso orario è rilevante per quale scopo.  

Nella maggior parte dei casi, ciò significa `TIMESTAMPTZ` e UTC ovunque, con conversioni dei fusi orari solo al momento della visualizzazione. Ma quando hai bisogno di orari fissi o calendari ricorrenti, i tipi `TIMESTAMP` o `TIME` esistono esattamente per questo motivo.  

La chiave è sapere quale domanda stai cercando di rispondere: "Quando è successo?" vs. "Che ora devo essere lì?" vs. "Quanto durerà?" Sono tutte domande diverse sul tempo, e spesso richiedono strategie di memorizzazione diverse.

Pensate a ciò che i vostri utenti devono vedere. Poi memorizzate i dati che vi permettono di mostrarlo esattamente così.

## Risorse

- [Documentazione sui tipi di data/ora di PostgreSQL](https://www.postgresql.org/docs/current/datatype-datetime.html)
- [Prassi consigliate per i timestamp in PostgreSQL](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Date.2FTime_storage)
- [Formato data/ora ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
- [Database delle fusi orari (IANA)](https://www.iana.org/time-zones)
- [Gestione dei timestamp nei sistemi distribuiti](https://www.postgresql.org/docs/current/functions-datetime.html)
````
