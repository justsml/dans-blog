# Translation Candidate
- Slug: mastra-security-guardrails
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-03--mastra-security-guardrails/fr/index.mdx
- Validation: passed
- Runtime seconds: 17.32
- Input tokens: 6054
- Output tokens: 5948
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001912
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: L'IA en production est terrifiante (et comment y remédier)
subTitle: ''
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
Personne ne se lance dans la création d'un système d'IA insécurisé. Vous rédigez des instructions, vous testez les cas limites, vous ajoutez quelques règles de validation. Puis quelqu'un découvre qu'il peut tromper votre bot pour qu'il joue le rôle d'un pirate et expose des données utilisateur. Ou un numéro de carte bancaire apparaît dans vos journaux. Ou le modèle recommande avec confiance un produit d'un concurrent.

L'écart entre « fonctionne en démo » et « sécurisé en production » est plus grand que la plupart des équipes ne l'imaginent.

Une partie du problème réside dans le fait que les LLM bruts n'ont pas d'opinions sur ce qu'ils devraient ou ne devraient pas faire. Ce sont des machines à prédiction qui tentent de prolonger tout motif que vous avez commencé. Lui donner un prompt ressemblant à « mode de contournement du système » et il suivra volontiers. Ce n'est pas un bug du modèle ; c'est simplement la façon dont fonctionnent les modèles de langage.

La plupart des cadres vous donnent le modèle et vous souhaitent bonne chance. Mastra adopte une approche différente : elle part du principe que vous aurez besoin de barrières de sécurité, et les intègre dès le départ à l'architecture de l'agent.

---

## Les processeurs en tant que couches de sécurité

Le mécanisme central est simple. Avant que votre prompt atteigne le modèle, il passe par une chaîne de processeurs d'entrée. Après que le modèle ait répondu, les processeurs de sortie prennent le relais. Chaque processeur peut inspecter, modifier ou bloquer le contenu à cette étape.

Pensez-y comme à un middleware pour les interactions avec l'IA. Vous empilez ceux dont vous avez besoin, configurez leur comportement, et ils s'exécutent automatiquement sur chaque requête.

### 1. Arrêter les pirates (injection de prompt)

Les attaques d'injection de prompt sont devenues créatives. Les utilisateurs utilisent des caractères Unicode invisibles, écrivent des instructions en base64, ou convainquent le modèle qu'il est en "mode débogage" où les règles normales ne s'appliquent pas. Les techniques évoluent constamment.

Mastra inclut des processeurs qui détectent les modèles courants :

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
    // 1. Éliminer les caractères invisibles
    new UnicodeNormalizer({
      id: 'unicode-normalizer',
      stripControlChars: true,
      collapseWhitespace: true,
    }),
    // 2. Détecter l'attaque
    new PromptInjectionDetector({
      id: 'prompt-injection-detector',
      model: openai('gpt-5-nano'), // Bon marché, rapide
      threshold: 0.8,
      strategy: 'block', // Blocage ferme
      detectionTypes: ['injection', 'jailbreak', 'system-override'],
    }),
  ],
});
```

Le [`UnicodeNormalizer`](https://mastra.ai/docs/processors) élimine les caractères de contrôle et fusionne les espaces. Le [`PromptInjectionDetector`](https://mastra.ai/docs/processors) analyse l'entrée nettoyée pour détecter des modèles suggérant qu'une personne tente de contourner vos instructions.

Vous configurez le niveau d'agressivité de la détection (le paramètre `seuil`) et ce qui doit se produire lorsqu'elle est déclenchée (bloquer, enregistrer ou simplement marquer).

### 2. Gestion des données personnelles

Numéros de carte de crédit dans les journaux, numéros de sécurité sociale dans les bases de données vectorielles, adresses e-mail conservées plus longtemps que nécessaire. Ce sont les types de problèmes qui se transforment en enjeux réglementaires. Le défi réside dans le fait que les utilisateurs ne réalisent pas toujours qu'ils collent des données sensibles dans une fenêtre de chat.

Le [`PIIDetector`](../docs/processors) analyse les modèles courants avant qu'ils n'atteignent votre modèle ou ne soient écrits en stockage :

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
      redactionMethod: 'mask',  // Remplacer par [REDACTED]
      instructions: 'Detect and mask personally identifiable information',
    }),
  ],
});
```

