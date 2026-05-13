# Translation Candidate
- Slug: just-add-more-engineers-fallacy
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--just-add-more-engineers-fallacy/it/index.mdx
- Validation: deferred
- Runtime seconds: 10.86
- Input tokens: 8078
- Output tokens: 2998
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.000855
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
draft: true
hidden: true
publish: false
title: La fallacia del “Basta aggiungere più ingegneri”
subTitle: Perché aggiungere risorse a un progetto in ritardo lo rallenta ancora.
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

Questa è la formula che dovrebbe essere tatuata sul braccio di ogni engineering manager. Non è la soluzione al tuo problema di scadenza. È la dimostrazione matematica del perché la tua soluzione non funzionerà.

Sei stato in quella riunione. Quella in cui qualcuno inevitabilmente propone di “semplicemente aggiungere più sviluppatori” per rispettare la scadenza. Il foglio di calcolo lo rende così semplice: 2 ingegneri × 3 mesi = 6 ingegneri‑mese di lavoro, quindi 6 ingegneri dovrebbero finirlo in 1 mese, giusto? Il VP annuisce approvando. Il PM aggiorna la timeline. Tutti si sentono produttivi.

Tranne per il fatto che la matematica non funziona così, e non ha mai funzionato.

## Ciò che Nessuno Ti Dice sui Percorsi di Comunicazione

Quando hai 5 ingegneri in un team, possono parlare tra loro in 10 modi diversi. Aggiungi altri 5 ingegneri e, all’improvviso, ci sono 45 canali di comunicazione diversi da gestire. È la formula al lavoro: n(n-1)/2, dove n è la dimensione del tuo team.

Questo non è un semplice inconveniente. È la differenza tra “ne parleremo a pranzo” e “lasciami fissare un meeting con gli stakeholder”. Non hai solo raddoppiato la capacità del tuo team. Hai più che quadruplicato l’onere di mantenere tutti allineati.

Quando arrivi a 20 persone, gestisci 190 conversazioni potenziali diverse. Il tuo stand‑up non è più un rapido sync. Le decisioni architetturali richiedono la costruzione di consenso. I conflitti di merge diventano scavi archeologici tra visioni concorrenti della stessa funzionalità.

Il team DevDiv di Microsoft ha studiato la questione già nel 2008, e i risultati erano scomodamente chiari: i costi di coordinazione compaiono ovunque. Chi possiede quale modulo? Chi deve partecipare a questa chiamata? Perché questo conflitto di merge è avvenuto tre volte questa settimana? Ogni domanda rappresenta tempo reale che i tuoi ingegneri non spendono sul vero scadenza che stai cercando di rispettare.

Ancora peggio, la ricerca in *Accelerate* di Forsgren, Humble e Kim ha dimostrato che team più piccoli e autonomi superano costantemente quelli più grandi sia in velocità che in qualità. La tassa di coordinazione non è solo reale. È misurabile e costosa.

## L’investimento di tre mesi che non hai tempo di fare

Ma supponiamo che tu sia disposto a pagare quel costo di coordinazione. Hai il budget, l’approvazione per le risorse umane, e sei pronto a buttare risorse su questo problema. Ottimo! Ora devi attendere da tre a sei mesi perché quelle risorse comincino davvero a dare risultati.

I tuoi nuovi ingegneri senior (e stai assumendo persone senior, giusto? Perché gli ingegneri junior avrebbero bisogno di ancora più tempo) trascorrono la prima settimana solo a far funzionare il loro ambiente di sviluppo. Poi devono capire la tua architettura. Non basta “usiamo microservizi”, ma *perché* hai suddiviso i servizi in quel modo. Non basta “usiamo Redis qui”, ma cosa è successo nell’incidente di due anni fa che ti ha spinto a scegliere Redis invece dell’alternativa ovvia.

