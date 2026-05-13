# Translation Candidate
- Slug: beware-the-single-purpose-people
- Locale: it
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2025-04-03--beware-the-single-purpose-people/it/index.mdx
- Validation: deferred
- Runtime seconds: 102.83
- Input tokens: 6397
- Output tokens: 23652
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.024612
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
language: English
title: Diffidate delle persone a scopo unico
subTitle: Puro da far male
category: Code
subCategory: Best Practices
date: '2025-04-14'
modified: '2025-04-15'
tags:
  - software-development
  - code-organization
  - maintainability
  - testing
  - dogma
  - pragmatism
social_image: ../desktop-social.webp
cover_full_width: ../endless-little-boxes.webp
cover_mobile: ../endless-little-boxes-square-200.webp
cover_icon: ../endless-little-boxes-square-200.webp
---
Il `Principio di Responsabilità Unica` è di quelle idee che suonano così sensate da riuscire a sfuggire al tuo giudizio.

Fai una cosa. Fallo bene. Tieni i moduli focalizzati. Dai al codice un motivo per cambiare. Buoni consigli.

Poi qualcuno trasforma quel consiglio in un metro a nastro e inizia a dichiarare che qualsiasi funzione che supera le cinque righe è un code smell.

<p class="inset">Il problema non è il SRP. Il problema è trattare il "piccolo" come sostituto del "coesivo".</p>

A quel punto hai incontrato i Single-Purpose People: sviluppatori che non hanno esattamente torto sulla modularità, ma hanno confuso i confini utili con la frammentazione massima.

<figure class="inset-right">
  <figcaption>Violenza nell'Architettura Software</figcaption>
![Componenti, componenti ovunque](../software-patterns__the-dismembered-architecture.webp "Componenti, componenti ovunque")
</figure>

## I. L'idea utile sottostante

> Aggiungere una singola casella di controllo a un form dovrebbe idealmente influenzare un solo file. Non 8 file sparsi in 5 directory... Ti sto guardando, React/Redux.

Quando il SRP viene applicato con criterio, aiuta. Le unità di codice focalizzate su un singolo compito concettuale sono più facili da comprendere. I test possono mirare al comportamento a un confine sensato. Moduli chiari rendono più semplice modificare una parte del sistema senza trascinare il resto dell'applicazione nella stanza.

Anche gli esempi classici di Unix sono più pragmatici di quanto suggerisca lo slogan. `ls` elenca i file, sì, ma coordina anche chiamate come `opendir`, `readdir`, `closedir` e `stat`. L'unità utile non è l'operazione più piccola possibile. L'unità utile è l'entità più piccola e coerente in grado di risolvere il compito.

<p class="inset">La filosofia Unix originale riguardava la *composizione* e la *semplicità*, **non la riduzione di tutto** a una singola funzione o file.</p>

Questa distinzione conta. "Una responsabilità" non equivale a "una riga di comportamento".

## II. Sovraastrazione: Quando la semplicità si trasforma in caos

> Il nostro architetto insiste nel definire ogni funzione più lunga di 5 righe un 'code smell'. Il nostro codice ora odora vagamente di disperazione ottusa.

La modalità di guasto è facile da individuare dopo aver già compromesso la tua settimana.

Il codice sorgente ha più file, ma meno struttura. Ogni helper ha un helper. Ogni concetto è stato frammentato in cartelle nominate in base a ruoli tecnici invece che al significato di prodotto. Aggiungere una checkbox richiede di modificare un componente, un hook, un selector, un'azione, un reducer, una costante, un fixture di test e un barrel export, creati principalmente per evitare che i percorsi di import sembrino colpevoli.

<figure class="inset-left">
  <figcaption>Nessuna via d'uscita per questo pattern di lavoro infinito</figcaption>
![Componenti, componenti ovunque](../software-patterns__the-mc-escher-stack.webp "Il pattern MC Escher")
</figure>

Che valore ha avuto tutta quella purezza?

-   **Shrapnel del File System:** Directory sorgente che si espandono in paesaggi da incubo di innumerevoli file minuscoli, spesso contenenti una singola, tragicamente solitaria funzione. Navigare nel codice diventa un esercizio di speleologia.
-   **Intrecci di Dipendenze:** Una ragnatela di import ed export così fitta che tracciare l'esecuzione richiede una lavagna grande e più pazienza di quanto il feature lo meriti. File importati esattamente una volta restano lì a fingere di essere riutilizzabili.
-   **Tradimento dei Test:** I test diventano sentinelle fragili e iper-specifiche che custodiscono dettagli implementativi minuscoli. Modifichi la signature di una funzione? Guarda decine di test sgretolarsi come ceramica antica. La suite di test si trasforma da rete di sicurezza in un campo minato.
-   **Velocità Svanita:** Le modifiche semplici metastatizzano in saghe di modifiche multi-file. L'onboarding di nuovi sviluppatori richiede settimane di consegna di mappe e bussole solo per capire dove il componente `UserProfile` *si trovi effettivamente* questa settimana. I progressi rallentano a una velocità geologica sotto il peso schiacciante di questa "organizzazione".

Ho fissato l'abisso di codebase in cui una feature lineare di 100 righe è stata vivisezionata in oltre 15 file, ognuno un "purissimo" angioletto contenente forse una o due funzioni. Il raggio d'azione cognitivo necessario per tenere in testa quel caos ha annullato completamente qualsiasi vantaggio teorico derivante dalla separazione. Non era più semplice; era solo frammentato.

