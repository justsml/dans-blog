# Translation Candidate
- Slug: docker-rocks
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/fr/index.mdx
- Validation: passed
- Runtime seconds: 4.22
- Input tokens: 1629
- Output tokens: 1769
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000555
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: 'Docker, c’est du costaud et fonctionne maintenant sous macOS'
subTitle: 'Docker est formidable, rapide et flexible.'
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
## Docker est formidable

> Mises à jour : septembre 2016, 2018  
> Boot2Docker a été remplacé par Docker pour Mac

> Note historique : ce billet est intentionnellement conservé tel qu'un instantané de Docker pour Mac de 2015. Les conseils sur les performances et les noms des outils reflètent cet instant ; les workflows actuels de Docker Desktop et Compose ont évolué.

1. Docker est incroyable, rapide et flexible.  
1. Les outils précédents, notamment boot2docker, étaient lents et sujets aux plantages.

Docker peut s'exécuter nativement sur un noyau Linux v3.4+ – et la machine virtuelle actuelle de boot2docker exécute en réalité la version v4.

Meilleure utilisation de votre matériel : Installez la dernière version de Debian ou Ubuntu sur votre ordinateur Mac/Windows,

Allez, ces jeux ne vous aident pas à avancer dans votre code...

### Vérifiez votre configuration

Examinez la sortie de la commande `docker info`.

1. Sécurité : Vérifiez les ports ouverts inattendus sur le serveur (en utilisant `nmap` depuis un réseau distant)  
1. DNS : Utilisez un cache local ou un serveur DNS à faible latence.  
1. Stockage : Utilisez le pilote de stockage approprié (`overlay2` est probablement le bon choix)

Mise à jour 2024 :

- Docker Desktop est propriétaire, mais gratuit pour un usage personnel. C'est une excellente solution pour commencer avec Docker sous OSX ou Windows.  
- Si vous préférez une solution plus open-source, jetez un œil à [Rancher Desktop](https://rancherdesktop.io/).
````
