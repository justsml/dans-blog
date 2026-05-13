# Translation Candidate
- Slug: rag-pipeline-failures
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-05--rag-pipeline-failures/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 8.37
- Input tokens: 10882
- Output tokens: 2986
- Thinking tokens: unknown
- Cached input tokens: 5632
- Cache write tokens: 0
- Estimated cost: $0.000962
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2026-05-05--rag-pipeline-failures/it/index.mdx reports/i18n/rag-pipeline-failures/it
## Raw Output

````mdx
---
title: Cinque modi in cui RAG fallisce in produzione
subTitle: La demo ha funzionato. I veri utenti sono il punto debole del pipeline.
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
Il demo di RAG sembra sempre fantastico.

Integri alcuni documenti, avvii un archivio vettoriale, lo colleghi alla chat e osservi il modello citare la tua base di conoscenza interna come se vi lavorasse da anni. Splendido. Gli stakeholder sono impressionati. Qualcuno dice “spediamo questo”.

Sei settimane dopo, gli utenti ricevono risposte sicure ma errate. I ticket di supporto si accumulano. Il sistema *funziona*, solo non nel modo in cui le persone ne hanno bisogno.

Il guasto di solito non è un errore drammatico. Sono cinque errori noiosi accumulati insieme.

---

## 1. I tuoi chunk hanno dimensioni sbagliate
---

Questo errore non provoca un crash. Semplicemente rende ogni risposta leggermente peggiore finché l’intera funzionalità non appare inaffidabile.

La ricerca vettoriale recupera *chunk*, non documenti. Qualunque cosa tu usi per suddividere il materiale di origine diventa l’unità di verità del retriever. Se i chunk sono sbagliati, il modello risponde con i frammenti errati.

**Troppo piccoli**: il chunk contiene solo una parte della risposta. L’embedding coglie l’argomento corretto, ma il testo recuperato manca del contesto. Ottieni “Il timeout massimo è 30 secondi” senza la frase precedente che dice “quando si usa l’API legacy”.

**Troppo grandi**: l’embedding diventa una media sfocata di molte idee. La ricerca semantica si confonde perché il chunk tratta più argomenti contemporaneamente, e il vettore risultante non rappresenta chiaramente nessuno di essi.

La dimensione corretta del chunk dipende interamente dal tuo contenuto. Documentazione tecnica, contratti legali e trascrizioni di supporto richiedono chunk diversi. Non esiste una risposta universale.

Cosa fare: misurare. Costruisci un set di valutazione con coppie domanda/risposta dal tuo corpus. Prova chunk da 256, 512 e 1024 token. Misura la precisione del recupero: il chunk corretto compare tra i primi 5? Imparerai rapidamente che la dimensione del chunk conta più del modello di embedding su cui ti sei tormentato.

Usa anche la sovrapposizione. Un chunk di 512 token con 64 token di sovrapposizione su ciascun lato consente che le risposte che attraversano il confine vengano comunque recuperate. La maggior parte delle librerie vettoriali lo supporta. La maggior parte delle persone lo salta.

---

## 2. I tuoi embedding invecchiano (e non te ne accorgi)

Immagina che la tua azienda cambi brand. O rinomini un prodotto. O aggiorni i prezzi. O deprecichi un’API.

Aggiorni la documentazione ma non ri‑embed i chunk. L’indice vettoriale continua a rappresentare il contenuto vecchio.

Gli utenti chiedono del nuovo prezzo. Gli embedding li indirizzano al contenuto obsoleto. Il modello legge il contenuto vecchio e spiega con sicurezza il prezzo precedente. Il supporto riceve un ticket.

Ogni sistema RAG serio incappa in questo alla fine. La soluzione sembra ovvia – ri‑embed quando il contenuto cambia – ma i team raramente costruiscono quella pipeline prima del primo incidente.

Serve un re‑indicizzazione incrementale con fingerprint del contenuto:

```typescript
import { createHash } from 'crypto';

async function upsertDocument(doc: Document, vectorStore: VectorStore) {
  const fingerprint = createHash('sha256')
    .update(doc.content)
    .digest('hex');

  const existing = await vectorStore.getBySourceId(doc.id);

  if (existing?.fingerprint === fingerprint) {
    return; // Content unchanged, skip re-embedding
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

Re‑indicizza al momento della scrittura, usa il fingerprint sul contenuto, non sui timestamp. I documenti vengono aggiornati nel tuo CMS continuamente senza che il contenuto effettivo cambi.

---

## 3. Precisione vs. Richiamo nella Retrieval: Stai Ottimizzando quello Sbagliato

La maggior parte dei tutorial RAG mostra come recuperare i chunk top‑K. Non spiegano il trade‑off tra due obiettivi che puntano in direzioni opposte.

**Alta richiamo**: Restituisce tutto ciò che potrebbe essere rilevante. Gli utenti ottengono sempre una risposta. Però la finestra di contesto del modello si riempie di rumore tangenzialmente correlato, e il modello allunga le parti mancanti con hallucinationi.

**Alta precisione**: Restituisce solo i chunk più pertinenti. Il modello lavora con un contesto pulito e focalizzato. Tuttavia, se il chunk corretto non è tra i primi 3, il modello non ha l’informazione necessaria e comunque inventa qualcosa con sicurezza.

I sintomi di errore appaiono identici per l’utente: risposte sbagliate. Ma le cause e le correzioni sono opposte.

Due tecniche che realmente funzionano:

**Reranking**: Recupera più candidati (top‑20), poi utilizza un modello cross‑encoder per riordinarli in base alla rilevanza prima di passarli al LLM. I cross‑encoder sono più lenti della similarità vettoriale, ma risultano notevolmente più accurati nella fase finale di ranking.

```typescript
import { Reranker } from '@mastra/rag';

