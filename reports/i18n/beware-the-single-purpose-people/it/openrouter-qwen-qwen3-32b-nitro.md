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
title: Fai attenzione alle persone monofunzionali
subTitle: Così puro che fa male
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
Il `Single Responsibility Principle` è uno di quegli idee che sembra così sensata da poter passare inosservata al tuo giudizio.

Fai una cosa. Fallo bene. Mantieni i moduli focalizzati. Dà al codice un motivo per cambiare. Buoni consigli.

Poi qualcuno trasforma il consiglio in un metro di misura e inizia a dichiarare che qualsiasi funzione di più di cinque righe è un odore di codice.

<p class="inset">Il problema non è l'SRP. Il problema è considerare "piccolo" come sostitutivo di "coesivo".</p>

A quel punto hai incontrato le Persone a Scopo Unico: sviluppatori che non sbagliano esattamente sull'incapsulamento, ma hanno confuso confini utili con frammentazione massima.

<figure class="inset-right">
  <figcaption>Violenza nell'architettura del software</figcaption>
![Componenti, componenti ovunque](../software-patterns__the-dismembered-architecture.webp "Componenti, componenti ovunque")
</figure>

## I. L'idea utile sotto

> Aggiungere una singola casella di controllo a un modulo dovrebbe idealmente influenzare solo un file. Non 8 file in 5 directory diverse... Sto pensando a voi, React/Redux.

Quando il SRP viene applicato con discernimento, è utile. Le unità di codice concentrate su un'unica attività concettuale sono più semplici da comprendere. I test possono mirare al comportamento in un confine sensato. Moduli chiari rendono più facile modificare una parte del sistema senza trascinare l'applicazione intera nella stanza.

Anche gli esempi classici di Unix sono più pragmatici del detto suggerisce. `ls` elenca file, sì, ma coordina anche chiamate come `opendir`, `readdir`, `closedir` e `stat`. L'unità utile non è l'operazione più piccola possibile. L'unità utile è la cosa più coerente che risolve il compito.

<p class="inset">La filosofia originale di Unix parlava di *composizione* e *semplicità*, **non di ridurre tutto** a una singola funzione o file.</p>

Questa distinzione conta. "Una responsabilità" non è lo stesso che "una riga di comportamento."

## II. Sopra-Abstrazione: Quando la Semplicità Diventa Caos

> Il nostro architetto insiste sul fatto che ogni funzione più lunga di 5 righe sia un "code smell". Il nostro codice ora emana un lieve odore di disperazione inutile.

La modalità di fallimento è facile da notare solo dopo che abbia già peggiorato la tua settimana.

Il codice ha più file, ma meno struttura. Ogni helper ha un helper. Ogni concetto è stato suddiviso in cartelle nominate in base a ruoli tecnici invece che al significato del prodotto. Aggiungere una casella di controllo richiede di modificare un componente, un hook, un selettore, un'azione, un riduttore, una costante, un fixture di test e un'esportazione barrel che esiste principalmente per far sembrare innocui i percorsi di importazione.

<figure class="inset-left">
  <figcaption>Nessuna fuga da questo schema di lavoro infinito</figcaption>
![Components, components everywhere](../software-patterns__the-mc-escher-stack.webp "The MC Escher Pattern")
</figure>

Cosa ha comprato tutta questa purezza?

-   **Schegge del File System:** Le directory sorgente si trasformano in paesaggi infernali di innumerevoli file minuscoli, spesso contenenti una singola, tristemente solitaria funzione. La navigazione diventa un esercizio di speleologia.  
-   **Intrecci di Dipendenza:** Una rete di import ed esportazioni così densa che tracciare l'esecuzione richiede una lavagna grande e più pazienza di quanta meriti la funzionalità. I file importati esattamente una volta restano lì a fingere di essere riutilizzabili.  
-   **Tradimento dei Test:** I test diventano fragili, sentinelle iper-specifiche che vigilano su minuzie dell'implementazione. Cambia la firma di una funzione? Guarda decine di test che si rompono come antiche ceramiche. La suite di test si trasforma da rete di sicurezza in un campo minato.  
-   **Velocità Scomparsa:** Modifiche semplici si trasformano in saghe di modifica multi-file. L'onboarding di nuovi sviluppatori richiede settimane per consegnargli mappe e bussole solo per trovare dove il componente `UserProfile` *vive davvero* questa settimana. Il progresso in avanti rallenta a un avanzamento geologico sotto il peso schiacciante di questa "organizzazione".  

Ho fissato l'abisso di codebase in cui una funzionalità semplice da 100 linee era stata sezionata in 15+ file, ciascuno un "angelo puro" che conteneva forse una o due funzioni. Il raggio cognitivo necessario per tenere a mente quel caos annullava qualsiasi vantaggio teorico derivante dalla separazione. Non era più semplice; era solo disperso.  

## III. Il Prezzo della Perfezione: Impatto sugli Sviluppatori  

> Passiamo più tempo a discutere la struttura dei file e le convenzioni di denominazione che a consegnare effettivamente le funzionalità. Questo è Agile?  

