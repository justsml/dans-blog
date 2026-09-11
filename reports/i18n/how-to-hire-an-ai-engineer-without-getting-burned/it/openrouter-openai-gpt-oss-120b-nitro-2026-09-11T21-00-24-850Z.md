# Translation Candidate
- Slug: how-to-hire-an-ai-engineer-without-getting-burned
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-09-09--how-to-hire-an-ai-engineer-without-getting-burned/it/index.mdx
- Validation: deferred
- Runtime seconds: 6.35
- Input tokens: 9783
- Output tokens: 4325
- Thinking tokens: unknown
- Cached input tokens: 3456
- Cache write tokens: 0
- Estimated cost: $0.001160
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Come assumere un ingegnere AI senza rischiare
subTitle: Assumi per il giudizio che continua a emergere
modified: '2026-09-11'
tags:
  - ai
  - hiring
  - leadership
  - engineering-management
  - evals
  - production
  - security
  - agents
category: Leadership
subCategory: Hiring
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
cover_alt: >-
  Un ponte in acciaio in miniatura che sostiene tre pesi arancioni, con una
  sonda di misura sotto la campata.
related:
  - llm-evals-are-broken
  - dont-fear-the-model-router
  - evidence-is-the-product
---
La demo funziona. Il curriculum è impressionante. Tutti lasciano il colloquio entusiasti.

Poi qualcuno chiede cosa succede se il sistema emette lo stesso rimborso due volte.

Il silenzio è una risposta costosa.

Assumere un esperto di IA è difficile perché la parte visibile del lavoro termina presto. Una finestra di chat che risponde in paragrafi fluidi sembra completa. Nulla di ciò indica se il sistema rispetta i permessi, sopravvive a un timeout o costa più per ticket rispetto all'umano che doveva assistere.

Non serve vincere una discussione sui “attention heads”. Serve abbastanza evidenza per decidere chi può prendere quelle decisioni per te.

<blockquote class="breakout">
  <p>Assumi per il giudizio dietro la demo. Rendi quel giudizio osservabile prima di fare l’offerta.</p>
</blockquote>

Ecco il processo che userei per un ingegnere che porta l’IA in un prodotto: scrivi l’obiettivo, apri un pezzo di lavoro reale, paga per una breve sessione operativa e valuta ciò che hai effettivamente visto. I ruoli di ricerca e infrastruttura richiedono esercizi diversi. Inizia dal lavoro.

## Scrivi il ruolo prima di acquistare il curriculum

“Ci serve un ingegnere IA” è utile quanto “ci serve qualcuno bravo con i soldi”. Contabile? CFO? La persona che dice al fondatore di smettere di comprare domini?

Scegli il problema di cui vuoi che la persona si occupi.

| Il lavoro di cui hai bisogno | Evidenza da cercare |
| --- | --- |
| Ricerca o sviluppo di modelli | Esperimenti, baseline, scelte dei dati e una descrizione onesta di ciò che non ha funzionato |
| Ingegneria di applicazioni IA | Un flusso di lavoro utile, integrazioni, valutazione e gestione dei fallimenti |
| Infrastruttura IA | Distribuzione, capacità, monitoraggio, controllo dei costi e recupero sotto carico |
| Valutazione e qualità | Casi di test rappresentativi, metriche difendibili e diagnosi di regressioni |
| Ingegneria di prodotto IA | Ricerca utenti, progettazione del flusso, adozione e prova che la funzionalità ha migliorato il lavoro |

Una persona può coprire più righe. Pretendere la stessa profondità in tutti e cinque è il modo in cui una descrizione del lavoro si trasforma in una lista dei desideri con uno stipendio allegato.

Scrivi l’obiettivo dei primi 90 giorni prima di aprire le interviste. Per esempio:

> Verificare se un assistente di redazione del supporto riduce i tempi di gestione senza aumentare gli errori di policy. Consegnare un pilota misurato, un percorso di revisione umana e una raccomandazione per espandere, rivedere o interrompere.

Questo fornisce al candidato qualcosa su cui spingere, ed è proprio lo scopo. Un candidato forte chiederà come viene misurato il tempo di gestione, chi è responsabile della policy e se qualcuno ha verificato la qualità delle risposte umane attuali. Un candidato debole dirà che sembra entusiasmante.

