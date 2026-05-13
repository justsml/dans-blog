# Translation Candidate
- Slug: llm-generative-ui-landscape-2026
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-05-10--llm-generative-ui-landscape-2026/fr/index.mdx
- Validation: passed
- Runtime seconds: 15.69
- Input tokens: 57064
- Output tokens: 12710
- Thinking tokens: unknown
- Cached input tokens: 26112
- Cache write tokens: 0
- Estimated cost: $0.004513
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Lepaysage LLM GenUI v2
subTitle: >-
  De la génération outil‑composant à la génération libre — une cartographie de
  chaque approche et du moment où sa complexité se justifie.
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
« Generative UI » désigne au moins cinq notions distinctes selon l’interlocuteur.

- Interfaces de chat qui intègrent des cartes produit provenant d’appels d’outils du modèle  
- Spécifications JSON exécutées à l’exécution que le front‑end rend sous forme d’arbres de composants  
- Iframes sandboxées renvoyées par des outils MCP dans les applications hôtes (de la commande de tickets, à la réservation d’hôtel, en passant par le rendu de cartes ou les widgets de paiement)  
- Protocoles d’événements qui diffusent l’état de l’agent vers le front‑end  
- v0, Lovable et Bolt : outils d’IA qui génèrent du React au moment de la conception  

Ces concepts sont liés, mais ils résident à des couches différentes de la pile et présentent des profils de risque, des coûts d’implémentation et des cas d’usage appropriés différents. Les confondre transforme chaque discussion d’architecture en un vrai fouillis.

---
C’est la carte que je veux lorsque je décide où atteindre dans la pile.
---

## Ce que l'UI générative n'est pas

Avant de définir ce que c’est, trois points à mettre de côté :

**Génération de code à la conception** — v0, Lovable, Bolt, Cursor qui composent des composants React. Ces outils génèrent du code que les développeurs examinent et valident. L’IA s’exécute au moment du développement. Ce qui est livré est statique du point de vue de l’utilisateur. C’est une excellente catégorie d’outils. Ce n’est pas ce que signifie « UI générative à l’exécution ».

**Remplissage de formulaires assisté par IA** — le modèle qui remplit les valeurs des champs à partir du contexte. La structure de l’interface reste figée ; seul le contenu varie. C’est un schéma utile. Ce n’est pas de l’UI générative.

**Écriture d’HTML brut par l’IA** — le modèle produit des chaînes `<div>` et `<button>` qui sont injectées via `innerHTML` ou `dangerouslySetInnerHTML`. C’est bien de l’UI générative à l’exécution dans le sens le plus strict du terme. C’est aussi la version la plus dangereuse, et celle que chaque cadre mature de cet écosystème a été conçu pour éviter. Un balisage généré par l’IA sans contrôle entraîne des risques XSS, des attributs non accessibles, des incohérences de style et une structure halluciné. Le reste de cet article explique comment faire mieux que cela.

---

## Une définition opérationnelle

L’UI générative à l’exécution signifie : **le modèle détermine quel composant d’interface ou quelle composition de composants l’utilisateur voit, en fonction de l’état de la conversation ou de la tâche**.

Pas les mots. L’interface.

Le cas le plus simple : votre assistant de réservation de vols appelle un outil `search_flights`. Au lieu de renvoyer du texte brut (« Voici trois options… »), il rend un composant `<FlightResultsCard>` avec des vols sélectionnables, des bascules de classe de siège et un bouton « Book ». Le modèle a jugé qu’une carte structurée était la réponse appropriée ici. Le développeur a défini l’apparence de cette carte et le comportement du bouton « Book ».

Le casplus complexe : un agent d’analyse financière reçoit une question concernant un portefeuille et décide de composer une réponse contenant un `MetricGroup` affichant les chiffres clés, un graphique `RiskBreakdown`, un tableau `ScenarioComparison` et un `PolicyNotice`. Le modèle a assemblé cette mise en page à partir d’un catalogue de composants pré‑approuvés. Le développeur a défini chaque composant. Le modèle a choisi ceux à utiliser et quelles données y injecter.

Les deux scénarios relèvent de l’UI générative. Ils diffèrent par le degré de liberté de composition accordé au modèle, ce qui détermine à la fois la richesse des sorties possibles et la complexité des erreurs potentielles.

## Les trois modèles

L’ensemble de l’espace se résume à trois modèles, chacun avec une grammaire de sortie différente.

![Un diagramme de spectre montrant trois modèles : appels d’outil uniquement à gauche (le plus sûr), catalogue de composants au centre, et génération ouverte à droite (le plus expressif).](../output-grammar-spectrum.svg)

_Every generative UI decision is a point on this spectrum. Start left._

### Pattern 1: Tool-to-component rendering

Le modèle appelle un outil nommé. Votre application possède une correspondance entre les noms d’outil et les composants. L’appel d’outil déclenche le rendu d’un composant.

