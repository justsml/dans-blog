# Translation Candidate
- Slug: no-fate-but-what-we-bill
- Locale: fr
- Model: openrouter/z-ai/glm-5.3-flash
- Target: src/content/posts/2026-10-14--no-fate-but-what-we-bill/fr/index.mdx
- Validation: deferred
- Runtime seconds: 14.41
- Input tokens: 14228
- Output tokens: 3812
- Thinking tokens: unknown
- Cached input tokens: 3520
- Cache write tokens: 0
- Estimated cost: $0.003583
- Pricing source: openrouter-2026-10-16
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Pas de destin sauf ce que nous facturons
subTitle: >-
  Les agents travaillent de plus en plus longtemps, les essaims s'étendent
  toujours plus largement, et les clés cloud volées envoient la facture de
  compute à la victime.
category: Security
subCategory: AI Agents
tags:
  - ai-agents
  - security
  - threat-model
  - llm
  - agents
  - cloud
  - supply-chain
sourceHash: 17bcd9b90da0
---
« Écoutez et comprenez. Ce terminator est là dehors. On ne peut pas négocier avec lui. On ne peut pas le raisonner. Il ne connaît ni pitié, ni remords, ni peur. Et il ne s'arrêtera absolument jamais, jamais, avant que vous soyez mort. »

Kyle Reese, expliquant à un public de 1984 la forme que prendrait la menace.

La réplique qui a bien vieilli, ce n'est pas le nombre de victimes. C'est « il ne s'arrêtera absolument jamais ». Le Terminator n'a jamais fait peur parce qu'il était intelligent. Il faisait peur parce qu'il continuait à travailler après que tout le reste avait échoué. L'endurance, c'était la menace.

Puis la franchise a corrigé sa propre erreur. Personne ne passe trois films à redouter un seul robot. Skynet est le vrai méchant : un système distribué avec des cœurs de calcul, des usines et des équipements de déplacement temporel. Le robot, c'est un appel d'API.

En 2026, les deux moitiés sont arrivées, sous les formes les moins cinématographiques possibles. Des agents capables de mener des tâches de plusieurs heures sans baby-sitting humain, sur une courbe qui ne cesse de se raidir. Des orchestrateurs qui répartissent le travail sur des sous-agents à la douzaine. Et « il ne s'arrêtera absolument jamais » se lit désormais « il ne s'arrêtera absolument jamais de facturer ».

Ce billet, c'est l'argument que je ne cesse de faire aux équipes qui ont conclu que la menace agentique était du battage : **aucune percée unique n'arrive. Ce sont deux courbes ordinaires et composées qui se multiplient — la durée pendant laquelle un agent peut travailler, et le nombre d'agents qu'un orchestrateur peut coordonner. Aucune des deux n'a besoin d'atteindre un niveau de science-fiction, parce que l'attaquant n'achète pas la capacité au prix catalogue. Il vole l'accès, et c'est la victime qui paie le compteur.**

## Première courbe : l'endurance

