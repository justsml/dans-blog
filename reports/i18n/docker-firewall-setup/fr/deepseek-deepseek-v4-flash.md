# Translation Candidate
- Slug: docker-firewall-setup
- Locale: fr
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2015-06-06--docker-firewall-setup/fr/index.mdx
- Validation: deferred
- Runtime seconds: 29.16
- Input tokens: 3596
- Output tokens: 2933
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.001325
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Configuration du pare-feu Docker
subTitle: Configurer le pare-feu d'un hôte Docker
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
## Configuration du pare-feu du serveur Docker

1. Serveur Debian/Ubuntu supposé
1. Conçu pour fonctionner sur un serveur Docker

### Installer les prérequis

~~~sh
# Pare-feu ultime nécessaire
apt-get update && apt-get install -y ufw nmap curl
~~~

### Récupérer vos adresses IP interne et externe

~~~sh
# Obtenir vos adresses IP, sortie simple :
hostname --all-ip-addresses

# OU utiliser l'outil ip, exemple :
ip addr
~~~

### Configuration du pare-feu (UFW) - Exemples de commandes

~~~sh
ufw logging on # on=low - medium peut être mieux pour le diagnostic
ufw logging medium
# D'abord, bloquer tout
ufw default deny incoming

# OBLIGATOIRE : CHOISIR *UNE* DES RÈGLES DE SORTIE PAR DÉFAUT SUIVANTES :
ufw default deny outgoing
ufw default allow outgoing

# Autoriser et journaliser toutes les nouvelles connexions SSH,
ufw allow log proto tcp from any to any port 22
## Autoriser le trafic HTTP (sans journalisation explicite)
ufw allow out on docker0 53/udp to 172.17.0.1/16
ufw allow out on eth0 to any port 53
ufw allow out on eth0 from 0.0.0.0/0 to any port 80 proto tcp
ufw allow out on eth0 from 0.0.0.0/0 to any port 443 proto tcp

# Verbeux : ufw allow proto tcp from any to any port 80
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow log 22/tcp
ufw limit ssh # Limitation de débit basique 4 pour atténuer le brute force SSH
~~~

--- CHUNK START ---
# Définir votre IP externe
export EXTERNAL_IP=123.123.123.123
# Mettre à jour l'IP Docker si nécessaire
export DOCKER_IP=172.17.42.1
# Rediriger le trafic tcp 8080 vers l'application Dockerisée
ufw allow proto tcp from $EXTERNAL_IP port 8080 to $DOCKER_IP port 3000
~~~

## Activer / Démarrer le pare-feu

> Attention, ne bloquez pas votre port SSH (sshd par défaut sur le port 22)

~~~sh
ufw --force enable

ufw reset
~~~

-----------------
--- CHUNK END ---

### Tester votre pare-feu

> Important : UTILISEZ UNE ADRESSE IP / UN EMPLACEMENT DISTANT

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
# Inspection des services
nmap -p 1-10240,27017 -O --osscan-guess $TARGET_HOST
~~~

> TERMINÉ ! Vous devriez maintenant voir UNIQUEMENT les ports que vous avez configurés !
````
