# Translation Candidate
- Slug: just-add-more-engineers-fallacy
- Locale: it
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2025-12-29--just-add-more-engineers-fallacy/it/index.mdx
- Validation: deferred
- Runtime seconds: 98.36
- Input tokens: 6652
- Output tokens: 22570
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.023568
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
draft: true
hidden: true
publish: false
title: La fallacia del 'aggiungi più ingegneri'
subTitle: >-
  Perché aggiungere personale a un progetto in ritardo lo fa slittare
  ulteriormente.
category: Code
subCategory: Engineering Management
date: '2025-12-29'
modified: '2025-12-29'
tags:
  - engineering-management
  - team-scaling
  - brooks-law
  - productivity
  - software-engineering
---
## n(n-1)/2

È la formula che dovrebbe essere tatuata sul braccio di ogni engineering manager. Non è la soluzione al tuo problema di deadline. È la dimostrazione matematica del perché la tua proposta non funzionerà.

Ci sei già passato da quella riunione. Quella in cui qualcuno suggerisce inevitabilmente di "aggiungere più sviluppatori" per rispettare la deadline. Il foglio di calcolo lo fa sembrare così semplice: 2 ingegneri × 3 mesi = 6 uomo-mesi di lavoro, quindi 6 ingegneri dovrebbero finirlo in 1 mese, giusto? Il VP annuisce con approvazione. Il PM aggiorna la timeline. Tutti si sentono produttivi.

Tranne che la matematica non funziona così, e non l'ha mai fatta.

## Cosa nessuno ti dice sui canali di comunicazione

Quando hai 5 ingegneri in un team, possono parlarsi tra loro in 10 modi diversi. Aggiungi altri 5 ingegneri e, all'improvviso, ci sono 45 canali di comunicazione diversi da gestire. È la formula in azione: n(n-1)/2, dove n è la dimensione del tuo team.

Non si tratta di un piccolo inconveniente. È la differenza tra "ne parliamo a pranzo" e "devo organizzare una riunione con gli stakeholder". Non hai semplicemente raddoppiato la capacità del tuo team. Hai più che quadruplicato l'overhead per mantenere tutti allineati.

Quando arrivi a 20 persone, gestisci 190 conversazioni potenziali diverse. Il tuo standup non è più un rapido sync. Le tue decisioni architetturali richiedono la costruzione del consenso. I tuoi merge conflict diventano scavi archeologici attraverso visioni in competizione della stessa feature.

Il team DevDiv di Microsoft ha studiato questo caso già nel 2008, e i risultati erano scomodamente chiari: i costi di coordinamento si manifestano ovunque. Chi è proprietario di quale modulo? Chi deve partecipare a questa call? Perché questo merge conflict è accaduto tre volte questa settimana? Ogni domanda rappresenta tempo reale che i tuoi ingegneri non stanno spendendo per rispettare la deadline effettiva che stai cercando di raggiungere.

Peggio ancora, la ricerca su *Accelerate* di Forsgren, Humble e Kim ha dimostrato che team più piccoli e più autonomi performano costantemente meglio di quelli più grandi sia in termini di velocità che di qualità. La tassa di coordinamento non è solo reale. È misurabile, ed è costosa.

## L'investimento di tre mesi che non hai tempo di fare

Ma supponiamo di essere disposti a pagare quella tassa di coordinamento. Hai il budget, hai l'approvazione per il headcount e sei pronto a investire risorse in questo problema. Ottimo! Ora devi aspettare da tre a sei mesi prima che quelle risorse inizino effettivamente a dare una mano.

I tuoi nuovi ingegneri senior (e stai assumendo senior, vero? Perché i junior richiederebbero ancora più tempo) passano la prima settimana solo a far funzionare il loro ambiente di sviluppo. Poi devono capire la tua architettura. Non solo "usiamo i microservizi", ma il *perché* hai suddiviso i servizi in quel modo. Non solo "usiamo Redis qui", ma cosa è successo nell'incidente di due anni fa che ti ha portato a scegliere Redis invece dell'alternativa ovvia.

