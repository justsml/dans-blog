# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/fr/index.mdx
- Validation: deferred
- Runtime seconds: 2.82
- Input tokens: 6709
- Output tokens: 2406
- Thinking tokens: unknown
- Cached input tokens: 2944
- Cache write tokens: 0
- Estimated cost: $0.000695
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: L'IA en production fait peur (et comment y remédier)
subTitle: 'Si votre agent n’a pas de garde‑fous, vous n’êtes pas prêt pour la production.'
date: '2026-01-03'
modified: '2026-01-08'
tags:
  - ai
  - security
  - mastra
  - guardrails
  - privacy
  - pii
category: AI
subCategory: Security
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Personne ne veut créer un système d’IA dangereux. Vous rédigez les consignes, vous testez les cas limites, vous ajoutez quelques règles de validation. Puis quelqu’un découvre comment faire jouer votre bot en pirate et exposer les données des utilisateurs. Ou un numéro de carte bancaire se retrouve dans vos journaux. Ou le modèle recommande avec assurance le produit d’un concurrent.

L’écart entre « ça fonctionne dans la démo » et « c’est sûr en production » est plus grand que la plupart des équipes l’imaginent.

Une partie du problème vient du fait que les LLM bruts n’ont aucune opinion sur ce qu’ils doivent ou ne doivent pas faire. Ce sont des machines de prédiction qui essaient de poursuivre le motif que vous avez amorcé. Donnez‑leur une invite qui ressemble à « mode de surcharge système », et ils joueront volontiers le jeu. Ce n’est pas un bug du modèle ; c’est simplement le fonctionnement des modèles de langage.

La plupart des frameworks vous remettent le modèle en vous souhaitant bonne chance. Mastra adopte une approche différente : il part du principe que vous aurez besoin de garde‑fous, alors il les intègre dès le départ dans l’architecture de l’agent.

## Processors comme couches de sécurité

Le mécanisme de base est simple. Avant que votre invite n’atteigne le modèle, elle passe par une chaîne de processeurs d’entrée. Après la réponse du modèle, les processeurs de sortie prennent le relais. Chaque processeur peut inspecter, modifier ou bloquer le contenu à ce stade.

Considérez‑les comme du middleware pour les interactions IA. Vous empilez ceux dont vous avez besoin, configurez leur comportement, et ils s’exécutent automatiquement à chaque requête.

### 1. Arrêter les pirates (Injection d’invite)

Les attaques par injection d’invite sont devenues créatives. Les gens utilisent des caractères Unicode invisibles, écrivent des consignes en base64, ou convainquent le modèle qu’il est en « mode débogage » où les règles normales ne s’appliquent pas. Les techniques continuent d’évoluer.

Mastra inclut des processeurs qui capturent les motifs courants :

```typescript
// src/mastra/agents/secure-agent.ts
import { Agent } from '@mastra/core/agent';
import { PromptInjectionDetector, UnicodeNormalizer } from '@mastra/core/processors';
import { openai } from '@ai-sdk/openai';

export const secureAgent = new Agent({
  id: 'fortress-assistant',
  name: 'fortress-assistant',
  instructions: 'You are a secure assistant.',
  model: openai('gpt-5'),
  inputProcessors: [
    // 1. Scrub invisible characters
    new UnicodeNormalizer({
      id: 'unicode-normalizer',
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Detect the attempt
    new PromptInjectionDetector({
      id: 'prompt-injection-detector',
      model: openai('gpt-5-nano'), // Cheap, fast
      threshold: 0.8,
      strategy: 'block', // Hard stop
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
    }),
  ],
});
```