Durante questo periodo, il tuo team attuale paga la tassa di mentorship. Ogni domanda è legittima e necessaria: “Perché abbiamo strutturato il flusso di autenticazione in questo modo?” “Chi è responsabile del servizio di fatturazione?” “Questo TODO del 2019 è ancora rilevante?” Ognuna di esse distoglie qualcuno dal proprio lavoro. La ricerca di Gloria Mark presso UC Irvine ha rilevato che, in media, occorrono 23 minuti per tornare a un compito dopo un’interruzione. Se i tuoi cinque nuovi ingegneri pongono ciascuno cinque domande al giorno, stai consumando ore di tempo di concentrazione dalle persone che dovrebbero rispettare la scadenza.

Camille Fournier scrive in *The Manager's Path* che ci vogliono 3‑6 mesi perché un ingegnere senior diventi pienamente produttivo in un codebase complesso. Questo vale solo se tutto procede per il meglio. Vale solo se la tua documentazione è aggiornata, la conoscenza tribale è accessibile e il tuo dominio non è particolarmente strano. La maggior parte dei codebase non soddisfa questi criteri.

Il terzo mese è particolarmente pericoloso. I tuoi nuovi ingegneri sono ora sicuri di sé. Stanno scrivendo codice! Sono produttivi! Tranne per il fatto che non conoscono il caso limite strano nel flusso di pagamento, o il modulo legacy da cui ti stai segretamente allontanando, o l’incidente che ha insegnato a tutti perché non si dovrebbe mai, mai rilasciare il venerdì. Parte del loro codice richiederà refactoring. Alcuni potrebbero causare incidenti. Tutto richiede una revisione approfondita da parte delle stesse persone che dovrebbero rispettare la scadenza.

## La scomoda continuità della Legge di Brooks

Fred Brooks ne parlò nel 1975. *The Mythical Man-Month* catturò una verità semplice: “Aggiungere manodopera a un progetto software in ritardo lo rende più in ritardo.” Il libro si basava sulla sua esperienza con il progetto OS/360 di IBM e includeva quella metafora memorabile: una donna può fare un bambino in nove mesi, ma nove donne non possono fare un bambino in un mese.

Cinque decenni dopo, disponiamo di strumenti migliori. Le nostre pipeline CI/CD riducono parte dei costi di integrazione. I moderni workflow di pull request catturano i problemi prima. Uno studio del 2019 su *IEEE Transactions on Software Engineering* ha rilevato che pratiche CI/CD solide possono ridurre i costi di integrazione fino al 40 %. Gli strumenti di comunicazione asincrona ci permettono di coordinare i team tra fusi orari diversi. I microservizi progettati correttamente possono ridurre le dipendenze tra i team.

Ma gli esseri umani non si sono aggiornati. Abbiamo ancora bisogno di contesto. Dobbiamo ancora capire il “perché” delle decisioni, non solo il “cosa”. O(n²) è matematica, non opinione. Si possono ottimizzare i fattori costanti di quell’equazione, ma non si può sfuggire al tasso di crescita fondamentale. L’expertise di dominio richiede comunque tempo per essere costruita, indipendentemente da quanto sia buona la documentazione di onboarding.

La tecnologia cambia. La matematica resta la stessa.

## Amazon lo sapeva già nei primi anni 2000

Jeff Bezos introdusse la regola del “team a due pizze” in Amazon: se un team non può essere sfamato con due pizze, è troppo grande. Il punto ottimale si è stabilito tra 5‑8 persone. Non si trattava di budget per la pizza o di una trovata stravagante. I team più piccoli prendono decisioni più rapidamente perché hanno meno stakeholder. Comunicano più efficientemente perché ci sono meno percorsi. Costruiscono sistemi migliori perché la proprietà è più chiara.

In *Team Topologies*, Matthew Skelton e Manuel Pais citano ricerche che mostrano come i team di 7‑9 persone raggiungano l’equilibrio ottimale tra capacità e coordinazione. Oltre quella soglia, si pagano costi di coordinazione esponenzialmente più alti per rendimenti decrescenti in termini di output. La matematica ti raggiunge, che tu lo riconosca o meno.

## What Actually Works

Allora, cosa fai quando un progetto è davvero in ritardo e la scadenza è davvero importante?

