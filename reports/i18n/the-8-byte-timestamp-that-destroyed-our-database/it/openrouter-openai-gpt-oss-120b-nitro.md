# Translation Candidate
- Slug: the-8-byte-timestamp-that-destroyed-our-database
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 10.63
- Input tokens: 10067
- Output tokens: 3024
- Thinking tokens: unknown
- Cached input tokens: 3072
- Cache write tokens: 0
- Estimated cost: $0.000937
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-12-29--the-8-byte-timestamp-that-destroyed-our-database/it/index.mdx reports/i18n/the-8-byte-timestamp-that-destroyed-our-database/it
## Raw Output

````mdx
---
title: Il tuo timestamp è una bugia
subTitle: >-
  Ciò che un biglietto del treno mi ha insegnato sul memorizzare il tempo nei
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
Stavo prenotando un treno da New York a Chicago quando mi è venuto in mente perché i tipi timestamp in Postgres siano così confusi. Il biglietto mostrava:

- Partenza: 8:00 AM EST
- Arrivo: 7:30 PM CST  
- Durata: 11 ore 30 minuti

Tre modi diversi di parlare di tempo, tutti sullo stesso biglietto. E ognuno di essi deve essere memorizzato in modo differente nel database.

## La Domanda Che Nessuno Si Pone Prima

Sia `TIMESTAMP` che `TIMESTAMPTZ` in Postgres occupano esattamente 8 byte con la stessa precisione a microsecondi. Allora perché esistono due tipi?

Perché “che ore sono?” dipende interamente da cosa stai cercando di comunicare.

Quando salgo su quel treno a New York, devo sapere che parte alle 8:00 AM Eastern. È il numero sull’orologio della stazione che devo corrispondere. Quando la mia amica mi viene a prendere a Chicago, ha bisogno di sapere che arrivo alle 7:30 PM Central—è il numero sul *suo* orologio. E se sto cercando di capire se avrò tempo per leggere il mio libro, devo sapere che si tratta di un viaggio di undici ore e mezza.

Stesso treno. Stessa tratta. Tre rappresentazioni del tempo completamente diverse.

## Cosa Fa Davvero TIMESTAMPTZ

Ecco il trucco di `TIMESTAMPTZ`—e non è quello che la maggior parte delle persone pensa. Non memorizza il fuso orario. Il nome è fuorviante.

Ciò che fa è convertire qualsiasi ora gli venga fornita in UTC prima di archiviarla, poi riconvertirla nel fuso orario della tua sessione quando la leggi. La parte “TZ” non riguarda l’archiviazione, ma il **supporto alla conversione**.

Supponiamo che tu stia memorizzando la partenza del treno. Qualcuno a Tokyo interroga il tuo database e vede la partenza in JST. Qualcuno a Londra la vede in GMT. Tutti stanno guardando lo stesso istante assoluto, solo espresso nel fuso orario configurato. Questo è perfetto per registrare eventi: “quando è stato processato questo pagamento?” o “quando è avvenuta questa chiamata API?”.

Ma che dire del biglietto del treno? Non vuoi che l’orario di partenza cambi solo perché qualcuno lo interroga da un fuso orario diverso. Il treno parte alle 8:00 EST, punto. Non è un istante assoluto—è una promessa su quello che l’orologio di Grand Central indicherà.

## Memorizzare Ciò Che Significa Davvero

Per quel viaggio in treno devi conservare cose diverse a seconda dello scopo:

- Gli istanti assoluti (`departs_at` e `arrives_at` come `TIMESTAMPTZ`)
- Il contesto di visualizzazione (`origin_timezone` e `destination_timezone` come text)
- La durata (un `INTERVAL` tra i due istanti)

Ora la tua applicazione può fare quello che fa il biglietto: mostrare “Departs 8:00 AM EST” convertendo l’istante assoluto nel fuso di origine, mostrare “Arrives 7:30 PM CST” convertendo nel fuso di destinazione, e visualizzare “Duration: 11h 30m” direttamente dall’intervallo.

