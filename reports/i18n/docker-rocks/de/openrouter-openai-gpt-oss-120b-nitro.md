# Translation Candidate
- Slug: docker-rocks
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 0.58
- Input tokens: 1808
- Output tokens: 452
- Thinking tokens: unknown
- Cached input tokens: 896
- Cache write tokens: 0
- Estimated cost: $0.000152
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2015-06-11--docker-rocks/de/index.mdx reports/i18n/docker-rocks/de
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker rockt – läuft jetzt auf macOS
subTitle: 'Docker ist großartig, schnell undflexibel'
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
## Docker Rocks> Updates September 2016, 2018  
> Boot2Docker wurde durch Docker for Mac ersetzt

> Historische Anmerkung: Dieser Beitrag wird bewusst als Schnappschuss aus der Docker‑for‑Mac‑Ära 2015 erhalten. Die Performance‑Hinweise und Tool‑Namen spiegeln diesen Zeitpunkt wider; aktuelle Docker‑Desktop‑ und Compose‑Workflows haben sich weiterentwickelt.

1. Docker ist fantastisch, schnell und flexibel.  
2. Vorherige Werkzeuge, insbesondere boot2docker, waren langsam und neigten zu Abstürzen.

Docker kann derzeit nativ auf einem Linux‑Kernel v3.4+ laufen – und die aktuelle boot2docker‑VM verwendet tatsächlich v4.

Optimale Nutzung Ihrer Hardware: Installieren Sie das neueste Debian oder Ubuntu auf Ihrem Mac/Windows‑Rechner.

... c'mon those games aren't helping your code...

### Prüfen Sie Ihre Konfiguration

Überprüfen Sie die Ausgabe des Befehls `docker info`.

1. Sicherheit: Prüfen Sie den Server auf unerwartet offene Ports (mit `nmap` aus einem entfernten Netzwerk)
1. DNS: Verwenden Sie einen lokalen Cache oder einen DNS‑Server mit geringer Latenz.
1. Speicher: Nutzen Sie den richtigen Storage‑Treiber (`overlay2` ist wahrscheinlich)

Aktualisiert 2024:

- Docker Desktop ist proprietär, aber für den privaten Gebrauch kostenlos. Es ist ein guter Einstieg, Docker auf OSX oder Windows zu verwenden.
- Wenn Sie eine stärker Open‑Source‑Lösung suchen, schauen Sie sich [Rancher Desktop](https://rancherdesktop.io/) an.
````
