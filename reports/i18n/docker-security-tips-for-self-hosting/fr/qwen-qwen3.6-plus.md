# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: fr
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.05
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug docker-security-tips-for-self-hosting --locale fr --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
title: Conseils de sécurité Docker essentiels pour l'auto-hébergement
subTitle: 'Sécurisez vos services auto-hébergés, de la défense au monitoring !'
date: '2025-01-04'
modified: '2025-07-09'
tags:
  - docker
  - security
  - devops
  - containers
  - best-practices
category: Security
social_image: ../desktop-social.webp
cover_full_width: ../docker-ukiyo-e-wide.webp
cover_mobile: ../docker-ukiyo-e-container-square-200.webp
cover_icon: ../docker-ukiyo-e-container-square-200.webp
cover_credit: © 2025 Dan Levy
---
import {CodeTabs} from '../../../../../components/CodeTabs';

**Table des matières**

- 🧗‍♀️ [Pour les courageux](#pour-les-courageux)
- 🔄 [La danse des `:latest`](#la-danse-des-latest)
- 🔐 [Gestion des secrets : la bonne méthode](#gestion-des-secrets)
- 🌐 [Risques réseau](#risques-réseau)
- 🛡️ [Contrôles d'accès](#contrôles-daccès)
- 🔍 [Surveillance et vérification](#surveillance-et-vérification)
- ⏰ [Conseils souvent négligés](#conseils-souvent-négligés)
- 🚀 [Checklist production](#checklist-production)
- 📚 [Pour aller plus loin](#pour-aller-plus-loin)

## 🧗‍♀️ Pour les courageux

Si vous hébergez des services Docker, la sécurité est entièrement votre responsabilité - aucun fournisseur de cloud ne vous protège des balayages de ports ou des configurations maladroites. Que vous déployiez des applications sur votre réseau domestique ou que vous louiez des VPS chez Vultr, DigitalOcean, Linode, AWS, Azure ou Google Cloud, vous devrez assurer une sécurisation stricte - et vérifier que vous l'avez correctement mise en œuvre.

Dans ce guide, nous allons explorer la sécurité Docker - de techniques "moins connues" à d'autres "délicates à mettre en œuvre" ; nous aborderons les tokens canaries, les volumes en lecture seule, les règles de pare-feu, la segmentation réseau et le durcissement, l'ajout de proxys authentifiés, et bien plus encore.

Nous comparerons également les réseaux domestiques aux configurations des clouds publics et vous montrerons comment configurer un proxy d'authentification de base avec Nginx. À la fin, vous disposerez de plusieurs options pour repousser les indésirables (amis, famille, et parfois même vous-même...).

C'est une sacrée liste ! Mais bon nombre de ces points s'entrecroisent, et vous pourrez sélectionner ce qui correspond le mieux à votre environnement. 🍀

## 🔄 La danse du `:latest`

Mettre à jour les images est essentiel pour la sécurité. Toutefois, se reposer sur `:latest` peut introduire des changements cassants ou des builds vulnérables sans étape de revue.

### La méthode sécurisée pour mettre à jour

Associez les commandes de mise à jour à `pull` ou `build` pour rafraîchir délibérément les images, puis redémarrez pendant une fenêtre où vous pourrez détecter les ruptures.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Verrouillage de version vs Dernière version

Choisir la bonne version à verrouiller est un équilibre entre stabilité et sécurité. Voici quelques stratégies courantes :

```yaml
# docker-compose.yml
# ...
  # Verrouillage sur la version exacte, idéal pour les services critiques
  image: postgres:17.2

  # Verrouillage sur la version de correction, bon pour les services non critiques
  image: postgres:17.2

  # Verrouillage sur la version majeure, parfait pour les projets personnels
  image: postgres:17

  # Yolo, à éviter si possible
  image: postgres:latest
```

Utilisez [Dependabot](https://github.com/features/security) ou [Renovate](https://github.com/renovatebot/renovate) pour ouvrir des demandes de mise à jour révisables. Pour tout ce que vous regretteriez de reconstruire à 2 heures du matin, verrouillez sur une version ou un digest spécifique et laissez l'automatisation vous indiquer quand il est temps de passer à la suivante.

_Faites-moi savoir les outils que vous préférez pour maintenir vos images Docker à jour._

## 🔐 Gestion des secrets

- [Générer des secrets robustes](#generate-strong-secrets)
- [Canary Tokens](#canary-tokens)
- [Mettre à niveau depuis .env vers le Keychain de macOS](#upgrade-from-env-to-macos-keychain)
{/* - [Placeholder Validation](#placeholder-validation) */}

Il existe de nombreuses façons de gérer les secrets, mais une des règles les plus importantes à respecter est : **ne jamais encoder en dur les secrets dans vos images Docker ou les commettre dans git.** C'est l'une des erreurs de sécurité les plus fréquentes, elle présente un risque à long terme et est difficile à corriger.

Stocker en toute sécurité les secrets est un sujet important avec de nombreuses options, allant des fichiers `.env`, des [secrets Docker](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), ou un gestionnaire de secrets comme [HashiCorp Vault](https://www.vaultproject.io/) ou AWS Secrets Manager.

Vous devrez choisir le bon niveau d'efforts et de sécurité en fonction de votre cas d'utilisation.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Validation des espaces réservés

<blockquote>Vous ne pouvez pas imaginer à quel point il est facile de pirater un jeton JWT lorsque le secret n'est pas secret !</blockquote>

<p className='inset'>💡 Assurez-vous que les secrets sont toujours uniques. Essayez de rendre impossible l'exécution avec des valeurs par défaut non sécurisées ou codées en dur.</p>

Si vous utilisez des espaces réservés comme `__WARNING_REPLACE_ME__` dans vos secrets, c'est déjà un bon début, peut-être que quelqu'un s'en apercevra !

Pour plus de sécurité, vous pouvez aussi ajouter un peu de vérification au moment de l'exécution avec peu d'efforts. Voici comment vous pourriez le faire en JavaScript, Rust et Go :

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

```javascript
// validateSecrets.js
const validateSecrets = () => {
  const unsafePlaceholder = /__WARNING_REPLACE_ME__/;
  const missingSecrets = Object.entries(process.env).filter(
    ([key, value]) => unsafePlaceholder.test(value)
  );

  if (missingSecrets.length) {
    console.error("Secrets non sécurisés détectés :", missingSecrets);
    process.exit(1);
  }
};

validateSecrets();
```

```rust
// validate_secrets.rs
use std::env;

fn validate_secrets() {
    let unsafe_placeholder = "__WARNING_REPLACE_ME__";
    for (key, value) in env::vars() {
        if value.contains(unsafe_placeholder) {
            panic!("Secret non sécurisé dans {}", key);
        }
    }
}

fn main() {
    validate_secrets();
}
```

```go
// validate_secrets.go
package main

import (
	"fmt"
	"os"
	"strings"
)

func validateSecrets() {
	placeholder := "__WARNING_REPLACE_ME__"
	for _, env := range os.Environ() {
		pair := strings.SplitN(env, "=", 2)
		if len(pair) == 2 && strings.Contains(pair[1], placeholder) {
			panic(fmt.Sprintf("Secret non sécurisé dans %s", pair[0]))
		}
	}
}

func main() {
	validateSecrets()
}
```
</CodeTabs>

### Générer des secrets robustes

Voici un petit script pour générer de nouveaux secrets pour un fichier `.env` :

```bash
#!/bin/bash
# generate-secrets.sh

generate_secret() {
    local length=${1:-30}
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}

[ -f .env ] && { echo ".env file already exists!"; exit 1; }

cat > .env << EOL
POSTGRES_PASSWORD=$(generate_secret)
JWT_SECRET=$(generate_secret 64)
SESSION_KEY=$(generate_secret 24)
REDIS_PASSWORD=$(generate_secret 20)
UNSAFE_PLACEHOLDER=__WARNING_REPLACE_RANDOM_TEXT__
EOL

echo "New .env file generated with secure random values!"
```

### Tokens Canary

Les [**Canary Tokens**](https://canarytokens.org/) constituent une excellente méthode pour détecter si vos secrets ont été compromis (et utilisés). Ils fonctionnent comme un fil de détection que vous pouvez ajouter à tout fichier sensible, URL ou jeton.

Placez-les à côté des secrets que vous redoutez réellement : fichiers `.env`, variables CI, gestionnaires de mots de passe, dossiers de sauvegarde et identifiants cloud. Évitez de transformer cela en théâtre : installez des fils de détection là où un attaquant réel ou une erreur de votre futur soi pourrait les toucher.

Il existe de nombreux types de tokens canary à choisir, allant des jetons AWS, des [numéros de carte de crédit fictifs](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), des fichiers Excel et Word, des fichiers Kubeconfig, des identifiants VPN, jusqu'à ce que même des fichiers de vidage SQL puissent contenir un fil de détection !

- **Placez partout** : Dans chaque fichier `.env`, pipeline CI/CD et "gestionnaire de secrets" que vous pouvez imaginer.
  - Placez un fichier `passwords.xlsx` ou `passwords.docx` dans votre répertoire personnel.
  - Ajoutez un profil AWS `billing_prod` avec un token canary en tant que secret.
  - Générez un fichier `private.key` pour votre répertoire `~/.ssh`.
  - Créez une sauvegarde SQL canary `all_credit_cards.sql` dans votre répertoire `~/backups`.
- **Surveillez** : Configurez des règles ou des alertes par e-mail pour détecter quand un token canary est déclenché.

### Migration de `.env` vers le Keychain macOS

Pour les utilisateurs de Mac, l'une des solutions les plus simples est d'utiliser le Keychain.

Voici une méthode simple pour automatiser le chargement des secrets depuis le Keychain macOS, compatible avec `TouchID`, et un peu plus sécurisée que les fichiers `.env`.

L'idée originale <cite>provient de [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) et [Jan Schaumann](https://www.netmeister.org/)</cite>

<CodeTabs client:load tabs={[
  "Commandes d'aide",
  "Persister les secrets dans l'environnement",
  "Utiliser les secrets par commande"
]}>
```bash title="keychain-secrets.sh"
### Fonctions pour définir et obtenir des variables d'environnement depuis le Keychain macOS ###
### Adapté de : https://www.netmeister.org/blog/keychain-passwords.html et 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# Utilisation : get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Utilisation : set-keychain-secret SECRET_ENV_VAR
# Vous serez invité à entrer la valeur du secret !
function set-keychain-secret () {
    [ -n "$1" ] || print "Nom de variable d'environnement manquant"
    
    # Demande à l'utilisateur le secret
    echo -n "Entrez le secret pour ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Charge les variables d'environnement dans le shell courant
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Remarque : Si un attaquant peut exécuter `env` dans votre shell, ces secrets pourraient être exposés !
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Spécifiez tous les secrets pour ce projet
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Remarque : Utiliser un wrapper shell aide à empêcher les secrets de rester
# dans l'environnement. Et il est sécurisé de le commettre.

# Utilisation :
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 Risque réseau

### Réseaux personnalisés et ports internes

Isoler correctement les services avec les réseaux Docker est une méthode importante pour réduire votre surface d'attaque.

Faites attention à faire des ouvertures dans votre réseau ! Une mauvaise configuration d'un port peut très mal se terminer.

Par défaut, les services sur un réseau LAN privé ne seront pas exposés à Internet : vous devez explicitement rediriger les ports depuis votre routeur.

### Docker sur LAN

Que vous soyez un développeur exécutant des serveurs de développement localement ou que vous hébergiez des services depuis votre réseau local, **des hypothèses sur le modèle réseau de Docker peuvent entraîner des problèmes.**

Les développeurs sont souvent surpris de découvrir que les méthodes « traditionnelles » pour sécuriser les serveurs Linux (`iptables`, restriction des options sysctl TCP/IP) peuvent **échouer silencieusement** sur les hôtes Docker ! C'est particulièrement vrai lorsque **vous hébergez vous-même ou que vous exécutez sur un réseau domestique typique.** (Pour ceux qui sont à l'arrière : Cela peut permettre l'accès à vos conteneurs de développement sur votre MacBook !!!)

> ⚠️ **Avertissement #1 :** Les ports publiés par Docker peuvent contourner les règles de pare-feu que vous croyiez protéger l'hôte, notamment avec UFW sur Ubuntu/Debian. Cela ne rend pas toutes les règles de pare-feu inutiles, mais cela signifie que « UFW dit deny » n'est pas une preuve. [Voir l'issue #690 : Docker contourne les règles de pare-feu ufw](https://github.com/moby/moby/issues/690).

> ⚠️ **Avertissement #2 :** Lier des ports à des adresses IP locales (ex. `-p 127.0.0.1:8080:80`) est la bonne approche par défaut, mais les versions de Docker Engine antérieures à 28.0.0 ont eu des cas où les hôtes sur le même réseau L2 pouvaient toujours accéder aux ports publiés sur localhost. [Docker documente cette limitation dans son guide de publication de ports](https://docs.docker.com/engine/network/port-publishing/), et l'habitude de vérifier avec `nmap` ci-dessous reste essentielle.

<p class="inset">Si vous êtes surpris d'apprendre cela, c'est normal !</p>

**Lier à des adresses IP locales reste une bonne pratique** et a un impact significatif dans **les environnements cloud gérés et les réseaux spécialement configurés.**  
{/* Ne considérez pas votre pare-feu ou votre réseau privé comme votre défense principale ou unique, ajoutez des réseaux Docker pour une meilleure **isolation**, et réfléchissez toujours à savoir si vous avez besoin d'exposer des ports. */}

### Exemple Docker Compose

Voici un exemple de fichier `docker-compose.yml` qui lie le service `app` à `127.0.0.1:8080` et connecte les deux conteneurs au réseau personnalisé `backend`.

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # Liez à localhost si possible
      - "127.0.0.1:8080:8080"
    # ... autres paramètres
  database:
    image: postgres:17.1
    # Aucun port nécessaire ; accessible à l'intérieur du réseau backend.
    networks:
      - backend

```

{/* #### Test & Vérification

Comme pour toutes mesures de sécurité, il est crucial de **tester et vérifier** votre configuration réseau. */}

{/* Bien que la sécurité et l'audit réseau soient des responsabilités à temps plein dans la plupart des entreprises, la plupart des utilisateurs auto-hébergés n'y consacrent AUCUN temps ! */}

{/* Écoutez, je comprends, c'est intimidant. _(Sous-réseaux, masques de sous-réseau, CIDR, VLAN, tables de routage, oh mon Dieu ! Si cela n'avait aucun sens, c'est normal, vous êtes au bon endroit. De plus, nous n'avons pas besoin de nous en préoccuper pour l'instant.)_ */}

### Bonnes pratiques réseau

- 🏆 **N'ouvrez AUCUN port** Récemment, j'ai appris que c'était plus utile que vous ne le pensez ! Lors de l'utilisation d'un réseau nommé (bridge), les conteneurs ont un accès non filtré les uns aux autres. Ils se comportent comme s'ils étaient derrière un réseau local (passerelle NAT.)
  - Bien que non applicable dans tous les cas d'utilisation, cela peut être utile pour les conteneurs exécutant des tâches par lots, ou principalement accessibles via `attach` ou `exec`.
- 🥇 **Utilisez les réseaux Docker** pour isoler et contrôler les communications entre conteneurs.
- 🥉 **Utilisez le lien localhost** : Bien qu'[imparfait](https://github.com/moby/moby/issues/45610), il est généralement préférable de lier les ports à une adresse de bouclage (par exemple, `127.0.0.1:8080:80`). Assurez-vous simplement de [vérifier votre configuration.](#-monitoring--verification)

## 🛡️ Contrôles d'accès

Les contrôles d'accès constituent une partie essentielle de la sécurisation de vos services Docker. Cela inclut la limitation des capacités des conteneurs, la restriction de l'accès au socket Docker, et plus encore.

- [Limitation des capacités des conteneurs](#limiting-container-capabilities)
- [Accès au socket Docker](#docker-socket-access)
- [Blocage par pays !](#blocking-country)
- [Renforcement du hôte proxy CloudFlare](#hardening-cloudflare-proxy-host)

### Limitation des capacités des conteneurs

Une autre pratique solide en matière de contrôle d'accès est de limiter les capacités de vos conteneurs. Cela réduit le rayon d'action de plusieurs menaces, allant de l'escalade de privilèges au hijacking du trafic. Ce n'est pas une barrière infranchissable, mais cela supprime des permissions que la plupart des conteneurs n'ont jamais nécessitées.

**Qu'est-ce que les capacités ?** Des permissions ou capacités nommées définies par le noyau Linux. (La page de manuel [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) contient la liste complète.) Elles incluent des choses comme `CAP_CHOWN` (changer le propriétaire d'un fichier), `CAP_NET_ADMIN` (configurer des interfaces réseau), `CAP_KILL` (tuer n'importe quel processus), et bien plus encore.

Les deux méthodes pour déterminer les capacités nécessaires sont :

1. **Essai et erreur** : Cette méthode lente mais efficace consiste à commencer sans aucune capacité, puis à les ajouter une par une jusqu'à ce que votre application fonctionne.
2. **Rechercher un travail antérieur** : Recherchez "`project-name` `cap_drop` Dockerfile", ou "`project-name` `cap_drop` docker-compose.yml" pour voir si d'autres ont déjà effectué ce travail. Un LLM peut suggérer un point de départ, mais traitez cela comme une hypothèse jusqu'à ce que vous testiez le conteneur et lisiez les documents de l'image.

#### Bonnes pratiques pour les capacités

- **Supprimez toutes les capacités** : Utilisez `cap_drop: [ ALL ]` pour supprimer toutes les capacités Linux du conteneur.
- **Pas de nouvelles privilèges** : Utilisez `security_opt: [ no-new-privileges=true ]` pour empêcher le conteneur de gagner de nouveaux privilèges.

```yaml title="Exemple : Suppression/Limitation des capacités" {5-14}
services:
  database:
    image: postgres:17.1
    networks: [ db-network ]
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    cap_add:
      - CHOWN
      - DAC_READ_SEARCH
      - FOWNER
      - SETGID
      - SETUID
  db-admin:
    image: dpage/pgadmin4:4.1
    networks: [ db-network ]
    ports:
      - "8081:80"
    # ... autres paramètres
networks:
  db-network:
```

Vos services peuvent maintenant communiquer entre eux via le réseau `db-network`. Docker Compose créera automatiquement ce réseau.

Utilisez l'option `--external`/`external:` pour rejoindre un **réseau préexistant**. Omettez-la pour en créer un nouveau.

### Accès au socket Docker

#### ⚠️ Avertissement : `docker.sock` équivaut à un accès administrateur hôte

<blockquote class="inset">⚠️ L'option `:ro` n'affecte pas les I/O envoyés via le socket !</blockquote>

Cela ne garantit que le chemin du socket lui-même est monté en lecture seule. Les appels API envoyés via ce socket peuvent toujours créer des conteneurs, monter des chemins d'hôte et effectuer d'autres actions très excitantes que vous n'avez probablement pas eu l'intention de déléguer.

{/* Any process that can "open" the socket can (probably) gain root access on the host. */}

#### Meilleure pratique concernant le socket

- 🥇 **Évitez de monter le socket Docker**, il existe probablement une meilleure alternative.  
- 🫣 Si c'est indispensable, **placez un proxy restreint devant** et autorisez uniquement les endpoints API nécessaires à l'application. Explorez le projet `docker-socket-proxy` initialement développé par Tecnativa, [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Vérifiez ensuite que les appels bloqués sont bien refusés.  
- 🤢 Okay, _peut-être_ que le partager est acceptable dans un environnement de test **à très haute confiance**, **faible risque**.  

#### Blocage par pays !  

Parfois utile, mais pas une véritable frontière de sécurité.  

_On parle de l'entité géopolitique, pas de la musique..._  

Si vous hébergez des applications principalement pour votre famille et vos amis locaux, vous pouvez bloquer le trafic provenant des pays que vous ne prévoyez pas de recevoir. Ou autoriser uniquement le trafic des pays attendus. Cela réduit le bruit ; cela n'arrête pas les VPN, les proxys, les botnets ou les personnes patientes.  

Voici un script pour bloquer tout le trafic provenant de Chine :

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

De même, vous pouvez autoriser uniquement le trafic depuis les États-Unis :

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Sécurisation du proxy CloudFlare

Si votre serveur domestique est protégé derrière une IP CloudFlare (proxy), vous pouvez limiter l'accès aux seules IPs CloudFlare et à votre réseau local.

Cela ressemble un peu au [blocage par pays](#blocking-country) ci-dessus, mais avec un contrôle bien plus précis.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Interdire toutes les connexions entrantes !!!
ufw default allow outgoing # Autoriser toutes les connexions sortantes
ufw allow ssh # Autoriser SSH

# Autoriser l'accès depuis le sous-réseau local (idéalement un DMZ/VLAN dédié aux services hébergés)
ufw allow from 10.0.0.0/8 to any port 443
```

# Autoriser les IPs de CloudFlare
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# Ajouter le support IPv6
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Pour tester les modifications basées sur la géolocalisation, une connexion VPN située dans le pays souhaité peut s'avérer utile. Voir plus en détail dans la section [Surveillance et vérification](#-surveillance-et-vérification).

### Sécurité au niveau de l'application

Une fois que [le réseau et l'hôte sont sécurisés,](#-sécurisation-du-réseau-et-de-l'hôte) vous pourriez constater qu'il reste encore des actions à entreprendre.

Il faut maintenant envisager le niveau « application » de nos propres services.

Cette base de données a-t-elle un mot de passe valide ? Ce conteneur automatisera-t-il HTTPS/certs ? L'application inclut-elle une authentification intégrée ? Y a-t-il des limites sur les adresses e-mail pouvant s'inscrire ? Existe-t-il des identifiants par défaut ou des variables d'environnement à modifier ?

La seule façon de _savoir_ est de vérifier. Dans ce cas, commencez par le `README` et d'autres fichiers clés comme `docker-compose.yml`, `Dockerfile` et `.env.*`. Dans le projet lui-même, et idéalement dans ses services associés également (ex. Postgres, Redis, etc.).

#### Reverse Proxy

Une couche de défense supplémentaire est l'authentification basique. N'oubliez pas d'utiliser HTTPS avec. Pour les services hérités, ajouter une authentification basique devant une route d'administration bloque souvent les requêtes aléatoires et les crawlers non authentifiés qui essaieraient d'interagir directement avec le service.

```nginx
# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}
```

Générez les identifiants :

```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

Avec un proxy d'authentification basique, les attaquants rencontrent un obstacle supplémentaire (nom d'utilisateur et mot de passe) avant d'accéder à votre service interne.

Une autre option est d'utiliser un service comme [Traefik](https://traefik.io/) ou [Caddy](https://caddyserver.com/) qui peuvent automatiser HTTPS et l'authentification basique pour vous.

Si vous souhaitez gérer plusieurs domaines et services avec une interface graphique, je recommande [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 Surveillance et vérification

- [Vérifiez vos ports](#check-your-ports)
- [Affichez les ports ouverts](#view-open-ports)
- [Surveillance des fichiers](#file-monitoring)

C'est **l'étape la plus importante et la plus négligée.** Vous pouvez avoir le meilleur pare-feu, le meilleur réseau et les meilleures pratiques, mais si vous ne vérifiez pas, vous n'avez aucune idée de leur fonctionnement.

De plus, connaître quelques commandes clés – ou savoir où les trouver – peut faire toute la différence pour empêcher une violation. Le sentiment d'être un hacker n'est qu'un bonus. (Pour plus de détails et d'exemples, passez directement à la section [Surveillance et vérification](#-monitoring--verification)). 

<p class="inset">Ne faites pas confiance, vérifiez deux fois</p>

### Vérifiez vos ports

<p class="inset">⚠️ IMPORTANT : Ne scannez pas les hôtes que vous ne possédez pas.</p>

Que vous soyez sur un réseau domestique ou un VPS, vous souhaiterez connaître les ports ouverts au monde entier.

Il existe deux méthodes pour cela :

- Vérifier le réseau (`nmap`, `masscan`)
- Demander au système d'exploitation (`lsof`, `netstat`, `ss`)

#### Tester en dehors de votre réseau

Vous aurez besoin de votre IP publique actuelle, facile à obtenir avec des services comme `ifconfig.me` : `curl https://ifconfig.me`. Ou consultez-la dans le tableau de bord de votre fournisseur d'hébergement.

```bash title="Obtenir l'IP publique"
curl -fsSL https://ifconfig.me
# --> IP PUBLIQUE ACTUELLE
```

Une fois que vous avez votre IP publique, vous devrez **vous connecter à un réseau externe**. Vous pouvez utiliser l'ordinateur d'un ami, un point d'accès 5G, ou un hôte de serveur dédié.

```bash title="nmap Scan Externe"
target_host="$(curl -fsSL https://ifconfig.me)"

# Remarque : Assurez-vous que `target_host` est l'IP souhaitée

# Scanner des ports spécifiques :
nmap -A -p 80,443,8080 --open --reason $target_host
# Top 100 ports :
nmap -A --top-ports 100 --open --reason $target_host
# Tous les ports
nmap -A -p1-65535 --open --reason $target_host
```

#### Test à l'intérieur de votre réseau

Pratiquez l'utilisation de `nmap`, scannez votre réseau local ou l'un de vos serveurs, vérifiez votre routeur, imprimante, réfrigérateur intelligent.

{/* Bien que les scans de ports soient une constante dans la vie courante, cela pourrait constituer une violation du CFAA (Computer Fraud and Abuse Act) aux États-Unis. Donc, ne scannez que les appareils que vous possédez. */}

#### Exemples de commandes de scan

```bash

# Scanner votre localhost pour tous les ports ouverts
nmap -sT localhost

# Scanner l'IP privée de votre machine pour les services
nmap -sV 192.168.1.10

# Découvrir les détails des services sur votre réseau
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# Ou sur un réseau Docker 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="Scan nmap" frame="terminal"
% nmap -A --open --reason 192.168.0.87

Starting Nmap 7.95 ( https://nmap.org ) at 2025-01-06 13:51 MST
Nmap scan report for dev02.local (192.168.0.87)
Host is up, received syn-ack (0.0067s latency).
Not shown: 995 closed tcp ports (conn-refused)
PORT     STATE SERVICE     REASON  VERSION
22/tcp   open  ssh         syn-ack OpenSSH 9.6p1 Ubuntu 3ubuntu13.5 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey:
|_  256 {FINGERPRINT} (ED25519)
80/tcp   open  http        syn-ack Caddy httpd
|_http-server-header: Caddy
|_http-title: Dev02.DanLevy.net
443/tcp  open  ssl/https   syn-ack
|_http-title: Dev02.DanLevy.net
1234/tcp open  http        syn-ack Node.js Express framework
|_http-cors: GET POST PUT DELETE PATCH
|_http-title: Dev02.DanLevy.net (application/json; charset=utf-8).
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 13.36 seconds
```

### Afficher les ports ouverts

Familiarisez-vous avec `lsof` - il est disponible sur MacOS et Linux. Il affiche l'état réseau détaillé et l'activité du disque.

```bash title="Commandes lsof"
# Surveiller un port spécifique
sudo lsof -i:80 -Pn
```

```bash title="lsof Commands"
# Monitor ESTABLISHED connections
sudo lsof -i -Pn | grep ÉTABLIES
# View LISTEN
sudo lsof -i -Pn | grep ECOUTE

# to see network names instead of IP addresses (can be very slow to do reverse DNS lookups)
sudo lsof -i -P | grep ECOUTE

# Monitor all network connections
sudo watch -n1 "lsof -i -Pn"
```

#### Exemple de sortie

![nmap scan for listeners](../lsof-scan-listen.webp)

### Surveillance des fichiers

Pour identifier quels **processus** utilisent le plus de **bande passante du disque dur**, vous pouvez utiliser `iotop` :

```bash
sudo iotop
```

Pour voir les modifications individuelles de fichiers, vous pouvez utiliser `inotifywait` sous Linux ou `fswatch` sous MacOS :

Cela peut être utile pour détecter un comportement non autorisé ou étrange par dossier ou au niveau du système.

```bash
# Surveiller toutes les modifications de fichiers dans un répertoire
sudo inotifywait -m /chemin/vers/le/répertoire
```

Sous MacOS, vous pouvez utiliser `fswatch` :

Installer avec `brew install fswatch`

```bash
fswatch -r /chemin/vers/le/répertoire
```

⏳ Conseils souvent négligés

1. **Limitation de débit** pour les tentatives d'authentification et autres points d'entrée critiques. Qu'il s'agisse du module `limit_req` de Nginx ou de `fail2ban` pour l'accès SSH, limiter les attaques par force brute est _probablement_ une bonne idée. Je dis _probablement_ car à l'ère d'IPv6 et des botnets bon marché, ce n'est plus ce que c'était.

2. **Utiliser des volumes en lecture seule** autant que possible :
   ```yaml
services:
     webapp:
       volumes:
         - ./config:/config:ro
```
   En combinaison avec d'autres bonnes pratiques (utilisateurs non-root, permissions minimales sur les dossiers), l'option `:ro` pour les montages de volumes fournit des protections supplémentaires contre les modifications accidentelles et certaines tentatives d'écriture depuis l'intérieur du conteneur. Cela ne protège pas l'hôte contre un processus déjà doté de privilèges plus étendus.

3. **Auditer régulièrement l'accès aux conteneurs**.
   Si un conteneur n'a pas besoin d'un secret, d'un port ou d'un montage, supprimez-le !

4. **Faites attention aux invités WiFi indésirables**
   Je suis sûr que vous ne dévoileriez jamais votre mot de passe WiFi, surtout pas à des inconnus, n'est-ce pas ? Sauf pour certains amis... Okay, peut-être même pour la famille. On ne sait jamais quels applications ils ont et lesquelles pourraient partager votre SSID & mot de passe avec le monde entier.

### Réseau domestique vs. Fournisseur public vs. Tunneling

1. **Isolement virtuel/DMZ** : Pour les serveurs domestiques, les placer sur un VLAN ou DMZ séparé si possible. Cela empêche les appareils internes d'être compromis depuis le côté serveur.
   - Utiliser un routeur séparé ou un VLAN pour votre serveur domestique.
   - Utiliser un réseau WiFi séparé pour votre serveur domestique.
   - Utiliser un sous-réseau séparé pour votre serveur domestique.

2. **Fournisseurs de cloud** : Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure et Google Cloud offrent tous des fonctionnalités de pare-feu différentes.
   - Certains fournisseurs & services bloquent les ports par défaut. D'autres proposent des options supplémentaires ou des add-ons. Vérifiez la documentation de votre fournisseur.
   - Beaucoup de fournisseurs offrent des services avancés de surveillance et de détection de menaces.

3. **Réseaux privés virtuels & tunnels** : Pensez à utiliser une solution équivalente à un VPN ou un service de tunneling pour connecter en toute sécurité des services à travers internet sans les exposer à l'internet public.
   - TailScale, ngrok, ZeroTier.
   - WireGuard, OpenVPN.

{/* 3. **Renforcement contre les attaques internes/latérales** : Un appareil infecté peut compromettre tout un réseau. Séparer les services Docker sur des réseaux personnalisés, utiliser du matériel, des règles UFW et bloquer les ports inutiles peuvent tous aider à réduire les risques (si correctement configurés.) */}

## 🚀 Liste de vérification pour la production

- [ ] **Secrets** : Tous les secrets générés aléatoirement et stockés en toute sécurité
- [ ] **Mises à jour** : Stratégie de mise à jour des conteneurs documentée et automatisée. (Acceptable si c'est juste quelques commandes dans un fichier texte.)
- [ ] **Réseau** : Seuls les ports nécessaires exposés, réseaux internes configurés.
- [ ] **Règles de pare-feu** : Refus par défaut, autorisations explicites, blocage par pays si nécessaire.
- [ ] **Reverse Proxy** : Nginx, Caddy ou Traefik peuvent ajouter une couche d'authentification basique
- [ ] **Tokens canaries** : Placez-les près des fichiers et des identifiants sensibles que vous investigueriez effectivement s'ils étaient touchés.
- [ ] **Surveillance** : Connaissez vos systèmes avec `nmap`, `lsof`, `inotifywait`, `glances`, etc.
- [ ] **Stratégie de sauvegarde** : Testée, idéalement automatisée, et hors-site.
- [ ] **Privilège minimal** : Utilisateurs de conteneurs non-root, volumes en lecture seule.

## 📚 Pour en savoir plus

- [Meilleures pratiques de sécurité Docker](https://docs.docker.com/develop/security-best-practices/)
- [Feuille de route de sécurité Docker OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [Référentiel CIS Docker](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org pour les canary tokens](https://canarytokens.org/)

## Merci

Un grand merci à certains utilisateurs Reddit attentifs :

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [discussion](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

Merci d'avoir lu ! J'espère que vous avez trouvé ce guide utile. Si vous avez des questions ou des suggestions, n'hésitez pas à me contacter via mes réseaux sociaux ci-dessous, ou cliquez sur le lien `Modifier sur GitHub` pour créer une proposition de modification (PR) ! ❤️
````
