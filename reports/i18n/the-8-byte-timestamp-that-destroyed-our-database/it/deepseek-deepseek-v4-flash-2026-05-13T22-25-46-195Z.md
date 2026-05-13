# Translation Candidate
- Slug: the-8-byte-timestamp-that-destroyed-our-database
- Locale: it
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/it/index.mdx
- Validation: deferred
- Runtime seconds: 50.05
- Input tokens: 7775
- Output tokens: 6939
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.002821
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Il tuo timestamp è una bugia
subTitle: >-
  Cosa mi ha insegnato un biglietto del treno sull'archiviazione del tempo nei
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
Stavo prenotando un treno da New York a Chicago quando ho capito perché i tipi timestamp in Postgres sono così confusi. Il biglietto mostrava:

- Partenza: 8:00 AM EST
- Arrivo: 7:30 PM CST
- Durata: 11 ore e 30 minuti

Tre modi diversi di parlare del tempo, tutti sullo stesso biglietto. E ognuno va memorizzato in modo diverso in un database.

## La domanda che nessuno si pone per primo

Sia `TIMESTAMP` che `TIMESTAMPTZ` in Postgres occupano esattamente 8 byte con la stessa precisione al microsecondo. Allora perché avere due tipi?

Perché «che ora è?» dipende interamente da cosa stai cercando di comunicare.

Quando salgo su quel treno a New York, devo sapere che parte alle 8:00 Eastern. È il numero sull'orologio della stazione che devo abbinare. Quando la mia amica mi viene a prendere a Chicago, deve sapere che arrivo alle 7:30 PM Central — quello è il numero sul *suo* orologio. E se voglio capire se avrò tempo per leggere il mio libro, devo sapere che è un viaggio di undici ore e mezza.

Stesso treno. Stesso viaggio. Tre rappresentazioni del tempo completamente diverse.

## Cosa fa realmente TIMESTAMPTZ

Ecco il trucco con `TIMESTAMPTZ` — e non è quello che la maggior parte pensa. Non memorizza il fuso orario. Il nome è fuorviante.

Ciò che fa è convertire l'ora che gli dai in UTC prima di memorizzarla, poi riconvertirla nel fuso orario della tua sessione quando la leggi. La parte "TZ" non riguarda l'archiviazione, ma il **supporto alla conversione**.

Supponiamo di memorizzare quella partenza del treno. Qualcuno a Tokyo interroga il tuo database e vede la partenza in JST. Qualcuno a Londra la vede in GMT. Tutti guardano lo stesso momento assoluto, solo espresso nel loro fuso orario configurato. Questo è perfetto per registrare eventi: "quando è stato elaborato questo pagamento?" o "quando è avvenuta questa richiesta API?"

Ma per quel biglietto del treno? Non vuoi che l'ora di partenza cambi solo perché qualcuno lo interroga da un fuso orario diverso. Il treno parte alle 8:00 AM Eastern, punto. Non è un momento assoluto nel tempo — è una promessa su ciò che dirà l'orologio al Grand Central.

## Memorizzare ciò che intendi realmente

Per quel viaggio in treno, devi memorizzare cose diverse per scopi diversi:

- I momenti assoluti (`departs_at` e `arrives_at` come `TIMESTAMPTZ`)
- Il contesto di visualizzazione (`origin_timezone` e `destination_timezone` come testo)
- La durata (un `INTERVAL` tra i due momenti)

Ora la tua applicazione può fare ciò che fa il biglietto del treno: mostrare "Partenza 8:00 AM EST" convertendo il momento assoluto nel fuso orario di origine, mostrare "Arrivo 7:30 PM CST" convertendo nel fuso orario di destinazione, e mostrare "Durata: 11h 30m" direttamente dall'intervallo.

La persona che prenota il biglietto da Tokyo vede le stesse ore locali in ogni stazione. Questo è ciò che deve sapere.

## Perché la tua app di monitoraggio voli ha sbagliato

Hai mai notato come alcune app di monitoraggio voli mostrano il tuo fuso orario durante il volo? Tipo sei sull'Atlantico e dice "Ora corrente: 4:32 PM GMT." A chi importa? Non sei a Greenwich, sei a 38.000 piedi da qualche parte sopra l'oceano.

Quello che vuoi realmente vedere:
- Tempo trascorso dal decollo
- Tempo rimanente alla destinazione
- Che ora sarà *lì* quando atterri

Nessuna di queste è una conversione di fuso orario. Le prime due sono **intervalli**—durate, non istanti. L'ultima è una conversione di fuso orario, ma verso un luogo specifico, non "il tuo fuso orario corrente."

Visto? Due calcoli di intervallo (`NOW() - actual_departure` e `estimated_arrival - NOW()`), una conversione di fuso orario verso un luogo specifico (`AT TIME ZONE destination_timezone`). Il tuo fuso orario corrente non c'entra.

## Quando l'ora da orologio è ciò che ti serve davvero

Agli alberghi non importano gli istanti assoluti nel tempo. A loro importano le letture dell'orologio nella loro posizione.

"Check-in dopo le 15:00" non significa "check-in 15 ore dopo la mezzanotte UTC." Significa "quando l'orologio nella nostra hall segna le 15:00, puoi fare il check-in." Se i tuoi server sono in Virginia ma l'albergo è a Parigi, vuoi comunque che quella regola scatti alle 15:00 *ora di Parigi*.

Il tipo `TIME` (senza data né fuso orario) rappresenta esattamente questo: "una lettura su un orologio." Abbinalo a un campo di testo per il fuso orario ("Europe/Paris"), e puoi applicare politiche basate sull'ora da orologio indipendentemente da dove vivono i tuoi server. Ma ti serviranno anche colonne `TIMESTAMPTZ` per quando specifici ospiti effettivamente fanno check-in e check-out—sono istanti assoluti che il tuo backend deve tracciare.

