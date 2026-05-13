# Translation Candidate
- Slug: docker-rocks
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/de/index.mdx
- Validation: deferred
- Runtime seconds: 1.05
- Input tokens: 1971
- Output tokens: 483
- Thinking tokens: unknown
- Cached input tokens: 640
- Cache write tokens: 0
- Estimated cost: $0.000164
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker ist großartig – läuft jetzt auf macOS
subTitle: 'Docker ist erstaunlich, schnell und flexibel'
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
> Boot2Docker wurde durch Docker für Mac ersetzt

> Historische Anmerkung: Dieser Beitrag wird bewusst als Schnappschuss aus dem Docker‑for‑Mac‑Jahr 2015 erhalten. Die Performance‑Hinweise und Werkzeugnamen spiegeln diesen Zeitpunkt wider; aktuelle Docker‑Desktop‑ und Compose‑Workflows haben sich weiterentwickelt.

1. Docker ist großartig, schnell und flexibel.  
1. Vorherige Werkzeuge, insbesondere boot2docker, waren langsam und neigten zu Abstürzen.

Docker kann derzeit nativ auf einem Linux‑Kernel v3.4+ laufen – und die aktuelle boot2docker‑VM verwendet tatsächlich v4.

Optimaler Einsatz Ihrer Hardware: Installieren Sie das neueste Debian‑ oder Ubuntu‑Release auf Ihrem Mac‑/Windows‑Rechner.

… c’mon, diese Spiele bringen deinen Code nicht weiter…

### Prüfen Sie Ihre Konfiguration

Überprüfen Sie die Ausgabe des Befehls `docker info`.

1. Sicherheit: Untersuchen Sie den Server auf unerwartet offene Ports (mit `nmap` aus einem entfernten Netzwerk)
1. DNS: Nutzen Sie einen lokalen Cache oder einen DNS‑Server mit geringer Latenz.
1. Speicher: Verwenden Sie den richtigen Storage‑Treiber (`overlay2` ist höchstwahrscheinlich die richtige Wahl)

Aktualisiert 2024:

- Docker Desktop ist proprietär, aber für den privaten Gebrauch kostenlos. Es ist ein guter Einstieg, Docker auf OSX oder Windows zu nutzen.
- Wenn Sie eine stärker Open‑Source‑Lösung suchen, schauen Sie sich [Rancher Desktop](https://rancherdesktop.io/) an.
````
