# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: fr
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 32.63
- Input tokens: 26572
- Output tokens: 10126
- Thinking tokens: unknown
- Cached input tokens: 7424
- Cache write tokens: 0
- Estimated cost: $0.002859
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale fr
## Raw Output

````mdx
---
title: Conseils essentiels de sécurité Docker pour l’auto‑hébergement
subTitle: 'Sécurisez vos services auto‑hébergés, de la défense à la surveillance !'
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

**Table of Contents**

- 🧗‍♀️ [Pour les courageux](#️-for-the-brave)
- 🔄 [La danse du `:latest`](#-the-latest-dance)
- 🔐 [Gestion des secrets : la bonne façon](#-secrets-management)
- 🌐 [Danger réseau](#-network-hazard)
- 🛡️ [Contrôles d’accès](#️-access-controls)
- 🔍 [Surveillance & vérification](#-monitoring--verification)
- ⏰ [Astuces souvent négligées](#-often-overlooked-tips)
- 🚀 [Checklist de production](#-production-checklist)
- 📚 [Lectures complémentaires](#-further-reading)

## 🧗‍♀️ Pour les courageux

Si vous auto‑hébergez des services Docker, la sécurité est entièrement de votre ressort, du haut du stack jusqu’en bas — aucun fournisseur de cloud ne viendra vous protéger des scans de ports ou d’une configuration bâclée. Que vous déployiez des applications sur votre réseau domestique ou que vous louiez des VPS chez des fournisseurs comme Vultr, DigitalOcean, Linode, AWS, Azure ou Google Cloud, vous devrez verrouiller le tout — et vérifier que vous l’avez fait correctement.

Dans ce guide, nous passerons en revue la sécurité Docker : des techniques « moins connues » aux approches « difficiles à bien faire ». Nous explorerons les jetons canari, les volumes en lecture seule, les règles de pare‑feu, la segmentation et le renforcement du réseau, l’ajout de proxys authentifiés, et bien plus encore.

Nous comparerons également les réseaux domestiques aux environnements de cloud public et nous vous montrerons comment configurer un proxy d’authentification basique avec Nginx. À la fin, vous disposerez de plusieurs options pour tenir à distance les indésirables (amis, famille, et parfois même vous‑même…).

C’est un sacré paquet ! Mais la plupart des éléments sont interconnectés, et vous pouvez choisir ce qui correspond le mieux à votre infrastructure. 🍀

## 🔄 Le « dance » `:latest`

Maintenir les images à jour est essentiel pour la sécurité. Cependant, s’appuyer sur `:latest` peut introduire des changements incompatibles ou des builds vulnérables sans aucune étape de révision.

### La méthode sûre pour mettre à jour

Combinez les commandes de mise à jour avec `pull` ou `build` afin de rafraîchir les images de façon intentionnelle, puis redémarrez pendant une fenêtre où vous pouvez détecter d’éventuelles régressions.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Version Pinning vs Latest

Choisir la bonne version à épingler est un compromis entre stabilité et sécurité. Voici quelques stratégies courantes :

```yaml
# docker-compose.yml
# ...
  # Épinglage de version exacte, idéal pour les services critiques
  image: postgres:17.2

  # Épinglage de version de correctif, convenable pour les services non critiques
  image: postgres:17.2

  # Épinglage de version majeure, parfait pour les projets hobby
  image: postgres:17

  # Yolo, à éviter si possible
  image: postgres:latest
```

Utilisez [Dependabot](https://github.com/features/security) ou [Renovate](https://github.com/renovatebot/renovate) pour ouvrir des PR de mise à jour révisables. Pour tout ce que vous ne voudriez pas reconstruire à 2 h du matin, épinglez à une version ou un digest spécifique et laissez l’automatisation vous indiquer quand migrer.

_Faites‑moi part de vos outils préférés pour garder les images Docker à jour !_

## 🔐 Gestion des secrets

- [Générer des secrets forts](#generate-strong-secrets)
- [Jetons Canary](#canary-tokens)
- [Passer de `.env` au trousseau macOS](#upgrade-from-env-to-macos-keychain)
{/* - [Validation de placeholders](#placeholder-validation) */}

Il existe de nombreuses façons de gérer les secrets, mais l’une des règles les plus importantes à respecter est : **ne jamais coder en dur des secrets dans vos images Docker ni les valider dans git**. C’est l’une des erreurs de sécurité les plus fréquentes, cela crée un risque à long terme et c’est pénible à corriger.

Le stockage sécurisé des secrets est un sujet conséquent avec de multiples options, des fichiers `.env`, [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), ou un gestionnaire de secrets comme [HashiCorp Vault](https://www.vaultproject.io/) ou AWS Secrets Manager.

Vous devrez choisir le niveau d’effort et de sécurité « approprié » pour votre cas d’usage.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Validation des placeholders

<blockquote>Vous ne croiriez pas à quel point il est facile de pirater un token JWT quand le secret n’est pas secret !</blockquote>
*/}

<p className='inset'>💡 Assurez‑vous que les secrets sont toujours uniques. Essayez de rendre impossible l’exécution avec des valeurs par défaut non sécurisées ou codées en dur.</p>

Si vous utilisez des espaces réservés comme `__WARNING_REPLACE_ME__` dans vos secrets, tant mieux, peut‑être que quelqu’un les remarquera !

Au cas où, vous pouvez également ajouter une petite sécurité d’exécution avec peu d’effort. Voici comment le faire en JavaScript, Rust et Go :

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

```javascript
// validateSecrets.js
const validateSecrets = () => {
  const unsafePlaceholder = /__WARNING_REPLACE_ME__/;
  const missingSecrets = Object.entries(process.env).filter(
    ([key, value]) => unsafePlaceholder.test(value)
  );

  if (missingSecrets.length) {
    console.error("Unsafe secrets detected:", missingSecrets);
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
            panic!("Unsafe secret in {}", key);
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
			panic(fmt.Sprintf("Unsafe secret in %s", pair[0]))
		}
	}
}

func main() {
	validateSecrets()
}
```
</CodeTabs>

*/}

### Générer des secrets forts

Voici un petit script pour générer de nouveaux secrets dans un fichier `.env` :

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

### Jetons Canary

[**Canary Tokens**](https://canarytokens.org/) sont un excellent moyen de détecter si vos secrets ont été compromis (et exploités). Ils fonctionnent comme un fil de déclenchement que vous pouvez ajouter à n’importe quel fichier sensible, URL ou jeton.

Envisagez de les placer à côté des secrets qui vous préoccupent réellement : fichiers `.env`, variables CI, gestionnaires de mots de passe, dossiers de sauvegarde et identifiants cloud. Ne transformez pas cela en spectacle ; positionnez les fil de déclenchement là où un véritable attaquant ou votre futur vous-même les toucherait.

Il existe de nombreux types de « jetons » canary à choisir, des jetons AWS, des numéros de [fausses cartes de crédit](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), des fichiers Excel et Word, des fichiers Kubeconfig, des identifiants VPN, voire des dumps SQL pouvant servir de fil de déclenchement !

#### Bonnes pratiques pour les jetons Canary

- **Placez partout** : dans chaque fichier `.env`, pipeline CI/CD et « gestionnaire de secrets » auquel vous pensez.
  - Déposez un fichier `passwords.xlsx` ou `passwords.docx` dans votre répertoire personnel.
  - Ajoutez un profil AWS `billing_prod` contenant un jeton canary comme secret.
  - Générez un fichier `private.key` pour votre répertoire `~/.ssh`.
  - Créez un dump SQL Canary `all_credit_cards.sql` dans votre répertoire `~/backups`.
- **Surveillez** : configurez des règles ou alertes email pour détecter quand un jeton canary est déclenché.

### Passage de `.env` à Keychain macOS

Pour les utilisateurs macOS, l’une des options les plus simples est d’utiliser le Trousseau d’accès.

Voici une méthode basique pour automatiser le chargement des secrets depuis le trousseau macOS, compatible Touch ID, et légèrement plus sûre que les fichiers `.env`.

Le crédit original revient à <cite> [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) et [Jan Schaumann](https://www.netmeister.org/)</cite>

<CodeTabs client:load tabs={[
  "Helper commands",
  "Persist secrets in environment",
  "Use secrets per command"]
}>
```bash title="keychain-secrets.sh"
### Fonctions pour définir et récupérer des variables d'environnement depuis le trousseau macOS ###
### Adapté de : https://www.netmeister.org/blog/keychain-passwords.html et 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# Utilisation : get-keychain-secret VARIABLE_ENV
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Utilisation : set-keychain-secret VARIABLE_ENV
# Vous serez invité à saisir la valeur du secret !
function set-keychain-secret () {
    [ -n "$1" ] || print "Missing environment variable name"
    
    # demander le secret à l'utilisateur
    echo -n "Enter secret for ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Charger les variables d'environnement dans le shell actuel
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Note : si un attaquant peut exécuter `env` dans votre shell, ces secrets pourraient être exposés !
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Spécifier tous les secrets pour ce projet
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Note : un wrapper shell aide à empêcher les secrets de rester
# dans l'environnement. Et il est sûr de le versionner.

# Utilisation :
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY …
```
</CodeTabs>

## 🌐 Risque réseau

### Réseaux personnalisés et ports internes

Isoler correctement les services avec les réseaux Docker est un moyen essentiel de réduire votre surface d’attaque.

Soyez prudent en perçant des trous dans votre réseau ! Un seul transfert de port mal configuré peut avoir de graves conséquences.

Par défaut, les services sur un LAN privé ne sont pas exposés à Internet — vous devez explicitement rediriger les ports depuis votre routeur.

### Docker sur LAN

Que vous soyez développeur lançant des serveurs de dev en local, ou que vous auto‑hébergiez des services depuis votre réseau domestique, **des hypothèses sur le modèle réseau de Docker peuvent entraîner des problèmes.**

Les développeurs sont souvent surpris de constater que les méthodes « traditionnelles » pour sécuriser les serveurs Linux (`iptables`, restriction des options sysctl tcp/ip) peuvent **échouer silencieusement** sur des hôtes Docker ! C’est particulièrement le cas lorsqu’on **auto‑héberge ou qu’on fonctionne sur un réseau domestique typique**. (Pour les sceptiques : cela peut permettre d’accéder aux conteneurs de dev sur votre MacBook !!!)

> ⚠️ **Avertissement #1 :** Les ports publiés par Docker peuvent contourner les règles de pare‑feu que vous pensiez protéger l’hôte, notamment avec UFW sur Ubuntu/Debian. Cela ne rend pas chaque règle de pare‑feu inutile, mais cela signifie que « UFW dit deny » n’est pas une preuve. [Voir l’incident #690 : Docker contourne les règles ufw](https://github.com/moby/moby/issues/690).

> ⚠️ **Avertissement #2 :** Lier les ports à des adresses IP locales (par ex. `-p 127.0.0.1:8080:80`) est le bon comportement par défaut, mais les versions du moteur Docker antérieures à 28.0.0 comportaient des cas où des hôtes sur le même réseau L2 pouvaient encore atteindre les ports publiés sur localhost. [Docker documente cette mise en garde dans son guide de publication de ports](https://docs.docker.com/engine/network/port-publishing/), et l’habitude de vérifier avec nmap ci‑dessous reste pertinente.

<p class="inset">Si vous êtes surpris d’apprendre cela, vous n’êtes pas seul !</p>

**Lier aux IP locales reste une bonne pratique** et a un impact réel dans **les environnements cloud gérés et les réseaux spécialement configurés**. 
{/* Ne considérez pas votre pare‑feu ou votre réseau privé comme votre principale ou unique défense, ajoutez les réseaux Docker au mix pour une meilleure **isolation**, et demandez‑vous toujours si vous avez réellement besoin d’exposer des ports. */}

### Exemple Docker Compose

Voici un fichier `docker-compose.yml` d’exemple qui lie le service `app` à `127.0.0.1:8080` et connecte les deux conteneurs au réseau personnalisé `backend`.

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # Bind to localhost if possible
      - "127.0.0.1:8080:8080"
    # ... other settings
  database:
    image: postgres:17.1
    # No ports needed; accessible inside backend network.
    networks:
      - backend

```

{/* #### Test & Verify

As with all security measures, it's critical that you **test and verify** your network setup. */}

{/* While network security & auditing is a full-time responsibility in most companies, most self-host folks don't spend ANY time on it! */}

{/* Look, I get it, it can be intimidating. _(Subnets, net masks, CIDR, VLANs, and routing tables, oh my! If that made no sense, that's ok, you're in the right place. Also, we don't need to worry about any of that for now.)_ */}

### Bonnes pratiques réseau

- 🏆 **Ne publiez AUCUN port** Récemment, j’ai découvert que c’est plus utile que vous ne le pensez ! Avec un réseau nommé (bridge), les conteneurs ont un accès non filtré les uns aux autres. Ils se comportent comme s’ils étaient derrière un réseau local (passerelle NAT).
  - Même si ce n’est pas possible dans tous les cas d’usage, cela peut être pratique pour des conteneurs exécutant des jobs batch, ou principalement accédés via `attach` ou `exec`.
- 🥇 **Utilisez les réseaux Docker** pour isoler et contrôler quels conteneurs peuvent communiquer entre eux.
- 🥉 **Utilisez la liaison localhost** : bien que [imparfaite](https://github.com/moby/moby/issues/45610), il est généralement préférable de lier les ports à une adresse de boucle locale (par ex. `127.0.0.1:8080:80`). Assurez‑vous simplement de [vérifier votre configuration.](#-monitoring--verification)

## 🛡️ Contrôles d’accès

Les contrôles d’accès sont une partie cruciale de la sécurisation de vos services Docker. Cela inclut la limitation des capacités et permissions des conteneurs, la restriction d’accès au socket Docker, etc.

- [Limitation des capacités des conteneurs](#limiting-container-capabilities)
- [Accès au socket Docker](#docker-socket-access)
- [Blocage par pays !](#blocking-country)
- [Renforcement du proxy CloudFlare](#hardening-cloudflare-proxy-host)

### Limitation des capacités des conteneurs

Une autre pratique solide de contrôle d’accès consiste à limiter les capacités de vos conteneurs. Cela réduit le rayon d’impact de plusieurs menaces, de l’escalade de privilèges au détournement de trafic. Ce n’est pas un champ de force, mais cela retire des permissions que la plupart des conteneurs n’ont jamais besoin d’avoir.

**Qu’est‑ce que les capacités ?** Permissions ou habilités nommées définies par le noyau Linux. (La page de manuel [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) en donne la liste complète.) Elles incluent des éléments comme `CAP_CHOWN` (changer le propriétaire d’un fichier), `CAP_NET_ADMIN` (configurer les interfaces réseau), `CAP_KILL` (terminer n’importe quel processus), etc.

Les deux méthodes pour déterminer les capacités nécessaires sont :

1. **Essais et erreurs** : Cette méthode plus lente mais efficace vous fait démarrer sans aucune capacité, puis les ré‑ajouter une par une jusqu’à ce que votre application fonctionne.
2. **Recherche de travaux antérieurs** : Cherchez "`project-name` `cap_drop` Dockerfile" ou "`project-name` `cap_drop` docker‑compose.yml" pour voir si d’autres ont déjà fait le travail. Un LLM peut suggérer un point de départ, mais traitez‑le comme une hypothèse jusqu’à ce que vous testiez le conteneur et lisiez la documentation de l’image.

#### Meilleures pratiques pour les capacités

- **Supprimer toutes les capacités** : utilisez `cap_drop: [ ALL ]` pour retirer toutes les capacités Linux du conteneur.
- **Pas de nouveaux privilèges** : utilisez `security_opt: [ no-new-privileges=true ]` pour empêcher le conteneur d’acquérir de nouveaux privilèges.

```yaml title="Example: Drop/Limit Capabilities" {5-14}
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
    # ... other settings
networks:
  db-network:
```

Vos services peuvent maintenant communiquer entre eux via le réseau `db-network`. Docker Compose créera ce réseau automatiquement.

Utilisez l’option `--external`/`external:` pour rejoindre un **réseau pré‑existant**. Omettez‑la pour créer un nouveau réseau.

### Accès au socket Docker

#### ⚠️ Avertissement : `docker.sock` équivaut pratiquement à un accès administrateur de l’hôte

<blockquote class="inset">⚠️ L’option `:ro` n’affecte pas les E/S transitant par le socket !</blockquote>

Elle ne fait que monter le chemin du socket en lecture‑seule. Les appels d’API envoyés via ce socket peuvent toujours créer des conteneurs, monter des chemins de l’hôte et effectuer d’autres opérations très excitantes que vous n’aviez probablement pas l’intention de déléguer.

{/* Any process that can "open" the socket can (probably) gain root access on the host. */}

#### Meilleure pratique pour le socket

- 🥇 **Évitez de monter le socket Docker**, il existe probablement une meilleure alternative.  
- 🫣 Si vous devez le faire, **placez un proxy étroit devant** et n’autorisez que les points d’accès API réellement nécessaires à l’application. Consultez le projet `docker-socket-proxy` originellement de Tecnativa, [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Puis vérifiez que les appels refusés le sont effectivement.  
- 🤢 D’accord, _peut‑être_ le partager est acceptable dans un environnement de test **très fiable**, **à faible risque**.

#### Blocage par pays !

Parfois utile, mais ce n’est pas une vraie frontière de sécurité.

_En parlant d’entité géopolitique, pas de musique…_

Si vous hébergez des applications principalement pour votre famille et vos amis locaux, vous pouvez bloquer le trafic provenant de pays d’où vous n’attendez aucun accès. Ou n’autoriser que le trafic en provenance des pays que vous attendez. Cela réduit le bruit ; cela n’arrête pas les VPN, les proxys, les botnets ou les acteurs patients.

Consultez ce script pour bloquer tout le trafic en provenance de la Chine :

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

De même, vous pouvez n’autoriser que le trafic en provenance des États‑Unis :

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Renforcement de l’hôte proxy CloudFlare

Si votre serveur domestique est protégé derrière une adresse IP CloudFlare (proxy), vous pouvez restreindre l’accès uniquement aux IP de CloudFlare et à votre réseau local.

C’est un peu similaire au [blocage par pays](#blocking-country) ci‑dessus, mais avec un contrôle beaucoup plus strict.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Bloquer tout le trafic entrant !!!
ufw default allow outgoing # Autoriser tout le trafic sortant
ufw allow ssh # Autoriser SSH

# Autoriser l’accès pour le sous‑réseau local (idéalement un DMZ/VLAN dédié aux services hébergés)
ufw allow from 10.0.0.0/8 to any port 443
```

# Autoriser les IP de CloudFlare
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# Ajouter la prise en charge IPv6
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Pour tester les changements basés sur la géolocalisation, un VPN disposant de points d’accès dans le pays ciblé peut être pratique. Voir davantage dans la section [Monitoring & Verification](#-monitoring--verification).

### Sécurité au niveau de la couche applicative

Une fois que votre [réseau et votre hôte sont renforcés sur le plan de la sécurité,](#-network-hazard) vous constaterez peut‑être qu’il reste du travail.

Il faut maintenant se pencher sur la couche « application » de nos services eux‑mêmes.

<p class="inset">Cette base de données possède‑t‑elle un mot de passe valide ? Ce conteneur automatise‑t‑il HTTPS/certificats ? L’application intègre‑t‑elle une authentification native ? Existe‑t‑il des limites sur les adresses e‑mail pouvant s’inscrire ? Y a‑t‑il des identifiants par défaut ou des variables d’environnement à modifier ?</p>

La seule façon de _savoir_ est de vérifier. Dans ce cas‑ci, commencez par le `README` et les autres fichiers clés comme `docker-compose.yml`, `Dockerfile` et `.env.*`. Faites‑le tant pour le projet que, idéalement, pour les services de support associés. (par ex. Postgres, Redis, etc.)

#### Reverse Proxy

Une couche supplémentaire de défense est l’authentification basique. Ne l’utilisez jamais sans HTTPS. Pour les services hérités, placer une authentification basique devant une route d’administration suffit souvent à bloquer les requêtes opportunistes et les robots non authentifiés qui tenteraient d’accéder directement à la cible.

```nginx

# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}

```

Générer les identifiants :

```bash

htpasswd -c /etc/nginx/.htpasswd admin

```

Avec un proxy à authentification basique, les attaquants doivent franchir un obstacle supplémentaire — nom d’utilisateur et mot de passe—avant d’atteindre votre service interne.

Une autre option consiste à recourir à un service comme [Traefik](https://traefik.io/) ou [Caddy](https://caddyserver.com/) qui peut automatiser HTTPS et l’authentification basique pour vous.

Si vous devez gérer de nombreux domaines et services via une interface graphique, je recommande **[Nginx Proxy Manager](https://nginxproxymanager.com/)**.

## 🔍 Surveillance & Vérification

- [Check Your Ports](../#check-your-ports)
- [View Open Ports](../#view-open-ports)
- [File Monitoring](../#file-monitoring)

C’est l’étape **la plus importante et la plus négligée**. Vous pouvez disposer du meilleur pare‑feu, du meilleur réseau et des meilleures pratiques, mais si vous ne vérifiez pas, vous n’avez aucune idée de leur efficacité.

De plus, connaître quelques commandes — ou savoir où les chercher — peut faire la différence entre prévenir ou subir une intrusion. Le sentiment de se prendre pour un hacker n’est qu’un bonus. (Pour les détails et des exemples, rendez‑vous dans la section [Monitoring & Verification](../#-monitoring--verification).)

<p class="inset">Ne faites pas confiance, vérifiez deux fois</p>

### Vérifiez vos ports

<p class="inset">⚠️ IMPORTANT : Ne scannez pas de machines qui ne vous appartiennent pas.</p>

Que vous soyez sur un réseau domestique ou un VPS, vous devez savoir quels ports sont exposés au monde.

Il y a 2 approches :

- Interroger le réseau (`nmap`, `masscan`)
- Interroger le système d’exploitation (`lsof`, `netstat`, `ss`)

#### Tester depuis l’extérieur de votre réseau

Vous avez besoin de votre adresse IP publique actuelle, que vous pouvez obtenir facilement avec des services comme `ifconfig.me` : `curl https://ifconfig.me`. Vous pouvez aussi la retrouver dans le tableau de bord de votre hébergeur.

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

Une fois que vous avez votre IP publique, il faut **se connecter depuis un réseau externe**. Vous pouvez utiliser l’ordinateur d’un ami, un téléphone/point d’accès 5G, ou un serveur dédié.

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# Note : assurez‑vous que `target_host` correspond à l’IP souhaitée

# Scanner des ports spécifiques :
nmap -A -p 80,443,8080 --open --reason $target_host
# Top 100 ports :
nmap -A --top-ports 100 --open --reason $target_host
# Tous les ports
nmap -A -p1-65535 --open --reason $target_host
```

```

#### Tester dans votre réseau

Pratiquez avec `nmap`, scannez votre réseau local ou l’un de vos serveurs, vérifiez votre routeur, imprimante, réfrigérateur intelligent.

{/* Bien que les analyses de ports soient une réalité constante, elles peuvent constituer une violation du CFAA (Computer Fraud and Abuse Act) aux États‑Unis. Donc, ne scannez que ce qui vous appartient. */}

#### Exemples de commandes de scan

```bash

# Scannez votre localhost pour tous les ports ouverts
nmap -sT localhost

# Scannez l’IP privée de votre machine pour les services
nmap -sV 192.168.1.10

# Trouvez les détails des services sur votre réseau
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# Ou sur un docker 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="Analyse nmap" frame="terminal"
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

### Voir les ports ouverts

Familiarisez‑vous avec `lsof` – il est disponible sur macOS et Linux. Il montre l’état granulaire du réseau et l’activité disque.

```bash title="Commandes lsof"
# Surveiller un port spécifique
sudo lsof -i:80 -Pn
```

# Surveiller les connexions ESTABLISHED
sudo lsof -i -Pn | grep ESTABLISHED
# Voir les sockets LISTEN
sudo lsof -i -Pn | grep LISTEN

# Pour afficher les noms réseau au lieu des adresses IP (les résolutions DNS inverses peuvent être très lentes)
sudo lsof -i -P | grep LISTEN

# Surveiller toutes les connexions réseau
sudo watch -n1 "lsof -i -Pn"

```

#### Exemple de sortie

![nmap scan for listeners](../lsof-scan-listen.webp)

### Surveillance des fichiers

Pour identifier quels **processus** consomment le plus de **bande passante disque**, utilisez `iotop` :

```bash
sudo iotop
```

Pour observer les changements de fichiers individuellement, servez‑vous de `inotifywait` sous Linux ou de `fswatch` sous macOS :

Cela permet de repérer un comportement non autorisé ou anormal, que ce soit par répertoire ou à l’échelle du système.

```bash
# Surveiller tous les changements de fichiers dans un répertoire
sudo inotifywait -m /path/to/directory
```

Sous macOS, utilisez `fswatch` :

Installez‑le avec `brew install fswatch`

```bash
fswatch -r /path/to/directory
```

```

## ⏰ Astuces souvent négligées

1. **Limitation du débit** pour les tentatives d’authentification et tout autre point d’entrée critique. Que ce soit via le module `limit_req` de Nginx ou `fail2ban` pour l’accès SSH, réduire la vitesse des attaques par force‑brute est _probablement_ une bonne idée. Je dis _probablement_ parce qu’à l’ère d’IPv6 et des botnets à bas coût, ce n’est plus ce que c’était.

2. **Utiliser des volumes en lecture‑seule** quand c’est possible :
   ```yaml

services:
     webapp:
       volumes:
         - ./config:/config:ro

```
   Combiné avec d’autres bonnes pratiques (utilisateurs non‑root, permissions de dossiers minimales), l’option de montage `:ro` ajoute une couche de protection contre les modifications accidentelles et certaines tentatives d’écriture depuis l’intérieur du conteneur. Cela ne protège pas l’hôte d’un processus qui possède déjà des privilèges plus étendus.

3. **Auditer régulièrement l’accès aux conteneurs**.  
   Si un conteneur n’a pas besoin d’un secret, d’un port ou d’un montage, supprimez‑le !

4. **Méfiance vis‑à‑vis du Wi‑Fi douteux**  
   Vous ne donneriez jamais votre mot de passe Wi‑Fi à n’importe qui, n’est‑ce pas ? Sauf peut‑être à quelques amis… voire à la famille. On ne sait jamais quelles applications ils utilisent et lesquelles pourraient diffuser votre SSID et votre mot de passe au grand public.

### Réseau domestique vs. fournisseur public vs. tunneling

1. **Isolation virtuelle/DMZ** : pour les serveurs maison, placez‑les sur un VLAN ou une DMZ séparée si possible. Cela empêche vos appareils internes d’être accessibles depuis un serveur potentiellement compromis.  
   - Utilisez un routeur ou un VLAN dédié pour votre serveur domestique.  
   - Utilisez un réseau Wi‑Fi distinct pour votre serveur domestique.  
   - Utilisez un sous‑réseau séparé pour votre serveur domestique.

2. **Fournisseurs Cloud** : Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure et Google Cloud proposent chacun des fonctionnalités de pare‑feu différentes.  
   - Certains fournisseurs et services bloquent les ports par défaut. D’autres offrent des options d’activation ou des modules complémentaires. Consultez la documentation de votre prestataire.  
   - De nombreux fournisseurs proposent des services avancés de surveillance et de détection des menaces.

3. **VPN et Tunneling** : Envisagez une solution de type VPN ou un service de tunnel pour connecter vos services de façon sécurisée à travers Internet sans les exposer publiquement.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.

{/* 3. **Hardening Against Internal/Lateral Attacks**: One infected device can compromise an entire network. Segmenting Docker services on custom networks, using hardware, UFW rules, and blocking unneeded ports can all help reduce risk (when properly configured.) */}

## 🚀 Checklist de Production

- [ ] **Secrets** : Tous les secrets sont générés aléatoirement et stockés de façon sécurisée.  
- [ ] **Mises à jour** : Stratégie de mise à jour des conteneurs documentée et automatisée. (Ça suffit même si ce n’est que quelques commandes dans un fichier texte.)  
- [ ] **Réseau** : Seuls les ports nécessaires sont exposés, les réseaux internes sont configurés.  
- [ ] **Règles de pare‑feu** : Refus par défaut, autorisations explicites, blocage de pays si besoin.  
- [ ] **Reverse Proxy** : Nginx, Caddy ou Traefik peuvent ajouter une authentification basique.  
- [ ] **Canary Tokens** : Placez‑les près des fichiers sensibles et des identifiants que vous inspecteriez réellement en cas de compromission.  
- [ ] **Surveillance** : Connaissez vos systèmes avec `nmap`, `lsof`, `inotifywait`, `glances`, etc.  
- [ ] **Stratégie de sauvegarde** : Testée, de préférence automatisée, et hors site.  
- [ ] **Moindre privilège** : Utilisateurs non root dans les conteneurs, volumes en lecture‑seule.

## 📚 Lectures complémentaires

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org for Canary Tokens](https://canarytokens.org/)

## Remerciements

Un clin d’œil à quelques Redditors perspicaces :

- <em className="cite">[u/JCBBird1012](https://www.reddit.com/user/JCBird1012/) – [discussion](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

Merci d’avoir lu ! J’espère que ce guide vous a été utile. Si vous avez des questions ou des suggestions, contactez‑moi via mes réseaux sociaux ci‑dessous, ou cliquez sur le lien `Edit on GitHub` pour ouvrir une PR ! ❤️
````
