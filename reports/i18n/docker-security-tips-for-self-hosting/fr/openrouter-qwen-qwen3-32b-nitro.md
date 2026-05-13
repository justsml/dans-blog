# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/fr/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 71.52
- Input tokens: 23865
- Output tokens: 24806
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.007863
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale fr
## Raw Output

````mdx
---
title: Conseils essentiels de sécurité Docker pour l'hébergement en local
subTitle: 'Sécurisez vos services auto-hébergés, de la défense à la surveillance !'
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

- 🧗‍♀️ [Pour les courageux](#️-pour-les-courageux)
- 🔄 [La danse des `:latest`](#-la-danse-des-latest)
- 🔐 [Gestion des secrets : la bonne méthode](#-gestion-des-secrets)
- 🌐 [Risques réseau](#-risques-réseau)
- 🛡️ [Contrôles d'accès](#️-contrôles-daccès)
- 🔍 [Surveillance et vérification](#-surveillance--vérification)
- ⏰ [Conseils souvent négligés](#-conseils-souvent-négligés)
- 🚀 [Checklist production](#-checklist-production)
- 📚 [Pour aller plus loin](#-pour-aller-plus-loin)

## 🧗‍♀️ Pour les courageux

Si vous hébergez vous-même des services Docker, la sécurité est entièrement votre responsabilité - aucun fournisseur de cloud ne vous protège des balayages de ports ou des configurations maladroites. Que vous déployiez des applications sur votre réseau domestique ou que vous louiez des VPS chez des fournisseurs comme Vultr, DigitalOcean, Linode, AWS, Azure ou Google Cloud, vous devrez verrouiller le tout - et vérifier que vous l'avez fait correctement.

Dans ce guide, nous allons explorer la sécurité Docker - de certaines techniques `moins connues` à d'autres `difficiles à mettre en œuvre correctement` ; nous aborderons les tokens canaries, les volumes en lecture seule, les règles de pare-feu, la segmentation réseau et le durcissement, l'ajout de proxys authentifiés, et bien plus encore.

Nous comparerons également les réseaux domestiques aux configurations cloud publiques et vous montrerons comment configurer un proxy d'authentification de base avec Nginx. À la fin, vous disposerez de plusieurs options pour tenir à distance les indésirables (amis, famille, et parfois même vous-même...).

C'est une tonne de choses ! Mais bon nombre d'entre elles sont liées, et vous pouvez sélectionner ce qui est le plus pertinent pour votre configuration. 🍀

## 🔄 La danse de `:latest`

Mettre à jour les images est essentiel pour la sécurité. Cependant, s'appuyer sur `:latest` peut introduire des modifications cassantes ou des builds vulnérables sans étape de revue.

### La méthode sécurisée pour mettre à jour

Combinez les commandes de mise à jour avec `pull` ou `build` pour actualiser délibérément les images, puis redémarrez pendant une fenêtre où vous pouvez détecter les ruptures.

```bash
#!/bin/bash
# mise-à-jour-et-lancement.sh
docker compose pull && \
  docker compose up -d
```

### Pinning de version vs version la plus récente

Choisir la bonne version à fixer est un équilibre entre stabilité et sécurité. Voici quelques stratégies courantes :

```yaml
# docker-compose.yml
# ...
  # Pinning de version exacte, idéal pour les services critiques
  image: postgres:17.2

  # Pinning de version de correction, bon pour les services non critiques
  image: postgres:17.2

  # Pinning de version majeure, parfait pour les projets personnels
  image: postgres:17

  # Yolo, éviter si possible
  image: postgres:latest
```

Utilisez [Dependabot](../github-features-security) ou [Renovate](../renovatebot-renovate) pour ouvrir des demandes de fusion (PR) actualisables. Pour tout ce que vous regretteriez de reconstruire à 2h du matin, fixez une version ou un digest spécifique et laissez l'automatisation vous indiquer quand il est temps de passer à la version suivante.

_Faites-moi savoir quels sont vos outils préférés pour garder vos images Docker à jour._

## 🔐 Gestion des secrets

- [Générer des secrets robustes](#generer-des-secrets-robustes)
- [Canary Tokens](#canary-tokens)
- [Mettre à niveau depuis .env vers le Keychain de MacOS](#mettre-a-niveau-depuis-env-vers-macos-keychain)
{/* - [Validation des espaces réservés](#validation-des-espaces-reserves) */}

Il existe de nombreuses façons de gérer les secrets, mais une des règles les plus importantes à respecter est : **ne jamais encoder en dur les secrets dans vos images Docker ou les commettre dans git.** C'est l'une des erreurs de sécurité les plus courantes, cela présente un risque à long terme et c'est une véritable plaie à corriger.

Le stockage sécurisé des secrets est un sujet important avec de nombreuses options, allant des fichiers `.env`, [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), ou un gestionnaire de secrets comme [HashiCorp Vault](https://www.vaultproject.io/) ou AWS Secrets Manager.

Vous devrez choisir le bon niveau d'efforts et de sécurité en fonction de votre cas d'utilisation.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Validation des espaces réservés

<blockquote>Vous n'imagineriez pas à quel point il est facile de pirater un jeton JWT lorsque le secret n'est pas secret !</blockquote>

<p className='inset'>💡 Assurez-vous que les secrets sont toujours uniques. Essayez de rendre impossible l'exécution avec des valeurs par défaut non sécurisées ou codées en dur.</p>

Si vous utilisez des espaces réservés comme `__WARNING_REPLACE_ME__` dans vos secrets, c'est bien, peut-être que quelqu'un s'en apercevra !

Par précaution, vous pouvez également ajouter une petite vérification en temps d'exécution avec peu d'efforts. Voici comment vous pourriez le faire en JavaScript, Rust et Go :

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

*/}

### Générez des secrets robustes

Voici un petit script pour générer de nouveaux secrets pour un fichier `.env` :

```bash
#!/bin/bash
# generate-secrets.sh

generate_secret() {
    local length=${1:-30}
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}

[ -f .env ] && { echo ".env existe déjà !"; exit 1; }

cat > .env << EOL
POSTGRES_PASSWORD=$(generate_secret)
JWT_SECRET=$(generate_secret 64)
SESSION_KEY=$(generate_secret 24)
REDIS_PASSWORD=$(generate_secret 20)
UNSAFE_PLACEHOLDER=__WARNING_REPLACE_RANDOM_TEXT__
EOL

echo "Nouveau fichier .env généré avec des valeurs aléatoires sécurisées !"
```

### Fils de déclenchement (Canary Tokens)

Les [**Canary Tokens**](https://canarytokens.org/) sont une excellente méthode pour détecter si vos secrets ont été compromis (et utilisés). Ils fonctionnent comme un fil de déclenchement que vous pouvez ajouter à n'importe quel fichier sensible, URL ou jeton.

Placez-les à côté des secrets que vous redoutez réellement : fichiers `.env`, variables CI/CD, gestionnaires de mots de passe, dossiers de sauvegarde, et identifiants cloud. N'en faites pas un spectacle : positionnez les fils de déclenchement là où un attaquant réel ou une erreur de votre futur soi pourrait les toucher.

De nombreux types de "tokens" canary sont disponibles, allant des jetons AWS, des [numéros de carte de crédit fictifs](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), des fichiers Excel et Word, des fichiers Kubeconfig, des identifiants VPN, jusqu'aux fichiers SQL de sauvegarde pouvant intégrer un fil de déclenchement !

#### Bonnes pratiques avec les tokens canary

- **Placez partout** : Dans chaque fichier `.env`, pipeline CI/CD et "gestionnaire de secrets" que vous pouvez imaginer.  
  - Placez un fichier `passwords.xlsx` ou `passwords.docx` dans votre répertoire personnel.  
  - Ajoutez un profil AWS `billing_prod` avec un jeton canary en tant que secret.  
  - Générez un fichier `private.key` pour votre répertoire `~/.ssh`.  
  - Créez une sauvegarde SQL Canary `all_credit_cards.sql` pour votre répertoire `~/backups`.  
- **Surveillez** : Configurez des règles ou alertes par e-mail pour détecter quand un jeton canary est déclenché.  

### Migration de `.env` vers le Keychain macOS  

Pour les utilisateurs de Mac, une des options les plus simples est d'utiliser le Keychain.  

Voici une méthode simple pour automatiser le chargement des secrets depuis le keychain macOS, compatible avec `TouchID`, et un peu plus sécurisée que les fichiers `.env`.  

L'original <cite>va à [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) et [Jan Schaumann](https://www.netmeister.org/)</cite>  

<CodeTabs client:load tabs={[
  "Commandes d'aide",
  "Persister les secrets dans l'environnement",
  "Utiliser les secrets par commande"
]}>
```bash title="keychain-secrets.sh"
### Fonctions pour définir et obtenir des variables d'environnement depuis le keychain macOS ###
### Adapté de : https://www.netmeister.org/blog/keychain-passwords.html et 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# Utilisation : get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Utilisation : set-keychain-secret SECRET_ENV_VAR
# Vous serez invité à entrer la valeur secrète !
function set-keychain-secret () {
    [ -n "$1" ] || print "Nom de variable d'environnement manquant"
    
    # Demander à l'utilisateur le secret
    echo -n "Entrez le secret pour ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Charger les variables d'environnement dans le shell courant
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Remarque : Si un attaquant peut exécuter `env` dans votre shell, ces secrets pourraient être exposés !
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Spécifier tous les secrets pour ce projet
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Remarque : Utiliser un wrapper shell aide à empêcher les secrets de rester
# dans l'environnement. Et il est sécurisé de le valider.

# Utilisation :
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 Danger réseau

### Réseaux personnalisés & Ports internes

Isoler correctement les services avec les réseaux Docker est un moyen important de réduire votre surface d'attaque.

Faites attention à ne pas percer de trous dans votre réseau ! Une mauvaise configuration d'un port en avant peut avoir des conséquences très graves.

Par défaut, les services sur un réseau LAN privé ne sont pas exposés à Internet : vous devez explicitement rediriger les ports depuis votre routeur.

### Docker sur LAN

Que vous soyez un développeur exécutant des serveurs de développement localement ou que vous hébergiez des services depuis votre réseau local, **les hypothèses concernant le modèle réseau de Docker peuvent entraîner des problèmes.**

Les développeurs sont souvent surpris de découvrir que les méthodes "traditionnelles" pour sécuriser les serveurs Linux (`iptables`, restriction des options sysctl TCP/IP) peuvent **échouer silencieusement** sur les hôtes Docker ! C'est particulièrement vrai lorsqu'on **héberge soi-même ou qu'on exécute sur un réseau domestique typique.** (Pour ceux qui sont à l'arrière : Cela peut permettre l'accès à des conteneurs de développement sur votre MacBook !!!)

> ⚠️ **Avertissement #1 :** Les ports publiés par Docker peuvent contourner les règles de pare-feu que vous croyiez protéger l'hôte, notamment avec UFW sous Ubuntu/Debian. Cela ne rend pas toutes les règles de pare-feu inutiles, mais cela signifie que « UFW affirme bloquer » n'est pas une preuve. [Voir l'issue #690 : Docker contourne les règles de pare-feu ufw](https://github.com/moby/moby/issues/690).

> ⚠️ **Avertissement #2 :** Lier les ports à des adresses IP locales (ex. `-p 127.0.0.1:8080:80`) est la bonne approche par défaut, mais les versions de Docker Engine antérieures à 28.0.0 ont eu des cas où les hôtes sur le même réseau L2 pouvaient toujours accéder aux ports publiés sur localhost. [Docker documente cette limitation dans son guide de publication de ports](https://docs.docker.com/engine/network/port-publishing/), et l'habitude de vérifier avec nmap reste pertinente.

<p class="inset">Si vous êtes surpris d'apprendre cela, moi aussi !</p>

**Lier à des adresses IP locales reste une bonne pratique** et a un impact significatif dans **les environnements cloud gérés et les réseaux spécifiquement configurés.** 
{/* Ne considérez pas votre pare-feu ou votre réseau privé comme votre défense principale ou unique, ajoutez des réseaux Docker pour une meilleure **isolation**, et réfléchissez toujours à savoir si vous avez besoin d'exposer des ports. */}

### Exemple de Docker Compose

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
    # Aucun port nécessaire ; accessible via le réseau backend.
    networks:
      - backend

```

{/* #### Test & Vérification

Comme pour toutes mesures de sécurité, il est crucial que vous **testiez et vérifiiez** votre configuration réseau. */}

{/* Bien que la sécurité réseau et l'audit soient une responsabilité à temps plein dans la plupart des entreprises, la plupart des utilisateurs auto-hébergeant n'y consacrent AUCUN temps ! */}

{/* Écoutez, je comprends, c'est intimidant. _(Sous-réseaux, masques réseau, CIDR, VLAN, tables de routage, oh mon Dieu ! Si cela n'avait aucun sens, c'est normal, vous êtes au bon endroit. De plus, nous n'avons pas besoin de nous en préoccuper pour l'instant.)_ */}

### Bonnes pratiques réseau

- 🏆 **Ne publiez AUCUN port** Récemment, j'ai appris que c'était plus utile que vous ne le pensez ! Lorsqu'on utilise un réseau nommé (bridge), les conteneurs ont un accès non filtré les uns aux autres. Ils se comportent comme s'ils étaient derrière un réseau local (NAT gateway.)
  - Bien que ce ne soit pas possible dans tous les cas d'usage, cela peut être utile pour des conteneurs exécutant des tâches batch, ou principalement accessibles via `attach` ou `exec`.
- 🥇 **Utilisez les réseaux Docker** pour isoler et contrôler quels conteneurs peuvent communiquer entre eux.
- 🥉 **Utilisez le lien localhost** : Bien qu'[imparfait](https://github.com/moby/moby/issues/45610), vous serez généralement mieux de lier les ports à une adresse de bouclage (par exemple, `127.0.0.1:8080:80`). Assurez-vous simplement de [vérifier votre configuration.](#-surveillance--vérification)

## 🛡️ Contrôles d'accès

Les contrôles d'accès constituent une partie essentielle de la sécurisation de vos services Docker. Cela inclut la limitation des capacités et des permissions des conteneurs, la restriction de l'accès au socket Docker, et plus encore.

- [Limitation des capacités des conteneurs](#limitation-des-capacités-des-conteneurs)
- [Accès au socket Docker](#accès-au-socket-docker)
- [Blocage par pays !](#blocage-par-pays)
- [Renforcement de l'hôte proxy CloudFlare](#renforcement-de-lhôte-proxy-cloudflare)

### Limitation des capacités des conteneurs

Une autre pratique solide en matière de contrôle d'accès est de limiter les capacités de vos conteneurs. Cela réduit la portée des menaces, allant de l'escalade de privilèges à l'interception du trafic. Ce n'est pas une barrière infranchissable, mais cela retire des permissions que la plupart des conteneurs n'ont jamais besoin.

**Qu'est-ce qu'une capacité ?** Des permissions ou capacités nommées définies par le noyau Linux. (La page de manuel [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) contient la liste complète.) Elles incluent des choses comme `CAP_CHOWN` (changer la propriété des fichiers), `CAP_NET_ADMIN` (configurer les interfaces réseau), `CAP_KILL` (tuer n'importe quel processus), et bien plus encore.

Les deux méthodes pour déterminer les capacités nécessaires sont :

1. **Essai et erreur** : Cette méthode lente mais efficace consiste à commencer sans aucune capacité, puis à les ajouter une par une jusqu'à ce que votre application fonctionne.
2. **Trouver un travail antérieur** : Recherchez "`nom-de-projet` `cap_drop` Dockerfile" ou "`nom-de-projet` `cap_drop` docker-compose.yml" pour voir si d'autres ont déjà fait le travail pour vous. Un LLM peut suggérer un point de départ, mais traitez cela comme une hypothèse jusqu'à ce que vous testiez le conteneur et lisiez la documentation de l'image.

#### Bonnes pratiques sur les capacités

- **Retirez toutes les capacités** : Utilisez `cap_drop: [ ALL ]` pour supprimer toutes les capacités Linux du conteneur.
- **Pas de nouveaux privilèges** : Utilisez `security_opt: [ no-new-privileges=true ]` pour empêcher le conteneur de gagner de nouveaux privilèges.

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

Maintenant, vos services peuvent communiquer entre eux via le réseau `db-network`. Docker Compose créera automatiquement ce réseau.

Utilisez l'option `--external`/`external:` pour rejoindre un **réseau préexistant**. Omettez-la pour créer un nouveau réseau.

### Accès au socket Docker

#### ⚠️ Avertissement : `docker.sock` est en quelque sorte l'accès administrateur de l'hôte

<blockquote class="inset">⚠️ L'option `:ro` n'affecte pas les échanges d'entrée/sortie via le socket !</blockquote>

Elle garantit uniquement que le chemin du socket lui-même est monté en lecture seule. Les appels API envoyés via ce socket peuvent toujours créer des conteneurs, monter des chemins d'hôte et effectuer d'autres actions potentiellement dangereuses que vous n'avez probablement pas souhaité déléguer.

{/* Tout processus capable d'« ouvrir » le socket peut (probablement) obtenir l'accès root sur l'hôte. */}

#### Meilleure pratique concernant le socket

- 🥇 **Évitez de monter le socket Docker**, il existe probablement une alternative plus adaptée.  
- 🫣 Si c'est indispensable, **placez un proxy restreint devant** et autorisez uniquement les points d'API réellement nécessaires à l'application. Explorez le projet `docker-socket-proxy` initialement développé par Tecnativa, [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Vérifiez ensuite que les appels bloqués sont bien refusés.  
- 🤢 Bon, _peut-être_ que partager ce socket est acceptable dans un environnement de test **à haute confiance**, **à faible risque**.  

#### Blocage par pays !  

Parfois utile, mais pas une véritable frontière de sécurité.  

_On parle de l'entité géopolitique, pas de la musique..._  

Si vous hébergez des applications principalement pour votre famille et vos amis locaux, vous pouvez bloquer le trafic des pays d'où vous ne vous attendez pas à en recevoir. Ou, inversement, autoriser uniquement le trafic des pays attendus. Cela réduit le bruit ; cela ne bloque pas les VPN, les proxys, les botnets, ou les attaquants patients.  

Voici un script pour bloquer tout le trafic en provenance de Chine :

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

De même, vous pouvez autoriser uniquement le trafic en provenance des États-Unis :

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Renforcement du hôte proxy CloudFlare

Si votre serveur domestique est protégé derrière une adresse IP CloudFlare (proxy), vous pouvez restreindre l'accès aux seules adresses IP de CloudFlare et à votre réseau local.

Cela ressemble un peu au [blocage par pays](#blocking-country) ci-dessus, mais avec un contrôle bien plus strict.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Bloquer toutes les connexions entrantes
ufw default allow outgoing # Autoriser toutes les connexions sortantes
ufw allow ssh # Autoriser SSH

# Autoriser l'accès depuis le sous-réseau local (idéalement un DMZ/VLAN dédié pour les services hébergés)
ufw allow from 10.0.0.0/8 to any port 443
```

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Bloquer toutes les connexions entrantes
ufw default allow outgoing # Autoriser toutes les connexions sortantes
ufw allow ssh # Autoriser SSH

# Autoriser l'accès depuis le sous-réseau local (idéalement un DMZ/VLAN dédié pour les services hébergés)
ufw allow from 10.0.0.0/8 to any port 443
```

# Autoriser les IPs de CloudFlare
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# Ajouter le support IPv6
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Pour tester les modifications basées sur la géolocalisation, un VPN avec des emplacements dans le pays souhaité peut s'avérer utile. Voir plus dans la section [Surveillance et vérification](#monitoring--verification).

### Sécurité au niveau de l'application

Une fois que [votre réseau et hôte sont sécurisés,](#network-hazard) vous pourrez constater qu'il reste encore des actions à entreprendre.

Il est maintenant temps de penser à la couche "application" de nos services eux-mêmes.
```

<p class="inset">Ce base de données a-t-elle un mot de passe valide ? Ce conteneur automatise-t-il l'HTTPS/certs ? L'application inclut-elle une authentification intégrée ? Y a-t-il des limites sur les adresses e-mail pouvant s'inscrire ? Existent-ils des identifiants par défaut ou des variables d'environnement à modifier ?</p>

La seule façon de savoir est de vérifier. Dans ce cas, commencez par le `README` et d'autres fichiers clés comme `docker-compose.yml`, `Dockerfile`, et `.env.*`. À la fois dans le projet, et idéalement dans ses services annexes également (p. ex. Postgres, Redis, etc.).

#### Reverse Proxy

Une couche de défense supplémentaire est l'authentification basique. Ne la mettez pas en œuvre sans HTTPS. Pour les services hérités, ajouter une authentification basique devant une route d'administration est souvent suffisant pour bloquer les requêtes aléatoires et les crawlers non authentifiés qui essaieraient d'accéder directement au service.

```nginx
# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Accès Restreint";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}
```

Générez les identifiants :

```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

Avec une authentification basique via un reverse proxy, les attaquants rencontrent un obstacle supplémentaire—nom d'utilisateur et mot de passe—avant d'atteindre votre service interne.

Une autre option consiste à utiliser un service comme [Traefik](https://traefik.io/) ou [Caddy](https://caddyserver.com/) qui peut automatiser l'HTTPS et l'authentification basique pour vous.

Si vous souhaitez gérer de nombreux domaines et services avec une interface graphique, je recommande [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 Surveillance et vérification

- [Vérifiez vos ports](#check-your-ports)
- [Affichez les ports ouverts](#view-open-ports)
- [Surveillance des fichiers](#file-monitoring)

C'est **l'étape la plus importante et la plus négligée.** Vous pouvez avoir le meilleur pare-feu, le meilleur réseau et les meilleures pratiques, mais si vous ne vérifiez pas, vous n'avez aucune idée de leur fonctionnement.

De plus, connaître quelques commandes clés ou savoir où les chercher peut faire toute la différence pour empêcher une violation de sécurité. Le sentiment de devenir un hacker n'est qu'un bonus. (Pour des détails et des exemples, sautez directement à la section [Surveillance et vérification](#-monitoring--verification).)

<p class="inset">Ne faites pas confiance, vérifiez deux fois</p>

### Vérifiez vos ports

<p class="inset">⚠️ IMPORTANT : Ne scannez pas les hôtes que vous ne possédez pas.</p>

Que vous soyez sur un réseau domestique ou un VPS, il est essentiel de connaître les ports ouverts au monde extérieur.

Il existe 2 méthodes pour cela :

- Vérifier le réseau (`nmap`, `masscan`)
- Interroger le système d'exploitation (`lsof`, `netstat`, `ss`)

#### Tester en dehors de votre réseau

Vous aurez besoin de votre IP publique actuelle, facile à obtenir avec des services comme `ifconfig.me` : `curl https://ifconfig.me`. Ou vérifiez-la dans le tableau de bord de votre fournisseur d'hébergement.

```bash title="Obtenir l'IP publique"
curl -fsSL https://ifconfig.me
# --> IP PUBLIQUE ACTUELLE
```

Une fois que vous avez votre IP publique, vous devez **vous connecter à un réseau externe**. Vous pouvez utiliser l'ordinateur d'un ami, un point d'accès mobile 5G ou un hôte de serveur dédié.

```bash title="Balayage externe avec nmap"
target_host="$(curl -fsSL https://ifconfig.me)"

# Note : Assurez-vous que `target_host` est l'IP souhaitée

# Balayage de ports spécifiques :
nmap -A -p 80,443,8080 --open --reason $target_host
# 100 premiers ports :
nmap -A --top-ports 100 --open --reason $target_host
# Tous les ports
nmap -A -p1-65535 --open --reason $target_host
```

#### Tester à l'intérieur de votre réseau

Pratiquez l'utilisation de `nmap`, balayez votre réseau local ou l'un de vos serveurs, vérifiez votre routeur, imprimante, réfrigérateur intelligent.

{/* Bien que les balayages de ports soient une constante dans la vie courante, cela pourrait être une violation de la CFAA (Computer Fraud and Abuse Act) aux États-Unis. Donc, ne scannez que les appareils que vous possédez. */}

#### Exemples de commandes de balayage

```bash

# Balayage de votre localhost pour tous les ports ouverts
nmap -sT localhost

# Balayage de l'IP privée de votre machine pour les services
nmap -sV 192.168.1.10

# Découverte des détails des services sur votre réseau
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# Ou sur un réseau Docker 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="Balayage nmap" frame="terminal"
% nmap -A --open --reason 192.168.0.87

Début du balayage Nmap 7.95 ( https://nmap.org ) le 06/01/2025 à 13:51 MST
Rapport de balayage Nmap pour dev02.local (192.168.0.87)
L'hôte est actif, réponse syn-ack reçue (0.0067s de latence).
Non affichés : 995 ports TCP fermés (conn-refused)
PORT     ÉTAT  SERVICE     RAISON   VERSION
22/tcp   ouvert  ssh         syn-ack OpenSSH 9.6p1 Ubuntu 3ubuntu13.5 (Ubuntu Linux; protocole 2.0)
| ssh-hostkey:
|_  256 {FINGERPRINT} (ED25519)
80/tcp   ouvert  http        syn-ack Caddy httpd
|_http-server-header: Caddy
|_http-title: Dev02.DanLevy.net
443/tcp  ouvert  ssl/https   syn-ack
|_http-title: Dev02.DanLevy.net
1234/tcp ouvert  http        syn-ack Node.js Express framework
|_http-cors: GET POST PUT DELETE PATCH
|_http-title: Dev02.DanLevy.net (application/json; charset=utf-8).
Informations sur le service : OS : Linux ; CPE : cpe:/o:linux:linux_kernel

Détection des services effectuée. Merci de signaler les résultats incorrects à https://nmap.org/submit/ .
Nmap terminé : 1 adresse IP (1 hôte actif) balayée en 13.36 secondes
```

### Afficher les ports ouverts

Familiarisez-vous avec `lsof` - disponible sur MacOS & Linux. Il affiche l'état réseau détaillé et l'activité du disque.

```bash title="Commandes lsof"
# Surveiller un port spécifique
sudo lsof -i:80 -Pn
```

```bash title="Commandes lsof"
# Surveiller les connexions ÉTABLIES
sudo lsof -i -Pn | grep ÉTABLIES
# Afficher les connexions ECOUTE
sudo lsof -i -Pn | grep ECOUTE

# pour afficher les noms réseau au lieu des adresses IP (peut être très lent pour effectuer des recherches DNS inverses)
sudo lsof -i -P | grep ECOUTE

# Surveiller toutes les connexions réseau
sudo watch -n1 "lsof -i -Pn"
```

#### Exemple de sortie

![balayage des écouteurs par lsof](../lsof-scan-listen.webp)

### Surveillance des fichiers

Pour identifier quels **processus** utilisent le plus de **bande passante du disque dur**, vous pouvez utiliser `iotop` :

```bash
sudo iotop
```

Pour afficher les modifications individuelles de fichiers, vous pouvez utiliser `inotifywait` sous Linux ou `fswatch` sous MacOS :

Cela peut être utile pour détecter des comportements non autorisés ou étranges au niveau d'un dossier ou à l'échelle du système.

```bash
# Surveiller toutes les modifications de fichiers dans un répertoire
sudo inotifywait -m /chemin/vers/le/répertoire
```

Sous MacOS vous pouvez utiliser `fswatch` :

Installer avec `brew install fswatch`

```bash
fswatch -r /chemin/vers/le/répertoire
```

## ⏰ Conseils souvent négligés

1. **Limitation du débit** pour les tentatives d'authentification et d'autres points d'entrée critiques. Que ce soit via le module `limit_req` de Nginx ou `fail2ban` pour l'accès SSH, limiter les attaques par force brute est _probablement_ une bonne idée. Je dis _probablement_ car à l'ère d'IPv6 et des botnets bon marché, ce n'est plus ce que c'était.

2. **Utiliser des volumes en lecture seule** autant que possible :
   ```yaml
   services:
      webapp:
        volumes:
          - ./config:/config:ro
   ```
   En combinant cette pratique avec d'autres bonnes habitudes (utilisateurs non-root, permissions minimales sur les dossiers), l'option `:ro` pour les montages de volumes offre des protections supplémentaires contre les modifications accidentelles et certaines tentatives d'écriture depuis le conteneur. Cela ne protège pas l'hôte contre un processus déjà doté de privilèges plus étendus.

3. **Auditer régulièrement l'accès aux conteneurs**.
   Si un conteneur n'a pas besoin d'un secret, d'un port ou d'un montage, retirez-le !

4. **Faites attention aux voleurs de WiFi**
   Je suis sûr que vous ne donneriez jamais votre mot de passe WiFi à des inconnus, surtout des étrangers, non ? Sauf peut-être à certains amis... Okay, peut-être même à la famille. On ne sait jamais quels applications ils ont et lesquelles pourraient partager votre SSID & mot de passe avec le monde entier.

### Réseau domestique vs. Fournisseur public vs. Tunneling

1. **Isolation virtuelle/DMZ** : Pour les serveurs domestiques, placez-les sur un VLAN ou une DMZ séparée si possible. Cela protège vos appareils internes contre une compromission potentielle depuis le côté serveur.
   - Utilisez un routeur, un VLAN ou un sous-réseau dédié pour votre serveur domestique.
   - Utilisez un réseau WiFi distinct pour votre serveur domestique.
   - Utilisez un sous-réseau distinct pour votre serveur domestique.

2. **Fournisseurs de nuage** : Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure et Google Cloud offrent tous des fonctionnalités de pare-feu différentes.  
   - Certains fournisseurs et services bloquent les ports par défaut. D'autres proposent des options ou des add-ons. Vérifiez la documentation de votre fournisseur.  
   - De nombreux fournisseurs offrent des services avancés de surveillance et de détection de menaces.  

3. **Réseaux privés virtuels (VPN) et tunnellisation** : Pensez à utiliser une solution similaire à un VPN ou un service de tunnellisation pour connecter en toute sécurité des services à travers internet sans les exposer au public.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.  

{/* 3. **Renforcement contre les attaques internes/latérales** : Un appareil infecté peut compromettre tout un réseau. La segmentation des services Docker sur des réseaux personnalisés, l'utilisation de règles UFW et le blocage des ports inutiles peuvent réduire le risque (si configurés correctement). */}  

## 🚀 Checklist de production  

- [ ] **Secrets** : Tous les secrets générés aléatoirement et stockés en toute sécurité  
- [ ] **Mises à jour** : Stratégie de mise à jour des conteneurs documentée et automatisée. (Acceptable si c'est juste quelques commandes dans un fichier texte.)  
- [ ] **Réseau** : Seuls les ports nécessaires exposés, réseaux internes configurés.  
- [ ] **Règles de pare-feu** : Refus par défaut, autorisations explicites, blocage par pays si nécessaire.  
- [ ] **Reverse Proxy** : Nginx, Caddy ou Traefik peuvent ajouter une couche d'authentification basique  
- [ ] **Tokens canari** : Placez-les près des fichiers et des identifiants sensibles que vous investigueriez effectivement s'ils étaient touchés.  
- [ ] **Surveillance** : Connaissez vos systèmes avec `nmap`, `lsof`, `inotifywait`, `glances`, etc.  
- [ ] **Stratégie de sauvegarde** : Testée, idéalement automatisée, et hors-site.  
- [ ] **Principe du moindre privilège** : Utilisateurs non-root, volumes en lecture seule.  

## 📚 Lectures complémentaires

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)  
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)  
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)  
- [Canarytokens.org pour les Canary Tokens](https://canarytokens.org/)  

## Merci  

Un grand merci à certains Redditors attentifs :  

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [discussion](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>  
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>  
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>  
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>  
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>  

Merci d'avoir lu ! J'espère que ce guide vous a été utile. Si vous avez des questions ou des suggestions, n'hésitez pas à me contacter via mes réseaux sociaux ci-dessous, ou cliquez sur le lien `Modifier sur GitHub` pour créer une proposition de modification (PR) ! ❤️
````
