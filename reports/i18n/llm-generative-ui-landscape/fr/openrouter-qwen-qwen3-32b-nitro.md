# Translation Candidate
- Slug: llm-generative-ui-landscape
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-06--llm-generative-ui-landscape/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 48.75
- Input tokens: 19821
- Output tokens: 18750
- Thinking tokens: unknown
- Cached input tokens: 3584
- Cache write tokens: 0
- Estimated cost: $0.006086
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug llm-generative-ui-landscape --locale fr
## Raw Output

````mdx
---
title: ''
subTitle: >-
  Du rendu de l'outil au composant à la génération sans contrainte — une carte
  de toutes les approches et des cas où chacune justifie sa complexité.
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
Les chatbots ont été les roues d'entraînement.  

La première génération d'applications avec modèles LLM ressemblait principalement à une boîte de texte fixée à un produit. Le modèle retournait de la prose. L'interface utilisateur affichait du markdown. Si l'utilisateur devait effectuer une action, l'assistant décrivait le bouton que l'utilisateur devait cliquer ailleurs.  

C'était acceptable pour des démonstrations. Ce n'est pas là que cette technologie se dirige.  

L'étape suivante utile est **l'interface utilisateur générative** : le modèle ne répond pas seulement avec du texte ; il aide à déterminer quelle interface l'utilisateur a besoin d'avoir maintenant. Parfois, cela signifie appeler un outil et afficher une carte prédéfinie. Parfois, cela signifie remplir un composant de workflow connu avec de nouvelles données. Parfois, cela signifie composer un tableau de bord temporaire, un formulaire, un tableau de comparaison, un graphique ou un widget interactif.  

Malheureusement, « interface utilisateur générative » est devenue l'une de ces expressions qui signifie cinq choses différentes avant le petit-déjeuner.  

Les gens l'utilisent pour décrire :

- un modèle sélectionnant parmi des composants React définis par les développeurs  
- une spécification JSON que l'interface utilisateur rend en composants natifs  
- une application iframe renvoyée par un outil MCP  
- une bibliothèque d'interface utilisateur de chat supportant les appels d'outils  
- un protocole d'agent qui transmet l'état entre le backend et le frontend  
- un générateur de code en temps de conception comme v0, Lovable, Bolt ou Cursor  
- un modèle écrivant littéralement du HTML, SVG, Canvas ou React en temps d'exécution  

Ils sont liés, mais ils ne constituent pas le même niveau. Si vous les mélangez, chaque discussion sur l'architecture devient de la bouillie.  

C'est la carte que j'aurais aimé avoir quand j'ai commencé à comparer la pile actuelle.  

![Une carte en couches du paysage des interfaces utilisateur génératives LLM](../landscape-map.webp)  

## La Mésentente Fondamentale  

La plus grande erreur est de considérer l'« interface utilisateur générative » comme un seul choix technologique.

Il est préférable de séparer le problème en quatre couches :

1.  **Coquille produit** : l'élément que les utilisateurs manipulent. Il peut s'agir d'un chat, d'un assistant latéral, d'un tableau de bord, d'un constructeur de workflows, d'un panneau IDE, de l'application ChatGPT, d'une écran mobile ou d'une console de support.
2.  **Modèle de composition de l'interface** : la grammaire autorisée pour l'expression du modèle. Il peut s'agir d'appels d'outils, de JSON, d'A2UI, de json-render, d'OpenUI Lang, de sélection de composants Hashbrown ou d'HTML sandboxé.
3.  **Runtime et transport** : comment les messages, les appels d'outils, les deltas d'état, les actions utilisateur et les artefacts d'interface circulent entre l'agent et le frontend. AG-UI, MCP Apps, Apps SDK, A2A, SSE, WebSockets et HTTP classique s'inscrivent tous dans cette couche.
4.  **Backend agent et outils** : LangGraph, Google ADK, CrewAI, Mastra, LlamaIndex, Pydantic AI, Agno, OpenAI Agents SDK, fonctions personnalisées, bases de données, récupération d'information et toute la logique métier "ennuyeuse" qui doit néanmoins rester correcte.

Une fois que vous avez séparé les couches, l'écosystème devient beaucoup moins mystérieux.

