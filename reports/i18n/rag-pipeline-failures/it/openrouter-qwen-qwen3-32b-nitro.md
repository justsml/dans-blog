# Translation Candidate
- Slug: rag-pipeline-failures
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-05--rag-pipeline-failures/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 105.57
- Input tokens: 10321
- Output tokens: 8637
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.002899
- Pricing source: local-openrouter-estimate
- Note: Command failed: git commit --only -m i18n candidate(it): rag-pipeline-failures via openrouter/qwen/qwen3-32b:nitro -- src/content/posts/2026-05-05--rag-pipeline-failures/it/index.mdx reports/i18n/rag-pipeline-failures/it
## Raw Output

````mdx
---
title: Cinque modi in cui RAG fallisce in produzione
subTitle: La demo ha funzionato. Gli utenti veri sono dove la pipeline fallisce.
date: '2026-05-04'
modified: '2026-05-05'
tags:
  - ai
  - rag
  - vector-search
  - llm
  - production
  - embeddings
  - architecture
category: AI
subCategory: Architecture
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.8
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Il demo RAG sembra sempre fantastico.

Inserisci alcuni documenti, avvii un database vettoriale, lo connetti al chatbot e osservi il modello citare la tua base di conoscenza interna come se ci lavorasse da anni. Bellissimo. I stakeholder sono impressionati. Qualcuno dice "procediamo con il rilascio".

Sei settimane dopo, gli utenti ricevono risposte chiaramente errate. I ticket di supporto si accumulano. Il sistema *funziona*, ma non nel modo in cui le persone ne hanno bisogno.

Il fallimento non è solitamente un errore drammatico. Sono cinque errori noiosi sovrapposti.

---

## 1. I tuoi frammenti hanno la dimensione sbagliata

Questo fallimento non fa crashare il sistema. Rende semplicemente ogni risposta leggermente peggiore finché l'intera funzionalità sembra poco affidabile.

La ricerca vettoriale recupera *frammenti*, non documenti. Qualunque divisione tu abbia scelto per il tuo materiale originale diventa l'unità di verità per il recuperatore. Se i frammenti sono sbagliati, il modello risponde con i frammenti errati.

**Troppo piccoli**: Il frammento contiene una risposta parziale. L'embedding cattura l'argomento giusto, ma il testo recuperato manca di contesto. Recuperi "Il timeout massimo è 30 secondi" senza la frase precedente che dice "quando si utilizza l'API legacy."

**Troppo grandi**: L'embedding diventa una media sfocata di molte idee. La ricerca semantica si confonde perché il frammento parla di molte cose diverse, e il vettore risultante non rappresenta in modo pulito nessuna di esse.

La dimensione giusta dipende interamente dal tuo contenuto. Documenti tecnici, contratti legali e trascrizioni di supporto vengono suddivisi in modi diversi. Non esiste una risposta universale.

Cosa fare: misurare. Crea un insieme di valutazione con domande e risposte tratte dal tuo corpus. Prova frammenti da 256, 512 e 1024 token. Misura la precisione del recupero: il frammento giusto appare tra i primi 5? Imparerai velocemente che la dimensione dei frammenti è più importante del modello di embedding su cui hai perso tempo.

Usa anche l'overlap. Un frammento da 512 token con 64 token di sovrapposizione su ciascun lato significa che le risposte che superano i confini vengono comunque recuperate. La maggior parte delle librerie vettoriali lo supporta. La maggior parte delle persone lo salta.

## 2. I tuoi embedding diventano obsoleti (e non te ne accorgerai)

Immagina che la tua azienda si riqualifichi. O rinomini un prodotto. O aggiorni i prezzi. O deprecate un'API.

Aggiorni la documentazione ma non riesegui l'embedding dei frammenti. L'indice vettoriale rappresenta ancora il contenuto vecchio.

Gli utenti chiedono dei nuovi prezzi. Gli embedding li indirizzano al contenuto vecchio. Il modello legge il contenuto vecchio e spiega con sicurezza i vecchi prezzi. Il supporto riceve una richiesta.