La persona che prenota il biglietto da Tokyo vede gli stessi orari locali in ogni stazione. È proprio quello di cui ha bisogno.

## Perché la tua app di tracciamento voli ha sbagliato

Ti sei mai accorto che alcune app di tracciamento voli mostrano il tuo fuso orario durante il volo? Tipo “Ora corrente: 16:32 GMT” mentre sei sopra l’Atlantico. E chi se ne frega? Non sei a Greenwich, sei a 38 000 piedi da qualche parte sull’oceano.

Quello che ti serve davvero:
- Tempo trascorso dal decollo
- Tempo rimanente alla destinazione  
- Che ora sarà *lì* quando atterri

Nessuna di queste è una conversione di fuso. Le prime due sono **intervalli**—durate, non istanti. L’ultima è una conversione di fuso, ma verso un luogo specifico, non verso “il tuo fuso corrente”.

Visto? Due calcoli di intervallo (`NOW() - actual_departure` e `estimated_arrival - NOW()`), una conversione di fuso verso un luogo specifico (`AT TIME ZONE destination_timezone`). Il tuo fuso corrente non entra in gioco.

## Quando l’orario di parete è ciò di cui hai realmente bisogno

Gli hotel non si preoccupano di momenti assoluti nel tempo. Si preoccupano delle letture dell’orologio nella loro sede.

“Il check‑in è dopo le 15:00” non significa “il check‑in è 15 ore dopo la mezzanotte UTC”. Significa “quando l’orologio nella nostra hall segna le 15:00, puoi fare il check‑in”. Se i tuoi server sono in Virginia ma l’hotel è a Parigi, vuoi comunque che questa regola scatti alle 15:00 *ora di Parigi*.

Il tipo `TIME` (senza data né fuso orario) rappresenta esattamente questo: “una lettura su un orologio”. Accoppialo a un campo di testo per il fuso orario (“Europe/Paris”) e potrai applicare politiche basate sull’orologio locale indipendentemente da dove risiedono i tuoi server. Tuttavia avrai anche bisogno di colonne `TIMESTAMPTZ` per quando gli ospiti effettivamente fanno il check‑in e il check‑out—questi sono momenti assoluti che il backend deve tracciare.

## Il problema del calendario

Ho un promemoria ricorrente impostato per le 9:00: “Rivedi le priorità giornaliere”. Voglio che quel promemoria suoni alle 9:00 *ovunque io sia*. Se viaggio, deve comunque attivarsi alle 9:00 ora locale.

Ma ho anche un evento di calendario: “Standup del team alle 10:00 EST”. Il mio collega a Berlino deve vedere “16:00 CET” per lo stesso evento. Stessa riunione, orari di visualizzazione diversi, perché questo è un momento assoluto a cui tutti partecipiamo.

Due tipi diversi di eventi, due strategie di memorizzazione differenti. La riunione utilizza un `TIMESTAMPTZ`. Il promemoria utilizza un `TIME` più l’impostazione del fuso orario corrente. Evita di forzare entrambi nello stesso campo.

## Le cose che si rompono in produzione

Anche con i tipi corretti, la precisione può farti inciampare. Postgres memorizza i microsecondi: `10:00:00.123456`. L’oggetto `Date` di JavaScript usa i millisecondi: `10:00:00.123`.

Quindi questa query potrebbe restituire misteriosamente nessuna riga:

```sql
SELECT * FROM orders WHERE created_at = '2026-01-15 10:00:00.123';
```

Il database contiene `10:00:00.123456` e il tuo codice passa `10:00:00.123`. A seconda di come il driver lo gestisce, i valori potrebbero non corrispondere.

Non usare l’uguaglianza esatta per i timestamp. Usa query di intervallo, o — meglio ancora — non cercare i record in base al loro timestamp di creazione. Utilizza un vincolo di unicità appropriato o una chiave di idempotenza.

## Regole pratiche

