# Translation Candidate
- Slug: llm-generative-ui-landscape-2026
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/fr/index.mdx
- Validation: passed
- Runtime seconds: 104.58
- Input tokens: 54540
- Output tokens: 45705
- Thinking tokens: unknown
- Cached input tokens: 22016
- Cache write tokens: 0
- Estimated cost: $0.015332
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: ''
subTitle: ''
date: '2026-05-10'
modified: '2026-05-10'
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
---
« Generative UI » désigne au moins cinq concepts distincts selon celui qui le mentionne.  

- Interfaces de chat intégrant des cartes de produit à partir d'appels d'outils de modèle  
- Spécifications JSON en temps d'exécution que l'interface frontale rend comme des arbres de composants  
- Iframes sandboxés renvoyés par les outils MCP vers les applications hôte (de la commande de billets, de la réservation d'hôtels jusqu'à la génération de cartes ou les widgets de paiement)  
- Protocoles d'événements diffusant l'état de l'agent vers l'interface frontale  
- v0, Lovable et Bolt : outils IA qui écrivent React à l'étape de conception  

Ces concepts sont liés, mais ils s'inscrivent dans des couches de l'architecture différentes, présentent des profils de risque variés, impliquent des coûts d'implémentation différents et s'appliquent à des cas d'utilisation distincts. Les confondre transforme chaque discussion sur l'architecture en un brouillard.

C'est la carte que je veux quand je décide où dans la pile je dois aller.

---

## Ce que l'interface générative n'est pas

Avant de définir ce qu'il est, trois points à écarter :  

**Génération de code en temps de conception** — v0, Lovable, Bolt, Cursor composant des composants React. Ces outils génèrent du code que les développeurs examinent et commit. L'IA s'exécute pendant le développement. Ce qui est déployé est statique du point de vue de l'utilisateur. C'est une excellente catégorie d'outils. Ce n'est pas ce que signifie « interface générative en temps d'exécution ».  

**Remplissage automatique de formulaires assisté par l'IA** — le modèle remplit les valeurs des champs à partir du contexte. La structure de l'interface reste fixe ; seul le contenu change. C'est un schéma utile. Ce n'est pas une interface générative.

**L'IA écrit du HTML brut dans une page** — le modèle génère des chaînes `<div>` et `<button>` qui sont injectées via `innerHTML` ou `dangerouslySetInnerHTML`. C'est *bien* une interface générative en temps d'exécution au sens technique le plus strict. C'est aussi la version la plus dangereuse, et celle que chaque framework mature dans ce domaine existe pour éviter. Le markup généré par l'IA en brut implique un risque XSS, des attributs non accessibles, un stylage incohérent et une structure hallucinée. Le reste de cet article traite de comment faire mieux que cela.  

## Une définition opérationnelle

L'interface générative en temps réel signifie : **le modèle détermine quel composant d'interface ou quelle composition de composants l'utilisateur voit, en fonction de l'état de la conversation ou de la tâche.**

Pas les mots. L'interface.

Le cas le plus simple : votre assistant de réservation de vols appelle un outil `search_flights`. Au lieu de renvoyer un texte brut (« Here are three options... »), il rend un composant `<FlightResultsCard>` avec des vols sélectionnables, des commutateurs de classe de siège et un bouton « Book ». Le modèle a décidé qu'une carte structurée était la bonne réponse ici. Le développeur a décidé de l'apparence de cette carte et de l'action associée au bouton « Book ».

Le cas plus complexe : un agent d'analyse financière reçoit une question sur un portefeuille et décide de composer une réponse avec un `MetricGroup` affichant des indicateurs clés, un graphique `RiskBreakdown`, une table `ScenarioComparison` et un `PolicyNotice`. Le modèle a assemblé ce layout à partir d'un catalogue de composants préapprouvés. Le développeur a défini chaque composant. Le modèle a choisi lesquels utiliser et quelles données y placer.

Les deux cas constituent de l'interface générative. Ils diffèrent par le degré de liberté de composition accordé au modèle, ce qui détermine à la fois la richesse des sorties possibles et la complexité des erreurs potentielles.

## Les trois modèles  

L'ensemble de l'espace se résume à trois modèles, chacun avec une grammaire de sortie différente.  

