# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 121.23
- Input tokens: 25732
- Output tokens: 25187
- Thinking tokens: unknown
- Cached input tokens: 2560
- Cache write tokens: 0
- Estimated cost: $0.008103
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale de
## Raw Output

````mdx
---
title: ''
subTitle: ''
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

**Inhalt**

- 🧗‍♀️ [Für die Mutigen](#für-die-mutigen)
- 🔄 [Der `:latest`-Tanz](#der-latest-tanz)
- 🔐 [Geheimnisanagement: Die richtige Methode](#geheimnisanagement)
- 🌐 [Netzwerkgefahr](#netzwerkgefahr)
- 🛡️ [Zugriffssteuerung](#zugriffssteuerung)
- 🔍 [Überwachung & Verifikation](#überwachung--verifikation)
- ⏰ [Oft übersehene Tipps](#oft-übersehene-tipps)
- 🚀 [Produktionscheckliste](#produktionscheckliste)
- 📚 [Weitere Lektüre](#weitere-lektüre)

## 🧗‍♀️ Für die Mutigen

Wenn Sie Docker-Dienste selbsthosten, liegt die Sicherheit vollständig in Ihrer Verantwortung – kein Cloud-Anbieter schützt Sie vor Port-Scans oder schlechten Konfigurationen. Egal, ob Sie Apps in Ihrem Heimnetzwerk starten oder VPS von Anbietern wie Vultr, DigitalOcean, Linode, AWS, Azure oder Google Cloud mieten, Sie müssen Dinge absichern – und sicherstellen, dass Sie es richtig gemacht haben.

In diesem Leitfaden durchlaufen wir Docker-Sicherheit – von einigen `weniger bekannten` bis zu anderen `schwierig umzusetzenden` Techniken; wir untersuchen Canary-Tokens, read-only-Volumes, Firewall-Regeln, Netzwerksegmentierung & -härten, Authentifizierungsproxies hinzufügen und vieles mehr.

Wir vergleichen auch Heimnetzwerke mit Public-Cloud-Setups und zeigen, wie man einen einfachen Authentifizierungs-Proxy mit Nginx einrichtet. Am Ende haben Sie mehrere Optionen, um Unwürdige (Freunde, Familie und manchmal sogar sich selbst...) fernzuhalten.  

Das ist eine Menge an Informationen! Aber vieles davon hängt zusammen, und Sie können gezielt auswählen, was für Ihre Infrastruktur am relevantesten ist. 🍀  

## 🔄 Der `:latest`-Tanz  

Das Aktualisieren von Images ist für die Sicherheit entscheidend. Doch der Einsatz von `:latest` kann brüchige Änderungen oder verwundbare Builds ohne Prüfungsschritt einführen.  

### Der sichere Weg zum Update  

Kombinieren Sie Update-Befehle mit `pull` oder `build`, um Images absichtlich zu aktualisieren, und führen Sie anschließend einen Neustart in einem Zeitfenster durch, in dem Sie Brüche erkennen können.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Versionspinnung vs. latest

Die Wahl der richtigen Version für die Spinnung ist ein Kompromiss zwischen Stabilität und Sicherheit. Hier sind einige gängige Strategien:

```yaml
# docker-compose.yml
# ...
  # Exakte Versionspinnung, am besten für kritische Dienste
  image: postgres:17.2

  # Patch-Versionsspinnung, gut für nicht-kritische Dienste
  image: postgres:17.2

  # Hauptversionspinnung, perfekt für Hobbyprojekte
  image: postgres:17

  # Yolo, falls möglich vermeiden
  image: postgres:latest
```

Nutzen Sie [Dependabot](https://github.com/features/security) oder [Renovate](https://github.com/renovatebot/renovate), um überprüfbare Update-PRs zu öffnen. Für alles, bei dem Sie um 2 Uhr morgens nicht gern neu bauen würden, spinnen Sie eine konkrete Version oder Digest ein und lassen Sie Automatisierung Ihnen mitteilen, wann Sie umziehen sollten.

_Lassen Sie mich wissen, welche Tools Sie am liebsten nutzen, um Docker-Images aktuell zu halten!_

## 🔐 Geheimnismangement

- [Starke Geheimnisse generieren](#generate-strong-secrets)
- [Canary Tokens](#canary-tokens)
- [Von `.env` auf MacOS Keychain aufrüsten](#upgrade-from-env-to-macos-keychain)
{/* - [Platzhaltervalidierung](#placeholder-validation) */}

Es gibt viele Wege, Geheimnisse zu verwalten, aber eine der wichtigsten Regeln ist: **Geheimnisse niemals in Docker-Images einbauen oder sie in Git committen.** Es ist einer der häufigsten Sicherheitsfehler, birgt ein langfristiges Risiko und ist schmerzhaft zu beheben.

Sichere Speicherung von Geheimnissen ist ein umfangreiches Thema mit vielen Optionen, von `.env`-Dateien, [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), oder einem Geheimnismanager wie [HashiCorp Vault](https://www.vaultproject.io/) oder AWS Secrets Manager.

Sie müssen den „richtigen“ Aufwand und Sicherheitsniveau für Ihren Use-Case wählen.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Platzhaltervalidierung

<blockquote>Man würde staunen, wie einfach es ist, einen JWT-Token zu knacken, wenn das Geheimnis nicht geheim ist!</blockquote>

<p className='inset'>💡 Stellen Sie sicher, dass Geheimnisse immer eindeutig sind. Machen Sie es unmöglich, mit unsicheren/hardcodierten Standardwerten laufen zu lassen.</p>

Wenn Sie Platzhalter wie `__WARNING_REPLACE_ME__` in Ihren Geheimnissen verwenden, gut, vielleicht bemerkt jemand das!

Zur Sicherheit können Sie auch mit geringem Aufwand etwas Laufzeitsicherheit hinzufügen. Hier ist ein möglicher Ansatz in JavaScript, Rust und Go:

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

```javascript
// validateSecrets.js
const validateSecrets = () => {
  const unsafePlaceholder = /__WARNING_REPLACE_ME__/;
  const missingSecrets = Object.entries(process.env).filter(
    ([key, value]) => unsafePlaceholder.test(value)
  );

  if (missingSecrets.length) {
    console.error("Unsichere Geheimnisse erkannt:", missingSecrets);
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
            panic!("Unsicheres Geheimnis in {}", key);
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
			panic(fmt.Sprintf("Unsicheres Geheimnis in %s", pair[0]))
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

Hier ist ein kleiner Skript, um neue Geheimnisse für eine `.env`-Datei zu generieren:

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

### Canary Tokens

[**Canary Tokens**](https://canarytokens.org/) sind eine hervorragende Methode, um zu erkennen, ob Ihre Geheimnisse kompromittiert (und genutzt) wurden. Sie funktionieren wie eine Sicherheitsfalle, die Sie zu jedem sensiblen Dateiinhalt, URL oder Token hinzufügen können.

Platzieren Sie sie neben den Geheimnissen, bei denen Sie sich Sorgen machen: `.env`-Dateien, CI-Variablen, Passwortmanager, Backup-Ordner und Cloud-Anmeldeinformationen. Machen Sie daraus keine Theaterszene – positionieren Sie die Sicherheitsfallen an Stellen, an denen ein echter Angreifer oder ein zukünftiger Fehler von Ihnen Zugriff hätte.

Es gibt zahlreiche Arten von Canary-Tokens, darunter AWS-Tokens, [falsche Kreditkartennummern](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), Excel- und Word-Dateien, Kubeconfig-Dateien, VPN-Anmeldeinformationen, sogar SQL-Dump-Dateien können eine Sicherheitsfalle enthalten!

#### Best Practices für Canary Tokens

- **Überall platzieren**: In jeder `.env`-Datei, CI/CD-Pipeline und jedem "Geheimnismanager", den Sie sich vorstellen können.
  - Legen Sie eine `passwords.xlsx`- oder `passwords.docx`-Datei in Ihr Home-Verzeichnis.
  - Fügen Sie einen AWS-Profile `billing_prod` mit einem Canary-Token als Geheimnis hinzu.
  - Generieren Sie eine `private.key`-Datei für Ihr `~/.ssh`-Verzeichnis.
  - Erstellen Sie einen Canary SQL-Dump `all_credit_cards.sql` für Ihr `~/backups`-Verzeichnis.
- **Überwachen**: Richten Sie E-Mail-Regeln/Alarme ein, um zu erkennen, wenn ein Canary-Token ausgelöst wird.

### Upgrade von `.env` zum MacOS Keychain

Für Mac-Nutzer ist eine der einfachsten Optionen die Verwendung des Keychain.

Hier ist eine einfache Methode, um Geheimnisse automatisch aus dem OSX Keychain zu laden, unterstützt `TouchID` und ist etwas sicherer als `.env`-Dateien.

Das Original <cite>Copyright geht an [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) und [Jan Schaumann](https://www.netmeister.org/)</cite>

<CodeTabs client:load tabs={[
  "Helper commands",
  "Persist secrets in environment",
  "Use secrets per command"]
}>
```bash title="keychain-secrets.sh"
### Funktionen zum Setzen und Abrufen von Umgebungsvariablen aus dem OSX Keychain ###
### Anpassung von: https://www.netmeister.org/blog/keychain-passwords.html und 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# Verwendung: get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Verwendung: set-keychain-secret SECRET_ENV_VAR
# Sie werden nach dem Geheimniswert gefragt!
function set-keychain-secret () {
    [ -n "$1" ] || print "Fehlender Name der Umgebungsvariable"
    
    # Fordert Benutzer nach Geheimnis an
    echo -n "Geheimnis für ${1} eingeben"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Lädt Umgebungsvariablen in die aktuelle Shell
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Hinweis: Wenn ein Angriff `env` in Ihrer Shell ausführen kann, könnten diese Geheimnisse preiszugeben sein!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Gibt alle Geheimnisse für dieses Projekt an
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Hinweis: Die Verwendung eines Shell-Wrapper-Hilfsprogramms hilft dabei, Geheimnisse daran zu hindern, in der Umgebung zu verbleiben. Und es ist sicher, dies zu committen.

# Verwendung:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 Netzwerkgefahr

### Benutzerdefinierte Netzwerke & interne Ports

Die ordnungsgemäße Isolierung von Diensten mit Docker-Netzwerken ist eine wichtige Methode, um die Angriffsfläche zu reduzieren.

Achten Sie darauf, keine Löcher in Ihr Netzwerk zu bohren! Ein falsch konfigurierter Port-Forward kann sehr schlimm enden.

Standardmäßig werden Dienste in einem privaten LAN nicht dem Internet ausgesetzt – Sie müssen Ports explizit über den Router weiterleiten.

### Docker auf LAN

Ob Sie Entwickler sind, die lokal Dev-Server betreiben, oder Dienste aus Ihrem lokalen Netzwerk selbsthosten, **können Annahmen über das Docker-Netzwerkmodell zu Problemen führen.**

Entwickler werden oft überrascht feststellen, dass die „traditionellen“ Methoden zur Sicherung von Linux-Servern (`iptables`, Einschränkung von TCP/IP-Sysctl-Optionen) auf Docker-Hosts **stillschweigend fehlschlagen können!** Dies gilt insbesondere, wenn **Sie auf einem typischen Heimnetzwerk selbsthosten oder dort laufen.** (Für diejenigen hinten: Dies kann den Zugriff auf Dev-Container auf Ihrem MacBook ermöglichen!!!)

> ⚠️ **Warnung #1:** Über Docker veröffentlichte Ports können die Firewall-Regeln umgehen, die Sie dachten, den Host zu schützen, besonders bei UFW auf Ubuntu/Debian. Das macht nicht jede Firewall-Regel nutzlos, bedeutet aber, dass „UFW lehnt ab“ keine Garantie ist. [Siehe Issue #690: Docker umgeht UFW-Firewall-Regeln](https://github.com/moby/moby/issues/690).

> ⚠️ **Warnung #2:** Das Binden von Ports an lokale IP-Adressen (z. B. `-p 127.0.0.1:8080:80`) ist der richtige Standard, aber Docker Engine-Versionen älter als 28.0.0 hatten Fälle, in denen Hosts auf demselben L2-Netzwerk immer noch auf localhost-veröffentlichte Ports zugreifen konnten. [Docker dokumentiert diesen Einschränkung in seinem Port-Veröffentlichungsguide](https://docs.docker.com/engine/network/port-publishing/), und die Gewohnheit, mit `nmap` zu prüfen, bleibt wichtig.

<p class="inset">Wenn Sie überrascht sind, das zu erfahren, ist das normal!</p>

**Das Binden an lokale IPs ist immer noch eine gute Praxis** und hat eine Bedeutung in **verwalteten Cloud-Umgebungen und speziell konfigurierten Netzwerken.**  
{/* Denken Sie nicht, dass Ihre Firewall oder Ihr privates Netzwerk Ihre Haupt- oder einzige Verteidigungslinie sind, fügen Sie Docker-Netzwerke hinzu für bessere **Isolation**, und prüfen Sie immer, ob Sie Ports überhaupt veröffentlichen müssen. */}

### Beispiel Docker Compose

Hier ist ein Beispiel für eine `docker-compose.yml`-Datei, die den `app`-Dienst an `127.0.0.1:8080` bindet und beide Container an das benutzerdefinierte Netzwerk `backend` anbindet.

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # An localhost binden, wenn möglich
      - "127.0.0.1:8080:8080"
    # ... andere Einstellungen
  database:
    image: postgres:17.1
    # Keine Ports erforderlich; innerhalb des backend-Netzwerks zugänglich.
    networks:
      - backend

```

{/* #### Testen & Verifizieren

Wie bei allen Sicherheitsmaßnahmen ist es entscheidend, dass Sie Ihr Netzwerksetup **testen und verifizieren**. */}

{/* Während Netzwerksicherheit und -auditierung in den meisten Unternehmen eine Vollzeitverantwortung sind, verbringen die meisten Selbsthoster NULL Zeit damit! */}

{/* Schauen Sie, ich verstehe, es kann einschüchternd sein. _(Unternetze, Netzwerkmasken, CIDR, VLANs und Routingtabellen, oh weh! Wenn das keinen Sinn gemacht hat, ist das okay, Sie sind am richtigen Ort. Außerdem müssen wir uns für nichts davon jetzt kümmern.)_ */}

### Netzwerk-Best Practices

- 🏆 **Veröffentlichen Sie KEINE Ports** Kürzlich habe ich gelernt, dass das nützlicher ist, als Sie erwarten! Bei der Verwendung eines benannten (Bridge-)Netzwerks haben Container uneingeschränkten Zugriff aufeinander. Sie verhalten sich, als wären sie hinter einem lokalen Netzwerk (NAT-Gateway) verborgen.
  - Obwohl dies in einigen Use-Cases nicht möglich ist, kann dies nützlich sein für Container, die Batch-Jobs ausführen, oder hauptsächlich über `attach` oder `exec` zugänglich sind.
- 🥇 **Verwenden Sie Docker-Netzwerke**, um Container voneinander zu isolieren und zu steuern, welche Container miteinander kommunizieren dürfen.
- 🥉 **Verwenden Sie Localhost-Binding**: Während [nicht perfekt](https://github.com/moby/moby/issues/45610), ist es in der Regel besser, Ports an eine Loopback-Adresse (z. B. `127.0.0.1:8080:80`) zu binden. Stellen Sie sicher, dass Sie [Ihre Konfiguration überprüfen.](#-überwachung--verifikation)

## 🛡️ Zugriffssteuerung

Zugriffssteuerungen sind ein entscheidender Bestandteil der Sicherheit Ihrer Docker-Dienste. Dies umfasst die Begrenzung von Container-Fähigkeiten und -Berechtigungen, den Zugriff auf den Docker-Socket einzuschränken und mehr.

- [Begrenzen von Container-Fähigkeiten](#begrenzen-von-container-fähigkeiten)
- [Docker-Socket-Zugriff](#docker-socket-zugriff)
- [Land sperren!](#land-sperren)
- [CloudFlare Proxy-Host verstärken](#cloudflare-proxy-host-verstärken)

### Begrenzen von Container-Fähigkeiten

Eine weitere solide Zugriffssteuerungspraxis ist die Begrenzung der Fähigkeiten Ihrer Container. Dies verringert den Ausbreitungsbereich vieler Bedrohungen, von Privilegien-Escalation bis hin zu Traffic-Hijacking. Es handelt sich nicht um einen Schutzschild, aber es entfernt Berechtigungen, die die meisten Container nie benötigen.

**Was sind Fähigkeiten?** Linux-kernedefinierte, benannte Berechtigungen oder Fähigkeiten. (Die [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html)-Manpage enthält eine vollständige Liste.) Dazu gehören beispielsweise `CAP_CHOWN` (Dateibesitz ändern), `CAP_NET_ADMIN` (Netzwerkschnittstellen konfigurieren), `CAP_KILL` (jeden Prozess beenden) und viele mehr.

Die beiden Möglichkeiten, erforderliche Fähigkeiten zu ermitteln, sind:

1. **Versuch und Irrtum**: Diese langsamere, aber effektive Methode beginnt mit keiner Fähigkeit und fügt sie Schritt für Schritt hinzu, bis Ihre Anwendung funktioniert.
2. **Suche nach Vorgängearbeiten**: Suchen Sie nach "`project-name` `cap_drop` Dockerfile" oder "`project-name` `cap_drop` docker-compose.yml", um zu sehen, ob andere bereits die Arbeit für Sie erledigt haben. Ein LLM kann einen Ausgangspunkt vorschlagen, behandeln Sie dies jedoch wie eine Schätzung, bis Sie den Container testen und die Image-Dokumentation lesen.

#### Empfehlungen für Fähigkeiten

- **Alle Fähigkeiten fallen lassen**: Verwenden Sie `cap_drop: [ ALL ]`, um alle Linux-Fähigkeiten aus dem Container zu entfernen.
- **Keine neuen Privilegien**: Verwenden Sie `security_opt: [ no-new-privileges=true ]`, um zu verhindern, dass der Container neue Privilegien erlangt.

```yaml title="Beispiel: Fähigkeiten fallen lassen/ Begrenzen" {5-14}
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
    # ... andere Einstellungen
networks:
  db-network:
```

Jetzt können Ihre Dienste über das `db-network`-Netzwerk miteinander kommunizieren. Docker Compose erstellt dieses Netzwerk automatisch.

Verwenden Sie die Option `--external`/`external:`, um sich an ein **vorhandenes Netzwerk** anzuschließen. Lassen Sie sie weg, um ein neues Netzwerk zu erstellen.

### Docker-Socket-Zugriff

#### ⚠️ Achtung: `docker.sock` ist im Grunde Host-Admin-Zugriff

<blockquote class="inset">⚠️ Die Option `:ro` wirkt sich nicht auf die über das Socket gesendeten I/O aus!</blockquote>

Es stellt lediglich sicher, dass der Socket-Pfad selbst schreibgeschützt eingehängt wird. Die über diesen Socket gesendeten API-Aufrufe können immer noch Container erstellen, Host-Pfade einhängen und andere sehr spannende Dinge tun, die Sie wahrscheinlich nicht beabsichtigt haben, sie zu delegieren.

{/* Jeder Prozess, der den Socket öffnen kann, kann (vermutlich) root-Zugriff auf den Host erhalten. */}

#### Socket-Best Practices

- 🥇 **Vermeiden Sie das Einhängen des Docker-Sockets**, es gibt wahrscheinlich eine bessere Alternative.  
- 🫣 Falls unbedingt nötig, **stellen Sie einen eng begrenzten Proxy vor den Socket** und erlauben Sie nur die API-Endpunkte, die die Anwendung tatsächlich benötigt. Schauen Sie sich das Projekt `docker-socket-proxy` von Tecnativa an: [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Stellen Sie anschließend sicher, dass die verbotenen Aufrufe tatsächlich blockiert werden.  
- 🤢 Okay, _vielleicht_ ist das Teilen des Sockets in einer **sehr vertrauenswürdigen**, **niedrig risikobehafteten** Testumgebung akzeptabel.  

#### Länder sperren!  

Manchmal nützlich, aber keine echte Sicherheitsgrenze.  

_Von der geopolitischen Entität, nicht der Musik..._  

Wenn Sie Anwendungen hauptsächlich für Ihre Familie und Freunde im lokalen Umfeld hosten, können Sie Verkehr von Ländern sperren, von denen Sie keine Anfragen erwarten. Oder Sie erlauben nur Verkehr von Ländern, von denen Sie welche erwarten. Das reduziert Hintergrundlärm; es stoppt aber weder VPNs, Proxys, Botnetze noch Geduldige.  

Schauen Sie sich dieses Skript an, um alle Verkehr aus China zu sperren:

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

Ähnlich können Sie den Zugriff auf den US-Verkehr beschränken:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Verstärkung des CloudFlare-Proxy-Hosts

Wenn Ihr Heimserver hinter einer CloudFlare-IP (Proxy) geschützt ist, können Sie den Zugriff auf die CloudFlare-IPs und Ihr lokales Netzwerk beschränken.

Dies ist etwas ähnlich wie die [Länderblockierung](#blocking-country) weiter oben, aber mit viel präziserer Steuerung.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Alle eingehenden Verbindungen sperren!!!
ufw default allow outgoing # Alle ausgehenden Verbindungen erlauben
ufw allow ssh # SSH erlauben

# Zugriff für lokale Subnetze (am besten dedizierte DMZ/VLAN für gehostete Dienste) erlauben
ufw allow from 10.0.0.0/8 to any port 443
```

# Erlaube CloudFlare-IPs
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# Füge IPv6-Unterstützung hinzu
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Um geobasierte Änderungen zu testen, kann ein VPN mit Standorten im gewünschten Land nützlich sein. Weitere Informationen finden Sie im Abschnitt [Überwachung & Verifikation](#-monitoring--verification).

### Sicherheit der Anwendungsschicht

Nachdem Sie [Netzwerk- und Hostsicherheit optimiert haben](#-network-hazard), könnten Sie feststellen, dass noch mehr zu tun ist.

Jetzt müssen wir uns mit der "Anwendungsschicht" unserer Dienste selbst beschäftigen.

Hat diese Datenbank ein gültiges Passwort? Automatisiert dieser Container HTTPS/Zertifikate? Enthält die Anwendung eingebaute Authentifizierung? Gibt es Grenzen, welche E-Mails sich registrieren dürfen? Gibt es Standardanmeldeinformationen oder Umgebungsvariablen, die geändert werden müssen?

Der einzige Weg, _es zu wissen_, ist zu überprüfen. In diesem Fall beginnen Sie mit der `README` und anderen wichtigen Dateien wie `docker-compose.yml`, `Dockerfile` und `.env.*`. Sowohl im Projekt selbst als auch idealerweise auch in seinen unterstützenden Diensten (z. B. Postgres, Redis usw.).

#### Reverse Proxy

Eine weitere Schutzschicht ist die Basic-Authentifizierung. Verwenden Sie sie nicht ohne HTTPS. Für veraltete Dienste ist es oft ausreichend, Basic-Authentifizierung vor eine Admin-Route zu setzen, um zufällige Anfragen und unauthentifizierte Crawler daran zu hindern, den Dienst direkt zu durchsuchen.

```nginx
# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Eingeschränkter Zugriff";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}
```

Erzeugen Sie Anmeldeinformationen:

```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

Mit einer Basic-Authentifizierung als Proxy müssen Angreifer eine zusätzliche Hürde – Benutzername und Passwort – überwinden, bevor sie auf Ihren internen Dienst zugreifen können.

Eine weitere Option ist die Verwendung eines Dienstes wie [Traefik](https://traefik.io/) oder [Caddy](https://caddyserver.com/), der HTTPS und Basic-Authentifizierung für Sie automatisieren kann.

Wenn Sie viele Domains und Dienste mit einer GUI verwalten möchten, empfehle ich Ihnen [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 Überwachung & Verifikation

- [Überprüfen Sie Ihre Ports](#check-your-ports)
- [Anzeige offener Ports](#view-open-ports)
- [Dateiüberwachung](#file-monitoring)

Dies ist der **wichtigste und am meisten übersehene Schritt.** Sie können das beste Firewall, das beste Netzwerk und die besten Praktiken haben, aber wenn Sie nicht überprüfen, haben Sie keine Ahnung, ob es funktioniert.

Außerdem kann das Wissen über einige Befehle – oder zumindest wo man sie nachschlagen kann – den Unterschied zwischen der Verhinderung eines Sicherheitsvorfalls und nicht daran denken machen. Das Gefühl, ein Hacker zu sein, ist nur ein Bonus. (Für Details und Beispiele springen Sie vor zur [Überwachung & Verifikation](#-monitoring--verification)-Sektion.)

<p class="inset">Vertrauen Sie nicht, überprüfen Sie zweimal</p>

### Überprüfen Sie Ihre Ports

<p class="inset">⚠️ WICHTIG: Scannen Sie keine Hosts, die Ihnen nicht gehören.</p>

Ob Sie sich in einem Heimnetzwerk oder einem VPS befinden, Sie möchten wissen, welche Ports für die Welt geöffnet sind.

Es gibt 2 Möglichkeiten, dies zu überprüfen:

- Netzwerk prüfen (`nmap`, `masscan`)
- Betriebssystem befragen (`lsof`, `netstat`, `ss`)

#### Netzwerkaußentests durchführen

Sie benötigen Ihre aktuelle (öffentliche) IP-Adresse, leicht zu ermitteln mit Diensten wie `ifconfig.me`: `curl https://ifconfig.me`. Oder schauen Sie sie in Ihrem Hosting-Anbieter-Dashboard an.

```bash title="Öffentliche IP-Adresse abrufen"
curl -fsSL https://ifconfig.me
# --> AKTUELLE ÖFFENTLICHE IP
```

Sobald Sie Ihre öffentliche IP haben, müssen Sie **eine Verbindung zu einem externen Netzwerk herstellen**. Dazu können Sie einen Computer eines Freundes, ein Smartphone/5G-Heißpunkt oder einen dedizierten Serverhost verwenden.

```bash title="nmap-Scan für externes Netzwerk"
target_host="$(curl -fsSL https://ifconfig.me)"

# Hinweis: Stellen Sie sicher, dass `target_host` die gewünschte IP-Adresse ist

# Spezifische Ports scannen:
nmap -A -p 80,443,8080 --open --reason $target_host
# Top 100 Ports:
nmap -A --top-ports 100 --open --reason $target_host
# Alle Ports
nmap -A -p1-65535 --open --reason $target_host
```

#### Test in Ihrem Netzwerk

Üben Sie mit `nmap`, scannen Sie Ihr lokales Netzwerk oder einen Ihrer Server, prüfen Sie Ihren Router, Drucker, Smart-Kühlschrank.

{/* Während Portscans ein ständiger Fakt des Lebens sind, könnte dies unter dem CFAA (Computer Fraud and Abuse Act) in den USA gegen Gesetze verstoßen. Scannen Sie daher nur Geräte, die Ihnen gehören. */}

#### Beispiel-Scan-Befehle

```bash

# Scannen Sie Ihren lokalen Host nach allen offenen Ports
nmap -sT localhost

# Scannen Sie die private IP Ihres Computers nach Diensten
nmap -sV 192.168.1.10

# Finden Sie Dienstinformationen in Ihrem Netzwerk
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# Oder bei Docker 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="nmap Scan" frame="terminal"
% nmap -A --open --reason 192.168.0.87

Starte Nmap 7.95 ( https://nmap.org ) am 2025-01-06 13:51 MST
Nmap-Scan-Bericht für dev02.local (192.168.0.87)
Host ist erreichbar, syn-ack erhalten (0.0067s Latenz).
Nicht angezeigt: 995 geschlossene TCP-Ports (conn-refused)
PORT     ZUSTAND DIENST     GRUND  VERSION
22/tcp   offen   ssh         syn-ack OpenSSH 9.6p1 Ubuntu 3ubuntu13.5 (Ubuntu Linux; Protokoll 2.0)
| ssh-hostkey:
|_  256 {FINGERPRINT} (ED25519)
80/tcp   offen   http        syn-ack Caddy httpd
|_http-server-header: Caddy
|_http-title: Dev02.DanLevy.net
443/tcp  offen   ssl/https   syn-ack
|_http-title: Dev02.DanLevy.net
1234/tcp offen   http        syn-ack Node.js Express Framework
|_http-cors: GET POST PUT DELETE PATCH
|_http-title: Dev02.DanLevy.net (application/json; charset=utf-8).
Dienstinformation: Betriebssystem: Linux; CPE: cpe:/o:linux:linux_kernel

Durchgeführt wurde die Dienst-Erkennung. Melden Sie bitte falsche Ergebnisse unter https://nmap.org/submit/ .
Nmap abgeschlossen: 1 IP-Adresse (1 Host aktiv) gescannt in 13,36 Sekunden
```

### Offene Ports anzeigen

Machen Sie sich mit `lsof` vertraut – es ist auf MacOS & Linux verfügbar. Es zeigt detaillierte Netzwerkzustände und Datenträgeraktivitäten an.

```bash title="lsof Befehle"
# Überwachen Sie einen bestimmten Port
sudo lsof -i:80 -Pn
```

```bash title="lsof Befehle"
# Monitor ETABLIERTEN Verbindungen
sudo lsof -i -Pn | grep ESTABLISHED
# Anzeigen von LISTEN
sudo lsof -i -Pn | grep LISTEN

# um Netzwerknamen anstelle von IP-Adressen anzuzeigen (DNS-Umkehrung kann sehr langsam sein)
sudo lsof -i -P | grep LISTEN

# Überwachen Sie alle Netzwerkverbindungen
sudo watch -n1 "lsof -i -Pn"
```

#### Beispiel Ausgabe

![nmap-Scan für Listener](../lsof-scan-listen.webp)

### Dateibeobachtung

Um zu identifizieren, welche **Prozesse** die meiste **Festplattenbandbreite** nutzen, können Sie `iotop` verwenden:

```bash
sudo iotop
```

Um Einzeldateiveränderungen zu beobachten, können Sie `inotifywait` unter Linux oder `fswatch` unter MacOS nutzen:

Dies kann nützlich sein, um unbefugtes oder ungewöhnliches Verhalten pro Ordner oder systemweit zu erkennen.

```bash
# Überwachen Sie alle Dateiveränderungen in einem Verzeichnis
sudo inotifywait -m /path/to/directory
```

Unter MacOS können Sie `fswatch` verwenden:

Installieren mit `brew install fswatch`

```bash
fswatch -r /path/to/directory
```

## ⏰ Oft übersehene Tipps

1. **Ratenbegrenzung** für Authentifizierungsversuche und andere wichtige Endpunkte. Ob über das Nginx-Modul `limit_req` oder `fail2ban` für SSH-Zugriff – das Drosseln von Brute-Force-Attacken ist _vermutlich_ eine gute Idee. Ich sage _vermutlich_, weil in der Ära von IPv6 und günstigen Botnetzen das nicht mehr das ist, was es einmal war.

2. **Lesenur-Volumes** einsetzen, wo immer möglich:  
   ```yaml
   services:
     webapp:
       volumes:
         - ./config:/config:ro
   ```
   Kombiniert mit anderen Best Practices (nicht-root-Benutzer, minimale Ordnerberechtigungen) bietet die `:ro`-Volumebereitstellung zusätzliche Schutzmaßnahmen gegen versehentliche Änderungen und einige Schreibversuche aus dem Container heraus. Sie schützt den Host jedoch nicht vor Prozessen, die bereits umfassende Rechte besitzen.

3. **Containerzugriffsrechte regelmäßig prüfen**.  
   Wenn ein Container ein Geheimnis, einen Port oder eine Einbindung nicht benötigt – entfernen Sie diese!

4. **Vorsicht vor WiFi-Riff-Raff**  
   Sie würden sicher nicht Ihr WiFi-Passwort an komische Leute weitergeben, oder? Außer vielleicht an Freunde... Okay, vielleicht auch an Familie. Man weiß nie, welche Apps sie nutzen und ob diese Ihren SSID & Passwort an die Welt weitergeben.

### Heimnetzwerk vs. Öffentlicher Anbieter vs. Tunneling

1. **Virtuelle Isolation/DMZ**: Für Heimserver, setzen Sie sie ggf. auf eine separate VLAN oder DMZ. Dies schützt Ihre internen Geräte vor möglichen Compromissen von der Serverseite.  
   - Nutzen Sie einen separaten Router oder VLAN für Ihren Heimserver.  
   - Nutzen Sie ein separates WiFi-Netzwerk für Ihren Heimserver.  
   - Nutzen Sie ein separates Subnetz für Ihren Heimserver.

2. **Cloud-Anbieter**: Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure und Google Cloud bieten alle unterschiedliche Firewall-Funktionen an.  
   - Einige Anbieter und Dienste blockieren Ports standardmäßig. Andere bieten Optionen oder Zusatzdienste an. Prüfen Sie die Dokumentation Ihres Anbieters.  
   - Viele Anbieter bieten erweiterte Überwachungs- und Bedrohungs-Erkennungsdienste an.  

3. **VPNs & Tunneling**: Nutzen Sie eine VPN-ähnliche Option oder einen Tunneling-Dienst, um Dienste sicher über das Internet zu verbinden, ohne sie dem öffentlichen Internet auszusetzen.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.  

{/* 3. **Absicherung gegen interne/laterale Angriffe**: Ein infizierter Rechner kann ein gesamtes Netzwerk gefährden. Die Segmentierung von Docker-Diensten auf benutzerdefinierten Netzwerken, die Nutzung von Hardware, UFW-Regeln und das Blockieren unnötiger Ports können das Risiko reduzieren (bei richtiger Konfiguration). */}  

## 🚀 Produktions-Checkliste  

- [ ] **Geheimnisse**: Alle Geheimnisse zufällig generiert und sicher gespeichert  
- [ ] **Updates**: Dokumentierte und automatisierte Strategie für Container-Updates. (Okay, wenn es nur ein paar Befehle in einer Textdatei sind.)  
- [ ] **Netzwerk**: Nur notwendige Ports freigegeben, interne Netzwerke eingerichtet.  
- [ ] **Firewall-Regeln**: Standard-Verweigerung, explizite Erlaubnisse, Länderblockaden bei Bedarf.  
- [ ] **Reverse Proxy**: Nginx, Caddy oder Traefik können eine Schicht mit Basis-Authentifizierung hinzufügen  
- [ ] **Canary Tokens**: Platzieren Sie sie in der Nähe sensibler Dateien und Anmeldeinformationen, die Sie bei Berührung tatsächlich untersuchen würden.  
- [ ] **Überwachung**: Nutzen Sie `nmap`, `lsof`, `inotifywait`, `glances`, etc., um Ihre Systeme zu kennen.  
- [ ] **Backup-Strategie**: Getestet, idealerweise automatisiert und extern gespeichert.  
- [ ] **Minimales Recht**: Nicht-root-Container-Benutzer, schreibgeschützte Volumes.  

## 📚 Weitere Lektüre

- [Docker-Sicherheits-Best Practices](https://docs.docker.com/develop/security-best-practices/)  
- [OWASP Docker-Sicherheits-Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)  
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)  
- [Canarytokens.org für Canary Tokens](https://canarytokens.org/)  

## Danke  

Ein Lob an einige aufmerksame Redditer:  

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [thread](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>  
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>  
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>  
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>  
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>  

Danke fürs Lesen! Ich hoffe, Sie haben diese Anleitung nützlich gefunden. Wenn Sie Fragen oder Vorschläge haben, zögern Sie nicht, mich über meine Socials unten zu kontaktieren, oder klicken Sie auf den Link „`Edit on GitHub`“, um einen Pull Request zu erstellen! ❤️
````
