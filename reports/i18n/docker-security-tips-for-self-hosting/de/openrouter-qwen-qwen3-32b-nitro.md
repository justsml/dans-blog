# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 88.32
- Input tokens: 25937
- Output tokens: 23139
- Thinking tokens: unknown
- Cached input tokens: 5120
- Cache write tokens: 0
- Estimated cost: $0.007628
- Pricing source: local-openrouter-estimate
- Note: Command failed: git add src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx reports/i18n/docker-security-tips-for-self-hosting/de
## Raw Output

````mdx
---
title: Wichtige Docker-Sicherheitstipps für Self-Hosting
subTitle: >-
  Sichern Sie Ihre selbstgehosteten Dienste – von der Abwehr bis zur
  Überwachung!
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
- 🔐 [Secrets-Management: Die richtige Methode](#secrets-management-die-richtige-methode)
- 🌐 [Netzwerkgefahr](#netzwerkgefahr)
- 🛡️ [Zugriffssteuerung](#zugriffssteuerung)
- 🔍 [Überwachung & Verifikation](#überwachung--verifikation)
- ⏰ [Oft übersehene Tipps](#oft-übersehene-tipps)
- 🚀 [Produktionscheckliste](#produktionscheckliste)
- 📚 [Weitere Lektüre](#weitere-lektüre)

## 🧗‍♀️ Für die Mutigen

Wenn Sie Docker-Dienste selbsthosten, liegt die Sicherheit vollständig in Ihrer Verantwortung – kein Cloud-Anbieter schützt Sie vor Port-Scans oder schlampigen Konfigurationen. Egal, ob Sie Apps in Ihrem Heimnetzwerk starten oder VPS-Instanzen von Anbietern wie Vultr, DigitalOcean, Linode, AWS, Azure oder Google Cloud mieten, müssen Sie Dinge absichern – und stellen Sie sicher, dass Sie es richtig gemacht haben.

In diesem Leitfaden durchlaufen wir Docker-Sicherheit – von einigen `weniger bekannten` bis hin zu anderen `schwierig umzusetzenden` Techniken; wir erkunden Canary-Tokens, read-only-Volumes, Firewall-Regeln, Netzwerksegmentierung & -härten, Authentifizierungsproxies hinzufügen und vieles mehr.

Wir vergleichen außerdem private Netzwerke mit öffentlichen Cloud-Umgebungen und zeigen Ihnen, wie Sie eine grundlegende Authentifizierungs-Proxy mit Nginx einrichten. Am Ende dieses Leitfadens haben Sie mehrere Optionen, um unerwünschte Zugriffe abzuwehren (Freunde, Familie und manchmal sogar sich selbst...).

Das ist eine Menge an Stoff! Aber vieles davon hängt zusammen, und Sie können gezielt diejenigen Aspekte auswählen, die für Ihre Infrastruktur am relevantesten sind. 🍀

## 🔄 Der `:latest`-Tanz

Das Halten von Images auf dem neuesten Stand ist für die Sicherheit entscheidend. Allerdings kann die Abhängigkeit von `:latest` unterbrechende Änderungen oder unsichere Builds einführen, ohne dass Sie diese vorher prüfen können.

### Der sichere Weg zum Update

Kombinieren Sie Update-Befehle mit `pull` oder `build`, um Images gezielt zu aktualisieren, und starten Sie sie anschließend während eines Zeitfensters, in dem Sie Probleme erkennen können.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Versionspinnung vs. Latest

Die Wahl der richtigen Version für die Spinnung ist ein Kompromiss zwischen Stabilität und Sicherheit. Hier sind einige gängige Strategien:

```yaml
# docker-compose.yml
# ...
  # Exakte Versionspinnung, am besten für kritische Dienste
  image: postgres:17.2

  # Patch-Versionsspinnung, gut für nicht-kritische Dienste
  image: postgres:17.2

  # Major-Versionsspinnung, ideal für Hobbyprojekte
  image: postgres:17

  # Yolo, falls möglich vermeiden
  image: postgres:latest
```

Nutzen Sie [Dependabot](https://github.com/features/security) oder [Renovate](https://github.com/renovatebot/renovate), um überprüfbare Update-PRs zu öffnen. Für alles, bei dem Sie sich um 2 Uhr morgens unangenehm darum kümmern müssten, eine Rekonstruktion vorzunehmen, spinnen Sie auf eine konkrete Version oder einen Digest und lassen Sie Automatisierung Ihnen mitteilen, wann Sie umziehen sollten.

_Teilen Sie mir Ihre bevorzugten Tools, um Docker-Images auf dem neuesten Stand zu halten!_

## 🔐 Geheimnismanagement

- [Starke Geheimnisse generieren](#generate-strong-secrets)
- [Canary Tokens](#canary-tokens)
- [Von .env auf MacOS Keychain aufrüsten](#upgrade-from-env-to-macos-keychain)
{/* - [Platzhaltervalidierung](#placeholder-validation) */}

Es gibt viele Möglichkeiten, Geheimnisse zu verwalten, aber eine der wichtigsten Regeln, an die Sie sich halten sollten, lautet: **nie Geheimnisse in Ihre Docker-Images hartkodieren oder sie in Git commiten.** Es handelt sich um einen der häufigsten Sicherheitsfehler, er birgt ein langfristiges Risiko und ist eine Qual zu beheben.

Sichere Speicherung von Geheimnissen ist ein umfangreiches Thema mit vielen Optionen, darunter `.env`-Dateien, [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), oder ein Geheimnismanager wie [HashiCorp Vault](https://www.vaultproject.io/) oder AWS Secrets Manager.

Sie müssen das "passende" Maß an Aufwand und Sicherheit für Ihren Anwendungsfall wählen.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Platzhaltervalidierung

<blockquote>Sie würden überrascht sein, wie einfach es ist, ein JWT-Token zu knacken, wenn das Geheimnis nicht geheim ist!</blockquote>
*/}

<p className='inset'>💡 Stellen Sie sicher, dass Geheimnisse immer eindeutig sind. Versuchen Sie, es unmöglich zu machen, mit unsicheren/hardcodierten Standardwerten zu laufen.</p>

Wenn Sie Platzhalter wie `__WARNING_REPLACE_ME__` in Ihren Geheimnissen verwenden, großartig, vielleicht wird jemand darauf aufmerksam!

Falls doch, können Sie auch eine kleine Laufzeit-Sicherheit mit wenig Aufwand hinzufügen. So könnten Sie es in JavaScript, Rust und Go umsetzen:

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

```javascript
// validateSecrets.js
const validateSecrets = () => {
  const unsafePlaceholder = /__WARNING_REPLACE_ME__/;
  const missingSecrets = Object.entries(process.env).filter(
    ([key, value]) => unsafePlaceholder.test(value)
  );

  if (missingSecrets.length) {
    console.error("Ungesicherte Geheimnisse erkannt:", missingSecrets);
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
            panic!("Ungesichertes Geheimnis in {}", key);
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
			panic(fmt.Sprintf("Ungesichertes Geheimnis in %s", pair[0]))
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

[ -f .env ] && { echo ".env Datei existiert bereits!"; exit 1; }

cat > .env << EOL
POSTGRES_PASSWORD=$(generate_secret)
JWT_SECRET=$(generate_secret 64)
SESSION_KEY=$(generate_secret 24)
REDIS_PASSWORD=$(generate_secret 20)
UNSAFE_PLACEHOLDER=__WARNING_REPLACE_RANDOM_TEXT__
EOL

echo "Neue .env Datei mit sicheren Zufallswerten generiert!"
```

### Canary Tokens

[**Canary Tokens**](https://canarytokens.org/) sind eine hervorragende Methode, um zu erkennen, ob Ihre Geheimnisse kompromittiert (und genutzt) wurden. Sie funktionieren wie eine Sirene, die Sie an jedem sensiblen Dateiort, URL oder Token platzieren können.

Platzieren Sie sie neben den Geheimnissen, die Sie tatsächlich schützen möchten: `.env`-Dateien, CI-Variablen, Passwortmanager, Backup-Ordner und Cloud-Anmeldeinformationen. Machen Sie daraus keine Show – positionieren Sie die Sirenen an Stellen, an denen ein echter Angreifer oder ein zukünftiger Fehler von Ihnen sie tatsächlich berühren würde.

Es gibt zahlreiche Arten von Canary-Tokens zur Auswahl, von AWS-Token über [falsche Kreditkartennummern](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), Excel- und Word-Dateien, Kubeconfig-Dateien, VPN-Anmeldeinformationen bis hin zu SQL-Dump-Dateien, die eine Sirene enthalten können!

#### Best Practices für Canary Tokens

- **An allen Stellen platzieren**: In jeder `.env`-Datei, CI/CD-Pipeline und jedem "Secret-Manager", den Sie sich vorstellen können.
  - Legen Sie eine `passwords.xlsx`- oder `passwords.docx`-Datei in Ihr Home-Verzeichnis.
  - Fügen Sie einen AWS-Profil `billing_prod` mit einem Canary Token als Geheimnis hinzu.
  - Generieren Sie eine `private.key`-Datei für Ihr `~/.ssh`-Verzeichnis.
  - Erstellen Sie einen Canary SQL-Dump `all_credit_cards.sql` für Ihr `~/backups`-Verzeichnis.
- **Überwachen**: Richten Sie E-Mail-Regeln/Alarme ein, um zu erkennen, wenn ein Canary Token ausgelöst wird.

### Von `.env` zu MacOS Keychain wechseln

Für Mac-Nutzer ist eine der einfachsten Optionen die Verwendung des Keychain.

Hier ist eine einfache Methode, um Geheimnisse automatisch aus dem OSX Keychain zu laden, unterstützt `TouchID` und ist etwas sicherer als `.env`-Dateien.

Der ursprüngliche <cite>Code stammt von [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) und [Jan Schaumann](https://www.netmeister.org/)</cite>

<CodeTabs client:load tabs={[
  "Hilfsbefehle",
  "Geheimnisse im Umfeld beibehalten",
  "Geheimnisse pro Befehl verwenden"
]}>
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
    
    # Aufforderung zur Eingabe des Geheimnisses
    echo -n "Geben Sie das Geheimnis für ${1} ein"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Laden von Umgebungsvariablen in die aktuelle Shell
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Hinweis: Wenn ein Angriff `env` in Ihrer Shell ausführen kann, könnten diese Geheimnisse preiszugeben sein!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Alle Geheimnisse für dieses Projekt angeben
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Hinweis: Die Verwendung eines Shell-Wrapper-Hilfsprogramms verhindert, dass Geheimnisse im Umfeld verbleiben.
# Und es ist sicher, dies zu committen.

# Verwendung:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 Netzwerkgefahr

### Eigene Netzwerke & Interne Ports

Die ordnungsgemäße Isolation von Diensten mit Docker-Netzwerken ist ein wichtiger Schritt, um die Angriffsfläche zu reduzieren.

Seien Sie vorsichtig mit Löchern in Ihrem Netzwerk! Ein falsch konfigurierter Port-Forward kann katastrophal enden.

Standardmäßig sind Dienste in einem privaten LAN nicht dem Internet ausgesetzt – Sie müssen Ports explizit über Ihren Router weiterleiten.

### Docker im LAN

Ob Sie Entwickler sind, die lokal Entwicklungsserver ausführen, oder Dienste aus Ihrem lokalen Netzwerk selbsthosten, **Annahmen über das Netzwerkmodell von Docker können zu Problemen führen.**

Entwickler sind oft überrascht zu erfahren, dass die „traditionellen“ Methoden zur Sicherung von Linux-Servern (`iptables`, Beschränkung von TCP/IP-Sysctl-Optionen) auf Docker-Hosts **stumm fehlschlagen können!** Dies gilt insbesondere, wenn **Sie auf einem typischen Heimnetzwerk selbsthosten oder laufen.** (Für diejenigen hinten: Dies kann den Zugriff auf Entwicklungscontainer auf Ihrem MacBook ermöglichen!!!)

> ⚠️ **Warnung #1:** Über Docker veröffentlichte Ports können die Firewall-Regeln umgehen, die Sie dachten, den Host zu schützen, insbesondere bei UFW unter Ubuntu/Debian. Das macht nicht jede Firewall-Regel nutzlos, aber es bedeutet, dass „UFW lehnt ab“ keine Garantie ist. [Siehe Issue #690: Docker umgeht UFW-Firewall-Regeln](https://github.com/moby/moby/issues/690).

> ⚠️ **Warnung #2:** Das Binden von Ports an lokale IP-Adressen (z. B. `-p 127.0.0.1:8080:80`) ist der richtige Standard, aber Docker Engine-Versionen älter als 28.0.0 hatten Fälle, in denen Hosts auf dem gleichen L2-Netzwerk immer noch auf localhost-veröffentlichte Ports zugreifen konnten. [Docker dokumentiert diesen Einschub in seinem Port-Veröffentlichungsguide](https://docs.docker.com/engine/network/port-publishing/), und die Gewohnheit, mit `nmap` zu überprüfen, bleibt wichtig.

<p class="inset">Wenn Sie überrascht sind, das zu erfahren, dann auch ich!</p>

**Das Binden an lokale IPs ist immer noch eine gute Praxis** und hat eine bedeutsame Auswirkung in **verwalteten Cloud-Umgebungen und speziell konfigurierten Netzwerken.** 
{/* Denken Sie nicht, Ihre Firewall oder Ihr privates Netzwerk sei Ihre Haupt- oder einzige Verteidigung, fügen Sie Docker-Netzwerke hinzu für bessere **Isolation**, und überlegen Sie immer, ob Sie Ports überhaupt öffnen müssen. */}

### Beispiel Docker Compose

Hier ist ein Beispiel für eine `docker-compose.yml`-Datei, die den `app`-Dienst an `127.0.0.1:8080` bindet und beide Container an das benutzerdefinierte Netzwerk `backend` anschließt.

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # An localhost binden, falls möglich
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

{/* Während Netzwerksicherheit und -auditierung in den meisten Unternehmen eine Vollzeitverantwortung darstellen, widmen sich viele Selbsthoster diesem Thema NULL Minuten! */}

{/* Schauen Sie, ich verstehe, es kann einschüchternd wirken. _(Subnetze, Netzwerkmasken, CIDR, VLANs und Routingtabellen, oh weh! Wenn das keinen Sinn gemacht hat, ist das okay, Sie sind am richtigen Ort. Außerdem müssen wir uns für den Moment um keinerlei davon kümmern.)_ */}

### Netzwerk-Best Practices

- 🏆 **Veröffentlichen Sie KEINE Ports** Kürzlich habe ich gelernt, dass dies nützlicher ist, als Sie erwarten! Bei der Verwendung eines benannten (Bridge-)Netzwerks haben Container ungefilterten Zugriff aufeinander. Sie verhalten sich, als wären sie hinter einem lokalen Netzwerk (NAT-Gateway).
  - Während dies in einigen Use-Cases nicht möglich ist, kann dies für Container nützlich sein, die Batch-Jobs ausführen oder hauptsächlich über `attach` oder `exec` zugegriffen werden.
- 🥇 **Verwenden Sie Docker-Netzwerke**, um Container voneinander zu isolieren und zu steuern, welche Container miteinander kommunizieren dürfen.
- 🥉 **Verwenden Sie Localhost-Binding**: Während [nicht perfekt](https://github.com/moby/moby/issues/45610), ist es in der Regel besser, Ports an eine Loopback-Adresse (z. B. `127.0.0.1:8080:80`) zu binden. Stellen Sie sicher, dass Sie [Ihre Konfiguration überprüfen.](#-Monitoring--Verification)

## 🛡️ Zugriffssteuerung

Zugriffssteuerungen sind ein entscheidender Bestandteil der Sicherheit Ihrer Docker-Dienste. Dazu gehören die Einschränkung der Container-Fähigkeiten und Berechtigungen, der Zugriff auf den Docker-Socket und mehr.

- [Einschränkung der Container-Fähigkeiten](#limiting-container-capabilities)
- [Zugriff auf den Docker-Socket](#docker-socket-access)
- [Landesblockierung!](#blocking-country)
- [Hardening eines CloudFlare-Proxy-Hosts](#hardening-cloudflare-proxy-host)

### Einschränkung der Container-Fähigkeiten

Eine weitere solide Zugriffssteuerungspraxis ist die Einschränkung der Fähigkeiten Ihrer Container. Dies reduziert den Schadensradius vieler Bedrohungen, von Privilegien-Escalation bis hin zu Traffic-Hijacking. Es handelt sich nicht um eine unschlagbare Mauer, aber es entfernt Berechtigungen, die die meisten Container nie benötigen.

**Was sind Fähigkeiten?** Linux-kerndefinierte, benannte Berechtigungen oder Fähigkeiten. (Die [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) Manpage enthält eine vollständige Liste.) Dazu gehören beispielsweise `CAP_CHOWN` (Dateibesitz ändern), `CAP_NET_ADMIN` (Netzwerkschnittstellen konfigurieren), `CAP_KILL` (beliebige Prozesse beenden) und viele mehr.

Die beiden Methoden, um erforderliche Fähigkeiten zu bestimmen, sind:

1. **Versuch und Irrtum**: Diese langsame, aber effektive Methode beginnt mit keiner Fähigkeit, fügt sie dann Schritt für Schritt hinzu, bis Ihre Anwendung funktioniert.
2. **Suche nach Vorgängerarbeit**: Suchen Sie nach "`project-name` `cap_drop` Dockerfile" oder "`project-name` `cap_drop` docker-compose.yml", um zu prüfen, ob andere bereits die Arbeit geleistet haben. Ein LLM kann einen Ausgangspunkt vorschlagen, behandeln Sie dies jedoch wie eine Schätzung, bis Sie den Container testen und die Image-Dokumentation lesen.

#### Best Practices für Fähigkeiten

- **Alle Fähigkeiten entfernen**: Verwenden Sie `cap_drop: [ ALL ]`, um alle Linux-Fähigkeiten aus dem Container zu entfernen.
- **Keine neuen Privilegien**: Verwenden Sie `security_opt: [ no-new-privileges=true ]`, um zu verhindern, dass der Container neue Privilegien erhält.

```yaml title="Beispiel: Fähigkeiten entfernen/einschränken" {5-14}
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

Verwenden Sie die Option `--external`/`external:`, um ein **vorhandenes Netzwerk** beizutreten. Lassen Sie sie weg, um ein neues Netzwerk zu erstellen.

### Docker-Socket-Zugriff

#### ⚠️ Achtung: `docker.sock` ist im Grunde hostseitiger Administratorzugriff

<blockquote class="inset">⚠️ Die Option `:ro` wirkt sich nicht auf die über das Socket gesendeten I/O aus!</blockquote>

Sie stellt lediglich sicher, dass der Socket-Pfad selbst schreibgeschützt eingehängt wird. Die über diesen Socket gesendeten API-Aufrufe können dennoch Container erstellen, hostseitige Pfade einhängen und andere sehr spannende Dinge durchführen, die Sie vermutlich nicht beabsichtigt haben, zu delegieren.

{/* Jeder Prozess, der das Socket öffnen kann, kann (vermutlich) root-Zugriff auf den Host erhalten. */}

#### Best Practices für den Socket

- 🥇 **Vermeiden Sie das Einhängen des Docker-Sockets**, es gibt vermutlich eine bessere Alternative.  
- 🫣 Falls unbedingt notwendig, **stellen Sie einen eng begrenzten Proxy vor das Socket** und erlauben Sie nur die API-Endpunkte, die die Anwendung tatsächlich benötigt. Schauen Sie sich das Projekt `docker-socket-proxy` von Tecnativa an: [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Stellen Sie anschließend sicher, dass die verweigerten Aufrufe tatsächlich verweigert werden.  
- 🤢 Okay, _vielleicht_ ist das Teilen des Sockets in einem **hochvertrauenswürdigen**, **niedrig risikobehafteten** Testumfeld akzeptabel.  

#### Länder sperren!  

Manchmal nützlich, aber keine echte Sicherheitsgrenze.  

_Wir sprechen hier von der geopolitischen Einheit, nicht der Musik..._  

Wenn Sie Anwendungen hauptsächlich für Ihre Familie und Freunde hosten, können Sie Verkehr von Ländern sperren, aus denen Sie keinen Traffic erwarten. Oder umgekehrt: Erlauben Sie nur Verkehr aus Ländern, die Sie erwarten. Das reduziert lästigen Hintergrundverkehr; es stoppt jedoch keine VPNs, Proxys, Botnetze oder geduldigen Angreifer.  

Schauen Sie sich dieses Skript an, um alle Verkehr aus China zu sperren:

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

Ähnlich können Sie den Zugriff auf den Verkehr aus den USA beschränken:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Sicherheitsoptimierung für CloudFlare-Proxy-Host

Wenn Ihr Heimserver hinter einer CloudFlare-IP (Proxy) geschützt ist, können Sie den Zugriff auf nur CloudFlare-IPs und Ihr lokales Netzwerk beschränken.

Dies ist etwas ähnlich wie das [Landessperren](#blocking-country) weiter oben, bietet aber eine viel engere Kontrolle.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Blockieren Sie alle eingehenden Verbindungen!!!
ufw default allow outgoing # Erlauben Sie alle ausgehenden Verbindungen
ufw allow ssh # Erlauben Sie SSH

# Erlauben Sie Zugriff für lokales Subnetz (am besten dediziertes DMZ/VLAN für gehostete Dienste)
ufw allow from 10.0.0.0/8 to any port 443
```

# Erlauben Sie CloudFlare-IPs
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# IPv6-Unterstützung hinzufügen
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Um geobasierte Änderungen zu testen, kann ein VPN mit Standorten im gewünschten Land nützlich sein. Weitere Informationen finden Sie im Abschnitt [Überwachung & Verifikation](#-monitoring--verification).

### Anwendungsschicht-Sicherheit

Sobald Ihr [Netzwerk und Host gesichert sind,](#-network-hazard) stellen Sie fest, dass es noch mehr zu tun gibt.

Jetzt müssen wir uns mit der 'Anwendungsschicht' der Dienste selbst beschäftigen.

Gibt das Datenbank eine gültige Passwort? Automatisiert dieser Container HTTPS/Zertifikate? Enthält die App eingebaute Authentifizierung? Gibt es Grenzen, welche E-Mails sich registrieren dürfen? Gibt es Standardanmeldeinformationen oder Umgebungsvariablen, die geändert werden müssen?

Die einzige Möglichkeit, dies zu _erfahren_, ist, es zu prüfen. Beginnen Sie hierbei mit der `README`-Datei und anderen zentralen Dateien wie `docker-compose.yml`, `Dockerfile` und `.env.*`. Untersuchen Sie sowohl das Projekt selbst als auch idealerweise seine unterstützenden Dienste (z. B. Postgres, Redis usw.).

#### Reverse Proxy

Eine weitere Schutzschicht ist die grundlegende Authentifizierung (Basic Auth). Nutzen Sie sie niemals ohne HTTPS. Bei älteren Diensten ist es oft ausreichend, eine grundlegende Authentifizierung vor einer Admin-Route zu platzieren, um spontane Anfragen und unauthentifizierte Crawler daran zu hindern, den Dienst direkt zu befragen.

```nginx
# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}
```

Erzeugen Sie Anmeldeinformationen:

```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

Mit einer grundlegenden Authentifizierung als Proxy müssen Angreifer eine zusätzliche Hürde (Benutzername und Passwort) überwinden, bevor sie Ihren internen Dienst erreichen. 

Eine Alternative ist die Nutzung eines Dienstes wie [Traefik](https://traefik.io/) oder [Caddy](https://caddyserver.com/), der HTTPS und grundlegende Authentifizierung für Sie automatisieren kann.

Wenn Sie viele Domains und Dienste mit einer grafischen Benutzeroberfläche verwalten möchten, empfehle ich Ihnen [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 Überwachung & Verifikation

- [Überprüfen Sie Ihre Ports](#check-your-ports)
- [Angezeigte Ports ansehen](#view-open-ports)
- [Dateiüberwachung](#file-monitoring)

Dies ist **der wichtigste und am häufigsten übersehene Schritt.** Sie können das beste Firewall-System, das beste Netzwerk und die besten Praktiken haben, aber wenn Sie nicht verifizieren, wissen Sie nicht, ob es funktioniert.

Außerdem kann das Wissen um einige Befehle – oder zumindest die Kenntnis, wo man sie nachschlagen kann – den Unterschied zwischen der Verhinderung eines Sicherheitsvorfalls und einem Leck machen. Das Gefühl, ein Hacker zu sein, ist nur ein Bonus. (Für Details und Beispiele springen Sie direkt zur [Überwachung & Verifikation](#-monitoring--verification)-Sektion.)

<p class="inset">Vertraue nicht, überprüfe zweimal</p>

### Überprüfen Sie Ihre Ports

<p class="inset">⚠️ WICHTIG: Scannen Sie keine Hosts, die nicht Ihnen gehören.</p>

Ob Sie sich in einem Heimnetzwerk oder einem VPS befinden – Sie sollten wissen, welche Ports für die Welt sichtbar sind.

Es gibt zwei Ansätze, dies zu prüfen:

- Netzwerk prüfen (`nmap`, `masscan`)
- Betriebssystem befragen (`lsof`, `netstat`, `ss`)

#### Test außerhalb Ihres Netzwerks

Um Ihre aktuelle (öffentliche) IP-Adresse zu ermitteln, können Sie Dienste wie `ifconfig.me` nutzen: `curl https://ifconfig.me`. Alternativ finden Sie sie in Ihrem Hosting-Anbieter-Dashboard.

```bash title="Öffentliche IP abrufen"
curl -fsSL https://ifconfig.me
# --> AKTUELLE ÖFFENTLICHE IP
```

Sobald Sie Ihre öffentliche IP haben, müssen Sie **eine externe Netzwerkverbindung herstellen.** Nutzen Sie dazu einen Freund’s Computer, ein Smartphone/5G-Hotspot oder einen dedizierten Server.

```bash title="nmap-Scan externer Host"
target_host="$(curl -fsSL https://ifconfig.me)"

# Hinweis: Stellen Sie sicher, dass `target_host` die gewünschte IP ist

# Spezifische Ports scannen:
nmap -A -p 80,443,8080 --open --reason $target_host
# Top 100 Ports:
nmap -A --top-ports 100 --open --reason $target_host
# Alle Ports:
nmap -A -p1-65535 --open --reason $target_host
```

#### Test in Ihrem Netzwerk

Üben Sie mit `nmap`, scannen Sie Ihr lokales Netzwerk oder einen Ihrer Server, prüfen Sie Ihren Router, Drucker, Smart-Kühlschrank.

{/* Während Portscans eine ständige Realität sind, könnte dies unter Umständen gegen das CFAA (Computer Fraud and Abuse Act) in den USA verstoßen. Scannen Sie daher nur Geräte, die Ihnen gehören. */}

#### Beispiel-Scan-Befehle

```bash

# Scannen Sie Ihre lokale Maschine nach allen offenen Ports
nmap -sT localhost

# Scannen Sie die private IP-Adresse Ihres Geräts nach Diensten
nmap -sV 192.168.1.10

# Finden Sie Dienstinformationen in Ihrem Netzwerk
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# Oder in einem Docker-Netzwerk 172.18.0.1/16
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

### Offene Ports ansehen

Lernen Sie `lsof` kennen – es ist auf macOS & Linux verfügbar. Es zeigt detaillierte Netzwerk- und Dateiaktivitäten an.

```bash title="lsof Commands"
# Überwachen Sie einen bestimmten Port
sudo lsof -i:80 -Pn
```

```bash title="lsof Commands"
# Monitor ESTABLISHED connections
sudo lsof -i -Pn | grep ESTABLISHED
# View LISTEN
sudo lsof -i -Pn | grep LISTEN

# to see network names instead of IP addresses (can be very slow to do reverse DNS lookups)
sudo lsof -i -P | grep LISTEN

# Monitor all network connections
sudo watch -n1 "lsof -i -Pn"
```

#### Beispiel-Ausgabe

![nmap-Scan für lauschende Ports](../lsof-scan-listen.webp)

### Dateiüberwachung

Um zu ermitteln, welche **Prozesse** die meisten **Festplattenbandbreiten** nutzen, können Sie `iotop` verwenden:

```bash
sudo iotop
```

Um Einzeldateiveränderungen zu beobachten, können Sie `inotifywait` unter Linux oder `fswatch` unter MacOS verwenden:

Dies kann hilfreich sein, um unbefugtes oder seltsames Verhalten pro Ordner oder systemweit zu erkennen.

```bash
# Überwachen Sie alle Dateiveränderungen in einem Verzeichnis
sudo inotifywait -m /path/to/directory
```

Unter MacOS können Sie `fswatch` verwenden:

Installieren mit `brew install fswatch`

```bash
fswatch -r /path/to/directory
```

## ⏰ Häufig übersehene Tipps

1. **Rate Limiting** für Authentifizierungsversuche und andere wichtige Endpunkte. Ob über das Nginx-Modul `limit_req` oder `fail2ban` für SSH-Zugriffe – das Drosseln von Brute-Force-Angriffen ist _wahrscheinlich_ eine gute Idee. Ich sage _wahrscheinlich_, weil wir in der Ära von IPv6 und günstigen Botnets nicht mehr dasselbe haben, was es früher war.

2. **Lesenur-Volumes verwenden**, soweit möglich:
   ```yaml
services:
     webapp:
       volumes:
         - ./config:/config:ro
```
   Kombiniert mit anderen Best Practices (Nicht-Root-Benutzer, minimale Ordnerberechtigungen) bietet die `:ro`-Mount-Option zusätzliche Schutzmaßnahmen gegen versehentliche Änderungen und einige Schreibversuche aus dem Container heraus. Sie schützt den Host jedoch nicht vor Prozessen, die bereits umfassende Rechte haben.

3. **Containerzugriffsrechte regelmäßig prüfen**.  
   Wenn ein Container ein Geheimnis, einen Port oder einen Mount nicht benötigt, entfernen Sie es!

4. **Achtung vor WiFi-Neugierigen**  
   Sie würden sicher Ihr WiFi-Passwort niemals an irgendwelche seltsamen Typen weitergeben, oder? Außer vielleicht an einige Freunde... Okay, vielleicht auch an Familienmitglieder. Man weiß nie, welche Apps sie installiert haben und ob diese Ihr SSID & Passwort an die Welt weitergeben.

### Heimnetzwerk vs. Public Provider vs. Tunneling

1. **Virtuelle Isolation/DMZ**: Für Heimserversysteme sollten sie, falls möglich, in einer separaten VLAN oder DMZ platziert werden. Dies schützt Ihre internen Geräte vor möglichen Compromisen aus der Serverseite.
   - Verwenden Sie einen separaten Router oder VLAN für Ihren Heimserver.
   - Nutzen Sie ein eigenes WiFi-Netzwerk für Ihren Heimserver.
   - Legen Sie ein separates Subnetz für Ihren Heimserver an.

2. **Cloud-Provider**: Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure und Google Cloud bieten alle unterschiedliche Firewall-Funktionen.  
   - Einige Anbieter & Dienste blockieren Ports standardmäßig. Andere bieten Optionen oder Zusatzmodule an. Prüfen Sie die Dokumentation Ihres Anbieters.  
   - Viele Anbieter bieten erweiterte Monitoring- und Bedrohungserkennungsdienste an.  

3. **VPNs & Tunneling**: Nutzen Sie eine VPN-ähnliche Option oder Tunneling-Dienst, um Dienste sicher über das Internet zu verbinden, ohne sie dem öffentlichen Internet auszusetzen.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.  

{/* 3. **Absicherung gegen interne/laterale Angriffe**: Ein infiziertes Gerät kann ein gesamtes Netzwerk gefährden. Das Segmentieren von Docker-Diensten auf benutzerdefinierten Netzwerken, die Nutzung von Hardware, UFW-Regeln und das Blockieren unnötiger Ports können das Risiko reduzieren (wenn ordnungsgemäß konfiguriert). */}  

## 🚀 Produktivumgebung-Checkliste  

- [ ] **Geheimnisse**: Alle Geheimnisse zufällig generiert und sicher gespeichert  
- [ ] **Updates**: Container-Update-Strategie dokumentiert und automatisiert. (Okay, wenn es nur ein paar Befehle in einer Textdatei sind.)  
- [ ] **Netzwerk**: Nur notwendige Ports freigegeben, interne Netzwerke eingerichtet.  
- [ ] **Firewall-Regeln**: Standard-Verweigerung, explizite Erlaubnisse, Länderblockaden bei Bedarf.  
- [ ] **Reverse Proxy**: Nginx, Caddy oder Traefik können eine Schicht mit Basis-Authentifizierung hinzufügen  
- [ ] **Canary Tokens**: Platzieren Sie sie in der Nähe der sensiblen Dateien und Anmeldeinformationen, die Sie tatsächlich untersuchen würden, wenn sie angefasst werden.  
- [ ] **Monitoring**: Kennen Sie Ihre Systeme mit `nmap`, `lsof`, `inotifywait`, `glances`, usw.  
- [ ] **Backup-Strategie**: Getestet, idealerweise automatisiert und an einem anderen Ort.  
- [ ] **Prinzip des kleinsten Vertrauens**: Nicht-root-Container-Benutzer, read-only-Volumes.  

## 📚 Weitere Lektüre

- [Docker-Sicherheits-Best Practices](https://docs.docker.com/develop/security-best-practices/)  
- [OWASP Docker-Sicherheits-Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)  
- [CIS Docker-Benchmark](https://www.cisecurity.org/benchmark/docker)  
- [Canarytokens.org für Canary-Tokens](https://canarytokens.org/)  

## Dank  

Ein Dank an einige aufmerksame Redditer:  

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [Thread](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>  
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>  
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>  
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>  
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>  

Vielen Dank fürs Lesen! Ich hoffe, Sie haben diese Anleitung nützlich gefunden. Wenn Sie Fragen oder Vorschläge haben, zögern Sie nicht, mich über die unten stehenden Sozialen Medien zu kontaktieren, oder klicken Sie einfach auf den Link „Auf GitHub bearbeiten“, um ein PR zu erstellen! ❤️
````