```tsx
// The model calls: { name: "show_flight_results", args: { flights: [...] } }

useCopilotAction({
  name: "show_flight_results",
  render: ({ args }) => <FlightResultsCard flights={args.flights} />,
});
```

C’est le modèle le plus sûr parce que la mise en page ne provient jamais du modèle. Le modèle décide *quand* afficher un composant et *quelles données* le nourrir. Vos développeurs conservent la maîtrise du code du composant, du design visuel, de l’implémentation d’accessibilité, et de chaque cas limite dans la logique de rendu.

Le SDK AI de Vercel `useChat` avec les gestionnaires `tool` fonctionne ainsi. Le rendu d’outil d’assistant‑ui le fait de la même façon. Le « Static Generative UI » de CopilotKit correspond à ce schéma. La plupart des interfaces copilot en production qui fonctionnent de manière fiable utilisent cette approche.

**Approprié lorsque** : l’ensemble des éléments que vous pourriez vouloir afficher est connaissable au moment du développement. Confirmations de réservation, résultats de recherche, résumés de compte, widgets d’approbation. Si vous pouvez énumérer les scénarios, ce modèle les couvre.

### Pattern 2 : Composition d’un catalogue de composants

Le modèle émet un arbre JSON typé qui référence des composants d’un catalogue défini par le développeur. Votre frontend possède un rendu qui parcourt l’arbre et instancie chaque composant.

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

Le modèle a composé cette mise en page : un `MetricGroup`, un `LineChart`, un `InsightCallout`. Mais vous avez défini ce que chaque type de composant signifie, quelles propriétés il accepte et comment il se rend. Si le modèle tente d’émettre `{ "type": "custom_untested_thing" }`, votre validation de schéma le capture et le rendu l’ignore ou le rejette.

C’est le schéma qui se cache derrière `json-render`, `A2UI`, `Hashbrown`, `OpenUI` et `Tambo`. Le travail d’ingénierie principal consiste en la **conception du catalogue** — déterminer quels types de composants existent, à quoi ressemblent leurs schémas, et ce que le modèle est autorisé ou non à composer.

**Approprié lorsque** : la structure de ce que vous devez afficher varie légitimement en fonction des données ou de la requête de l’utilisateur. Des tableaux de bord qui s’ajustent aux éléments marquants des chiffres. Des rapports qui affichent différentes sections selon le contexte. Des panneaux de workflow qui changent selon l’étape où se trouve l’agent.

### Pattern 3 : Génération ouverte

Le modèle génère du HTML, du SVG, du Canvas ou du WebGL qui est rendu à l’intérieur d’une iframe sandboxée avec une politique de sécurité de contenu stricte.

C’est approprié pour les cas où aucun catalogue de composants fixe ne suffit : visualisations d’algorithmes, diagrammes d’architecture, graphiques ad‑hoc, art génératif, simulations éducatives. La frontière de l’iframe assure la sécurité ; si vous l’enlevez, vous revenez au problème d’injection de HTML brut décrit au début de cet article.

`CopilotKit/OpenGenerativeUI` est la meilleure implémentation de référence actuelle de ce pattern. Le sandbox élimine les scripts, limite les échanges de messages et maintient l’artifact généré à l’écart de l’état privilégié de votre application.

**Appropriate when** : vous avez réellement besoin d’une sortie visuelle arbitraire — diagrammes explicatifs ponctuels, simulations dynamiques, artefacts créatifs. N’utilisez pas cela pour une UI transactionnelle. Une confirmation de paiement n’a pas besoin d’une iframe sandboxée.

### Au‑delà des trois modèles : les LLM qui pilotent les pixels directement

Une quatrième voie émergente ne rentre proprement dans aucun de ces modèles : les LLM qui alimentent des **expériences immersives, semblables à des jeux** en contrôlant la sortie visuelle de façon plus directe qu’une iframe sandboxée.

La distinction canonique dans l’UI générative est **HTML iframe vs. catalogue JSON** :

- **HTML iframe** — le modèle écrit du HTML, SVG, Canvas ou WebGL qui s’exécute dans un bac à sable isolé. Liberté d’expression maximale ; la sécurité repose entièrement sur la frontière de l’iframe. Exemples : Anthropic Artifacts, OpenGenerativeUI.  
- **Catalogue JSON** — le modèle émet une charge utile structurée contrainte par un catalogue de composants défini par le développeur ; votre moteur instancie des composants fiables et pré‑construits à partir de cette spécification. Le modèle décide *quoi* afficher ; vous décidez *comment* le rendre. Exemples : json-render, A2UI.

