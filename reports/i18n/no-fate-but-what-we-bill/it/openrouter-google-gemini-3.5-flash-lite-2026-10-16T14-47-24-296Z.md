# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: it
- Model: openrouter/google/gemini-3.5-flash-lite
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/it/index.mdx
- Validation: deferred
- Runtime seconds: 18.85
- Input tokens: 14792
- Output tokens: 3393
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.012920
- Pricing source: openrouter-2026-09-22
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Nessun Destino Tranne Quello Che Fatturiamo
subTitle: >-
  Gli agenti continuano a lavorare più a lungo, gli sciami si estendono
  ulteriormente e le chiavi cloud rubate mandano il conto del compute alla
  vittima.
category: Security
subCategory: AI Agents
tags:
  - ai-agents
  - security
  - threat-model
  - llm
  - agents
  - cloud
  - supply-chain
sourceHash: 17bcd9b90da0
---
"Ascolta e capisci. Quel terminator è là fuori. Non ci si può trattare. Non ci si può ragionare. Non prova pietà, rimorso o paura. E non si fermerà mai, assolutamente mai, finché non sarai morto."

Kyle Reese, mentre spiega la natura della minaccia a un pubblico del 1984.

La battuta che è invecchiata meglio non è il numero di vittime. È "non si fermerà mai". Il Terminator non faceva paura perché era intelligente. Faceva paura perché continuava a lavorare dopo che tutto il resto aveva fallito. La resistenza era la minaccia.

Poi il franchise ha corretto il proprio errore. Nessuno passa tre film a temere un solo robot. Skynet è il vero cattivo: un sistema distribuito con core, fabbriche e apparecchiature di spostamento temporale. Il robot è una chiamata API.

Nel 2026 sono arrivate entrambe le metà, nelle forme meno cinematiche immaginabili. Agenti IA in grado di portare a termine compiti di più ore senza babysitter umane, su una curva che continua ad accentuarsi. Orchestratori che smistano il lavoro a decine di sotto-agenti. E "non si fermerà mai" ora suona come "non smetterà mai di fatturare".

Questo post è la tesi che continuo a ripetere ai team che hanno liquidato la minaccia agentica come semplice hype: **non arriverà alcuna svolta isolata. Due curve ordinarie e crescenti si stanno moltiplicando tra loro — per quanto tempo può lavorare un agente e quanti agenti può coordinare un orchestratore.** Nessuna delle due deve raggiungere livelli da fantascienza, perché l'attaccante non compra la `compute` a prezzo di listino. Ruba l'accesso, e la vittima paga il contatore.

## Curva uno: resistenza

