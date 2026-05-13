# Translation Candidate
- Slug: llm-generative-ui-landscape-2026
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/fr/index.mdx
- Validation: deferred
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
title: Le paysage GenUI des LLM v2
subTitle: >-
  Du rendu outil-composant à la génération ouverte — une vue d'ensemble de
  chaque approche et des cas où chacune justifie sa complexité.
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
« Generative UI » signifie au moins cinq concepts distincts selon celui qui le prononce.

- Interfaces de chat intégrant des cartes de produit à partir d'appels d'outils modélisés  
- Spécifications JSON en temps réel que le frontend rend comme arbres de composants  
- Iframes sandboxés renvoyés par des outils MCP vers les applications hôte (de la commande de billets, à la réservation d'hôtels, en passant par la cartographie et les widgets de paiement)  
- Protocoles d'événements diffusant l'état d'agents vers le frontend  
- v0, Lovable et Bolt : outils d'IA générant du React en temps de conception  

Ces concepts sont liés, mais ils s'inscrivent dans des couches de l'architecture différentes, portent des profils de risque variés, impliquent des coûts d'implémentation distincts et s'appliquent à des cas d'usage adaptés. Les confondre transforme chaque discussion d'architecture en un désastre.

Voici la carte que j'aimerais avoir pour décider à quel niveau de l'architecture intervenir.

---

## Ce que « Generative UI » n'est pas

Avant de définir ce qu'il est, trois points à écarter :

**Génération de code en temps de conception** — v0, Lovable, Bolt, Cursor composant des éléments React. Ces outils génèrent du code que les développeurs examinent et commettent. L'IA s'exécute en temps de développement. Ce qui est livré est statique du point de vue de l'utilisateur. C'est une excellente catégorie d'outils. Ce n'est pas ce que signifie « Generative UI en temps réel ».

**Remplissage de formulaires assisté par IA** — le modèle remplit les valeurs de champs à partir du contexte. La structure de l'interface reste fixe ; seul le contenu change. C'est un motif utile. Ce n'est pas de la « Generative UI ».

**Écriture d'HTML brut par l'IA dans une page** — le modèle produit des chaînes `<div>` et `<button>` injectées via `innerHTML` ou `dangerouslySetInnerHTML`. C'est *techniquement* de la « Generative UI en temps réel ». C'est aussi la version la plus dangereuse, et celle que chaque framework mature dans ce domaine existe pour éviter. Le markup généré brutalement par l'IA implique un risque XSS, des attributs non accessibles, une stylisation incohérente et une structure hallucinée. Le reste de cet article traite de comment faire mieux que cela.

---

## Une Définition Opérationnelle

La Generative UI en temps réel signifie : **le modèle détermine quel composant d'interface ou quelle composition de composants l'utilisateur voit, en fonction de l'état de la conversation ou de la tâche.**

Pas les mots. L'interface.

Le cas le plus simple : votre assistant de réservation de vol appelle un outil `search_flights`. Au lieu de renvoyer du texte brut (« Voici trois options… »), il rend un composant `<FlightResultsCard>` avec des vols sélectionnables, des bascules de classe de siège et un bouton « Réserver ». Le modèle a décidé qu'une carte structurée était la bonne réponse ici. Le développeur a défini l'apparence de cette carte et l'action du bouton « Réserver ».

Le cas plus complexe : un agent d'analyse financière reçoit une question sur un portefeuille et décide de composer une réponse avec un `MetricGroup` affichant des chiffres clés, un graphique `RiskBreakdown`, un tableau `ScenarioComparison` et un `PolicyNotice`. Le modèle a assemblé ce layout à partir d'un catalogue de composants préapprouvés. Le développeur a défini chaque composant. Le modèle a choisi lesquels utiliser et lesquelles données y insérer.

Les deux cas sont des exemples de Generative UI. Ils diffèrent par le degré de liberté de composition accordé au modèle, ce qui détermine à la fois la richesse des sorties possibles et la complexité des erreurs potentielles.

---

## Les Trois Modèles

L'ensemble du spectre se résume à trois modèles, chacun avec une grammaire de sortie distincte.

![Un diagramme de spectre montrant trois modèles : les appels d'outils uniquement à gauche (le plus sûr), le catalogue de composants au centre, et la génération ouverte à droite (la plus expressive).](../output-grammar-spectrum.svg)

*Chaque décision d'interface générative est un point sur ce spectre. Commencez à gauche.*

### Modèle 1 : Rendu outil-vers-composant

Le modèle appelle un outil nommé. Votre application possède une carte reliant les noms d'outils aux composants. L'appel d'outil déclenche le rendu d'un composant.

```tsx
// Le modèle appelle : { name: "show_flight_results", args: { flights: [...] } }

useCopilotAction({
  name: "show_flight_results",
  render: ({ args }) => <FlightResultsCard flights={args.flights} />,
});
```

C'est le modèle le plus sûr car la mise en page ne provient jamais du modèle. Le modèle décide *quand* afficher un composant et *quelles données* le remplir. Vos développeurs contrôlent toujours le code des composants, la conception visuelle, l'accessibilité et chaque cas d'exception dans la logique de rendu.

Le SDK AI de Vercel avec `useChat` et les gestionnaires `tool` implémentent cela. Le rendu d'outils d'assistant-ui suit ce modèle. Le "Static Generative UI" de CopilotKit correspond à ce modèle. La plupart des interfaces de copilote en production fiables utilisent cette approche.

**Adéquat lorsque** : l'ensemble des éléments à afficher est connu à l'avance. Confirmations de réservation, résultats de recherche, résumés de compte, widgets d'approbation. Si vous pouvez énumérer les scénarios, ce modèle les couvre.

### Modèle 2 : Composition du catalogue de composants

Le modèle émet un arbre JSON typé référençant des composants d'un catalogue défini par les développeurs. Votre interface frontale possède un rendu qui parcourt l'arbre et instancie chaque composant.

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

Le modèle a composé cette mise en page. Une grille de métriques (`MetricGroup`), un graphique en ligne (`LineChart`), une alerte d'analyse (`InsightCallout`). Mais vous avez défini ce que chaque type de composant signifie, quels paramètres il accepte et comment il se rend. Si le modèle tente d'émettre `{ "type": "custom_untested_thing" }`, votre validation du schéma le détecte et le rendu l'ignore ou le rejette.

C'est le modèle derrière `json-render`, `A2UI`, `Hashbrown`, `OpenUI` et `Tambo`. Le travail d'ingénierie clé est la **conception du catalogue** — décider quels types de composants existent, à quoi ressemblent leurs schémas, et ce que le modèle peut ou ne peut pas composer.

**Indiqué lorsque** : la structure de ce que vous souhaitez afficher varie légitimement en fonction des données ou de la demande de l'utilisateur. Des tableaux de bord qui s'adaptent à ce qui est notable dans les chiffres. Des rapports qui affichent différentes sections selon le contexte. Des panneaux de workflow qui changent en fonction de l'étape où se trouve l'agent.

### Modèle 3 : Génération ouverte

Le modèle génère du HTML, SVG, Canvas ou WebGL qui est rendu dans un iframe isolé avec une Politique de sécurité du contenu (CSP) stricte.

C'est approprié pour les cas où aucun catalogue de composants fixe ne suffit : visualisations d'algorithmes, diagrammes architecturaux, graphiques ad hoc, art génératif, simulations éducatives. Le cadre iframe assure ici la sécurité ; retirez-le et vous retombez sur le problème d'injection HTML brut mentionné en tête de cet article.

`CopilotKit/OpenGenerativeUI` est l'implémentation de référence actuelle de ce modèle. Le sandbox supprime les scripts, limite le passage de messages, et isole l'artifact généré du privilège de votre application.

**Indiqué lorsque** : vous avez besoin d'une sortie visuelle arbitraire — diagrammes explicatifs uniques, simulations dynamiques, artefacts créatifs. N'utilisez pas cela pour une interface transactionnelle. Une confirmation de paiement n'a pas besoin d'un iframe isolé.

### Au-delà des trois modèles : Les LLMs pilotant directement les pixels

Il existe une quatrième direction émergente qui ne s'inscrit pas clairement dans l'un de ces modèles : les LLMs pilotant des **expériences immersives, similaires à des jeux**, en contrôlant la sortie visuelle de manière plus directe qu'un iframe isolé.

La distinction canonique dans l'interface générative est **HTML iframe vs. catalogue JSON** :

- **Iframe HTML** — le modèle génère du HTML, SVG, Canvas ou WebGL affiché dans un environnement isolé. Liberté d'expression maximale ; la sécurité dépend entièrement de la frontière de l'iframe. Exemples : Anthropic Artifacts, OpenGenerativeUI.  
- **Catalogue JSON** — le modèle produit un payload structuré contraint à un catalogue de composants défini par le développeur ; votre moteur d'affichage instancie des composants fiables et préconstruits selon cette spécification. Le modèle décide *ce qu'afficher* ; vous décidez *comment* cela s'affiche. Exemples : json-render, A2UI.  

Au-delà de ces modèles, des démonstrations récentes suggèrent un troisième mode où le modèle ne choisit pas de composants ni ne génère de HTML isolé — il pilote directement le canevas. Des projets comme [Tencent's HunyuanWorld](https://arxiv.org/abs/2502.01999), qui génère des environnements 3D explorables à partir d'une seule image, ou des architectures de jeux où les LLMs créent des cartes, des PNJ et des quêtes en temps réel plutôt que d'appeler un catalogue de composants, indiquent un avenir où le modèle agit davantage comme un réalisateur de jeu qu'un générateur de formulaires. L'inférence LLM en navigateur via WebGPU ([WebLLM](https://mlc.ai/web-llm/)) pousse cette frontière localement.  

Ce domaine est véritablement passionnant et véritablement en phase précoce. Il n'existe pas encore de cadres stables pour construire des produits en production. Je traiterai cette approche dans un article dédié dès que cela changera.  

---

## L'écosystème complet  

![Un diagramme à quatre couches représentant chaque outil majeur d'interface générative : protocoles (AG-UI, A2UI, MCP Apps) en haut, coquilles d'applications JavaScript suivantes (CopilotKit, Vercel AI SDK, assistant-ui, LangGraph), puis outils de catalogue JavaScript (json-render, Hashbrown, OpenUI, Tambo), et enfin outils Python en bas (Gradio, Streamlit, LangChain, Haystack).](../full-stack-map.svg)  

*Quatre couches. Les protocoles définissent le format de transmission. Les coquilles d'applications gèrent l'état et le rendu. Les outils de catalogue contrôlent ce que le modèle peut générer. Les outils Python forment une voie parallèle pour les flux de travail de données et d'apprentissage automatique.*  

---

## Les protocoles : AG-UI et A2UI  

AG-UI et A2UI sont les deux principaux standards de la couche protocole. Ils résolvent des problèmes différents et ne sont pas concurrents.

### AG-UI  

**GitHub** : [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)  

AG-UI est un protocole basé sur des événements pour la communication entre agents IA et applications frontend. Il définit environ 16 types d'événements : `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TOOL_CALL_START`, `TOOL_CALL_END`, `STATE_SNAPSHOT`, `STATE_DELTA`, et ainsi de suite. Le transport dépend de vous — SSE, WebSockets, webhooks fonctionnent tous. Le format est délibérément souple pour favoriser une adoption large.  

AG-UI ne définit pas l'apparence de votre interface. Il définit comment l'agent communique *avec* votre frontend. Pensez-y comme à la couche protocole filaire qui permet à votre application React de s'abonner à un agent LangGraph de la même manière qu'à un agent CrewAI, sans modifier le code frontend.  

CopilotKit a créé AG-UI à partir de leur travail avec LangGraph et CrewAI. Il a été adopté par LangChain, Mastra, PydanticAI, et d'autres. Microsoft a publié un guide d'intégration AG-UI. Si vous construisez une interface multi-agents et que vous souhaitez découpler les frameworks backend du code frontend, AG-UI est la solution.  

**Une clarification qui piège souvent** : AG-UI n'est pas un framework UI. Il ne vous dit pas ce que vous devez afficher. Il vous indique *que* l'agent a dit quelque chose, appelé un outil, ou mis à jour un état partagé. Ce que vous affichez en réponse reste votre décision.  

### A2UI  

**GitHub** : [google/A2UI](https://github.com/google/A2UI) · Spécification : [a2ui.org](https://a2ui.org/)  

A2UI est la spécification déclarative de Google sur ce que les agents envoient lorsqu'ils souhaitent afficher une interface. Alors que AG-UI répond à la question « comment l'agent communique-t-il ? », A2UI répond à « quel format l'agent utilise-t-il pour décrire une disposition de composants ? ».  

A2UI utilise un format JSONL plat : un descripteur de composant par ligne, chacun avec un ID, un type, et des données. Le format plat est intentionnel. Les arbres imbriqués exigent que le modèle connaisse toute la structure avant de commencer à streamer. Une liste plate permet au modèle d'émettre chaque composant au fur et à mesure qu'il « y pense », ce qui signifie que votre frontend peut commencer à afficher la première carte métrique pendant que le modèle décide s'il doit ajouter un graphique.

```jsonl
{"id":"h1","type":"kpi_card","title":"MRR","value":"$82,400","delta":"+12%"}
{"id":"h2","type":"kpi_card","title":"Churn","value":"2.1%","delta":"-0.4%"}
{"id":"c1","type":"line_chart","title":"30-day MRR","data_ref":"mrr_series"}
{"id":"t1","type":"data_table","cols":["Month","MRR","Net New"],"data_ref":"monthly"}
```

A2UI est préoccupé par la sécurité : le format est une spécification de données, pas un code exécutable. Le catalogue de composants est défini à l'avance par le développeur ; l'agent ne peut référencer que les types présents dans ce catalogue. Un rendu A2UI recevant un nom de type inconnu l'ignore.

Le format "Open-JSON-UI" de CopilotKit est compatible avec A2UI. Si vous choisissez un format de spécification pour un catalogue de composants aujourd'hui, A2UI est celui avec le plus large soutien multiplateforme.

**Note sur la stabilité** : A2UI est en version pré-1.0 — v0.9 à la vérification du 8 mai 2026 — et a connu des modifications cassantes entre les versions mineures. Les communications de Google sur le roadmap ont été sporadiques, et certains rendus (Lit, Flutter) ont eu du retard sur les mises à jour de la spécification. Allouez du temps pour le décalage de la spécification si vous construisez dessus aujourd'hui. Pour les cas d'utilisation web purs, json-render semble actuellement disposer d'outils plus complets. L'avantage à long terme d'A2UI réside dans sa portée multiplateforme (web, Flutter, SwiftUI, Android) que json-render ne possède pas.

### Applications MCP

**GitHub** : [modelcontextprotocol](https://github.com/modelcontextprotocol) · Voir aussi : [mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)

MCP a débuté comme un protocole pour connecter des LLM à des outils et des données. L'extension Applications permet aux outils MCP de renvoyer non seulement des données, mais aussi des artefacts d'interface interactive : des composants React, des formulaires, des tableaux de bord, des cartes.

Le modèle de sécurité est strict, et c'est intentionnel : tout est rendu dans un iframe sandboxé avec des permissions supprimées, les modèles sont prédéclarés pour que l'application hôte puisse les vérifier, et toute communication est JSON-RPC auditable. Ce modèle est adapté aux fournisseurs d'outils — un serveur MCP Shopify peut renvoyer un widget de paiement ; un service de cartographie peut renvoyer une carte embarquable. L'application hôte n'a ni la propriété ni la confiance dans le code de ce widget.

MCP Applications est le bon choix lorsque l'interface *appartient au fournisseur d'outils*, pas à votre application. Pour les interfaces vivant dans le domaine de votre application, restez sur le Modèle 1 ou 2.

---

## Les Frameworks JavaScript/TypeScript

### CopilotKit

**GitHub** : [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) · Exemples : [CopilotKit/generative-ui](https://github.com/CopilotKit/generative-ui)

CopilotKit est le framework le plus complet pour les applications frontales natives agent. Il gère le cycle de vie complet : connexion aux backends d'agent via AG-UI, gestion de l'état de conversation bidirectionnel, rendu des composants d'interface générative, et fourniture des canalisations d'état partagé permettant aux agents et aux utilisateurs de modifier les mêmes données.

Le modèle à trois patrons s'applique clairement aux API de CopilotKit :
- `useCopilotAction` avec un rappel `render` → Patron 1
- Rendu A2UI/Open-JSON-UI → Patron 2
- Artéfacts sandboxés `OpenGenerativeUI` → Patron 3

La fonctionnalité clé sous-discutée de CopilotKit est **l'état partagé et la boucle humaine** : l'agent peut lire et écrire l'état de l'application, l'utilisateur peut lire et écrire cet état, et les modifications s'écoulent de manière bidirectionnelle. C'est ce qui rend les interfaces de type copilote collaboratives, et non pas une boîte de chat collée à un produit.

### Vercel AI SDK

**GitHub** : [vercel/ai](https://github.com/vercel/ai) · Docs : [ai-sdk.dev](https://ai-sdk.dev/)

Le SDK Vercel AI est la base TypeScript de facto pour les applications IA. Pour les interfaces génératives en particulier :

**`useObject`** transmet un objet JSON structuré depuis le serveur pendant sa génération. Vous définissez un schéma Zod ; le SDK parse le JSON partiel et déclenche des mises à jour de rendu à mesure que les champs arrivent. C'est le chemin le plus fluide vers le Patron 2 dans une application Next.js.

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

**`useChat` avec gestionnaires d'outils** → Patron 1. Le modèle appelle des outils ; vous mappez les noms d'outils vers des composants.

**Éléments AI** ([elements.ai-sdk.dev](https://elements.ai-sdk.dev/)) fournit des primitives d'interface prêtes à l'emploi à associer avec le SDK.

**Une note sur la trajectoire confuse ici** : En octobre 2024, Vercel a annoncé dans [GitHub Discussion #3251](https://github.com/vercel/ai/discussions/3251) que l'AI SDK RSC — le modèle de composants serveur React (React Server Components) streaming présenté comme la fonctionnalité phare « Generative UI » dans le SDK 3.0 — avait été mis en pause indéfiniment en raison de « plusieurs limitations anciennes » sans solution proche viable. Les équipes ayant construit des stratégies produit autour du streaming RSC ont été prises de court. Les API `generateObject`/`streamObject` ont également été dépréciées dans le SDK 6.0. La migration recommandée depuis l'AI SDK RSC est le patron `useObject` ci-dessus, ou json-render pour la génération basée sur un catalogue.

### assistant-ui

**GitHub** : [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)

assistant-ui est un ensemble de primitives React composable pour construire des interfaces de chat de qualité de production. C'est la bonne solution lorsque vous avez besoin d'une expérience utilisateur de chat raffinée — bulles de message, tokens de streaming, actions de copie/modification/régénération, états de réflexion — et souhaitez utiliser votre propre backend et votre propre affichage d'outils.

Il fonctionne bien avec n'importe quel backend (OpenAI, Anthropic, modèles locaux, points de terminaison personnalisés) et gère l'affichage des appels d'outils via un modèle de slot/render prop familier.

### json-render

**GitHub** : [vercel-labs/json-render](https://github.com/vercel-labs/json-render) · Docs : [json-render.dev](https://json-render.dev/)

json-render opérationnalise le patron 2 avec une approche complète et orientée. Vous obtenez un catalogue de composants prédéfinis (composants shadcn/ui avec des schémas Zod), un moteur d'affichage, et un cycle de génération serré où le modèle est contraint au catalogue par le schéma.

Les caractéristiques distinctives :
- **Rendu multi-cible** : la même spécification JSON peut être rendue dans une application web React, une application mobile React Native, un PDF, une email HTML, ou une vidéo Remotion. Cela est véritablement utile pour les rapports.
- **Rendu progressif** : les composants apparaissent à mesure que le modèle les stream, et non après réception complète de la spécification.
- **Contraintes de schéma serrées** : le catalogue est conçu pour empêcher au modèle de générer des types de composants valides mais inconnus.

Si vous développez une fonction de tableau de bord ou de génération de rapports et souhaitez éviter le travail d'infrastructure lié à la conception de votre propre catalogue, json-render est le chemin le plus rapide pour les applications web.  

**Sur la dynamique** : json-render a été lancé par Vercel Labs au début de 2026 et semble avoir rapidement attiré l'attention des développeurs web car il est immédiatement utile dans les projets standard React/Next.js. Cela dit, json-render est encore en version pré-1.0 et la relation entre json-render et A2UI est en cours d'élaboration — Vercel a expérimenté des sorties compatibles A2UI, donc une convergence est possible. Pour les applications multiplateforme (mobile natif, multiples frameworks), A2UI est un meilleur pari à long terme.  

### Hashbrown  

**GitHub** : [liveloveapp/hashbrown](https://github.com/liveloveapp/hashbrown)  

Hashbrown adopte une approche distinctive : au lieu de construire une couche d'interface AI séparée, il intègre directement la sélection de composants AI dans votre application React ou Angular existante. Vous exposez les composants de votre application au modèle LLM ; le modèle sélectionne lesquels afficher et peut invoquer des outils côté client.  

C'est l'outil adapté lorsque vous souhaitez intégrer de l'intelligence dans des interfaces produit qui ne sont pas des "chat" — une page produit qui adapte sa mise en page, un panneau de paramètres qui affiche les bonnes options, un éditeur de workflow qui suggère l'étape suivante.  

### OpenUI  

**GitHub** : [thesysdev/openui](https://github.com/thesysdev/openui) · Docs : [openui.com](https://www.openui.com/)  

OpenUI remplace le JSON par un format ressemblant à un langage de code orienté lignes ("OpenUI Lang") conçu pour le rendu progressif et l'efficacité des jetons. L'affirmation est une réduction d'environ 67 % du nombre de jetons par rapport au JSON équivalent pour des mises en page complexes.  

L'échange porte sur la maturité de l'écosystème — OpenUI est plus récent et son outillage est moins éprouvé que les approches basées sur JSON. Mais si le coût des jetons est une contrainte significative et que vous générez fréquemment des mises en page complexes, l'efficacité du format est réelle.

### Tambo

**GitHub** : [tambo-ai/tambo](https://github.com/tambo-ai/tambo)

Tambo se concentre sur la sélection de composants persistants : l'IA sélectionne des composants et peut interagir avec eux via des outils côté client, en maintenant l'état des composants tout au long de la conversation. Idéal pour les cas d'utilisation où les éléments d'interface persistent entre les tours de conversation — un composant de filtrage que l'utilisateur ajuste tandis que l'IA continue de raisonner sur les données filtrées.

---

## La couche Python

L'écosystème Python aborde les interfaces IA différemment. Ces outils sont optimisés pour les démonstrations de modèles ML, les applications de données et les outils internes — pas pour les applications grand public en production avec une composition d'interface pilotée par des agents.

Ce n'est pas un reproche. Pour les bons cas d'utilisation, Gradio et Streamlit sont les seuls outils dont vous avez besoin.

### Gradio

**GitHub** : [gradio-app/gradio](https://github.com/gradio-app/gradio) · PyPI : `gradio`

La valeur centrale de Gradio : vous écrivez une fonction Python ; Gradio la wrappe dans une interface web. La classe `Interface` nécessite 3 lignes pour un classifieur d'images. `ChatInterface` prend 10 lignes pour un chatbot. `Blocks` vous donne un contrôle fin sur la mise en page lorsque vous en avez besoin.

L'interface « générative » dans Gradio est définie par le développeur Python, pas par le modèle. La visibilité et la configuration des composants peuvent changer dynamiquement en fonction des sorties du modèle, mais le catalogue de composants reste statique — vous ne demandez pas au modèle de composer des mises en page.

Gradio est le choix par défaut pour HuggingFace Spaces et l'écosystème des démonstrations ML. Il compte des millions de téléchargements mensuels et alimente une grande partie du paysage des démonstrations d'IA.

**Utilisez Gradio lorsque** : vous êtes un développeur Python créant une démonstration de modèle ML, un prototype de recherche ou un outil interne, et que vous ne souhaitez pas toucher à JavaScript.

### Streamlit

**GitHub** : [streamlit/streamlit](https://github.com/streamlit/streamlit)

Le modèle de Streamlit est plus prescriptif : un script Python s'exécute du début à la fin à chaque interaction. Vous appelez `st.chat_message()`, `st.dataframe()`, `st.plotly_chart()`. Le framework gère la mise en page.

Le modèle de relecture du script complet semble peu efficace mais s'avère surprenamment ergonomique pour les chatbots IA accumulant l'historique des conversations — le script complet se relance, l'historique des discussions est stocké dans l'état de session, et la sortie est déterministe. Streamlit dispose désormais d'une prise en charge native de la plupart des fournisseurs majeurs de LLM et intègre nativement Snowflake Cortex.

**Utilisez Streamlit lorsque** : vous construisez une application de données alimentée par l'IA, un outil de reporting interne ou un tableau de bord ML en Python et que vous souhaitez le chemin de déploiement le plus simple.

### LangChain et Haystack

Ce sont des frameworks d'orchestration backend, pas des frameworks d'interface utilisateur. Ils apparaissent dans toute carte honnête de stack d'interface générative car ils constituent généralement la couche où les sorties structurées sont générées avant d'être envoyées à un frontend.

**LangChain** ([langchain-ai/langchain](https://github.com/langchain-ai/langchain)) : `.with_structured_output()` sur n'importe quel LLM vous donne une génération de JSON contrôlée par Pydantic. Le décorateur `@tool` avec génération automatique de schéma est la méthode la plus claire pour définir quels outils le modèle peut appeler. LangChain transmet les résultats structurés à la couche frontend de votre choix.  

**Haystack** ([deepset-ai/haystack](https://github.com/deepset-ai/haystack)) : architecture modulaire de pipeline avec un bon support de RAG. Hayhooks expose les pipelines Haystack en points d'entrée HTTP — y compris des endpoints compatibles MCP. Si votre interface générative nécessite une base de récupération, l'architecture de pipeline Haystack gère cela proprement.  

Aucun des deux frameworks ne contrôle la couche UI. Ils génèrent les données que votre frontend (Modèle 1, 2 ou 3) affiche.  

---

## Référence des fonctionnalités  

Utilisez le catalogue ci-dessus comme orientation, pas comme une liste de courses. La pile se réduit généralement à un choix par couche :  

| Besoin | Commencez ici |  
|--------|---------------|  
| Flux d'événements agent-frontend | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |  
| Payload UI déclaratif traversant une frontière de confiance | [A2UI](https://github.com/google/A2UI) ou [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) |  
| Affichage de chat/outils app-propriété | [Vercel AI SDK](https://github.com/vercel/ai), [assistant-ui](https://github.com/assistant-ui/assistant-ui) ou [CopilotKit](https://github.com/CopilotKit/CopilotKit) |  
| Tableaux de bord, rapports et formulaires composés à partir d'un catalogue | [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown), [OpenUI](https://github.com/thesysdev/openui) ou [Tambo](https://github.com/tambo-ai/tambo) |  
| Artéfacts visuels sandboxés | [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |  
| Démonstrations Python et apps de données | [Gradio](https://github.com/gradio-app/gradio) ou [Streamlit](https://github.com/streamlit/streamlit) |  

---

## Vélocité de l'écosystème et terrain instable  

Ce domaine évolue rapidement et plusieurs projets ont livré des communications floues avec leur code. Dernière vérification le 8 mai 2026 ; considérez les notes sur l'état des projets ici comme une lecture datée, pas un verdict définitif.

**Vercel AI SDK RSC** était la fonctionnalité phare de Generative UI lors de lancement de l'API 3.0. Vercel a suspendu son développement en octobre 2024 ([Discussion #3251](../github.com/vercel/ai/discussions/3251)) en invoquant des limites architecturales avec les React Server Components sans solution immédiate. Les équipes ayant construit dessus étaient naturellement frustrées. Il est toujours présent dans la documentation mais n'est plus recommandé ; `useObject` l'est.

**json-render** (Vercel Labs) est la nouvelle direction – une alternative basée sur un catalogue, indépendante du framework, évitant les problèmes de couplage avec RSC. Il est pré-1.0 et semble susciter un vif intérêt initial auprès des développeurs React/web. La raison probable liée à l'expérience développeur (DX) : json-render est immédiatement utilisable dans un projet React/Next.js standard, tandis que l'étendue multiplateforme d'A2UI ajoute des frottements d'installation. Comment cela évoluera lorsque les spécifications mûriront reste incertain. Vercel a exploré la compatibilité A2UI dans json-render, suggérant une convergence possible.

**A2UI** (Google) est pré-1.0 (v0.9 lors de la dernière vérification), avec des changements cassants entre les versions mineures et des communications incohérentes de Google sur son calendrier. C'est le bon choix pour une portée multiplateforme (web + Flutter + SwiftUI) que json-render ne couvre pas, et il bénéficie d'un soutien enterprise significatif. Pour les projets web purs, l'expérience développeur est actuellement plus rugueuse.

**AG-UI** (CopilotKit) est également pré-1.0. La confusion la plus fréquente : le nom suggère un framework UI. Ce n'est pas le cas – c'est un protocole de transport. AG-UI définit comment les événements circulent entre les backends agents et votre frontend ; ce que vous rendez en réponse reste votre choix. Ce modèle mental est solide et largement adopté, mais la spécification pré-1.0 signifie que les cas limites sont encore en cours de résolution.

Conséquence pratique : **chaque acteur majeur ici est pré-1.0**. Prévoyez des changements d'API. Les modèles – outil-vers-composant, composition par catalogue, génération sandboxée – sont suffisamment stables pour s'appuyer dessus. Les choix précis de protocole ne le sont pas.

---

## Conception du catalogue de composants : Le vrai travail d'ingénierie

La plupart de la complexité intéressante dans le Modèle 2 ne réside pas dans le rendu – elle se trouve dans le catalogue.

Le catalogue est une **décision produit encodée en tant que schéma**. Il répond à la question : quels sont les objets UI significatifs dans ce domaine ? Pas « quels composants React existent ? » mais « quels besoins réels a l'utilisateur dans ce contexte ? »

**Mode d'échec trop granulaire** : vous exposez `Row`, `Column`, `Text`, `Button`, `Icon`. Le modèle doit désormais agir comme un ingénieur frontend. Il générera un agencement médiocre qui ne correspond pas à votre système de design, oubliera les états vides, produira du markup non accessible, et changera son approche à chaque réponse car rien dans le catalogue ne contraint la sortie à votre langage visuel produit.

**Le mode d'échec trop grossier** : vous exposez `WeatherCard`, `FlightCard`, `HotelCard`. Le modèle ne peut pas s'adapter lorsque l'utilisateur demande quelque chose qui ne correspond pas à une carte prédéfinie. Il se rabat sur du texte.  

**Le point intermédiaire utile** : des composants au niveau métier avec des emplacements contraints.  

Un catalogue d'application de voyage pourrait ressembler à :  

```
TripSummary         — aperçu de l'itinéraire
FlightOptionList    — options de vols sélectionnables avec tarifs
HotelComparison     — comparaison côte à côte de cartes hôtelières
TravelerForm        — collecte des détails des voyageurs
PolicyNotice        — mention réglementaire/conditions tarifaires
BookingConfirmation — confirmation finale avec bouton d'action
```  

Un catalogue d'application financière pourrait ressembler à :  

```
PortfolioSnapshot   — positions clés et résultats
TransactionTable    — transactions filtrables et paginées
RiskBreakdown       — indicateurs d'allocation et de volatilité
ScenarioComparison  — modélisation de scénarios côte à côte
ApprovalGate        — action nécessitant une confirmation humaine
```  

Le catalogue sonne comme le vocabulaire de votre produit. Il encode vos décisions UX, vos exigences d'accessibilité, votre gestion des états vides et vos modèles d'actions dangereuses dans le code des composants. Le modèle peut agencer ces éléments. Vous décidez toujours de l'apparence de chaque élément et de ce qu'il est autorisé à faire.  

**Règles de conception de schéma réduisant les hallucinations** :  

1. Gardez les valeurs d'énumération courtes et évidentes. `"type": "bar_chart"` et non `"type": "data-visualization-bar-type-vertical"`.  
2. Rendez les compositions invalides impossibles. Si un `PolicyNotice` ne peut apparaître qu'à la fin d'une mise en page, n'incluez-le pas au même niveau de schéma que des éléments pouvant apparaître n'importe où.  
3. Utilisez généreusement les champs obligatoires. Un champ optionnel est un champ que le modèle peut omettre et que votre moteur de rendu doit gérer comme null.  
4. Testez le catalogue avec des prompts réels avant le déploiement. Sauvegardez les spécifications générées ; vérifiez-les pour les violations de schéma, les valeurs hallucinées et les compositions techniques valides mais sémantiquement erronées.  

---

## Pièges courants  

**Piège : considérer que tout JSON valide est un comportement sûr.** La validation du schéma confirme la structure. Elle ne dit rien sur le fait que l'action liée à un bouton corresponde à son libellé, que le total corresponde aux données dont il est dérivé, ou que le composant UI fasse quelque chose que l'utilisateur n'attend pas. Les spécifications UI générées nécessitent une revue sémantique, pas seulement une validation de schéma. Au minimum, les actions destructrices doivent nécessiter un composant de confirmation, et les libellés de ces composants doivent être testés par rapport aux actions qu'ils déclenchent.

**Piège : Exposer des primitives de conception au lieu de primitives de produit.** Si le modèle doit décider d'utiliser un remplissage de 16px ou 20px, vous lui avez fourni le mauvais niveau d'abstraction. Les composants de domaine doivent encoder le goût du produit. Le modèle devrait composer le comportement, pas gérer les détails de présentation.

**Piège : Utiliser une interface générative là où une interface statique suffirait.** Si la structure de ce que vous souhaitez afficher est connue à l'avance — ce qui est généralement le cas — le Modèle 1 avec des composants prédéfinis est plus rapide, plus sûr et plus cohérent. L'interface générative mérite sa complexité uniquement lorsque la structure varie effectivement en fonction des données ou du contexte de la tâche.

**Piège : Ignorer l'accessibilité.** Les LLM génèrent des violations WCAG. Ils attribueront `role="region"` à des éléments interactifs, produiront des formulaires sans étiquettes, et créent des rapports de contraste qui échouent à WCAG AA. Votre bibliothèque de composants peut être entièrement accessible ; les compositions générées par l'IA ne le sont pas automatiquement. Testez l'ensemble du chemin de rendu, pas seulement les composants isolés.

**Piège : Confondre le protocole et le framework.** AG-UI n'est pas un framework frontend. A2UI n'est pas une bibliothèque React. Ce sont des formats de fil et des protocoles d'événements. Vous avez toujours besoin d'un framework frontend pour les implémenter. CopilotKit implémente AG-UI et A2UI. json-render implémente le modèle A2UI/Open-JSON-UI. Il s'agit de couches différentes.

---

## Recommandations par cas d'utilisation

**Ajout d'un assistant à une application SaaS existante** : Commencez par le Modèle 1 (outil-vers-composant). Utilisez Vercel AI SDK `useChat` ou CopilotKit. Associez vos 5 à 10 actions d'agent principales à des composants prédéfinis. Déployez cela, mesurez son impact, puis élargissez le catalogue uniquement si les utilisateurs ont effectivement besoin de compositions plus riches.

**Génération de tableau de bord à partir d'un langage naturel** : Utilisez le Modèle 2 avec json-render ou un catalogue A2UI personnalisé. Définissez un catalogue de 8 à 15 types de composants couvrant vos types de graphiques, cartes métriques et variantes de tableaux. Fournissez le schéma au modèle ; laissez-le composer la mise en page. Créez une validation qui détecte les types inconnus avant qu'ils n'atteignent le moteur de rendu.

**Interface frontend multi-agents** : Utilisez CopilotKit avec AG-UI. Le flux d'événements gère le streaming en temps réel entre les backends des agents ; l'état partagé gère le passage entre les agents ; le modèle HITL gère les approbations.

**Développement à l'intérieur de ChatGPT ou d'un autre hôte MCP** : Utilisez les Applications MCP. Définissez votre outil comme un outil de données qui récupère et raisonne, et un outil de rendu distinct qui demande un widget. Évitez de placer la logique métier dans le modèle de widget.

**Démonstrations de modèles ML et applications de données (équipe Python)** : Gradio pour les démonstrations et HuggingFace Spaces. Streamlit pour les applications de données avec des interactions plus complexes. Aucun n'exige JavaScript.  

**Objets visuels, simulations, diagrammes** : Utilisez le Modèle 3 (OpenGenerativeUI ou équivalent). Établissez une politique CSP stricte pour les iframes. Traitez la sortie comme du contenu non fiable de l'utilisateur d'un point de vue de la sécurité.  

Les cadres évoluent rapidement. La convergence des protocoles (AG-UI pour le streaming, A2UI/Open-JSON-UI pour les spécifications de catalogue) est en cours, mais la forme devient suffisamment claire pour permettre de construire dessus.  

Les défis techniques les plus importants actuellement ne sont pas le choix du cadre. Il s'agit de la conception de catalogues — décider de ce que le modèle est autorisé à dire, ce qui exige plus de clarté produit que de compétences techniques. Il s'agit de la validation sémantique — tester que l'interface utilisateur générée fait ce qu'elle affirme, et non seulement qu'elle valide un schéma. Et il s'agit de l'écart d'accessibilité — concevoir des catalogues où chaque composant, et chaque combinaison de composants, répond aux critères d'accessibilité que l'on exigerait d'une interface utilisateur écrite manuellement.  

Le modèle fera ce que vous lui direz de faire dans la grammaire que vous lui donnerez. Rendez la grammaire délibérée.
````
