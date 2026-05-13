# Translation Candidate
- Slug: security-notes-regex
- Locale: fr
- Model: qwen/qwen3.6-35b-a3b
- Target: src/content/posts/2015-02-24--security-notes-regex/fr/index.mdx
- Validation: deferred
- Runtime seconds: 20.10
- Input tokens: 1152
- Output tokens: 4778
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.004951
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: 'Notes de sécurité : RegEx'
subTitle: Les regex peuvent-elles être vulnérables ?
date: '2015-02-24'
modified: '2018-07-30'
category: Security
subCategory: RegEx
tags:
  - security
  - regex
  - dos
  - remote-exploit
cover_credit: Photo by Markus Spiske on Unsplash
cover: ../markus-spiske-666905-unsplash.webp
cover_mobile: ../w300_markus-spiske-666905-unsplash.webp
cover_icon: ../icon_markus-spiske-666905-unsplash.webp
social_image: ../desktop-social.webp
---
## Déni de service par expression régulière : ReDOS

L'une des vulnérabilités les plus surprenantes, et pourtant les plus difficiles à repérer, que j'ai rencontrées concerne les expressions régulières.
Soit mal écrites, soit mal implémentées.

La mémoire ou le CPU peuvent être saturés par des entrées utilisateur volumineuses ou spécifiquement conçues à cet effet.

> Il s'agit d'une vulnérabilité de déni de service, et non d'un simple problème de performance. Si une entrée malveillante peut bloquer le CPU assez longtemps pour affamer les utilisateurs légitimes, elle doit figurer dans votre modèle de menaces de sécurité.

### Signes avant-coureurs

1. Quantificateurs imbriqués, groupes répétés ou alternatives qui se chevauchent
2. Moteurs à backtracking intensif sans timeout ni limite de longueur d'entrée
3. L'expression est appliquée à des entrées utilisateur non validées
4. La validation par regex s'exécute sur un chemin de requête critique

### Atténuation / Résolution

1. Les expressions régulières, c'est compliqué.
    1.  Par exemple, voici comment les experts de [OWASP recommandent de gérer la validation d'adresses IP][owasp] : `^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$`
    2.  C'est plus long qu'un tweet (à l'ancienne) pour valider une adresse IP de 4 octets !!!
2. Limitez la longueur de l'entrée avant l'évaluation de la regex.
3. Ajoutez des timeouts, une analyse statique ou un moteur sans backtracking si la plateforme le permet.
4. Cela impacte presque tous les langages et plateformes : .NET, Node, Python, PERL, Java.

### Références

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