Ogni sistema RAG serio finisce per imbattersi in questo problema. La soluzione sembra ovvia - riembeddare quando il contenuto cambia - ma raramente le squadre costruiscono quel pipeline prima del primo incidente.

Hai bisogno di una riindicizzazione incrementale con impronta del contenuto:

```typescript
import { createHash } from 'crypto';

async function upsertDocument(doc: Document, vectorStore: VectorStore) {
  const fingerprint = createHash('sha256')
    .update(doc.content)
    .digest('hex');

  const existing = await vectorStore.getBySourceId(doc.id);

  if (existing?.fingerprint === fingerprint) {
    return; // Contenuto invariato, salta il riembedding
  }

  const chunks = chunkDocument(doc);
  const embeddings = await embedBatch(chunks);

  await vectorStore.upsert(
    chunks.map((chunk, i) => ({
      id: `${doc.id}:${i}`,
      sourceId: doc.id,
      fingerprint,
      vector: embeddings[i],
      text: chunk.text,
      metadata: { ...doc.metadata, updatedAt: new Date() },
    }))
  );
}
```

Riindicizza in scrittura, usa l'impronta del contenuto, non i timestamp. I documenti vengono aggiornati nel tuo CMS in continuazione senza che il contenuto effettivo cambi.

---

## 3. Precisione vs. Ricchezza: Stai Ottimizzando la Sbagliata

La maggior parte delle tutorial RAG mostra come recuperare i primi-K frammenti. Non spiegano però il compromesso tra due obiettivi che puntano in direzioni opposte.

**Alta ricchezza**: Restituisci tutto ciò che potrebbe essere rilevante. Gli utenti ricevono sempre una risposta. Ma la finestra di contesto del modello è piena di rumore tangenzialmente correlato, e il modello hallucina per riempire gli spazi tra i frammenti.

**Alta precisione**: Restituisci solo i frammenti più rilevanti. Il modello lavora con un contesto pulito e focalizzato. Ma se il frammento giusto non è tra i primi 3, il modello non ha le informazioni e comunque conferisce sicurezza e inventa qualcosa.

Le modalità di fallimento appaiono identiche agli occhi degli utenti: risposte errate. Ma le cause e le soluzioni sono opposte.

Due tecniche che realmente aiutano:

**Reranking**: Recupera più candidati (top-20), quindi utilizza un modello cross-encoder per rirankarli in base alla rilevanza prima di passarli all'LLM. I cross-encoder sono più lenti della similarità vettoriale ma notevolmente più accurati nel ranking finale.

```typescript
import { Reranker } from '@mastra/rag';

const results = await vectorStore.search(queryEmbedding, { topK: 20 });
const reranked = await reranker.rank(query, results);
const context = reranked.slice(0, 5); // Now top-5 actually means something
```

**Hybrid search**: Combina la ricerca vettoriale (similarità semantica) con la ricerca per parole chiave (BM25). Falliscono in modi diversi. La ricerca vettoriale ha difficoltà con termini specifici, nomi di modelli e ID. La ricerca per parole chiave ha difficoltà con la parafrazatura e i sinonimi. Insieme, coprono i punti ciechi reciproci.

## 4. La finestra di contesto ha la forma sbagliata

Hai recuperato i giusti frammenti. Congratulazioni. Il modello comunque sbaglierà.

Il problema non è solo ciò che recuperi. È dove lo metti.

Gli LLM possono riscontrare il problema del "perso nel mezzo". Liu et al. hanno misurato i modelli a lungo contesto che utilizzano l'informazione rilevante in modo meno affidabile quando appare nel mezzo del prompt invece che vicino all'inizio o alla fine.

Se stai stipando 20 frammenti in un elenco piatto e sperando che il modello li sintetizzi correttamente, stai lasciando performance sul tavolo.

Cose che effettivamente aiutano:

**Valuta la posizione iniziale/fine per i tuoi frammenti più rilevanti.** Un'euristica comune è: primo il primo risultato, ultimo il secondo, e il resto al centro. Controintuitivo, ma degno di test rispetto al modello e alla forma del prompt.

