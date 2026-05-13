# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/de/index.mdx
- Validation: passed
- Runtime seconds: 11.27
- Input tokens: 4427
- Output tokens: 4543
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.001444
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
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
Es ist 2 Uhr morgens. Der PagerDuty-Alarm schrillt.  

Sie öffnen die Logs und sehen dies:  

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```  

Das ist alles. Kein Funktionsname. Keine Zeilennummer. Kein Dateipfad. Nur „processTicksAndRejections“.  

Willkommen in der Welt asynchronen JavaScript, wo Stack-Traces erfunden sind und Zeilennummern keine Rolle spielen.  

---  
## Warum Stack-Traces fehlschlagen

In synchronem Code ist der Call Stack eine schöne Genealogie. A hat B aufgerufen, B hat C aufgerufen. Wenn C abstürzt, kann man genau sehen, wie man dorthin gelangt ist.  

In asynchronem Code (`async/await`) ist jedes `await`-Schlüsselwort ein Unterbrechungspunkt.  

Beim `await` wird Ihre Funktion vom Stapel abgerissen. Sie wird in ein Kryo-Kühlfach namens Microtask-Warteschlange eingefroren. Der Stapel ist nun leer (oder macht etwas anderes).  

Beim Auflösen des Versprechens wird Ihre Funktion aufgetaut und zurück auf den Stapel geschmissen. Doch die Geschichte ist weg.  

Der Motor weiß nicht, wer `await` vor 500 Millisekunden aufgerufen hat. Er weiß nur, dass er eine Aufgabe ausführen muss.

## V8-Versuche, das Problem zu beheben  

Node.js versucht zu helfen. Wir haben:  

1. `Error.captureStackTrace()`: Fängt den Stapel *zur Erstellungszeit* ein. Nutzlos, wenn der Fehler später geworfen wird.  
2. `--async-stack-traces`: Ein Flag, das Node.js einen „Schattenspeicher“ von Versprechen-Ketten aufrechterhält.  
    * Der Kostenfaktor: Es macht Ihre App um 30 % langsamer.  
    * Das Ergebnis: Es hilft, aber es wird schnell unübersichtlich.  

---  

## Die echte Lösung: AsyncLocalStorage  

Wenn Sie in der Produktion überleben wollen, hören Sie auf, Stapelverfolgungen zu betrachten. Schauen Sie auf Kausalität.

Wir müssen Kontext (User ID, Request ID) zum „Ausführungsfluss“ zuordnen, selbst wenn dieser zwischen dem Stack und der Microtask-Warteschlange wechselt.  

Node.js verfügt über ein eingebautes Tool dafür: `AsyncLocalStorage`.  

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Umschließen Sie die Anfrage
context.run({ requestId: '123' }, () => {
  // 2. Rufen Sie tiefe asynchrone Code auf
  await processOrder();
});

// 3. Tief in processOrder:
async function processOrder() {
  await db.query();
  
  // Zauberei! Wir können die requestId immer noch sehen
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Fehler beim Verarbeiten der Bestellung`);
}
```

Es spielt keine Rolle, wie viele `await`s dazwischen stattfinden. Der Kontext überlebt.  

---

## Playbook für die Produktion  

1.  Vertrauen Sie nicht auf `err.stack`. Es ist per Design unvollständig.  
2.  Nutzen Sie strukturierte Protokollierung. Fügen Sie jedem Protokolleintrag `requestId` hinzu, mithilfe von `AsyncLocalStorage`.  
3.  Verfolgen Sie, statt zu stapeln. Nutzen Sie OpenTelemetry. Es visualisiert die kausale Kette über Dienste hinweg, was Sie tatsächlich interessiert.

Ihr Code ist asynchron. Ihr Debugging-Kontext sollte nicht asynchron sein.
````
