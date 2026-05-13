# Translation Candidate
- Slug: just-add-more-engineers-fallacy
- Locale: it
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-12-29--just-add-more-engineers-fallacy/it/index.mdx
- Validation: deferred
- Runtime seconds: 70.32
- Input tokens: 6541
- Output tokens: 7204
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.002827
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
draft: true
hidden: true
publish: false
title: La fallacia del 'basta aggiungere più ingegneri'
subTitle: >-
  Perché aggiungere persone a un progetto in ritardo lo rende ancora più in
  ritardo.
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

Questa è la formula che dovrebbe essere tatuata sul braccio di ogni engineering manager. Non è la soluzione al tuo problema di scadenze. È la dimostrazione matematica del perché la tua soluzione non funzionerà.

Ci sei stato, in quella riunione. Quella in cui qualcuno inevitabilmente suggerisce di "aggiungere più sviluppatori" per rispettare la deadline. Il foglio di calcolo lo fa sembrare così semplice: 2 ingegneri × 3 mesi = 6 mesi-uomo di lavoro, quindi 6 ingegneri dovrebbero finirlo in 1 mese, giusto? Il VP annuisce con approvazione. Il PM aggiorna la timeline. Tutti si sentono produttivi.

Solo che la matematica non funziona così, e non l'ha mai fatto.

## Quello Che Nessuno Ti Dice sui Percorsi di Comunicazione

Quando hai 5 ingegneri in un team, possono parlarsi in 10 modi diversi. Aggiungi altri 5 ingegneri, e all'improvviso ci sono 45 diversi canali di comunicazione da gestire. È la formula all'opera: n(n-1)/2, dove n è la dimensione del team.

Non è un piccolo inconveniente. È la differenza tra "ne parliamo a pranzo" e "fammi organizzare una riunione con gli stakeholder". Non hai semplicemente raddoppiato la capacità del team. Hai più che quadruplicato il sovraccarico per mantenere tutti allineati.

Quando arrivi a 20 persone, stai gestendo 190 potenziali conversazioni diverse. La tua standup non è più un rapido sync. Le tue decisioni architetturali richiedono consenso. I tuoi merge conflict diventano scavi archeologici attraverso visioni concorrenti della stessa funzionalità.

Il team DevDiv di Microsoft ha studiato questo nel 2008, e i risultati erano scomodamente chiari: i costi di coordinamento si manifestano ovunque. Chi possiede quale modulo? Chi deve essere in questa chiamata? Perché questo merge conflict è successo tre volte questa settimana? Ogni domanda rappresenta tempo reale che i tuoi ingegneri non stanno spendendo sulla deadline che stai cercando di rispettare.

Cosa peggiore, la ricerca in *Accelerate* di Forsgren, Humble e Kim ha mostrato che i team più piccoli e autonomi superano costantemente quelli più grandi sia in velocità che in qualità. La tassa di coordinamento non è solo reale. È misurabile, ed è costosa.

## L'investimento di tre mesi che non hai tempo di fare

Ma supponiamo che tu sia disposto a pagare quel costo di coordinamento. Hai budget, hai approvazione per le assunzioni e sei pronto a gettare risorse sul problema. Ottimo! Ora devi aspettare dai tre ai sei mesi perché quelle risorse siano effettivamente utili.

I tuoi nuovi ingegneri senior (e stai assumendo persone senior, vero? Perché gli ingegneri junior avrebbero bisogno di ancora più tempo) passano la prima settimana solo a configurare il loro ambiente di sviluppo. Poi devono capire la tua architettura. Non solo "usiamo microservizi", ma *perché* hai suddiviso i servizi in quel modo. Non solo "usiamo Redis qui", ma cosa è successo nell'incidente di due anni fa che ti ha fatto scegliere Redis rispetto all'alternativa ovvia.