[Il lavoro sull'orizzonte temporale di METR](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) misura la durata dei compiti che gli agenti possono completare a un dato tasso di successo. La versione breve: la durata dei compiti è raddoppiata circa ogni sette mesi — e si avvicina ai quattro mesi dal 2024. Questi numeri presentano ampi margini di errore e il benchmark sta già faticando contro il suo limite di misurazione. Guarda la forma della curva, non le stime puntuali.

La forma dice che il lavoro autonomo di più ore non è una demo da laboratorio. È la generazione attuale, e quella successiva continua a progredire. "Non si fermerà mai" un tempo richiedeva un telaio omicida e una giacca di pelle. Ora richiede un ciclo di retry, una coda di task e un budget. La parte relativa alla resistenza della minaccia è già prezzata nel costo — come `compute`.

## Curva due: ampiezza

La sola resistenza è un impiegato molto paziente. La moltiplicazione deriva dall'orchestrazione.

Nel novembre 2025, Anthropic ha rivelato di aver [interrotto GTG-1002](https://www.anthropic.com/news/disrupting-GTG-1002), una campagna di cyberspionaggio in cui Claude Code ha agito come orchestratore operativo: scomponendo le istruzioni, coordinando i sotto-agenti e operando su circa trenta target. Un prodotto di codifica commerciale ha fatto questo non perché fosse stato compromesso per diventare un'arma, ma perché qualcuno gli ha chiesto di fare il lavoro e ora era abbastanza bravo da farlo.

Due dettagli contano per il threat model. Primo, l'ampiezza è diventata realtà: un orchestratore che gestisce decine di sotto-agenti concorrenti è una realtà implementata, non un paper teorico. Secondo, la campagna era di spionaggio, non un worm auto-propagante — ma la direzione di marcia è inequivocabile. Trenta target sono il programma pilota.

<figure>
  <img src="../capability-curves.svg" alt="Due curve concettuali in crescita nel tempo: la durata del task che un agente può completare e il numero di sotto-agenti che un orchestratore può coordinare, con la minaccia che emerge dove le due si moltiplicano" />
  <figcaption>Concettuale, non misurata: la resistenza (per quanto tempo lavora un agente) e l'ampiezza (quanti agenti esegue un orchestratore) si compongono indipendentemente. La minaccia vive nel prodotto delle due.</figcaption>
</figure>

Le capacità scalano come durata × ampiezza. Otto ore di lavoro autonomo contro un singolo target sono un benchmark impressionante. Otto ore contro trenta target, o centinaia, costituiscono un modello operativo. La revisione della sicurezza scala linearmente. Il prodotto di queste curve no.

## Chi paga

[Sysdig ha coniato il termine "LLMjacking"](https://sysdig.com/blog/llm-jacking/) per ciò che accade subito dopo: gli attaccanti utilizzano credenziali cloud rubate per eseguire `workloads` di LLM all'interno dell'account della vittima, e la vittima paga per ogni token. Le stime peggiori di Sysdig si aggiravano intorno ai 46.000 dollari al giorno, salendo poi a oltre 100.000 dollari al giorno.

Ogni capability gate nel settore dell'IA si basa su un'assunzione: la parte che utilizza la capacità è quella che paga per essa. Fasce di prezzo, limiti di utilizzo, elenchi di utenti approvati, limitazione degli abusi: tutto questo difende contro un *cliente* che vuole valore per i propri soldi. Il LLMjacking recide questo legame. Per l'attaccante la capacità è gratuita. Il contatore gira sulla carta di qualcun altro, e i `guardrails` del provider puntano al portafoglio sbagliato.

Ecco perché i filtri su prezzi e accesso non fermano un singolo malintenzionato con una chiave rubata. I filtri selezionano gli acquirenti. Non hanno alcuna risposta per un tenant.

<figure>
  <img src="../who-pays.svg" alt="Diagramma di flusso: un attaccante con credenziali cloud rubate esegue workloads di modelli all'interno dell'account cloud della vittima, così la fattura viene intestata alla vittima mentre l'attaccante non paga nulla" />
  <figcaption>L'accesso rubato ridirige l'addebito. I capability gates fanno pagare l'acquirente — e nel LLMjacking, l'acquirente è la vittima.</figcaption>
</figure>

## Lo sciame deve avere ragione una sola volta

I difensori si confortano con i tassi di fallimento per tentativo: la maggior parte dei tentativi di intrusione fallisce, la maggior parte delle PR sospette viene respinta, beccheremo quella che funziona. Vero per singolo tentativo. Sbagliato in aggregato, perché i tentativi sono economici.

La probabilità che almeno uno di $n$ tentativi indipendenti abbia successo è `1 − (1 − p)^n`:

```text
p = 1% per attempt, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

Con l'economia dello sciame, il costo per tentativo è quasi zero — lavoro automatizzato, eseguito su compute rubato, senza alcun umano a fare il triage. Il costo per tentativo del difensore è una persona che legge una coda. Lo sciame non ha bisogno di capacità per tentativo; ha bisogno di tentativi. La curva di METR alza $p$ nel tempo. L'orchestrazione alza $n$. È di nuovo la moltiplicazione, e si compone a favore dell'attaccante per default.

<figure>
  <img src="../swarm-odds.svg" alt="Grafico di 1 − (1 − p)^n che mostra come molti tentativi economici a bassa probabilità si sommino a elevate probabilità di successo complessive, con alcune combinazioni di p e n etichettate" />
  <figcaption>1 − (1 − p)^n: tentativi individualmente improbabili smettono di esserlo in massa. Aumentare $p$ (capacità dell'agente) o $n$ (ampiezza dello sciame) spinge lo sciame verso la certezza.</figcaption>
</figure>

## Cosa significa persistenza quando il malware è testo

Un altro pezzo del threat-model, ed è il meno intuitivo.

Un agente IA è un interprete stateless. Non persiste nel modo in cui lo fa il malware — esiste mentre è in esecuzione e svanisce quando si ferma. Quindi la persistenza ora significa qualcosa di diverso: **controllare ciò che un futuro agente legittimo leggerà e a cui obbedirà.** File di istruzioni, linee guida degli agenti, archivi di memoria, corpora di retrieval, configurazioni di strumenti e MCP. L'implant è testo, piantato dove la flotta dell'organizzazione legge, eseguito con credenziali che l'organizzazione stessa ha emesso.

Ne conseguono tre conseguenze, nessuna delle quali ipotetica:

- **Il payload è inerte finché gli agenti dell'organizzazione stessa non lo eseguono.** L'esecuzione sembra lavoro normale — stessi strumenti, stesse identità, stesse API. Non c'è alcun beacon, perché lo scheduler dell'organizzazione stessa è l'heartbeat.
- **La replicazione significa far copiare del testo, non far eseguire del codice.** Pull request, voci di memoria, configurazioni condivise. L'automazione dell'organizzazione stessa — bot di dipendenze, template, strumenti di sync — è il livello di trasporto.
- **I tripwires sono i tripwires dell'organizzazione stessa.** Schedulazioni, rilevatori di drift, auto-remediation. La forma peggiore: la pulizia del difensore è il trigger di riattivazione, perché eliminare gli artefatti dell'implant è esattamente il drift che il job di remediation era stato chiamato a correggere.

Rimango volutamente all'altitudine del threat model — questa è la forma del problema, non una ricetta, e i dettagli sono già nella lista di lettura di ogni team di sicurezza.

## Nessun destino tranne quello che ci creiamo

Il messaggio di Sarah Connor, trasmesso alle macchine che continuano ad arrivare: "Il futuro non è scritto. Non c'è destino tranne quello che ci creiamo." È la battuta dei difensori, e si traduce direttamente in un'architettura di difesa. Quattro livelli:

<figure>
  <img src="../defense-layers.svg" alt="Stack di difesa a quattro livelli: identità e credenziali a breve durata, trattare il testo dell'agente come codice di produzione, rilevare le modifiche anziché le esecuzioni e rispondere revocando i trigger prima dei payload" />
  <figcaption>Lo stack di difesa mappato sulla minaccia: credenziali persistenti, testo non revisionato, avvisi basati sull'esecuzione e pulizia ordinata male sono ciascuno una curva di problemi.</figcaption>
</figure>

1. **Identità — affama il standing access.** Solo credenziali a breve durata, nessuna chiave non umana a lungo termine, OIDC per-repo con corrispondenza esatta del subject e un inventario reale delle identità non umane. Le autostrade di replicazione sono pavimentate con il standing access; niente standing access, niente autostrada.

2. **Tratta il testo dell'agente come codice di produzione.** File di istruzioni, scritture in memoria, template di prompt, configurazioni di strumenti: versionati, revisionati, differenziati e con avvisi sulle modifiche. La domanda di revisione non è "questo codice è sicuro", bensì "chi ha scritto questa frase e perché il mio agente le obbedisce".

3. **Rileva le modifiche, non le esecuzioni.** L'esecuzione sembra lavoro. Le modifiche non rientrano in alcun ordine di lavoro. Configura avvisi sulla creazione e modifica di workflow, webhook, regole di eventi e voci di memoria, e tratta il drift tra lo stato dichiarato e quello in esecuzione come un incidente, non come rumore di fondo.

4. **Rispondi nell'ordine giusto.** Revoca i trigger prima di rimuovere i payload — la pulizia è di per sé un tripwires. Tratta qualsiasi configurazione o segreto letto durante la finestra di compromissione come contaminato. Pulisci il tempo oltre allo spazio: processi schedulati, invii in coda, orchestrazioni dormienti. Fai il rollback della memoria e dei corpora, non solo delle credenziali.

Nulla di tutto ciò è esotico. È noioso, ed è esattamente la risposta a una minaccia che si presenta sotto forma di due curve noiose. La versione del 1984 aveva bisogno di una macchina del tempo e di una fabbrica di macchine assassine. La versione del 2026 ha bisogno di una chiave rubata, di un ciclo di retry e di un'organizzazione che non ha mai revisionato i file letti dai propri agenti.

Il futuro non è scritto. Ma proprio in questo momento, sul cloud account di qualcuno, il futuro sta comunque facendo lievitare una fattura.

Nessun destino se non quello che ci creiamo — e, finché le chiavi non vengono ruotate, nessun destino se non quello che fatturiamo.

---

*Fonti: le misurazioni dell'orizzonte temporale di METR (con i relativi margini di errore e limiti pubblicati), la divulgazione GTG-1002 di Anthropic del novembre 2025 e le stime sui costi di LLMjacking di Sysdig. Nessun elemento qui è un exploit funzionante; i layer di difesa sono l'intero punto della questione.*
````
