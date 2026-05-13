# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: fr
- Model: deepseek/deepseek-v4-flash
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
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug llm-generative-ui-landscape --locale fr --model deepseek/deepseek-v4-flash --chunk 6p --quiz-concurrency 24
## Raw Output

````mdx
---
title: ''
subTitle: >-
  De la génération outil-vers-composant à la génération sans limite — une
  cartographie de chaque approche et des cas où elle justifie sa complexité
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
Chat a été les roues d'apprentissage.  

La première génération d'applications basées sur les modèles de langage ressemblait souvent à une boîte de texte collée à un produit. Le modèle renvoyait de la prose. L'interface utilisateur rendait en markdown. Si l'utilisateur devait effectuer une action, l'assistant décrivait le bouton qu'il devait aller cliquer ailleurs.  

C'était acceptable pour des démos. Ce n'est pas là que cela va.  

L'étape suivante utile est l'**interface générative** : le modèle ne répond pas seulement avec du texte ; il aide à décider quelle interface l'utilisateur a besoin d'avoir maintenant. Parfois, cela signifie appeler un outil et rendre une carte prédéfinie. Parfois, cela signifie remplir un composant de workflow connu avec des données fraîches. Parfois, cela signifie composer un tableau de bord temporaire, un formulaire, un tableau de comparaison, un graphique ou un widget interactif.  

Malheureusement, « interface générative » est devenue l'une de ces expressions qui signifie cinq choses différentes avant même le petit-déjeuner.  

Les gens l'utilisent pour décrire :

- un modèle choisissant parmi des composants React définis par le développeur  
- une spécification JSON que le frontend rend en composants natifs  
- une application iframe renvoyée par un outil MCP  
- une bibliothèque d'interface de chat qui prend en charge les appels d'outils  
- un protocole d'agent qui transmet l'état entre le backend et le frontend  
- un générateur de code en temps de conception comme v0, Lovable, Bolt ou Cursor  
- un modèle qui écrit littéralement du HTML, SVG, Canvas ou React en temps d'exécution  

Ces approches sont liées, mais elles ne représentent pas la même couche. Si vous les mélangez, chaque discussion sur l'architecture se transforme en bouillie.  

C'est la carte que j'aurais souhaité avoir quand j'ai commencé à comparer la pile actuelle.  

![Une carte en couches du paysage des interfaces génératives LLM](../landscape-map.webp)  

## La Mauvaise Compréhension Fondamentale  

La plus grande erreur est de considérer l'« interface générative » comme un seul choix technologique.

Il est préférable de séparer le problème en quatre couches :

1. **Coquille produit** : l'élément que les utilisateurs touchent. Il peut s'agir d'un chat, d'un copilote de barre latérale, d'un tableau de bord, d'un constructeur de workflow, d'un panneau IDE, de l'application ChatGPT, d'une interface mobile ou d'une console de support.
2. **Modèle de composition de l'interface** : la grammaire dont le modèle peut s'exprimer. Il peut s'agir d'appels d'outils, de JSON, d'A2UI, de json-render, d'OpenUI Lang, de sélection de composants Hashbrown ou d'HTML sandboxé.
3. **Runtime et transport** : la manière dont les messages, appels d'outils, deltas d'état, actions utilisateur et artefacts d'interface se déplacent entre l'agent et l'interface avant. AG-UI, MCP Apps, Apps SDK, A2A, SSE, WebSockets et HTTP classique s'inscrivent dans cette couche.
4. **Agent et backend outil** : LangGraph, Google ADK, CrewAI, Mastra, LlamaIndex, Pydantic AI, Agno, OpenAI Agents SDK, fonctions personnalisées, bases de données, récupération d'information et toutes les logiques métier ennuyeuses qui doivent néanmoins être correctes.

Une fois les couches séparées, l'écosystème devient nettement moins mystérieux.

