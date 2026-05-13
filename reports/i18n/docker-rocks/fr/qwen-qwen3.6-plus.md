# Translation Candidate
- Slug: docker-rocks
- Locale: fr
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2015-06-11--docker-rocks/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.01
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug docker-rocks --locale fr --model qwen/qwen3.6-plus --chunk 6p --quiz-concurrency 24
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker déchire & fonctionne désormais sur OSX
subTitle: 'Docker est génial, rapide et flexible.'
date: '2015-06-11'
modified: '2024-08-10'
category: DevOps
subCategory: docker
tags:
  - docker
  - boot2docker
  - devops
related:
  - docker-makes-everything-better
  - docker-server-setup-notes
  - docker-security-tips-for-self-hosting
cover: ../guillaume-bolduc-259596-unsplash.webp
cover_mobile: ../w300_guillaume-bolduc-259596-unsplash.webp
cover_icon: ../icon_guillaume-bolduc-259596-unsplash.webp
---
## Docker déchire

> Mises à jour septembre 2016, 2018  
> Boot2Docker a été remplacé par Docker pour Mac

> Note historique : cet article est intentionnellement conservé comme un instantané de Docker pour Mac de l'époque 2015. Les conseils de performance et les noms d'outils reflètent ce moment ; les workflows actuels de Docker Desktop et Compose ont évolué.

1. Docker est incroyable, rapide et flexible.  
1. Les outils précédents, boot2docker en particulier, étaient lents et sujets aux plantages.

Docker peut actuellement fonctionner nativement sur un noyau Linux v3.4+ – et la machine virtuelle boot2docker actuelle exécute en fait v4.

Meilleure utilisation de votre matériel : installez la dernière Debian ou Ubuntu sur votre Mac/Windows,

### Vérifiez votre configuration

Passez en revue la sortie de la commande `docker info`.

1. Sécurité : vérifiez que le serveur n’expose pas de ports inattendus (avec `nmap` depuis un réseau distant).  
1. DNS : utilisez un cache local ou un serveur DNS à faible latence.  
1. Stockage : choisissez le bon pilote de stockage (`overlay2` est recommandé).

Mise à jour 2024 :

- Docker Desktop est propriétaire, mais gratuit pour un usage personnel. C’est un excellent moyen de démarrer avec Docker sur OSX ou Windows.  
- Si vous cherchez une solution plus open-source, jetez un œil à [Rancher Desktop](https://rancherdesktop.io/).
````
