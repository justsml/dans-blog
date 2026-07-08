# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: de
- Model: openrouter/qwen/qwen3.6-plus
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.07
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug docker-security-tips-for-self-hosting --locale de --model openrouter/qwen/qwen3.6-plus --chunk 18p --run-id 2026-07-08T16-57-06-378Z-64498 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json
## Raw Output

````mdx
---
title: Wesentliche Docker‑Sicherheitstipps für das Selbsthosting
subTitle: Sichern Sie Ihre selbstgehostetenDienste – von Abwehr bis Überwachung!
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

**Inhaltsverzeichnis**

- 🧗‍♀️ [Für die Mutigen](#️-for-the-brave)
- 🔄 [Der `:latest` Tanz](#-the-latest-dance)
- 🔐 [Geheimnisverwaltung: Der Richtige Weg](#-secrets-management)
- 🌐 [Netzwerkgefahr](#-network-hazard)
- 🛡️ [Zugriffskontrollen](#️-access-controls)
- 🔍 [Monitoring & Verifikation](#-monitoring--verification)
- ⏰ [Häufig Übersehene Tipps](#-often-overlooked-tips)
- 🚀 [Produktions‑Checkliste](#-production-checklist)
- 📚 [Weiterführende Literatur](#-further-reading)

## 🧗‍♀️ Für die Mutigen

Wenn Sie Docker‑Dienste selbst hosten, liegt die Sicherheit komplett in Ihrer Hand – kein Cloud‑Provider schützt Sie vor Port‑Scans oder schlampiger Konfiguration. Egal, ob Sie Anwendungen im heimischen Netzwerk starten oder VPSs bei Anbietern wie Vultr, DigitalOcean, Linode, AWS, Azure oder Google Cloud mieten, Sie müssen das System absichern – und nachweisen, dass es korrekt gesichert ist.

In diesem Leitfaden gehen wir die Docker‑Sicherheit Schritt für Schritt durch – von weniger bekannten bis zu schwer richtig umzusetzenden Techniken; wir betrachten Canary‑Tokens, schreibgeschützte Volumes, Firewall‑Regeln, Netzwerksegmentierung & Härtung, das Hinzufügen authentifizierter Proxies und vieles mehr.

Wir vergleichenaußerdem Heimnetzwerke mit öffentlichen Cloud‑Umgebungen und zeigen, wie man einen einfachen Auth‑Proxy mit Nginx einrichtet. Am Ende haben Sie mehrere Möglichkeiten, das „Riff‑Raff“ (Freunde, Familie und manchmal sogar Sie selbst…) draußen zu halten…

Das ist eine Menge Stoff! Aber vieles lässt sich kombinieren, und Sie können auswählen, was für Ihre Umgebung am relevantesten ist. 🍀

## 🔄 Der `:latest`‑Tanz

Images aktuell zu halten ist für die Sicherheit entscheidend. Auf `:latest` zu setzen kann jedoch zu Breaking Changes oder verwundbaren Builds führen, ohne dass ein Review‑Schritt stattfindet.

### Der sichere Weg zum Update

Kombinieren Sie Update‑Befehle mit `pull` oder `build`, sodass Sie Images bewusst neu holen und dann in einem Zeitfenster neu starten, in dem Sie mögliche Fehler bemerken.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Version Pinning vs Latest

Die Wahl der zu pinnen‑Version ist ein Balanceakt zwischen Stabilität und Sicherheit. Hier einige gängige Strategien:

```yaml
# docker-compose.yml
# ...
  # Exakte Versionsbindung, ideal für kritische Dienste
  image: postgres:17.2

  # Patch‑Version binden, gut für nicht‑kritische Dienste
  image: postgres:17.2

  # Major‑Version binden, perfekt für Hobby‑Projekte
  image: postgres:17

  # Yolo, nach Möglichkeit vermeiden
  image: postgres:latest
```

Verwenden Sie [Dependabot](https://github.com/features/security) oder [Renovate](https://github.com/renovatebot/renovate), um prüfbare Update‑PRs zu öffnen. Für alles, das Sie ungern um 2 Uhr morgens neu bauen würden, pinnen Sie auf eine feste Version oder einen Digest und lassen Sie die Automatisierung melden, wann ein Wechsel sinnvoll ist.

_Lassen Sie mich wissen, welche Werkzeuge Sie zum Aktualisieren von Docker‑Images bevorzugen!_

## 🔐 Secrets Management

- [Generate Strong Secrets](#generate-strong-secrets)
- [Canary Tokens](#canary-tokens)
- [Upgrade from `.env` to MacOS Keychain](#upgrade-from-macos-keychain)
{/* - [Placeholder Validation](#placeholder-validation) */}

Es gibt zahlreiche Wege, Secrets zu verwalten, aber eine der wichtigsten Regeln lautet: **niemals Secrets in Docker‑Images hardcoden oder in Git committen**. Das ist einer der häufigsten Sicherheitsfehler, birgt ein langfristiges Risiko und ist mühsam zu beheben.

Secrets sicher zu speichern ist ein umfangreiches Thema mit vielen Optionen, von `.env`‑Dateien, [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), bis hin zu einem Secrets‑Manager wie [HashiCorp Vault](https://www.vaultproject.io/) oder AWS Secrets Manager.

Sie müssen das für Ihren Anwendungsfall „richtige“ Verhältnis von Aufwand und Sicherheit wählen.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Placeholder Validation

<blockquote>Man würde kaum glauben, wie einfach es ist, ein JWT‑Token zu hacken, wenn das Secret nicht geheim ist!</blockquote>
*/}

<pclassName='inset'>💡 Stellen Sie sicher, dass Geheimnisse immer eindeutig sind. Versuchen Sie, es unmöglich zu machen, mit unsicheren/hartkodierten Vorgaben zu starten.</p>

Wenn Sie Platzhalter wie `__WARNING_REPLACE_ME__` in Ihren Geheimnissen verwenden, großartig – vielleicht bemerkt ja jemand!

Für den Fall der Fälle können Sie mit wenig Aufwand noch ein wenig Laufzeit‑Sicherheit hinzufügen. So könnte das in JavaScript, Rust und Go aussehen:

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

### Starke Geheimnisse erzeugen

Hier ein kleines Skript, um neue Geheimnisse für eine `.env`‑Datei zu erzeugen:

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

### Canary‑Tokens

[**Canary‑Tokens**](https://canarytokens.org/) sind ein effektiver Weg, um festzustellen, ob Ihre Geheimnisse kompromittiert (und verwendet) wurden. Sie funktionieren wie ein Stolperdraht, den Sie in jede sensible Datei, URL oder jedes Token einbauen können.

Setzen Sie sie neben den Geheimnissen, die Sie wirklich schützen wollen: `.env`‑Dateien, CI‑Variablen, Passwort‑Manager, Backup‑Ordner und Cloud‑Zugangsdaten. Machen Sie daraus kein Theaterstück; platzieren Sie Stolperdrähte dort, wo ein echter Angreifer oder ein zukünftiges Ich sie berühren würde.

Es gibt zahlreiche Arten von Canary‑„Tokens“, von AWS‑Tokens, [gefälschten Kreditkartennummern](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), Excel‑ und Word‑Dateien, Kubeconfig‑Dateien, VPN‑Zugangsdaten bis hin zu SQL‑Dump‑Dateien, die einen Stolperdraht enthalten können!

#### Best Practices für Canary‑Tokens

- **Überall platzieren**: In jeder `.env`‑Datei, jeder CI/CD‑Pipeline und jedem „Secrets‑Manager“, den Sie sich vorstellen können.  
  - Legen Sie eine `passwords.xlsx`‑ oder `passwords.docx`‑Datei in Ihrem Home‑Verzeichnis ab.  
  - Fügen Sie ein AWS‑Profil `billing_prod` hinzu, bei dem das Geheimnis ein Canary‑Token ist.  
  - Erzeugen Sie eine `private.key`‑Datei für Ihr `~/.ssh`‑Verzeichnis.  
  - Erstellen Sie einen Canary‑SQL‑Dump `all_credit_cards.sql` für Ihr `~/backups`‑Verzeichnis.  
- **Überwachen**: Richten Sie E‑Mail‑Regeln/Alarme ein, um zu erkennen, wenn ein Canary‑Token ausgelöst wird.

### Upgrade von `.env` zu macOS‑Schlüsselbund

Für macOS‑Nutzer ist eine der einfachsten Optionen die Verwendung des Schlüsselbunds.

Hier ein einfacher Weg, Secrets aus dem macOS‑Schlüsselbund zu laden, unterstützt `TouchID` und ist etwas sicherer als `.env`‑Dateien.

Der ursprüngliche <cite>Credit geht an [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) und [Jan Schaumann](https://www.netmeister.org/)</cite>

<CodeTabs client:load tabs={[
  "Helper commands",
  "Persist secrets in environment",
  "Use secrets per command"]
}>
```bash title="keychain-secrets.sh"
### Functions for setting and getting environment variables from the OSX keychain ###
### Adapted from: https://www.netmeister.org/blog/keychain-passwords.html and 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# Use: get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Use: set-keychain-secret SECRET_ENV_VAR
# You will be prompted to enter the secret value!
function set-keychain-secret () {
    [ -n "$1" ] || print "Missing environment variable name"
    
    # prompt user for secret
    echo -n "Enter secret for ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Load Env vars into the current shell
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Note: If an attack can run `env` in your shell, then these secrets could be exposed!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Specify all secrets for this project
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Note: Using a shell wrapper helps prevent secrets from staying
# around in the environment. And it's safe to commit.

# Usage:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 Netzwerk‑Gefahr

### Benutzerdefinierte Netzwerke & interne Ports

Die korrekte Isolation von Diensten mittels Docker‑Netzwerken ist ein wichtiger Ansatz, um die Angriffsfläche zu verkleinern.

Vorsicht beim Durchstechen des Netzwerks! Ein falsch konfigurierter Port‑Forward kann schnell zu ernsthaften Problemen führen.

Standardmäßig werden Dienste in einem privaten LAN nicht ins Internet gestellt – Sie müssen Ports explizit von Ihrem Router weiterleiten.

### Docker im LAN

Ob Sie als Entwickler lokale Entwicklungs‑Server betreiben oder Dienste aus Ihrem Heimnetzwerk selbst hosten, **Fehleinschätzungen des Docker‑Netzwerkmodells können schnell zu Problemen führen.**

Entwickler sind häufig überrascht, dass die „traditionellen“ Methoden zur Absicherung von Linux‑Servern (`iptables`, Einschränkung von tcp/ip‑sysctl‑Optionen) **stillschweigend scheitern** auf Docker‑Hosts! Das trifft besonders zu, wenn **Selbst‑Hosting oder Betrieb in einem typischen Heimnetzwerk** erfolgt. (Für die Hinteren: Das kann den Zugriff auf Entwicklungs‑Container auf Ihrem MacBook ermöglichen!!!)

> ⚠️ **Warnung #1:** Von Docker veröffentlichte Ports können die Firewall‑Regeln, von denen Sie dachten, sie schützen den Host, umgehen – insbesondere bei UFW auf Ubuntu/Debian. Das macht nicht jede Firewall‑Regel nutzlos, aber es bedeutet, dass „UFW sagt deny“ kein Beweis ist. [Siehe Issue #690: Docker bypasses ufw firewall rules](https://github.com/moby/moby/issues/690).

> ⚠️ **Warnung #2:** Das Binden von Ports an lokale IP‑Adressen (z. B. `-p 127.0.0.1:8080:80`) ist die richtige Vorgabe, doch Docker‑Engine‑Versionen vor 28.0.0 hatten Fälle, in denen Hosts im selben L2‑Netzwerk trotzdem auf localhost‑veröffentlichte Ports zugreifen konnten. [Docker dokumentiert die Einschränkung in seiner Anleitung zum Port‑Publishing](https://docs.docker.com/engine/network/port-publishing/), und die unten beschriebene „verify‑with‑nmap“-Gewohnheit bleibt relevant.

<p class="inset">Wenn Sie das überrascht, Ihnen geht es genauso!</p>

**Das Binden an lokale IPs bleibt eine gute Praxis** und hat eine spürbare Wirkung in **verwalteten Cloud‑Umgebungen und speziell konfigurierten Netzwerken**. 
{/* Don't think of your firewall or private network as your main or only defense, add Docker Networks to the mix for better **isolation**, and always consider if you need to expose ports at all. */}

### Beispiel Docker‑Compose

Hier ein Beispiel‑`docker-compose.yml`, das den Service `app` an `127.0.0.1:8080` bindet und beide Container dem benutzerdefinierten Netzwerk `backend` zuordnet.

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

### Netzwerk‑Best‑Practices

- 🏆 **Keine Ports veröffentlichen** Kürzlich habe ich festgestellt, dass das öfter nützlich ist, als man denkt! Bei Verwendung eines benannten (Bridge‑)Netzwerks haben Container ungehinderten Zugriff aufeinander. Sie verhalten sich, als befänden sie sich hinter einem lokalen Netzwerk (NAT‑Gateway).
  - Auch wenn das nicht in allen Anwendungsfällen möglich ist, kann es für Container, die Batch‑Jobs ausführen, oder hauptsächlich über `attach` bzw. `exec` angesprochen werden, sinnvoll sein.
- 🥇 **Docker‑Netzwerke verwenden** zur Isolation und Kontrolle, welche Container miteinander kommunizieren dürfen.
- 🥉 **Lokale Bindung nutzen**: Obwohl [nicht perfekt](https://github.com/moby/moby/issues/45610), ist es im Allgemeinen besser, Ports an eine Loopback‑Adresse zu binden (z. B. `127.0.0.1:8080:80`). Stellen Sie sicher, dass Sie Ihre Konfiguration **verifizieren**.([verify your setup.](#-monitoring--verification))

## 🛡️ Zugriffskontrollen

Zugriffskontrollen sind ein zentraler Bestandteil der Absicherung Ihrer Docker‑Dienste. Dazu gehören das Einschränken von Container‑Fähigkeiten & Berechtigungen, das Beschränken des Zugriffs auf den Docker‑Socket und mehr.

- [Limiting Container Capabilities](#limiting-container-capabilities)
- [Docker Socket Access](#docker-socket-access)
- [Blocking Country!](#blocking-country)
- [Hardening CloudFlare Proxy Host](#hardening-cloudflare-proxy-host)

### Einschränken von Container‑Fähigkeiten

Eine weitere solide Zugriffskontroll‑Praxis ist das Begrenzen der Fähigkeiten Ihrer Container. Das reduziert den Exploit‑Radius mehrerer Bedrohungen, von Privilegien‑Escalation bis hin zu Traffic‑Hijacking. Es ist kein Schutzschild, aber es entfernt Berechtigungen, die die meisten Container nie benötigen.

**Was sind Fähigkeiten?** Vom Linux‑Kernel definierte, benannte Berechtigungen oder Möglichkeiten. (Die [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) Man‑Page enthält die vollständige Liste.) Dazu gehören z. B. `CAP_CHOWN` (Dateieigentümer ändern), `CAP_NET_ADMIN` (Netzwerkschnittstellen konfigurieren), `CAP_KILL` (beliebige Prozesse beenden) und vieles mehr.

Die beiden Wege, benötigte Fähigkeiten zu ermitteln, sind:

1. **Trial and Error**: Diese langsam‑aber‑effektive Methode lässt Sie ohne Fähigkeiten starten und dann nach und nach hinzufügen, bis die Anwendung läuft.
2. **Vorhandene Arbeit finden**: Suchen Sie nach "`project-name` `cap_drop` Dockerfile" oder "`project-name` `cap_drop` docker-compose.yml", um zu sehen, ob andere das bereits erledigt haben. Ein LLM kann einen Ausgangspunkt vorschlagen, aber behandeln Sie das wie eine Vermutung, bis Sie den Container getestet und die Image‑Dokumentation gelesen haben.

#### Best‑Practice für Fähigkeiten

- **Alle Fähigkeiten entfernen**: Verwenden Sie `cap_drop: [ ALL ]`, um alle Linux‑Fähigkeiten aus dem Container zu entfernen.
- **Keine neuen Privilegien**: Nutzen Sie `security_opt: [ no-new-privileges=true ]`, um zu verhindern, dass der Container neue Privilegien erlangt.

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

Jetzt können Ihre Dienste über das Netzwerk `db-network` miteinander kommunizieren. Docker Compose erzeugt dieses Netzwerk automatisch.

Verwenden Sie die Option `--external`/`external:` um einem **bestehenden Netzwerk** beizutreten. Lassen Sie sie weg, um ein neues Netzwerk zu erstellen.

### Docker‑Socket‑Zugriff

#### ⚠️ Warnung: `docker.sock` ist im Grunde Host‑Administrator‑Zugriff

<blockquote class="inset">⚠️ Die `:ro`‑Option beeinflusst nicht die I/O, die über den Socket gesendet wird!</blockquote>

Sie stellt lediglich sicher, dass der Socket‑Pfad selbst read‑only gemountet wird. Die über diesen Socket gesendeten API‑Aufrufe können weiterhin Container erstellen, Host‑Pfade mounten und andere sehr aufregende Dinge tun, die Sie wahrscheinlich nicht delegieren wollten.

{/* Any process that can "open" the socket can (probably) gain root access on the host. */}

#### Socket‑Best‑Practice

- 🥇 **Vermeiden Sie das Mounten des Docker‑Sockets,** es gibt wahrscheinlich eine bessere Alternative.  
- 🫣 Wenn Sie es unbedingt müssen, **setzen Sie einen engen Proxy davor** und erlauben Sie nur die API‑Endpunkte, die die Anwendung tatsächlich benötigt. Schauen Sie sich das Projekt `docker-socket-proxy` von Tecnativa an, [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Verifizieren Sie anschließend, dass die abgelehnten Aufrufe wirklich abgelehnt werden.  
- 🤢 Okay, _vielleicht_ ist das Teilen in einer sehr **hoch‑vertrauenswürdigen**, **gering‑risikobehafteten** Testumgebung akzeptabel.

#### Blocking Country!

Manchmal nützlich, aber keine echte Sicherheitsgrenze.

_Über die geopolitische Einheit, nicht über die Musik…_

Wenn Sie Apps hauptsächlich für Ihre lokale Familie und Freunde hosten, können Sie den Verkehr aus Ländern blockieren, von denen Sie keinen Traffic erwarten. Oder Sie erlauben nur Verkehr aus Ländern, von denen Sie ihn erwarten. Das reduziert Rauschen; es stoppt keine VPNs, Proxies, Botnetze oder geduldige Angreifer.

Schauen Sie sich dieses Skript an, um den gesamten Verkehr aus China zu blockieren:
```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done
```

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

Ähnlich können Sie nur Verkehr aus den USA zulassen:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Hardening CloudFlare Proxy Host

Wenn Ihr Heim‑Server hinter einer CloudFlare‑IP (Proxy) geschützt ist, können Sie den Zugriff ausschließlich auf CloudFlare‑IPs und Ihr lokales Netzwerk beschränken.

Das ist im Prinzip dasselbe wie bei [Country blocking](#blocking-country) weiter oben, jedoch mit wesentlich strengerer Kontrolle.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Blockiere alles eingehende!!!
ufw default allow outgoing # Erlaube alles ausgehend
ufw allow ssh # Erlaube SSH

# Erlaube Zugriff für lokales Subnetz (idealerweise ein dediziertes DMZ/VLAN für gehostete Dienste)
ufw allow from 10.0.0.0/8 to any port 443
```

# CloudFlare‑IPs zulassen
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# IPv6‑Unterstützung hinzufügen
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Um geo‑basierte Änderungen zu testen, kann ein VPN mit Endpunkten im gewünschten Land hilfreich sein. Weitere Informationen finden Sie im Abschnitt [Monitoring & Verification](#-monitoring--verification).

### Sicherheit auf Anwendungsebene

Nachdem Ihre [Netzwerk‑ und Host‑Umgebung gehärtet ist,](#-network-hazard) werden Sie feststellen, dass noch mehr zu tun ist.

Jetzt müssen wir die „Anwendungs“-Ebene unserer Dienste selbst betrachten.

<p class="inset">Hat diese Datenbank ein gültiges Passwort? Automatisiert dieser Container HTTPS/Zertifikate? Enthält die Anwendung integrierte Authentifizierung? Gibt es Beschränkungen, welche E‑Mails sich anmelden dürfen? Gibt es Standard‑Credentials oder Umgebungsvariablen, die geändert werden müssen?</p>

Der einzige Weg, das _zu wissen_, ist nachzusehen. Beginnen Sie in diesem Fall mit der `README` und anderen Schlüsseldateien wie `docker-compose.yml`, `Dockerfile` und `.env.*`. Sowohl im Projekt selbst als auch idealerweise in den zugehörigen Unterstützungsdiensten (z. B. Postgres, Redis usw.).

#### Reverse Proxy

Eine weitere Verteidigungslinie ist Basic‑Auth. Verwenden Sie es niemals ohne HTTPS. Bei Legacy‑Diensten reicht das Voranstellen von Basic‑Auth vor einer Admin‑Route oft aus, um Drive‑by‑Anfragen und nicht authentifizierte Crawler daran zu hindern, direkt auf das Ziel zuzugreifen.

```nginx

# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}

```

Credentials erzeugen:

```bash

htpasswd -c /etc/nginx/.htpasswd admin

```

Mit einem Basic‑Auth‑Proxy haben Angreifer ein zusätzliches Hindernis — Benutzername und Passwort — bevor sie Ihren internen Dienst erreichen.

Eine weitere Möglichkeit besteht darin, einen Dienst wie [Traefik](https://traefik.io/) oder [Caddy](https://caddyserver.com/) zu nutzen, der HTTPS und Basic‑Auth für Sie automatisiert.

Wenn Sie viele Domains & Dienste über eine GUI verwalten möchten, empfehle ich **[Nginx Proxy Manager](https://nginxproxymanager.com/)**.

## 🔍 Monitoring & Verifikation

- [Check Your Ports](#check-your-ports)
- [View Open Ports](#view-open-ports)
- [File Monitoring](#file-monitoring)

Dies ist der **wichtigste & am häufigsten übersehene Schritt**. Sie können die beste Firewall, das beste Netzwerk und die besten Praktiken haben – aber ohne Verifikation wissen Sie nicht, ob sie tatsächlich funktionieren.

Außerdem kann das Beherrschen weniger Befehle – oder zu wissen, wo man sie nachschlagen kann – den Unterschied zwischen einer verhinderten und einer erfolgreichen Sicherheitslücke ausmachen. Das Gefühl, sich wie ein Hacker zu fühlen, ist nur ein Bonus. (Für Details und Beispiele springen Sie zum Abschnitt [Monitoring & Verification](#-monitoring--verification).)

<p class="inset">Vertrauen ist gut, Verifizieren ist besser</p>

###Prüfen Sie Ihre Ports

<p class="inset">⚠️ WICHTIG: Scannen Sie keine Hosts, die Ihnen nicht gehören.</p>

Egal, ob Sie im Heimnetzwerk oder auf einem VPS arbeiten, Sie müssen wissen, welche Ports nach außen offen sind.

Es gibt 2 Vorgehensweisen:

- Das Netzwerk prüfen (`nmap`, `masscan`)
- Das Betriebssystem befragen (`lsof`, `netstat`, `ss`)

#### Testen außerhalb Ihres Netzwerks

Sie benötigen Ihre aktuelle (öffentliche) IP, die Sie leicht über Dienste wie `ifconfig.me` erhalten: `curl https://ifconfig.me`. Oder schauen Sie im Dashboard Ihres Hosting‑Providers nach.

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

Haben Sie die öffentliche IP, müssen Sie **eine Verbindung zu einem externen Netzwerk herstellen**. Nutzen Sie dazu den Rechner eines Freundes, einen Telefon‑/5G‑Hotspot oder einen dedizierten Server‑Host.

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# Hinweis: Stellen Sie sicher, dass `target_host` die gewünschte IP ist

# Bestimmte Ports scannen:
nmap -A -p 80,443,8080 --open --reason $target_host
# Top‑100‑Ports:
nmap -A --top-ports 100 --open --reason $target_host
# Alle Ports
nmap -A -p1-65535 --open --reason $target_host
```

```

#### Test Inside Your Network

Üben Sie den Einsatz von `nmap`, scannen Sie Ihr lokales Netzwerk oder einen Ihrer Server, prüfen Sie Ihren Router, Drucker, Smart‑Fridge.

{/* Während Port‑Scans ein ständiger Begleiter sind, können sie in den USA gegen das CFAA (Computer Fraud and Abuse Act) verstoßen. Scannen Sie also nur Geräte, die Ihnen gehören. */}

#### Beispiel‑Scan‑Befehle

```bash

# Scannen Sie Ihren localhost nach allen offenen Ports
nmap -sT localhost

# Scannen Sie die private IP Ihres Rechners nach Diensten
nmap -sV 192.168.1.10

# Ermitteln Sie Service‑Details in Ihrem Netzwerk
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# Oder in einem Docker‑Netz 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="nmap Scan" frame="terminal"
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

### View Open Ports

Machen Sie sich mit `lsof` vertraut – es ist auf macOS und Linux verfügbar. Es liefert detaillierte Netzwerk‑ und Festplatten‑Zustandsinformationen.

```bash title="lsof Commands"
# Bestimmten Port überwachen
sudo lsof -i:80 -Pn
```

# ESTABLISHED‑Verbindungen überwachen
sudo lsof -i -Pn | grep ESTABLISHED
# LISTEN‑Zustand anzeigen
sudo lsof -i -Pn | grep LISTEN

# um Netzwerknamen statt IP‑Adressen zu sehen (kann bei Reverse‑DNS‑Lookups sehr langsam werden)
sudo lsof -i -P | grep LISTEN

# Alle Netzwerkverbindungen überwachen
sudo watch -n1 "lsof -i -Pn"

```

#### Beispielausgabe

![nmap scan for listeners](../lsof-scan-listen.webp)

### Datei‑Überwachung

Um zu ermitteln, welche **Prozesse** den meisten **Festplatten‑Durchsatz** verbrauchen, kann `iotop` eingesetzt werden:

```bash

sudo iotop

```

Um einzelne Dateiänderungen zu beobachten, nutzt man unter Linux `inotifywait` oder unter macOS `fswatch`:

Damit lässt sich unautorisiertes oder merkwürdiges Verhalten pro Ordner oder systemweit aufspüren.

```bash

# Alle Dateiänderungen in einem Verzeichnis überwachen
sudo inotifywait -m /path/to/directory

```

Unter macOS kann `fswatch` verwendet werden:

Installation mit `brew install fswatch`

```bash

fswatch -r /path/to/directory
```

```

## ⏰ Oft übersehene Tipps

1. **Rate Limiting** für Authentifizierungsversuche und alle anderen kritischen Endpunkte. Ob über Nginx‑Modul `limit_req` oder `fail2ban` für SSH‑Zugriff – das Drosseln von Brute‑Force‑Versuchen ist *wahrscheinlich* sinnvoll. Ich sage *wahrscheinlich*, weil im Zeitalter von IPv6 und billig‑zu‑erwerbenden Botnetzen das nicht mehr so einfach ist wie früher.

2. **Verwende nach Möglichkeit Read‑Only‑Volumes**:
   ```yaml

services:
     webapp:
       volumes:
         - ./config:/config:ro

```
   In Kombination mit anderen Best Practices (Nicht‑Root‑Benutzer, minimale Ordnerberechtigungen) bietet die `:ro`‑Volume‑Option zusätzlichen Schutz vor versehentlichen Änderungen und einigen Schreibversuchen aus dem Container heraus. Sie schützt den Host nicht vor einem Prozess, der bereits weiterreichende Rechte besitzt.

3. **Auditiere Container‑Zugriffe** regelmäßig.  
   Wenn ein Container keinen Secret, Port oder Mount benötigt, entferne ihn!

4. **Vorsicht vor Wi‑Fi‑Riff‑Raff**  
   Sie würden Ihr Wi‑Fi‑Passwort doch nicht an irgendwelche Fremden weitergeben, oder? Nun, abgesehen von ein paar Freunden … und vielleicht der Familie. Man weiß nie, welche Apps sie nutzen und ob diese Ihre SSID & Passwort nach außen lecken.

### Heimnetzwerk vs. öffentlicher Anbieter vs. Tunneling

1. **Virtuelle Isolation/DMZ**: Für Heimserver sollten sie, wenn möglich, in einem separaten VLAN oder einer DMZ platziert werden. Das hält Ihre internen Geräte vor möglichen Kompromittierungen vom Server aus.
   - Nutzen Sie einen separaten Router oder VLAN für Ihren Heimserver.
   - Nutzen Sie ein separates Wi‑Fi‑Netzwerk für Ihren Heimserver.
   - Nutzen Sie ein separates Subnetz für Ihren Heimserver.

2. **Cloud‑Provider**: Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure und Google Cloud bieten jeweils unterschiedliche Firewall‑Funktionen.  
   - Einige Provider & Dienste blockieren Ports standardmäßig. Andere bieten Opt‑In‑Optionen oder Add‑Ons. Prüfen Sie die Dokumentation Ihres Anbieters.  
   - Viele Anbieter stellen erweiterte Monitoring‑ und Bedrohungserkennungs‑Dienste bereit.

3. **VPNs & Tunneling**: Ziehen Sie eine VPN‑ähnliche Lösung oder einen Tunneling‑Dienst in Betracht, um Dienste sicher über das Internet zu verbinden, ohne sie öffentlich zugänglich zu machen.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.

{/* 3. **Absicherung gegen interne/laterale Angriffe**: Ein infiziertes Gerät kann ein gesamtes Netzwerk kompromittieren. Das Segmentieren von Docker‑Diensten in benutzerdefinierten Netzwerken, der Einsatz von Hardware‑Firewalls, UFW‑Regeln und das Blockieren nicht benötigter Ports können das Risiko reduzieren (sofern korrekt konfiguriert). */}

## 🚀 Produktions‑Checkliste

- [ ] **Secrets**: Alle Geheimnisse zufällig erzeugt und sicher gespeichert  
- [ ] **Updates**: Container‑Update‑Strategie dokumentiert und automatisiert. (In Ordnung, wenn es nur ein paar Befehle in einer Textdatei sind.)  
- [ ] **Network**: Nur notwendige Ports geöffnet, interne Netzwerke eingerichtet.  
- [ ] **Firewall Rules**: Standard‑Deny, explizite Allow‑Regeln, ggf. Länder‑Blockierungen.  
- [ ] **Reverse Proxy**: Nginx, Caddy oder Traefik können eine Basis‑Authentifizierung hinzufügen.  
- [ ] **Canary Tokens**: Platzieren Sie sie in der Nähe sensibler Dateien und Zugangsdaten, die Sie tatsächlich prüfen würden, wenn sie berührt werden.  
- [ ] **Monitoring**: Kennen Sie Ihre Systeme mit `nmap`, `lsof`, `inotifywait`, `glances` usw.  
- [ ] **Backup Strategy**: Getestet, vorzugsweise automatisiert und extern gesichert.  
- [ ] **Least Privilege**: Nicht‑Root‑Container‑User, schreibgeschützte Volumes.

## 📚 Weiterführende Literatur

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org für Canary Tokens](https://canarytokens.org/)

## Danke

Ein Gruß an einige engagierte Redditor*innen:

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) – [Thread](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

Danke fürs Lesen! Ich hoffe, der Leitfaden war nützlich. Bei Fragen oder Anregungen melden Sie sich gern über meine Social‑Media‑Profile unten, oder klicken Sie auf den `Edit on GitHub`‑Link, um einen PR zu öffnen! ❤️
````