const results = await vectorStore.search(queryEmbedding, { topK: 20 });
const reranked = await reranker.rank(query, results);
const context = reranked.slice(0, 5); // Ora top‑5 ha davvero un significato
```

**Ricerca ibrida**: combina la ricerca vettoriale (similarità semantica) con la ricerca a parole chiave (BM25). Falliscono in modi diversi. La ricerca vettoriale ha difficoltà con termini specifici, nomi di modelli e ID. La ricerca a parole chiave fatica con parafrasi e sinonimi. Insieme, colmano le reciproche zone cieche.

---

## 4. La tua finestra di contesto ha la forma sbagliata

Hai recuperato i chunk giusti. Congratulazioni. Il modello continuerà comunque a sbagliare.

Il problema non è solo cosa recuperi. È dove lo inserisci.

I LLM possono soffrire del problema del “persi nel mezzo”. Liu et al. hanno misurato che i modelli a lungo contesto usano le informazioni rilevanti in modo meno affidabile quando queste compaiono nel mezzo del prompt anziché vicino all’inizio o alla fine.

Se stai infilando 20 chunk in una lista piatta sperando che il modello li sintetizzi correttamente, stai lasciando sul tavolo delle prestazioni.

Coseche realmente aiutano:

**Valuta la posizione di inizio/fine per i tuoi chunk più rilevanti.** Un euristico comune è mettere il più alto classificato per primo, il secondo per ultimo e il resto al centro. Contro‑intuitivo, ma vale la pena testarlo con il tuo modello e la forma del prompt.

**Numerare e etichettare esplicitamente le sezioni di contesto.** `[Source 1]` … `[Source 2]` fornisce al modello degli ancoraggi su cui ragionare.

**Aggiungi un segnale di confidenza del recupero.** Se il tuo punteggio di similarità è 0,65 su una scala 0‑1, comunica al modello: “Il contesto seguente è stato recuperato con confidenza moderata. Riconosci l’incertezza se la risposta non è chiara.”

**Definisci un budget di contesto.** Non passare semplicemente tutto ciò che hai recuperato. Conta i token, priorizza in base al punteggio di rilevanza e taglia rigidamente al 60‑70 % della finestra di contesto del modello. Lascia spazio al modello per ragionare senza sovraccaricare.

Riferimento: [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172).

---

## 5. Non Hai Idea Quando È Sbagliato

Questo è il guasto silenzioso: la risposta arriva, l’interfaccia sembra corretta, ma il contenuto è errato.

Con un’API tradizionale i fallimenti sono visibili: HTTP 500, timeout, errore di validazione dello schema. Lo sai subito. I fallimenti di RAG sono più silenziosi: il sistema restituisce una risposta, sembra plausibile, ma è sbagliata.

Potresti non accorgerti che la tua pipeline RAG sta fallendo finché gli utenti non te lo segnalano. Spesso non lo fanno. Smettono semplicemente di fidarsi e tornano a usare Ctrl + F.

Il setup minimo di osservabilità per un sistema RAG in produzione:

**Registra la catena di recupero.** Ogni query, cosa è stato recuperato (ID dei chunk + punteggi) e cosa ha prodotto il modello. Serve per fare debug di qualsiasi cosa.

**Monitora le metriche di retrieval.** Mean Reciprocal Rank (MRR) e NDCG se disponi di etichette di verità a terra. Al minimo, traccia le distribuzioni dei punteggi di similarità — se il tuo punteggio di recupero al P50 cala, la qualità dell’indice è diminuita.

**Costruisci un ciclo di feedback.** Anche un semplice pollice su/giù sulle risposte, collegato alla query e ai chunk recuperati, fornisce un segnale di addestramento. Senza di esso, operi alla cieca.

**Esegui valutazioni periodiche.** Un set di test di 50‑100 domande con risposte corrette note, eseguito settimanalmente, intercetterà regressioni prima degli utenti. Un foglio di calcolo e uno script bastano per partire.

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

## Il problema reale

Questi fallimenti non riguardano principalmente il modello di embedding o il database vettoriale. Riguardano il sistema che li circonda.

Le demo di RAG funzionano perché le condizioni della demo sono controllate: documenti puliti, domande ben formate, valutatori indulgenti. La produzione fallisce perché nessuna di queste condizioni è presente.

Ogni fallimento sopra è diagnosticabile, ma solo se lo si misura. I team RAG affidabili non fanno nulla di esotico. Trattano la qualità del recupero come un vero sottosistema, non come un artefatto di demo.

Imposta prima il ciclo di valutazione. Tutto il resto diventa più semplice una volta che puoi misurarlo.
````
