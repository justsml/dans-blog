# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/fr/index.mdx
- Validation: passed
- Runtime seconds: 1.93
- Input tokens: 4452
- Output tokens: 1702
- Thinking tokens: unknown
- Cached input tokens: 1536
- Cache write tokens: 0
- Estimated cost: $0.000480
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Ne mariez pas votre modèle
subTitle: 'Routage LLM, très tendance'
date: '2026-01-02'
modified: '2026-01-08'
tags:
  - ai
  - llm
  - typescript
  - mastra
  - agent-orchestration
category: AI
subCategory: Engineering
social_image: ../mobile-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
La plupart des équipes d’ingénierie choisissent un modèle de langage et s’y tiennent. Un fournisseur, un modèle, toutes les tâches. C’est comme n’embaucher qu’une seule personne pour faire votre codage, votre rédaction et vos déclarations fiscales parce qu’elle a bien réussi le premier entretien.

À un moment donné, un modèle est meilleur pour le code, un autre gère mieux les contextes longs et désordonnés, et un troisième est le cheval de bataille bon marché pour la classification. Les noms changent. La nature du problème ne change pas. Considérer qu’un seul modèle excelle dans tout signifie que vous payez trop cher pour des tâches simples ou que vous obtenez des résultats médiocres sur des cas spécialisés.

J’ai vu une équipe brûler des milliers de dollars en exécutant une analyse de sentiment avec un modèle à 30 $ par million de tokens alors qu’un modèle à 0,50 $ aurait fait le travail tout aussi bien. Formatage JSON simple, tâches de classification de base, tout passait par leur fournisseur premium. La seule chose qui chauffait, c’était leur facture AWS.

Il existe une meilleure approche, et elle n’est pas particulièrement compliquée.

## Délégation plutôt que dévotion

Et si vous pouviez acheminer les requêtes vers le modèle réellement le plus adapté à chaque tâche ? Utilisez votre puissant modèle coûteux pour les problèmes difficiles, mais confiez le parsing et le formatage simples à quelque chose de moins cher. Vous bénéficiez des atouts de plusieurs fournisseurs sans devoir les gérer manuellement dans votre base de code.

Mastra vous permet de construire exactement ce type de système. Vous définissez des agents spécialistes pour différents types de travail, puis créez un agent routeur qui détermine quel spécialiste doit traiter chaque requête. Les identifiants de modèle ci‑dessous sont des exemples, pas un classement. Remplacez‑les par les modèles actuels qui réussissent vos évaluations et correspondent à votre budget.

Imaginez cela : vous avez trois spécialistes dans votre équipe.

```typescript
// ./src/mastra/index.ts
import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';

export const claudeAgent = new Agent({
  id: 'claude-agent',
  instructions: 'You are an expert engineer. Write bugs? You are fired.',
  model: anthropic(process.env.CODE_MODEL ?? 'claude-sonnet-4-5'),
});

export const geminiAgent = new Agent({
  id: 'gemini-agent',
  instructions: 'You are a creative writer. Be weird.',
  model: google(process.env.LONG_CONTEXT_MODEL ?? 'gemini-3-pro-preview'),
});

export const gptAgent = new Agent({
  id: 'gpt-agent',
  instructions: 'You are a helpful assistant. Be boring.',
  model: openai(process.env.GENERAL_MODEL ?? 'gpt-5.2'),
});
```

Chaque agent a un rôle. Votre agent de code doit être le modèle qui réussit vos évaluations de codage propres au dépôt. Votre agent à long contexte doit être celui qui peut traiter vos documents réels sans transformer le milieu en bouillie. Votre agent général doit être bon marché, fiable et ennuyeux de la meilleure façon possible.

C’est là que ça devient intéressant. Vous ajoutez un routeur qui agit comme un proxy intelligent :

```typescript
export const routerAgent = new Agent({
  id: 'router-agent',
  name: 'The Boss',
  instructions: `You are an intelligent router.
  - Coding -> Claude
  - Poetry -> Gemini
  - Facts -> GPT

  Do not do the work yourself. Delegate.`,
  model: openai(process.env.ROUTER_MODEL ?? 'gpt-5-mini'), // Use a cheap model for routing!
  agents: {
    claudeAgent,
    geminiAgent,
    gptAgent,
  },
});

export const mastra = new Mastra({
  agents: { routerAgent, claudeAgent, geminiAgent, gptAgent },
});
```

Le routeur lui‑même s’exécute sur un modèle léger parce qu’il se contente de décider où envoyer le trafic. Vous ne payez pas de tarifs premium pour déterminer quel autre modèle premium utiliser. Mesurez cela également ; un mauvais routeur transforme silencieusement les économies en mauvais aiguillages.

Lorsqu’une personne demande une implémentation de tri à bulles, le routeur la reconnaît comme du travail de code et la confie à votre spécialiste du code. Un prompt d’écriture créative ? Il est dirigé vers le modèle que vous avez choisi pour le ton et l’étendue. Une question factuelle sur des événements historiques ? Il est routé vers l’agent général, idéalement avec récupération lorsque la fraîcheur ou la citation est importante.

## Les avantages pratiques

**L’efficacité des coûts compte plus que vous ne le pensez.** Un petit modèle de routage qui prend les décisions de délégation coûte une fraction de ce que représente le passage de chaque requête par votre fournisseur le plus cher. À long terme, surtout à grande échelle, cela se traduit en argent réel. Vous ne payez l’intelligence lourde que lorsque vous en avez réellement besoin.

**La qualité s’améliore quand vous associez les modèles aux tâches.** Le gagnant change selon le mois, la tâche et la forme du prompt. C’est pourquoi la couche de routage doit se baser sur vos évaluations, et non sur le modèle qui faisait le buzz sur Twitter la semaine où vous avez écrit l’intégration.

**La résilience devient un bénéfice secondaire.** Lorsque OpenAI subit l’une de ses pannes périodiques (et cela arrive), votre routeur peut rediriger le trafic vers d’autres fournisseurs. Vous n’êtes pas à la dérive en attendant qu’une API spécifique revienne en ligne.

Il ne s’agit pas d’être ingénieux pour le plaisir. Il s’agit de construire des systèmes qui ont du sens à la fois financièrement et techniquement. Vous n’utiliseriez pas le même marteau pour chaque tâche de construction, et vous ne devriez probablement pas non plus employer le même modèle de langage pour chaque tâche d’IA.

Le point fort de cette approche, c’est que votre code d’application ne change pas. Vous continuez simplement à appeler votre agent routeur. La complexité du choix du modèle à utiliser pour chaque tâche réside en un seul endroit, configurée une fois, plutôt que dispersée dans votre base de code sous forme de multiples conditions.

### Ressources

- [Documentation Mastra.ai](https://mastra.ai/docs)
- [Dépôt GitHub Mastra](https://github.com/mastra-ai/mastra)

## Lire la série

1. **Routage LLM** (Cet article)
2. [Sécurité & garde-fous](../mastra-security-guardrails)
3. [MCP & intégrations d’outils](../mastra-mcp-tool-integrations)
4. [Flux de travail & mémoire](../mastra-workflows-memory)
````
