# Translation Candidate
- Slug: docker-rocks
- Locale: de
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-06-11--docker-rocks/de/index.mdx
- Validation: deferred
- Runtime seconds: 30.28
- Input tokens: 1812
- Output tokens: 1946
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000799
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker rockt & funktioniert jetzt auf OSX
subTitle: 'Docker ist großartig, schnell und flexibel.'
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
## Docker rockt

> Updates September 2016, 2018  
> Boot2Docker wurde durch Docker for Mac ersetzt

> Historische Anmerkung: Dieser Beitrag wurde bewusst als Schnappschuss aus der Docker-for-Mac-Ära von 2015 erhalten. Die Performance-Empfehlungen und Tool-Namen spiegeln diesen Moment wider; das heutige Docker Desktop und die Compose-Workflows haben sich weiterentwickelt.

1. Docker ist fantastisch, schnell und flexibel.  
1. Frühere Tools, insbesondere boot2docker, waren langsam und anfällig für Abstürze.

Docker kann derzeit nativ auf einem Linux-Kernel v3.4+ laufen – und die aktuelle boot2docker-VM läuft tatsächlich mit v4.

Beste Nutzung deiner Hardware: Installiere das neueste Debian oder Ubuntu auf deinem Mac/Windows-Rechner,

... na ja, diese Spielchen helfen deinem Code nicht weiter...

### Überprüfe deine Einrichtung

Überprüfe die Ausgabe des Befehls `docker info`.

1. Sicherheit: Prüfe den Server auf unerwartet offene Ports (mit `nmap` von einem entfernten Netzwerk)
1. DNS: Verwende einen lokalen Cache oder einen DNS-Server mit niedriger Latenz.
1. Speicher: Verwende den richtigen Storage-Treiber (`overlay2` ist wahrscheinlich)

Aktualisiert 2024:

- Docker Desktop ist proprietär, aber für den persönlichen Gebrauch kostenlos. Es ist ein großartiger Einstieg in Docker unter OSX oder Windows.
- Wenn du nach einer quelloffeneren Lösung suchst, wirf einen Blick auf [Rancher Desktop](https://rancherdesktop.io/).
````