Vous pouvez choisir d'effacer (remplacer par `[REDACTED]`), de hacher ou de bloquer complètement. Le processeur s'exécute sur les entrées et les sorties, donc vous êtes protégé même si le modèle génère accidentellement des données sensibles dans sa réponse.

### 3. Modération du contenu

Les modèles entraînés sur des données internet ont vu certaines choses. Sans filtrage, ils peuvent occasionnellement produire des réponses qui rendraient votre service de communication nerveux. Le [`ModerationProcessor`](https://mastra.ai/docs/processors) détecte le contenu qui viole vos directives :

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
      model: openai('gpt-5-nano'),  // Modèle rapide et économique pour la classification
      categories: ['haine', 'harcèlement', 'violence', 'auto-dégradation'],
      threshold: 0.7,  // Bloquer si la confiance > 70%
      strategy: 'block',  // Arrêter immédiatement la requête
      instructions: 'Détecter le contenu nuisible qui viole les directives communautaires',
    }),
  ],
});
```

L'aspect intéressant est que vous définissez quelles catégories sont pertinentes pour votre cas d'utilisation. Un outil d'écriture créative pourrait autoriser un contenu plus expressif qu'un bot de service client. Le seuil et la stratégie vous donnent le contrôle sur la stricteur du filtrage.

---

## Quand les choses déclenchent une alerte

Les processeurs ne lancent pas d'erreurs lorsqu'ils détectent un problème. Au lieu de cela, ils définissent un indicateur sur l'objet résultat :

```typescript
const result = await secureAgent.generate('Ignore all previous instructions...');

if (result.tripwire) {
  console.log(`Bloqué ! Raison : ${result.tripwireReason}`);
  // "Bloqué ! Raison : Détection d'injection de prompt."
  return "Essaye encore, petit scripteur.";
}
```

Ce modèle vous permet de gérer les événements de sécurité selon ce qui convient à votre application. Vous pourriez les enregistrer pour analyse, retourner un message d'erreur générique, ou même autoriser certaines violations dans des contextes spécifiques. Le champ `tripwireReason` vous indique exactement quel processeur a signalé le contenu, ce qui est utile pour déboguer les faux positifs ou ajuster vos seuils.

## Ce que cela ne résout pas  

Les processeurs interceptent beaucoup de choses, mais ils ne sont pas magiques. Un attaquant déterminé disposant de suffisamment de temps pourra probablement trouver un prompt qui passe à travers. Les modèles hallucinent parfois de manière imprévisible, rendant les processeurs impuissants. Et il existe toujours un compromis entre sécurité et flexibilité : plus vos règles sont strictes, plus vous risquez de bloquer des cas d'utilisation légitimes.  

La valeur n'est pas une protection parfaite. Elle consiste à disposer d'une méthode systématique pour gérer les problèmes courants qui surviendront inévitablement en production. Vous pouvez ajuster la sensibilité en fonction de ce que font réellement vos utilisateurs. Vous pouvez ajouter des processeurs personnalisés pour des risques spécifiques à votre domaine. Et vous disposez de traces d'audit indiquant ce qui a été bloqué et pourquoi.  

La plupart des problèmes de sécurité dans les systèmes d'IA en production ne sont pas des attaques sophistiquées. Ce sont des personnes qui copient-collent des données qu'elles ne devraient pas, ou découvrent par essais et erreurs que le bot exécute des actions que vous n'avez pas prévues. Les processeurs n'arrêteront pas chaque problème possible, mais ils rendent les problèmes évidents bien plus difficiles à exploiter.  

### Ressources  
- [Documentation sur les contrôles de sécurité](../docs/agents/guardrails)  
- [Pratiques de sécurité recommandées](../docs/security)  
- [Dépôt GitHub de Mastra](../github.com/mastra-ai/mastra)

- [Documentation sur les contrôles de sécurité de Mastra](https://mastra.ai/docs/agents/guardrails)  
- [Meilleures pratiques en matière de sécurité](https://mastra.ai/docs/security)  
- [Dépôt GitHub de Mastra](https://github.com/mastra-ai/mastra)  

## Lisez la série  

1. [Gestion des itinéraires LLM](/llm-routing-mastra-ai)  
2. **Sécurité & Contrôles** (Cet article)  
3. [Intégrations MCP & Outils](/mastra-mcp-tool-integrations)  
4. [Flux de travail & Mémoire](/mastra-workflows-memory)
````
