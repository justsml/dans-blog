# Translation Candidate
- Slug: security-notes-regex
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-02-24--security-notes-regex/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 3.46
- Input tokens: 1850
- Output tokens: 1435
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000492
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug security-notes-regex --locale fr
## Raw Output

````mdx
---
title: 'Notes de sécurité : Regex'
subTitle: ''
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
## Rejet de service par expression rationnelle (ReDOS)

L'une des vulnérabilités les plus surprenantes, mais aussi difficiles à détecter que j'ai trouvées, concerne les expressions rationnelles. Soit mal écrites, soit mal implémentées.  

La mémoire ou le processeur peuvent être épuisés par une entrée utilisateur volumineuse ou soigneusement conçue.  

> Il s'agit d'une vulnérabilité de rejet de service, et non seulement d'un problème de performance. Si une entrée hostile peut bloquer le processeur suffisamment longtemps pour priver les utilisateurs légitimes, cela doit figurer dans votre modèle de menace de sécurité.  

### Signaux d'alerte  

1. Quantificateurs imbriqués, groupes répétés ou alternations chevauchantes  
2. Moteurs lourds de backtracking sans délai d'attente ou limite de longueur d'entrée  
3. L'expression est utilisée avec une entrée utilisateur non validée  
4. La validation par expression rationnelle s'exécute sur un chemin de requête critique

### Mitigation / Résolution  

1. Les expressions rationnelles sont difficiles.  
    1. Par exemple, voici comment les experts d'[OWASP recommandent de valider une adresse IP][owasp] :  
       ```regex
       ^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
       ```  
    2. Cela fait plus long qu'un tweet (version classique), pour une adresse IP de 4 octets !!!  
2. Limiter la longueur de l'entrée avant l'évaluation par l'expression rationnelle.  
3. Ajouter des délais d'attente, de l'analyse statique, ou un moteur non-backtracking si la plateforme le supporte.  
4. Cela concerne presque toutes les langues et plateformes : .NET/Node/Python/PERL/Java.  

### Références  

- [OWASP ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
````
