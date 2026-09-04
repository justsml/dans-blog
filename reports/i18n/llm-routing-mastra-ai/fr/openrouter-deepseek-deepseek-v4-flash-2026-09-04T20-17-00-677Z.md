# Translation Candidate
- Slug: llm-routing-mastra-ai
- Locale: fr
- Model: openrouter/deepseek/deepseek-v4-flash
- Target: src/content/posts/2026-01-02--llm-routing-mastra-ai/fr/index.mdx
- Validation: deferred
- Runtime seconds: 28.34
- Input tokens: 3920
- Output tokens: 3174
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.001297
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: 'Routage LLM, tellement tendance'
modified: '2026-09-04'
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
La plupart des équipes d'ingénierie choisissent un modèle de langage et s'y tiennent. Un fournisseur, un modèle, toutes les tâches. C'est comme embaucher une seule personne pour coder, rédiger des textes et faire vos impôts parce qu'elle s'est avérée bonne lors du premier entretien.

À tout moment, un modèle est meilleur pour le code, un autre pour les contextes longs et désordonnés, et un autre est le cheval de bataille le moins cher pour de la classification. Les noms changent. La forme du problème, non. Traiter un modèle comme s'il excellait en tout revient soit à payer trop cher pour des tâches simples, soit à obtenir des résultats médiocres sur des tâches spécialisées.

J'ai vu une équipe brûler des milliers de dollars en faisant passer de l'analyse de sentiment par un modèle à 30 dollars par million de tokens, alors qu'un modèle à 0,50 dollar aurait fait le travail tout aussi bien. Du JSON simple, des tâches de classification basiques, tout passait par leur fournisseur premium. La seule chose qui s'échauffait, c'était leur facture AWS.

Il y a une meilleure façon, et elle n'est pas particulièrement compliquée.

## Délégation plutôt que dévotion

Et si vous pouviez router les requêtes vers le modèle le mieux adapté à cette tâche spécifique ? Utilisez votre moteur coûteux pour les trucs durs, mais confiez l'analyse syntaxique simple et le formatage à quelque chose de moins cher. Obtenez les avantages de plusieurs fournisseurs sans avoir à les jongler manuellement dans votre codebase.

Mastra vous permet de construire exactement ce genre de système. Vous configurez des agents spécialisés pour différents types de travail, puis vous créez un agent superviseur qui détermine quel spécialiste doit traiter chaque requête. Les ID de modèle ci-dessous utilisent le format de chaîne `fournisseur/modèle` actuel de Mastra ; ce sont des exemples, pas un classement. Remplacez-les par les modèles actuels qui gagnent vos évaluations et correspondent à votre budget.

Considérez cela comme une équipe de trois spécialistes.

```typescript
// ./src/mastra/index.ts
import { Mastra } from '@mastra/core/mastra';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

export const claudeAgent = new Agent({
  id: 'claude-agent',
  description: 'Gère l’implémentation, le refactoring et la revue de code.',
  instructions: 'Vous êtes un ingénieur expert. Vous écrivez des bugs ? Vous êtes viré.',
  model: process.env.CODE_MODEL ?? 'anthropic/claude-sonnet-4-6',
});

export const geminiAgent = new Agent({
  id: 'gemini-agent',
  description: 'Gère la synthèse de longs contextes et l’analyse de documents désordonnés.',
  instructions: 'Vous êtes un écrivain créatif. Soyez étrange.',
  model: process.env.LONG_CONTEXT_MODEL ?? 'google/gemini-2.5-pro',
});

export const gptAgent = new Agent({
  id: 'gpt-agent',
  description: 'Gère la classification de routine, le formatage et les questions-réponses générales.',
  instructions: 'Vous êtes un assistant serviable. Soyez ennuyeux.',
  model: process.env.GENERAL_MODEL ?? 'openai/gpt-5-mini',
});
```

Chacun a un rôle, et le champ `description` fait partie de la surface de routage. Votre agent de code devrait être le modèle qui réussit vos évaluations de codage spécifiques au dépôt. Votre agent de long contexte devrait être celui qui survit à vos documents réels sans transformer le milieu en soupe. Votre agent général devrait être bon marché, fiable et ennuyeux de la meilleure des manières.

