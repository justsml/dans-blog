# Translation Candidate
- Slug: just-add-more-engineers-fallacy
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--just-add-more-engineers-fallacy/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 90.02
- Input tokens: 8248
- Output tokens: 7801
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002532
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-12-29--just-add-more-engineers-fallacy/it/index.mdx reports/i18n/just-add-more-engineers-fallacy/it
## Raw Output

````mdx
---
draft: true
hidden: true
publish: false
title: La fallacia di "aggiungi semplicemente più ingegneri"
subTitle: Perché aggiungere risorse a un progetto in ritardo lo ritarda ulteriormente.
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

Questa è la formula che dovrebbe essere tatuata sul braccio di ogni manager ingegneristico. Non è la soluzione al tuo problema di scadenza. È la prova matematica del motivo per cui la tua soluzione non funzionerà.

Hai partecipato a quella riunione. Quella in cui qualcuno suggerisce inevitabilmente di "aggiungere semplicemente più sviluppatori" per rispettare la scadenza. Il foglio di calcolo lo rende sembrare così semplice: 2 ingegneri × 3 mesi = 6 ingegneri-mese di lavoro, quindi 6 ingegneri dovrebbero completarlo in 1 mese, giusto? Il VP annuisce approvando. Il PM aggiorna la tabella di marcia. Tutti si sentono produttivi.

Tranne che i conti non funzionano così, e non lo hanno mai fatto.

## Cose che nessuno ti dice sui canali di comunicazione

Quando hai 5 ingegneri in un team, possono parlarsi in 10 modi diversi. Aggiungi 5 ingegneri in più e, all'improvviso, ci sono 45 canali di comunicazione diversi da gestire. Questa è la formula in azione: n(n-1)/2, dove n è la dimensione del tuo team.

Questo non è un semplice fastidio. È la differenza tra "ne parleremo a pranzo" e "devo organizzare una riunione con gli stakeholder". Non hai semplicemente raddoppiato la capacità del tuo team. Hai moltiplicato per più di quattro volte l'overhead necessario per mantenere allineati tutti.

Quando arrivi a 20 persone, stai gestendo 190 potenziali conversazioni diverse. La tua standup non è più una rapida sincronizzazione. Le decisioni architetturali richiedono costruzione del consenso. I conflitti di merge diventano scavi archeologici per decifrare visioni competitive dello stesso feature.

Il team DevDiv di Microsoft ha studiato questo aspetto già nel 2008, e le conclusioni erano chiaramente imbarazzanti: i costi di coordinamento emergono ovunque. Chi possiede questo modulo? Chi deve partecipare a questa chiamata? Perché questo conflitto di merge è accaduto tre volte questa settimana? Ogni domanda rappresenta tempo reale che i tuoi ingegneri non stanno spendendo per il deadline che stai cercando di raggiungere.

Peggio ancora, la ricerca in *Accelerate* di Forsgren, Humble e Kim ha mostrato che team più piccoli e autonomi superano sistematicamente i team più grandi sia in velocità che in qualità. La tassa di coordinamento non è solo reale. È misurabile, ed è cara.

## L'Investimento di Tre Mesi che Non Hai Tempo di Gestire

Ma supponiamo che tu sia disposto a pagare quel costo di coordinamento. Hai il budget, hai l'approvazione per nuove risorse, e sei pronto a gettare risorse su questo problema. Ottimo! Ora devi aspettare da tre a sei mesi prima che queste risorse inizino davvero ad aiutarti.

I tuoi nuovi ingegneri senior (e stai assumendo persone senior, giusto? Perché gli ingegneri junior avrebbero bisogno di ancora più tempo) passeranno la prima settimana a ottenere funzionante l'ambiente di sviluppo. Poi dovranno comprendere la tua architettura. Non solo "usiamo i microservizi", ma *perché* hai suddiviso i servizi in quel modo. Non solo "usiamo Redis qui", ma cosa è accaduto nell'incidente di due anni fa che ti ha portato a scegliere Redis rispetto all'alternativa ovvia.

