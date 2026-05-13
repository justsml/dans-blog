# Translation Candidate
- Slug: beware-the-single-purpose-people
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-04-03--beware-the-single-purpose-people/it/index.mdx
- Validation: deferred
- Runtime seconds: 53.10
- Input tokens: 7304
- Output tokens: 10103
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.003009
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
language: English
title: Attenzione alle persone monofunzionali
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
Il `Single Responsibility Principle` è uno di quei concetti che sembra così sensato da poter sfuggire al tuo giudizio.  

Fai una cosa. Fai bene. Mantieni i moduli focalizzati. Dà al codice un motivo per cambiare. Consigli validi.  

Poi qualcuno trasforma questi consigli in un nastro misuratore e inizia a dichiarare che qualsiasi funzione di più di cinque righe è un odore di codice.  

<p class="inset">Il problema non è SRP. Il problema è trattare "piccolo" come sostituto di "coesivo".</p>  

A quel punto hai incontrato le persone a scopo unico: sviluppatori che non sbagliano esattamente sull'incapsulamento, ma hanno confuso i limiti utili con la frammentazione massima.  

<figure class="inset-right">
  <figcaption>Violenza nell'architettura software</figcaption>
![Componenti, componenti ovunque](../software-patterns__the-dismembered-architecture.webp "Componenti, componenti ovunque")
</figure>  

## I. L'idea utile sotto la superficie  

> Aggiungere un singolo checkbox a un form dovrebbe idealmente influenzare un solo file. Non 8 file in 5 directory... Guardo te, React/Redux.  

Quando SRP viene applicato con giudizio, è utile. Unità di codice focalizzate su un compito concettuale sono più semplici da comprendere. I test possono mirare al comportamento in un confine sensato. Moduli chiari rendono più semplice modificare una parte del sistema senza trascinare l'applicazione intera in stanza.  

Anche gli esempi classici di Unix sono più pragmatici di quanto suggerisca lo slogan. `ls` elenca file, sì, ma coordina anche chiamate come `opendir`, `readdir`, `closedir` e `stat`. L'unità utile non è l'operazione più piccola possibile. L'unità utile è la cosa più coerente che risolve il compito.

<p class="inset">La filosofia originale di Unix parlava di *composizione* e *semplicità*, **non di ridurre ogni cosa** a una singola funzione o file.</p>

Questa distinzione conta. "Una responsabilità" non è lo stesso che "una riga di comportamento".

## II. Surrappresentazione: Quando la Semplicità Diventa Caos

> Il nostro architetto insiste che ogni funzione più lunga di 5 righe sia un "odore di codice". Il nostro codice ora emana un debole odore di disperazione inutile.

Il fallimento è facile da riconoscere solo dopo che ha già peggiorato la tua settimana.

Il codice ha più file, ma meno struttura. Ogni helper ha il suo helper. Ogni concetto è stato diviso in cartelle nominate per ruoli tecnici invece che per significati produttivi. Aggiungere una checkbox richiede di modificare un componente, un hook, un selettore, un'azione, un riduttore, una costante, un fixture di test e un'esportazione da barrel che esiste quasi solo per far sembrare meno colpevoli i percorsi di importazione.

<figure class="inset-left">
  <figcaption>Nessuna fuga da questo schema di lavoro infinito</figcaption>
![Componenti, componenti ovunque](../software-patterns__the-mc-escher-stack.webp "The MC Escher Pattern")
</figure>

Cosa ha comprato tutta questa purezza?

-   **Schegge del File System:** Directory sorgente che si trasformano in paesaggi notturni di file minuscoli, spesso contenenti una singola, tristemente solitaria funzione. La navigazione diventa un esercizio di esplorazione sotterranea.
-   **Intrecci di Dipendenze:** Una rete di importazioni ed esportazioni così fitta che tracciare l'esecuzione richiede una lavagna bianca grande e più pazienza di quanta meriti la funzionalità. File importati una sola volta stanno lì a fingere di essere riutilizzabili.
-   **Tradimento dei Test:** I test diventano fragili, sentinelle iper-specifiche che proteggono dettagli minimi di implementazione. Cambia la firma di una funzione? Guarda decine di test crollare come antichi vasi. Il suite di test si trasforma da rete di sicurezza in un campo minato.
-   **Velocità Scomparsa:** Modifiche semplici si trasformano in saghe di modifica multi-file. Onboarding nuovi sviluppatori richiede settimane per consegnargli mappe e bussoloni solo per trovare dove *vive realmente* il componente `UserProfile` questa settimana. Il progresso si riduce a un avanzamento geologico sotto il peso schiacciante di questa "organizzazione".

Ho fissato l'abisso di codici dove una funzionalità lineare da 100 righe era vivisezionata in 15+ file, ciascuno un "angelo puro" contenente forse una o due funzioni. L'esplosione cognitiva necessaria per tenerci testa annullava completamente qualsiasi vantaggio teorico derivato dalla separazione. Non era più semplice; era solo sparso.

## III. Il prezzo della perfezione: impatto sugli sviluppatori

> Spendiamo più tempo a discutere la struttura delle cartelle e le convenzioni di nomina che a consegnare effettivamente funzionalità. È questo Agile?

