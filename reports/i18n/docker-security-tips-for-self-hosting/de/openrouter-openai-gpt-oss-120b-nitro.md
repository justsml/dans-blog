# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 30.63
- Input tokens: 26959
- Output tokens: 10068
- Thinking tokens: unknown
- Cached input tokens: 6656
- Cache write tokens: 0
- Estimated cost: $0.002864
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale de
## Raw Output

````mdx
---
title: Wesentliche Docker‑Sicherheitstipps für das Selbsthosting
subTitle: Sichern Sie Ihre selbstgehosteten Dienste – von Abwehr bis Überwachung!
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
- 🔄 [Der `:latest`‑Tanz](#-the-latest-dance)
- 🔐 [Geheimnisverwaltung: Der richtige Weg](#-secrets-management)
- 🌐 [Netzwerkgefahr](#-network-hazard)
- 🛡️ [Zugriffskontrollen](#️-access-controls)
- 🔍 [Überwachung & Verifikation](#-monitoring--verification)
- ⏰ [Oft übersehene Tipps](#-often-overlooked-tips)
- 🚀 [Produktions‑Checkliste](#-production-checklist)
- 📚 [Weiterführende Literatur](#-further-reading)

## 🧗‍♀️ Für die Mutigen

Wenn Sie Docker‑Dienste selbst hosten, liegt die Sicherheit komplett in Ihrer Hand – es gibt keinen Cloud‑Provider, der Sie vor Port‑Scans oder schlampiger Konfiguration schützt. Egal, ob Sie Anwendungen im heimischen Netzwerk starten oder VPS‑Instanzen bei Anbietern wie Vultr, DigitalOcean, Linode, AWS, Azure oder Google Cloud mieten, Sie müssen alles absichern – und nachweisen, dass es korrekt geschehen ist.

In diesem Leitfaden gehen wir die Docker‑Sicherheit Schritt für Schritt durch – von weniger bekannten bis hin zu schwer richtig umzusetzenden Techniken; wir untersuchen Canary‑Tokens, schreibgeschützte Volumes, Firewall‑Regeln, Netzwerksegmentierung & Hardening, das Hinzufügen authentifizierter Proxys und mehr.

Wir vergleichen außerdem Heimnetzwerke mit öffentlichen Cloud‑Setups und zeigen, wie man einen Basic‑Auth‑Proxy mit Nginx einrichtet. Am Ende haben Sie mehrere Optionen, um das Gesindel (Freunde, Familie und manchmal sogar Sie selbst…) fernzuhalten.

Das ist eine Menge Stoff! Aber vieles hängt zusammen, und Sie können auswählen, was für Ihre Umgebung am relevantesten ist. 🍀

## 🔄 Der `:latest`‑Tanz

Images aktuell zu halten ist für die Sicherheit entscheidend. Die ausschließliche Nutzung von `:latest` kann jedoch zu Breaking Changes oder verwundbaren Builds führen, ohne dass ein Review‑Schritt erfolgt.

### Der sichere Weg zum Update

Kombinieren Sie Update‑Befehle mit `pull` oder `build`, sodass Sie Images bewusst neu holen, und starten Sie dann innerhalb eines Fensters neu, in dem Sie etwaige Fehler bemerken.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Version-Pinning vs. Latest

Die Wahl der richtigen Version zum Pinnen ist ein Balanceakt zwischen Stabilität und Sicherheit. Hier einige gängige Strategien:

```yaml
# docker-compose.yml
# ...
  # Exaktes Version‑Pinning, ideal für kritische Dienste
  image: postgres:17.2

  # Patch‑Version‑Pinning, gut für nicht‑kritische Dienste
  image: postgres:17.2

  # Major‑Version‑Pinning, perfekt für Hobby‑Projekte
  image: postgres:17

  # Yolo, nach Möglichkeit vermeiden
  image: postgres:latest
```

Verwenden Sie [Dependabot](https://github.com/features/security) oder [Renovate](https://github.com/renovatebot/renovate), um prüfbare Update‑PRs zu öffnen. Für alles, das Sie um 2 Uhr morgens nicht neu bauen wollen, pinnen Sie auf eine konkrete Version oder einen Digest und lassen Sie die Automation Ihnen sagen, wann ein Wechsel sinnvoll ist.

_Lassen Sie mich wissen, welche Werkzeuge Sie zum Aktualisieren von Docker‑Images bevorzugen!_

## 🔐 Secrets‑Management

- [Starke Secrets erzeugen](#generate-strong-secrets)
- [Canary Tokens](#canary-tokens)
- [Upgrade von `.env` zu macOS‑Schlüsselbund](#upgrade-from-env-to-macos-keychain)
{/* - [Placeholder Validation](#placeholder-validation) */}

Es gibt zahlreiche Methoden, Secrets zu verwalten, aber eine der wichtigsten Regeln, an die man sich halten muss, lautet: **Nie Secrets in Docker‑Images hardcoden oder sie ins Git committen.** Das ist einer der häufigsten Sicherheitsfehler, birgt ein langfristiges Risiko und ist mühsam zu beheben.

Secrets sicher zu speichern ist ein umfangreiches Thema mit vielen Optionen, von `.env`‑Dateien, [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), bis hin zu einem Secrets‑Manager wie [HashiCorp Vault](https://www.vaultproject.io/) oder AWS Secrets Manager.

Sie müssen das für Ihren Anwendungsfall „richtige“ Verhältnis von Aufwand und Sicherheit wählen.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Placeholder Validation

<blockquote>You wouldn't believe how easy it is to hack a JWT token when the secret isn't secret!</blockquote>
}

<p className='inset'>💡 Stellen Sie sicher, dass Geheimnisse immer eindeutig sind. Machen Sie es unmöglich, mit unsicheren/hartkodierten Vorgaben zu starten.</p>

Wenn Sie Platzhalter wie `__WARNING_REPLACE_ME__` in Ihren Geheimnissen verwenden, großartig – vielleicht bemerkt es ja jemand!

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

### Starke Geheimnisse generieren

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

[**Canary Tokens**](https://canarytokens.org/) sind ein effektiver Weg, um festzustellen, ob Ihre Geheimnisse kompromittiert (und verwendet) wurden. Sie funktionieren wie ein Stolperdraht, den Sie zu beliebigen sensiblen Dateien, URLs und Tokens hinzufügen können.

Setzen Sie sie neben den Geheimnissen ein, über die Sie sich tatsächlich Sorgen machen: `.env`‑Dateien, CI‑Variablen, Passwort‑Manager, Backup‑Ordner und Cloud‑Anmeldedaten. Machen Sie daraus kein Theater; platzieren Sie Stolperdrähte dort, wo ein echter Angreifer oder ein zukünftiges Ich sie berühren würde.

Es gibt zahlreiche Arten von Canary‑„Tokens“, aus denen Sie wählen können, etwa AWS‑Tokens, [gefälschte Kreditkartennummern](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), Excel‑ und Word‑Dateien, Kubeconfig‑Dateien, VPN‑Anmeldedaten – sogar SQL‑Dump‑Dateien können einen Stolperdraht enthalten!

#### Best Practices für Canary‑Tokens

- **Überall platzieren**: In jeder `.env`‑Datei, CI/CD‑Pipeline und jedem „Secrets‑Manager“, an den Sie denken können.  
  - Legen Sie eine `passwords.xlsx`‑ oder `passwords.docx`‑Datei in Ihrem Home‑Verzeichnis ab.  
  - Fügen Sie ein AWS‑Profil `billing_prod` hinzu, bei dem das Secret ein Canary‑Token ist.  
  - Erzeugen Sie eine `private.key`‑Datei für Ihr Verzeichnis `~/.ssh`.  
  - Erstellen Sie einen Canary‑SQL‑Dump `all_credit_cards.sql` in Ihrem Verzeichnis `~/backups`.  
- **Überwachen**: Richten Sie E‑Mail‑Regeln/Alarme ein, um zu erkennen, wenn ein Canary‑Token ausgelöst wird.

### Upgrade von `.env` zu macOS‑Keychain

Für macOS‑Nutzer ist eine der einfachsten Optionen die Verwendung der Keychain.

Hier ein unkomplizierter Weg, Secrets aus der macOS‑Keychain zu laden, Touch ID zu unterstützen und etwas sicherer zu sein als `.env`‑Dateien.

Der ursprüngliche <cite>Credit geht an [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) und [Jan Schaumann](https://www.netmeister.org/)</cite>

<CodeTabs client:load tabs={[
  "Helper commands",
  "Persist secrets in environment",
  "Use secrets per command"]
}>
```bash title="keychain-secrets.sh"
### Funktionen zum Setzen und Abrufen von Umgebungsvariablen aus der macOS‑Keychain ###
### Adapted from: https://www.netmeister.org/blog/keychain-passwords.html and 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# Verwendung: get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Verwendung: set-keychain-secret SECRET_ENV_VAR
# Sie werden aufgefordert, den Secret‑Wert einzugeben!
function set-keychain-secret () {
    [ -n "$1" ] || print "Missing environment variable name"
    
    # Benutzer nach Secret fragen
    echo -n "Enter secret for ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Env‑Variablen in die aktuelle Shell laden
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Hinweis: Wenn ein Angreifer `env` in Ihrer Shell ausführen kann, könnten diese Secrets offengelegt werden!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Alle Secrets für dieses Projekt angeben
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Hinweis: Ein Shell‑Wrapper verhindert, dass Secrets im Environment verbleiben.
# Und das Skript kann sicher versioniert werden.

# Verwendung:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY …
```
</CodeTabs>

## 🌐 Netzwerkgefahr

### Benutzerdefinierte Netzwerke & interne Ports

Die korrekte Isolation von Diensten über Docker‑Netzwerke ist ein wichtiger Ansatz, um die Angriffsfläche zu verkleinern.

Vorsicht beim Durchstechen von Löchern im Netzwerk! Ein falsch konfiguriertes Port‑Forwarding kann schnell zu ernsthaften Problemen führen.

Standardmäßig werden Dienste in einem privaten LAN nicht ins Internet gestellt – Sie müssen Ports explizit am Router weiterleiten.

### Docker im LAN

Ob Sie ein Entwickler sind, der lokale Entwicklungs‑Server betreibt, oder Dienste aus Ihrem heimischen Netzwerk selbst hosten, **Annahmen über Docker‑Netzwerkmodelle können schnell zu Problemen führen.**

Entwickler staunen häufig, dass die „traditionellen“ Methoden zur Sicherung von Linux‑Servern (`iptables`, Einschränkung von tcp/ip‑sysctl‑Optionen) **stillschweigend fehlschlagen** auf Docker‑Hosts! Das trifft besonders zu, wenn **Sie selbst hosten oder ein typisches Heimnetzwerk verwenden.** (Für die Hinteren: Das kann den Zugriff auf Entwicklungs‑Container auf Ihrem MacBook ermöglichen!!!)

> ⚠️ **Warnung #1:** Von Docker veröffentlichte Ports können die Firewall‑Regeln umgehen, von denen Sie dachten, sie schützen den Host, besonders bei UFW auf Ubuntu/Debian. Das macht nicht jede Firewall‑Regel nutzlos, aber es bedeutet, dass „UFW sagt deny“ kein Beweis ist. [Siehe Issue #690: Docker bypasses ufw firewall rules](https://github.com/moby/moby/issues/690).

> ⚠️ **Warnung #2:** Das Binden von Ports an lokale IP‑Adressen (z. B. `-p 127.0.0.1:8080:80`) ist die richtige Vorgabe, doch Docker‑Engine‑Versionen vor 28.0.0 hatten Fälle, in denen Hosts im selben L2‑Netzwerk noch auf localhost‑veröffentlichte Ports zugreifen konnten. [Docker dokumentiert diese Einschränkung in seinem Leitfaden zur Port‑Veröffentlichung](https://docs.docker.com/engine/network/port-publishing/), und die unten beschriebene „verify‑with‑nmap“-Gewohnheit bleibt wichtig.

<p class="inset">Wenn Sie das überrascht, Ihnen geht es genauso!</p>

**Das Binden an lokale IPs bleibt eine gute Praxis** und hat eine spürbare Wirkung in **verwalteten Cloud‑Umgebungen und speziell konfigurierten Netzwerken.** 
{/* Betrachten Sie Ihre Firewall oder Ihr privates Netzwerk nicht als einzige oder hauptsächliche Verteidigung, fügen Sie Docker‑Netzwerke hinzu für bessere **Isolation**, und prüfen Sie immer, ob Sie Ports überhaupt öffnen müssen. */}

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

Wie bei allen Sicherheitsmaßnahmen ist es entscheidend, dass Sie **Testen und Verifizieren** Ihrer Netzwerkkonfiguration. */}

{/* Während Netzwerksicherheit & Auditing in den meisten Unternehmen Vollzeit‑Aufgabe ist, verbringen die meisten Self‑Host‑Leute KEINE Zeit damit! */}

{/* Schauen Sie, ich verstehe das – es kann einschüchternd wirken. _(Subnetze, Netzmasken, CIDR, VLANs und Routing‑Tabellen, oh je! Wenn das keinen Sinn ergibt, ist das okay, Sie sind hier genau richtig. Und wir müssen uns jetzt nicht mit all dem beschäftigen.)_ */}

### Netzwerk‑Best‑Practices

- 🏆 **Keine Ports veröffentlichen** – Kürzlich habe ich gelernt, dass das nützlicher ist, als man denkt! Bei Verwendung eines benannten (Bridge‑)Netzwerks haben Container ungefilterten Zugriff aufeinander. Sie verhalten sich, als befänden sie sich hinter einem lokalen Netzwerk (NAT‑Gateway).
  - Nicht in allen Anwendungsfällen möglich, aber praktisch für Container, die Batch‑Jobs ausführen oder hauptsächlich über `attach` / `exec` angesprochen werden.
- 🥇 **Docker‑Netzwerke verwenden** – zur Isolation und Steuerung, welche Container miteinander kommunizieren dürfen.
- 🥉 **Localhost‑Binding** – Obwohl [unvollkommen](https://github.com/moby/moby/issues/45610), ist es im Allgemeinen besser, Ports an eine Loopback‑Adresse zu binden (z. B. `127.0.0.1:8080:80`). Stellen Sie nur sicher, dass Sie Ihre Konfiguration [verifizieren.](#-monitoring--verification)

## 🛡️ Zugriffs‑Kontrollen

Zugriffskontrollen sind ein zentraler Bestandteil der Absicherung Ihrer Docker‑Dienste. Dazu gehören das Einschränken von Container‑Fähigkeiten & Berechtigungen, das Beschränken des Zugriffs auf den Docker‑Socket und mehr.

- [Container‑Fähigkeiten einschränken](#limiting-container-capabilities)
- [Docker‑Socket‑Zugriff](#docker-socket-access)
- [Länder‑Blockierung!](#blocking-country)
- [Hardening CloudFlare Proxy Host](#hardening-cloudflare-proxy-host)

### Container‑Fähigkeiten einschränken

Eine weitere solide Zugriffskontroll‑Praxis ist das Begrenzen der Fähigkeiten Ihrer Container. Das reduziert den Exploit‑Blast‑Radius bei Bedrohungen wie Privilegien‑Escalation oder Traffic‑Hijacking. Es ist kein Kraftfeld, aber es entfernt Berechtigungen, die die meisten Container nie benötigen.

**Was sind Fähigkeiten?** Vom Linux‑Kernel definierte, benannte Berechtigungen oder Fähigkeiten. (Die Man‑Page [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) enthält die vollständige Liste.) Dazu gehören z. B. `CAP_CHOWN` (Dateieigentümer ändern), `CAP_NET_ADMIN` (Netzwerkschnittstellen konfigurieren), `CAP_KILL` (beliebigen Prozess beenden) und viele mehr.

Die beiden Wege, benötigte Fähigkeiten zu bestimmen, sind:

1. **Trial‑and‑Error** – Diese langsam‑aber‑effektive Methode lässt Sie ohne Fähigkeiten starten und sie dann einzeln hinzufügen, bis die Anwendung funktioniert.
2. **Vorhandene Arbeit finden** – Suchen Sie nach "`project-name` `cap_drop` Dockerfile" oder "`project-name` `cap_drop` docker-compose.yml", um zu sehen, ob andere das bereits erledigt haben. Ein LLM kann einen Ausgangspunkt vorschlagen, aber behandeln Sie das als Vermutung, bis Sie den Container testen und die Image‑Dokumentation lesen.

#### Best‑Practice für Fähigkeiten

- **Alle Fähigkeiten entfernen** – Verwenden Sie `cap_drop: [ ALL ]`, um alle Linux‑Fähigkeiten aus dem Container zu entfernen.
- **Keine neuen Privilegien** – Setzen Sie `security_opt: [ no-new-privileges=true ]`, um zu verhindern, dass der Container neue Privilegien erlangt.

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

Jetzt können Ihre Services über das Netzwerk `db-network` miteinander kommunizieren. Docker‑Compose erzeugt dieses Netzwerk automatisch.

Verwenden Sie die Option `--external` / `external:`, um einem **bestehenden Netzwerk** beizutreten. Lassen Sie sie weg, um ein neues Netzwerk zu erstellen.

### Docker‑Socket‑Zugriff

#### ⚠️ Warnung: `docker.sock` ist im Wesentlichen Host‑Admin‑Zugriff

<blockquote class="inset">⚠️ Die Option `:ro` beeinflusst nicht die I/O, die über den Socket gesendet wird!</blockquote>

Sie sorgt lediglich dafür, dass der Socket‑Pfad selbst read‑only gemountet wird. Die über diesen Socket gesendeten API‑Aufrufe können weiterhin Container erstellen, Host‑Pfade mounten und andere sehr aufregende Dinge tun, die Sie wahrscheinlich nicht delegieren wollten.

{/* Any process that can "open" the socket can (probably) gain root access on the host. */}

#### Socket‑Best‑Practice

- 🥇 **Vermeiden Sie das Mounten des Docker‑Sockets**, es gibt wahrscheinlich eine bessere Alternative.  
- 🫣 Wenn Sie es unbedingt benötigen, **setzen Sie einen schmalen Proxy davor** und erlauben Sie nur die API‑Endpunkte, die die Anwendung tatsächlich nutzt. Schauen Sie sich das Projekt `docker-socket-proxy` von Tecnativa an, [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Verifizieren Sie anschließend, dass die abgelehnten Aufrufe tatsächlich blockiert werden.  
- 🤢 Okay, _vielleicht_ ist das Teilen in einer sehr **hoch‑vertrauenswürdigen**, **gering‑risikobehafteten** Testumgebung akzeptabel.  

#### Blocking Country!

Manchmal nützlich, aber keine echte Sicherheitsgrenze.

_Über die geopolitische Einheit, nicht über die Musik…_

Wenn Sie Anwendungen hauptsächlich für Ihre lokale Familie und Freunde hosten, können Sie den Verkehr aus Ländern blockieren, von denen Sie keinen Traffic erwarten. Oder Sie erlauben nur Verkehr aus den Ländern, von denen Sie ihn erwarten. Das reduziert Rauschen; es stoppt keine VPNs, Proxies, Botnetze oder geduldige Angreifer.

Schauen Sie sich dieses Skript an, um gesamten Traffic aus China zu blockieren:

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

Ähnlich können Sie nur Verkehr aus den USA zulassen:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### CloudFlare‑Proxy‑Host härten

Wenn Ihr Heim‑Server hinter einer CloudFlare‑IP (Proxy) geschützt ist, können Sie den Zugriff ausschließlich auf CloudFlare‑IPs und Ihr lokales Netzwerk beschränken.

Das ist dem Abschnitt [Country blocking](#blocking-country) oben ähnlich, bietet jedoch wesentlich strengere Kontrolle.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Blockiere gesamten eingehenden Verkehr!!!
ufw default allow outgoing # Erlaube gesamten ausgehenden Verkehr
ufw allow ssh # Erlaube SSH

# Zugriff für lokales Subnetz erlauben (idealerweise dedizierte DMZ/VLAN für gehostete Dienste)
ufw allow from 10.0.0.0/8 to any port 443
```

# CloudFlare‑IPs zulassen
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# IPv6‑Unterstützung hinzufügen
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Um geo‑basierte Änderungen zu testen, kann ein VPN mit Standorten im gewünschten Land hilfreich sein. Siehe dazu den Abschnitt [Überwachung & Verifizierung](#-monitoring--verification).

### Sicherheit auf Anwendungsebene

Nachdem Ihr [Netzwerk und Host gehärtet sind,](#-network-hazard) werden Sie feststellen, dass noch mehr zu tun ist.

Jetzt müssen wir die „Anwendungsebene“ unserer Dienste selbst betrachten.

<p class="inset">Hat diese Datenbank ein gültiges Passwort? Automatisiert dieser Container HTTPS/Zertifikate? Enthält die Anwendung integrierte Authentifizierung? Gibt es Beschränkungen, welche E‑Mails sich registrieren dürfen? Gibt es Standard‑Credentials oder Umgebungsvariablen, die geändert werden müssen?</p>

Der einzige Weg, das _zu wissen_, ist nachzusehen. Beginnen Sie in diesem Fall mit der `README` und anderen Schlüsseldateien wie `docker-compose.yml`, `Dockerfile` und `.env.*`. Sowohl im Projekt selbst als auch idealerweise in den zugehörigen Diensten (z. B. Postgres, Redis usw.).

#### Reverse Proxy

Eine weitere Verteidigungsebene ist Basic‑Auth. Verwenden Sie sie nicht ohne HTTPS. Bei Legacy‑Diensten reicht das Voranstellen von Basic‑Auth vor einer Admin‑Route oft aus, um Drive‑by‑Anfragen und nicht authentifizierte Crawler daran zu hindern, das Ziel direkt zu erreichen.

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

Mit einem Basic‑Auth‑Proxy haben Angreifer ein zusätzliches Hindernis – Benutzername und Passwort – bevor sie Ihren internen Dienst erreichen.

Eine Alternative ist die Nutzung eines Services wie [Traefik](https://traefik.io/) oder [Caddy](https://caddyserver.com/), die HTTPS und Basic‑Auth für Sie automatisieren.

Wenn Sie viele Domains & Dienste über eine GUI verwalten möchten, empfehle ich **[Nginx Proxy Manager](https://nginxproxymanager.com/)**.

## 🔍 Monitoring & Verification

- [Check Your Ports](#check-your-ports)
- [View Open Ports](#view-open-ports)
- [File Monitoring](#file-monitoring)

Das ist der **wichtigste & am häufigsten übersehene Schritt**. Sie können die beste Firewall, das beste Netzwerk und die besten Praktiken haben – aber ohne Verifizierung wissen Sie nicht, ob etwas funktioniert.

Ein paar Befehle zu kennen – oder zu wissen, wo man sie nachschlagen kann – kann den Unterschied zwischen einem verhinderten Einbruch und einem erfolgreichen Angriff ausmachen. Das Gefühl, sich wie ein Hacker zu fühlen, ist dabei nur ein Bonus. (Für Details und Beispiele springen Sie weiter zum Abschnitt **[Monitoring & Verification](#-monitoring--verification)**.)

<p class="inset">Don’t Trust, Verify Twice</p>

### Prüfen Sie Ihre Ports

<p class="inset">⚠️ WICHTIG: Scannen Sie keine Hosts, die Ihnen nicht gehören.</p>

Egal, ob Sie im Heimnetzwerk oder auf einem VPS arbeiten, Sie wollen wissen, welche Ports nach außen offen sind.

Es gibt 2 Vorgehensweisen:

- Das Netzwerk prüfen (`nmap`, `masscan`)
- Das Betriebssystem abfragen (`lsof`, `netstat`, `ss`)

#### Testen außerhalb Ihres Netzwerks

Sie benötigen Ihre aktuelle (öffentliche) IP, die Sie leicht über Dienste wie `ifconfig.me` erhalten: `curl https://ifconfig.me`. Oder schauen Sie sie im Dashboard Ihres Hosting‑Providers nach.

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

Sobald Sie Ihre öffentliche IP haben, müssen Sie **eine Verbindung zu einem externen Netzwerk herstellen**. Nutzen Sie dazu den Rechner eines Freundes, einen Telefon‑/5G‑Hotspot oder einen dedizierten Server‑Host.

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# Hinweis: Stellen Sie sicher, dass `target_host` die gewünschte IP ist

# Bestimmte Ports scannen:
nmap -A -p 80,443,8080 --open --reason $target_host
# Top‑100‑Ports:
nmap -A --top-ports 100 --open --reason $target_host
# Alle Ports:
nmap -A -p1-65535 --open --reason $target_host
```

#### Test Inside Your Network

Üben Sie den Einsatz von `nmap`, scannen Sie Ihr lokales Netzwerk oder einen Ihrer Server, prüfen Sie Ihren Router, Drucker, Smart‑Fridge.

{/* Während Port‑Scans ein ständiger Begleiter sind, können sie in den USA nach dem CFAA (Computer Fraud and Abuse Act) eine Rechtsverletzung darstellen. Scannen Sie also nur Geräte, die Ihnen gehören. */}

#### Example Scan Commands

```bash

# Scan your localhost for all open ports
nmap -sT localhost

# Scan your machine’s private IP for services
nmap -sV 192.168.1.10

# Find service details on your network
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# Or on a docker 172.18.0.1/16
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

Machen Sie sich mit `lsof` vertraut – es ist auf macOS und Linux verfügbar. Es liefert detaillierte Informationen zum Netzwerk‑ und Festplatten‑Zustand.

```bash title="lsof Commands"
# Monitor specific port
sudo lsof -i:80 -Pn
```

# ESTABLISHED‑Verbindungen überwachen
sudo lsof -i -Pn | grep ESTABLISHED
# LISTEN‑Zustand anzeigen
sudo lsof -i -Pn | grep LISTEN

# Netzwerk‑Namen statt IP‑Adressen anzeigen (kann bei Reverse‑DNS‑Lookups sehr langsam sein)
sudo lsof -i -P | grep LISTEN

# Alle Netzwerkverbindungen überwachen
sudo watch -n1 "lsof -i -Pn"

```

#### Beispielausgabe

![nmap‑Scan für Listener](../lsof-scan-listen.webp)

### Datei‑Überwachung

Um zu ermitteln, welche **Prozesse** den meisten **Festplatten‑Durchsatz** verbrauchen, kann `iotop` verwendet werden:

```bash
sudo iotop
```

Um einzelne Dateiänderungen zu beobachten, nutzt man unter Linux `inotifywait` und unter macOS `fswatch`:

Damit lassen sich unautorisierte oder ungewöhnliche Aktivitäten pro Verzeichnis oder systemweit erkennen.

```bash
# Alle Dateiänderungen in einem Verzeichnis überwachen
sudo inotifywait -m /path/to/directory
```

Unter macOS kann `fswatch` eingesetzt werden:

Installation mit `brew install fswatch`

```bash
fswatch -r /path/to/directory
```

```

## ⏰ Oft übersehene Tipps

1. **Rate Limiting** für Authentifizierungsversuche und alle anderen kritischen Endpunkte. Ob über Nginx‑Modul `limit_req` oder `fail2ban` für SSH‑Zugriff – das Drosseln von Brute‑Force‑Versuchen ist _wahrscheinlich_ sinnvoll. Ich sage _wahrscheinlich_, weil im Zeitalter von IPv6 und billigen Botnetzen das Risiko nicht mehr das gleiche ist wie früher.

2. **Read‑Only‑Volumes** wo immer möglich einsetzen:
   ```yaml

services:
     webapp:
       volumes:
         - ./config:/config:ro

```
   In Kombination mit anderen Best Practices (nicht‑Root‑Benutzer, minimale Ordnerberechtigungen) liefert die Mount‑Option `:ro` zusätzlichen Schutz vor versehentlichen Änderungen und einigen Schreibversuchen aus dem Container heraus. Sie schützt den Host nicht vor einem Prozess, der bereits weiterreichende Privilegien besitzt.

3. **Container‑Zugriff regelmäßig auditieren.**  
   Wenn ein Container kein Secret, keinen Port oder kein Mount benötigt, entfernen Sie es!

4. **Vorsicht bei Wi‑Fi‑Unsicherheiten**  
   Sie geben Ihr Wi‑Fi‑Passwort sicher nicht an Fremde weiter, oder? Nun ja, vielleicht an ein paar Freunde … und eventuell an die Familie. Man weiß nie, welche Apps sie installiert haben und ob diese SSID & Passwort nach außen lecken.

### Heimnetzwerk vs. öffentlicher Provider vs. Tunneling

1. **Virtuelle Isolation/DMZ**: Für Heimserver sollten Sie sie, wenn möglich, in ein separates VLAN oder eine DMZ stellen. So bleiben Ihre internen Geräte vor einem möglichen Kompromittieren vom Server aus geschützt.  
   - Verwenden Sie einen separaten Router oder ein separates VLAN für Ihren Heimserver.  
   - Nutzen Sie ein separates Wi‑Fi‑Netzwerk für Ihren Heimserver.  
   - Verwenden Sie ein separates Subnetz für Ihren Heimserver.

2. **Cloud‑Anbieter**: Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure und Google Cloud bieten jeweils unterschiedliche Firewall‑Funktionen.  
   - Einige Anbieter & Dienste blockieren Ports standardmäßig. Andere bieten Opt‑ins oder Add‑ons. Prüfen Sie die Dokumentation Ihres Anbieters.  
   - Viele Anbieter stellen erweiterte Monitoring‑ und Threat‑Detection‑Dienste bereit.

3. **VPNs & Tunneling**: Ziehen Sie eine VPN‑ähnliche Lösung oder einen Tunneling‑Dienst in Betracht, um Dienste sicher über das Internet zu verbinden, ohne sie öffentlich zugänglich zu machen.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.

{/* 3. **Hardening Against Internal/Lateral Attacks**: One infected device can compromise an entire network. Segmenting Docker services on custom networks, using hardware, UFW rules, and blocking unneeded ports can all help reduce risk (when properly configured.) */}

## 🚀 Produktions‑Checkliste

- [ ] **Secrets**: Alle Secrets zufällig generiert und sicher gespeichert  
- [ ] **Updates**: Container‑Update‑Strategie dokumentiert und automatisiert. (In Ordnung, wenn es nur ein paar Befehle in einer Textdatei sind.)  
- [ ] **Network**: Nur notwendige Ports freigegeben, interne Netzwerke eingerichtet.  
- [ ] **Firewall‑Regeln**: Default‑Deny, explizite Allow‑Einträge, ggf. Ländersperren.  
- [ ] **Reverse Proxy**: Nginx, Caddy oder Traefik können eine Schicht Basic‑Auth hinzufügen  
- [ ] **Canary Tokens**: In der Nähe sensibler Dateien und Anmeldedaten platzieren, die Sie tatsächlich untersuchen würden, wenn sie berührt werden.  
- [ ] **Monitoring**: Kennen Sie Ihre Systeme mit `nmap`, `lsof`, `inotifywait`, `glances` usw.  
- [ ] **Backup‑Strategie**: Getestet, vorzugsweise automatisiert und extern gesichert.  
- [ ] **Least Privilege**: Nicht‑Root‑Container‑Benutzer, read‑only Volumes.

## 📚 Weiterführende Literatur

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org für Canary Tokens](https://canarytokens.org/)

## Danke

Ein Gruß an ein paar engagierte Redditor*innen:

- <em className="cite">[u/JCBbird1012](https://www.reddit.com/user/JCBird1012/) – [Thread](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

Danke fürs Lesen! Ich hoffe, der Leitfaden war hilfreich. Bei Fragen oder Anregungen einfach über meine Social‑Media‑Kanäle unten melden oder den `Edit on GitHub`‑Link klicken, um einen PR zu erstellen! ❤️
````