**Usa TIMESTAMPTZ per impostazione predefinita.** In caso di dubbio, utilizza `TIMESTAMPTZ`. Gestisce automaticamente distribuzioni multi‑regione, il passaggio all’ora legale e futuri cambi di fuso orario. Occupando lo stesso spazio di archiviazione di `TIMESTAMP`, non comporta alcuna penalità.

**Memorizza il contesto separatamente.** Se devi mostrare “Partenza 08:00 EST” insieme al momento reale, salva sia il `TIMESTAMPTZ` sia il `origin_timezone` in colonne distinte. Non cercare di codificare tutto in un unico campo.

**Pensa agli intervalli.** Molti requisiti legati al tempo riguardano in realtà durate, non istanti. “Da quanto tempo è in attesa?” “Quando scadrà?” Usa le operazioni `INTERVAL`, non le conversioni di fuso orario.

**Esegui tutto in UTC.** I tuoi server devono essere configurati su UTC. Le sessioni del database devono avere UTC come valore predefinito. Converti al fuso locale solo al momento della visualizzazione per gli utenti, e solo quando sai quale fuso è rilevante.

**Richiedi informazioni sul fuso orario ai client.** Se un client invia `2026-01-15T10:00:00` senza offset, rifiutalo. Richiedi il formato ISO‑8601 con `Z` o con un offset esplicito, ad esempio `-05:00`. Non fare supposizioni.

## Applicare Buone Impostazioni Predefinite

Se `TIMESTAMPTZ` è il tuo valore predefinito (e dovrebbe esserlo), considera di imporlo a livello di database. Un trigger che rifiuta colonne `TIMESTAMP WITHOUT TIME ZONE` può sembrare estremo, ma intercettare il “ho dimenticato il fuso” al momento della creazione dello schema è molto meglio che doverlo debug‑gare sei mesi dopo, quando qualcuno aggiunge una nuova tabella e dimentica il fuso.

## Ciò Che Mi Ha Insegnato Il Biglietto del Treno

Il tempo nei database non è difficile perché i timestamp sono complicati. È difficile perché di solito memorizziamo più preoccupazioni in un unico campo, o perché non pensiamo a cosa stiamo realmente cercando di mostrare agli utenti.

Quel biglietto del treno aveva ragione: orario di partenza nel fuso di origine, orario di arrivo nel fuso di destinazione e durata come elemento completamente separato. Tre pezzi di informazione diversi, ognuno significativo a modo suo.

Il tuo database può fare lo stesso. Memorizza i momenti assoluti come `TIMESTAMPTZ`. Memorizza il contesto di visualizzazione (fusi orari, località) in colonne separate. Usa i tipi `INTERVAL` per le durate. Lascia che Postgres esegua le conversioni quando ne hai bisogno, ma sii esplicito su quale fuso orario conta per quale scopo.

La maggior parte delle volte, questo significa usare `TIMESTAMPTZ` e UTC ovunque, con le conversioni di fuso orario effettuate solo al momento della visualizzazione. Quando, invece, servono orari di muro o pianificazioni ricorrenti, esistono i tipi `TIMESTAMP` o `TIME` proprio per questo scopo.

La chiave è capire quale domanda si sta cercando di rispondere: “Quando è successo questo?” vs. “A che ora devo essere lì?” vs. “Quanto tempo ci vorrà?”. Sono tutte domande diverse sul tempo e spesso richiedono strategie di memorizzazione differenti.

Pensa a cosa i tuoi utenti hanno bisogno di vedere. Poi memorizza i dati che ti consentono di mostrargli esattamente quello.

## Risorse

- [PostgreSQL Date/Time Types Documentation](https://www.postgresql.org/docs/current/datatype-datetime.html)
- [PostgreSQL Timestamp Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This#Date.2FTime_storage)
- [ISO 8601 Date and Time Format](https://en.wikipedia.org/wiki/ISO_8601)
- [Time Zone Database (IANA)](https://www.iana.org/time-zones)
- [Dealing with Timestamps in Distributed Systems](https://www.postgresql.org/docs/current/functions-datetime.html)
````