Riduci l’ambito. So che il business non lo gradirà. Ma come scrive Marty Cagan in *Inspired*, “La realtà è che almeno la metà delle nostre idee semplicemente non funzioneranno.” Rilascia l'MVP. Rimanda i nice‑to‑have. Lancia senza il cruscotto delle vanity metrics. Puoi iterare nella v2.

Elimina le riunioni inutili. Semplifica i processi di approvazione. Dai al tuo team tempo di concentrazione realmente non interrotto. Dì no alle nuove richieste di funzionalità. Il Toyota Production System ha un concetto chiamato “rimozione degli sprechi”, e a volte il modo più veloce per andare avanti è smettere di fare cose che ti rallentano.

Imponi timebox in modo spietato e rilascia quello che hai. Quando Facebook è stato lanciato, si chiamava “Thefacebook” e funzionava solo a Harvard. Quando AWS ha lanciato S3, aveva solo una manciata di chiamate API. Come scrive Paul Graham in *Hackers & Painters*, “È meglio far amare davvero a pochi utenti quello che fai, piuttosto che far piacere a molti utenti in modo mediocre.” Rilascia la cosa più semplice che funzioni.

Se devi assolutamente assumere, assumi per il prossimo progetto, non per salvare questo. Accetta il tempo di ramp‑up di 3‑6 mesi. Investi in pair programming e mentorship. Documenta *perché* le decisioni sono state prese, non solo quali sono state. La legge di Brooks ha un corollario: aggiungere persone a un progetto *presto* può aiutare, perché paghi il costo di onboarding prima della pressione della scadenza.

## Perché la fallacia persiste

La fallacia del “basta aggiungere più ingegneri” sopravvive perché sembra un’azione concreta. Dimostra urgenza agli stakeholder. Risulta impressionante su un foglio di calcolo. È emotivamente soddisfacente sul momento.

Ma lo sviluppo software non è lavoro di catena di montaggio. Non stiamo stampando widget dove raddoppiare i lavoratori raddoppia la produzione. Stiamo risolvendo problemi interconnessi dove il contesto conta, la comunicazione conta e il sovraccarico di coordinamento è un costo reale che scala quadraticamente con la dimensione del team.

I numeri sono chiari: cinque persone hanno 10 percorsi di comunicazione, dieci persone ne hanno 45, venti persone ne hanno 190. L’onboarding richiede mesi, non settimane. Il sovraccarico di coordinamento è una tassa che paghi su ogni persona aggiuntiva. Non sono opinioni su cui dibattere in una sala riunioni. Sono realtà misurabili che compaiono nei grafici di velocità, che tu ci creda o no.

La prossima volta che qualcuno suggerirà di aggiungere più ingegneri a un progetto in ritardo, saprai cosa aspettarti. Il progetto non sarà in ritardo di giorni o settimane.

Sarà in ritardo di mesi. E, a differenza della maggior parte dei problemi di ingegneria, non puoi rifattorizzare per uscirne.

---

## Ulteriori letture

**Libri:**
- *The Mythical Man-Month* di Fred Brooks (1975)
- *The Manager's Path* di Camille Fournier (2017)
- *Accelerate* di Nicole Forsgren, Jez Humble e Gene Kim (2018)
- *Team Topologies* di Matthew Skelton e Manuel Pais (2019)
- *Inspired* di Marty Cagan (2017)
- *Hackers & Painters* di Paul Graham (2004)

**Articoli e paper:**
- “The Influence of Organizational Structure on Software Quality” (Microsoft Research, 2008)
- “No Silver Bullet: Essence and Accidents of Software Engineering” di Fred Brooks (1986)
- Ricerca di Gloria Mark su interruzioni e attenzione presso UC Irvine
- Vari articoli della Harvard Business Review su dinamiche di team e produttività

**Approcci moderni:**
- Blog e libro *Staff Engineer* di Will Larson sul leadership tecnologica
- Charity Majors (Honeycomb) su osservabilità e struttura dei team  
- I report *State of DevOps* di DORA
````