![Un diagramme de spectre montrant trois modèles : appels d'outils uniquement à gauche (le plus sûr), catalogue de composants au milieu, et génération ouverte à droite (la plus expressive).](../output-grammar-spectrum.svg)

Chaque décision d'interface générative est un point sur ce spectre. Commencez à gauche.

### Modèle 1 : Rendu outil-vers-composant

Le modèle appelle un outil nommé. Votre application dispose d'une carte des noms d'outils vers les composants. L'appel d'outil déclenche le rendu d'un composant.

```tsx
// The model calls: { name: "show_flight_results", args: { flights: [...] } }

useCopilotAction({
  name: "show_flight_results",
  render: ({ args }) => <FlightResultsCard flights={args.flights} />,
});
```

C'est le modèle le plus sûr car la mise en page ne provient jamais du modèle. Le modèle décide *quand* afficher un composant et *quelles données* le remplir. Vos développeurs contrôlent toujours le code du composant, la conception visuelle, l'implémentation de l'accessibilité et chaque cas limite de la logique de rendu.

Le SDK Vercel AI avec les gestionnaires `tool` de `useChat` implémente cette approche. Le rendu des outils d'assistant-ui suit ce modèle. Le « Static Generative UI » de CopilotKit correspond exactement à ce schéma. La plupart des interfaces copilote en production qui fonctionnent de manière fiable utilisent cette approche.

**Adéquat lorsque** : l'ensemble des éléments que vous souhaitez afficher est connu à l'avance en développement. Confirmations de réservations, résultats de recherche, résumés de compte, widgets d'approbation. Si vous pouvez énumérer les scénarios, ce modèle les couvre.

### Modèle 2 : Composition à partir d'un catalogue de composants  

Le modèle génère un arbre JSON typé qui référence des composants depuis un catalogue défini par le développeur. Votre interface frontale dispose d'un moteur de rendu qui parcourt cet arbre et instancie chaque composant.  

```json
[
  { "type": "metric_group", "metrics": [
    { "label": "MRR", "value": "$82,400", "delta": "+12%" },
    { "label": "Churn", "value": "2.1%", "delta": "-0.4%" }
  ]},
  { "type": "line_chart", "title": "30-day growth", "data_ref": "mrr_series" },
  { "type": "insight_callout", "text": "Expansion revenue driving the delta — avg seat count up 18%." }
]
```  

Le modèle a composé cette mise en page. Un `MetricGroup`, un `LineChart`, un `InsightCallout`. Mais vous avez défini ce que chaque type de composant signifie, quelles propriétés il accepte et comment il est rendu. Si le modèle tente d'émettre `{ "type": "custom_untested_thing" }`, votre validation de schéma le détecte et le rendu l'ignore ou le rejette.

C'est le modèle derrière `json-render`, `A2UI`, `Hashbrown`, `OpenUI` et `Tambo`. Le travail d'ingénierie clé est la **conception du catalogue** — décider quels types de composants existent, à quoi ressemblent leurs schémas, et ce que le modèle peut ou ne peut pas composer.

**Adéquat lorsque** : la structure de ce que vous souhaitez afficher varie légitimement en fonction des données ou de la demande de l'utilisateur. Des tableaux de bord s'adaptant à ce qui est notable dans les chiffres. Des rapports affichant différentes sections selon le contexte. Des panneaux de workflow changeant en fonction de l'étape sur laquelle un agent se trouve.

### Modèle 3 : Génération ouverte

Le modèle génère du HTML, SVG, Canvas ou WebGL qui est rendu à l'intérieur d'un iframe isolé avec une Politique de sécurité du contenu stricte.

Cela convient aux cas où aucun catalogue de composants fixe ne suffit : visualisations d'algorithmes, diagrammes architecturaux, graphiques ad hoc, art génératif, simulations pédagogiques. La frontière de l'iframe assure ici la sécurité ; la supprimer vous ramène au problème d'injection de HTML brut mentionné en début d'article.

`CopilotKit/OpenGenerativeUI` est l'implémentation de référence actuelle de ce modèle. Le sandbox supprime les scripts, limite le passage de messages et isole l'artefact généré du l'état privilégié de votre application.

**Adéquat lorsque** : vous avez réellement besoin de sortie visuelle arbitraire — diagrammes explicatifs ponctuels, simulations dynamiques, artefacts créatifs. N'utilisez pas cela pour une interface transactionnelle. Une confirmation de commande n'a pas besoin d'un iframe isolé.

### Au-delà des trois modèles : les LLM contrôlant les pixels directement

Il existe une quatrième direction émergente qui ne s'inscrit pas nettement dans l'un de ces modèles : les LLM générant des **expériences immersives et jeux vidéo** en contrôlant la sortie visuelle de manière plus directe qu'un iframe isolé.

La distinction canonique dans l'interface générative est **HTML iframe vs. catalogue JSON** :

- **HTML iframe** — le modèle génère du HTML, SVG, Canvas ou WebGL qui s'affiche dans un sandbox isolé. Liberté d'expression maximale ; la sécurité dépend entièrement de la frontière iframe. Exemples : Anthropic Artifacts, OpenGenerativeUI.
- **Catalogue JSON** — le modèle produit un payload structuré contraint à un catalogue de composants défini par le développeur ; votre moteur de rendu instancie des composants fiables, préconstruits, à partir de cette spécification. Le modèle décide *ce qu'il faut afficher* ; vous décidez *comment* cela s'affiche. Exemples : json-render, A2UI.

Au-delà de ces deux approches, des démonstrations très récentes suggèrent un troisième mode où le modèle ne sélectionne pas de composants ni n'écrit d'HTML isolé — il pilote directement le canvas. Des projets comme [HunyuanWorld de Tencent](https://arxiv.org/abs/2502.01999), qui génère des environnements 3D explorables à partir d'une seule image, ou des architectures de jeux où les LLM génèrent des cartes, des PNJ et des quêtes en temps réel plutôt que d'appeler un catalogue de composants, suggèrent un avenir où le modèle agit davantage comme un réalisateur de jeu que comme un moteur de formulaire. L'inférence LLM dans le navigateur via WebGPU ([WebLLM](https://mlc.ai/web-llm/)) pousse la même frontière localement.

Cette zone est effectivement très excitante et effectivement très naissante. Il n'existe encore aucun framework stable permettant de construire des produits en production. Je traiterai cette approche dans un article dédié une fois que cela changera.

---

## L'Écosystème Complet

![Un diagramme à quatre couches représentant tous les outils majeurs de l'interface générative : protocoles (AG-UI, A2UI, MCP Apps) en haut, coques d'application JavaScript (CopilotKit, Vercel AI SDK, assistant-ui, LangGraph), puis outils de catalogue JavaScript (json-render, Hashbrown, OpenUI, Tambo), et enfin outils Python en bas (Gradio, Streamlit, LangChain, Haystack).](../full-stack-map.svg)

_Four layers. Les protocoles définissent le format de communication. Les coques d'application gèrent l'état et le rendu. Les outils de catalogue contrôlent ce que le modèle peut générer. Les outils Python forment une voie parallèle pour les workflows de données et d'apprentissage automatique._

## Les protocoles : AG-UI et A2UI

AG-UI et A2UI sont les deux principaux standards dans la couche des protocoles. Ils résolvent des problèmes différents et ne sont pas concurrents.

### AG-UI

AG-UI est un protocole pour la communication entre les modèles génératifs et les interfaces utilisateur. Il définit un format basé sur JSON pour la gestion de l'état, la sélection d'éléments d'interface et les interactions utilisateur. Il permet au modèle de demander des éléments d'interface spécifiques (comme des boutons, des champs de texte ou des tableaux) basés sur l'état de l'application, tout en évitant l'injection brute de HTML. Cela rend AG-UI adapté aux applications nécessitant à la fois flexibilité et contrôle de sécurité, comme les assistants IA intégrés aux outils de productivité.

**GitHub** : [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)

AG-UI est un protocole basé sur les événements pour la communication entre agents IA et applications frontend. Il définit environ 16 types d'événements : `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TOOL_CALL_START`, `TOOL_CALL_END`, `STATE_SNAPSHOT`, `STATE_DELTA`, et ainsi de suite. Le transport dépend de vous — SSE, WebSockets, webhooks fonctionnent tous. Le format est délibérément souple pour favoriser une adoption large.

AG-UI ne définit pas l'apparence de votre interface. Il définit comment l'agent communique *avec* votre frontend. Pensez-y comme à la couche de protocole filaire qui permet à votre application React de s'abonner à un agent LangGraph de la même manière qu'à un agent CrewAI, sans modifier le code frontend.

CopilotKit a créé AG-UI à partir de son travail avec LangGraph et CrewAI. Il a été adopté par LangChain, Mastra, PydanticAI et d'autres. Microsoft a publié un guide d'intégration AG-UI. Si vous construisez une interface multi-agents et que vous avez besoin de découpler les cadres backend des codes frontend, AG-UI est la solution.

**Une clarification qui piège souvent les gens** : AG-UI n'est pas un framework d'interface. Il ne vous dit pas ce que vous devez afficher. Il vous indique *que* l'agent a dit quelque chose, a appelé un outil ou mis à jour un état partagé. Ce que vous affichez en réponse reste votre décision.

### A2UI

**GitHub** : [google/A2UI](https://github.com/google/A2UI) · Spécification : [a2ui.org](https://a2ui.org/)

A2UI est la spécification déclarative de Google pour ce que les agents envoient lorsqu'ils souhaitent afficher une interface. Alors qu'AG-UI répond à la question « comment l'agent communique-t-il ? », A2UI répond à la question « quel format l'agent utilise-t-il pour décrire une disposition de composants ? ».

A2UI utilise un format JSONL plat : un descripteur de composant par ligne, chacun avec un ID, un type et des données. Le format plat est intentionnel. Les arbres imbriqués exigent que le modèle connaisse l'ensemble de la structure avant de pouvoir commencer à diffuser. Une liste plate permet au modèle d'émettre chaque composant au fur et à mesure qu'il « y pense », ce qui signifie que votre interface frontale peut commencer à afficher la première carte de métrique pendant que le modèle décide encore s'il faut ajouter un graphique.

```jsonl
{"id":"h1","type":"kpi_card","title":"MRR","value":"$82,400","delta":"+12%"}
{"id":"h2","type":"kpi_card","title":"Churn","value":"2.1%","delta":"-0.4%"}
{"id":"c1","type":"line_chart","title":"30-day MRR","data_ref":"mrr_series"}
{"id":"t1","type":"data_table","cols":["Month","MRR","Net New"],"data_ref":"monthly"}
```

A2UI est conçu avec une attention particulière à la sécurité : la spécification est un format de données, pas un code exécutable. Le catalogue de composants est défini à l'avance par le développeur ; l'agent ne peut faire référence qu'aux types présents dans ce catalogue. Un moteur de rendu A2UI qui reçoit un nom de type inconnu l'ignore.

Le format "Open-JSON-UI" de CopilotKit est compatible avec A2UI. Si vous choisissez un format de spécification pour un catalogue de composants aujourd'hui, A2UI est celui qui bénéficie du soutien le plus étendu en termes de plateformes croisées.

**Note sur la stabilité** : A2UI est en préversion 1.0 — v0.9 lors de la dernière vérification le 8 mai 2026 — et a apporté des modifications de spécification cassantes entre les versions mineures. Les communications de Google sur le calendrier ont été irrégulières et certains moteurs de rendu (Lit, Flutter) ont eu du retard par rapport aux mises à jour de la spécification. Prévoyez un temps pour le dérive de spécification si vous y construisez aujourd'hui. Pour les cas d'utilisation web purs, json-render semble actuellement disposer d'outils plus complets. L'avantage à long terme d'A2UI est sa portée multiplateforme (web, Flutter, SwiftUI, Android) que json-render n'a pas.

### Applications MCP

**GitHub** : [modelcontextprotocol](https://github.com/modelcontextprotocol) · Lié : [mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)

MCP a commencé en tant que protocole pour connecter les LLM à des outils et des données. L'extension Applications permet aux outils MCP de renvoyer non seulement des données, mais aussi des artefacts d'interface utilisateur interactifs : composants React, formulaires, tableaux de bord, cartes.

Le modèle de sécurité est strict et c'est justement l'objectif : tout est rendu dans un iframe isolé avec des permissions réduites, les modèles sont pré-déclarés afin que l'application hôte puisse les examiner, et toute communication se fait via du JSON-RPC auditables. C'est le bon modèle pour les fournisseurs d'outils - un serveur MCP Shopify peut renvoyer un widget de paiement ; un service de cartographie peut renvoyer une carte intégrable. L'application hôte ne possède ni ne fait confiance au code de ce widget.

MCP Apps est le bon choix lorsque l'interface appartient au fournisseur d'outils, et non à votre application. Pour les interfaces qui appartiennent à votre domaine d'application, restez sur le Modèle 1 ou 2.

## Les frameworks JavaScript/TypeScript

### CopilotKit

**GitHub** : [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) · Exemples : [CopilotKit/generative-ui](https://github.com/CopilotKit/generative-ui)

CopilotKit est le framework le plus complet pour les applications frontend natives d'agents. Il gère le cycle de vie complet : connexion aux backends d'agents via AG-UI, gestion de l'état de conversation bidirectionnelle, rendu des composants d'interface générative, et fourniture des canalisations d'état partagé permettant aux agents et aux utilisateurs de modifier les mêmes données.

CopilotKit est le framework le plus complet pour les applications frontend natives d'agents. Il gère le cycle de vie complet : connexion aux backends d'agents via AG-UI, gestion de l'état de conversation bidirectionnelle, rendu des composants d'interface générative, et fourniture des canalisations d'état partagé permettant aux agents et aux utilisateurs de modifier les mêmes données.

Le modèle à trois modèles s'aligne clairement sur les APIs de CopilotKit :  
- `useCopilotAction` avec un rappel `render` → Modèle 1  
- Rendu A2UI/Open-JSON-UI → Modèle 2  
- Artefacts sandboxés `OpenGenerativeUI` → Modèle 3  

La fonctionnalité clé de CopilotKit qui reste sous-discutée est **l'état partagé et la participation humaine en boucle** : l'agent peut lire et écrire l'état de l'application, l'utilisateur peut lire et écrire cet état, et les modifications s'appliquent de manière bidirectionnelle. C'est précisément ce qui donne aux interfaces de type assistant le sentiment d'une véritable collaboration plutôt qu'un simple chat box collé à un produit.

### Vercel AI SDK

**GitHub** : [vercel/ai](https://github.com/vercel/ai) · Docs : [ai-sdk.dev](https://ai-sdk.dev/)

Le Vercel AI SDK est la base TypeScript de facto pour les applications IA. Pour les interfaces génératives en particulier :

**`useObject`** transmet un objet JSON structuré depuis le serveur à mesure qu'il est généré. Vous définissez un schéma Zod ; le SDK analyse le JSON partiel et déclenche des mises à jour à mesure que les champs arrivent. C'est la meilleure solution pour le Modèle 2 dans une application Next.js.

```tsx
const { object: dashboard } = useObject({
  api: "/api/generate-dashboard",
  schema: z.object({
    title: z.string(),
    metrics: z.array(z.object({ label: z.string(), value: z.number() })),
    insights: z.array(z.string()),
  }),
});
```

**`useChat` avec les générateurs d'outils** → Pattern 1. Le modèle appelle des outils ; vous associez les noms d'outils à des composants.

**AI Elements** ([elements.ai-sdk.dev](https://elements.ai-sdk.dev/)) fournit des primitives d'interface utilisateur prêtes à l'emploi à associer avec le SDK.

**Une note sur la trajectoire confuse** : En octobre 2024, Vercel a annoncé dans [GitHub Discussion #3251](https://github.com/vercel/ai/discussions/3251) que l'AI SDK RSC — le modèle de streaming React Server Components présenté comme la fonctionnalité phare "Generative UI" de l'SDK 3.0 — avait été suspendu indéfiniment en raison de "plusieurs limitations persistantes" sans solutions viables à court terme. Les équipes ayant construit des stratégies produit autour du streaming RSC ont été prises de court. Les API `generateObject`/`streamObject` ont également été dépréciées dans l'SDK 6.0. La migration recommandée depuis l'AI SDK RSC est le modèle `useObject` ci-dessus, ou json-render pour la génération basée sur un catalogue.

### assistant-ui

**GitHub** : [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)

assistant-ui est un ensemble de primitives React composable pour construire des interfaces de chat de qualité de production. C'est la bonne solution lorsque vous avez besoin d'une UX de chat soignée — bulles de message, tokens de streaming, actions de copie/modification/régénération, états de réflexion — et que vous souhaitez utiliser votre propre backend et votre propre rendu d'outils.

Il fonctionne bien couplé à n'importe quel backend (OpenAI, Anthropic, modèles locaux, points de terminaison personnalisés) et gère le rendu des appels d'outils via un modèle de slot/prop de rendu familier.

### json-render

**GitHub** : [vercel-labs/json-render](https://github.com/vercel-labs/json-render) · Docs : [json-render.dev](https://json-render.dev/)

json-render met en œuvre le Schéma 2 avec une approche orientée et complète. Vous obtenez un catalogue de composants prédéfini (composants shadcn/ui avec des schémas Zod), un moteur de rendu et une boucle de génération étroite où le modèle est contraint par le catalogue via le schéma.

Les fonctionnalités distinctives :
- **Rendu multi-cibles** : la même spécification JSON peut être rendue dans une application web React, une application mobile React Native, un PDF, un e-mail HTML ou une vidéo Remotion. Cela s'avère particulièrement utile pour les rapports.
- **Rendu progressif** : les composants apparaissent à mesure que le modèle les transmet, et non pas une fois que l'ensemble de la spécification est reçu.
- **Contraintes de schéma étroites** : le catalogue est conçu de manière à ce que le modèle ne puisse pas générer des types de composants valides mais inconnus.

Si vous développez une fonctionnalité de tableau de bord ou de génération de rapports et souhaitez éviter le travail d'infrastructure lié à la conception de votre propre catalogue, `json-render` est le chemin le plus rapide pour les applications web.

**Sur l'élan** : `json-render` a été lancé par Vercel Labs au début de 2026 et semble avoir rapidement attiré l'attention des développeurs web car il s'intègre immédiatement dans les projets standard React/Next.js. Cela dit, `json-render` est encore en version pré-1.0 et la relation entre `json-render` et A2UI est encore en cours de définition — Vercel a expérimenté avec une sortie compatible A2UI, donc une convergence est possible. Pour les applications multiplateforme (mobile natif, multiples frameworks), A2UI reste le pari à long terme plus avantageux.

### Hashbrown

**GitHub** : [liveloveapp/hashbrown](https://github.com/liveloveapp/hashbrown)

Hashbrown adopte une approche distinctive : au lieu de construire une couche d'interface IA séparée, il intègre directement la sélection de composants IA dans votre application React ou Angular existante. Vous exposez les composants de votre application au modèle LLM ; ce dernier sélectionne lesquels afficher et peut invoquer des outils côté client.

C'est l'outil idéal lorsque vous souhaitez introduire de l'intelligence dans des interfaces produit qui ne sont pas des « chat » — une page produit qui adapte sa mise en page, un panneau de paramètres qui affiche les bonnes options, un éditeur de workflow qui suggère l'étape suivante.

### OpenUI

**GitHub** : [thesysdev/openui](https://github.com/thesysdev/openui) · Documentation : [openui.com](https://www.openui.com/)

OpenUI remplace le JSON par un format ressemblant à un code orienté lignes (« OpenUI Lang ») conçu pour le rendu progressif et l'efficacité en termes de jetons. L'affirmation est d'environ 67 % moins de jetons que le JSON équivalent pour les maquettes complexes.

L'échange réside dans la maturité de l'écosystème — OpenUI est plus récent et les outils sont moins éprouvés que les approches basées sur JSON. Mais si le coût des jetons est une contrainte significative et que vous générez des maquettes complexes à une fréquence élevée, l'efficacité du format est réelle.

### Tambo

**GitHub** : [tambo-ai/tambo](https://github.com/tambo-ai/tambo)

Tambo se concentre sur la sélection de composants avec état persistant : l'IA sélectionne les composants et peut interagir avec eux via des outils côté client, maintenant l'état des composants tout au long de la conversation. Idéal pour les cas d'utilisation où les éléments d'interface utilisateur persistent entre les tours de conversation — un composant de filtre que l'utilisateur ajuste tandis que l'IA continue de raisonner sur les données filtrées.

## La couche Python

L'écosystème Python aborde les interfaces IA différemment. Ces outils sont optimisés pour les démonstrations de modèles ML, les applications de données et les outils internes — pas les applications grand public en production avec une composition de mise en page pilotée par des agents.

Ce n'est pas un reproche. Pour les cas d'utilisation appropriés, Gradio et Streamlit sont les seuls outils dont vous avez besoin.

### Gradio

**GitHub** : [gradio-app/gradio](https://github.com/gradio-app/gradio) · PyPI : `gradio`

La valeur fondamentale de Gradio : vous écrivez une fonction Python ; Gradio l'entoure d'une interface web. La classe `Interface` suffit en 3 lignes pour un classifieur d'images. `ChatInterface` prend 10 lignes pour un chatbot. `Blocks` vous donne un contrôle fin sur la mise en page lorsque vous en avez besoin.

L'« interface générative » dans Gradio est définie par le développeur Python, pas par le modèle. La visibilité et la configuration des composants peuvent changer dynamiquement en fonction des sorties du modèle, mais le catalogue de composants est statique — vous ne demandez pas au modèle de composer les mises en page.

Gradio est le choix par défaut pour HuggingFace Spaces et l'écosystème des démonstrations ML. Il compte des millions de téléchargements mensuels et alimente une grande partie du paysage des démonstrations d'IA.

**Utilisez Gradio lorsque** : vous êtes développeur Python créant une démonstration de modèle ML, un prototype de recherche ou un outil interne, et que vous ne souhaitez pas avoir à manipuler le JavaScript.

### Streamlit

**GitHub** : [streamlit/streamlit](https://github.com/streamlit/streamlit)

Le modèle de Streamlit est plus dogmatique : un script Python s'exécute en entier à chaque interaction. Vous appelez `st.chat_message()`, `st.dataframe()`, `st.plotly_chart()`. Le framework gère la mise en page.

Le modèle de réexécution complète du script semble peu efficace mais s'avère surprenamment ergonomique pour les chatbots IA qui accumulent l'historique des conversations — l'ensemble du script se réexécute, l'historique est stocké dans l'état de session, et la sortie est déterministe. Streamlit propose désormais une prise en charge native des principaux fournisseurs de modèles LLM et s'intègre nativement avec Snowflake Cortex.

**Utilisez Streamlit lorsque** : vous développez une application de données alimentée par l'IA, un outil de reporting interne ou un tableau de bord appuyé sur l'apprentissage automatique (ML) en Python, et que vous souhaitez le chemin de déploiement le plus simple possible.

### LangChain et Haystack

Il s'agit de frameworks d'orchestration backend, pas de frameworks d'interface utilisateur. Ils apparaissent dans tout schéma honnête d'architecture de génération d'interface car ils constituent généralement la couche où les sorties structurées sont générées avant d'être envoyées à une couche frontale.

**LangChain** ([langchain-ai/langchain](https://github.com/langchain-ai/langchain)) : `.with_structured_output()` sur n'importe quel LLM vous donne une génération de JSON contraint par Pydantic. Le décorateur `@tool` avec génération automatique de schéma est la méthode la plus claire pour définir quels outils le modèle peut appeler. LangChain transmet les résultats structurés à la couche frontale que vous utilisez.

**Haystack** ([deepset-ai/haystack](https://github.com/deepset-ai/haystack)) : architecture modulaire de pipeline avec un bon support de RAG. Hayhooks transforme les pipelines Haystack en points de terminaison HTTP — y compris des points de terminaison compatibles MCP. Si votre interface générative a besoin d'une base de récupération, l'architecture de pipeline de Haystack gère cela proprement.

Aucun des deux frameworks ne contrôle la couche UI. Ils génèrent les données que votre interface (Modèle 1, 2 ou 3) affiche.

---

## Référence des fonctionnalités

Utilisez le catalogue ci-dessus comme guide, pas comme une liste d'achats. La pile se réduit généralement à un choix par couche :

| Besoin | Commencez ici |
|--------|----------------|
| Flux d'événements agent-vers-interface frontale | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |
| Charge utile d'interface déclarative traversant une frontière de confiance | [A2UI](https://github.com/google/A2UI) ou [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) |
| Rendu de chat/outils propriétaire de l'application | [Vercel AI SDK](https://github.com/vercel/ai), [assistant-ui](https://github.com/assistant-ui/assistant-ui), ou [CopilotKit](https://github.com/CopilotKit/CopilotKit) |
| Tableaux de bord, rapports et formulaires composés à partir d'un catalogue | [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown), [OpenUI](https://github.com/thesysdev/openui), ou [Tamb...

| Besoins | Commencez ici |
|---------|---------------|
| Flux d'événements agent-vers-interface | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |
| Charge utile d'interface déclarative traversant une frontière de confiance | [A2UI](https://github.com/google/A2UI) ou [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) |
| Rendu de chat/outils propriétaires de l'application | [Vercel AI SDK](https://github.com/vercel/ai), [assistant-ui](https://github.com/assistant-ui/assistant-ui) ou [CopilotKit](https://github.com/CopilotKit/CopilotKit) |
| Tableaux de bord, rapports et formulaires composés à partir d'un catalogue | [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown), [OpenUI](https://github.com/thesysdev/openui) ou [Tambo](https://github.com/tambo-ai/tambo) |
| Artefacts visuels en sandbox | [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |
| Démonstrations Python et applications de données | [Gradio](https://github.com/gradio-app/gradio) ou [Streamlit](https://github.com/streamlit/streamlit) |

---

## Vélocité de l'écosystème et terrain instable

Ce domaine évolue rapidement et plusieurs projets ont accompagné leur code de communications embrouillées. Dernière vérification le 8 mai 2026 ; considérez ces notes sur l'état des projets comme une lecture datée, et non un verdict définitif.

**Vercel AI SDK RSC** était la caractéristique phare de la version 3.0 de l'SDK. Vercel a suspendu son développement en octobre 2024 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)), invoquant des limites architecturales liées aux React Server Components sans solution à court terme. Les équipes ayant construit dessus ont eu une frustration compréhensible. Il est toujours mentionné dans la documentation mais n'est plus la recommandation principale ; `useObject` l'est désormais.

**json-render** (Vercel Labs) est la nouvelle direction – une alternative basée sur un catalogue, indépendante du framework, qui évite les problèmes d'interdépendance avec les RSC. Il est pré-1.0 et semble susciter un vif intérêt initial parmi les développeurs React/web. La raison probable concernant l'expérience développeur (DX) : json-render est immédiatement utilisable dans un projet standard React/Next.js, tandis que l'étendue multiplateforme d'A2UI ajoute des frottements de configuration. Comment cela évoluera lorsque les deux spécifications mûriront reste véritablement incertain. Vercel a exploré la compatibilité avec A2UI dans json-render, suggérant qu'une convergence est possible.

**A2UI** (Google) est pré-1.0 (v0.9 lors de la dernière vérification), avec des changements cassants entre les versions mineures et une communication incohérente de Google sur son calendrier. C'est le bon choix pour une portée multiplateforme (web + Flutter + SwiftUI) que json-render ne couvre pas, et il bénéficie d'un soutien significatif des entreprises. Pour les projets web purs actuellement, l'expérience développeur est plus rugueuse.  

**AG-UI** (CopilotKit) est également pré-1.0. La confusion la plus courante : le nom donne l'impression qu'il s'agit d'un framework UI. Ce n'est pas le cas — c'est un protocole de transport. AG-UI définit comment les événements circulent entre les backends d'agents et votre interface ; ce que vous affichez en réponse reste votre décision. Ce modèle mental est solide et largement adopté, mais la spécification pré-1.0 signifie que les cas limites sont encore en cours de résolution.  

La conséquence pratique : **chaque acteur majeur ici est pré-1.0**. Prévoyez des changements d'API. Les modèles — outil-vers-composant, composition à partir d'un catalogue, génération en sandbox — sont suffisamment stables pour être utilisés. Les choix spécifiques de protocole ne le sont pas.

## Conception du catalogue de composants : Le vrai travail d'ingénierie  

La majeure partie de la complexité intéressante dans le Modèle 2 ne se trouve pas dans le renderer — c'est dans le catalogue.

Le catalogue est une **décision produit encodée sous forme de schéma**. Il répond à la question : quels sont les objets d'interface utilisateur pertinents dans ce domaine ? Pas « quels composants React existent ? » mais « qu'est-ce qu'un utilisateur dans ce contexte a réellement besoin de voir et d'interagir ? »

**Mode d'échec trop granulaire** : vous exposez `Row`, `Column`, `Text`, `Button`, `Icon`. À présent, le modèle doit devenir ingénieur frontend. Il générera un agencement médiocre qui ne correspond pas à votre système de design, oubliera les états vides, produira un balisage non accessible, et changera constamment d'approche d'une réponse à l'autre car rien dans le catalogue ne contraint la sortie à votre langage visuel produit.

**Mode d'échec trop grossier** : vous exposez `WeatherCard`, `FlightCard`, `HotelCard`. Le modèle ne peut s'adapter quand l'utilisateur demande quelque chose qui ne correspond pas à une carte prédéfinie. Il revient alors à du texte.

**Le milieu utile** : composants de niveau domaine avec des emplacements contraints.  

Un catalogue d'application de voyage pourrait ressembler à :  

```
TripSummary         — aperçu de l'itinéraire
FlightOptionList    — options de vol sélectionnables avec tarifs
HotelComparison     — cartes d'hôtel côte à côte
TravelerForm        — collecte des détails du voyageur
PolicyNotice        — mention réglementaire/règles de tarification
BookingConfirmation — confirmation finale avec bouton d'action
```  

Un catalogue d'application financière pourrait ressembler à :

```
PortfolioSnapshot   — positions clés et résultats
TransactionTable    — transactions filtrables et paginées
RiskBreakdown       — allocation et indicateurs de volatilité
ScenarioComparison  — modélisation de scénarios côte à côte
ApprovalGate        — action nécessitant une confirmation humaine
```

Le catalogue ressemble au vocabulaire de votre produit. Il encode vos décisions UX, vos exigences d'accessibilité, votre gestion des états vides et vos modèles d'actions dangereuses dans le code des composants. Le modèle peut organiser ces éléments. Vous décidez toujours de l'apparence de chaque élément et des actions qu'il est autorisé à effectuer.

**Règles de conception de schéma qui réduisent les hallucinations** :

1. Gardez les valeurs d'énumération courtes et évidentes. `"type": "bar_chart"` et non `"type": "data-visualization-bar-type-vertical"`.
2. Rendre les compositions invalides impossibles. Si un `PolicyNotice` ne peut apparaître qu'à la fin d'une mise en page, ne le placez pas au même niveau de schéma que les éléments pouvant apparaître n'importe où.
3. Utilisez abondamment les champs requis. Un champ optionnel est un champ que le modèle pourrait omettre et que votre moteur de rendu devra gérer en tant que null.
4. Testez le catalogue avec des invites réelles avant le déploiement. Sauvegardez les spécifications générées ; vérifiez-les pour les violations du schéma, les valeurs de champ hallucinées et les compositions techniques valides mais sémantiquement incorrectes.

## Pièges courants  

**Piège : considérer un JSON valide comme un comportement sûr.** La validation du schéma confirme la structure. Elle ne dit rien sur le fait que l'action associée à un bouton corresponde à son libellé, que le total corresponde aux données dont il est dérivé, ou qu'un composant de l'interface utilisateur effectue quelque chose que l'utilisateur ne s'attend pas. Les spécifications d'interface générées nécessitent une revue sémantique, pas seulement une validation du schéma. Au minimum, les actions destructrices devraient nécessiter un composant de confirmation, et les étiquettes de ces composants devraient être testées par rapport aux actions qu'elles déclenchent.

**Piège : exposer des primitives de conception au lieu de primitives de produit.** Si le modèle doit décider d'utiliser un remplissage de 16px ou 20px, vous lui avez fourni le mauvais niveau d'abstraction. Les composants de domaine devraient encoder le goût produit. Le modèle devrait composer le comportement, pas gérer les détails de présentation.  

**Piège : utiliser une interface générative là où une interface statique suffirait.** Si la structure de ce que vous souhaitez afficher est connue à l'avance — ce qui est généralement le cas —, le motif 1 avec des composants préconstruits est plus rapide, plus sûr et plus cohérent. L'interface générative mérite sa complexité uniquement lorsque la structure varie effectivement en fonction des données ou du contexte de tâche.  

**Piège : ignorer l'accessibilité.** Les LLM hallucinent les violations de WCAG. Ils attribueront `role="region"` à des éléments interactifs, généreront des formulaires sans étiquettes, et produiront des rapports de contraste échouant à WCAG AA. Votre bibliothèque de composants peut être entièrement accessible ; les compositions générées par IA de ces composants ne le sont pas automatiquement. Testez l'ensemble du chemin de rendu, et non seulement les composants en isolation.

**Piège : confondre le protocole et le framework.** AG-UI n'est pas un framework frontal. A2UI n'est pas une bibliothèque React. Ce sont des formats de fil et des protocoles d'événements. Vous avez toujours besoin d'un framework frontal pour les implémenter. CopilotKit implémente AG-UI et A2UI. json-render implémente le motif de catalogue A2UI/Open-JSON-UI. Il s'agit de couches différentes.

## Recommandations par cas d'utilisation

**Ajout d’un assistant à une application SaaS existante** : Commencez par le motif 1 (outil-vers-composant). Utilisez le Vercel AI SDK `useChat` ou CopilotKit. Cartographiez vos 5 à 10 actions d’agent les plus fréquentes vers des composants prédéfinis. Déployez cela, mesurez-le, puis élargissez le catalogue uniquement si les utilisateurs démontrent clairement en avoir besoin.  

**Génération d’un tableau de bord à partir d’un langage naturel** : Utilisez le motif 2 avec json-render ou un catalogue A2UI personnalisé. Définissez un catalogue de 8 à 15 types de composants couvrant vos types de graphiques, cartes de métriques et variantes de tableaux. Alimentez le schéma au modèle ; laissez-le composer la mise en page. Construisez une validation qui détecte les types inconnus avant qu’ils n’atteignent le moteur de rendu.  

**Interface front-end multi-agents** : Utilisez CopilotKit avec AG-UI. Le flux d’événements gère le streaming en temps réel entre les backends d’agents ; l’état partagé gère le transfert entre les agents ; le motif HITL gère les vannes d’approbation.

**Construction à l'intérieur de ChatGPT ou d'un autre hôte MCP** : Utilisez les applications MCP. Définissez votre outil en tant qu'outil de données qui récupère et raisonne, et un outil de rendu distinct qui demande un widget. Gardez la logique métier en dehors du modèle de widget.  

**Démonstrations de modèles ML et applications de données (équipe Python)** : Gradio pour les démos et HuggingFace Spaces. Streamlit pour les applications de données avec des interactions plus complexes. Aucun des deux ne nécessite JavaScript.  

**Artéfacts visuels, simulations, diagrammes** : Utilisez le motif 3 (OpenGenerativeUI ou équivalent). Établissez une politique de sécurité des iframe (CSP) stricte. Traitez la sortie comme du contenu utilisateur non fiable d'un point de vue sécurité.

Les cadres évoluent rapidement. La convergence des protocoles (AG-UI pour le streaming, A2UI/Open-JSON-UI pour les spécifications des catalogues) est encore en cours, mais la forme devient suffisamment claire pour permettre de construire dessus.  

Les défis d'ingénierie les plus critiques actuellement ne sont pas le choix d'un cadre. Ce sont la conception des catalogues — décider de ce que le modèle est autorisé à dire, ce qui nécessite une clarté produit plus qu'une compétence technique. Ce sont la validation sémantique — tester que l'interface utilisateur générée fait ce qu'elle prétend, et non simplement qu'elle valide le schéma. Et ce sont l'écart d'accessibilité — créer des catalogues où chaque composant, ainsi que chaque combinaison de composants, respecte les critères d'accessibilité que l'on exigerait d'une interface écrite à la main.

Le modèle fera ce que vous lui direz de faire dans la grammaire que vous lui donnez. Faites en sorte que la grammaire soit délibérée.
````