## III. Il prezzo della perfezione: impatto sugli sviluppatori

> Passiamo più tempo a dibattere sulla struttura dei file e sulle convenzioni di naming che a rilasciare feature. È questo Agile?

<figure class="inset-left">
  <figcaption>Tanto disordinato da sfiorare l'arte</figcaption>
![Tanto disordinato da sfiorare l'arte](../software-patterns__the-rube-goldberg-architecture.webp "Il pattern Rube Goldberg")
</figure>

Questa frammentazione patologica non è solo un problema estetico. Cambia il modo in cui gli sviluppatori spendono la loro attenzione:

**Il drenaggio della produttività:** Dimenticate il debito tecnico; qui si accumula un debito organizzativo attraverso un annidamento di directory ossessivo-compulsivo. Ogni minima modifica diventa uno scavo archeologico attraverso strati di astrazione. Il tempo svanisce nel buco nero di `cd ..` e `grep`.

**Il costo dei test:** Invece di dare sicurezza, la suite di test diventa una fonte di attrito. Ore si consumano a correggere test rotti da refactor banali, test troppo strettamente accoppiati ai dettagli microscopici che avrebbero dovuto verificare.

**Il carico cognitivo:** C'è un limite rigido al numero di informazioni disconnesse che un cervello umano può gestire. Costringere gli sviluppatori a ricomporre il flusso del programma da una dozzina di file sparsi ostacola attivamente la comprensione e rende più difficile apportare modifiche con sicurezza.

## IV. Abbracciare il pragmatismo: un'alternativa pratica

> Ho suggerito di mettere due funzioni correlate nello stesso file. La stanza ha reagito come se avessi proposto di cancellare l'ambiente di staging.
> — Un purista in via di disintossicazione

La via di fuga non è abbandonare il SRP. La risposta è applicarlo al giusto livello di significato.

Ecco come si traduce in pratica:

- **Concentrati sulla coesione, non sugli atomi:** Raggruppa ciò che *viene modificato insieme* e *appartiene insieme* concettualmente. Un modulo potrebbe gestire diversi aspetti correlati dell'autenticazione utente. Va bene. È probabilmente *meglio* che sei file separati, ognuno con una sola funzione legata allo stato del login.
- **Tieni uniti i correlati:** Non dividere codice legato a meno che non ci sia un beneficio tangibile e palese – come una riutilizzabilità reale *in pratica*, non in un futuro ipotetico che non arriverà mai. La prossimità conta per la comprensione.
- **Lascia che sia la realtà a guidare:** Organizza in base alle funzionalità e ai flussi di lavoro effettivi della tua applicazione, non a un ideale astratto di purezza funzionale³. Questa struttura rende più facile o più difficile per qualcuno comprendere e modificare `Feature X`?
- **Considera il fattore umano (meatware):** Ricorda il povero sviluppatore. Quale organizzazione minimizza il complesso equilibrio mentale richiesto per lavorare sul codice? Ottimizza per la comprensione umana.
- **Testa ciò che conta:** Scrivi test che verifichino il comportamento a un confine ragionevole, non test saldati intimamente al cablaggio interno di ogni minuscola funzione. Punta alla sicurezza, non solo al teatro delle percentuali di copertura.

<p class="inset">L'obiettivo non è la perfezione teorica degna di una tesi di dottorato; è creare codice che i tuoi colleghi (e il tuo io futuro) possano navigare, comprendere e modificare senza venire colti dal desiderio di dare fuoco all'edificio.</p>

A volte questo significa che un file è lungo 200 righe invece di 50. A volte una funzione si occupa di recuperare i dati *e* di trasformarli leggermente. A volte una classe ha due responsabilità così strettamente accoppiate che dovrebbero convivere nello stesso posto. Se rende il sistema più facile da gestire nel complesso, probabilmente è la scelta giusta.

Rimani implacabilmente concentrato sulle domande pratiche:
- Un nuovo arrivato si orienta facilmente?
- Possiamo modificare `X` senza rompere `Y` non correlato?
- Questo test mi dice effettivamente se la funzionalità funziona?
- Stiamo consegnando valore, o stiamo solo riorganizzando cartelle?

## V. Conclusione: Favorire un codice coeso e manutenibile

Il Principio di Responsabilità Unica è uno strumento valido. Non è un ordine di polverizzare il codebase in frammenti incomprensibili. Come qualsiasi strumento, il suo valore dipende dal giudizio di chi lo impiega.

Quindi, quando ti imbatti nei "Puristi dal Monoscopo", pronti a dichiarare guerra a qualsiasi funzione che osi superare le tre righe, fai un respiro. Ricordati la checklist dei 12 file.

Il nostro compito non è assemblare funzioni teoricamente immacolate, degne di un fiocco di neve. Il nostro compito è costruire software che funzioni, risolva problemi concreti e non metta a dura prova chi dovrà mantenerlo.

Rimani pragmatico. Concentrati sui risultati. Non permettere che la caccia alla purezza teorica diventi il nemico del codice manutenibile. La tua sanità mentale e la velocità del team ne dipendono.

¹ L'ironia sta nel fatto che raggiungere uno scopo *effettivo* unico ai livelli più bassi richiede una complessità immensa, nascosta proprio sotto la superficie.

² Qui si parla di purezza concettuale: l'idea che una funzione debba eseguire logicamente solo "una cosa". Non confondere questo concetto con quello della programmazione funzionale di una "funzione pura" priva di effetti collaterali, che è un'idea diversa, sebbene a volte correlata.
````