Le [`UnicodeNormalizer`](https://mastra.ai/docs/processors) supprime les caractères de contrôle et compresse les espaces. Le [`PromptInjectionDetector`](https://mastra.ai/docs/processors) analyse l’entrée nettoyée à la recherche de motifs indiquant qu’une personne tente de contourner vos instructions.

Vous configurez le niveau d’agressivité de la détection (paramètre `threshold`) et ce qui doit se produire lorsqu’il se déclenche (blocage, journalisation ou simple signalement).

### 2. Gestion des PII

Numéros de carte bancaire dans les journaux, numéros de sécurité sociale dans les bases vectorielles, adresses e‑mail conservées plus longtemps que nécessaire. Ce sont les types de problèmes qui se transforment en contraintes réglementaires. Le défi, c’est que les utilisateurs ne réalisent pas toujours qu’ils collent des données sensibles dans une fenêtre de chat.

Le [`PIIDetector`](https://mastra.ai/docs/processors) recherche les motifs courants avant qu’ils n’atteignent votre modèle ou ne soient écrits en stockage :

```typescript
import { PIIDetector } from '@mastra/core/processors';

export const privateAgent = new Agent({
  id: 'privacy-first-assistant',
  name: 'privacy-first-assistant',
  instructions: 'You are a helpful assistant that never stores personal information.',
  model: openai('gpt-5'),
  inputProcessors: [
    new PIIDetector({
      id: 'pii-detector',
      model: openai('gpt-5-nano'),
      detectionTypes: ['email', 'phone', 'credit-card', 'ssn'],
      threshold: 0.6,
      strategy: 'redact',
      redactionMethod: 'mask',  // Replace with [REDACTED]
      instructions: 'Detect and mask personally identifiable information',
    }),
  ],
});
```

Vous pouvez choisir de masquer (remplacer par `[REDACTED]`), de hacher ou de bloquer complètement. Le processeur s’exécute sur l’entrée comme sur la sortie, de sorte que vous êtes couvert même si le modèle génère accidentellement des données sensibles dans sa réponse.

### 3. Modération de contenu

Les modèles entraînés sur des données Internet ont vu des choses. Sans filtrage, ils peuvent parfois produire des réponses qui mettraient votre équipe de relations publiques mal à l’aise. Le [`ModerationProcessor`](https://mastra.ai/docs/processors) intercepte le contenu qui enfreint vos consignes :

```typescript
import { ModerationProcessor } from '@mastra/core/processors';

export const moderatedAgent = new Agent({
  id: 'safe-assistant',
  name: 'safe-assistant',
  instructions: 'You are a helpful assistant for a community platform.',
  model: openai('gpt-5'),
  inputProcessors: [
    new ModerationProcessor({
      id: 'moderation-processor',
      model: openai('gpt-5-nano'),  // Fast, cheap model for classification
      categories: ['hate', 'harassment', 'violence', 'self-harm'],
      threshold: 0.7,  // Block if confidence > 70%
      strategy: 'block',  // Stop the request immediately
      instructions: 'Detect harmful content that violates community guidelines',
    }),
  ],
});
```

L’aspect intéressant, c’est que vous définissez les catégories qui comptent pour votre cas d’usage. Un outil d’écriture créative pourra autoriser un contenu plus expressif qu’un bot de service client. Le seuil et la stratégie vous donnent le contrôle sur le degré de sévérité du filtrage.

---

## Quand les choses déclenchent

Les processeurs ne lèvent pas d’erreur lorsqu’ils détectent un problème. À la place, ils placent un drapeau sur l’objet résultat :

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Blocked! Reason: ${result.tripwireReason}`);
  // "Blocked! Reason: Prompt injection detected."
  return "Nice try, script kiddie.";
}
```

Ce schéma vous permet de gérer les événements de sécurité de la façon qui a du sens pour votre application. Vous pouvez les consigner pour analyse, renvoyer un message d’erreur générique, ou même autoriser certaines violations dans des contextes spécifiques. Le champ `tripwireReason` indique exactement quel processeur a signalé le contenu, ce qui aide lors du débogage des faux positifs ou du réglage des seuils.

---

## Ce que cela ne résout pas

Les processeurs interceptent beaucoup de choses, mais ce n’est pas de la magie. Un attaquant déterminé, disposant de suffisamment de temps, pourra probablement trouver une invite qui passe à travers. Les modèles hallucinent parfois de façon que les processeurs ne peuvent pas anticiper. Et il y a toujours un compromis entre sécurité et flexibilité : plus vos règles sont strictes, plus vous risquez de bloquer des cas d’usage légitimes.

La valeur n’est pas une protection parfaite. Il s’agit d’avoir une méthode systématique pour gérer les problèmes courants qui apparaîtront inévitablement en production. Vous pouvez ajuster la sensibilité au fur et à mesure que vous apprenez ce que font réellement vos utilisateurs. Vous pouvez ajouter des processeurs personnalisés pour des risques spécifiques à votre domaine. Et vous disposez de traces d’audit montrant ce qui a été bloqué et pourquoi.

La plupart des problèmes de sécurité dans l’IA en production ne sont pas des attaques sophistiquées. Il s’agit souvent de personnes qui copient‑collent des données qu’elles ne devraient pas, ou qui découvrent par essais et erreurs que le bot exécute des actions non prévues. Les processeurs n’empêcheront pas chaque problème possible, mais ils rendent les cas évidents beaucoup plus difficiles à exploiter.

### Ressources

- [Mastra Guardrails Documentation](https://mastra.ai/docs/agents/guardrails)
- [Security Best Practices](https://mastra.ai/docs/security)
- [Mastra GitHub Repository](https://github.com/mastra-ai/mastra)

## Lire la série

1. [LLM Routing](../llm-routing-mastra-ai)
2. **Sécurité & garde-fous** (Cet article)
3. [MCP & Tool Integrations](../mastra-mcp-tool-integrations)
4. [Workflows & Memory](../mastra-workflows-memory)
````