Durante questo periodo, il tuo team esistente sta pagando la tassa di mentorship. Ogni domanda è legittima e necessaria: "Perché abbiamo strutturato il flusso di autenticazione in questo modo?" "Chi possiede il servizio di fatturazione?" "Questo TODO del 2019 è ancora rilevante?" Ognuna di esse distoglie qualcuno dal proprio lavoro. La ricerca di Gloria Mark all'UC Irvine ha scoperto che in media ci vogliono 23 minuti per tornare a un'attività dopo un'interruzione. Se i tuoi cinque nuovi ingegneri fanno cinque domande al giorno ciascuno, stai bruciando ore di tempo di concentrazione delle persone che dovrebbero rispettare quella scadenza.

Camille Fournier scrive in *The Manager's Path* che ci vogliono dai 3 ai 6 mesi perché un ingegnere senior diventi pienamente produttivo in un codebase complesso. Questo se tutto va bene. Se la tua documentazione è aggiornata, la tua conoscenza tribale è accessibile e il tuo dominio non è particolarmente strano. La maggior parte dei codebase non soddisfa questi criteri.

Il terzo mese è particolarmente pericoloso. I tuoi nuovi ingegneri sono ora fiduciosi. Scrivono codice! Sono produttivi! Tranne che non conoscono lo strano caso limite nel flusso di pagamento, o il modulo legacy che stai segretamente migrando, o l'incidente che ha insegnato a tutti perché non si deploya mai, mai di venerdì. Parte del loro codice avrà bisogno di refactoring. Parte potrebbe causare incidenti. Tutto necessita di una revisione approfondita da parte delle stesse persone che dovrebbero rispettare la scadenza.

## La scomoda continuità della legge di Brooks

Fred Brooks ne scrisse nel 1975. *The Mythical Man-Month* catturò una semplice verità: "Aggiungere personale a un progetto software in ritardo lo rende ancora più in ritardo." Il libro era basato sulla sua esperienza con il progetto IBM OS/360 e includeva quella metafora memorabile: una donna può fare un bambino in nove mesi, ma nove donne non possono fare un bambino in un mese.

Cinque decenni dopo, abbiamo strumenti migliori. Le nostre pipeline CI/CD riducono alcuni costi di integrazione. I moderni flussi di lavoro delle pull request individuano i problemi prima. Uno studio del 2019 su *IEEE Transactions on Software Engineering* ha scoperto che pratiche CI/CD robuste possono ridurre i costi di integrazione fino al 40%. Gli strumenti di comunicazione asincrona ci permettono di coordinarci tra fusi orari. I microservizi progettati correttamente possono ridurre le dipendenze tra team.

Ma gli umani non si sono aggiornati. Abbiamo ancora bisogno di contesto. Dobbiamo ancora capire il perché dietro le decisioni, non solo il cosa. O(n²) è matematica, non opinione. Puoi ottimizzare i fattori costanti in quell'equazione, ma non puoi sfuggire al tasso di crescita fondamentale. La competenza di dominio richiede ancora tempo per essere costruita, non importa quanto sia buona la tua documentazione di onboarding.

La tecnologia cambia. La matematica rimane la stessa.

## Amazon lo sapeva già nei primi anni 2000

Jeff Bezos istituì la regola del "team da due pizze" in Amazon: se un team non può essere sfamato con due pizze, è troppo grande. Il punto ottimale si rivelò essere 5-8 persone. Non si trattava di budget per la pizza o di eccentricità. I team più piccoli prendono decisioni più velocemente perché ci sono meno stakeholder. Comunicano più efficientemente perché ci sono meno percorsi. Costruiscono sistemi migliori perché la proprietà è più chiara.

In *Team Topologies*, Matthew Skelton e Manuel Pais citano ricerche che mostrano come team di 7-9 persone raggiungano l'equilibrio ottimale tra capacità e coordinamento. Oltre quella soglia, si paga esponenzialmente di più in costi di coordinamento per rendimenti decrescenti in termini di output. La matematica ti raggiunge, che tu lo riconosca o no.

## Cosa funziona davvero

Quindi cosa fai quando un progetto è veramente in ritardo e la scadenza è veramente importante?

