# Translation Candidate
- Slug: beware-the-single-purpose-people
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-04-03--beware-the-single-purpose-people/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 7.57
- Input tokens: 7782
- Output tokens: 2961
- Thinking tokens: unknown
- Cached input tokens: 2944
- Cache write tokens: 0
- Estimated cost: $0.000836
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-04-03--beware-the-single-purpose-people/it/index.mdx reports/i18n/beware-the-single-purpose-people/it
## Raw Output

````mdx
---
language: English
title: Attenzione alle persone a scopo unico
subTitle: Così puro da far male
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
Il `Single Responsibility Principle` è una di quelle idee che suonano così sensate da riuscire a sfuggire al tuo giudizio.

Fai una cosa. Fallala bene. Mantieni i moduli focalizzati. Dai al codice una ragione per cambiare. Buon consiglio.

Poi qualcuno trasforma il consiglio in un metro a nastro e comincia a dichiarare che qualsiasi funzione più lunga di cinque righe è un odore di codice.

<p class="inset">Il problema non è il SRP. Il problema è trattare “piccolo” come sostituto di “coeso”.</p>

A quel punto hai incontrato le persone a scopo unico: sviluppatori che non sbagliano sul concetto di modularità, esattamente, ma hanno confuso i confini utili con la massima frammentazione.

<figure class="inset-right">
  <figcaption>Violenza nell'Architettura del Software</figcaption>
![Components, components everywhere](../software-patterns__the-dismembered-architecture.webp "Components, components everywhere")
</figure>

## I. L'Idea Utile Sottostante

> Aggiungere una singola casella di controllo a un form dovrebbe idealmente influire su un solo file. Non su 8 file sparsi in 5 directory... Sto guardando te, React/Redux.

Quando il SRP viene applicato con giudizio, è d’aiuto. Unità di codice concentrate su un unico compito concettuale sono più facili da comprendere. I test possono mirare al comportamento a un confine sensato. Moduli chiari rendono più semplice modificare una parte del sistema senza trascinare il resto dell’applicazione nella stessa stanza.

Anche gli esempi classici di Unix sono più pragmatici di quanto il motto suggerisca. `ls` elenca i file, sì, ma coordina anche chiamate come `opendir`, `readdir`, `closedir` e `stat`. L'unità utile non è l'operazione più piccola possibile. L'unità utile è la più piccola cosa coerente che risolve il compito.

<p class="inset">La filosofia originale di Unix riguardava la *composizione* e la *semplicità*, **non la riduzione di tutto** a una singola funzione o file.</p>

Questa distinzione è importante. “Una responsabilità” non è la stessa cosa di “una riga di comportamento”.

## II. Over‑Abstraction: Quando la Semplicità Degenera in Caos

> Il nostro architetto insiste che ogni funzione più lunga di 5 righe sia un “code smell”. Il nostro codebase ora emana un leggero odore di disperazione senza meta.

Il pattern di fallimento è facile da individuare dopo che ha già rovinato la tua settimana.

Il codebase ha più file, ma meno forma. Ogni helper ha un helper. Ogni concetto è stato suddiviso in cartelle intitolate a ruoli tecnici anziché al significato di prodotto. Aggiungere una checkbox richiede di toccare un componente, un hook, un selector, un’azione, un reducer, una costante, un fixture di test e un barrel export che esiste principalmente per evitare che i percorsi di importazione sembrino colpevoli.

<figure class="inset-left">
  <figcaption>Nessuna via di fuga per questo modello di lavoro infinito</figcaption>
![Componenti, componenti ovunque](../software-patterns__the-mc-escher-stack.webp "Il Pattern di MC Escher")
</figure>

Cosa ha comprato tutta quella purezza?

-   **Scheggia del file system:** Le directory sorgenti fioriscono in paesaggi incubi di innumerevoli file minuscoli, spesso contenenti una singola funzione, tragicamente sola. Navigare diventa un esercizio di speleologia.  
-   **Intrecci di dipendenze:** Una rete di import ed export così densa che tracciare l’esecuzione richiede una grande lavagna e più pazienza di quanta la feature meriti. File importati una sola volta restano lì a fingere di essere riutilizzabili.  
-   **Tradimento dei test:** I test diventano fragili, sentinelle iper‑specifiche che custodiscono dettagli di implementazione minuti. Cambi la firma di una funzione? Guarda decine di test crollare come antica ceramica. La suite di test si trasforma da rete di sicurezza a campo minato.  
-   **Velocità svanita:** Modifiche semplici si trasformano in saghe di modifiche su più file. L’onboarding di nuovi sviluppatori richiede settimane di consegna di mappe e bussole solo per trovare dove il componente `UserProfile` *vive realmente* questa settimana. Il progresso in avanti rallenta a un cammino geologico sotto il peso di questa “organizzazione”.

Ho fissato l’abisso di codebase dove una feature lineare di 100 righe è stata vivisezionata in più di 15 file, ognuno un “puro” angioletto contenente forse una o due funzioni. Il raggio d’azione cognitivo di cercare di tenere quel caos in testa annullava completamente qualsiasi vantaggio teorico della separazione. Non era più semplice; era solo sparpagliato.

## III. Il prezzo della perfezione: impatto sugli sviluppatori