<figure class="inset-left">  
  <figcaption>Così caotico da sembrare arte</figcaption>  
![Così caotico da sembrare arte](../software-patterns__the-rube-goldberg-architecture.webp "Il Pattern di Rube Goldberg")  
</figure>  

Questa frammentazione patologica non è solo un problema estetico. Cambia il modo in cui gli sviluppatori impiegano la loro attenzione:

**Lo Svuotamento della Produttività:** Dimenticate il debito tecnico; questo è un debito organizzativo accumulato attraverso directory annidate in modo ossessivo-compulsivo. Ogni piccola modifica diventa una ricerca archeologica attraverso strati di astrazione. Il tempo scompare nel buco nero di `cd ..` e `grep`.

**L’Imposta sui Test:** Invece di fornire sicurezza, la suite di test diventa una fonte di attrito. Ore vengono sprecate a riparare test rotti da refactoring banali, test che erano troppo strettamente accoppiati ai dettagli microscopici che dovevano verificare.

**Il Carico Cognitivo:** C'è un limite rigido su quante informazioni disconnesse può gestire un cervello umano. Costringere gli sviluppatori a ricostruire il flusso del programma da una dozzina di file sparsi ostacola attivamente la comprensione e rende più difficile apportare modifiche con sicurezza.

## IV. Accogliere il Pragmatismo: Un'Alternativa Pratica

> Ho suggerito di mettere due funzioni correlate nello stesso file. La stanza ha reagito come se avessi proposto di cancellare l'ambiente di staging.  
> — Un lettore purista in recupero

L'uscita di sicurezza non è abbandonare la SRP. La risposta è applicarla al livello corretto di significato.

Ecco come si presenta nella pratica:

- **Concentrarsi sulla coesione, non sugli atomi:** Raggruppa ciò che *cambia insieme* e *appartiene concettualmente insieme*. Un modulo potrebbe gestire diversi aspetti correlati all'autenticazione utente. Va bene. Probabilmente è *meglio* che sei file separati, ciascuno che contiene una singola funzione legata allo stato di login.
- **Tenere insieme le cose correlate:** Non separare codice correlato a meno che non esista un vantaggio tangibile e chiaramente evidente – come una reale riutilizzabilità *nella pratica*, non in un futuro ipotetico che non arriverà mai. La vicinanza è essenziale per la comprensione.
- **Fare guidare la realtà:** Organizza in base alle funzionalità e ai flussi di lavoro effettivi della tua applicazione, non in base a un'astratta purezza funzionale³. Questa struttura rende più facile o più difficile per qualcuno comprendere e modificare `Feature X`?
- **Pensare al "meatware":** Ricorda lo sviluppatore. Quale organizzazione minimizza il carico mentale necessario per lavorare al codice? Ottimizza per la comprensione umana.
- **Testare ciò che conta:** Scrivi test che verifichino il comportamento in un confine sensato, non test saldati all'architettura interna di ogni minuscola funzione. Obiettivo: la fiducia, non solo spettacoli percentuali di copertura.

<p class="inset">L'obiettivo non è la perfezione teorica degna di una tesi di dottorato; è creare codice che i tuoi colleghi (e il futuro te stesso) possano navigare, comprendere e modificare senza voler incendiare l'edificio.</p>

A volte ciò significa che un file abbia 200 righe invece di 50. A volte una funzione gestisce il recupero dei dati *e* la loro trasformazione leggera. A volte una classe ha due responsabilità così strettamente collegate da meritare di vivere insieme. Se rende il sistema più facile da lavorare, probabilmente è la scelta giusta.

Resta focalizzato senza compromessi sulle domande pratiche:
- Qualcuno nuovo riesce a orientarsi?
- Possiamo modificare `X` senza rompere l'irrilevante `Y`?
- Questo test mi dice davvero se la funzionalità funziona?
- Stiamo consegnando valore, o solo riassegnando cartelle?

## V. Conclusione: Promuovere un codice coeso e mantenibile

Il Principio di Responsabilità Singola è uno strumento utile. Non è un mandato per frantumare il tuo codice in polvere atomica. Come ogni strumento, il suo valore dipende dal giudizio di chi lo utilizza.  

Quando incontri le Persone a Scopo Singolo, pronte a dichiarare guerra a qualsiasi funzione osi superare le tre righe, prendi un respiro. Ricorda il checkbox a 12 file.  

Il nostro compito non è costruire funzioni perfette come nevicelle. Il nostro compito è sviluppare software che funziona, risolve problemi e non punisce la persona successiva che dovrà modificarlo.  

Resta pragmatico. Focalizzati sui risultati. Non permettere che la ricerca della purezza perfetta diventi il nemico del codice mantenibile. La tua sanità mentale e la velocità del tuo team dipendono da questo.  

¹ L'ironia è che raggiungere un unico scopo reale ai livelli più bassi richiede una complessità immensa nascosta appena sotto la superficie.  

² Parliamo di purezza concettuale: l'idea che una funzione dovrebbe fare solo "una cosa" logicamente. Non confonderla con il concetto di "funzione pura" della programmazione funzionale, priva di effetti collaterali, che è diverso, anche se a volte correlato.
````
