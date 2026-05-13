# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: fr
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.01
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug llm-generative-ui-landscape --locale fr --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
title: Le paysage des UI génératives LLM
subTitle: >-
  Du rendu d'outil à composant à la génération ouverte — une cartographie de
  chaque approche et quand chacune justifie sa complexité.
date: '2026-05-06'
modified: '2026-05-06'
tags:
  - ai
  - llm
  - generative-ui
  - agents
  - frontend
  - protocols
  - react
  - ag-ui
  - a2ui
  - copilotkit
  - json-render
  - mcp
category: AI
subCategory: Frontend
draft: true
unlisted: true
hidden: true
publish: false
popularity: 0.9
social_image: ../desktop-social.webp
cover_full_width: ../wide.webp
cover_mobile: ../square.webp
cover_icon: ../square.webp
---
Chat, c’était les roulettes.

La première génération d’apps LLM ressemblait surtout à une boîte de texte agrafée à un produit. Le modèle renvoyait de la prose. Le frontend rendait du Markdown. Si l’utilisateur devait agir, l’assistant décrivait le bouton qu’il fallait aller cliquer ailleurs.

C’était acceptable pour des démos. Ce n’est pas là que ça va.

La prochaine étape utile, c’est l’**UI générative** : le modèle ne se contente pas de répondre avec du texte ; il aide à décider quelle interface l’utilisateur a besoin maintenant. Parfois, ça signifie appeler un outil et rendre une carte préfabriquée. Parfois, ça signifie remplir un composant de workflow connu avec des données fraîches. Parfois, ça signifie composer un tableau de bord temporaire, un formulaire, un tableau comparatif, un graphique ou un widget interactif.

Malheureusement, « UI générative » est devenu une de ces expressions qui veulent dire cinq choses différentes avant le petit-déjeuner.

Les gens l’utilisent pour décrire :

- un modèle choisissant parmi des composants React définis par le développeur
- une spécification JSON que le frontend rend en composants natifs
- une application iframe renvoyée par un outil MCP
- une bibliothèque d'interface de chat qui prend en charge les appels d'outils
- un protocole d'agent qui diffuse l'état entre le backend et le frontend
- un générateur de code au moment de la conception comme v0, Lovable, Bolt ou Cursor
- un modèle écrivant littéralement du HTML, SVG, Canvas ou React à l'exécution

Ces concepts sont liés, mais ils n'appartiennent pas à la même couche. Si vous les mélangez, toute conversation sur l'architecture se transforme en soupe.