Durante questo periodo, il tuo team esistente paga l'assegno di mentoring. Ogni domanda è legittima e necessaria: "Perché abbiamo strutturato il flusso di autenticazione in questo modo?" "Chi possiede il servizio di fatturazione?" "Questo TODO del 2019 è ancora rilevante?" Ogni una di queste distoglie qualcuno dal lavoro. La ricerca di Gloria Mark all'Università della California a Irvine ha scoperto che ci vogliono in media 23 minuti per tornare a un compito dopo un'interruzione. Se i tuoi cinque nuovi ingegneri fanno ciascuno cinque domande al giorno, stai bruciando ore di concentrazione delle persone che dovrebbero raggiungere la scadenza.

Camille Fournier scrive in *The Manager's Path* che a un ingegnere senior ci vogliono 3-6 mesi per diventare pienamente produttivo in un codice complesso. Questo se va tutto bene. Questo se la tua documentazione è aggiornata, la conoscenza tribale è accessibile e il tuo dominio non è particolarmente strano. La maggior parte dei codici non rispetta questi criteri.

Il terzo mese è particolarmente pericoloso. I nuovi ingegneri sono ora confidenti. Scrivono codice! Sono produttivi! Tranne che non sanno dell'edge case strano nel flusso di pagamento, del modulo legacy che stai migrando in segreto o dell'incidente che ha insegnato a tutti perché non deployiamo mai il venerdì. Parte del loro codice dovrà essere rifattorizzato. Alcuni potrebbero causare incidenti. Tutto richiede una revisione accurata da parte delle stesse persone che dovrebbero rispettare la scadenza.

## La scomoda continuità della Legge di Brooks

Fred Brooks scrisse di questo nel 1975. *The Mythical Man-Month* ha catturato una verità semplice: "Aggiungere manodopera a un progetto software in ritardo lo rende ancora più in ritardo." Il libro era basato sulla sua esperienza con il progetto IBM OS/360, e includeva quell'immagine memorabile: una donna può fare un bambino in nove mesi, ma nove donne non possono fare un bambino in un mese.

Cinquant'anni dopo, abbiamo strumenti migliori. Le nostre pipeline CI/CD riducono alcuni costi di integrazione. I flussi di lavoro moderni per le richieste di pull individuano problemi prima. Uno studio del 2019 su *IEEE Transactions on Software Engineering* ha scoperto che pratiche solide di CI/CD possono ridurre i costi di integrazione fino al 40%. Gli strumenti di comunicazione asincroni ci permettono di coordinarci attraverso fusi orari. I microservizi progettati correttamente riducono le dipendenze tra team.

Ma gli umani non si sono aggiornati. Ancora abbiamo bisogno di contesto. Dobbiamo ancora capire il motivo delle decisioni, non solo il che. O(n²) è matematica, non opinione. Puoi ottimizzare i fattori costanti in quell'equazione, ma non puoi sfuggire al tasso di crescita fondamentale. L'esperienza nel dominio richiede comunque tempo per svilupparsi, non importa quanto buona sia la tua documentazione di onboarding.

La tecnologia cambia. La matematica rimane la stessa.

## Amazon lo sapeva già all'inizio del 2000

Jeff Bezos ha istituito la regola del "team a due pizze" ad Amazon: se un team non può essere servito con due pizze, è troppo grande. Il numero ideale si è rivelato essere 5-8 persone. Non si trattava di budget per le pizze né di essere stravaganti. I team più piccoli prendono decisioni più velocemente perché ci sono meno stakeholder. Comunicano più efficientemente perché ci sono meno percorsi. Costruiscono sistemi migliori perché la proprietà è più chiara.

In *Team Topologies*, Matthew Skelton e Manuel Pais citano ricerche che mostrano che team di 7-9 persone raggiungono l'equilibrio ottimale tra capacità e coordinamento. Oltre quel limite, paghi costi di coordinamento esponenzialmente più alti per ritorni sempre più ridotti. La matematica ti raggiunge comunque, che la riconosca o meno.

## Cosa funziona davvero  

Quindi, cosa fai quando un progetto è effettivamente in ritardo e la scadenza è davvero importante?  

