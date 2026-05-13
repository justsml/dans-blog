# Translation Candidate
- Slug: async-stack-traces-why-error-stack-lies-in-production
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/fr/index.mdx
- Validation: passed
- Runtime seconds: 9.73
- Input tokens: 4542
- Output tokens: 3786
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001272
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Traces de pile asynchrones : pourquoi `Error.stack` vous trompe'
subTitle: La file de microtâches a dévoré mes devoirs (et mon contexte de débogage).
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
Il est 2 heures du matin. L'alarme PagerDuty retentit.

Vous ouvrez les journaux et vous trouvez ceci :

```
Error: Cannot read properties of undefined (reading 'id')
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
```

C'est tout. Aucun nom de fonction. Aucun numéro de ligne. Aucun chemin de fichier. Juste "processTicksAndRejections".

Bienvenue dans le JavaScript asynchrone, où les traces d'empilement sont inventées et les numéros de ligne n'ont pas d'importance.

---

## Pourquoi les traces d'empilement échouent

Dans le code synchrone, la Pile d'appel est une belle généalogie. A a appelé B, B a appelé C. Quand C plante, vous pouvez voir exactement comment vous y êtes arrivé.

Dans le code asynchrone (`async/await`), chaque mot-clé `await` est un point de suspension.

Quand vous `await`, votre fonction est arrachée de la pile. Elle est mise dans un congélateur cryogénique appelé la File de microtâches. La pile est désormais vide (ou en train de faire autre chose).

Quand la Promise se résout, votre fonction est décongelée et jetée de nouveau sur la pile. Mais l'historique a disparu.

Le moteur n'a aucune idée de qui a appelé `await` il y a 500 millisecondes. Il sait juste qu'il a une tâche à exécuter.

## Les Tentatives de V8 pour y Remédier

Node.js tente d'aider. Nous avons :

1.  `Error.captureStackTrace()` : Capture la pile *au moment de la création*. Inutile si l'erreur est levée plus tard.
2.  `--async-stack-traces` : Un drapeau qui pousse Node.js à conserver une "pile fantôme" des chaînes de promesses.
    *   Le Coût : Ralentit votre application de 30 %.
    *   Le Résultat : Cela aide, mais le bruit devient rapidement insoutenable.

---

## La Vraie Solution : AsyncLocalStorage

Si vous voulez survivre en production, arrêtez de regarder les traces de pile. Regardez la causalité.

Nous devons attacher un contexte (ID utilisateur, ID de requête) au "fil d'exécution", même lorsqu'il saute entre la Pile et la File de microtâches.

Node.js dispose d'un outil intégré pour cela : `AsyncLocalStorage`.

```javascript
import { AsyncLocalStorage } from 'async_hooks';

const context = new AsyncLocalStorage();

// 1. Envelopper la requête
context.run({ requestId: '123' }, () => {
  // 2. Appeler du code asynchrone profond
  await processOrder();
});

// 3. En profondeur dans processOrder :
async function processOrder() {
  await db.query();
  
  // Magie ! Nous pouvons toujours voir l'ID de requête
  const { requestId } = context.getStore();
  console.log(`[${requestId}] Échec du traitement de la commande`);
}
```

Le nombre d'`await` intermédiaires n'a aucune importance. Le contexte survit.

---

## Playbook Production

1.  Arrêtez de faire confiance à `err.stack`. Il est conçu pour être incomplet.
2.  Utilisez un journalisation structurée. Attachez `requestId` à chaque ligne de journal avec `AsyncLocalStorage`.
3.  Tracez, ne pilez pas. Utilisez OpenTelemetry. Il visualise la chaîne de causalité entre les services, ce qui est réellement important.

Votre code est asynchrone. Le contexte de débogage ne devrait pas l'être.
````