![Une carte en couches du paysage de l'UI générative LLM](../landscape-map.webp)

## Le malentendu fondamental

La plus grande erreur est de considérer l'« UI générative » comme un seul choix technologique.

Il est préférable de séparer le problème en quatre couches :

1.  **Coque produit** : la chose que les utilisateurs touchent. Cela peut être un chat, un copilote en barre latérale, un tableau de bord, un constructeur de workflows, un panneau IDE, une application ChatGPT, un écran mobile ou une console de support.
2.  **Modèle de composition UI** : la grammaire que le modèle est autorisé à parler. Cela peut être des appels d'outils, du JSON, A2UI, json-render, OpenUI Lang, la sélection de composants Hashbrown, ou du HTML en bac à sable.
3.  **Runtime et transport** : comment les messages, les appels d'outils, les deltas d'état, les actions utilisateur et les artefacts UI circulent entre l'agent et le frontend. AG-UI, MCP Apps, Apps SDK, A2A, SSE, WebSockets et le bon vieux HTTP vivent tous dans les parages.
4.  **Backend d'agent et d'outils** : LangGraph, Google ADK, CrewAI, Mastra, LlamaIndex, Pydantic AI, Agno, OpenAI Agents SDK, des fonctions personnalisées, des bases de données, du retrieval, et toute la logique métier ennuyeuse qui doit encore être correcte.

Une fois que vous séparez les couches, l'écosystème devient beaucoup moins mystique.

[AG-UI](https://github.com/ag-ui-protocol/ag-ui) n'est pas vraiment un concurrent de [A2UI](https://github.com/google/A2UI). AG-UI est un protocole d'événements pour l'interaction agent-application. A2UI est un format UI déclaratif que l'agent peut envoyer. Vous pouvez mettre A2UI au-dessus d'AG-UI. Vous pouvez aussi mettre des composants personnalisés rendus par outil au-dessus d'AG-UI.

[json-render](https://github.com/vercel-labs/json-render) n'est pas un produit de chat. C'est un catalogue de composants et une architecture de rendu : définissez les composants que le modèle peut utiliser, faites en sorte que le modèle émette un arbre JSON valide, et rendez cet arbre en toute sécurité.

[CopilotKit](https://github.com/CopilotKit/CopilotKit) n'est pas qu'une bulle de chat. C'est une stack frontend pour les applications agent-natives : UI de chat, UI générative, état partagé, outils frontend et flux humain-dans-la-boucle.

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) et [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) ne sont pas des outils pour « rendre mon app React dynamique ». Ce sont des modèles d’intégration hôte pour afficher des widgets dans ChatGPT ou d’autres hôtes compatibles MCP.

Les noms prêtent à confusion parce que l’espace est jeune. Les couches, elles, restent utiles.

## Le spectre du contrôle

L’UI générative est un compromis entre **contrôle développeur** et **liberté de l’agent**.

Trop de contrôle, et l’assistant ressemble à une palette de commandes déguisée. Trop de liberté, et le modèle commence à inventer une mise en page étrange, des boutons vagues, une hiérarchie visuelle cassée, des états impossibles, et des problèmes de sécurité avec un petit sourire confiant.

L’astuce est de choisir la plus petite dose de liberté qui résout le problème utilisateur.

![Un spectre allant du rendu piloté par outils au HTML généré librement](../control-spectrum.webp)

Je vois le spectre comme ceci :

**Le rendu outil-vers-composant** est le défaut le plus sûr. Le modèle appelle `get_weather`, `search_products`, `compare_plans` ou `draft_invoice`. L’application associe le résultat de l’outil à un composant que vous possédez déjà : `WeatherCard`, `ProductGrid`, `PlanComparison`, `InvoiceReview`. Le modèle décide *quand* l’interface est utile. Les développeurs gardent la main sur la mise en page, le style, l’accessibilité, les états de chargement, les états vides et les actions dangereuses.

C’est le schéma documenté dans le [guide d’interface générative du Vercel AI SDK](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) : le modèle appelle un outil, l’outil renvoie des données, et l’interface rend un composant à partir du résultat. C’est aussi le modèle mental derrière de nombreuses implémentations CopilotKit et assistant-ui.

**Les catalogues de composants déclaratifs** donnent plus de latitude au modèle. Au lieu de choisir un seul composant, le modèle compose un arbre à partir de pièces autorisées. Un catalogue peut inclure `Metric`, `Table`, `Chart`, `FilterBar`, `ApprovalPanel` et `Timeline`. Le modèle peut assembler un tableau de bord ou une étape de workflow, mais il ne peut pas exécuter de code arbitraire. C’est là que se situent [A2UI](https://github.com/google/A2UI), [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown) et [OpenUI](https://github.com/thesysdev/openui).

**Les mini-applications en iframe** ont du sens quand l’interface doit être plus riche qu’un arbre de composants, ou quand un fournisseur d’outil distant possède l’expérience. MCP Apps et OpenAI Apps SDK permettent à un outil de renvoyer des données structurées plus une ressource de widget que l’hôte affiche dans un iframe. C’est puissant pour les cartes, les paniers d’achat, les flux de réservation, les graphiques et les surfaces produit externes. Cela crée aussi une frontière plus nette entre l’application hôte et le widget.

**Génération ouverte** est l’extrémité du spectre : l’agent émet du HTML, SVG, Canvas, WebGL ou d’autres artefacts de type code dans un bac à sable. [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) en est le meilleur exemple actuel : l’agent peut générer des visualisations d’algorithmes, des scènes 3D, des diagrammes et des simulations dans des iframes isolés. C’est excellent pour des explications visuelles ponctuelles. Ce n’est pas par là que je commencerais pour un flux d’approbation en entreprise.

Il est utile de nommer la distinction clé ici : **HTML dans un iframe** (le modèle écrit du code dans un bac à sable) vs. **catalogue JSON** (le modèle émet une spécification structurée et votre moteur de rendu la mappe sur des composants pré-construits). Cela semble proche, mais les profils de risque et de complexité sont très différents. L’HTML dans un iframe est maximalement expressif ; la frontière de l’iframe fait le travail de sécurité. Le catalogue JSON ne donne aucune liberté d’exécution au modèle — il ne peut que référencer des types de composants que vous avez définis à l’avance. La plupart des frameworks dans cet espace tombent clairement dans l’un ou l’autre camp.

**Au-delà du bac à sable** : des démos très récentes suggèrent qu’un quatrième mode est en train d’émerger — les LLM pilotent des expériences de type jeu ou immersives en contrôlant la sortie visuelle de manière plus directe que ne le permet un catalogue de composants. Les projets qui génèrent des mondes 3D explorables à partir de prompts, le comportement d’NPC dirigé par LLM à l’exécution, et l’inférence de modèle dans le navigateur via WebGPU ([WebLLM](https://mlc.ai/web-llm/)) sont des marqueurs précoces. Il n’existe pas encore de frameworks stables pour construire du code de production ici. Je couvrirai cette direction dans un article dédié une fois que cela changera.

## Composants de haut niveau vs composants granulaires

C’est la décision de conception la plus importante.

Si votre catalogue est trop granulaire, le modèle doit devenir un ingénieur frontend :

```tsx
Container
Row
Column
Text
Button
Icon
Spacer
Divider
```

Ça a l’air flexible, mais maintenant le modèle doit décider de l’espacement, de la hiérarchie, du regroupement, des états vides, des libellés des boutons, du traitement des erreurs et du comportement responsive. Vous avez aussi alourdi le prompt et rendu la sortie plus fragile.

Si votre catalogue est trop haut niveau, le modèle est coincé :

```tsx
WeatherCard
StockCard
HotelCard
```

C’est sûr, mais ça ne fonctionne que pour des scénarios connus. Le modèle ne peut pas créer une matrice de comparaison, demander des entrées manquantes, ni adapter l’architecture d’information quand la question de l’utilisateur change.

Le juste milieu utile, ce sont **les composants métier avec des emplacements contraints** :

```tsx
SearchResults
ComparisonTable
MetricGroup
EditablePlan
ApprovalRequest
Timeline
DataCollectionForm
CheckoutReview
```

Ces composants encapsulent le goût produit et les contraintes métier. Le modèle décide *ce qui doit être affiché*, mais pas chaque décision CSS.

Par exemple, un agent de voyage n’a pas besoin de `div`, `span` et `button`. Il a besoin de :

- `TripSummary`
- `FlightOptionList`
- `HotelComparison`
- `TravelerForm`
- `PolicyNotice`
- `BookingConfirmation`

Un agent financier n'a pas besoin d'un terrain de jeu générique pour les graphiques. Il a besoin de :

- `PortfolioSnapshot`
- `TransactionTable`
- `RiskBreakdown`
- `ScenarioComparison`
- `ApprovalGate`

Le catalogue doit ressembler à votre produit, pas à du HTML.

## Tableau des fonctionnalités

Ce tableau est intentionnellement partial. Il traite chaque projet comme un outil dans une pile, et non comme une plateforme où le gagnant prend tout.

| Technologie | Couche | Meilleur usage | Modèle UI | Streaming / état | Notes et exemples |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | Protocole d’exécution | Connecter des backends d’agent à des applications frontend | Événements pour messages, outils, état, activité, interruptions | Oui ; flux d’événements plus instantanés/deltas d’état | À utiliser quand vous avez besoin d’un pipe standard agent→application. Il complète MCP et A2A sans les remplacer. |
| [A2UI](https://github.com/google/A2UI) | Protocole UI déclaratif | UI native générée par agent, multiplateforme | Payload JSON décrivant composants, modèle de données et mises à jour | Conçu pour les mises à jour incrémentales | Bon choix pour agents distants et limites de confiance. Aperçu public précoce, mais conceptuellement propre. |
| [json-render](https://github.com/vercel-labs/json-render) | Catalogue de composants et moteur de rendu | Laisser le modèle composer des composants approuvés | Arbre JSON contraint par un catalogue typé | Supporte le rendu progressif | Bon pour React, Vue, Svelte, Solid, React Native, email, PDF, Remotion, terminal, et plus. |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | Shell produit et framework UI d’agent | Copilotes in-app, état partagé, outils frontend, HITL | Rendu d’outils, patterns AG-UI, A2UI, MCP Apps | Oui | L’une des piles les plus larges pour « construire des applications agent-natives ». Voir [generative-ui examples](https://github.com/CopilotKit/generative-ui). |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) | Démonstration de génération UI ouverte | Explications visuelles, diagrammes, simulations, graphiques | L’agent émet HTML / SVG / Canvas dans des iframes sandboxées | Rendu visuel progressif | À utiliser pour des artefacts dynamiques où un catalogue fixe est trop limitant. |
| [MCP Apps / mcp-ui](https://github.com/MCP-UI-Org/mcp-ui) | Standard hôte/widget | Fournisseurs d’outils renvoyant une UI interactive via MCP | Ressource HTML liée depuis les métadonnées de l’outil | Pont hôte et actions widget | Meilleur quand l’UI appartient à un fournisseur d’outil ou nécessite un isolement iframe. |
| [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) | Intégration hôte d’application ChatGPT | Construire des widgets d’application ChatGPT personnalisés | Outils serveur MCP plus composants UI iframe | Entrée/résultat d’outil, état widget, messages de suivi | Les nouvelles applications ChatGPT devraient préférer les champs MCP Apps et le pont `ui/*`, avec `window.openai` pour compatibilité/extensions. |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | SDK application et état de chat | Chat d’application personnalisé, appels d’outils, parties de message en streaming | Rendre les résultats d’outils en composants React | Oui, via `useChat` et flux de messages UI | Bonne base si vous possédez déjà l’application et voulez un contrôle plus fin. Associer avec [AI Elements](https://elements.ai-sdk.dev/) pour les primitives UI. |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | Primitives React pour chat | UX de chat de production avec rendu personnalisé | Primitives de chat composables, rendu d’appels d’outils, JSON comme composants | Oui | Solide si vous avez besoin d’une ergonomie de chat soignée mais voulez apporter votre propre backend. |
| [LangGraph Generative UI](https://docs.langchain.com/langgraph-platform/generative-ui-react) | Intégration plateforme agent | Colocaliser les composants UI avec le code du graphe | Le graphe émet des messages UI nommés rendus par des composants React | Oui, y compris événements de flux personnalisés | Naturel pour les déploiements LangGraph et les composants UI appartenant au graphe. |
| [Hashbrown](https://github.com/liveloveapp/hashbrown) | Framework GenUI frontend | Applications React/Angular qui exposent composants et outils côté client | Le LLM sélectionne et rend les composants autorisés de l’application | Supporte les patterns de streaming | Bon pour intégrer l’intelligence directement dans les surfaces produit, pas seulement le chat. |
| [OpenUI](https://github.com/thesysdev/openui) | Langage UI compact et exécution | UI générée par modèle, streamable, avec moins de tokens que JSON | Langage OpenUI plus exécution React et bibliothèques de composants | Conçu pour le streaming de tokens | Intéressant quand la verbosité JSON devient un goulot d’étranglement. Encore jeune, mais à surveiller. |
| [Tambo](https://github.com/tambo-ai/tambo) | SDK React UI générative | Sélection de composants, composants avec état, exécution d’outils côté client | L’IA sélectionne des composants et interagit avec les outils client | Orienté état | Option React OSS populaire axée sur l’orchestration automatique de composants. |
| [llm-ui](https://llm-ui.com/) | Moteur de rendu de sortie | Sortie texte LLM plus fluide avec composants inline personnalisés | Analyse les chaînes de sortie du modèle en rendu React | Rendu fluide de tokens | Utile pour des composants légers dans des flux de texte ; pas un protocole UI d’agent complet. |
| AI SDK RSC / React Server Components | Pattern ancien / fonctionnalité framework | Flux de composants rendus serveur dans Next.js | Le flux modèle/outil renvoie une UI rendue serveur | Oui, mais spécifique au framework | Développement suspendu en octobre 2024 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)) ; chemin non recommandé. Migrer vers `useObject` ou json-render. |

## Que utiliser pour quel produit

Voici la matrice de recommandations que j’utiliserais réellement avec une équipe.

**Vous ajoutez un assistant à une application SaaS existante.**

Commencez par le rendu outil-à-composant. Utilisez [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces), [assistant-ui](https://github.com/assistant-ui/assistant-ui) ou [CopilotKit](https://github.com/CopilotKit/CopilotKit), selon le niveau d’état d’agent et d’intégration d’outils frontend dont vous avez besoin. Gardez le catalogue très petit au début. Rendez les composants produit que vous maîtrisez déjà.

**Vous construisez un copilote sérieux dans l’application qui nécessite un état partagé.**

Examinez attentivement CopilotKit plus AG-UI. La fonctionnalité importante n’est pas le « chat ». C’est l’état partagé et l’interaction bidirectionnelle : l’agent peut demander une entrée, afficher une interface, mettre à jour l’état et faire une pause pour approbation.

**Vous avez des agents distants qui doivent envoyer une interface utilisateur à travers une frontière.**

Utilisez A2UI ou un protocole déclaratif de type A2UI. Tout l’intérêt est qu’un agent distant peut décrire l’interface utilisateur sous forme de données tandis que l’hôte garde le contrôle du rendu natif, de la sécurité et du style. Si vous avez également besoin d’une interaction agent/application en direct, exécutez-la via AG-UI ou tout autre transport standardisé par votre environnement.

**Vous construisez à l’intérieur de ChatGPT ou d’un hôte compatible MCP.**

Utilisez MCP Apps et le chemin SDK Apps. La documentation actuelle d’OpenAI recommande le pont `ui/*` de MCP Apps pour les nouveaux travaux, tout en conservant `window.openai` comme couche de compatibilité et surface d’extension optionnelle. Reproduisez également leur séparation entre outils de données et outils de rendu : laissez le modèle récupérer et raisonner sur les données avant de choisir d’afficher un widget.

**Vous voulez des tableaux de bord, des rapports ou des formulaires en langage naturel dans votre propre application.**

Essayez json-render, Hashbrown ou OpenUI. La clé, c’est le catalogue. Si vous exposez `LineChart`, `DataTable`, `MetricGroup`, `FilterControl` et `InsightCallout`, le modèle peut assembler des surfaces de reporting utiles sans s’approcher de code arbitraire.

**Vous voulez des artefacts éducatifs, visuels ou hautement sur mesure.**

Utilisez un sandbox ouvert comme OpenGenerativeUI. Laissez le modèle écrire du SVG, Canvas, WebGL ou HTML autonome, mais traitez la sortie comme du contenu utilisateur non fiable. Isolez-le, dimensionnez-le, retirez les permissions et tenez-le à l’écart de l’état privilégié de l’application.

**Vous avez surtout besoin d’un markdown de streaming plus joli avec quelques affordances en ligne.**

Ne surconstruisez pas. Le rendu d’outils llm-ui ou assistant-ui pourrait suffire.

## Les erreurs que j’éviterais

**Erreur n°1 : Laisser le modèle écrire du React de production à l’exécution.**

Il existe des exceptions, mais pour une UI produit, c’est généralement le mauvais choix par défaut. La génération de code à l’exécution est difficile à sécuriser, à tester, à thèmer et à rendre accessible. Si le modèle peut accomplir la tâche en choisissant parmi des composants de confiance, faites-le.

**Erreur n°2 : Exposer des primitives de design au lieu de primitives produit.**

Quand vous donnez au modèle `Row`, `Column`, `Text` et `Button`, vous lui demandez de devenir votre système de design. Il en deviendra un médiocre. Donnez-lui des noms de produit de plus haut niveau.

**Erreur n°3 : Croire qu’un JSON valide signifie une UI sûre.**

Un payload peut passer la validation de schéma et rester manipulateur ou dangereux. Le libellé peut dire « Voir la facture » alors que l’action archive le compte. Traitez les spécifications UI comme du comportement, pas comme de la décoration. Elles nécessitent des tests de politique, des vérifications sémantiques et une confirmation humaine pour les actions conséquentes.

**Erreur n°4 : Mettre la logique métier dans les outils de rendu.**

Les outils de rendu doivent se contenter de rendre. Les outils de données doivent récupérer, calculer, muter et valider. La documentation du SDK Apps d'OpenAI insiste sur cette séparation pour une bonne raison : si chaque outil de données traîne un widget avec lui, le modèle perd de l'espace pour raisonner avant de présenter.

**Erreur n°5 : Optimiser pour la nouveauté plutôt que pour l'achèvement de la tâche.**

Le but n'est pas de faire de chaque réponse une interface unique. Le but est de réduire les frictions. Un panneau d'approbation stable et ennuyeux qui fait gagner quatre minutes à l'utilisateur vaut mieux qu'un tableau de bord généré éblouissant auquel on ne peut pas se fier deux fois.

## Une architecture pratique

Si je devais lancer un nouveau produit aujourd'hui, j'adopterais une approche par étapes :

1.  **D'abord, déployer une UI d'outil contrôlée.** Mapper les outils connus aux composants connus. Journaliser chaque appel d'outil, rendu d'UI et action utilisateur.
2.  **Ajouter un catalogue de domaine.** Une fois que les motifs se répètent, exposer `ComparisonTable`, `DecisionPanel`, `DataCollectionForm`, `Timeline` et autres composants spécifiques au produit.
3.  **Ajouter une standardisation du transport uniquement lorsque nécessaire.** Si vous possédez à la fois le frontend et le backend, un simple streaming peut suffire. Si vous avez plusieurs frameworks d'agents, utilisez AG-UI. Si les outils traversent les frontières du produit, utilisez MCP. Si les agents traversent les frontières organisationnelles, surveillez A2A et A2UI.
4.  **Utiliser des widgets iframe pour les surfaces étrangères ou complexes.** Les cartes, paniers, flux de réservation et mini-applications tierces doivent se trouver derrière une frontière.
5.  **Réserver la génération ouverte pour les artefacts.** Les diagrammes, simulations, explications temporaires et blocs-notes visuels sont parfaitement adaptés. Les workflows principaux ne le sont pas.

L'architecture finit par ressembler à ceci :

```txt
User intent
  -> agent runtime
  -> tool/data calls
  -> structured result
  -> UI decision
  -> trusted component, declarative spec, or sandboxed widget
  -> user action
  -> state/event stream back to the agent
```

Cette boucle est le véritable produit. La boîte de chat n'est qu'un dispositif d'entrée possible.

## L'évaluation devrait inclure l'UI

Les équipes LLM apprennent lentement à évaluer les prompts et les sorties des modèles. L'UI générative ajoute une autre surface : l'interface elle-même peut être erronée.

Au minimum, sauvegardez ces artefacts pour chaque UI générée :

- contexte du prompt et des outils
- appels d'outils et résultats d'outils
- spécification d'UI générée ou sélection de composant
- nom du composant rendu et ses props
- étiquettes visibles par l'utilisateur
- actions attachées aux boutons/formulaires
- mises à jour d'état visibles par le modèle depuis l'UI
- historique des actions utilisateur

Ensuite, rédigez des vérifications comme :

- chaque action destructive doit avoir un composant de confirmation
- les étiquettes des boutons doivent correspondre à la sémantique de l'action
- les spécifications de rendu ne peuvent référencer que les composants autorisés
- les totaux visibles par l'utilisateur doivent correspondre aux totaux des résultats d'outils
- les formulaires ne peuvent pas demander de champs en dehors du périmètre de la tâche
- les widgets ne peuvent pas recevoir de secrets dont seul le modèle avait besoin
- les métadonnées cachées ne doivent pas contredire les étiquettes visibles

Cela semble fastidieux. C'est aussi là que naît la confiance en production.

## Les liens par lesquels je commencerais

Si vous voulez passer de l'article au code, voici les meilleurs points de départ que j'ai trouvés :

- [Dépôt AG-UI](https://github.com/ag-ui-protocol/ag-ui) et [docs AG-UI](https://docs.ag-ui.com/introduction) pour le modèle d'événements runtime.
- [Dépôt A2UI](https://github.com/google/A2UI) et [spécification A2UI](https://a2ui.org/specification/v0.9-a2ui/) pour les payloads déclaratifs agent-vers-UI.
- [Dépôt json-render](https://github.com/vercel-labs/json-render) et [docs json-render](https://json-render.dev/) pour la génération d'UI JSON pilotée par catalogue.
- [Dépôt CopilotKit](https://github.com/CopilotKit/CopilotKit) et [exemples generative-ui](https://github.com/CopilotKit/generative-ui) pour les motifs AG-UI, A2UI, Open-JSON-UI et MCP Apps.
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) pour les artefacts visuels HTML/SVG/Canvas en bac à sable.
- [MCP-UI / SDK MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) pour les ressources UI via MCP.
- [Docs SDK OpenAI Apps](https://developers.openai.com/apps-sdk) et [exemples SDK Apps](https://github.com/openai/openai-apps-sdk-examples) pour les widgets d'applications ChatGPT.
- [Guide UI générative du SDK Vercel AI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) et [AI Elements](https://elements.ai-sdk.dev/) pour le rendu chat/outil propriétaire de l'application.
- [assistant-ui](https://github.com/assistant-ui/assistant-ui) pour les primitives de chat React composables.
- [Docs UI générative LangGraph](https://docs.langchain.com/langgraph-platform/generative-ui-react) pour les composants UI émis par le graphe.
- [Hashbrown](https://github.com/liveloveapp/hashbrown) pour la sélection de composants React/Angular et les outils côté client.
- [OpenUI](https://github.com/thesysdev/openui) pour une UI générée par modèle compacte et orientée streaming.
- [Tambo](https://github.com/tambo-ai/tambo) pour une UI générative React avec des composants avec état.
- [llm-ui](https://llm-ui.com/) pour des flux de texte fluides avec des composants en ligne personnalisés.

## Note sur la stabilité des projets

Chaque protocole majeur dans cet espace est en version pré-1.0. Dernière vérification le 8 mai 2026 ; prévoyez des changements et consultez la documentation actuelle avant de miser sur une plateforme.

**Vercel AI SDK RSC** — la fonctionnalité phare originale « UI générative » — a vu son développement suspendu en octobre 2024 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)) en raison de limitations architecturales sans correctif à court terme. **json-render** (Vercel Labs) a émergé comme direction de remplacement : basé sur catalogue, indépendant du framework, sans couplage RSC. Il semble avoir rapidement attiré l'attention des développeurs web depuis son lancement début 2026. La raison probable est l'expérience développeur : json-render fonctionne immédiatement dans un projet React standard ; la portée multiplateforme d'A2UI ajoute des frictions de configuration.

**A2UI** (Google) est en pré-1.0 avec des changements cassants entre versions mineures et des communications de feuille de route incohérentes. Son avantage est une portée véritablement multiplateforme (web, Flutter, SwiftUI) que json-render n'adresse pas. Pour les cas d'usage purement web aujourd'hui, json-render semble avoir une meilleure couverture d'outillage ; pour les scénarios multiplateformes ou d'agents distants, la conception d'A2UI est plus appropriée. Une convergence entre les deux spécifications est possible — Vercel a expérimenté une sortie compatible A2UI à partir de json-render.

**AG-UI** (CopilotKit) est également en pré-1.0. La confusion la plus courante concerne le nom : AG-UI est un protocole de transport, pas un framework UI. Il définit *comment* les événements circulent entre l'agent et le frontend ; ce que vous affichez reste votre choix. Le concept est solide et largement adopté. La spécification est encore en évolution.

## Mon avis

L’UI générative ne remplacera pas les interfaces produit soigneusement conçues. Elle remplacera l’hypothèse paresseuse selon laquelle un transcript de chat est l’interface universelle de l’IA.

Les meilleurs systèmes ne laisseront pas le modèle improviser sur tout. Ils lui donneront un petit ensemble précis de blocs de construction natifs du produit ; une connexion runtime fiable ; des limites de sécurité claires ; et suffisamment de liberté pour adapter l’interface à la tâche.

L’avenir n’est pas « le modèle écrit votre frontend ».

L’avenir ressemble plutôt à ceci : **votre frontend devient un instrument que l’agent peut jouer, mais c’est toujours vous qui décidez du son que l’instrument est autorisé à produire.**
````
