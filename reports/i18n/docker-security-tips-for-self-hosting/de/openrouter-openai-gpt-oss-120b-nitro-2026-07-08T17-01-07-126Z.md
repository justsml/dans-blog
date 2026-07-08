# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: de
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx
- Validation: deferred
- Runtime seconds: 14.89
- Input tokens: 27022
- Output tokens: 10177
- Thinking tokens: unknown
- Cached input tokens: 13568
- Cache write tokens: 0
- Estimated cost: $0.002886
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Wichtige Docker‑Sicherheitstipps für das Selbsthosting
subTitle: 'Sichern Sie Ihre selbstgehosteten Dienste, von der Abwehr bis zur Überwachung!'
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
import {CodeTabs} from '../../../../components/CodeTabs';

**Inhaltsverzeichnis**

- 🧗‍♀️ [Für die Mutigen](#️-für-die-mutigen)
- 🔄 [Der `:latest`‑Tanz](#-der-latest-tanz)
- 🔐 [Secrets‑Management: Der richtige Weg](#-secrets-management-der-richtige-weg)
- 🌐 [Netzwerk‑Gefahr](#-netzwerk-gefahr)
- 🛡️ [Zugriffskontrollen](#️-zugriffskontrollen)
- 🔍 [Monitoring & Verifikation](#-monitoring--verifikation)
- ⏰ [Oft übersehene Tipps](#-oft-übersehene-tipps)
- 🚀 [Produktions‑Checkliste](#-produktions-checkliste)
- 📚 [Weiterführende Literatur](#-weiterführende-literatur)

## 🧗‍♀️ Für die Mutigen

Wenn Sie Docker‑Dienste selbst hosten, liegt die Sicherheit komplett in Ihrer Hand – es gibt keinen Cloud‑Provider, der Sie vor Port‑Scans oder schlampiger Konfiguration schützt. Egal, ob Sie Anwendungen im heimischen Netzwerk starten oder VPSs bei Anbietern wie Vultr, DigitalOcean, Linode, AWS, Azure oder Google Cloud mieten, Sie müssen das System absichern – und prüfen, ob Sie es richtig gemacht haben.

In diesem Leitfaden gehen wir die Docker‑Sicherheit Schritt für Schritt durch – von weniger bekannten bis zu schwer korrekt umzusetzenden Techniken; wir betrachten Canary‑Tokens, schreibgeschützte Volumes, Firewall‑Regeln, Netzwerk‑Segmentierung & Hardening, authentifizierte Proxies und mehr.

Wir vergleichen außerdem Heimnetzwerke mit öffentlichen Cloud‑Setups und zeigen, wie man einen Basic‑Auth‑Proxy mit Nginx einrichtet. Am Ende haben Sie mehrere Optionen, um Unbefugte (Freunde, Familie und manchmal sogar Sie selbst…) fernzuhalten.

Das ist eine Menge Stoff! Aber vieles lässt sich kombinieren, und Sie können auswählen, was für Ihre Umgebung am relevantesten ist. 🍀

## 🔄 Der `:latest`‑Tanz

Images aktuell zu halten ist für die Sicherheit entscheidend. Die Verwendung von `:latest` kann jedoch zu Breaking Changes oder verwundbaren Builds führen, ohne dass ein Review‑Schritt stattfindet.

### Der sichere Weg zum Update

Kombinieren Sie Update‑Befehle mit `pull` oder `build`, damit Sie bewusst Images neu laden und dann in einem Zeitfenster neu starten, in dem Sie mögliche Probleme bemerken können.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Version‑Pinning vs. Latest

Die richtige Version zu pinnen ist ein Balanceakt zwischen Stabilität und Sicherheit. Hier ein paar gängige Strategien:

```yaml
# docker-compose.yml
# ...
  # Exakte Versionsangabe, ideal für kritische Dienste
  image: postgres:17.2

  # Patch‑Version, gut für nicht‑kritische Dienste
  image: postgres:17.2

  # Major‑Version, perfekt für Hobby‑Projekte
  image: postgres:17

  # Yolo, nach Möglichkeit vermeiden
  image: postgres:latest
```

Nutzen Sie [Dependabot](https://github.com/features/security) oder [Renovate](https://github.com/renovatebot/renovate), um prüfbare Update‑PRs zu öffnen. Für alles, das Sie um 2 Uhr morgens nicht neu bauen wollen, pinnen Sie auf eine konkrete Version oder einen Digest und lassen Sie die Automatisierung Ihnen sagen, wann ein Wechsel sinnvoll ist.

_Lassen Sie mich wissen, welche Werkzeuge Sie zum Aktualisieren von Docker‑Images bevorzugen!_

## 🔐 Secrets Management

- [Starke Secrets erzeugen](#generate-strong-secrets)
- [Canary Tokens](#canary-tokens)
- [Upgrade von `.env` zum macOS‑Schlüsselbund](#upgrade-from-env-to-macos-keychain)
{/* - [Platzhalter‑Validierung](#placeholder-validation) */}

Es gibt viele Wege, Secrets zu verwalten, aber eine der wichtigsten Regeln lautet: **niemals Secrets in Docker‑Images hartkodieren oder ins Git committen**. Das ist einer der häufigsten Sicherheitsfehler, birgt ein langfristiges Risiko und ist mühsam zu beheben.

Secrets sicher zu speichern ist ein umfangreiches Thema mit vielen Optionen, von `.env`‑Dateien, [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), bis hin zu einem Secrets‑Manager wie [HashiCorp Vault](https://www.vaultproject.io/) oder AWS Secrets Manager.

Sie müssen das für Ihren Anwendungsfall „richtige“ Maß an Aufwand & Sicherheit wählen.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Placeholder Validation

<blockquote>You wouldn't believe how easy it is to hack a JWT token when the secret isn't secret!</blockquote>

<p className='inset'>💡 Ensure secrets are always unique. Try make it impossible to run with unsafe/hard-coded defaults.</p>

If you use placeholders like `__WARNING_REPLACE_ME__` in your secrets, great, maybe someone will notice!

Just in case, you can also add a little runtime safety with little effort. Here’s how you might do it in JavaScript, Rust, and Go:

<CodeTabs client:load tabs={["Helper commands", "Persist secrets in environment", "Use secrets per command"]}>

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

### Starke Secrets erzeugen

Hier ein kleines Skript, um neue Secrets für eine `.env`‑Datei zu erzeugen:

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

[**Canary Tokens**](https://canarytokens.org/) sind ein hervorragender Weg, um zu erkennen, ob Ihre Secrets kompromittiert (und verwendet) wurden. Sie funktionieren wie ein Stolperdraht, den Sie in beliebige sensible Dateien, URLs und Tokens einbauen können.

Setzen Sie sie neben die Secrets, um die Sie sich wirklich sorgen: `.env`‑Dateien, CI‑Variablen, Passwort‑Manager, Backup‑Ordner und Cloud‑Zugangsdaten. Machen Sie daraus kein Theaterstück; platzieren Sie Stolperdrähte dort, wo ein echter Angreifer oder ein zukünftiges Ich sie berühren würde.

Es gibt viele Arten von Canary‑„Tokens“, von AWS‑Tokens, über [gefälschte Kreditkartennummern](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), Excel‑ & Word‑Dateien, Kubeconfig‑Dateien, VPN‑Zugangsdaten bis hin zu SQL‑Dump‑Dateien, die einen Stolperdraht enthalten können!

#### Best Practices für Canary‑Tokens

- **Überall platzieren**: In jeder `.env`‑Datei, CI/CD‑Pipeline und jedem „Secrets‑Manager“, an den Sie denken können.  
  - Legen Sie eine `passwords.xlsx`‑ oder `passwords.docx`‑Datei in Ihrem Home‑Verzeichnis ab.  
  - Fügen Sie ein AWS‑Profil `billing_prod` mit einem Canary‑Token als Geheimnis hinzu.  
  - Erzeugen Sie eine `private.key`‑Datei für Ihr `~/.ssh`‑Verzeichnis.  
  - Erstellen Sie einen Canary‑SQL‑Dump `all_credit_cards.sql` für Ihr `~/backups`‑Verzeichnis.  
- **Überwachen**: Richten Sie E‑Mail‑Regeln/Alarme ein, um zu erkennen, wenn ein Canary‑Token ausgelöst wird.

### Upgrade von `.env` zu macOS‑Schlüsselbund

Für macOS‑Nutzer ist eine der einfachsten Optionen die Verwendung des Schlüsselbunds.

Hier ein einfacher Weg, Secrets aus dem macOS‑Schlüsselbund zu laden, unterstützt `TouchID` und ist etwas sicherer als `.env`‑Dateien.

Original‑Credit: [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) und [Jan Schaumann](https://www.netmeister.org/).

<CodeTabs client:load tabs={[
  "Helper commands",
  "Persist secrets in environment",
  "Use secrets per command"]
}>
```bash title="keychain-secrets.sh"
### Funktionen zum Setzen und Abrufen von Umgebungsvariablen aus dem macOS‑Schlüsselbund ###
### Adaptiert von: https://www.netmeister.org/blog/keychain-passwords.html und 
Original credit: [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) and [Jan Schaumann](https://www.netmeister.org/).

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

# Laden Sie Env‑Variablen in die aktuelle Shell
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

# Hinweis: Ein Shell‑Wrapper hilft, zu verhindern, dass Secrets in der Umgebung verbleiben.
# Und es ist sicher, das Skript zu versionieren.

# Verwendung:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY ...
```
</CodeTabs>

## 🌐 Netzwerk‑Gefahr

### Benutzerdefinierte Netzwerke & interne Ports

Dienstleistungen mit Docker‑Netzwerken korrekt zu isolieren, ist ein wichtiger Weg, die Angriffsfläche zu reduzieren.

Vorsicht beim Aufbohren von Löchern im Netzwerk! Ein falsch konfigurierter Port‑Forward kann schnell katastrophal enden.

Standardmäßig werden Dienste in einem privaten LAN nicht ins Internet gestellt – Sie müssen Ports explizit von Ihrem Router weiterleiten.

### Docker im LAN

Egal, ob Sie als Entwickler lokale Entwicklungs‑Server betreiben oder Services aus Ihrem lokalen Netzwerk selbst hosten, **Annahmen über das Docker‑Netzwerkmodell können zu Problemen führen.**

Entwickler sind häufig überrascht, dass die „traditionellen“ Methoden zur Sicherung von Linux‑Servern (`iptables`, Einschränkung von tcp/ip‑sysctl‑Optionen) **stillschweigend scheitern** auf Docker‑Hosts! Das gilt besonders beim **Selbst‑Hosting oder Betrieb in einem typischen Heimnetzwerk**. (Für die Hinteren: Das kann Zugriff auf Dev‑Container auf Ihrem MacBook ermöglichen!!!)

> ⚠️ **Warnung #1:** Docker‑publizierte Ports können die Firewall‑Regeln, von denen Sie dachten, sie schützen den Host, umgehen, besonders bei UFW auf Ubuntu/Debian. Das macht nicht jede Firewall‑Regel nutzlos, aber es bedeutet, dass „UFW sagt deny“ kein Beweis ist. [Siehe Issue #690: Docker bypasses ufw firewall rules](https://github.com/moby/moby/issues/690).

> ⚠️ **Warnung #2:** Das Binden von Ports an lokale IP‑Adressen (z. B. `-p 127.0.0.1:8080:80`) ist die richtige Voreinstellung, aber Docker‑Engine‑Versionen vor 28.0.0 hatten Fälle, in denen Hosts im selben L2‑Netzwerk trotzdem auf localhost‑publizierte Ports zugreifen konnten. [Docker dokumentiert die Einschränkung in seinem Port‑Publishing‑Guide](https://docs.docker.com/engine/network/port-publishing/), und die Gewohnheit, mit nmap zu prüfen, bleibt wichtig.

<p class="inset">Wenn Sie das überrascht, gleichfalls!</p>

**Das Binden an lokale IPs bleibt eine gute Praxis** und hat eine spürbare Auswirkung in **verwalteten Cloud‑Umgebungen und speziell konfigurierten Netzwerken**. 
{/* Denken Sie nicht nur an Ihre Firewall oder Ihr privates Netzwerk als Haupt‑ oder einzige Verteidigung; fügen Sie Docker‑Netzwerke hinzu für bessere **Isolation**, und prüfen Sie stets, ob Sie Ports überhaupt öffnen müssen. */}

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

### Netzwerk‑Best Practices

- 🏆 **Keine Ports veröffentlichen** Kürzlich habe ich festgestellt, dass das öfter nützlich ist, als man denkt! Bei Verwendung eines benannten (Bridge‑)Netzwerks haben Container ungehinderten Zugriff aufeinander, als befänden sie sich hinter einem lokalen NAT‑Gateway.  
  - Das ist nicht in allen Anwendungsfällen machbar, kann aber für Batch‑Jobs oder Container, die hauptsächlich über `attach` oder `exec` angesprochen werden, sinnvoll sein.  
- 🥇 **Docker‑Netzwerke verwenden** zur Isolation und Kontrolle, welche Container miteinander kommunizieren dürfen.  
- 🥉 **Lokale Bindung nutzen**: Obwohl [nicht perfekt](https://github.com/moby/moby/issues/45610), ist es im Allgemeinen besser, Ports an eine Loopback‑Adresse zu binden (z. B. `127.0.0.1:8080:80`). Stellen Sie einfach sicher, dass Sie Ihre Konfiguration **[prüfen Sie Ihre Konfiguration.](#uberwachung-verifikation)**.

## 🛡️ Zugriffskontrollen

Zugriffskontrollen sind ein zentraler Baustein zur Absicherung Ihrer Docker‑Dienste. Dazu gehören das Einschränken von Container‑Fähigkeiten & Berechtigungen, das Beschränken des Zugriffs auf den Docker‑Socket und weitere Maßnahmen.

- [Begrenzung von Container‑Fähigkeiten](#begrenzung-von-container-fähigkeiten)  
- [Docker‑Socket‑Zugriff](#docker-socket-zugriff)  
- [Ländersperre!](#laendersperre)  
- [Hardening CloudFlare Proxy Host](#hardening-cloudflare-proxy-host)

### Begrenzung von Container‑Fähigkeiten

Eine weitere solide Zugriffskontroll‑Praxis ist das Beschränken der Fähigkeiten Ihrer Container. Das reduziert den Angriffs‑Radius mehrerer Bedrohungen, von Privilegien‑Escalation bis zu Traffic‑Hijacking. Es ist kein undurchdringliches Feld, aber es entfernt Berechtigungen, die die meisten Container nie benötigen.

**Was sind Fähigkeiten?** Vom Linux‑Kernel definierte, benannte Berechtigungen oder Möglichkeiten. (Die Man‑Page [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) enthält die vollständige Liste.) Dazu gehören z. B. `CAP_CHOWN` (Dateieigentümer ändern), `CAP_NET_ADMIN` (Netzwerkschnittstellen konfigurieren), `CAP_KILL` (beliebige Prozesse beenden) und vieles mehr.

Die beiden Wege, benötigte Fähigkeiten zu ermitteln, sind:

1. **Trial and Error**: Diese langsam‑aber‑effektive Methode startet ohne Fähigkeiten und fügt sie nach und nach wieder hinzu, bis die Anwendung läuft.  
2. **Vorhandene Arbeit finden**: Suchen Sie nach "`project-name` `cap_drop` Dockerfile" oder "`project-name` `cap_drop` docker-compose.yml", um zu sehen, ob andere das bereits erledigt haben. Ein LLM kann einen Ausgangspunkt vorschlagen, aber behandeln Sie das Ergebnis wie eine Vermutung, bis Sie den Container getestet und die Image‑Dokumentation gelesen haben.

#### Best Practices für Fähigkeiten

- **Alle Fähigkeiten entfernen**: Verwenden Sie `cap_drop: [ ALL ]`, um alle Linux‑Fähigkeiten aus dem Container zu entfernen.  
- **Keine neuen Privilegien**: Setzen Sie `security_opt: [ no-new-privileges=true ]`, um zu verhindern, dass der Container neue Privilegien erlangt.

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

Verwenden Sie die Option `--external`/`external:` um einem **bestehenden Netzwerk** beizutreten. Lassen Sie sie weg, um ein neues Netzwerk zu erstellen.

### Docker‑Socket‑Zugriff

#### ⚠️ Warnung: `docker.sock` ist im Grunde Host‑Admin‑Zugriff

<blockquote class="inset">⚠️ Die `:ro`‑Option beeinflusst nicht die I/O, die über den Socket gesendet wird!</blockquote>

Sie sorgt lediglich dafür, dass der Socket‑Pfad selbst nur lesbar gemountet wird. API‑Aufrufe über diesen Socket können weiterhin Container erstellen, Host‑Pfade mounten und andere sehr spannende Dinge tun, die Sie wahrscheinlich nicht delegieren wollten.

{/* Any process that can "open" the socket can (probably) gain root access on the host. */}

#### Best Practices für Socket

- 🥇 **Mounten Sie den Docker‑Socket nicht**, es gibt meist eine bessere Alternative.  
- 🫣 Wenn Sie ihn unbedingt benötigen, **setzen Sie einen engen Proxy davor** und erlauben Sie nur die API‑Endpunkte, die die Anwendung tatsächlich braucht. Schauen Sie sich das Projekt `docker-socket-proxy` von Tecnativa an, [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Verifizieren Sie anschließend, dass die abgelehnten Aufrufe tatsächlich blockiert werden.  
- 🤢 Okay, _vielleicht_ ist das Teilen in einer sehr **hoch‑vertrauenswürdigen**, **gering‑risikobehafteten** Testumgebung akzeptabel.

#### Ländersperre!

Manchmal nützlich, aber keine echte Sicherheitsgrenze.

_Talk about the geopolitical entity, not the music..._

Wenn Sie Apps hauptsächlich für Familie und Freunde im lokalen Umfeld hosten, können Sie Traffic aus Ländern blockieren, von denen Sie keinen Verkehr erwarten. Oder Sie erlauben nur Traffic aus Ländern, die Sie erwarten. Das reduziert Rauschen; es stoppt keine VPNs, Proxies, Botnets oder hartnäckige Angreifer.

Schauen Sie sich dieses Skript an, um gesamten Traffic aus China zu blockieren:

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

Ähnlich können Sie nur Traffic aus den USA zulassen:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Absichern des CloudFlare Proxy-Hosts

Wenn Ihr Heim‑Server hinter einer CloudFlare‑IP (Proxy) geschützt ist, können Sie den Zugriff ausschließlich auf CloudFlare‑IPs und Ihr lokales Netzwerk beschränken.

Das ist dem [Country blocking](#blocking-country) oben ähnlich, aber mit deutlich strengerer Kontrolle.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Block all incoming!!!
ufw default allow outgoing # Allow all outgoing
ufw allow ssh # Allow SSH

# Allow access for local subnet (preferably dedicated DMZ/VLAN for hosted services)
ufw allow from 10.0.0.0/8 to any port 443

# Allow CloudFlare IPs
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# Add IPv6 support
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Um geo‑basierte Änderungen zu testen, kann ein VPN mit Standorten im gewünschten Land hilfreich sein. Weitere Informationen finden Sie im Abschnitt [Monitoring & Verification](#-monitoring--verification).

### Sicherheit auf Anwendungsebene

Sobald Ihre [network and host are security hardened,](#-network-hazard) Sie feststellen, dass noch mehr zu tun ist.

Jetzt müssen wir die „Anwendungs“-Ebene unserer Dienste betrachten.

<p class="inset">Hat die Datenbank ein gültiges Passwort? Automatisiert dieser Container HTTPS/Zertifikate? Enthält die App integrierte Authentifizierung? Gibt es Beschränkungen, welche E‑Mails sich registrieren können? Gibt es Standard‑Credentials oder Umgebungsvariablen, die geändert werden müssen?</p>

Der einzige Weg, das zu _wissen_, ist nachzusehen. Beginnen Sie in diesem Fall mit der `README` und anderen Schlüsseldateien wie `docker-compose.yml`, `Dockerfile` und `.env.*`. Sowohl im Projekt selbst als auch idealerweise in den zugehörigen Unterstützungsdiensten (z. B. Postgres, Redis usw.).

#### Reverse Proxy

Eine weitere Verteidigungslinie ist Basic Auth. Verwenden Sie es nicht ohne HTTPS. Für Legacy‑Dienste reicht es oft aus, Basic Auth vor einer Admin‑Route zu schalten, um Drive‑by‑Anfragen und nicht authentifizierte Crawler abzuwehren.

```nginx

# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}

```

Anmeldedaten erzeugen:

```bash

htpasswd -c /etc/nginx/.htpasswd admin

```

Mit einem Basic‑Auth‑Proxy müssen Angreifer erst Benutzername und Passwort überwinden, bevor sie Ihren internen Dienst erreichen.

Eine Alternative ist die Nutzung eines Services wie [Traefik](https://traefik.io/) oder [Caddy](https://caddyserver.com/), die HTTPS und Basic Auth automatisch für Sie bereitstellen.

Wenn Sie viele Domains & Dienste über eine GUI verwalten möchten, empfehle ich [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 Überwachung & Verifikation

- [Ports prüfen](#ports-prüfen)
- [Offene Ports anzeigen](#offene-ports-anzeigen)
- [Dateiüberwachung](#dateiüberwachung)

Dies ist der **wichtigste & am häufigsten übersehene Schritt**. Sie können die beste Firewall, das beste Netzwerk und die besten Praktiken haben, aber ohne Verifikation wissen Sie nicht, ob sie tatsächlich funktionieren.

Außerdem kann das Beherrschen von nur wenigen Befehlen – oder zu wissen, wo man sie nachschlagen kann – den Unterschied zwischen einem verhinderten Einbruch und einem erfolgreichen Angriff ausmachen. Das Gefühl, sich wie ein Hacker zu fühlen, ist nur ein Bonus. (Für Details und Beispiele springen Sie zum Abschnitt [🔍 Überwachung & Verifikation](#-überwachung--verifikation).)

<p class="inset">Vertrauen Sie nicht, verifizieren Sie doppelt</p>

### Ports prüfen

<p class="inset">⚠️ WICHTIG: Scannen Sie keine Hosts, die Ihnen nicht gehören.</p>

Egal, ob Sie in einem Heimnetzwerk oder auf einem VPS arbeiten, Sie wollen wissen, welche Ports nach außen offen sind.

Es gibt 2 Wege, das zu erledigen:

- Das Netzwerk prüfen (`nmap`, `masscan`)
- Das Betriebssystem befragen (`lsof`, `netstat`, `ss`)

#### Testen außerhalb Ihres Netzwerks

Sie benötigen Ihre aktuelle (öffentliche) IP, am einfachsten über Dienste wie `ifconfig.me`: `curl https://ifconfig.me`. Oder Sie schauen im Dashboard Ihres Hosting‑Providers nach.

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

Haben Sie die öffentliche IP, müssen Sie **eine Verbindung zu einem externen Netzwerk herstellen**. Nutzen Sie den Rechner eines Freundes, ein Telefon/5G‑Hotspot oder einen dedizierten Server‑Host.

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# Hinweis: Sicherstellen, dass `target_host` die gewünschte IP ist

# Bestimmte Ports scannen:
nmap -A -p 80,443,8080 --open --reason $target_host
# Top‑100‑Ports:
nmap -A --top-ports 100 --open --reason $target_host
# Alle Ports:
nmap -A -p1-65535 --open --reason $target_host
```

#### Testen innerhalb Ihres Netzwerks

Üben Sie mit `nmap`, scannen Sie Ihr lokales Netzwerk oder einen Ihrer Server, prüfen Sie Router, Drucker, Smart‑Fridge.

{/* Während Port‑Scans ein ständiger Begleiter sind, können sie in den USA nach dem CFAA (Computer Fraud and Abuse Act) strafbar sein. Scannen Sie also nur Geräte, die Ihnen gehören. */}

#### Beispiel‑Scan‑Befehle

```bash
# Scannen Sie localhost nach allen offenen Ports
nmap -sT localhost

# Scannen Sie die private IP Ihrer Maschine nach Diensten
nmap -sV 192.168.1.10

# Dienstdetails im Netzwerk finden
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

### Offene Ports anzeigen

Machen Sie sich mit `lsof` vertraut – es ist auf macOS & Linux verfügbar. Es liefert detaillierten Netzwerk‑ und Festplatten‑Status.

```bash title="lsof Commands"
# Bestimmten Port überwachen
sudo lsof -i:80 -Pn
```

# ESTABLISHED‑Verbindungen überwachen
sudo lsof -i -Pn | grep ESTABLISHED
# LISTEN‑Zustand anzeigen
sudo lsof -i -Pn | grep LISTEN

# um Netzwerk‑Namen statt IP‑Adressen zu sehen (Reverse‑DNS‑Lookups können sehr langsam sein)
sudo lsof -i -P | grep LISTEN

# Alle Netzwerkverbindungen überwachen
sudo watch -n1 "lsof -i -Pn"

```

#### Beispielausgabe

![nmap scan for listeners](../lsof-scan-listen.webp)

### Datei‑Überwachung

Um zu ermitteln, welche **Prozesse** den meisten **Festplatten‑Durchsatz** verbrauchen, kann `iotop` verwendet werden:

```bash
sudo iotop
```

Um einzelne Datei‑Änderungen zu beobachten, nutzt man unter Linux `inotifywait` oder unter macOS `fswatch`:

Das ist hilfreich, um unautorisierte oder seltsame Aktivitäten pro Ordner oder systemweit zu entdecken.

```bash
# Alle Datei‑Änderungen in einem Verzeichnis überwachen
sudo inotifywait -m /path/to/directory
```

Unter macOS kann `fswatch` verwendet werden:

Installation mit `brew install fswatch`

```bash
fswatch -r /path/to/directory
```

## ⏰ Oft übersehene Tipps

1. **Rate Limiting** für Authentifizierungsversuche und andere kritische Endpunkte. Ob über Nginx‑Modul `limit_req` oder `fail2ban` für SSH‑Zugriff – das Drosseln von Brute‑Force‑Versuchen ist *wahrscheinlich* sinnvoll. Ich sage *wahrscheinlich*, weil im Zeitalter von IPv6 und günstigen Botnetzen die Situation nicht mehr die alte ist.

2. **Read‑Only‑Volumes** wo immer möglich:
   ```yaml
   services:
     webapp:
       volumes:
         - ./config:/config:ro
   ```
   In Kombination mit anderen Best Practices (nicht‑Root‑Benutzer, minimale Ordnerrechte) bietet die `:ro`‑Option zusätzlichen Schutz vor versehentlichen Änderungen und Schreibversuchen aus dem Container. Sie schützt den Host nicht vor einem Prozess, der bereits weiterreichende Rechte besitzt.

3. **Container‑Zugriff regelmäßig auditieren**. Wenn ein Container kein Secret, keinen Port oder kein Mount benötigt, entfernen Sie es!

4. **Vorsicht bei Wi‑Fi‑Riff‑Raff**  
   Sie geben Ihr Wi‑Fi‑Passwort sicher nicht an Fremde weiter, oder? Nun, abgesehen von ein paar Freunden … und vielleicht der Familie. Man weiß nie, welche Apps sie haben und ob sie Ihre SSID & Passwort nach außen lecken.

### Heimnetzwerk vs. öffentlicher Anbieter vs. Tunneling

1. **Virtuelle Isolation/DMZ**: Für Heimserver sollten sie, wenn möglich, in einem separaten VLAN oder einer DMZ platziert werden. So bleiben interne Geräte vor möglichen Kompromittierungen vom Server aus geschützt.  
   - Separaten Router oder VLAN für den Heimserver verwenden.  
   - Separates Wi‑Fi‑Netzwerk für den Heimserver einrichten.  
   - Separates Subnetz für den Heimserver nutzen.

2. **Cloud‑Anbieter**: Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure und Google Cloud bieten unterschiedliche Firewall‑Funktionen.  
   - Einige Anbieter blockieren Ports standardmäßig. Andere bieten Opt‑In‑ oder Add‑On‑Optionen. Prüfen Sie die Dokumentation Ihres Anbieters.  
   - Viele Anbieter stellen erweiterte Monitoring‑ und Bedrohungserkennungs‑Dienste bereit.

3. **VPNs & Tunneling**: Erwägen Sie eine VPN‑ähnliche Lösung oder einen Tunneling‑Dienst, um Dienste sicher über das Internet zu verbinden, ohne sie öffentlich zugänglich zu machen.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.

## 🚀 Produktions‑Checkliste

- [ ] **Secrets**: Alle Secrets zufällig erzeugt und sicher gespeichert  
- [ ] **Updates**: Container‑Update‑Strategie dokumentiert und automatisiert (okay, wenn es nur ein paar Befehle in einer Textdatei sind)  
- [ ] **Network**: Nur notwendige Ports freigegeben, interne Netzwerke eingerichtet  
- [ ] **Firewall‑Regeln**: Default‑Deny, explizite Allow‑Regeln, ggf. Länder‑Blockierungen  
- [ ] **Reverse Proxy**: Nginx, Caddy oder Traefik können eine Basis‑Auth‑Schicht hinzufügen  
- [ ] **Canary Tokens**: In der Nähe sensibler Dateien und Zugangsdaten platzieren, die Sie tatsächlich prüfen würden, wenn sie berührt werden  
- [ ] **Monitoring**: Kennen Sie Ihre Systeme mit `nmap`, `lsof`, `inotifywait`, `glances` usw.  
- [ ] **Backup‑Strategie**: Getestet, vorzugsweise automatisiert und off‑site  
- [ ] **Least Privilege**: Nicht‑Root‑Container‑Benutzer, read‑only‑Volumes  

## 📚 Weiterführende Literatur

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org für Canary Tokens](https://canarytokens.org/)

## Danke

Ein kurzer Gruß an ein paar engagierte Redditor*innen:

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) – [Thread](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

Danke fürs Lesen! Ich hoffe, der Leitfaden war hilfreich. Bei Fragen oder Anregungen einfach über meine Social‑Media‑Kanäle unten melden oder den `Edit on GitHub`‑Link klicken, um einen PR zu öffnen! ❤️
````