C'est là que ça devient intéressant. Vous ajoutez un superviseur léger qui agit comme un proxy intelligent :

```typescript
export const supervisorAgent = new Agent({
  id: 'supervisor-agent',
  name: 'Le Patron',
  instructions: `Vous acheminez le travail vers le bon spécialiste.
  Déléguez le travail de codage à claude-agent.
  Déléguez le travail de document long contexte à gemini-agent.
  Déléguez la classification de routine et le formatage à gpt-agent.
  Ne faites pas vous-même le travail du spécialiste à moins que la délégation ne soit inutile.`,
  model: process.env.ROUTER_MODEL ?? 'openai/gpt-5-mini',
  agents: {
    claudeAgent,
    geminiAgent,
    gptAgent,
  },
  memory: new Memory({
    storage: new LibSQLStore({ id: 'router-memory', url: 'file:mastra.db' }),
  }),
});

export const mastra = new Mastra({
  agents: { supervisorAgent, claudeAgent, geminiAgent, gptAgent },
});
```

Le superviseur lui-même peut tourner sur un modèle léger car il s'agit surtout de décider où envoyer le trafic. Vous ne payez pas des tarifs premium pour déterminer quel autre modèle premium utiliser. Mesurez cela aussi ; une mauvaise couche de routage transforme silencieusement les économies en mauvaises orientations.

Quand quelqu'un demande une implémentation du tri à bulles, le routeur reconnaît qu'il s'agit de code et le confie à votre spécialiste du code. Une consigne d'écriture créative ? Elle va au modèle que vous avez choisi pour sa voix et sa palette. Une question factuelle sur des événements historiques ? Routez-la vers l'agent général, idéalement avec de la récupération quand la fraîcheur ou la citation importe.

## Les avantages pratiques

**L'efficacité des coûts compte plus que vous ne le pensez.** Un petit modèle de routage prenant des décisions de délégation coûte une fraction du fait de passer chaque requête par votre fournisseur le plus cher. Avec le temps, surtout à grande échelle, cela s'accumule en argent réel. Vous ne payez pour l'intelligence lourde que lorsque vous en avez vraiment besoin.

**La qualité s'améliore quand on fait correspondre les modèles aux tâches.** Le gagnant change chaque mois, selon la tâche et la forme de la consigne. C'est pourquoi la couche de routage doit dépendre de vos évaluations, pas du modèle qui gagnait sur Twitter la semaine où vous avez écrit l'intégration.

**La résilience devient possible, pas automatique.** Le superviseur ci-dessus ne réessaie pas un fournisseur défaillant via un autre agent, et il dépend d'OpenAI pour la décision de routage elle-même. Si le basculement entre fournisseurs est important, ajoutez une politique explicite de réessai/bascule dans le code applicatif, gardez le routeur de bascule sur un autre fournisseur et testez le chemin d'échec. Un sac d'agents n'est pas un coupe-circuit simplement parce que les modèles ont des logos différents.

Il ne s'agit pas d'être malin pour le plaisir. Il s'agit de construire des systèmes qui ont du sens à la fois financièrement et techniquement. Vous n'utiliseriez pas le même marteau pour chaque tâche de construction, et vous ne devriez probablement pas non plus utiliser le même modèle de langage pour chaque tâche d'IA.

La beauté de cette approche est que votre code applicatif n'a pas besoin d'un labyrinthe de branchements. Vous appelez toujours un seul agent. La complexité de décider quel modèle utiliser pour quelle tâche vit en un seul endroit, configurée une fois, au lieu d'être dispersée dans tout votre codebase dans un tas de logique conditionnelle.

### Ressources

- [Documentation Mastra.ai](https://mastra.ai/docs)
- [Dépôt GitHub Mastra](https://github.com/mastra-ai/mastra)

## Lire la série

1. **Routage LLM (Ce post)**
2. [Sécurité et barrières de protection](/mastra-security-guardrails)
3. [Intégrations MCP et outils](/mastra-mcp-tool-integrations)
4. [Workflows et mémoire](/mastra-workflows-memory)
````
