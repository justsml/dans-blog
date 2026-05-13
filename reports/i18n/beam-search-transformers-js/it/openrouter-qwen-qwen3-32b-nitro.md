# Translation Candidate
- Slug: beam-search-transformers-js
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-04-16--beam-search-transformers-js/it/index.mdx
- Validation: deferred
- Runtime seconds: 30.31
- Input tokens: 11659
- Output tokens: 11333
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003653
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Implementare Beam Search in Transformers.js
subTitle: >-
  Mille righe, un'attesa di mesi e un'analisi approfondita dei meccanismi della
  generazione di testo
date: '2026-04-16'
modified: '2026-04-16'
tags:
  - ai
  - transformers
  - javascript
  - open-source
  - nlp
  - beam-search
  - machine-learning
category: AI
subCategory: Open Source
draft: true
hidden: true
publish: false
popularity: 0.7
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
> CW: Questo post contiene gergo tecnico. Quindi, se senti parlare di `softmax` o `log probs` e hai immediatamente voglia di dire a `Max` di smetterla con le sue `probs`, forse dovresti saltare questo.

---

## Il problema: `num_beams` era una bugia

Nel ciclo di generazione di `transformers.js`, c'era un commento che era lì da molto tempo:

```js
// TODO: Supporta beam search
```

E proprio sotto, un'istruzione `break` che silenziosamente espulseva il ciclo dopo il primo token. Ogni configurazione del modello che includeva `num_beams > 1` — T5, BART, Whisper — riceveva in realtà greedy decoding. Nessun avviso. Nessun errore. Solo... output errati.

L'ho scoperto mentre testavo una pipeline di sintesi e mi chiedevo perché i miei output fossero così degradati rispetto al riferimento Python. L'ho risalito a `modeling_utils.js`, ho visto il TODO e ho commesso l'errore di pensare "quanto può essere difficile?"

La risposta è: abbastanza difficile, ma in modi interessanti.

---

## Cos'è davvero la Beam Search

Chi non ha mai 

La decodifica greedy seleziona il token con la probabilità più alta ad ogni passo. Semplice, veloce, spesso subottimale: la prima parola che esce dalla tua bocca non è sempre il miglior inizio per una frase.

La beam search, invece, mantiene `num_beams` sequenze candidate attive contemporaneamente, espandendo ciascuna con l'intero vocabolario ad ogni passo, quindi potando fino alle prime `num_beams` in base alla probabilità logaritmica cumulativa. È come un'analisi breadth-first limitata nello spazio dei token.

Il risultato sono sequenze globalmente migliori, al costo di un calcolo `num_beams`× maggiore.

Esistono tre varianti:

- **Beam search standard** — deterministico, seleziona i candidati con argmax, migliore sequenza complessiva  
- **Beam search diversificato** — divide i beam in gruppi, penalizza i token già scelti da gruppi precedenti in modo che i tuoi candidati di output non dicano tutti la stessa cosa  
- **Beam sampling** — stocastico, applica top-k + softmax + campionamento casuale all'interno del framework beam  

Tutte e tre sono ora nel PR.

---

## La Decisione Architetturale con cui Ho Veramente Lottato

Il codice esistente aveva una classe `BeamSearchSampler`. Sembra rilevante. Ma c'era una trappola sottile: restituisce solo i primi `num_beams` token per beam. Sembra corretto finché non ti rendi conto che non è sufficiente per un vero beam search.

Un beam search corretto deve considerare **tutti i `num_beams × vocab_size` candidati per elemento del batch** per trovare le continuazioni globalmente ottimali. Non puoi guardare solo i primi token di ciascun beam in isolamento — devi ordinare tutti i beam insieme.

Così ho bypassato completamente il campionatore esistente. Ho calcolato `log_softmax` direttamente sui logits elaborati, ho aggiunto i punteggi cumulativi dei beam e ho eseguito un ordinamento a due livelli nello spazio dei candidati combinati. Matematica più pulita, semantica corretta.

La classe `BeamSearchSampler` è ancora lì, invariata, utile per qualsiasi cosa facesse inizialmente. Questo è uno di quei casi in cui il percorso "ovvio" per il riutilizzo ti porta nel posto sbagliato.

---

