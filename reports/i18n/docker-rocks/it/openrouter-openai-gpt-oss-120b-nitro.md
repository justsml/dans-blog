# Translation Candidate
- Slug: docker-rocks
- Locale: it
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2015-06-11--docker-rocks/it/index.mdx
- Validation: passed
- Runtime seconds: 0.69
- Input tokens: 1785
- Output tokens: 498
- Thinking tokens: unknown
- Cached input tokens: 896
- Cache write tokens: 0
- Estimated cost: $0.000159
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker è fantastico e ora funziona su OSX
subTitle: 'Docker è straordinario, veloce e flessibile'
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
## Docker Rocks

> Aggiornamenti settembre 2016, 2018  
> Boot2Docker è stato sostituito da Docker per Mac

> Nota storica: questo post è conservato intenzionalmente come uno snapshot di Docker-for-Mac del 2015. I consigli sulle prestazioni e i nomi degli strumenti riflettono quel periodo; i workflow attuali di Docker Desktop e Compose sono evoluti.

1. Docker è straordinario, veloce e flessibile.  
2. Gli strumenti precedenti, in particolare boot2docker, erano lenti e soggetti a crash.

Docker può ora essere eseguito nativamente su un kernel Linux v3.4+ – e la VM boot2docker attuale gira su v4.

Uso ottimale del tuo hardware: installa l'ultima versione di Debian o Ubuntu sul tuo Mac/Windows.

... dai, quei giochi non aiutano il tuo codice...

### Controlla la tua configurazione

Esamina l'output del comando `docker info`.

1. Sicurezza: verifica che il server non abbia porte aperte inaspettate (con `nmap` da una rete remota)  
2. DNS: utilizza una cache locale o un server DNS a bassa latenza.  
3. Storage: usa il driver di storage corretto (`overlay2` è probabilmente quello giusto)

Aggiornato 2024:

- Docker Desktop è proprietario, ma gratuito per uso personale. È un ottimo modo per iniziare con Docker su macOS o Windows.  
- Se cerchi una soluzione più open‑source, dai un'occhiata a [Rancher Desktop](https://rancherdesktop.io/).
````