[AG-UI](https://github.com/ag-ui-protocol/ag-ui) n'est pas vraiment un concurrent de [A2UI](https://github.com/google/A2UI). AG-UI est un protocole d'événements pour l'interaction agent-à-application. A2UI est un format d'interface déclaratif que l'agent peut envoyer. Vous pouvez superposer A2UI sur AG-UI. Vous pouvez également superposer des composants rendus par des outils personnalisés sur AG-UI.

[json-render](https://github.com/vercel-labs/json-render) n'est pas un produit de chat. C'est un catalogue et une architecture de rendu de composants : définissez les composants que le modèle peut utiliser, faites émettre au modèle un arbre JSON valide, puis rendez cet arbre de manière sécurisée.

[CopilotKit](https://github.com/CopilotKit/CopilotKit) n'est pas seulement une bulle de chat. C'est une pile frontend pour les applications natives agent : interface de chat, interface générative, état partagé, outils frontend et flux avec intervention humaine.

[OpenAI Apps SDK](https://developers.openai.com/apps-sdk) et [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) ne sont pas des outils du genre « rends mon application React dynamique ». Ce sont des modèles d'intégration hôte pour afficher des widgets à l'intérieur de ChatGPT ou d'autres hôtes compatibles MCP.

Les noms sont trompeurs car ce domaine est encore jeune. Ce sont les couches qui restent utiles.

## L'échelle de contrôle

L'interface générative est un compromis entre **contrôle du développeur** et **liberté de l'agent**.

Trop de contrôle et l'assistant ressemble à une palette de commandes portant un costume. Trop de liberté et le modèle commence à inventer des maquettes étranges, des boutons vagues, une hiérarchie visuelle cassée, des états impossibles, et des problèmes de sécurité avec un petit sourire confiant.

La clé est de choisir la quantité minimale de liberté nécessaire pour résoudre le problème de l'utilisateur.

![Un spectre allant des composants rendus par outil au HTML généré librement](../control-spectrum.webp)

Je pense au spectre comme suit :

**Le rendu outil-vers-composant** est le choix le plus sûr. Le modèle appelle `get_weather`, `search_products`, `compare_plans` ou `draft_invoice`. L'application mappe le résultat de cet outil à un composant que vous possédez déjà : `WeatherCard`, `ProductGrid`, `PlanComparison`, `InvoiceReview`. Le modèle décide *quand* l'interface utilisateur est utile. Les développeurs conservent le contrôle de la mise en page, du style, de l'accessibilité, des états de chargement, des états vides et des actions dangereuses.

C'est le modèle documenté dans le [guide d'interfaces utilisateur génératives de l'AI SDK Vercel](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) : le modèle appelle un outil, l'outil retourne des données, et l'interface utilisateur rend un composant à partir du résultat. C'est aussi le modèle mental sous-jacent à de nombreuses implémentations de CopilotKit et d'assistant-ui.

**Les catalogues déclaratifs de composants** donnent plus de liberté au modèle. Au lieu de choisir un seul composant, le modèle compose un arbre à partir de parties autorisées. Un catalogue peut inclure `Metric`, `Table`, `Chart`, `FilterBar`, `ApprovalPanel` et `Timeline`. Le modèle peut assembler un tableau de bord ou une étape de workflow, mais il ne peut pas exécuter du code arbitraire. C'est là que se situent [A2UI](https://github.com/google/A2UI), [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown) et [OpenUI](https://github.com/thesysdev/openui).

**Les mini-applications iframe** sont pertinentes lorsque l'interface utilisateur doit être plus riche qu'un arbre de composants, ou lorsque le fournisseur d'outils distant possède l'expérience. Les SDK MCP Apps et OpenAI Apps permettent à un outil de retourner des données structurées plus une ressource de widget que l'hôte rend dans une iframe. C'est puissant pour les cartes, les paniers d'achat, les flux de réservation, les graphiques et les surfaces de produits externes. Cela crée aussi une frontière plus rigide entre l'application hôte et le widget.

**Génération ouverte** est l'extrémité la plus éloignée : l'agent génère du HTML, SVG, Canvas, WebGL ou d'autres artefacts ressemblant à du code dans un sandbox. [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) est le meilleur exemple actuel : l'agent peut générer des visualisations d'algorithmes, des scènes 3D, des diagrammes et des simulations dans des iframes sandboxées. C'est idéal pour des explications visuelles ponctuelles. Ce n'est pas là que je commencerais pour un flux d'approbation d'entreprise.

Il est utile de nommer la distinction clé ici : **iframe HTML** (le modèle écrit du code dans un sandbox) vs **JSON catalog** (le modèle émet une spécification structurée et votre moteur de rendu la mappe à des composants prédéfinis). Ces concepts semblent liés mais présentent des profils de risque et de complexité très différents. L'iframe HTML est maximale en termes d'expressivité ; la frontière de l'iframe assure le travail de sécurité. Le catalogue JSON n'accorde aucune liberté exécutable au modèle — il ne peut référencer que des types de composants définis à l'avance. La plupart des frameworks de ce domaine s'inscrivent clairement dans l'une ou l'autre de ces catégories.

**Au-delà du sandbox** : des démonstrations très récentes suggèrent qu'un quatrième mode émerge — les LLM pilotant des expériences du type jeu ou immersives en contrôlant la sortie visuelle plus directement que n'importe quel catalogue de composants ne le permet. Les projets générant des mondes 3D explorables à partir de prompts, le comportement des PNJ (personnages non-joueurs) dirigé par un LLM en temps réel, et l'inférence de modèles en navigateur via WebGPU ([WebLLM](https://mlc.ai/web-llm/)) en sont des indicateurs précoces. Il n'existe pas encore de frameworks stables pour construire des applications de production ici. Je couvrirai cette direction dans un article dédié une fois que cela changera.

## Composants de haut niveau vs Composants granulaires

C'est la décision de conception la plus importante.

Si votre catalogue est trop granulaire, le modèle doit devenir un ingénieur front-end :

Cela semble flexible, mais le modèle doit désormais décider de l'espacement, de la hiérarchie, du regroupement, des états vides, des libellés de boutons, du traitement des erreurs et du comportement réactif. Vous avez également agrandi le prompt et rendu la sortie plus fragile.

Si votre catalogue est trop haut niveau, le modèle est enfermé :

```tsx
WeatherCard
StockCard
HotelCard
```

Cela est sécurisé, mais cela ne fonctionne qu'avec des scénarios connus. Le modèle ne peut pas créer une matrice de comparaison, demander des entrées manquantes ou adapter l'architecture de l'information lorsque la question de l'utilisateur change.

Le juste milieu utile se trouve dans les **composants de niveau métier avec des slots contraints** :

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

Ces composants encodent le goût produit et les contraintes métier. Le modèle peut décider *de ce qui doit être affiché*, mais pas de chaque décision CSS.

Par exemple, un agent de voyage n'a pas besoin de `div`, `span` et `button`. Il a besoin de :

- `TripSummary`  
- `FlightOptionList`  
- `HotelComparison`  
- `TravelerForm`  
- `PolicyNotice`  
- `BookingConfirmation`  

Un agent financier n’a pas besoin d’un espace de visualisation générique. Il a besoin de :  

- `PortfolioSnapshot`  
- `TransactionTable`  
- `RiskBreakdown`  
- `ScenarioComparison`  
- `ApprovalGate`  

Le catalogue doit ressembler à votre produit, pas à du HTML.  

## Tableau des fonctionnalités  

Ce tableau est intentionnellement subjectif. Il traite chaque projet comme un outil dans une pile, et non comme une plateforme gagnante-tout.

| Technologie | Couche | Meilleure adaptation | Modèle d'interface | Streaming / état | Notes et exemples |
| --- | --- | --- | --- | --- | --- |
| [AG-UI](https://github.com/ag-ui-protocol/ag-ui) | Protocole d'exécution | Connexion des backends agents aux applications frontend | Événements pour messages, outils, état, activité, interruptions | Oui ; flux d'événements et captures d'état/deltas | Utilisez-le lorsque vous avez besoin d'un pipeline standard agent-vers-application. Il complète MCP et A2A plutôt que de les remplacer. |
| [A2UI](https://github.com/google/A2UI) | Protocole d'interface déclaratif | Interface native multiplateforme générée par un agent | Charge utile JSON décrivant les composants, le modèle de données et les mises à jour | Conçu pour les mises à jour incrémentales | Bon choix pour les agents distants et les limites de confiance. En prévisualisation publique précoce, mais conceptuellement clair. |
| [json-render](https://github.com/vercel-labs/json-render) | Catalogue et rendu de composants | Permettre au modèle de composer des composants approuvés | Arbre JSON contraint par un catalogue typé | Prise en charge du rendu progressif | Bon pour React, Vue, Svelte, Solid, React Native, email, PDF, Remotion, terminal, etc. |
| [CopilotKit](https://github.com/CopilotKit/CopilotKit) | Coque de produit et framework d'interface agent | Copilotes intégrés, état partagé, outils frontend, HITL | Rendu d'outils, AG-UI, A2UI, modèles d'applications MCP | Oui | L'une des piles les plus larges pour "construire des applications natives d'agent". Voir les [exemples generative-ui](https://github.com/CopilotKit/generative-ui). |
| [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) | Démonstration de génération d'interface ouverte | Explications visuelles, diagrammes, simulations, graphiques | L'agent émet du HTML/SVG/Canvas dans des iframes sandboxées | Rendu visuel progressif | Utilisez-le pour des artefacts dynamiques où un catalogue de composants fixe est trop limitant. |
| [MCP Apps / mcp-ui](https://github.com/MCP-UI-Org/mcp-ui) | Standard hôte/widget | Fournisseurs d'outils renvoyant une interface interactive via MCP | Ressource HTML liée depuis les métadonnées de l'outil | Pont hôte et actions widget | Meilleur lorsque l'interface appartient à un fournisseur d'outils ou nécessite une isolation par iframe. |
| [OpenAI Apps SDK](https://developers.openai.com/apps-sdk) | Intégration hôte ChatGPT | Création de widgets d'applications ChatGPT personnalisées | Outils serveur MCP et composants d'interface iframe | Entrée/résultat d'outils, état des widgets, messages de suivi | Les nouvelles applications ChatGPT devraient privilégier les champs MCP Apps et le pont `ui/*`, avec `window.openai` pour la compatibilité/les extensions. |
| [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) | SDK d'application et état de chat | Chat personnalisé, appels d'outils, parties de messages en streaming | Rendre les résultats d'outils sous forme de composants React | Oui, via `useChat` et flux de messages | Bon point de départ si vous possédez déjà l'application et souhaitez un contrôle plus bas niveau. Associez-le avec [AI Elements](https://elements.ai-sdk.dev/) pour les primitives d'interface. |
| [assistant-ui](https://github.com/assistant-ui/assistant-ui) | Primitives de chat React | Expérience de chat professionnelle avec rendu personnalisé | Primitives de chat composable, rendu d'appels d'outils, JSON en composants | Oui | Bon si vous avez besoin d'ergonomie de chat raffinée tout en utilisant votre propre backend. |
| [LangGraph Generative UI](https://docs.langchain.com/langgraph-platform/generative-ui-react) | Intégration plateforme agent | Co-localisation des composants d'interface avec le code du graphe | Le graphe émet des messages d'interface nommés rendus par des composants React | Oui, y compris les événements de flux personnalisés | Bonne correspondance pour les déploiements LangGraph et les composants d'interface propriétaires au graphe. |
| [Hashbrown](https://github.com/liveloveapp/hashbrown) | Framework GenUI frontend | Applications React/Angular exposant des composants et outils côté client | LLM sélectionne et rend les composants d'application autorisés | Prise en charge des modèles de streaming | Bon pour intégrer l'intelligence directement dans les surfaces de produit, pas seulement le chat. |
| [OpenUI](https://github.com/thesysdev/openui) | Langage et runtime d'interface compact | Interface générée par modèle avec moins de jetons que JSON | Langage OpenUI + runtime React et bibliothèques de composants | Conçu pour le streaming de jetons | Intéressant lorsque la verbeosité de JSON devient un goulot d'étranglement. Toujours jeune, mais à surveiller. |
| [Tambo](https://github.com/tambo-ai/tambo) | SDK d'interface générative React | Sélection de composants, composants étatiques, exécution d'outils côté client | L'IA sélectionne les composants et interagit avec les outils clients | Orienté état | Option OSS React populaire axée sur l'orchestration automatique des composants. |
| [llm-ui](https://llm-ui.com/) | Rendu de sortie | Sortie de texte LLM plus fluide avec des composants en ligne personnalisés | Analyse les chaînes de sortie du modèle en rendu React | Rendu fluide des jetons | Utile pour des composants personnalisés légers dans les flux de texte ; pas un protocole complet d'interface agent. |
| SDK RSC / React Server Components AI | Modèle/feature plus ancien | Flux de composants rendus côté serveur dans Next.js | Le flux modèle/outil retourne une interface rendue côté serveur | Oui, mais spécifique au framework | Développement suspendu en octobre 2024 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)) ; pas la voie recommandée. Migrez vers `useObject` ou json-render. |

## Quel outil utiliser pour quel produit

Voici la matrice de recommandation que j'utiliserais effectivement avec une équipe.

**Vous ajoutez un assistant à une application SaaS existante.**

Commencez par le rendu composant-outil. Utilisez le [Vercel AI SDK UI](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces), [assistant-ui](https://github.com/assistant-ui/assistant-ui) ou [CopilotKit](https://github.com/CopilotKit/CopilotKit), selon le niveau d'état agent et d'intégration des outils frontend dont vous avez besoin. Gardez le catalogue minimal au départ. Rendez les composants de produit que vous faites déjà confiance.

Examinez de près CopilotKit combiné à AG-UI. La fonction clé n'est pas le "chat". Il s'agit de l'état partagé et de l'interaction bidirectionnelle : l'agent peut demander des entrées, afficher une interface utilisateur, mettre à jour l'état et attendre l'approbation.

**Vous avez des agents distants qui doivent envoyer une interface utilisateur à travers une frontière.**

Utilisez A2UI ou un protocole déclaratif similaire à A2UI. L'idée fondamentale est que l'agent distant peut décrire l'interface utilisateur sous forme de données tout en laissant l'hôte contrôler le rendu natif, la sécurité et le style. Si vous avez également besoin d'une interaction en temps réel entre l'agent et l'application, utilisez AG-UI ou tout autre protocole de transport normalisé par votre environnement.

**Vous développez à l'intérieur de ChatGPT ou d'un hôte compatible MCP.**

Utilisez les applications MCP et la voie du SDK d'applications. Les documents actuels d'OpenAI recommandent le pont `ui/*` des applications MCP pour les nouveaux projets, tout en maintenant `window.openai` comme couche de compatibilité et surface d'extension optionnelle. Copiez également leur séparation entre outils de données et outils de rendu : permettez au modèle de récupérer et de raisonner sur les données avant de décider d'afficher un composant.

**Vous souhaitez des tableaux de bord, rapports ou formulaires en langage naturel dans votre propre application.**

Essayez json-render, Hashbrown ou OpenUI. La clé est le catalogue. Si vous exposez `LineChart`, `DataTable`, `MetricGroup`, `FilterControl` et `InsightCallout`, le modèle peut assemler des surfaces de reporting utiles sans manipuler de code arbitraire.

**Vous souhaitez des artefacts éducatifs, visuels ou très personnalisés.**

Utilisez un sandbox ouvert comme OpenGenerativeUI. Laissez le modèle générer du SVG, du Canvas, du WebGL ou du HTML autonome, mais traitez la sortie comme du contenu utilisateur non fiable. Mettez-le en sandbox, ajustez sa taille, retirez les permissions et isolez-le des états d'application privilégiés.

**Vous avez principalement besoin d'un markdown streaming plus élégant avec quelques interactions en ligne.**

Ne surdimensionnez pas. llm-ui ou assistant-ui pourraient suffire.

## Les erreurs à éviter

**Erreur 1 : Laisser le modèle écrire du React en production à l'exécution.**

Il existe des exceptions, mais pour les interfaces utilisateur de produit, c'est généralement le mauvais choix par défaut. La génération de code à l'exécution est difficile à sécuriser, difficile à tester, difficile à thématiser et difficile à rendre accessible. Si le modèle peut accomplir la tâche en sélectionnant des composants fiables, faites-le plutôt.

**Erreur 2 : Exposer des primitives de conception au lieu de primitives de produit.**

Lorsque vous fournissez au modèle `Row`, `Column`, `Text` et `Button`, vous l'obligez à devenir votre système de design. Il en deviendra un médiocre. Offrez-lui plutôt des noms de produit à haut niveau.

**Erreur 3 : Croire que du JSON valide équivaut à une interface utilisateur sûre.**

Une charge utile peut passer la validation du schéma tout en étant manipulatrice ou dangereuse. L'étiquette peut indiquer « Voir la facture » alors que l'action archive le compte. Traitez les spécifications d'interface comme des comportements, pas comme de la décoration. Elles nécessitent des tests de politique, des vérifications sémantiques et une confirmation humaine pour les actions importantes.

**Erreur 4 : Mettre la logique métier dans les outils de rendu.**  

Les outils de rendu doivent se charger du rendu. Les outils de données doivent récupérer, calculer, muter et valider. Les documents de l'Apps SDK d'OpenAI soulignent cette séparation pour une raison précise : si chaque outil de données traîne un widget avec lui, le modèle perd de la place pour raisonner avant de présenter.  

**Erreur 5 : Optimiser pour la nouveauté au détriment de l'achèvement des tâches.**  

L'objectif n'est pas de faire de chaque réponse une interface unique comme un flocon de neige. L'objectif est de réduire les frottements. Un panneau d'approbation stable et ennuyeux qui fait gagner quatre minutes à l'utilisateur est meilleur qu'un tableau de bord généré de manière éblouissante mais qu'on ne peut pas faire confiance deux fois.  

## Une architecture pratique  

Si je lançais un nouveau produit aujourd'hui, j'adopterais une approche progressive :

1. **Déployez d'abord une interface d'outils contrôlée.** Cartographiez les outils connus vers des composants connus. Journalisez chaque appel d'outils, chaque rendu d'interface et chaque action utilisateur.  
2. **Ajoutez un catalogue de domaine.** Une fois que des modèles se répètent, exposez `ComparisonTable`, `DecisionPanel`, `DataCollectionForm`, `Timeline` et d'autres composants spécifiques au produit.  
3. **Ajoutez la standardisation du transport uniquement si nécessaire.** Si vous contrôlez à la fois l'interface et le backend, un simple streaming peut suffire. Si vous utilisez plusieurs frameworks d'agents, optez pour AG-UI. Si les outils traversent des frontières de produits, utilisez MCP. Si les agents traversent des frontières organisationnelles, surveillez A2A et A2UI.  
4. **Utilisez des widgets iframe pour les surfaces étrangères ou complexes.** Les cartes, les paniers, les flux de réservation et les mini-applications tierces appartiennent à une frontière dédiée.  
5. **Réservez la génération ouverte aux artefacts.** Les diagrammes, les simulations, les explications temporaires et les esquisses visuelles sont idéaux. Les workflows centraux ne le sont pas.  

L'architecture ressemble finalement à ceci :  

```txt
Intent utilisateur
  -> runtime d'agent
  -> appels d'outils/données
  -> résultat structuré
  -> décision d'interface
  -> composant fiable, spécification déclarative ou widget sandboxé
  -> action utilisateur
  -> flux d'état/évènement vers l'agent
```  

Cette boucle est le vrai produit. La boîte de chat n'est qu'un périphérique d'entrée possible.  

## L'évaluation doit inclure l'interface utilisateur  

Les équipes de modèles LLM apprennent lentement à évaluer les invites et les sorties du modèle. L'interface générative ajoute une surface supplémentaire : l'interface elle-même peut être incorrecte.  

Au minimum, conservez ces artefacts pour chaque interface générée :

- invite et contexte des outils  
- appels d'outils et résultats d'outils  
- spécification d'interface générée ou sélection de composants  
- nom du composant rendu et ses propriétés  
- étiquettes visibles par l'utilisateur  
- actions attachées aux boutons/formulaires  
- mises à jour d'état visibles par le modèle depuis l'interface  
- historique des actions de l'utilisateur  

Puis écrivez des vérifications comme :  

- chaque action destructrice doit avoir un composant de confirmation  
- les étiquettes de boutons doivent correspondre à la sémantique des actions  
- les spécifications de rendu ne peuvent référencer que des composants autorisés  
- les totals visibles par l'utilisateur doivent correspondre aux totals des résultats des outils  
- les formulaires ne peuvent pas demander des champs en dehors de la portée de la tâche  
- les widgets ne peuvent pas recevoir des secrets nécessaires uniquement au modèle  
- les métadonnées cachées ne doivent pas contredire les étiquettes visibles  

Cela semble fastidieux. C'est aussi là que se construit la confiance en production.  

## Les liens par lesquels je commencerais  

Si vous souhaitez passer d'article à code, voici les meilleurs points de départ que j'ai trouvés :

- [dépôt AG-UI](https://github.com/ag-ui-protocol/ag-ui) et [documentation AG-UI](https://docs.ag-ui.com/introduction) pour le modèle d'événements runtime.  
- [dépôt A2UI](https://github.com/google/A2UI) et [spécification A2UI](https://a2ui.org/specification/v0.9-a2ui/) pour les payloads déclaratifs agent-à-UI.  
- [dépôt json-render](https://github.com/vercel-labs/json-render) et [documentation json-render](https://json-render.dev/) pour la génération d'interface JSON pilotée par catalogue.  
- [dépôt CopilotKit](https://github.com/CopilotKit/CopilotKit) et [exemples de génération d'interface](https://github.com/CopilotKit/generative-ui) pour les modèles AG-UI, A2UI, Open-JSON-UI et MCP Apps.  
- [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) pour les artefacts visuels sandboxés HTML/SVG/Canvas.  
- [MCP-UI / SDK MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) pour les ressources d'interface via MCP.  
- [documentation SDK Apps OpenAI](https://developers.openai.com/apps-sdk) et [exemples SDK Apps](https://github.com/openai/openai-apps-sdk-examples) pour les widgets d'applications ChatGPT.  
- [guide d'interface générative du SDK AI Vercel](https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces) et [AI Elements](https://elements.ai-sdk.dev/) pour le rendu d'applications chat/outils.  
- [assistant-ui](https://github.com/assistant-ui/assistant-ui) pour les primitives de chat composable React.  
- [documentation d'interface générative LangGraph](https://docs.langchain.com/langgraph-platform/generative-ui-react) pour les composants d'interface émis par graphe.  
- [Hashbrown](https://github.com/liveloveapp/hashbrown) pour la sélection de composants React/Angular et les outils côté client.  
- [OpenUI](https://github.com/thesysdev/openui) pour l'interface générée par modèle, orientée streaming.  
- [Tambo](https://github.com/tambo-ai/tambo) pour l'interface générative React avec composants étatiques.  
- [llm-ui](https://llm-ui.com/) pour les flux de texte fluides avec composants en ligne personnalisés.  

## Note sur la stabilité des projets  

Tous les protocoles majeurs de ce domaine sont pré-1.0. Dernière vérification le 8 mai 2026 ; prévoyez des changements et consultez les documents actuels avant de choisir une plateforme.  

**Vercel AI SDK RSC** — la fonctionnalité originale "Interface générative" — a eu son développement suspendu en octobre 2024 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)) en raison de limites architecturales sans solution à court terme. **json-render** (Vercel Labs) est apparu comme direction de remplacement : basé sur un catalogue, indépendant du framework, sans couplage RSC. Il semble avoir rapidement attiré l'attention des développeurs web depuis son lancement début 2026. La raison probable est l'expérience développeur (DX) : json-render fonctionne immédiatement dans un projet React standard ; l'étendue multiplateforme d'A2UI ajoute une friction d'installation.  

**A2UI** (Google) est pré-1.0 avec des changements cassants entre les versions mineures et une communication roadmap incohérente. Son avantage est une véritable portée multiplateforme (web, Flutter, SwiftUI) que json-render ne couvre pas. Pour les cas d'usage web purs actuels, json-render semble avoir une meilleure couverture d'outils ; pour les scénarios multiplateforme ou agents distants, la conception d'A2UI est plus appropriée. Une convergence entre les deux spécifications est possible — Vercel a expérimenté une sortie compatible A2UI depuis json-render.  

**AG-UI** (CopilotKit) est également pré-1.0. La confusion la plus courante est le nom : AG-UI est un protocole de transport, pas un framework d'interface. Il définit *comment* les événements circulent entre l'agent et le frontend ; ce que vous affichez reste à votre discrétion. Le concept est solide et largement adopté. La spécification évolue encore.

## Mon avis

L'interface générative ne remplacera pas les interfaces soigneusement conçues. Elle remplacera l'hypothèse simpliste selon laquelle un transcript de chat est l'interface universelle pour l'IA.

Les meilleurs systèmes n'autoriseront pas le modèle à improviser tout. Ils lui offriront un ensemble restreint et précis de blocs de construction natifs au produit ; une connexion fiable en temps réel ; des limites de sécurité claires ; et suffisamment de liberté pour adapter l'interface à la tâche.

L'avenir n'est pas « le modèle écrit votre interface front-end ».

L'avenir ressemble davantage à : **votre interface front-end devient un instrument que l'agent peut jouer, mais vous décidez toujours de ce que l'instrument est autorisé à sonner.**
````