## Il problema del calendario

Ho un promemoria ricorrente impostato per le 9:00: "Rivedi le priorità quotidiane." Voglio quel promemoria alle 9:00 *ovunque mi trovi*. Se sto viaggiando, deve comunque scattare alle 9:00 ora locale.

Ma ho anche un evento del calendario: "Standup di squadra alle 10:00 EST." Il mio collega a Berlino deve vedere "16:00 CET" per lo stesso evento. Stessa riunione, orari di visualizzazione diversi, perché questo è un istante assoluto a cui ci uniamo tutti.

Due diversi tipi di eventi, due diverse strategie di archiviazione. La riunione riceve un `TIMESTAMPTZ`. Il promemoria riceve un `TIME` più la mia impostazione del fuso orario corrente. Evita di cercare di forzare entrambi nello stesso campo.

## Le cose che si rompono in produzione

Anche con i tipi giusti, la precisione può morderti. Postgres memorizza i microsecondi: `10:00:00.123456`. L'oggetto `Date` di JavaScript usa i millisecondi: `10:00:00.123`.

Quindi questa query potrebbe misteriosamente non restituire righe:

```sql
SELECT * FROM orders WHERE created_at = '2026-01-15 10:00:00.123';
```

Il database ha `10:00:00.123456` e il tuo codice passa `10:00:00.123`. A seconda di come il driver lo gestisce, potrebbero non corrispondere.

Non usare l'uguaglianza esatta per i timestamp. Usa query di intervallo, o—meglio—non cercare record per il loro timestamp di creazione. Usa un vincolo di unicità appropriato o una chiave di idempotenza.

## Regole pratiche

**Predefinito a TIMESTAMPTZ.** In caso di dubbio, usa `TIMESTAMPTZ`. Gestisce distribuzioni multi-regione, ora legale e cambiamenti futuri del fuso orario automaticamente. Ha la stessa dimensione di archiviazione di `TIMESTAMP`, quindi non c'è penalità.

**Archivia il contesto separatamente.** Se devi mostrare "Partenza alle 8:00 AM EST" insieme al momento effettivo, archivia sia il `TIMESTAMPTZ` che il `origin_timezone` come colonne separate. Non cercare di codificare tutto in un unico campo.

**Pensa agli intervalli.** Molti requisiti legati al tempo riguardano in realtà la durata, non i momenti. "Da quanto tempo è in sospeso?" "Quando scadrà?" Usa operazioni `INTERVAL`, non conversioni di fuso orario.

**Esegui tutto in UTC.** I tuoi server dovrebbero essere impostati su UTC. Le sessioni del database dovrebbero avere UTC come predefinito. Converti solo nei fusi orari locali quando mostri agli utenti, e solo quando sai quale fuso orario è rilevante.

**Richiedi informazioni sul fuso orario dai client.** Se un client invia `2026-01-15T10:00:00` senza offset, rifiutalo. Richiedi il formato ISO-8601 con `Z` o un offset esplicito come `-05:00`. Non indovinare.

## Imporre Buone Impostazioni Predefinite

Se `TIMESTAMPTZ` è la tua impostazione predefinita (e dovrebbe esserlo), considera di imporla a livello di database. Un trigger che rifiuta colonne `TIMESTAMP WITHOUT TIME ZONE` sembra estremo, ma intercettare "dimenticato di aggiungere TZ" al momento della creazione dello schema è meglio che fare debug sei mesi dopo quando qualcuno aggiunge una nuova tabella e se ne dimentica.

## Cosa Mi Ha Insegnato Quel Biglietto del Treno

Il tempo nei database non è difficile perché i timestamp sono complicati. È difficile perché di solito archiviamo più aspetti in un unico campo, o non pensiamo a cosa stiamo effettivamente cercando di mostrare agli utenti.

Quel biglietto del treno aveva ragione: orario di partenza nel fuso orario di origine, orario di arrivo nel fuso orario di destinazione e durata come cosa separata. Tre diverse informazioni, ciascuna significativa a modo suo.

Il tuo database può fare la stessa cosa. Archivia i momenti assoluti come `TIMESTAMPTZ`. Archivia il contesto di visualizzazione (fusi orari, località) come colonne separate. Usa i tipi `INTERVAL` per le durate. Lascia che Postgres faccia le conversioni quando ne hai bisogno, ma sii esplicito su quale fuso orario è rilevante per quale scopo.

La maggior parte delle volte, ciò significa `TIMESTAMPTZ` e UTC ovunque, con conversioni di fuso orario solo al momento della visualizzazione. Ma quando hai bisogno di orari da orologio da parete o programmi ricorrenti, i tipi `TIMESTAMP` o `TIME` esistono proprio per questo motivo.

La chiave è sapere a quale domanda stai cercando di rispondere: "Quando è successo?" vs. "A che ora devo essere lì?" vs. "Quanto tempo ci vorrà?" Sono tutte domande diverse sul tempo, e spesso richiedono strategie di archiviazione diverse.

Pensa a ciò che i tuoi utenti devono vedere. Poi archivia i dati che ti permettono di mostrare loro esattamente quello.

## Risorse

- [Documentazione sui tipi data/ora di PostgreSQL](https://www.postgresql.org/docs/current/datatype-datetime.html)
- [Buone pratiche per i timestamp in PostgreSQL](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Date.2FTime_storage)
- [Formato data e ora ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
- [Database dei fusi orari (IANA)](https://www.iana.org/time-zones)
- [Gestire i timestamp nei sistemi distribuiti](https://www.postgresql.org/docs/current/functions-datetime.html)
````
