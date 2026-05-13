# Translation Candidate
- Slug: docker-makes-everything-better
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-03-12--docker-makes-everything-better/de/index.mdx
- Validation: passed
- Runtime seconds: 6.21
- Input tokens: 1866
- Output tokens: 2441
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.000735
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker === Liebe
subTitle: Docker kann alles tun!
date: '2015-02-26'
modified: '2024-07-30'
category: DevOps
subCategory: docker
tags:
  - docker
  - devops
  - patterns
related:
  - docker-server-setup-notes
  - docker-rocks
  - docker-security-tips-for-self-hosting
cover: ../guillaume-bolduc-259596-unsplash.webp
cover_mobile: ../w300_guillaume-bolduc-259596-unsplash.webp
cover_icon: ../icon_guillaume-bolduc-259596-unsplash.webp
---
## Docker kann alles tun!\*  

> Historische Anmerkung: Dies ist ein 2015er Schnappschuss der Docker-Begeisterung und lokalen Entwicklungspraxis, hauptsächlich als Zeitkapsel erhalten geblieben. Behandeln Sie Befehle und Sicherheitsstandards als Ausgangspunkt für Modernisierungen, nicht als Produktivumgebungsempfehlung.  

Verbessern Sie Ihren Prozess für:  

1. Testen von Entwicklungs-Tools & Servern MIT FAST NULL Risiko, Abhängigkeiten auf Ihrem PC zu zerstören  
1. Testen Ihrer Software  
1. Erzwingt, dass Sie idempotenteren, modularen Code schreiben... (Ich werde schreiben, wie man das tatsächlich umsetzt, in einem Folgebeitrag)  

Es mag wie eine große Menge an neuem Material erscheinen, das zu lernen – **lassen Sie sich davon nicht abhalten**, loszulegen.  

### Notizen

- Wenn Sie einen `docker run`-Befehl mit den Optionen `-d` oder `-it` sehen:  
  _ `-it` oder `-i -t` führt den konfigurierten Befehl interaktiv aus  
  _ `-d` startet den Docker-Container als 'Daemon' bzw. Hintergrunddienst.  

---

### BEISPIELE

### nginx

```bash
# Hinweis: Host-basierte, geteilte Ordner verwenden  
# (geteilte Ordner sind mit dem Dockerfile-Befehl VOLUME nicht möglich)  
sudo docker run --name web01 -d -p 8181:80 \  
  -v $(NGINX_DIR)/etc:/etc/nginx \  
  -v $(NGINX_DIR)/log:/var/log/nginx \  
  -v $(NGINX_DIR)/www:/var/www/html \  
  nginx:latest  

## Lokale Daten, isoliert innerhalb der Instanz  
sudo docker run --name web01 -d -p 8181:80 nginx:latest  

# nodejs  
sudo docker run --name nodejs01 -d -p 3300:3300 -p 4433:4433 nodejs:latest  
```

> Quelle: [https://dockerfile.github.io/#/nginx](https://dockerfile.github.io/#/nginx)  
> Docker wird Ihr Leben während der _gesamten_ SDLC vereinfachen.  

> - Ziemlich nahe dran
````
