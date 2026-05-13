# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/de/index.mdx
- Validation: deferred
- Runtime seconds: 5.79
- Input tokens: 4640
- Output tokens: 938
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000350
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Asynchrone Stack‑Traces: Warum `Error.stack` Sie täuscht'
subTitle: >-
  Die Microtask‑Warteschlange hat meine Hausaufgaben (und meinen
  Debugging‑Kontext) gefressen.
date: '2025-12-29'
modified: '2025-12-30'
tags:
  - javascript
  - async
  - debugging
  - node.js
  - v8
  - performance
category: Code
subCategory: Best Practices
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Es ist 2 Uhr morgens. Der PagerDuty‑Alarm heult.

Sie öffnen die Logs und sehen Folgendes:

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

Das war’s. Kein Funktionsname. Keine Zeilennummer. Kein Dateipfad. Nur „processTicksAndRejections“.

Willkommen bei async JavaScript, wo Stack‑Traces erfunden sind und Zeilennummern keine Rolle spielen.

## Warum Stack‑Traces versagen

Im synchronen Code ist der Aufruf‑Stack eine schöne Genealogie. A ruft B auf, B ruft C auf. Wenn C abstürzt, sieht man exakt, wie man dort gelandet ist.

Im async‑Code (`async/await`) ist jedes Schlüsselwort `await` ein Suspendierungspunkt.

Wenn Sie `await` verwenden, wird Ihre Funktion vom Stack getrennt. Sie landet in einem kryogenen Gefrierschrank, der Microtask‑Queue. Der Stack ist jetzt leer (oder beschäftigt sich mit etwas anderem).

Wenn das Promise aufgelöst wird, wird Ihre Funktion wieder aufgetaut und zurück auf den Stack geschmissen. Doch die Historie ist verloren.

Der Motor hat keine Ahnung, wer vor 500 Millisekunden `await` aufgerufen hat. Er weiß lediglich, dass er eine Aufgabe zu erledigen hat.

---

## V8‑Versuche, das Problem zu beheben

Node.js versucht zu unterstützen. Wir haben:

1.  `Error.captureStackTrace()`: Erfasst den Stack *bei der Erstellung*. Nutzlos, wenn der Fehler später geworfen wird.
2.  `--async-stack-traces`: Ein Schalter, der Node.js veranlasst, einen „Schatten‑Stack“ von Promise‑Ketten zu führen.
    *   **Kosten:** Verlangsamt die Anwendung um etwa 30 %.
    *   **Ergebnis:** Hilft, erzeugt aber schnell viel Rauschen.

---

## Die eigentliche Lösung: AsyncLocalStorage

Wenn Sie in der Produktion überleben wollen, hören Sie auf, Stack‑Traces zu betrachten. Betrachten Sie die Kausalität.

Wir müssen Kontext (Benutzer‑ID, Anfragen‑ID) an den „Thread“ der Ausführung anhängen, selbst wenn er zwischen Stack und Microtask‑Queue springt.

Node.js bietet dafür ein eingebautes Werkzeug: `AsyncLocalStorage`.

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Wrap the request
context.run({ requestId: '123' }, () => {
  // 2. Call deep async code
  await processOrder();
});

// 3. Deep inside processOrder:
async function processOrder() {
  await db.query();
  
  // Magic! We can still see the requestId
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Failed to process order`);
}
```

Es spielt keine Rolle, wie viele `await`s dazwischen liegen. Der Kontext bleibt erhalten.

---

## Produktions‑Playbook

1.  Vertrauen Sie nicht mehr auf `err.stack`. Er ist per Design unvollständig.  
2.  Nutzen Sie strukturierte Logs. Hängen Sie `requestId` an jede einzelne Log‑Zeile mittels `AsyncLocalStorage`.  
3.  Tracen statt stapeln. Setzen Sie OpenTelemetry ein. Es visualisiert die Kausalkette über Services hinweg – genau das, was Sie benötigen.

Ihr Code ist asynchron. Ihr Debug‑Kontext sollte es nicht sein.
````