[AG-UI](https://github.com/ag-ui-protocol/ag-ui) n'est pas vraiment un concurrent de [A2UI](https://github.com/google/A2UI). AG-UI est un protocole d'événements pour l'interaction agent-application. A2UI est un format déclaratif d'interface que l'agent peut envoyer. Vous pouvez superposer A2UI sur AG-UI. Vous pouvez également superposer des composants personnalisés rendus par des outils sur AG-UI.

[json-render](https://github.com/vercel-labs/json-render) n'est pas un produit de chat. C'est une architecture de catalogue et de rendu de composants : définir les composants que le modèle peut utiliser, faire émettre au modèle un arbre JSON valide, et rendre cet arbre en toute sécurité.

[CopilotKit](https://github.com/CopilotKit/CopilotKit) n'est pas seulement une bulle de chat. C'est une pile frontale pour des applications natives d'agent : interface de chat, interface générative, état partagé, outils frontaux et flux avec participation humaine.

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) et [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) ne sont pas des outils pour "rendre mon application React dynamique". Ce sont des modèles d'intégration hôte pour rendre des widgets à l'intérieur de ChatGPT ou d'autres hôtes compatibles MCP.

Les noms sont trompeurs car ce domaine est encore jeune. Ce sont les couches qui restent utiles.

## L'échelle de contrôle

L'interface utilisateur générative est un compromis entre **le contrôle du développeur** et **la liberté de l'agent**.

Trop de contrôle et l'assistant ressemble à une palette de commandes déguisée. Trop de liberté et le modèle commence à inventer des agencements étranges, des boutons vagues, une hiérarchie visuelle défectueuse, des états impossibles et des problèmes de sécurité avec un petit sourire confiant.

L'astuce est de choisir la quantité minimale de liberté nécessaire pour résoudre le problème de l'utilisateur.

![Un spectre allant des composants rendus par des outils à l'HTML généré librement](../control-spectrum.webp)

Je pense au spectre comme suit :

**Le rendu composant-outil** est le défaut le plus sûr. Le modèle appelle `get_weather`, `search_products`, `compare_plans` ou `draft_invoice`. L'application mappe ce résultat d'outil à un composant que vous possédez déjà : `WeatherCard`, `ProductGrid`, `PlanComparison`, `InvoiceReview`. Le modèle décide *quand* l'interface utilisateur est utile. Les développeurs contrôlent toujours la mise en page, le stylage, l'accessibilité, les états de chargement, les états vides et les actions dangereuses.

C'est le modèle documenté dans le [guide d'interface utilisateur générative du Vercel AI SDK](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) : le modèle appelle un outil, l'outil retourne des données, et l'interface utilisateur rend un composant à partir du résultat. C'est aussi le modèle mental derrière de nombreuses implémentations de CopilotKit et d'assistant-ui.

**Les catalogues de composants déclaratifs** donnent plus de liberté au modèle. Au lieu de choisir un seul composant, le modèle compose un arbre à partir de parties autorisées. Un catalogue peut inclure `Metric`, `Table`, `Chart`, `FilterBar`, `ApprovalPanel` et `Timeline`. Le modèle peut assemler un tableau de bord ou une étape de workflow, mais il ne peut pas exécuter du code arbitraire. C'est là que se situent [A2UI](https://github.com/google/A2UI), [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown) et [OpenUI](https://github.com/thesysdev/openui).

**Les mini-applications iframe** sont pertinentes lorsque l'interface utilisateur doit être plus riche qu'un arbre de composants, ou lorsque le fournisseur d'outils distant possède l'expérience. Les SDK MCP Apps et OpenAI Apps permettent à un outil de retourner des données structurées plus une ressource widget que l'hôte rend dans un iframe. C'est puissant pour les cartes, les paniers d'achat, les flux de réservation, les graphiques et les surfaces de produit externes. Cela crée aussi une frontière plus rigide entre l'application hôte et le widget.

**Génération ouverte** est l'extrémité la plus libre : l'agent génère du HTML, du SVG, du Canvas, du WebGL ou d'autres artefacts ressemblant à du code dans un sandbox. [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) est l'exemple le plus abouti à ce jour : l'agent peut générer des visualisations d'algorithmes, des scènes 3D, des diagrammes et des simulations dans des iframes sandboxées. Cela est idéal pour des explications visuelles ponctuelles. Ce n'est pas là que je commencerais pour un flux d'approbation d'entreprise.

Il est utile de nommer la distinction clé ici : **iframe HTML** (le modèle écrit du code dans un sandbox) vs. **catalogue JSON** (le modèle émet une spécification structurée et votre moteur de rendu la mappe à des composants prédéfinis). Ces concepts semblent liés mais présentent des profils de risque et de complexité très différents. L'iframe HTML est maximalement expressif ; la frontière de l'iframe assure la sécurité. Le catalogue JSON n'accorde aucune liberté exécutable au modèle — il ne peut que référencer des types de composants définis à l'avance. La plupart des frameworks de ce domaine s'inscrivent clairement dans l'un ou l'autre camp.

**Au-delà du sandbox** : des démonstrations récentes suggèrent un quatrième mode en formation — les LLM pilotent des expériences semblables à des jeux ou immersives en contrôlant la sortie visuelle de manière plus directe que ne le permettrait tout catalogue de composants. Les projets générant des mondes 3D explorables à partir de prompts, le comportement des PNJ piloté par les LLM en temps réel, et l'inférence de modèles en navigateur via WebGPU ([WebLLM](https://mlc.ai/web-llm/)) en sont des indicateurs précoces. Il n'existe pas encore de frameworks stables pour construire des applications production ici. J'aborderai cette direction dans un article dédié dès que cela changera.

## Composants de haut niveau vs Composants granulaires

C'est la décision de conception la plus importante.

Si votre catalogue est trop granulaire, le modèle doit devenir ingénieur frontend :

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

Cela semble flexible, mais le modèle doit désormais décider de l'espacement, de la hiérarchie, du regroupement, des états vides, des étiquettes des boutons, du traitement des erreurs et du comportement réactif. Vous avez également rendu le prompt plus volumineux et la sortie plus fragile à casser.

Si votre catalogue est trop haut niveau, le modèle est limité :

```tsx
WeatherCard
StockCard
HotelCard
```

Cela est sécurisé, mais fonctionne uniquement pour des scénarios connus. Le modèle ne peut pas créer une matrice de comparaison, demander des entrées manquantes ou adapter l'architecture de l'information lorsque la question de l'utilisateur change.

Le juste milieu utile est constitué de **composants de niveau métier avec des slots contraints** :

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

Ces composants encodent le goût du produit et les contraintes métier. Le modèle décide de *ce qui doit être affiché*, mais pas de chaque décision CSS.

Par exemple, un agent de voyage n'a pas besoin de `div`, `span` et `button`. Il a besoin de :

- `TripSummary`
- `FlightOptionList`
- `HotelComparison`
- `TravelerForm`
- `PolicyNotice`
- `BookingConfirmation`

Un agent de finance n'a pas besoin d'un espace de jeu de graphiques générique. Il a besoin de :

- `PortfolioSnapshot`
- `TransactionTable`
- `RiskBreakdown`
- `ScenarioComparison`
- `ApprovalGate`

Le catalogue doit ressembler à votre produit, pas à du HTML.

## Tableau des fonctionnalités

Ce tableau est intentionnellement biaisé. Il considère chaque projet comme un outil d'une pile, et non comme une plateforme gagnante-tout.

| Technologie | Couche | Meilleure adaptation | Modèle UI | Streaming / état | Notes et exemples |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](../https://github.com/ag-ui-protocol/ag-ui) | Protocole de runtime | Connexion des backends d'agents aux applications frontales | Événements pour messages, outils, état, activité, interruptions | Oui ; flux d'événements plus états instantanés/deltas | Utilisez lorsque vous avez besoin d'un tuyau standard entre agent et application. Il complète MCP et A2A plutôt que de les remplacer. |
| [A2UI](../https://github.com/google/A2UI) | Protocole UI déclaratif | Interface native multiplateforme générée par un agent | Charge JSON décrivant les composants, le modèle de données et les mises à jour | Conçu pour les mises à jour incrémentales | Bon choix pour les agents distants et les limites de confiance. En prévisualisation publique précoce, mais conceptuellement propre. |
| [json-render](../https://github.com/vercel-labs/json-render) | Catalogue de composants et moteur de rendu | Permet au modèle de composer des composants approuvés | Arbre JSON contraint par un catalogue typé | Supporte le rendu progressif | Bon pour React, Vue, Svelte, Solid, React Native, email, PDF, Remotion, terminal, etc. |
| [CopilotKit](../https://github.com/CopilotKit/CopilotKit) | Coque de produit et framework UI d'agent | Copilotes intégrés, état partagé, outils frontaux, HITL | Rendu d'outils, AG-UI, A2UI, modèles d'applications MCP | Oui | Une des piles les plus larges pour "construire des applications natives d'agents". Voir [exemples de génération UI](../https://github.com/CopilotKit/generative-ui). |
| [OpenGenerativeUI](../https://github.com/CopilotKit/OpenGenerativeUI) | Démonstration de génération UI ouverte | Explications visuelles, diagrammes, simulations, graphiques | L'agent génère du HTML/SVG/Canvas dans des iframes sandboxées | Rendu visuel progressif | Utilisez pour des artefacts dynamiques où un catalogue de composants fixe est trop restrictif. |
| [MCP Apps / mcp-ui](../https://github.com/MCP-UI-Org/mcp-ui) | Standard hôte/widget | Fournisseurs d'outils renvoyant une interface interactive via MCP | Ressource HTML liée depuis les métadonnées de l'outil | Pont hôte et actions widget | Meilleur lorsque l'interface appartient à un fournisseur d'outils ou nécessite une isolation iframe. |
| [SDK d'applications OpenAI](../https://developers.openai.com/apps-sdk) | Intégration hôte ChatGPT | Création de widgets d'applications ChatGPT personnalisées | Outils serveur MCP plus composants UI iframe | Entrée/outcome d'outils, état widget, messages de suivi | Les nouvelles applications ChatGPT devraient privilégier les champs MCP Apps et le pont `ui/*`, avec `window.openai` pour la compatibilité/les extensions. |
| [Vercel AI SDK UI](../https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | SDK d'applications et état de chat | Chat d'applications personnalisées, appels d'outils, parties de messages streamées | Rendu des résultats d'outils en composants React | Oui, via `useChat` et flux de messages UI | Bon point de départ si vous possédez déjà l'application et souhaitez un contrôle plus bas niveau. Associez avec [AI Elements](../https://elements.ai-sdk.dev/) pour les primitives UI. |
| [assistant-ui](../https://github.com/assistant-ui/assistant-ui) | Primitives de chat React | UX de chat production avec rendu personnalisé | Primitives de chat composable, rendu d'appels d'outils, JSON en composants | Oui | Fort si vous avez besoin d'ergonomie de chat polie mais souhaitez votre propre backend. |
| [LangGraph Generative UI](../https://docs.langchain.com/langgraph-platform/generative-ui-react) | Intégration plateforme d'agents | Co-localisation des composants UI avec le code graphique | Le graphique émet des messages UI nommés rendus par des composants React | Oui, y compris les événements de flux personnalisés | Bonne adaptation naturelle pour les déploiements LangGraph et les composants UI propriétaires du graphique. |
| [Hashbrown](../https://github.com/liveloveapp/hashbrown) | Framework GenUI frontal | Applications React/Angular exposant des composants et outils côté client | LLM sélectionne et rend les composants autorisés | Supporte les modèles de streaming | Bon pour intégrer l'intelligence directement dans les surfaces de produit, pas seulement le chat. |
| [OpenUI](../https://github.com/thesysdev/openui) | Langage UI compact et runtime | UI générée par modèle streamable avec moins de jetons que JSON | Langage OpenUI plus runtime React et bibliothèques de composants | Conçu pour le streaming de jetons | Intéressant lorsque la verbosité JSON devient un goulot d'étranglement. Toujours jeune, mais à surveiller. |
| [Tambo](../https://github.com/tambo-ai/tambo) | SDK UI génératif React | Sélection de composants, composants étatiques, exécution d'outils côté client | L'IA sélectionne les composants et interagit avec les outils clients | Orienté état | Option OSS React populaire axée sur l'orchestration automatique des composants. |
| [llm-ui](../https://llm-ui.com/) | Rendu de sortie | Sortie de texte LLM plus fluide avec des composants en ligne personnalisés | Interprète les chaînes de sortie du modèle en rendu React | Rendu de jetons fluide | Utile pour les composants personnalisés légers dans les flux de texte ; pas un protocole UI complet d'agent. |
| SDK RSC / React Server Components | Modèle plus ancien / fonctionnalité de framework | Flux de composants rendus côté serveur dans Next.js | Le flux modèle/outil retourne une UI rendue côté serveur | Oui, mais spécifique au framework | Développement suspendu en octobre 2024 ([Discussion #3251](../https://github.com/vercel/ai/discussions/3251)) ; pas le chemin recommandé. Migrez vers `useObject` ou json-render. |

## Ce qu'utiliser pour quel produit

Voici la matrice de recommandation que j'utiliserais effectivement avec une équipe.

**Vous ajoutez un assistant à une application SaaS existante.**

Commencez par le rendu outil-vers-composant. Utilisez [Vercel AI SDK UI](../https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces), [assistant-ui](../https://github.com/assistant-ui/assistant-ui) ou [CopilotKit](../https://github.com/CopilotKit/CopilotKit), selon la quantité d'état d'agent et d'intégration d'outils frontaux dont vous avez besoin. Gardez le catalogue petit au départ. Rendez les composants de produit que vous faites déjà confiance.

**Vous construisez un copilote sérieux dans une application qui nécessite un état partagé.**

Examinez attentivement CopilotKit combiné à AG-UI. La fonction clé n'est pas le "chat". Elle réside dans l'état partagé et l'interaction bidirectionnelle : l'agent peut demander des entrées, rendre l'interface utilisateur, mettre à jour l'état et se mettre en pause pour approbation.

**Vous avez des agents distants qui doivent envoyer une interface utilisateur à travers une limite.**

Utilisez A2UI ou un protocole déclaratif similaire à A2UI. L'objectif fondamental est que l'agent distant puisse décrire l'interface utilisateur sous forme de données, tandis que l'hôte conserve le contrôle du rendu natif, de la sécurité et du style. Si vous avez également besoin d'une interaction en temps réel entre l'agent et l'application, exécutez-la via AG-UI ou tout autre transport standardisé par votre environnement.

**Vous construisez à l'intérieur de ChatGPT ou d'un hôte compatible MCP.**

Utilisez les applications MCP et la voie Apps SDK. La documentation actuelle d'OpenAI recommande le pont `ui/*` des applications MCP pour les nouveaux projets, tout en maintenant `window.openai` comme couche de compatibilité et surface d'extension optionnelle. Copiez également leur séparation entre outils de données et outils de rendu : permettez au modèle de récupérer et de raisonner sur les données avant qu'il ne choisisse de rendre un widget.

**Vous souhaitez des tableaux de bord, rapports ou formulaires en langage naturel au sein de votre propre application.**

Essayez json-render, Hashbrown ou OpenUI. L'élément clé est le catalogue. Si vous exposez `LineChart`, `DataTable`, `MetricGroup`, `FilterControl` et `InsightCallout`, le modèle peut assembler des surfaces de rapport utiles sans approcher du code arbitraire.

**Vous souhaitez des artefacts éducatifs, visuels ou hautement personnalisés.**

Utilisez un sandbox à fin ouverte comme OpenGenerativeUI. Permettez au modèle d'écrire SVG, Canvas, WebGL ou HTML autonome, mais traitez la sortie comme du contenu d'utilisateur non fiable. Mettez-le en sandbox, définissez sa taille, retirez les permissions et éloignez-le de l'état privilégié de l'application.

**Vous avez surtout besoin de markdown en streaming plus élégant avec quelques éléments intégrés.**

Ne surdimensionnez pas. Le rendu des outils llm-ui ou assistant-ui pourrait suffire.

## Les erreurs que je voudrais éviter

**Erreur 1 : Laisser le modèle écrire du React de production au runtime.**

Il existe des exceptions, mais pour les interfaces de produit, c'est généralement le mauvais choix par défaut. La génération de code au runtime est difficile à sécuriser, difficile à tester, difficile à thématiser et difficile à rendre accessible. Si le modèle peut accomplir la tâche en sélectionnant parmi des composants fiables, faites-le.

**Erreur 2 : Exposer des primitives de design au lieu de primitives de produit.**

Lorsque vous donnez au modèle `Row`, `Column`, `Text` et `Button`, vous lui demandez de devenir votre système de design. Il deviendra un système médiocre. Donnez-lui des noms de produit plus élevés.

**Erreur 3 : Croire que du JSON valide équivaut à une interface sécurisée.**

Un payload peut passer la validation du schéma et rester manipulatif ou dangereux. L'étiquette peut indiquer "Voir la facture" tandis que l'action archive le compte. Traitez les spécifications d'interface comme du comportement, pas comme de la décoration. Elles nécessitent des tests de politique, des vérifications sémantiques et une confirmation humaine pour les actions importantes.

**Erreur 4 : Mettre la logique métier dans les outils de rendu.**  

Les outils de rendu doivent se charger du rendu. Les outils de données doivent récupérer, calculer, muter et valider. Les docs de l'Apps SDK d'OpenAI mettent en évidence cette séparation pour une raison : si chaque outil de données traîne un widget avec lui, le modèle perd de la marge de manœuvre avant de présenter.  

**Erreur 5 : Optimiser pour la nouveauté plutôt que pour l'achèvement des tâches.**  

L'objectif n'est pas de transformer chaque réponse en une interface unique en son genre. L'objectif est de réduire les frottements. Un panneau d'approbation stable et banal qui fait gagner quatre minutes à l'utilisateur vaut mieux qu'un tableau de bord généré impressionnant qu'on ne peut pas utiliser deux fois de suite.  

## Une architecture pratique  

Si je lançais un nouveau produit aujourd'hui, j'utiliserais une approche progressive :

1. **Déployez d'abord une interface de tool contrôlée.** Cartographiez les outils connus vers des composants connus. Journalisez chaque appel d'outil, chaque rendu d'interface et chaque action utilisateur.  
2. **Ajoutez un catalogue de domaine.** Une fois que des modèles se répètent, exposez `ComparisonTable`, `DecisionPanel`, `DataCollectionForm`, `Timeline` et autres composants spécifiques au produit.  
3. **Ajoutez une standardisation du transport uniquement si nécessaire.** Si vous possédez à la fois le frontend et le backend, un streaming simple peut suffire. Si vous avez plusieurs frameworks d'agents, utilisez AG-UI. Si les outils traversent des frontières de produit, utilisez MCP. Si les agents traversent des frontières organisationnelles, surveillez A2A et A2UI.  
4. **Utilisez des widgets iframe pour les interfaces étrangères ou complexes.** Les cartes, les paniers, les flux de réservation et les mini-applications tierces appartiennent derrière une frontière.  
5. **Réservé la génération ouverte pour les artefacts.** Les diagrammes, les simulations, les explications temporaires et les ébauches visuelles sont un excellent choix. Les workflows centraux ne le sont pas.  

L'architecture ressemble finalement à ceci :  

```txt
Intent utilisateur
  -> runtime agent
  -> appels d'outils/données
  -> résultat structuré
  -> décision d'interface
  -> composant fiable, spécification déclarative ou widget sandboxé
  -> action utilisateur
  -> flux d'état/évènement vers l'agent
```  

Cette boucle est le vrai produit. La boîte de chat n'est qu'un dispositif d'entrée possible.  

## L'évaluation devrait inclure l'interface  

Les équipes LLM apprennent lentement à évaluer les prompts et les sorties du modèle. L'interface générative ajoute une autre surface : l'interface elle-même peut être incorrecte.  

Au minimum, sauvegardez ces artefacts pour chaque interface générée :

- contexte et outils  
- appels d'outils et résultats d'outils  
- spécification d'interface générée ou sélection de composants  
- nom du composant rendu et ses propriétés  
- étiquettes visibles par l'utilisateur  
- actions associées aux boutons/formulaires  
- mises à jour d'état visibles par le modèle depuis l'interface  
- historique des actions de l'utilisateur  

Puis écrivez des vérifications comme :  

- chaque action destructive doit avoir un composant de confirmation  
- les étiquettes des boutons doivent correspondre à la sémantique des actions  
- les spécifications de rendu ne peuvent faire référence qu'à des composants autorisés  
- les totaux visibles par l'utilisateur doivent correspondre aux totaux des résultats des outils  
- les formulaires ne peuvent pas demander des champs en dehors de la portée de la tâche  
- les widgets ne doivent pas recevoir de secrets que seul le modèle nécessitait  
- les métadonnées cachées ne doivent pas contredire les étiquettes visibles  

Cela semble fastidieux. C'est aussi là que se construit la confiance en production.  

## Les liens par lesquels je commencerais  

Si vous souhaitez passer de l'article au code, voici les meilleurs points de départ que j'ai trouvés :

- [Dépôt AG-UI](https://github.com/ag-ui-protocol/ag-ui) et [documentation AG-UI](https://docs.ag-ui.com/introduction) pour le modèle d'événements d'exécution.  
- [Dépôt A2UI](https://github.com/google/A2UI) et [spécification A2UI](https://a2ui.org/specification/v0.9-a2ui/) pour les payloads déclaratifs agent-à-UI.  
- [Dépôt json-render](https://github.com/vercel-labs/json-render) et [documentation json-render](https://json-render.dev/) pour la génération d'interfaces JSON pilotée par un catalogue.  
- [Dépôt CopilotKit](https://github.com/CopilotKit/CopilotKit) et [exemples generative-ui](https://github.com/CopilotKit/generative-ui) pour les modèles AG-UI, A2UI, Open-JSON-UI et MCP Apps.  
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) pour les artefacts visuels sandboxés HTML/SVG/Canvas.  
- [SDK MCP-UI / MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) pour les ressources UI via MCP.  
- [Documentation SDK Apps OpenAI](https://developers.openai.com/apps-sdk) et [exemples SDK Apps](https://github.com/openai/openai-apps-sdk-examples) pour les widgets d'applications ChatGPT.  
- [Guide d'interface générative du SDK AI Vercel](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) et [AI Elements](https://elements.ai-sdk.dev/) pour le rendu de chat/outils propriétaire d'application.  
- [assistant-ui](https://github.com/assistant-ui/assistant-ui) pour les primitives de chat composable React.  
- [Documentation UI générative LangGraph](https://docs.langchain.com/langgraph-platform/generative-ui-react) pour les composants UI émis par graphe.  
- [Hashbrown](https://github.com/liveloveapp/hashbrown) pour la sélection de composants React/Angular et outils côté client.  
- [OpenUI](https://github.com/thesysdev/openui) pour des interfaces UI compactes et orientées streaming.  
- [Tambo](https://github.com/tambo-ai/tambo) pour des interfaces UI génératives React avec composants étatiques.  
- [llm-ui](https://llm-ui.com/) pour des flux de texte fluides avec composants en ligne personnalisés.  

## Note sur la stabilité des projets  

Tous les protocoles majeurs dans ce domaine sont pré-1.0. Dernière vérification le 8 mai 2026 ; prévoyez des changements et vérifiez les dernières docs avant de vous engager sur une plateforme.  

**Vercel AI SDK RSC** — la fonctionnalité phare initiale sur les « Interfaces UI génératives » — a vu son développement suspendu en octobre 2024 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)) en raison de limitations architecturales sans solution à court terme. **json-render** (Vercel Labs) est apparu comme direction de remplacement : basé sur un catalogue, indépendant du framework, sans couplage RSC. Il semble avoir rapidement attiré l'attention des développeurs web depuis son lancement en début 2026. La raison probable est la DX : json-render fonctionne immédiatement dans un projet React standard ; l'étendue multiplateforme d'A2UI ajoute une friction d'installation.  

**A2UI** (Google) est pré-1.0 avec des changements cassants entre les versions mineures et une communication incohérente sur le roadmap. Son avantage est une véritable couverture multiplateforme (web, Flutter, SwiftUI) que json-render ne gère pas. Pour les cas d'usage web purs aujourd'hui, json-render semble disposer d'une meilleure couverture outils ; pour les scénarios multiplateforme ou agents distants, la conception d'A2UI est plus adaptée. Une convergence entre les deux spécifications est possible — Vercel a expérimenté une sortie compatible A2UI depuis json-render.  

**AG-UI** (CopilotKit) est également pré-1.0. La confusion la plus courante provient du nom : AG-UI est un protocole de transport, pas un framework UI. Il définit *comment* les événements circulent entre l'agent et le frontend ; ce que vous affichez reste à votre discrétion. L'idée est solide et largement adoptée. La spécification évolue encore.

## Mon avis

Generative UI ne remplacera pas les interfaces de produits soigneusement conçues. Elle remplacera l'hypothèse paresseuse selon laquelle un transcript de chat est l'interface universelle pour l'IA.

Les meilleurs systèmes n'autoriseront pas au modèle de tout improviser. Ils lui donneront un petit ensemble précis de blocs de construction natifs du produit ; une connexion runtime fiable ; des limites de sécurité claires ; et assez de liberté pour adapter l'interface à la tâche.

L'avenir n'est pas « le modèle écrit votre frontend ».

L'avenir est plus proche de : **votre frontend devient un instrument que l'agent peut jouer, mais vous décidez toujours de ce que l'instrument est autorisé à sonner.**
````