## Il Bug Più Annoyante: Riordinamento della Cache KV

Quando il beam search pruna le sequenze, non tronca semplicemente i token — *riordina* i beam che sopravvivono. Il beam 3 potrebbe produrre la migliore continuazione e venir clonato; i beam 0 e 2 potrebbero essere scartati.

Il problema è che la cache chiave-valore (KV) del meccanismo di attenzione del transformer è indicizzata lungo la dimensione del batch in base al beam. Se riordini le sequenze di output senza riordinare la cache, ottieni uno stato disallineato. Il modello sta "guardando" il passato sbagliato.

La soluzione è `_reorder_cache()` — un metodo che chiama `index_select` su ogni tensore KV passato per reindicizzarli in base all'ordine dei beam aggiornato, quindi elimina i tensori obsoleti.

Per la CPU è semplice: fette di array tipizzati per riga. Per i tensori GPU diventa più fastidioso — devi scaricare i dati in modo asincrono (`ort_tensor.getData(true)`), riordinarli e riuploadarli. Ho aggiunto sia `index_select` (sincrono, CPU) che `index_select_async` a `tensor.js` per gestire entrambi i percorsi.

I modelli encoder-decoder (T5, BART) hanno *due* cache: encoder e decoder. Le PKV dell'encoder non cambiano durante il decoding, quindi passano invariati. Solo le PKV del decoder richiedono il riordino. Confondere questi due casi produce output molto peggiori, in modo sottile — il tipo di errore che sembra quasi corretto finché non lo confronti con un riferimento.

## Diverse Beam Search: Il Caso Divertente

La diverse beam search aggiunge una `diversity_penalty` che scoraggia i gruppi di beam successivi di selezionare token già scelti da gruppi precedenti. L'intuizione è: se tutti i tuoi beam convergono sullo stesso output, non hai davvero esplorato lo spazio delle ipotesi.

Dal punto di vista dell'implementazione, i gruppi devono essere processati *in sequenza* all'interno di ogni passo di decoding, non in parallelo, perché ogni gruppo deve vedere cosa hanno selezionato i gruppi precedenti prima di calcolare i propri punteggi.

La struttura che ho finito per adottare:

```
for each step:
  token_counts = {}
  for each group in groups:
    extract this group's beams and logits
    for each token selected by previous groups:
      logits[token] -= diversity_penalty * token_counts[token]
    score candidates, select top 2×group_size
    group_scorer.process(...)
    record newly selected tokens into token_counts
```

La dipendenza sequenziale qui è reale. Se la parallelizzi, perdi la garanzia di diversità. Per un momento ho pensato di provare comunque a batchizzare questo processo e sarebbe stato un errore.

## La coda a priorità `BeamHypotheses`

Quando un raggio (beam) raggiunge il token EOS prima di `max_length`, è considerato "completato" — ma non puoi semplicemente scartarlo o restituirlo immediatamente. Lo aggiungi a una coda a priorità limitata chiamata `BeamHypotheses`.

La coda mantiene fino a `num_beams` sequenze completate per elemento del batch, valutate in base a:

```
score = sum_logprobs / (length ^ length_penalty)
```

`length_penalty > 1.0` premia output più lunghi; `< 1.0` premia output più brevi. La bandiera `early_stopping` controlla se il raggio è considerato completato non appena la coda è piena (`true`), mai fino a `max_length` (`"never"`), o completato quando nessun raggio rimanente potrebbe superare l'ipotesi completata peggiore (`false`).

Il caso `false` è interessante — richiede di tracciare se qualsiasi raggio attivo potrebbe ancora battere l'ipotesi peggiore corrente, data la massima valutazione residua possibile. Si tratta di un'ottimizzazione di potatura che evita di eseguire fino a `max_length` quando si hanno già buone ipotesi.

Questo codice risiede in `beam_search.js`, nuovo file, circa 240 righe in totale. Esporta anche `BeamSearchScorer`, che gestisce le istanze di `BeamHypotheses` nel batch e gestisce `finalize()`.

## Test rispetto all'implementazione Python di riferimento

Ogni dettaglio di implementazione non banale qui ha un corrispettivo in Python nella libreria HuggingFace `transformers`. Mi sono basato pesantemente su quest'ultima.

Il set di test che ho aggiunto copre:

- Ricerca a fascia standard su modelli encoder-decodificatore (T5) e decoder-only (simile a LLaMA)
- Ricerca a fascia diversificata con `num_beam_groups=2, diversity_penalty=0.5`
- Campionamento a fascia con `do_sample=true, top_k=10`
- `num_return_sequences > 1` — verificando che la forma dell'output sia `[N, seq_len]`
- Generazione di errori corretti per combinazioni incompatibili: CFG + beam search, streaming + beam search, `num_return_sequences > num_beams`

I test sugli errori corretti sono sottovalutati. Documentano le limitazioni intenzionali e impediscono che qualcuno ottenga output errati in modo silenzioso quando cerca di combinare funzionalità che non possono essere combinate. (Lo so perché ho provato a combinare CFG e beam search durante lo sviluppo. La matematica non funziona. Ora genera un errore.)

## Cosa manca ancora

Qualche punto che ho deliberatamente escluso, contrassegnato con `throws`:

- **Beam search diversificato** (`num_beam_groups > 1` + `do_sample`): La matematica qui diventa veramente complessa. Il beam search standard diversificato opera in modo sequenziale tra i gruppi; aggiungere il campionamento richiede un'attenta analisi su come applicare la penalità di diversità in modalità stocastica. È fattibile, ma non implementato.
- **Streaming + beam search**: Lo streaming produce token man mano che vengono generati. Per definizione, il beam search non conosce quale sequenza è la migliore finché non completano più passi. Questi aspetti sono in contrasto fondamentale. Si potrebbe streammare il miglior beam finora, ma si tratterebbe di una funzionalità diversa con sue proprie domande di progettazione.

---

## L'aspetto che nessuno menziona: Latenza nei progetti open source

Il codice funziona. I test passano. Il suite di test esistente è pulito. È rimasto in revisione per mesi.  

Questo è semplicemente il modo in cui vanno le cose nei grandi progetti open source popolari. Il team Hugging Face sta spingendo velocemente, la coda degli issue è enorme, e un PR di circa 1.000 righe che modifica il ciclo principale di generazione è un impegno di revisione non banale. Hanno risposto prontamente nei commenti e si sono dimostrati veramente coinvolti quando hanno esaminato il codice. Non sto lamentandomi — sto documentando.  

Se stai contribuendo a un progetto OSS importante e ti aspetti un rapido merge: aggiusta le tue aspettative. Alcuni mesi sono normali per qualcosa di questa entità. Il codice funziona comunque sul tuo fork per tutto il tempo.  

---  

## Cosa ho realmente ottenuto  

Qualche cosa che non avevo prima:

1. **Un modello mentale reale della ricerca per fasci (beam search)** — non la versione del manuale, ma quella con i casi limite. Come si rompono le cache KV. Perché l'ordinamento a due livelli è importante. Cosa fa realmente `length_penalty` ai punteggi.

2. **Maggiore apprezzamento per la matematica sugli array tipizzati in JS** — implementare `index_select` sugli array tipizzati CPU è un livello basso in un modo che raramente si tocca nel codice web. Va bene, ma non è ciò per cui JavaScript è stato progettato e lo si avverte.

3. **Nuovo rispetto per l'implementazione di riferimento in Python.** La libreria HuggingFace `transformers` è grande e a volte complicata, ma la logica della ricerca per fasci è ben commentata e le decisioni di progettazione sono chiaramente deliberate. Leggerla è stato il modo più veloce per capire cosa dovevo realmente costruire.

4. **Una correzione in circolazione** — anche se non è ancora fusa, esiste, funziona e le persone possono usarla dal branch della PR. Questo è sufficiente.

Il commento TODO che ha iniziato tutto questo è scomparso dal mio fork. È soddisfacente in un modo tranquillo e nerd.

Se stai lavorando a problemi seq2seq in JavaScript e desideri una ricerca per fasci corretta oggi, [la PR è pubblica](https://github.com/huggingface/transformers.js/pull/1539).

¹ Sì, so che `num_beams=1` corrisponde alla ricerca golosa. Il caso degenere è ben definito.

² I modelli a solo encoder (BERT, ecc.) non generano affatto token, quindi nulla di questo li riguarda. Sono solo vibrazioni.
````
