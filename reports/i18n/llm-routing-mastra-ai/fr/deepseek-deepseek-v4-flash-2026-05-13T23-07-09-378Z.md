# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: fr
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/fr/index.mdx
- Validation: deferred
- Runtime seconds: 20.62
- Input tokens: 3714
- Output tokens: 3784
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001579
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: N'épousez pas votre modèle
subTitle: 'Le routage LLM, tellement tendance en ce moment'
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
La plupart des équipes d'ingénierie choisissent un modèle de langage et s'y tiennent. Un fournisseur, un modèle, toutes les tâches. C'est comme embaucher une seule personne pour faire votre code, votre rédaction et vos impôts parce qu'elle s'est bien débrouillée lors du premier entretien.

À tout moment, un modèle est meilleur pour le code, un autre pour les contextes longs et désordonnés, et un autre est le cheval de bataille le moins cher et le plus ennuyeux pour la classification. Les noms changent. La forme du problème, non. Traiter un modèle comme s'il excellait dans tout signifie que vous payez trop cher pour des tâches simples ou que vous obtenez des résultats médiocres sur des tâches spécialisées.

J'ai vu une équipe brûler des milliers de dollars en faisant passer l'analyse de sentiment par un modèle à 30 $ par million de tokens alors qu'un modèle à 0,50 $ aurait fait le travail tout aussi bien. Du simple formatage JSON, des tâches de classification basiques, tout passait par leur fournisseur premium. La seule chose qui chauffait était leur facture AWS.

Il y a une meilleure façon, et elle n'est pas particulièrement compliquée.

## Délégation plutôt que dévotion

Et si vous pouviez router les requêtes vers le modèle le mieux adapté à cette tâche spécifique ? Utilisez votre moteur coûteux pour les choses difficiles, mais faites descendre l'analyse et le formatage simples vers quelque chose de moins cher. Obtenez les avantages de plusieurs fournisseurs sans avoir à les jongler manuellement dans votre code.

Mastra vous permet de construire exactement ce genre de système. Vous configurez des agents spécialisés pour différents types de travail, puis créez un agent routeur qui détermine quel spécialiste doit traiter chaque requête. Les identifiants de modèle ci-dessous sont des exemples, pas un classement. Remplacez-les par les modèles actuels qui gagnent vos évaluations et correspondent à votre budget.

Pensez-y comme ceci : vous avez trois spécialistes dans votre équipe.

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

Chacun a un travail. Votre agent de code devrait être le modèle qui réussit vos évaluations de codage spécifiques au dépôt. Votre agent à long contexte devrait être celui qui survit à vos documents réels sans transformer le milieu en soupe. Votre agent général devrait être bon marché, fiable et ennuyeux de la meilleure façon possible.

C'est là que ça devient intéressant. Vous ajoutez un routeur qui agit comme un proxy intelligent :

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

Le routeur lui-même tourne sur un modèle léger, car il ne fait que décider où envoyer le trafic. Vous ne payez pas un tarif premium pour déterminer quel autre modèle premium utiliser. Mesurez aussi ce point : un mauvais routeur transforme silencieusement les économies en mauvaises orientations.

Quand quelqu’un demande une implémentation de tri à bulles, le routeur reconnaît qu’il s’agit de code et le transmet à votre spécialiste code. Une invite d’écriture créative ? Elle part vers le modèle que vous avez choisi pour la voix et la variété. Une question factuelle sur des événements historiques ? Aiguillez-la vers l’agent général, idéalement avec une recherche quand l’actualité ou la citation importe.

## Les avantages pratiques

**L’efficacité des coûts compte plus que vous ne le pensez.** Un petit modèle de routage qui prend des décisions de délégation coûte une fraction de ce que coûterait l’exécution de chaque requête sur votre fournisseur le plus cher. Avec le temps, surtout à l’échelle, cela représente de l’argent réel. Vous ne payez pour l’intelligence lourde que lorsque vous en avez vraiment besoin.

**La qualité s’améliore quand on associe les modèles aux tâches.** Le gagnant change chaque mois, selon la tâche et la forme de l’invite. C’est pourquoi la couche de routage doit dépendre de vos évaluations, pas du modèle qui gagnait sur Twitter la semaine où vous avez écrit l’intégration.

**La résilience devient un bénéfice secondaire.** Quand OpenAI subit l’une de ses pannes périodiques (et ça arrive), votre routeur peut rediriger le trafic vers d’autres fournisseurs. Vous n’êtes pas en rade à attendre qu’une API spécifique revienne en ligne.

Il ne s’agit pas d’être malin pour le plaisir. Il s’agit de construire des systèmes qui ont du sens à la fois financièrement et techniquement. Vous n’utiliseriez pas le même marteau pour chaque tâche de construction, et vous ne devriez probablement pas utiliser le même modèle de langage pour chaque tâche d’IA non plus.

La beauté de cette approche, c’est que votre code applicatif ne change pas. Vous appelez toujours votre agent routeur. La complexité de décider quel modèle utiliser pour quelle tâche réside en un seul endroit, configuré une fois, au lieu d’être dispersée dans votre codebase sous forme de logique conditionnelle.

### Ressources

- [Documentation Mastra.ai](https://mastra.ai/docs)
- [Dépôt GitHub Mastra](https://github.com/mastra-ai/mastra)

## Lire la série

1. **Routage LLM** (Cet article)
2. [Sécurité & Garde-fous](../mastra-security-guardrails)
3. [Intégrations MCP & Outils](../mastra-mcp-tool-integrations)
4. [Workflows & Mémoire](../mastra-workflows-memory)
````