Riduci l'ambito. So che all'azienda non piacerà. Ma come scrive Marty Cagan in *Inspired*, "La realtà è che almeno la metà delle nostre idee semplicemente non funzioneranno." Rilascia il MVP. Rimanda le cose belle da avere. Lancia senza il cruscotto delle metriche di vanità. Puoi iterare nella v2.

Elimina le riunioni inutili. Semplifica i processi di approvazione. Dai al tuo team tempo di concentrazione ininterrotto. Di' no alle nuove richieste di funzionalità. Il Toyota Production System ha un concetto chiamato "eliminare gli sprechi", e a volte il modo più veloce per andare avanti è smettere di fare cose che ti rallentano.

Fai timebox senza pietà e rilascia ciò che hai. Quando Facebook fu lanciato, si chiamava "Thefacebook" e funzionava solo ad Harvard. Quando AWS lanciò S3, aveva una manciata di chiamate API. Come scrive Paul Graham in *Hackers & Painters*, "È meglio far sì che pochi utenti ti amino davvero piuttosto che molti utenti ti apprezzino a metà." Rilascia la cosa più semplice che funziona.

Se devi assolutamente assumere, assumi per il prossimo progetto, non per salvare questo. Accetta il tempo di inserimento di 3-6 mesi. Investi nel pair programming e nel mentoring. Documenta il *perché* delle decisioni, non solo il cosa. La legge di Brooks ha un corollario: aggiungere persone a un progetto *all'inizio* può aiutare, perché paghi il costo di onboarding prima della stretta della scadenza.

## Perché la Fallacia Persiste

La fallacia del "basta aggiungere più ingegneri" sopravvive perché dà la sensazione di agire. Mostra urgenza agli stakeholder. Sembra impressionante su un foglio di calcolo. È emotivamente appagante nel momento.

Ma lo sviluppo software non è lavoro da catena di montaggio. Non stiamo stampando widget in cui raddoppiare i lavoratori raddoppia la produzione. Risolviamo problemi interconnessi in cui il contesto conta, la comunicazione conta, e il sovraccarico di coordinamento è un costo reale che scala quadraticamente con la dimensione del team.

La matematica è chiara: cinque persone hanno 10 percorsi di comunicazione, dieci persone ne hanno 45, venti persone ne hanno 190. L'onboarding richiede mesi, non settimane. Il sovraccarico di coordinamento è una tassa che paghi per ogni persona aggiuntiva. Non sono opinioni su cui discutere in una sala riunioni. Sono realtà misurabili che appaiono nei tuoi grafici di velocità, che tu ci creda o no.

La prossima volta che qualcuno suggerisce di aggiungere più ingegneri a un progetto in ritardo, saprai cosa aspettarti. Il progetto non sarà in ritardo di giorni o settimane.

Sarà in ritardo di mesi. E a differenza della maggior parte dei problemi di ingegneria, non puoi rifattorizzare per uscirne.

---

## Ulteriori Letture

**Libri:**
- *Il mitico uomo-mese* di Fred Brooks (1975)
- *Il percorso del manager* di Camille Fournier (2017)
- *Accelerate* di Nicole Forsgren, Jez Humble e Gene Kim (2018)
- *Topologie di team* di Matthew Skelton e Manuel Pais (2019)
- *Ispirato* di Marty Cagan (2017)
- *Hacker e pittori* di Paul Graham (2004)

**Articoli e Paper:**
- "L'influenza della struttura organizzativa sulla qualità del software" (Microsoft Research, 2008)
- "Nessun proiettile d'argento: essenza e accidenti dell'ingegneria del software" di Fred Brooks (1986)
- La ricerca di Gloria Mark sull'interruzione e l'attenzione all'UC Irvine
- Vari articoli di Harvard Business Review sulle dinamiche di team e la produttività

**Moderni Riferimenti:**
- Il blog e il libro *Staff Engineer* di Will Larson sulla leadership tecnica
- Charity Majors (Honeycomb) su osservabilità e struttura dei team
- I report State of DevOps di DORA
````