Durante questo periodo, il tuo team esistente sta pagando la tassa di mentorship. Ogni domanda è legittima e necessaria: "Perché abbiamo strutturato il flusso di autenticazione in questo modo?" "Chi è responsabile del servizio di fatturazione?" "Questo TODO del 2019 è ancora rilevante?" Ognuna di queste estrae qualcuno dal suo lavoro. Una ricerca di Gloria Mark all'UC Irvine ha rilevato che ci vogliono in media 23 minuti per tornare a un'attività dopo un'interruzione. Se i tuoi cinque nuovi ingegneri fanno ciascuno cinque domande al giorno, stai bruciando ore di tempo di concentrazione dalle persone che dovrebbero rispettare quella scadenza.

Camille Fournier scrive in *The Manager's Path* che ci vogliono da 3 a 6 mesi perché un ingegnere senior diventi pienamente produttivo in un codebase complesso. Questo vale se tutto va per il verso giusto. Se la tua documentazione è aggiornata, la conoscenza tribale è accessibile e il tuo dominio non è particolarmente strano. La maggior parte dei codebase non soddisfa questi criteri.

Il terzo mese è particolarmente pericoloso. I tuoi nuovi ingegneri sono ora sicuri di sé. Stanno scrivendo codice! Sono produttivi! Tranne per il fatto che non conoscono il caso limite anomalo nel flusso di pagamento, o il modulo legacy che stai migrando in segreto, o l'incidente che ha insegnato a tutti perché non si fa mai il deploy di venerdì. Una parte del loro codice dovrà essere refattorizzata. Qualcun'altra potrebbe causare incidenti. Tutto il necessario richiede una revisione approfondita da parte delle stesse persone che dovrebbero rispettare quella scadenza.

## La scomoda continuità della Legge di Brooks

Fred Brooks ne scrisse nel 1975. *The Mythical Man-Month* catturò una verità semplice: "Aggiungere forza lavoro a un progetto software in ritardo lo rende ancora più in ritardo." Il libro si basava sulla sua esperienza con il progetto OS/360 di IBM e includeva quella metafora memorabile: una donna può partorire un bambino in nove mesi, ma nove donne non possono partorire un bambino in un mese.

Cinque decenni dopo, abbiamo strumenti migliori. I nostri pipeline CI/CD riducono alcuni costi di integrazione. I flussi di lavoro moderni per le pull request individuano i problemi prima. Uno studio del 2019 su *IEEE Transactions on Software Engineering* ha rilevato che pratiche CI/CD solide possono ridurre i costi di integrazione fino al 40%. Gli strumenti di comunicazione asincrona ci permettono di coordinarci attraverso i fusi orari. I microservizi progettati correttamente possono ridurre le dipendenze inter-team.

Ma gli esseri umani non hanno fatto un upgrade. Abbiamo ancora bisogno di contesto. Dobbiamo ancora capire il perché dietro le decisioni, non solo il cosa. O(n²) è matematica, non opinione. Puoi ottimizzare i fattori costanti in quell'equazione, ma non puoi sfuggire al tasso di crescita fondamentale. La competenza nel dominio richiede comunque tempo per essere costruita, non importa quanto sia buona la tua documentazione di onboarding.

La tecnologia cambia. La matematica resta la stessa.

## Amazon lo sapeva già nei primi anni 2000

Jeff Bezos istituì ad Amazon la regola del "team da due pizze": se un team non può essere sfamato con due pizze, è troppo grande. Il range ottimale si è rivelato essere 5-8 persone. Non si trattava di budget per la pizza o di eccentricità. I team più piccoli prendono decisioni più velocemente perché ci sono meno stakeholder. Comunicano in modo più efficiente perché i percorsi di comunicazione sono meno numerosi. Costruiscono sistemi migliori perché la proprietà del codice è più chiara.

In *Team Topologies*, Matthew Skelton e Manuel Pais citano ricerche che mostrano come team di 7-9 persone raggiungano il bilanciamento ottimale tra capacità operativa e coordinamento. Oltre questa soglia, si paga esponenzialmente di più in costi di coordinamento per rendimenti decrescenti in termini di output. La matematica ti raggiunge, che tu lo ammetta o meno.

## Cosa Funziona Davvero