Riduci l'ambito. So che il business non lo apprezzerà. Ma come scrive Marty Cagan in *Inspired*, «La realtà è che almeno la metà delle nostre idee semplicemente non funzionerà». Lancia il prodotto minimo vitale (MVP). Posticipa le funzionalità "meglio che niente". Lancia senza la dashboard delle metriche superflue. Puoi iterare in v2.  

Elimina le riunioni non necessarie. Semplifica i processi di approvazione. Dà al tuo team tempo di concentrazione effettivo. Dici di no alle richieste di nuove funzionalità. Il Sistema Toyota Production ha un concetto chiamato "eliminare gli sprechi", e a volte il modo più veloce per procedere è smettere di fare cose che ti rallentano.  

Imposta un limite di tempo con decisione e lancia ciò che hai. Quando Facebook è stato lanciato, si chiamava "Thefacebook" e funzionava solo a Harvard. Quando AWS ha lanciato S3, aveva una manciata di chiamate API. Come scrive Paul Graham in *Hackers & Painters*, «Meglio che pochi utenti ti amino davvero che tanti ti apprezzino solo in parte». Lancia la cosa più semplice che funziona.  

Se assolutamente devi assumere, assumi per il prossimo progetto, non per salvare questo. Accetta il periodo di ramp-up di 3-6 mesi. Investi in *pair programming* e mentoring. Documenta *perché* sono state prese decisioni, non solo *cosa* sono state. La legge di Brooks ha un corollario: aggiungere persone a un progetto *presto* può aiutare, perché paghi il costo dell'onboarding prima che si verifichi la pressione della scadenza.

## Perché la fallacia persiste

La fallacia del "aggiungi solo più ingegneri" sopravvive perché sembra un'azione concreta. Dimostra urgenza agli stakeholder. Risulta impressionante su un foglio di calcolo. È soddisfacente emotivamente in quel momento.

Ma lo sviluppo del software non è lavoro su una catena di montaggio. Non stiamo producendo widget dove raddoppiare gli operai raddoppia l'output. Stiamo risolvendo problemi interconnessi dove il contesto conta, la comunicazione conta e il sovraccarico di coordinamento è un costo reale che cresce quadraticamente con la dimensione del team.

La matematica è chiara: cinque persone hanno 10 percorsi di comunicazione, dieci persone ne hanno 45, venti persone ne hanno 190. L'onboarding richiede mesi, non settimane. Il sovraccarico di coordinamento è un'imposta che paghi per ogni persona aggiunta. Questi non sono opinioni che puoi dibattere in una stanza da conferenze. Sono realtà misurabili che appaiono nei tuoi grafici di velocità, che ci credi o no.

La prossima volta che qualcuno suggerirà di aggiungere più ingegneri a un progetto in ritardo, saprai cosa aspettarti. Il progetto non sarà in ritardo di giorni o settimane.

Sarà in ritardo di mesi. E a differenza di quasi tutti i problemi di ingegneria, non puoi risolvere questo problema con un refactoring.

## Ulteriori letture

**Libri:**
- *The Mythical Man-Month* di Fred Brooks (1975)
- *The Manager's Path* di Camille Fournier (2017)
- *Accelerate* di Nicole Forsgren, Jez Humble e Gene Kim (2018)
- *Team Topologies* di Matthew Skelton e Manuel Pais (2019)
- *Inspired* di Marty Cagan (2017)
- *Hackers & Painters* di Paul Graham (2.004)

**Articoli e studi:**
- "The Influence of Organizational Structure on Software Quality" (Microsoft Research, 2008)
- "No Silver Bullet: Essence and Accidents of Software Engineering" di Fred Brooks (1986)
- Ricerche di Gloria Mark sulle interruzioni e l'attenzione all'Università della California a Irvine
- Vari articoli di Harvard Business Review su dinamiche di squadra e produttività

**Prospettive moderne:**
- Blog e libro di Will Larson su leadership tecnica
- Charity Majors (Honeycomb) sull'osservabilità e struttura delle squadre  
- Rapporti The State of DevOps di DORA
````