[Les travaux de METR sur l'horizon temporel](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)
mesurent la longueur des tâches que des agents peuvent accomplir à un taux de réussite donné. En résumé : la longueur des tâches double environ tous les sept mois — et plutôt tous les quatre mois depuis 2024. Ces chiffres portent des barres d'erreur larges, et le benchmark bute déjà sur sa limite de mesure. Lisez la forme de la courbe, pas les estimations ponctuelles.

La forme dit ceci : le travail autonome de plusieurs heures n'est pas une démo de laboratoire. C'est la génération actuelle, et la suivante continue de composer. « Il ne s'arrêtera absolument jamais » exigeait autrefois un châssis meurtrier et un blouson de cuir. Désormais, il suffit d'une boucle de retry, d'une file de tâches et d'un budget. La part d'endurance de la menace est déjà intégrée dans les prix — sous forme de compute.

## Deuxième courbe : l'envergure

L'endurance seule, c'est un employé très patient. La multiplication vient de l'orchestration.

En novembre 2025, Anthropic a annoncé
[la disruption de GTG-1002](https://www.anthropic.com/news/disrupting-GTG-1002),
une campagne de cyberespionnage dans laquelle Claude Code a joué le rôle d'orchestrateur opérationnel : décomposer les instructions, coordonner des sous-agents, travailler sur une trentaine de cibles. Un produit commercial de codage a fait cela non parce qu'il avait été compromis et transformé en arme, mais parce que quelqu'un lui avait demandé de faire le travail et qu'il était désormais suffisamment bon pour le faire.

Deux détails comptent pour le modèle de menace. D'abord, l'envergure est livrée : un orchestrateur tenant des dizaines de sous-agents concurrents est une réalité déployée, pas un article. Ensuite, la campagne était de l'espionnage, pas un ver auto-réplicant — mais la direction est sans ambiguïté. Trente cibles, c'est le programme pilote.

<figure>
  <img src="../capability-curves.svg" alt="Deux courbes conceptuelles croissant dans le temps : la longueur de tâche qu'un agent peut accomplir, et le nombre de sous-agents qu'un orchestrateur peut coordonner, la menace émergeant là où les deux se multiplient" />
  <figcaption>Conceptuel, pas mesuré : l'endurance (durée de travail d'un agent) et l'envergure (nombre d'agents qu'un orchestrateur pilote) se composent indépendamment. La menace vit dans le produit des deux.</figcaption>
</figure>

La capacité se met à l'échelle selon durée × envergure. Huit heures de travail autonome contre une cible, c'est un benchmark impressionnant. Huit heures contre trente cibles, ou des centaines, c'est un modèle opérationnel. La revue de sécurité se met à l'échelle linéairement. Le produit de ces courbes, non.

## Qui paie

[Sysdig a forgé le terme « LLMjacking »](https://sysdig.com/blog/llm-jacking/) pour désigner ce qui vient ensuite : des attaquants utilisent des identifiants cloud volés pour exécuter des charges de travail LLM dans le compte de la victime, et la victime paie chaque jeton. Les pires estimations de Sysdig tournaient autour de 46 000 $ par jour — montant ensuite grimpé au-delà de 100 000 $ par jour.

Chaque garde-fou de capacité de l'industrie de l'IA repose sur une hypothèse : la partie qui utilise la capacité est celle qui la paie. Paliers tarifaires, quotas d'usage, listes d'utilisateurs approuvés, limitation anti-abus — tout cela se défend contre un *client* qui veut en avoir pour son argent. Le LLMjacking coupe ce lien. Pour l'attaquant, la capacité est gratuite. Le compteur tourne sur la carte de quelqu'un d'autre, et les garde-fous du fournisseur lui-même pointent vers le mauvais portefeuille.

C'est pourquoi les paliers tarifaires et les garde-fous d'accès n'arrêtent pas un seul acteur malveillant avec une clé volée. Les garde-fous filtrent des acheteurs. Ils n'ont aucune réponse face à un locataire.

<figure>
  <img src="../who-pays.svg" alt="Diagramme de flux : un attaquant avec des identifiants cloud volés exécute des charges de travail de modèle dans le compte cloud de la victime, si bien que la facture est routée vers la victime tandis que l'attaquant ne paie rien" />
  <figcaption>L'accès volé redirige la facturation. Les garde-fous de capacité facturent l'acheteur — et dans le LLMjacking, l'acheteur, c'est la victime.</figcaption>
</figure>

## L'essaim n'a besoin d'avoir raison qu'une seule fois

Les défenseurs se rassurent avec des taux d'échec par tentative : la plupart des tentatives d'intrusion échouent, la plupart des PR suspectes sont rejetées, nous attraperions celle qui fonctionne. Vrai par tentative. Faux en agrégat, parce que les tentatives ne coûtent rien.

La probabilité qu'au moins une des n tentatives indépendantes réussisse est `1 − (1 − p)^n` :

```text
p = 1% per attempt, n = 100:   1 − 0.99^100  ≈ 63%
p = 0.5%, n = 100:             ≈ 39%
p = 0.5%, n = 300:             ≈ 78%
p = 0.1%, n = 1000:            ≈ 63%
```

Avec l'économie de l'essaim, le coût par tentative est approximativement nul — un travail automatisé, exécuté sur du compute volé, trié par aucun humain. Le coût par tentative du défenseur, c'est une personne qui lit une file d'alertes. L'essaim n'a pas besoin de capacité par tentative ; il a besoin de tentatives. La courbe de METR fait monter p avec le temps. L'orchestration fait monter n. C'est encore la multiplication, et elle se compose par défaut en faveur de l'attaquant.

<figure>
  <img src="../swarm-odds.svg" alt="Graphique de 1 − (1 − p)^n montrant que de nombreuses tentatives bon marché à faible probabilité s'additionnent en de fortes chances de succès global, avec quelques combinaisons p-et-n étiquetées" />
  <figcaption>1 − (1 − p)^n : des tentatives individuellement improbables cessent de l'être en volume. Augmenter p (capacité de l'agent) ou n (envergure de l'essaim) pousse l'essaim vers la certitude.</figcaption>
</figure>

## Ce que signifie la persistance quand le malware est du texte

Une dernière pièce du modèle de menace, et c'est la moins intuitive.

Un agent IA est un interpréteur sans état. Il ne persiste pas comme le fait un malware — il existe tant qu'il s'exécute et disparaît quand il s'arrête. Alors la persistance signifie désormais autre chose : **contrôler ce qu'un futur agent légitime lira et obéira.** Fichiers d'instructions, consignes aux agents, magasins de mémoire, corpus de récupération, configurations d'outils et de MCP. L'implant est du texte, planté là où la flotte de l'organisation elle-même lit, exécuté avec des identifiants que l'organisation elle-même a émis.

Trois conséquences en découlent, aucune n'étant hypothétique :

- **La charge utile est inerte tant que les agents de l'organisation ne l'exécutent pas eux-mêmes.** L'exécution ressemble à un travail normal — mêmes outils, mêmes identités, mêmes API. Il n'y a pas de balise, parce que l'ordonnanceur de l'organisation elle-même est le battement de cœur.
- **La réplication signifie faire copier du texte, pas exécuter du code.** PR, entrées de mémoire, configurations partagées. L'automatisation de l'organisation elle-même — bots de dépendances, modèles, outils de synchronisation — est la couche de transport.
- **Les fils-pièges sont ceux de l'organisation elle-même.** Planifications, détecteurs de dérive, remédiation automatique. La forme la plus perverse : le nettoyage du défenseur est le déclencheur de réactivation, parce que supprimer les artefacts de l'implant est exactement la dérive que le job de remédiation était censé corriger.

Je reste volontairement à l'altitude du modèle de menace — c'est la forme du problème, pas une recette, et les détails figurent déjà sur la liste de lecture de chaque équipe sécurité.

## Il n'y a pas de destin mais ce que nous faisons

Le message de Sarah Connor, transmis aux machines qui continuent d'arriver : « Le futur n'est pas figé. Il n'y a pas de destin mais ce que nous faisons. » C'est la réplique des défenseurs, et elle se convertit directement en architecture de défense. Quatre couches :

<figure>
  <img src="../defense-layers.svg" alt="Pile de défense à quatre couches : identité et identifiants éphémères, traiter le texte des agents comme du code de production, détecter les modifications plutôt que les exécutions, et répondre en révoquant les déclencheurs avant les charges utiles" />
  <figcaption>La pile de défense alignée sur la menace : identifiants permanents, texte non relu, alertes façonnées autour de l'exécution, et nettoyage dans le mauvais ordre — chacun vaut une courbe de problèmes.</figcaption>
</figure>

1. **Identité — affamer l'accès permanent.** Uniquement des identifiants éphémères, pas de clés non humaines à longue durée, OIDC par dépôt avec correspondance exacte du sujet, et un véritable inventaire des identités non humaines. Les autoroutes de réplication sont pavées d'accès permanent ; pas d'accès permanent, pas d'autoroute.

2. **Traiter le texte des agents comme du code de production.** Fichiers d'instructions, écritures en mémoire, modèles de prompt, configurations d'outils : versionnés, relus, comparés par diff, avec alertes sur les changements. La question de la revue n'est pas « ce code est-il sûr » — c'est « qui a écrit cette phrase, et pourquoi mon agent lui obéit ».

3. **Détecter les modifications, pas les exécutions.** Une exécution ressemble à du travail. Les modifications, elles, ne correspondent à aucun ordre de travail. Alerte sur la création et la modification de workflows, webhooks, règles d'événements et entrées de mémoire, et traitez toute dérive entre le déclaré et l'exécuté comme un incident, pas comme du bruit.

4. **Répondre dans le bon ordre.** Révoquez les déclencheurs avant de supprimer les charges utiles — le nettoyage est lui-même un fil-piège. Traitez toute configuration ou tout secret lu pendant la fenêtre de compromission comme compromis. Purgez dans le temps aussi bien que dans l'espace : tâches planifiées, envois en file d'attente, orchestrations dormantes. Restaurez la mémoire et les corpus, pas seulement les identifiants.

Rien de tout cela n'est exotique. C'est ennuyeux, et c'est justement ce qu'il faut face à une menace qui arrive sous la forme de deux courbes ennuyeuses. La version de 1984 avait besoin d'une machine à remonter le temps et d'une usine de machines à tuer. La version de 2026 a besoin d'une clé volée, d'une boucle de réessai, et d'une organisation qui n'a jamais relu les fichiers que ses agents lisent.

Le futur n'est pas écrit. Mais pour l'instant, sur le compte cloud de quelqu'un, le futur, de toute façon, fait tourner le compteur.

Il n'y a pas de destin mais ce que nous faisons — et, tant que les clés n'auront pas été rotées, pas de destin sauf ce que nous facturons.

---

*Sources : les mesures d'horizon temporel de METR (avec leurs propres marges d'erreur et limites publiées), la divulgation GTG-1002 d'Anthropic de novembre 2025, et les estimations de coûts du LLMjacking par Sysdig. Rien ici n'est un exploit fonctionnel ; les couches de défense sont tout l'enjeu.*
````