> Trascorriamo più tempo a dibattere su struttura delle cartelle e convenzioni di naming che a rilasciare effettivamente funzionalità. È questo Agile?

<figure class="inset-left">
  <figcaption>Così disordinato da sfiorare l’arte</figcaption>
![Così disordinato da sfiorare l’arte](../software-patterns__the-rube-goldberg-architecture.webp "The Rube Goldberg Pattern")
</figure>

Questa frammentazione patologica non è solo un problema estetico. Cambia il modo in cui gli sviluppatori spendono la loro attenzione:

**Il Drain di Produttività:** Dimenticate il debito tecnico; questo è debito organizzativo accumulato tramite una nidificazione compulsiva delle directory. Ogni piccola modifica diventa una scavo archeologico attraverso strati di astrazione. Il tempo svanisce nel buco nero di `cd ..` e `grep`.

**Il Tassa dei Test:** Invece di fornire fiducia, la suite di test diventa una fonte di attrito. Ore si sciolgono a sistemare test rotti da refactoring banali, test troppo strettamente accoppiati ai dettagli microscopici che avrebbero dovuto verificare.

**Il Carico Cognitivo:** Esiste un limite rigido a quante informazioni scollegate un cervello umano può gestire. Costringere gli sviluppatori a ricostruire il flusso del programma da una dozzina di file sparsi ostacola attivamente la comprensione e rende più difficili modifiche sicure.

## IV. Abbracciare il Pragmatismo: Un’Alternativa Pratica

> Ho suggerito di mettere due funzioni correlate nello stesso file. La stanza ha reagito come se avessi proposto di cancellare lo staging.  
> — Un lettore purista in fase di recupero

La via di fuga non è abbandonare il SRP. La risposta è applicarlo al livello di significato corretto.

Ecco come appare nella pratica:

- **Concentrarsi sulla coesione, non sugli atomi:** Raggruppa ciò che *cambia insieme* e che *appartiene concettualmente* allo stesso insieme. Un modulo può gestire diversi aspetti correlati dell'autenticazione utente. Va bene. È probabilmente *meglio* di sei file separati, ognuno contenente una singola funzione relativa allo stato di login.  
- **Tenere i parenti insieme:** Non suddividere il codice correlato a meno che non ci sia un beneficio evidente e tangibile – come una reale riusabilità *in pratica*, non in qualche ipotetico futuro che non arriverà mai. La prossimità conta per la comprensione.  
- **Lasciare che la realtà guidi:** Organizza in base alle funzionalità e ai flussi di lavoro effettivi della tua applicazione, non a qualche ideale astratto di purezza funzionale³. Questa struttura rende più facile o più difficile per qualcuno capire e modificare `Feature X`?  
- **Pensare al “meatware”:** Ricorda lo sviluppatore in difficoltà. Quale organizzazione minimizza il gioco mentale necessario per lavorare sul codice? Ottimizza per la comprensione umana.  
- **Testare ciò che conta:** Scrivi test che verifichino il comportamento a un confine sensato, non test strettamente legati al cablaggio interno di ogni piccola funzione. Punta alla fiducia, non solo a una percentuale di copertura teatrale.  

<p class="inset">L'obiettivo non è la perfezione teorica degna di una tesi di dottorato; è creare codice che i tuoi colleghi (e il futuro te) possano navigare, comprendere e modificare senza desiderare di dare fuoco all'edificio.</p>

A volte questo significa un file di 200 righe invece di 50. A volte una funzione gestisce il recupero dei dati *e* la loro leggera trasformazione. A volte una classe ha due responsabilità così strettamente accoppiate da dover stare insieme. Se rende il sistema più facile da gestire complessivamente, probabilmente è la scelta giusta.

Rimani fermamente concentrato sulle domande pratiche:
- Qualcuno nuovo riesce a orientarsi?
- Possiamo cambiare `X` senza rompere `Y` non correlato?
- Questo test mi dice davvero se la funzionalità funziona?
- Stiamo consegnando valore, o solo riorganizzando cartelle?

## V. Conclusione: Promuovere Codice Coeso e Manutenibile

Il Principio di Responsabilità Unica è uno strumento utile. Non è un ordine di ridurre il tuo codebase a polvere atomica. Come ogni strumento, il suo valore dipende dal giudizio di chi lo usa.

Quindi, quando incontri i “Single‑Purpose People”, pronti a scatenare una guerra contro qualsiasi funzione che osi superare le tre righe, fai un respiro. Ricorda la checklist dei 12 file.

Il nostro compito non è costruire funzioni teoricamente immacolate come fiocchi di neve. Il nostro compito è costruire software che funzioni, risolva problemi e non penalizzi la persona successiva che deve toccarlo.

Rimani pragmatico. Concentrati sui risultati. Non lasciare che la ricerca della purezza perfetta diventi il nemico del codice manutenibile. La tua sanità mentale, e la velocità del tuo team, ne dipendono.

¹ L'ironia è che raggiungere *veramente* uno scopo unico ai livelli più bassi richiede una complessità immensa nascosta appena sotto la superficie.

² Qui parliamo di purezza concettuale: l'idea che una funzione debba fare solo una “cosa” dal punto di vista logico. Non confonderla con il concetto di “funzione pura” della programmazione funzionale, priva di effetti collaterali, che è un'idea diversa, sebbene a volte correlata.
````