Se nessuno nel tuo team può giudicare le prove tecniche, porta un professionista esterno per la valutazione — e chiedi se spera di venderti l’implementazione in seguito. Altrimenti il candidato finisce per fungere da proprio riferimento tecnico, creando un conflitto di interessi con una postura migliore.

## Chiedi loro di aprire il cofano

Una nota aziendale ti dice dove qualcuno ha lavorato. Una demo ti mostra che qualcosa ha funzionato una volta, su un laptop, di buon umore. Nessuna delle due ti dice cosa quella persona può gestire nel tuo team.

Chiedi un progetto di cui possa parlare in modo completo:

**"Fammi vedere qualcosa che hai effettivamente rilasciato. Cosa hai posseduto, cosa è andato in errore e cosa è cambiato grazie alle evidenze?"**

Poi segui una decisione lungo l’intero arco. Qual è stato il primo approccio? Cosa hanno misurato? Quale alternativa hanno scartato e perché? Cosa ha contribuito un collega? Cosa farebbero diversamente ora?

Richiedi un artefatto: un trace sanificato da un run fallito, un report di valutazione, un documento di design, un test, una breve walkthrough del codice. Un trace è semplicemente il registro di ciò che il sistema ha fatto sul percorso verso la risposta — ogni chiamata a uno strumento, ogni retry, ogni “swallow” silenzioso. È la differenza tra leggere un saggio e vedere il lavoro.

<p class="inset">
Un candidato che rifiuta di consegnare i dati dei clienti di un ex datore di lavoro sta superando il test, non fallendolo.
</p>

Usa invece un esempio ricostruito, o l’esercizio condiviso qui sotto. “Mostrami le evidenze” non deve mai diventare “portaci i segreti di qualcun altro”.

Per una assunzione a livello di carriera iniziale, le evidenze sono più piccole ed è accettabile. Scala la portata e la supervisione attese al ruolo. Stai testando comprensione e ownership, non l’accesso a loghi famosi.

## Cinque domande che valgono il tempo dell’intervista

Sono spunti per l’indagine, non curiosità. Se basta memorizzare la risposta per superare, la domanda non serve a nulla.

### 1. "Come capiresti se questo agente è migliorato?"

Ascolta una definizione di successo nel linguaggio del lavoro: ticket risolti correttamente, bozze che un agente invia realmente, escalation evitate. Poi chiedi quali fallimenti un punteggio medio nasconderebbe e contro cosa confronterebbero la nuova versione.