Au‑delà de ces deux modes, des démonstrations très récentes laissent entrevoir un troisième mode où le modèle ne choisit pas de composants ni n’écrit du HTML sandboxé — il pilote le canvas plus directement. Des projets comme [Tencent's HunyuanWorld](https://arxiv.org/abs/2502.01999), qui génère des environnements 3D explorables à partir d’une seule image, et des architectures de jeu où les LLM créent cartes, PNJ et quêtes à l’exécution plutôt que d’appeler un catalogue de composants, suggèrent un avenir où le modèle ressemble davantage à un directeur de jeu qu’à un moteur de formulaires. L’inférence LLM dans le navigateur via WebGPU ([WebLLM](https://mlc.ai/web-llm/)) pousse la même frontière localement.

Ce territoire estréellement passionnant et réellement précoce. Il n’existe pas encore de cadres stables pour construire des produits en production. J’aborderai cette approche dans un article dédié dès que cela évoluera.

## L’écosystème complet

![Un diagramme à quatre couches cartographiant chaque outil majeur d’UI générative : protocoles (AG‑UI, A2UI, MCP Apps) en haut, coquilles d’application JavaScript ensuite (CopilotKit, Vercel AI SDK, assistant‑ui, LangGraph), puis outils de catalogue JavaScript (json‑render, Hashbrown, OpenUI, Tambo), puis outillage Python en bas (Gradio, Streamlit, LangChain, Haystack).](../full-stack-map.svg)

*Quatre couches. Les protocoles définissent le format du fil. Les coquilles d’application gèrent l’état et le rendu. Les outils de catalogue contraignent ce que le modèle peut générer. Les outils Python constituent une piste parallèle pour les flux de données et de ML.*

## Lesprotocoles : AG-UI et A2UI

AG-UI et A2UI sont les deux normes principales de la couche protocole. Elles résolvent des problèmes différents et ne sont pas en concurrence.

### AG-UI

**GitHub** : [ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)

AG-UI est un protocole basé sur des événements pour la communication entre agents IA et applications frontend. Il définit une une vingtaine d’événements : `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TOOL_CALL_START`, `TOOL_CALL_END`, `STATE_SNAPSHOT`, `STATE_DELTA`, etc. Le transport vous revient : SSE, WebSockets, webhooks fonctionnent tous. Le format reste volontairement souple afin de favoriser une large adoption.

AG-UI ne spécifie pas l’apparence de votre UI. Il décrit comment l’agent communique *avec* votre frontend. Considérez-le comme la couche de protocole qui permet à votre application React de s’abonner à un agent LangGraph de la même façon qu’à un agent CrewAI, sans toucher au code du frontend.

CopilotKit a créé AG-UI à partir de son travail avec LangGraph et CrewAI. Il a été adopté par LangChain, Mastra, PydanticAI et d’autres. Microsoft a publié un guide d’intégration AG-UI. Si vous construisez un frontend multi‑agent et devez découpler les frameworks backend du code frontend, AG-UI est la solution.

**Une précision qui fait souvent trébucher** : AG-UI n’est pas un framework UI. Il ne vous indique pas quoi rendre. Il indique *que* l’agent a émis une réponse, appelé un outil, ou mis à jour un état partagé. Ce que vous choisissez de rendre en réponse reste de votre responsabilité.

### A2UI

**GitHub** : [google/A2UI](https://github.com/google/A2UI) · Spécification : [a2ui.org](https://a2ui.org/)

A2UI est la spécification déclarative de Google décrivant ce que les agents envoient lorsqu’ils souhaitent afficher une UI. Là où AG‑UI répond « comment l’agent communique ? », A2UI répond « quel format l’agent utilise pour décrire la disposition d’un composant ? ».

A2UI utilise un format JSONL plat : un descripteur de composant par ligne, chacun contenant un ID, un type et des données. Le caractère plat est intentionnel. Les arbres imbriqués obligeraient le modèle à connaître toute la structure avant de pouvoir commencer à diffuser. Une liste plate permet au modèle d’émettre chaque composant au fur et à mesure qu’il « pense » à celui‑ci, ce qui signifie que votre frontend peut commencer à rendre la première carte métrique pendant que le modèle décide encore d’ajouter ou non un graphique.

```jsonl
{"id":"h1","type":"kpi_card","title":"MRR","value":"$82,400","delta":"+12%"}
{"id":"h2","type":"kpi_card","title":"Churn","value":"2.1%","delta":"-0.4%"}
{"id":"c1","type":"line_chart","title":"30-day MRR","data_ref":"mrr_series"}
{"id":"t1","type":"data_table","cols":["Month","MRR","Net New"],"data_ref":"monthly"}
```

A2UI est conçu avec la sécurité à l’esprit : la spécification est un format de données, pas du code exécutable. Le catalogue de composants est défini à l’avance par le développeur ; l’agent ne peut référencer que les types présents dans ce catalogue. Un rendu A2UI qui reçoit un nom de type inconnu l’ignore.

Le format « Open-JSON-UI » de CopilotKit est compatible avec A2UI. Si vous choisissez aujourd’hui un format de spécification pour un catalogue de composants, A2UI est celui qui bénéficie du plus large soutien multiplateforme.

**Une remarque sur la stabilité** : A2UI est encore en pré‑1.0 — v0.9 lors de la dernière vérification le 8 mai 2026 — et a déjà introduit des changements de spécification incompatibles entre versions mineures. Les communications de Google concernant la feuille de route sont irrégulières et certains rendus (Lit, Flutter) ont pris du retard par rapport aux mises à jour de la spécification. Prévoyez du temps pour le glissement de la spécification si vous construisez dessus aujourd’hui. Pour les cas d’usage purement web, json-render semble actuellement offrir un ensemble d’outils plus complet. L’avantage à long terme d’A2UI réside dans sa portée multiplateforme (web, Flutter, SwiftUI, Android) que json-render ne possède pas.

### MCPApps

**GitHub** : [modelcontextprotocol](https://github.com/modelcontextprotocol) · Related : [mcp-ui](https://github.com/MCP-UI-Org/mcp-ui)

MCP a commencé comme un protocole pour connecter les LLM aux outils et aux données. L’extension Apps permet aux outils MCP de renvoyer non seulement des données, mais aussi des artefacts UI interactifs : composants React, formulaires, tableaux de bord, cartes.

Le modèle de sécurité est strict, et c’est l’objectif : tout s’affiche dans une iframe isolée avec des permissions limitées, les modèles sont pré‑déclarés afin que l’application hôte puisse les examiner, et toutes les communications sont des JSON‑RPC auditable. C’est le modèle adéquat pour les fournisseurs d’outils — un serveur Shopify MCP peut renvoyer un widget de paiement ; un service de cartographie peut renvoyer une carte intégrable. L’application hôte ne possède pas le code du widget et ne lui fait pas confiance.

MCP Apps est le bon choix lorsque l’interface appartient au fournisseur d’outil, pas à votre application. Pour une UI qui vit dans le domaine de votre application, restez sur le Pattern 1 ou 2.

## Les frameworks JavaScript/TypeScript

### CopilotKit

**GitHub** : [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) · Exemples : [CopilotKit/generative-ui](https://github.com/CopilotKit/generative-ui)

CopilotKit est le framework le plus complet pour les applications front‑end natives aux agents. Il gère le cycle complet : connexion aux back‑ends d’agents via AG‑UI, gestion de l’état de conversation bidirectionnel, rendu des composants UI génératifs, et fourniture de l’infrastructure d’état partagé qui permet aux agents et aux utilisateurs de modifier les mêmes données.

Le modèle à trois motifs se traduit proprement dans les API de CopilotKit :
- `useCopilotAction` avec un rappel `render` → Motif 1  
- rendu A2UI/Open-JSON-UI → Motif 2  
- artefacts sandboxés `OpenGenerativeUI` → Motif 3  

La fonctionnalité importante de CopilotKit, souvent sous‑estimée, est **l’état partagé et l’intervention humaine** : l’agent peut lire et écrire l’état de l’application, l’utilisateur peut le lire et le modifier, et les changements circulent dans les deux sens. C’est ce qui fait que les UI de type copilot donnent l’impression d’une vraie collaboration plutôt que d’une simple boîte de dialogue greffée à un produit.

### Vercel AI SDK

**GitHub**: [vercel/ai](https://github.com/vercel/ai) · Docs: [ai-sdk.dev](https://ai-sdk.dev/)

Le SDK Vercel AI est la référence TypeScript de facto pour les applications d’IA. Pour l’UI générative spécifiquement :

**`useObject`** diffuse un objet JSON structuré depuis le serveur au fur et à mesure de sa génération. Vous définissez un schéma Zod ; le SDK analyse le JSON partiel et déclenche des re‑rendus dès que les champs arrivent. C’est le chemin le plus fluide vers le Pattern 2 dans une application Next.js.

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

**`useChat` avec des gestionnaires d’outils** → Pattern 1. Le modèle invoque des outils ; vous mappez les noms d’outils aux composants.

**AI Elements** ([elements.ai-sdk.dev](https://elements.ai-sdk.dev/)) fournit des primitives UI prêtes à l’emploi pour les associer au SDK.

**Une précision sur la trajectoire déroutante** : en octobre 2024, Vercel a annoncé dans la [discussion GitHub #3251](https://github.com/vercel/ai/discussions/3251) que le modèle AI SDK RSC — le schéma de streaming des React Server Components présenté comme la fonctionnalité phare « Generative UI » du SDK 3.0 — était mis en pause indéfiniment en raison de « plusieurs limitations anciennes » sans solution à court terme satisfaisante. Les équipes qui avaient construit leur stratégie produit autour du streaming RSC ont été prises de court. Les API `generateObject`/`streamObject` ont également été dépréciées dans le SDK 6.0. La migration recommandée depuis AI SDK RSC est le pattern `useObject` présenté ci‑dessus, ou bien `json-render` pour la génération basée sur un catalogue.

### assistant-ui

**GitHub** : [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui)

assistant-ui est un ensemble de primitives React composables pour construire des interfaces de chat de qualité production. C’est la solution adéquate lorsqu’on a besoin d’une UX de chat soignée — bulles de messages, tokens en streaming, actions copier/modifier/regénérer, états de réflexion — tout en conservant son propre backend et son propre rendu d’outils.

Il s’intègre bien avec n’importe quel backend (OpenAI, Anthropic, modèles locaux, points de terminaison personnalisés) et gère le rendu des appels d’outil via un modèle de slot/render prop familier.

### json-render

**GitHub** : [vercel-labs/json-render](https://github.com/vercel-labs/json-render) · Docs : [json-render.dev](https://json-render.dev/)

json-render met en œuvre le Pattern 2 avec une approche opinionnée, batteries‑included. Vous obtenez un catalogue de composants pré‑construit (composants shadcn/ui avec schémas Zod), un moteur de rendu, et une boucle de génération serrée où le modèle est limité au catalogue par le schéma.

Les caractéristiques distinctives :
- **Rendu multi‑cible** : la même spécification JSON peut être rendue dans une application web React, une application mobile React Native, un PDF, un e‑mail HTML ou une vidéo Remotion. C’est réellement utile pour les rapports.
- **Rendu progressif** : les composants apparaissent au fur et à mesure que le modèle les transmet, pas seulement après réception de la spécification complète.
- **Contraintes de schéma strictes** : le catalogue est conçu de façon à ce que le modèle ne puisse pas halluciner des types de composants valides mais inconnus.

Si vous construisez un tableau de bord ou une fonctionnalité de génération de rapports et que vous voulez éviter le travail d’infrastructure consistant à concevoir votre propre catalogue, **json‑render** est la voie la plus rapide pour les applications web.

**Sur le momentum** : json‑render a été lancé par Vercel Labs début 2026 et semble avoir rapidement attiré l’attention des développeurs web parce qu’il est immédiatement exploitable dans des projets React/Next.js classiques. Cela dit, json‑render est encore en version pré‑1.0 et la relation entre json‑render et A2UI est en cours de définition — Vercel a testé une sortie compatible A2UI, donc une convergence est possible. Pour le cross‑platform (mobile natif, multiples frameworks), A2UI reste le pari à plus long terme.

### Hashbrown

**GitHub** : [liveloveapp/hashbrown](https://github.com/liveloveapp/hashbrown)

Hashbrown adopte une approche distinctive : au lieu de créer une couche d’interface IA séparée, il intègre la sélection de composants IA directement dans votre application React ou Angular existante. Vous exposez les composants de votre application au LLM ; le LLM choisit ceux à rendre et peut invoquer des outils côté client.

C’est l’outil adéquat lorsque vous souhaitez injecter de l’intelligence dans des surfaces produit qui ne sont pas du « chat » : une page produit qui ajuste son agencement, un panneau de paramètres qui met en avant les bonnes options, ou un éditeur de flux de travail qui suggère l’étape suivante.

### OpenUI

**GitHub** : [thesysdev/openui](https://github.com/thesysdev/openui) · Docs : [openui.com](https://www.openui.com/)

OpenUI remplace le JSON par un format orienté ligne, semblable à du code (« OpenUI Lang »), conçu pour le rendu progressif et l’efficacité des tokens. La promesse est d’obtenir environ 67 % de tokens en moins par rapport à un JSON équivalent pour des mises en page complexes.

Le compromis est la maturité de l’écosystème — OpenUI est plus récent et l’outillage est plus mince que les approches basées sur JSON. Mais si le coût des tokens constitue une contrainte significative et que vous générez des mises en page complexes à haute fréquence, l’efficacité du format est réelle.

### Tambo

**GitHub** : [tambo-ai/tambo](https://github.com/tambo-ai/tambo)

Tambo se concentre sur la sélection d‑composants avec état : l’IA choisit les composants et peut interagir avec eux via des outils côté client, en conservant l’état du composant tout au long de la conversation. Idéal pour les cas d’usage où les éléments d’interface persistent d’un tour à l’autre — par exemple un composant de filtre que l’utilisateur ajuste pendant que l’IA poursuit son raisonnement sur les données filtrées.

---

## La couche Python

L'écosystème Python aborde les interfaces IA différemment. Ces outils sont optimisés pour les démonstrations de modèles ML, les applications de données et les outils internes — pas pour les applications grand public en production avec une composition de mise en page pilotée par un agent.

Ce n’est pas une critique. Pour les bons cas d’usage, Gradio et Streamlit sont les seuls outils dont vous avez besoin.

### Gradio

**GitHub** : [gradio-app/gradio](https://github.com/gradio-app/gradio) · PyPI : `gradio`

Valeur centrale de Gradio : vous écrivez une fonction Python ; Gradio l’enveloppe dans une interface web. La classe `Interface` ne tient que 3 lignes pour un classificateur d’images. `ChatInterface` en nécessite 10 pour un chatbot. `Blocks` vous offre un contrôle granulaire du layout quand c’est nécessaire.

Le « generative UI » dans Gradio est défini par le développeur Python, pas par le modèle. La visibilité et la configuration des composants peuvent évoluer dynamiquement en fonction des sorties du modèle, mais le catalogue de composants reste statique — vous ne demandez pas au modèle de composer des mises en page.

Gradio est le choix par défaut pour les HuggingFace Spaces et l’écosystème des démonstrations ML. Il compte des millions de téléchargements mensuels et alimente une grande partie du paysage des démos d’IA.

**Utilisez Gradio lorsque** : vous êtes un développeur Python qui construit une démonstration de modèle ML, un prototype de recherche ou un outil interne, et que vous ne voulez pas toucher à JavaScript.

### Streamlit

**GitHub** : [streamlit/streamlit](https://github.com/streamlit/streamlit)

Le modèle de Streamlit est plus prescriptif : un script Python s’exécute de bout en bout à chaque interaction. Vous appelez `st.chat_message()`, `st.dataframe()`, `st.plotly_chart()`. Le framework gère la mise en page.

Le modèle de réexécution du script complet peut sembler inefficace, mais il se révèle étonnamment ergonomique pour les chatbots IA qui accumulent l’historique des conversations — le script entier se relance, l’historique du chat est stocké dans l’état de session, et la sortie reste déterministe. Streamlit propose désormais un support natif de première partie pour la plupart des principaux fournisseurs de LLM et s’intègre directement à Snowflake Cortex.

**Reach forStreamlit when** : vous construisez une application de données pilotée par IA, un outil de reporting interne ou un tableau de bord soutenu par du ML en Python et que vous voulez le chemin de déploiement le plus simple possible.

### LangChain et Haystack

Il s’agit de cadres d’orchestration backend, pas de cadres UI. Ils apparaissent dans toute carte honnête d’une pile generative UI parce qu’ils constituent généralement la couche où les sorties structurées sont générées avant d’être envoyées à un frontend.

**LangChain** ([langchain-ai/langchain](https://github.com/langchain-ai/langchain)) : `.with_structured_output()` sur n’importe quel LLM vous fournit une génération JSON contrainte par Pydantic. Le décorateur `@tool` avec génération automatique de schéma est la façon la plus propre de définir quels outils le modèle peut appeler. LangChain transmet les résultats structurés jusqu’à la couche frontend que vous utilisez.

**Haystack** ([deepset-ai/haystack](https://github.com/deepset-ai/haystack)) : architecture de pipeline modulaire avec un fort support RAG. Hayhooks expose les pipelines Haystack sous forme de points d’accès HTTP — y compris des points d’accès compatibles MCP. Si votre UI générative nécessite une colonne vertébrale de récupération, l’architecture de pipeline de Haystack la gère proprement.

Aucun de ces cadres ne possède la couche UI. Ils génèrent les données que votre frontend (Pattern 1, 2 ou 3) rendra.

## Référence des fonctionnalités

Utilisez le catalogue ci‑dessus comme orientation, pas comme une liste de courses. La pile se résume généralement à un seul choix par couche :

| Besoin | Commencer ici |
|------|------------|
| Flux d'événements agent‑vers‑frontend | [AG-UI](https://github.com/ag-ui-protocol/ag-ui) |
| Charge UI déclarative traversant une frontière de confiance | [A2UI](https://github.com/google/A2UI) ou [MCP Apps](https://github.com/MCP-UI-Org/mcp-ui) |
| Rendu de chat/outils détenus par l'application | [Vercel AI SDK](https://github.com/vercel/ai), [assistant-ui](https://github.com/assistant-ui/assistant-ui), ou [CopilotKit](https://github.com/CopilotKit/CopilotKit) |
| Tableaux de bord, rapports et formulaires composés à partir d’un catalogue | [json-render](https://github.com/vercel-labs/json-render), [Hashbrown](https://github.com/liveloveapp/hashbrown), [OpenUI](https://github.com/thesysdev/openui), ou [Tambo](https://github.com/tambo-ai/tambo) |
| Artefacts visuels sandboxés | [OpenGenerativeUI](https://github.com/CopilotKit/OpenGenerativeUI) |
| Démos Python et applications de données | [Gradio](https://github.com/gradio-app/gradio) ou [Streamlit](https://github.com/streamlit/streamlit) |

## Vélocité de l’écosystème et terrain instable

Cet espace évolue rapidement et plusieurs projets ont diffusé des communications confuses en même temps que leur code. Dernière vérification le 8 mai 2026 ; considérez les notes d’état du projet ici comme une lecture horodatée, pas un verdict définitif.

**Vercel AI SDK RSC** était la fonctionnalité phare de Generative UI lors du lancement du SDK 3.0. Vercel a mis son développement en pause en octobre 2024 ([Discussion #3251](https://github.com/vercel/ai/discussions/3251)) en invoquant des limitations architecturales avec les React Server Components sans solution à court terme. Les équipes qui s’y étaient investies étaient naturellement frustrées. La documentation le mentionne toujours, mais ce n’est plus le chemin recommandé ; c’est `useObject` qui l’est.

**json-render** (Vercel Labs) représente la nouvelle direction — une alternative basée sur un catalogue, indépendante du framework, qui évite les problèmes d’accouplement avec les RSC. Elle est en pré‑1.0 et semble susciter un fort intérêt précoce parmi les développeurs React/web. La raison probable du DX : json-render est immédiatement exploitable dans un projet React/Next.js standard, alors que la portée multiplateforme d’A2UI impose davantage de friction d’installation. Comment cela évoluera à mesure que les deux spécifications mûriront reste réellement incertain. Vercel a testé la compatibilité d’A2UI dans json-render, laissant entendre qu’une convergence est possible.

**A2UI** (Google) est en pré‑1.0 (v0.9 lors de la dernière vérification) avec des changements majeurs entre versions mineures et des communications Google incohérentes concernant sa feuille de route. C’est le bon choix pour une portée multiplateforme (web + Flutter + SwiftUI) que json‑render ne couvre pas, et il bénéficie d’un soutien d’entreprise significatif. Pour les projets purement web aujourd’hui, l’expérience développeur reste plus difficile.

**AG‑UI** (CopilotKit) est également en pré‑1.0. La confusion la plus courante : le nom laisse penser qu’il s’agit d’un framework UI. Ce n’est pas le cas — c’est un protocole de transport. AG‑UI définit comment les événements circulent entre les back‑ends d’agents et votre frontend ; ce que vous rendez en réponse reste à votre discrétion. Ce modèle mental est solide et largement adopté, mais la spécification pré‑1.0 signifie que les cas limites sont encore en cours de résolution.

Le résultat pratique : **chaque acteur majeur ici est en pré‑1.0**. Prévoyez des changements d’API. Les modèles — outil‑à‑composant, composition de catalogue, génération sandboxée — sont suffisamment stables pour servir de base. Les choix de protocole spécifiques ne le sont pas.

---

## Conception du catalogue de composants : le vrai travail d’ingénierie

La majeure partie de la complexité intéressante du modèle 2 ne réside pas dans le rendu — c’est le catalogue qui pose problème.

Le catalogue est une **décision produit encodée sous forme de schéma**. Il répond à la question : quels sont les objets UI pertinents dans ce domaine ? Pas « quels composants React existent ? », mais « que doit réellement voir et manipuler un utilisateur dans ce contexte ? »

**Le mode d’échec trop granulaire** : vous exposez `Row`, `Column`, `Text`, `Button`, `Icon`. Le modèle doit alors jouer le rôle d’ingénieur front‑end. Il générera des mises en page médiocres qui ne correspondent pas à votre système de conception, négligera les états vides, produira un balisage non accessible et modifiera son approche d’une réponse à l’autre parce que rien dans le catalogue ne contraint la sortie à votre langage visuel produit.

**Le mode d’échec trop grossier** : vous exposez `WeatherCard`, `FlightCard`, `HotelCard`. Le modèle ne pourra pas s’adapter lorsqu’un utilisateur demande quelque chose qui ne correspond pas à une carte pré‑fabriquée. Il reviendra alors à du texte brut.

**Le milieu utile** : composants de domaine avec des emplacements contraints.

Un catalogue d’application de voyage pourrait ressembler à :

```
TripSummary         — itinéraire en un coup d’œil
FlightOptionList    — options de vol sélectionnables avec tarification
HotelComparison     — cartes d’hôtel côte à côte
TravelerForm        — collecte des informations du voyageur
PolicyNotice        — appel d’attention aux règles réglementaires/tarifaires
BookingConfirmation — confirmation finale avec bouton d’action
```

Un catalogue d’application financière pourrait ressembler à :

```
PortfolioSnapshot   — positions clés et P&L
TransactionTable    — transactions filtrables et paginées
RiskBreakdown       — métriques d’allocation et de volatilité
ScenarioComparison  — modélisation de scénarios côte à côte
ApprovalGate        — action nécessitant une confirmation humaine
```

Le catalogue reflète le vocabulaire de votre produit. Il encode vos décisions UX, vos exigences d’accessibilité, la gestion des états vides et les modèles d’actions dangereuses dans le code des composants. Le modèle se charge d’assembler ces pièces. Vous restez maître de l’apparence de chaque composant et de ce qu’il est autorisé à faire.

**Règles de conception de schéma qui réduisent les hallucinations** :

1. Gardez les valeurs d’énumération courtes et explicites. `"type": "bar_chart"` plutôt que `"type": "data-visualization-bar-type-vertical"`.
2. Rendez impossible toute composition invalide. Si un `PolicyNotice` ne peut apparaître qu’à la fin d’une mise en page, ne le placez pas au même niveau de schéma que des éléments pouvant apparaître n’importe où.
3. Utilisez généreusement les champs obligatoires. Un champ optionnel est un champ que le modèle peut omettre et que votre rendu doit gérer comme nul.
4. Testez le catalogue avec de véritables requêtes avant la mise en production. Conservez les spécifications générées ; vérifiez les violations de schéma, les valeurs de champ halluciné­es et les compositions techniquement valides mais sémantiquement incorrectes.

---  
## Pièges Courants  

**Piège : considérer le JSON valide comme un comportement sûr.** La validation de schéma ne confirme que la structure. Elle n’indique rien sur la correspondance entre l’action attachée à un bouton et son libellé, sur la cohérence d’un total avec les données dont il provient, ou sur le fait qu’un composant UI fasse quelque chose que l’utilisateur n’attend pas. Les spécifications UI générées nécessitent une révision sémantique, pas seulement une validation de schéma. Au minimum, les actions destructrices doivent être accompagnées d’un composant de confirmation, et les libellés de ces composants doivent être testés par rapport aux actions qu’ils déclenchent.  

**Piège : exposer des primitives de conception au lieu de primitives produit.** Si le modèle doit décider d’utiliser un padding de 16 px ou de 20 px, vous lui avez donné le mauvais niveau d’abstraction. Les composants métier doivent encapsuler le goût du produit. Le modèle doit composer le comportement, pas gérer les détails de présentation.

**Piège : utiliser l’UI générative alors qu’une UI statique suffit.** Si la structure de ce que vous voulez afficher est connue à la compilation — ce qui est généralement le cas — le Pattern 1 avec des composants pré‑construits est plus rapide, plus sûr et plus cohérent. L’UI générative ne justifie sa complexité que lorsque la structure varie réellement en fonction des données ou du contexte de la tâche.

**Piège : négliger l’accessibilité.** Les LLM hallucinent des violations WCAG. Ils inséreront `role="region"` sur des éléments interactifs, généreront des formulaires sans libellés et produiront des contrastes qui échouent au niveau WCAG AA. Votre bibliothèque de composants peut être entièrement accessible ; les compositions générées par IA de ces composants ne le sont pas automatiquement. Testez le chemin de rendu complet, pas seulement les composants isolés.

**Piège : confondre le protocole et le cadre.** AG‑UI n’est pas un framework frontend. A2UI n’est pas une bibliothèque React. Ce sont des formats de fil et des protocoles d’événements. Vous avez toujours besoin d’un framework frontend pour les implémenter. CopilotKit implémente AG‑UI et A2UI. `json-render` implémente le modèle de catalogue A2UI/Open‑JSON‑UI. Ce sont des couches différentes.

---

## Recommandations par cas d’usage
---

**Ajouter uncopilote à une application SaaS existante** : commencez par le Pattern 1 (outil‑vers‑composant). Utilisez le SDK Vercel AI `useChat` ou CopilotKit. Mappez vos 5 à 10 actions d’agent principales vers des composants pré‑construits. Déployez cela, mesurez les résultats, puis n’élargissez le catalogue que si les utilisateurs montrent clairement le besoin d’une composition plus riche.

**Génération de tableau de bord à partir du langage naturel** : adoptez le Pattern 2 avec json‑render ou un catalogue A2UI personnalisé. Définissez un catalogue de 8 à 15 types de composants couvrant vos types de graphiques, cartes de métriques et variantes de tables. Fournissez le schéma au modèle ; laissez‑le composer la mise en page. Mettez en place une validation qui intercepte les types inconnus avant qu’ils n’atteignent le rendu.

**Frontend multi‑agent** : utilisez CopilotKit avec AG‑UI. Le flux d’événements gère le streaming en temps réel entre les back‑ends d’agents ; l’état partagé assure la transition entre les agents ; le pattern HITL gère les portes d’approbation.

**Construction à l’intérieur de ChatGPT ou d’un autre hôte MCP** : utilisez MCP Apps. Définissez votre outil comme un « data tool » qui récupère les données et raisonne, et un outil de rendu séparé qui demande un widget. Gardez la logique métier hors du modèle de widget.

**Démos de modèles ML et applications de données (équipe Python)** : Gradio pour les démos et HuggingFace Spaces. Streamlit pour les applications de données avec des interactions plus complexes. Aucun des deux n’exige JavaScript.

**Artefacts visuels, simulations, diagrammes** : utilisez le Pattern 3 (OpenGenerativeUI ou équivalent). Mettez en place une CSP stricte pour les iframes. Traitez la sortie comme du contenu utilisateur non fiable du point de vue sécurité.

---

Les frameworks évoluent rapidement. La convergence des protocoles (AG‑UI pour le streaming, A2UI/Open‑JSON‑UI pour les spécifications de catalogue) est encore en cours, mais la forme est suffisamment claire pour pouvoir s’appuyer dessus.

Les défis d’ingénierie qui comptent réellement aujourd’hui ne sont pas le choix du framework. Il s’agit de la conception du catalogue — déterminer ce que le modèle est autorisé à dire, ce qui requiert plus de clarté produit que de compétence technique. Il s’agit de la validation sémantique — vérifier que l’UI générée fait réellement ce qu’elle prétend, et pas seulement qu’elle passe la validation de schéma. Et il s’agit de combler le fossé d’accessibilité — construire des catalogues où chaque composant, et chaque composition de composants, respecte le niveau d’accessibilité que l’on exigerait d’une UI écrite à la main.

Le modèle exécutera exactement ce que vous lui indiquez, dans la grammaire que vous lui fournissez. Concevez la grammaire avec intention.
````