Quindi cosa fai quando un progetto è effettivamente in ritardo e la scadenza è davvero critica?

Riduci lo scope. So che il business non glielo perdonerà. Ma come scrive Marty Cagan in *Inspired*, "La realtà è che almeno la metà delle nostre idee semplicemente non funzionerà." Rilascia la MVP. Rimanda le funzionalità nice-to-have. Lancia senza la dashboard delle metriche di vanità. Puoi iterare nella v2.

Elimina le riunioni superflue. Semplifica i processi di approvazione. Dai al team tempo di focus effettivo e senza interruzioni. Di' di no alle nuove richieste di funzionalità. Il Toyota Production System ha un concetto chiamato "eliminazione degli sprechi", e a volte la via più veloce per andare avanti è smettere di fare cose che ti rallentano.

Applica timebox in modo rigoroso e rilascia quello che hai. Quando Facebook è partito, si chiamava "Thefacebook" e funzionava solo ad Harvard. Quando AWS ha lanciato S3, aveva una manciata di chiamate API. Come scrive Paul Graham in *Hackers & Painters*, "È meglio farsi amare davvero da pochi utenti che essere simpaticamente graditi a molti." Rilascia la soluzione più semplice che funziona.

Se devi assolutamente assumere, assumi per il prossimo progetto, non per salvare questo. Accetta i 3-6 mesi di ramp-up. Investi in pair programming e mentorship. Documenta il *perché* delle decisioni, non solo il *cosa*. Un corollario della Legge di Brooks: aggiungere persone a un progetto *all'inizio* può aiutare, perché paghi il costo di onboarding prima della corsa contro il tempo della scadenza.

## Perché la fallacia persiste

La fallacia del "aggiungi più ingegneri" sopravvive perché dà l'impressione di un'azione concreta. Comunica urgenza agli stakeholder. Sembra impressionante su un foglio di calcolo. È emotivamente soddisfacente nel momento in cui viene proposta.

Ma lo sviluppo software non è lavoro di catena di montaggio. Non stiamo producendo widget in serie dove raddoppiare gli operai raddoppia l'output. Stiamo risolvendo problemi interconnessi in cui il contesto conta, la comunicazione conta, e il sovraccarico di coordinamento è un costo reale che scala quadraticamente con la dimensione del team.

La matematica è chiara: cinque persone hanno 10 percorsi di comunicazione, dieci ne hanno 45, venti ne hanno 190. L'onboarding richiede mesi, non settimane. Il sovraccarico di coordinamento è una tassa che paghi per ogni persona aggiunta. Non sono opinioni su cui si può discutere in una sala riunioni. Sono realtà misurabili che emergono nei tuoi grafici di velocità, che tu ci creda o meno.

La prossima volta che qualcuno suggerisce di aggiungere più ingegneri a un progetto in ritardo, saprai cosa aspettarti. Il progetto non sarà in ritardo di giorni o settimane.

Sarà in ritardo di mesi. E a differenza della maggior parte dei problemi ingegneristici, non puoi fare refactoring per uscirne.

---

## Approfondimenti

**Libri:**
- *The Mythical Man-Month* di Fred Brooks (1975)
- *The Manager's Path* di Camille Fournier (2017)
- *Accelerate* di Nicole Forsgren, Jez Humble e Gene Kim (2018)
- *Team Topologies* di Matthew Skelton e Manuel Pais (2019)
- *Inspired* di Marty Cagan (2017)
- *Hackers & Painters* di Paul Graham (2004)

**Articoli e Pubblicazioni:**
- "The Influence of Organizational Structure on Software Quality" (Microsoft Research, 2008)
- "No Silver Bullet: Essence and Accidents of Software Engineering" di Fred Brooks (1986)
- Gli studi di Gloria Mark su interruzioni e attenzione presso l'UC Irvine
- Diversi articoli di Harvard Business Review su dinamiche di team e produttività

**Approcci moderni:**
- Il blog e il libro *Staff Engineer* di Will Larson sulla leadership tecnica
- Charity Majors (Honeycomb) su osservabilità e struttura dei team  
- I report "State of DevOps" di DORA
````