Una buona risposta rende la misurazione ispezionabile. Chiedi di abbozzare tre casi di test sul posto e di indicare chi decide se ciascuno è superato. Se un modello valuta le risposte, chiedi come controllano il valutatore. ["Ha ottenuto il 94 %" non è una misurazione se lo stesso run ottiene l'82 % il martedì.](/auto-tune-your-llm-judge)

La [guida di Anthropic alle valutazioni degli agenti](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) traccia la distinzione che dovrebbe comparire nella tua intervista: il registro di ciò che un agente ha fatto non è lo stesso del risultato. Un agente che dichiara “Ho emesso il rimborso” è una frase, non un rimborso.

### 2. "Lo strumento è scaduto dopo aver inviato un rimborso. E ora?"

“Retry” è il riflesso sbagliato. Il denaro potrebbe essere già sparito.

Ascolta la verifica dello stato della transazione prima di agire, una chiave di idempotenza affinché il secondo tentativo si sovrapponga al primo, e un percorso di escalation per quando lo stato è realmente incerto. Chiedi chi vede il fallimento e come il lavoro riprende dopo. Il vocabolario è meno importante del fatto che il loro design possa addebitare due volte un cliente per un unico errore.

### 3. "Cosa può leggere, modificare e spendere questo sistema?"

Chiedi il confine: quali record può leggere, quali azioni può eseguire, dove è necessario l’intervento umano e cosa impedisce a un ciclo di girare tutta la notte sulla tua carta di credito.

Poi chiedi dove quel confine viene applicato. Un prompt che dice al modello di stare attento è un firewall fatto di testo di policy — l’intento è lì, l’applicazione no. Fagli disegnare il confine e proporre un test che tenti di oltrepassarlo.

Includi l’esposizione dei dati mentre sei lì: cosa lascia al fornitore del modello, cosa viene scritto nei log e chi può leggerli. “Logghiamo tutto” è una conversazione di conformità pronta a scoppiare.

### 4. “Quale parte costruiresti senza un LLM?”

Un ingegnere capace può togliere l’AI da parte della propria proposta. Regole di ammissibilità, operazioni aritmetiche e controlli di permesso hanno implementazioni noiose che non allucinano. L’interpretazione di ciò che un cliente frustrato intendeva sì.

Chiedi cosa ti porta il modello in questo specifico flusso di lavoro e quale evidenza giustificherebbe la superficie di errore aggiuntiva. Se ogni blocco del diagramma richiede un agente, chiedi un diagramma più piccolo.

### 5. “Parlami di un approccio che hai abbandonato.”

Ascolta l’osservazione che ha cambiato la loro decisione. Gli utenti volevano la ricerca, non la chat. Il modello più costoso ha ridotto il costo totale di gestione. La funzionalità non valeva la spedizione e loro lo hanno detto.

Un risultato negativo sincero supera una storia di successo lucidata, perché una storia di successo raramente rivela una regola decisionale. Chiedi cosa hanno smesso di fare e quanto tempo ci è voluto per smettere.

## Pagare per una piccola sessione operativa

Usa un esercizio limitato e retribuito su dati sintetici. Invia in anticipo il brief e i criteri di valutazione — stai assumendo per il giudizio, non per la capacità di essere colto di sorpresa. Lascia che le persone usino gli strumenti che impiegherebbero sul lavoro, AI inclusa, e poi chiedi loro di spiegare e verificare ciò che è emerso.

Una sessione illustrativa di 90 minuti per un ingegnere di applicazione:

> Eredi un assistente di supporto che redige risposte e propone rimborsi. Ecco dodici ticket sintetici, un breve documento di policy e quattro esecuzioni registrate. Una risposta cita una policy che abbiamo ritirato a marzo. Una richiesta di rimborso va in timeout. Un ticket chiede informazioni su un altro cliente. Consiglia se espandere il pilota e mostraci un piccolo miglioramento o test.

Quindici minuti per chiarire l’obiettivo, quarantacinque per approfondire, trenta per spiegare la raccomandazione. Fornisci loro un ambiente preparato così l’esercizio non diventa segretamente un test di `npm install`. Accomoda le necessità di accesso e mantieni condizioni equivalenti per tutti i candidati.

Stai osservando quali domande pongono, quali evidenze aprono e a quale rischio ricorrono per primi. Notano che dodici ticket non possono stabilire affidabilità? Possono rilasciare una correzione ristretta senza affermare che il sistema ora è a posto? Possono dire cosa dovrebbe succedere la prossima settimana?

Il candidato che aggiunge un test fallito per il rimborso duplicato potrebbe averti detto più di chi ha rilasciato una splendida interfaccia di chat.

Usa le stesse domande chiave e gli stessi criteri di valutazione per tutti nel ruolo — questa è la struttura di base della [guida alle interviste strutturate](https://www.opm.gov/policy-data-oversight/assessment-and-selection/structured-interviews/) dell’Ufficio per la Gestione del Personale degli Stati Uniti, e serve affinché il tuo panel confronti i candidati invece di basarsi su vibrazioni. Mantieni l’esercizio vicino al lavoro reale. Il confine tra un campione di lavoro e una consulenza gratuita è più sottile di quanto pensino molti responsabili delle assunzioni, e i candidati lo percepiscono da lontano.

## La scheda di valutazione delle assunzioni

Copia questo nel documento dell’intervista. Concorda sul livello richiesto per ogni dimensione **prima** di incontrare chiunque, perché la soglia cambia una volta che ti piace qualcuno. Ogni intervistatore assegna un punteggio in modo indipendente prima del debrief e allega un’osservazione concreta a ogni valutazione.

Usa **1 = non supportato o materialmente difettoso**, **2 = funzionante con notevole guida**, **3 = solido entro l’ambito del ruolo**, **4 = giudizio corretto più verifica dimostrata**. Usa **N/O = non osservato** quando l’intervista non ha prodotto evidenze. N/O è una lacuna da colmare, non uno zero da mediare.

| Dimensione | Evidenza che merita un 3 | Punteggio / evidenza osservata |
| --- | --- | --- |
| Giudizio tecnico | Sceglie un design proporzionato e spiega un’alternativa scartata | ___ / ___ |
| Giudizio di prodotto | Definisce un risultato utente, una baseline e una ragione per fermarsi | ___ / ___ |
| Valutazione | Propone casi rappresentativi e verifica gli esiti, non solo risposte fluide | ___ / ___ |
| Disciplina di produzione | Gestisce guasti parziali, recupero, monitoraggio, costi e latenza | ___ / ___ |
| Sicurezza | Identifica dati sensibili e spiega limiti di accesso e spesa applicabili | ___ / ___ |
| Comunicazione | Espone l’incertezza in modo chiaro e ne descrive la conseguenza al decisore | ___ / ___ |
| Proprietà | Distingue il proprio lavoro da quello del team e segue i guasti fino alla risoluzione | ___ / ___ |

Questo è uno strumento decisionale, non un predittore validato delle prestazioni lavorative. Calibralo al tuo ruolo e confrontalo con ciò che accade realmente dopo l’assunzione — altrimenti stai sintonizzando un giudice che non hai mai valutato.

Per chi dovrà gestire da solo la produzione, voglio evidenze solide in ogni dimensione essenziale. Un punteggio totale alto non deve mai coprire una debolezza irrisolta in permessi o recupero; sono queste le due che ti costeranno più tardi. Per un ingegnere in fase di sviluppo, annota il supporto di cui avrà bisogno e il nome della persona che lo fornirà.

Chiudi il debrief con tre frasi: **Cosa può possedere questa persona? Di che supporto avrà bisogno? Di cosa siamo ancora incerti?** Un panel che non riesce a rispondere a queste domande è destinato a una conversazione di quarant’ minuti sulla presenza esecutiva.

## I segnali di allarme meritano un’ulteriore domanda

Fai attenzione quando un candidato non riesce a separare il proprio contributo da quello del team, tratta ogni progetto passato come un successo ininterrotto, o risponde a domande di misurazione con aggettivi. “Altamente accurato” richiede un denominatore.

Altri segnali di fumo: agenti inseriti nel design prima di comprendere il problema; costo operativo senza limite; recupero da guasti affidato a un altro team; sicurezza che vive interamente nel prompt.

Prova una volta con uno scenario concreto prima di trarre conclusioni. Un termine sconosciuto non è un concetto mancante, e molti ingegneri validi hanno appreso le idee con nomi diversi. Riconosci chi individua il proprio errore durante la risposta. Rifiutarsi di aggiornare dopo aver visto evidenze contraddittorie è il passo che squalifica — aver bisogno di un momento di riflessione silenziosa non lo è.

## Già preoccupato per l’assunzione? Audita il lavoro prima

Un progetto AI in difficoltà non dimostra che hai assunto l’ingegnere sbagliato. Il brief potrebbe essere stato impossibile, i dati inutilizzabili, o la leadership potrebbe aver promesso piena autonomia in una keynote prima che qualcuno misurasse la qualità.

Prima di commissionare una riscrittura, conserva il codice, la configurazione, i risultati di valutazione e i log pertinenti sotto controlli di accesso adeguati. Poi stabilisci quali account, servizi e chiavi API l’azienda controlla realmente — è qui che i team scoprono che l’intera pipeline gira sull’account di fatturazione personale di una sola persona.

Ottieni una lettura indipendente su alcuni workflow rappresentativi. Cosa funziona? Cosa fallisce? Quali affermazioni si riproducono? Limita le azioni rischiose mentre il comportamento incerto è sotto indagine, e classifica il lavoro in conserva, ripara e sostituisci.

Chiedi un breve piano di recupero con test di accettazione, proprietari nominati e una data decisionale. “Abbiamo bisogno di un nuovo framework” è una proposta da esaminare, non una diagnosi.

## Concedi all’assunzione il permesso di deludere la roadmap

Nulla di questo funziona se la tua azienda punisce il giudizio che ha appena trascorso sei settimane a selezionare.

L’ingegnere che dice “l’approvazione umana rimane su questo step” o “il pilota non giustifica ancora l’espansione” ha bisogno di un leader che possa ascoltarlo davanti agli altri. Assumi basandoti sulle evidenze e poi seppellisci i risultati scomodi, e avrai costruito una macchina costosa per produrre le risposte che già volevi.

Quindi, per il prossimo ruolo AI: definisci il risultato, usa la scheda di valutazione e osserva il candidato scavare in qualcosa di imperfetto.

Vuoi la persona che possa dimostrarti perché il sistema è pronto — e che ti dirà, ad alta voce, il giorno in cui non lo è.
````