**Numerare esplicitamente e etichettare le sezioni di contesto.** `[Fonte 1]` ... `[Fonte 2]` fornisce al modello degli ancoraggi per ragionare.

**Aggiungi un segnale di confidenza del recupero.** Se il tuo punteggio di similarità è 0,65 su una scala 0-1, comunica al modello: "Il seguente contesto è stato recuperato con moderata confidenza. Riconosci l'incertezza se la risposta non è chiara."

**Imposta un budget per il contesto.** Non passare semplicemente tutto ciò che hai recuperato. Conta i token, priorizza per punteggio di rilevanza e taglia drasticamente al 60-70% della finestra di contesto del modello. Lascia spazio al modello per ragionare senza sovraccaricarlo.

Riferimento: [Perduti nel mezzo: Come i modelli linguistici utilizzano contesti lunghi](https://arxiv.org/abs/2307.03172).

## 5. Non sai mai quando è errato  

Questo è il fallimento silenzioso: la risposta viene restituita, l'interfaccia sembra funzionante e il contenuto è sbagliato.  

Con un'API tradizionale, i fallimenti sono visibili: errore HTTP 500, timeout, errore di convalida dello schema. Lo sai immediatamente. I fallimenti di RAG sono più silenziosi: il sistema restituisce una risposta, sembra plausibile eppure è errato.  

Potresti non rendersi conto che la pipeline RAG sta fallendo finché gli utenti non te lo dicono. Spesso non lo fanno. Si limitano a smettere di fidarsi e tornare a usare Ctrl+F.  

La configurazione minima di osservabilità necessaria per un sistema RAG in produzione:

**Registra la catena di recupero.** Per ogni query, cosa è stato recuperato (ID dei chunk + punteggi) e cosa ha prodotto il modello. Ne hai bisogno per debuggare qualsiasi problema.

**Traccia le metriche di recupero.** Mean reciprocal rank (MRR) e NDCG se hai etichette ground-truth. Al minimo, traccia le distribuzioni dei punteggi di similarità — se il tuo punteggio P50 di recupero cala, la qualità dell'indice è calata.

**Costruisci un ciclo di feedback.** Anche un semplice tasto "mi piace"/"non mi piace" sulle risposte, collegato alla query e ai chunk recuperati, ti fornisce un segnale di addestramento. Senza, sei a volare cieco.

**Esegui valutazioni periodiche.** Un set di test di 50-100 domande con risposte corrette note, eseguito settimanalmente, catturerà le regressioni prima che gli utenti lo notino. Un foglio di calcolo e uno script sono sufficienti per iniziare.

```typescript
async function runEval(
  testCases: { query: string; expectedAnswer: string }[],
  pipeline: RAGPipeline
) {
  const results = await Promise.all(
    testCases.map(async ({ query, expectedAnswer }) => {
      const response = await pipeline.query(query);
      const score = await scoreResponse(response, expectedAnswer);
      return { query, score, response };
    })
  );

  const avgScore = results.reduce((s, r) => s + r.score, 0) / results.length;
  console.log(`Eval score: ${(avgScore * 100).toFixed(1)}%`);
  
  // Alert if score drops below threshold
  if (avgScore < 0.75) {
    await notifyTeam(`RAG eval score dropped to ${(avgScore * 100).toFixed(1)}%`);
  }

  return results;
}
```

---

## Il Problema Reale

Questi fallimenti non riguardano principalmente il modello di embedding o il database vettoriale. Riguardano il sistema che li circonda.  

Le dimostrazioni RAG funzionano perché le condizioni della demo sono controllate: documenti puliti, domande ben formulate, valutatori tolleranti. La produzione fallisce perché nessuna di queste condizioni è rispettata.  

Ogni fallimento sopra elencato è diagnosticabile, ma solo se ne stai misurando l'impatto. Le squadre RAG affidabili non stanno facendo nulla di esotico. Trattano la qualità del recupero come un vero sottosistema, non come un artefatto della demo.  

Configura prima il ciclo di valutazione. Tutto il resto sarà più semplice una volta che sarai in grado di misurarlo.
````
