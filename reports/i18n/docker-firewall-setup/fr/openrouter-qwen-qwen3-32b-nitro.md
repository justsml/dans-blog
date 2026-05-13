# Translation Candidate
- Slug: docker-firewall-setup
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-06-06--docker-firewall-setup/fr/index.mdx
- Validation: passed
- Runtime seconds: 7.17
- Input tokens: 3650
- Output tokens: 3107
- Thinking tokens: unknown
- Cached input tokens: 512
- Cache write tokens: 0
- Estimated cost: $0.001038
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Configuration du pare-feu Docker
subTitle: ''
draft: true
date: '2015-06-06'
modified: '2016-07-30'
category: DevOps
subCategory: docker
tags:
  - docker
  - security
  - devops
cover: ../charles-deluvio-456501-unsplash.webp
cover_mobile: ../w300_charles-deluvio-456501-unsplash.webp
cover_icon: ../icon_charles-deluvio-456501-unsplash.webp
---
## Configuration du pare-feu de l'hôte Docker

1. Serveur Debian/Ubuntu supposé
1. Conçu pour s'exécuter sur un serveur hôte Docker

### Installation des dépendances

~~~sh
# Pare-feu ultime nécessaire
apt-get update && apt-get install -y ufw nmap curl
~~~

### Récupération de vos adresses IP internes et externes

~~~sh
# Récupérez vos adresses IP, affichage simple :
hostname --all-ip-addresses
~~~

# OU utilisez l'outil ip, exemple :
ip addr
~~~

### Configuration du pare-feu (UFW) - Exemples de commandes

~~~sh
ufw logging on # on=low - medium might be better for diagnostics
ufw logging medium
# Tout d'abord, bloquez tout
ufw default deny incoming

# REQUIS : CHOISISSEZ *UN SEUL* DES RÈGLES DE SORTIE PAR DÉFAUT SUIVANTS :
ufw default deny outgoing
ufw default allow outgoing

# Autorisez et enregistrez toutes les nouvelles connexions SSH,
ufw allow log proto tcp from any to any port 22
## Autorisez le trafic HTTP (sans journalisation explicite)
ufw allow out on docker0 53/udp to 172.17.0.1/16
ufw allow out on eth0 to any port 53
ufw allow out on eth0 from 0.0.0.0/0 to any port 80 proto tcp
ufw allow out on eth0 from 0.0.0.0/0 to any port 443 proto tcp

# Verbeux : ufw allow proto tcp from any to any port 80
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow log 22/tcp
ufw limit ssh # Limite de base pour atténuer les attaques par force brute SSH
~~~

# Définir votre IP externe
export EXTERNAL_IP=123.123.123.123
# Mettre à jour l'IP Docker si nécessaire
export DOCKER_IP=172.17.42.1
# Rediriger le trafic TCP 8080 vers l'application Dockerisée
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
~~~

## Activer / Démarrer le pare-feu

> Attention, ne pas bloquer votre port SSH (sshd par défaut à 22)

~~~sh
ufw --force enable

ufw reset
~~~

### Testez votre pare-feu

> Important : UTILISEZ UNE ADRESSE IP/LOCALISATION DISTANTE

~~~sh
# Vérifier la dépendance
apt-get update && apt-get install -y nmap

# Définir la cible du scan
export TARGET_HOST=123.123.123.123

# Exemples de commandes de scan :
# Vérification rapide des ports ouverts
nmap -p 1-10240,27017 -T5 $TARGET_HOST
# Scan approfondi
nmap -p 1-10240,27017 --open -v -APN $TARGET_HOST
# Inspection du service
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
~~~

> TERMINÉ ! Vous ne devriez voir QUE les ports que vous avez configurés !
````
