# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/fr/index.mdx
- Validation: deferred
- Runtime seconds: 2.80
- Input tokens: 4652
- Output tokens: 961
- Thinking tokens: unknown
- Cached input tokens: 2432
- Cache write tokens: 0
- Estimated cost: $0.000354
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Traces de pile asynchrones : pourquoi `Error.stack` vous ment'
subTitle: >-
  La file d’attente micro‑tâches a englouti mon devoir (et mon contexte de
  débogage).
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
Il est 2 h du matin. L’alarme PagerDuty hurle.

Vous ouvrez les journaux et voyez ceci :

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

C’est tout. Aucun nom de fonction. Aucun numéro de ligne. Aucun chemin de fichier. Juste « processTicksAndRejections ».

Bienvenue dans le JavaScript asynchrone, où les traces de pile sont inventées et les numéros de ligne n’ont aucune importance.

---

## Pourquoi les traces de pile se cassent

Dans le code synchrone, la pile d’appels est une généalogie élégante. A a appelé B, B a appelé C. Quand C plante, vous voyez exactement comment vous y êtes arrivé.

Dans le code asynchrone (`async/await`), chaque mot‑clé `await` est un point de suspension.

Lorsque vous `await`, votre fonction est arrachée de la pile. Elle est placée dans un congélateur cryogénique appelé la file d’attente des micro‑tâches. La pile est alors vide (ou occupée ailleurs).

Lorsque la promesse se résout, votre fonction est décongelée et re‑insérée dans la pile. Mais l’historique a disparu.

Le moteur n’a aucune idée de qui a appelé `await` il y a 500 millisecondes. Il sait seulement qu’il a une tâche à exécuter.

---

## Les tentatives de V8 pour le corriger

Node.js essaie d’aider. Nous disposons de :

1.  `Error.captureStackTrace()` : capture la pile *à la création*. Inutile si l’erreur est levée plus tard.  
2.  `--async-stack-traces` : un drapeau qui fait que Node.js conserve une « pile d’ombre » des chaînes de promesses.  
    *   **Coût :** cela ralentit votre application d’environ 30 %.  
    *   **Résultat :** cela aide, mais le bruit monte rapidement.

---

## La vraie solution : AsyncLocalStorage

Si vous voulez survivre en production, arrêtez de scruter les traces de pile. Concentrez‑vous sur la causalité.

Il faut attacher le contexte (ID d’utilisateur, ID de requête) au « fil d’exécution », même lorsqu’il saute entre la pile et la file des micro‑tâches.

Node.js propose un outil intégré à cet effet : `AsyncLocalStorage`.

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Enveloppez la requête
context.run({ requestId: '123' }, () => {
  // 2. Appelez du code asynchrone en profondeur
  await processOrder();
});

// 3. Au cœur de processOrder :
async function processOrder() {
  await db.query();
  
  // Magie ! On peut toujours accéder à requestId
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Failed to process order`);
}
```

Peu importe le nombre d’`await` entre les deux ; le contexte persiste.

---

## Guide de production

1.  Cessez de faire confiance à `err.stack`. Il est incomplet par conception.  
2.  Utilisez la journalisation structurée. Ajoutez `requestId` à chaque ligne de log via `AsyncLocalStorage`.  
3.  Tracez, ne stackez pas. Adoptez OpenTelemetry. Il visualise la chaîne causale entre services, ce qui est réellement utile.

Votre code est asynchrone. Votre contexte de débogage ne devrait pas l’être.
````