<figure class="inset-left">
  <figcaption>Tanto caotico da sembrare arte</figcaption>
![Tanto caotico da sembrare arte](../software-patterns__the-rube-goldberg-architecture.webp "The Rube Goldberg Pattern")
</figure>

Questa frammentazione patologica non è solo un problema estetico. Cambia il modo in cui gli sviluppatori impiegano la loro attenzione:

**Il drenaggio della produttività:** Dimentica il debito tecnico; questo è un debito organizzativo accumulato attraverso la nidificazione ossessiva delle directory. Ogni piccola modifica diventa uno scavo archeologico attraverso strati di astrazione. Il tempo svanisce nel buco nero di `cd ..` e `grep`.

**La tassa dei test:** Invece di fornire sicurezza, il suite di test diventa una fonte di attrito. Ore vengono perse a riparare test rotti da refactor banali, test che erano troppo strettamente legati ai dettagli microscopici che dovevano verificare.

**Il carico cognitivo:** C'è un limite duro su quante informazioni disconnesse può gestire un cervello umano. Costringere gli sviluppatori a ricostruire il flusso del programma da una dozzina di file sparsi ostacola attivamente la comprensione e rende più difficile apportare modifiche con sicurezza.

## IV. Accettare la pragmaticità: un'alternativa pratica

> Ho suggerito di mettere due funzioni correlate nello stesso file. La stanza ha reagito come se avessi proposto di cancellare l'ambiente di staging.
> — Un lettore in recupero da purismo

L'uscita di emergenza non è abbandonare l'SRP. La risposta è applicarlo al livello corretto di significato.

Ecco come appare nella pratica:

- **Focalizzati sulla coesione, non sugli atomi:** Raggruppa le cose che *cambiano insieme* e *appartengono concettualmente*. Un modulo potrebbe gestire diversi aspetti correlati all'autenticazione utente. Va bene. Probabilmente è *meglio* di sei file separati, ciascuno che contiene una singola funzione relativa allo stato di login.
- **Tieni insieme i parenti:** Non separare codice correlato a meno che non ci sia un beneficio tangibile e ovvio – come una reutilizzabilità effettiva *nella pratica*, non in un futuro ipotetico che non arriverà mai. La vicinanza è essenziale per la comprensione.
- **Lascia che la realtà guidi:** Organizza in base alle funzionalità e ai flussi di lavoro reali della tua applicazione, non in base a un'astratta purezza funzionale³. Questa struttura rende più facile o più difficile a qualcuno comprendere e modificare `Feature X`?
- **Osserva il meatware:** Ricorda lo sviluppatore medio. Quale organizzazione minimizza il carico mentale necessario per lavorare al codice? Ottimizza per la comprensione umana.
- **Testa ciò che conta:** Scrivi test che verifichino il comportamento su un confine sensato, non test saldati intimamente al cablaggio interno di ogni funzione minuscola. L'obiettivo è la fiducia, non solo lo spettacolo percentuale della copertura.

<p class="inset">L'obiettivo non è una perfezione teorica degna di una tesi di dottorato; è creare codice che i tuoi colleghi (e il futuro te stesso) possano navigare, comprendere e modificare senza voler incendiare l'edificio.</p>

A volte significa che un file è lungo 200 righe invece di 50. A volte una funzione gestisce il recupero dei dati *e* la loro trasformazione leggera. A volte una classe ha due responsabilità così strettamente collegate da meritare di vivere insieme. Se rende il sistema complessivo più facile da utilizzare, è probabilmente la scelta giusta.

Resta concentrato sulle domande pratiche:
- Qualcuno nuovo riesce a orientarsi?
- Possiamo modificare `X` senza rompere l'irrilevante `Y`?
- Questo test mi dice davvero se la funzionalità funziona?
- Stiamo consegnando valore, o semplicemente riassegnando cartelle?

## V. Conclusione: Promuovere un Codice Cohesivo e Sostenibile

Il principio di responsabilità singola è uno strumento utile. Non è un mandato per ridurre il tuo codice in polvere atomica. Come ogni strumento, il suo valore dipende dal giudizio di chi lo utilizza.

Quindi, quando incontri i Single-Purpose People, pronti a combattere ogni funzione che osi superare le tre linee, fai un respiro. Ricorda il checkbox a 12 file.

Il nostro compito non è costruire funzioni perfette teoricamente. Il nostro compito è costruire software che funziona, risolve problemi e non punisce la persona successiva che dovrà toccarlo.

Resta pragmatico. Focalizzati sui risultati. Non permettere che la ricerca della purezza perfetta diventi il nemico del codice sostenibile. La tua sanità mentale e la velocità del tuo team ne dipendono.

¹ L'ironia è che ottenere un unico scopo effettivo ai livelli più bassi richiede una complessità immensa nascosta appena sotto la superficie.  

² Parliamo di purezza concettuale qui: l'idea che una funzione dovrebbe fare solo "una cosa" logicamente. Non confondere questo con il concetto di "funzione pura" della programmazione funzionale, senza effetti collaterali, che è un concetto diverso, anche se talvolta correlato.
````
