# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: fr
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/fr/index.mdx
- Validation: deferred
- Runtime seconds: 188.36
- Input tokens: 9990
- Output tokens: 8870
- Thinking tokens: unknown
- Cached input tokens: 384
- Cache write tokens: 0
- Estimated cost: $0.003830
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: true
draft: true
hidden: true
title: 'Sécurité Docker : Le Guide Perdu des Développeurs'
subTitle: >-
  Apprenez à protéger votre réseau des menaces et des configurations dangereuses
  !
date: '2025-01-04'
modified: '2025-01-13'
tags:
  - local development
  - security
  - devops
  - best-practices
category: Security
cover_full_width: ../flame-whale-wide.webp
cover_mobile: ../flame-whale-head-square-200.webp
cover_icon: ../flame-whale-head-square-200.webp
cover_credit: ©️ 2025 Dan Levy
---
import {CodeTabs} from '../../../../../components/CodeTabs';

## Travail en cours

**Table des matières**

1. [⚠️ Réseaux locaux en danger](#-local-networks-at-risk)
2. [🛡️ Configuration du pare-feu](#-firewall-configuration)
3. [🔐 Gestion des secrets pour le développement local](#-secrets-management-for-local-development)
4. [🕵️‍ Fuites d’identifiants et attaques par canaux auxiliaires](#-credential-leaks-and-side-channel-attacks)
5. [🔍 Surveillance et jetons canari](#-monitoring--canary-tokens)
6. [❌ Idées reçues courantes](#-common-misconceptions)

<p class="inset"></p>

## ⚠️ Réseaux locaux en danger

Soyons honnêtes, nous l’avons tous fait. Vous vous êtes connecté à un Wi-Fi de café au hasard ou avez laissé quelqu’un utiliser votre réseau domestique sans y penser. Peut-être même faites-vous confiance à votre réfrigérateur connecté pour ne pas compromettre votre réseau. La réalité ? Ces décisions anodines peuvent exposer votre environnement de développement local à des risques inutiles. Les attaquants ne ciblent pas uniquement les systèmes de production — les environnements locaux sont souvent des cibles plus faciles, offrant un moyen d’accéder à des projets sensibles.

### Scénarios d’attaque

1. **Trafic intercepté :** Le trafic non chiffré peut facilement être capturé et lu.
2. **Services non protégés :** Bases de données ou API locales exposées sur `0.0.0.0`.
3. **Usurpation réseau :** Redirige le trafic vers un appareil attaquant.

### Correctifs rapides

- Préférez les réseaux Docker privés aux pare-feu pour limiter l’exposition réseau.
- Évitez les Wi-Fi publics ou partagés ; préférez utiliser le point d’accès de votre téléphone.
- Surveillez votre réseau local pour détecter les appareils inconnus à l’aide d’outils comme `arp-scan` et `nmap`.

## 🛡️ Configuration du pare-feu

### UFW avec Docker (Ubuntu)

> ⚠️ **Avertissement :** Par défaut, Docker sur Ubuntu/Debian contourne les règles UFW/iptables, exposant potentiellement votre système à des attaques.
> Peu importe que vous liiez les ports à des adresses IP locales (par ex. `-p 127.0.0.1:8080:80`).

Cela me surprend à chaque fois que j’en prends connaissance ! [Docker contourne les règles UFW par défaut](https://github.com/moby/moby/issues/4737), permettant aux conteneurs de communiquer avec l’hôte et d’autres conteneurs sans restriction.

### Bonnes pratiques

1. 🥇 **Utilisez les réseaux Docker** pour isoler et contrôler ce qui peut se connecter à chaque conteneur ou réseau.

###
2. 🥉 **Mettez à jour iptables** si vous devez utiliser un réseau `host`, ou ne pouvez pas utiliser de réseaux personnalisés, vous pouvez atténuer le risque en configurant iptables. Pas pour les âmes sensibles, [jetez un œil à l’utilitaire ci-dessous.](#uf)

#### Isolation par réseau Docker

```bash
# Create a new Docker network
docker network create my-network

# Run your container with the new network
docker run --network my-network my-container
```

#### Configuration UFW (pour les réseaux `host`)

Il y a beaucoup de mauvais conseils pour résoudre ce problème. Configurez UFW pour fonctionner avec Docker en utilisant UFW comme vous vous y attendriez.

J'ai utilisé `ufw-docker` pour configurer un système auto-hébergé et cela semble bien fonctionner.

```bash title="install-ufw-docker.sh"
# Install binary as root (needs root permissions anyway)
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# Install and modify the `after.rules` file of `ufw`
ufw-docker install

ufw-docker help
```

```

Cette commande effectue les opérations suivantes :

- Sauvegarde le fichier `/etc/ufw/after.rules`.
- Ajoute les règles liées à Docker à la fin du fichier pour une intégration correcte avec UFW.

**Source :** [ufw-docker GitHub](https://github.com/chaifeng/ufw-docker/tree/master#install)

**Exemple d'utilisation :**

```bash

# Allow Docker container on port 8080
ufw-docker allow <container_name> 8080/tcp

# Manage rules safely alongside your UFW configuration
ufw-docker status

```

**Remarque :** La plupart des « correctifs » pour les conflits Docker-UFW impliquent des règles iptables manuelles, qui peuvent être sujettes à erreurs et fragiles lors des mises à jour.

### Pare-feu macOS

1. Allez dans **Préférences Système > Sécurité et Confidentialité > Pare-feu**.
2. Activez le pare-feu et cliquez sur « Options du pare-feu ».
3. Bloquez toutes les connexions entrantes sauf les services essentiels.

**Remarque :** Vous devrez peut-être consulter la configuration de votre pare-feu pour autoriser certains appareils intelligents que vous utilisez, par exemple Google Cast/AirPlay et autres services.

### Commandes pour utilisateurs avancés (macOS et Linux)

#### macOS :

```bash

sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on  # Block all
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/app  # Allow specific app

```

#### Linux (ufw) :

```bash

ufw default deny incoming  # Block all incoming
ufw allow ssh  # Allow SSH
# allow 443 and 80 for web traffic
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # Enable firewall

```

**Astuce :** Utilisez des outils comme [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) sur macOS et [ufw](https://help.ubuntu.com/community/UFW) sur Linux pour des configurations plus conviviales.
```

## 🔐 Gestion des secrets pour le développement local

### Validation proactive des espaces réservés

<p>💡 Assurez-vous que les secrets sont correctement configurés avec des valeurs réelles avant d'exécuter votre application.</p>

Si vous utilisez des espaces réservés comme `__WARNING_REPLACE_ME__` dans vos secrets, tant mieux, quelqu'un les remarquera peut-être. Par précaution, vous pouvez aussi ajouter une petite validation pour garantir la sécurité à l'exécution.

Vous n'imaginez pas à quel point il est facile de pirater complètement (modifier & re-signer) un jeton JWT quand les attaquants peuvent deviner le secret !

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

### Génération et stockage des secrets

<p class="inset">Ne codez jamais en dur les secrets dans votre base de code. Préférez les variables d'environnement et les coffres sécurisés.</p>


Au lieu de `.env.example`, utilisez `.env.generate.sh` pour permettre aux utilisateurs d'obtenir facilement un fichier `.env` avec des « valeurs par défaut » sécurisées.

#### Exemple `.env.generate.sh`

```bash title=".env.generate.sh" frame="code"
#!/bin/bash
# Generates a secure .env file for local development

generate_secret() {
    local length=${1:-30}
    # add 4 bytes to account for padding
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}
# Bail out if .env file already exists
[ -f .env ] && { echo ".env file already exists!"; exit 1; }

cat <<EOL > .env
# Database settings & secrets
DB_USER=app_user
DB_PASSWORD=$(generate_secret 30)
REDIS_PASSWORD=$(generate_secret 20)
# Session secrets
SESSION_KEY=$(generate_secret 32)
JWT_SECRET=$(generate_secret 64)
EOL

echo "New .env file generated!"
```

{/*

```zig
// validate_secrets.zig
const std = @import("std");

pub fn main() void {
    var env = std.os.getenv_map();
    const placeholder = "__WARNING_REPLACE_ME__";

    for (env.items()) |entry| {
        if (std.mem.contains(u8, entry.value, placeholder)) {
            std.debug.panic("Unsafe secret in {}", .{entry.key});
        }
    }
}
``` */}

## 🕵️‍ Surveillance et double vérification

### Exemples avec `nmap`

#### Tester à l'intérieur de votre réseau

```bash

# Scan your localhost for all open ports
nmap -sT localhost

# Scan your machine’s private IP for services
nmap -sV 192.168.1.10

# Detect devices on your network
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
```

```

#### Test en dehors de votre réseau

Vous pouvez consulter facilement votre adresse IP (publique) actuelle avec des services comme `ifconfig.me` : `curl https://ifconfig.me`.

Utilisez un réseau externe ou un serveur distant pour tester vos IP publiques :

```bash

print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# Change target_host to your public ip or hostname
# Check host using advanced techniques
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host

```

**Pourquoi tester les deux ?**
Tester depuis l'intérieur révèle l'exposition interne, tandis que les tests externes identifient les services accessibles aux attaquants.

## 🛡️ Idées reçues courantes
```

1. **Mon environnement local n'est pas une cible.**
   - Réalité : Les attaquants peuvent passer de votre machine à vos systèmes de production.
2. **Les pare-feux bloquent tout.**
   - Réalité : Ils ne bloquent que ce que vous configurez.
3. **Les adresses IP privées sont sécurisées.**
   - Réalité : Des exploits comme les contournements NAT peuvent toujours affecter votre réseau.
````
