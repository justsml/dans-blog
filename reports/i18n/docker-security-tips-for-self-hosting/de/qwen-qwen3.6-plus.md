# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: de
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.01
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug docker-security-tips-for-self-hosting --locale de --model qwen/qwen3.6-plus --chunk 6p --quiz-concurrency 24
## Raw Output

````mdx
---
title: Wichtige Docker-Sicherheitstipps für Self-Hosting
subTitle: Sichern Sie Ihre selbstgehosteten Dienste – von der Abwehr bis zum Monitoring!
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
- 🔐 [Geheimnisverwaltung: Die richtige Art](#geheimnisverwaltung)
- 🌐 [Netzwerkgefahr](#netzwerkgefahr)
- 🛡️ [Zugriffssteuerung](#zugriffssteuerung)
- 🔍 [Überwachung & Verifikation](#überwachung--verifikation)
- ⏰ [Oft übersehene Tipps](#oft-übersehene-tipps)
- 🚀 [Produktionscheckliste](#produktionscheckliste)
- 📚 [Weitere Lektüre](#weitere-lektüre)

## 🧗‍♀️ Für die Mutigen

Wenn Sie Docker-Dienste selbst hosten, ist die Sicherheit Ihre Verantwortung von oben bis unten – kein Cloud-Anbieter schützt Sie vor Portscans oder schlampiger Konfiguration. Ob Sie Apps in Ihrem Heimnetzwerk starten oder VPS von Anbietern wie Vultr, DigitalOcean, Linode, AWS, Azure oder Google Cloud mieten – Sie müssen Dinge absichern und prüfen, ob Sie es richtig gemacht haben.

In diesem Leitfaden durchlaufen wir Docker-Sicherheit – von einigen `weniger bekannten` bis hin zu anderen `schwierig umzusetzenden` Techniken; wir werden Kanarische Tokens, schreibgeschützte Volumes, Firewall-Regeln, Netzwerktrennung und -verstärkung sowie authentifizierte Proxies und mehr untersuchen.

Wir vergleichen auch Heimnetzwerke mit öffentlichen Cloud-Infrastrukturen und zeigen Ihnen, wie Sie einen einfachen Authentifizierungs-Proxy mit Nginx einrichten. Am Ende werden Sie mehrere Optionen haben, um die Unwissenden (Freunde, Familie und manchmal sogar sich selbst…) auszusperren.  

Das sind viele Themen! Aber vieles davon hängt zusammen, und Sie können auswählen, was für Ihre Infrastruktur am relevantesten ist. 🍀  

## 🔄 Der `:latest`-Tanz  

Das Aktualisieren von Images ist für die Sicherheit entscheidend. Allerdings können Abhängigkeiten von `:latest` brüchige Änderungen oder veraltete Builds ohne Review-Schritt einführen.  

### Die sichere Art zu aktualisieren  

Kombinieren Sie Update-Befehle mit `pull` oder `build`, um Images bewusst zu aktualisieren und anschließend in einem Zeitfenster Neustarten, in dem Sie Brüche bemerken können.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Versionspinnung vs. latest

Die Wahl der richtigen Version, an die Sie anheften, ist ein Kompromiss zwischen Stabilität und Sicherheit. Hier sind einige gängige Strategien:

```yaml
# docker-compose.yml
# ...
  # Exakte Versionspinnung, am besten für kritische Dienste
  image: postgres:17.2

  # Patch-Versionpinnung, gut für nicht-kritische Dienste
  image: postgres:17.2

  # Major-Versionpinnung, perfekt für Hobbyprojekte
  image: postgres:17

  # Yolo, möglichst vermeiden
  image: postgres:latest
```

Nutzen Sie [Dependabot](https://github.com/features/security) oder [Renovate](https://github.com/renovatebot/renovate), um überprüfbare Update-PRs zu öffnen. Für alles, was Ihnen bei der Neubauung um 2 Uhr morgens leid tun würde, heften Sie sich an eine spezifische Version oder Digest an und lassen Sie Automatisierung Ihnen sagen, wann Sie weiterziehen sollen.

_Teilen Sie mir Ihre Lieblingstools für die Aufrechterhaltung aktueller Docker-Images mit!_

## 🔐 Geheimnisanwaltung

- [Starke Geheimnisse generieren](#generate-strong-secrets)
- [Canary Tokens](#canary-tokens)
- [Von `.env` auf MacOS Keychain aufrüsten](#upgrade-from-env-to-macos-keychain)
{/* - [Placeholder Validation](#placeholder-validation) */}

Es gibt viele Wege, Geheimnisse zu verwalten, aber eine der wichtigsten Regeln ist: **Verhärten Sie niemals Geheimnisse in Ihren Docker-Images oder committen Sie sie in Git.** Es ist einer der häufigsten Sicherheitsfehler, birgt langfristige Risiken und ist ärgerlich zu beheben.

Die sichere Speicherung von Geheimnissen ist ein umfangreiches Thema mit vielen Optionen, von `.env`-Dateien, [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), bis hin zu Geheimnis-Verwaltungs-Tools wie [HashiCorp Vault](https://www.vaultproject.io/) oder AWS Secrets Manager.

Sie müssen die „richtige“ Balance aus Aufwand & Sicherheit für Ihren Use-Case wählen.

{/*
TODO: In den Maintainer's Guide verschieben
// TODO: In den Maintainer's Guide verschieben

### Placeholder-Validierung

<blockquote>Man glaubt kaum, wie einfach es ist, einen JWT-Token zu hacken, wenn das Geheimnis nicht geheim bleibt!</blockquote>

<p className='inset'>💡 Stellen Sie sicher, dass Geheimnisse immer eindeutig sind. Versuchen Sie, es unmöglich zu machen, mit unsicheren/hard-coded Standardwerten zu laufen.</p>

Wenn Sie Platzhalter wie `__WARNING_REPLACE_ME__` in Ihren Geheimnissen verwenden, gut, vielleicht bemerkt jemand es!

Um sicherzugehen, können Sie auch eine kleine Laufzeit-Sicherheit mit geringem Aufwand hinzufügen. Hier ist, wie Sie es in JavaScript, Rust und Go umsetzen könnten:

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

### Starke Geheimnisse generieren

### Canary Tokens

[**Canary Tokens**](https://canarytokens.org/) sind eine hervorragende Methode, um zu erkennen, ob Ihre Geheimnisse kompromittiert (und genutzt) wurden. Sie funktionieren wie Sicherungsfäden, die Sie in sensible Dateien, URLs und Tokens einfügen können.

Betrachten Sie es als sinnvoll, sie neben den Geheimnissen zu platzieren, bei denen Sie sich wirklich Sorgen machen: `.env`-Dateien, CI-Variablen, Passwort-Manager, Backup-Ordner und Cloud-Anmeldeinformationen. Machen Sie das nicht zur Show – platzieren Sie Sicherungsfäden dort, wo ein echter Angreifer oder ein zukünftiger Sie versehentlich auf sie stößt.

Es gibt viele Arten von Canary "Tokens", darunter AWS-Token, [falsche Kreditkarten](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html)-nummern, Excel- und Word-Dateien, Kubeconfig-Dateien, VPN-Anmeldeinformationen, sogar SQL-Dump-Dateien können einen Sicherungsfaden enthalten!

#### Canary Token-Best Practices

- **An allen Stellen platzieren**: In jeder `.env`-Datei, CI/CD-Pipeline und jedem "Secrets-Manager", den Sie sich vorstellen können.
  - Legen Sie eine `passwords.xlsx`- oder `passwords.docx`-Datei in Ihr Heimatverzeichnis.
  - Fügen Sie ein AWS-Profil `billing_prod` mit einem Canary Token als Geheimnis hinzu.
  - Generieren Sie eine `private.key`-Datei für Ihr `~/.ssh`-Verzeichnis.
  - Erstellen Sie einen Canary SQL-Dump `all_credit_cards.sql` für Ihr `~/backups`-Verzeichnis.
- **Überwachen**: Richten Sie E-Mail-Regeln/Alarme ein, um zu erkennen, wann ein Canary Token ausgelöst wird.

### Upgrade von `.env` zum MacOS Keychain

Für Mac-Nutzer ist eine der einfachsten Optionen die Verwendung des Keychains.

Hier ist eine einfache Methode, um Geheimnisse automatisch aus dem OSX Keychain zu laden, die `TouchID` unterstützt und sicherer ist als `.env`-Dateien.

Das Original <cite>verdankt [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) und [Jan Schaumann](https://www.netmeister.org/</cite> die Credits.

<CodeTabs client:load tabs={[
  "Helper commands",
  "Persist secrets in environment",
  "Use secrets per command"]
}>
```bash title="keychain-secrets.sh"
### Funktionen zum Setzen und Abrufen von Umgebungsvariablen aus dem OSX Keychain ###
### Adaptiert von: https://www.netmeister.org/blog/keychain-passwords.html und 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# Verwendung: get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Verwendung: set-keychain-secret SECRET_ENV_VAR
# Sie werden aufgefordert, den Geheimniswert einzugeben!
function set-keychain-secret () {
    [ -n "$1" ] || print "Name der Umgebungsvariable fehlt"
    
    # Aufforderung an Benutzer für Geheimnis
    echo -n "Geheimnis für ${1} eingeben"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Lade Umgebungsvariablen in die aktuelle Shell
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Hinweis: Wenn ein Angreifer `env` in Ihrer Shell ausführen kann, könnten diese Geheimnisse preisgegeben werden!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Spezifiziere alle Geheimnisse für dieses Projekt
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Hinweis: Das Verwenden einer Shell-Wrapper-Hülle hilft dabei, Geheimnisse daran zu hindern, in der Umgebung zu verbleiben. Und es ist sicher, dies zu committen.

# Verwendung:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 Netzwerkrisiken

### Eigene Netzwerke & interne Ports

Die ordnungsgemäße Isolation von Diensten mit Docker-Netzwerken ist eine wichtige Methode, um die Angriffsfläche zu reduzieren.

Vorsicht beim Anbohren von Löchern in Ihr Netzwerk! Eine falsch konfigurierte Portweiterleitung kann sehr schlimm enden.

Standardmäßig werden Dienste in einem privaten LAN nicht über das Internet zugänglich sein – Sie müssen Ports explizit von Ihrem Router weiterleiten.

### Docker im LAN

Ob Sie als Entwickler lokale Entwicklungsserver betreiben oder Dienste aus Ihrem lokalen Netzwerk selbsthosten, **Annahmen über das Netzwerkmodell von Docker können zu Problemen führen.**

Entwickler sind oft überrascht, festzustellen, dass die „traditionellen“ Methoden zur Sicherung von Linux-Servern (`iptables`, Einschränkung von TCP/IP-Sysctl-Optionen) auf Docker-Hosts **stillschweigend fehlschlagen können!** Dies gilt insbesondere, wenn **Sie auf einem typischen Heimnetzwerk oder in einer selbsthosteten Umgebung laufen.** (Für diejenigen hinten im Raum: Dies kann den Zugriff auf Entwicklungscontainer auf Ihrem MacBook ermöglichen!!!)

> ⚠️ **Warnung #1:** Von Docker veröffentlichte Ports können die Firewall-Regeln umgehen, die Sie für den Schutz des Hosts gehalten haben, insbesondere bei UFW unter Ubuntu/Debian. Das macht nicht jede Firewall-Regel nutzlos, aber es bedeutet, dass „UFW lehnt ab“ keine Garantie ist. [Siehe Issue #690: Docker umgeht ufw-Firewall-Regeln](https://github.com/moby/moby/issues/690).

> ⚠️ **Warnung #2:** Das Binden von Ports an lokale IP-Adressen (z. B. `-p 127.0.0.1:8080:80`) ist der richtige Standard, aber Docker Engine-Versionen älter als 28.0.0 hatten Fälle, in denen Hosts auf dem gleichen L2-Netzwerk dennoch auf über localhost veröffentlichte Ports zugreifen konnten. [Docker dokumentiert diesen Einschränkung in seinem Port-Publishing-Leitfaden](https://docs.docker.com/engine/network/port-publishing/), und die Gewohnheit, mit `nmap` zu prüfen, bleibt wichtig.

<p class="inset">Wenn Sie überrascht sind, das zu erfahren, dann sind Sie nicht allein!</p>

**Das Binden an lokale IPs ist nach wie vor eine gute Praxis** und hat eine bedeutsame Auswirkung in **verwalteten Cloud-Umgebungen und speziell konfigurierten Netzwerken.** 
{/* Denken Sie nicht, dass Ihre Firewall oder Ihr privates Netzwerk Ihre Haupt- oder einzige Verteidigung sind, fügen Sie Docker-Netzwerke für bessere **Isolation** hinzu, und prüfen Sie immer, ob Sie Ports überhaupt freigeben müssen. */}

### Beispiel Docker Compose

Hier ist eine Beispiel-Datei `docker-compose.yml`, die den `app`-Dienst an `127.0.0.1:8080` bindet und beide Container an das `backend`-Netzwerk anschließt.

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # Bind an localhost, falls möglich
      - "127.0.0.1:8080:8080"
    # ... andere Einstellungen
  database:
    image: postgres:17.1
    # Keine Ports notwendig; innerhalb des backend-Netzwerks zugänglich.
    networks:
      - backend

```

{/* #### Test & Verifikation

Wie bei allen Sicherheitsmaßnahmen ist es entscheidend, dass Sie Ihr Netzwerksetup **testen und verifizieren**. */}

{/* Während Netzwerksicherheit und Auditing in den meisten Unternehmen eine Vollzeitverantwortung sind, verbringen die meisten Selbst-Hoster **gar keine Zeit** damit! */}

{/* Schauen Sie, ich verstehe, dass es beunruhigend sein kann. _(Subnetze, Netzmaske, CIDR, VLANs und Routetabellen, oh mein Gott! Falls das keinen Sinn ergab, ist das in Ordnung, Sie sind am richtigen Ort. Außerdem müssen wir uns für den Moment um keinerlei davon kümmern.)_ */}

### Netzwerk-Best Practices

- 🏆 **Veröffentlichen Sie KEINE Ports** Vor Kurzem habe ich gelernt, dass dies nützlicher ist, als Sie erwarten könnten! Bei der Verwendung eines benannten (Bridge-)Netzwerks haben Container uneingeschränkten Zugriff aufeinander. Sie verhalten sich, als wären sie hinter einem lokalen Netzwerk (NAT-Gateway).
  - Obwohl dies in einigen Use-Cases nicht möglich ist, kann dies nützlich sein für Container, die Batch-Jobs ausführen oder hauptsächlich über `attach` oder `exec` zugänglich sind.
- 🥇 **Verwenden Sie Docker-Netzwerke**, um zu isolieren und zu kontrollieren, welche Container miteinander kommunizieren dürfen.
- 🥉 **Verwenden Sie Localhost-Binding**: Während [fehleranfällig](https://github.com/moby/moby/issues/45610), sind Sie in den meisten Fällen besser dran, Ports an eine Loopback-Adresse (z. B. `127.0.0.1:8080:80`) zu binden. Stellen Sie einfach sicher, dass Sie [Ihre Konfiguration überprüfen.](#-Monitoring--Verification)

## 🛡️ Zugriffssteuerung

Zugriffssteuerungen sind ein entscheidender Bestandteil der Sicherung Ihrer Docker-Dienste. Dazu gehören die Begrenzung von Container-Berechtigungen und -Fähigkeiten, die Einschränkung des Zugriffs auf den Docker-Socket und mehr.

- [Begrenzung von Container-Berechtigungen](#begrenzung-von-container-berechtigungen)
- [Zugriff auf Docker-Socket](#docker-socket-zugriff)
- [Landesblockierung!](#landesblockierung)
- [Hardening eines CloudFlare-Proxy-Hosts](#hardening-von-cloudflare-proxy-host)

### Begrenzung von Container-Berechtigungen

Ein weiteres solides Zugriffssteuerungskonzept ist die Begrenzung der Fähigkeiten Ihrer Container. Dies reduziert den Blast Radius zahlreicher Bedrohungen, von Privilegien-Ausweitung bis hin zu Traffic-Hijacking. Es handelt sich nicht um eine unüberwindbare Barriere, entfernt aber Berechtigungen, die die meisten Container ohnehin nicht benötigen.

**Was sind Fähigkeiten?** Linux-kerneltypisierte, benannte Berechtigungen oder Fähigkeiten. (Die [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) Manpage enthält eine vollständige Liste.) Dazu gehören z. B. `CAP_CHOWN` (Dateibesitz ändern), `CAP_NET_ADMIN` (Netzwerkschnittstellen konfigurieren), `CAP_KILL` (jeden Prozess beenden) und viele mehr.

Die beiden Methoden, um benötigte Fähigkeiten zu bestimmen, sind:

1. **Versuch und Irrtum**: Diese langsame, aber effektive Methode beginnt mit keiner Berechtigung und fügt sie schrittweise hinzu, bis Ihre App funktioniert.
2. **Suche nach Vorbildern**: Suchen Sie nach "`project-name` `cap_drop` Dockerfile" oder "`project-name` `cap_drop` docker-compose.yml", um zu sehen, ob andere bereits die Arbeit erledigt haben. Ein LLM kann einen Ausgangspunkt vorschlagen, behandeln Sie dies jedoch wie eine Schätzung, bis Sie den Container testen und die Image-Dokumentation lesen.

#### Best Practices zu Fähigkeiten

- **Entfernen Sie alle Berechtigungen**: Verwenden Sie `cap_drop: [ ALL ]`, um alle Linux-Berechtigungen aus dem Container zu entfernen.
- **Keine neuen Privilegien**: Verwenden Sie `security_opt: [ no-new-privileges=true ]`, um zu verhindern, dass der Container neue Privilegien erhält.

```yaml title="Beispiel: Fähigkeiten entfernen/begrenzen" {5-14}
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

Verwenden Sie die Option `--external`/`external:` für die **Verbindung zu einem vorab erstellten Netzwerk**. Lassen Sie sie weg, um ein neues Netzwerk zu erstellen.

### Docker-Socket-Zugriff

#### ⚠️ Warnung: `docker.sock` ist im Grunde Root-Zugriff auf den Host

<blockquote class="inset">⚠️ Die Option `:ro` wirkt sich **nicht** auf die über das Socket gesendeten I/O-Daten aus!</blockquote>

Sie stellt lediglich sicher, dass der Socket-Pfad selbst schreibgeschützt gemountet wird. Die über dieses Socket gesendeten API-Aufrufe können dennoch Container erstellen, Host-Pfade mounten und andere sehr spannende Dinge ausführen, die Sie wahrscheinlich nicht delegieren wollten.

{/* Jeder Prozess, der das Socket "öffnen" kann, kann (wahrscheinlich) Root-Zugriff auf den Host erlangen. */}

#### Best Practice für Sockets

- 🥇 **Vermeiden Sie das Mounten des Docker-Sockets**, es gibt wahrscheinlich eine bessere Alternative.  
- 🫣 Falls unumgänglich, **setzen Sie eine enge Proxy-Schicht voran** und erlauben Sie nur die API-Endpunkte, die die App tatsächlich benötigt. Schauen Sie sich das Projekt `docker-socket-proxy` von Tecnativa an: [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Stellen Sie anschließend sicher, dass die abgelehnten Aufrufe tatsächlich blockiert werden.  
- 🤢 Okay, _vielleicht_ ist das Teilen in einem sehr **hochvertrauenswürdigen**, **niedrigrisikobehafteten** Testumfeld akzeptabel.  

#### Länder sperren!  

Manchmal nützlich, aber keine echte Sicherheitsgrenze.  

_Es geht um die geopolitische Einheit, nicht um die Musik..._  

Wenn Sie Apps hauptsächlich für Ihre lokale Familie & Freunde hosten, können Sie Traffic aus Ländern sperren, von denen Sie keine Anfragen erwarten. Oder umgekehrt: Nur Traffic aus erwarteten Ländern zulassen. Das reduziert Rauschen; es stoppt aber weder VPNs, Proxies, Botnetze noch Geduldige.  

Schauen Sie sich dieses Skript an, um alle IPs aus China zu blocken:

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

Ähnlich können Sie auch nur Traffic aus den USA zulassen:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Sicherheit für CloudFlare-Proxy-Host stärken

Wenn Ihr Heimserver hinter einer CloudFlare-IP (Proxy) geschützt ist, können Sie den Zugriff auf nur CloudFlare-IPs und Ihr lokales Netzwerk beschränken.

Dies ist etwas ähnlich wie die [Länderblockierung](#blocking-country) weiter oben, bietet aber eine viel engere Kontrolle.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Alle eingehenden Verbindungen sperren!!!
ufw default allow outgoing # Alle ausgehenden Verbindungen erlauben
ufw allow ssh # SSH erlauben

# Zugriff für lokales Subnetz erlauben (am besten dedizierter DMZ/VLAN für gehostete Dienste)
ufw allow from 10.0.0.0/8 to any port 443
```

# Erlaube CloudFlare-IPs
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# IPv6-Unterstützung hinzufügen
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Um geobasierte Änderungen zu testen, kann ein VPN mit Standorten im gewünschten Land nützlich sein. Weitere Informationen finden Sie im Abschnitt [Überwachung & Verifikation](#-monitoring--verification).

### Anwendungsschicht-Sicherheit

Wenn Ihr [Netzwerk und Host sicherheitstechnisch abgesichert sind,](#-network-hazard) stellt sich heraus, dass es noch mehr zu tun gibt.

Jetzt müssen wir uns mit der 'Anwendung'sschicht unserer eigenen Dienste beschäftigen.

```markdown
<p class="inset">Hat diese Datenbank ein gültiges Passwort? Automatisiert dieser Container HTTPS/Zertifikate? Enthält die App eine integrierte Authentifizierung? Gibt es Grenzen, welche E-Mails sich registrieren können? Gibt es Standardanmeldeinformationen oder Umgebungsvariablen, die geändert werden müssen?</p>

Die einzige Möglichkeit, dies zu _wissen_, ist, es zu überprüfen. In diesem Fall beginnen Sie mit der `README`-Datei und anderen Schlüsseldateien wie `docker-compose.yml`, `Dockerfile` und `.env.*`. Sowohl im Projekt selbst als auch idealerweise auch in seinen unterstützenden Diensten (z. B. Postgres, Redis usw.).

#### Reverse Proxy

Eine weitere Schicht der Verteidigung ist die Basic-Authentifizierung. Verwenden Sie sie nicht ohne HTTPS. Für alte Dienste ist es oft ausreichend, Basic-Authentifizierung vor einer Admin-Route zu platzieren, um Drive-by-Anfragen und unauthentifizierte Crawler daran zu hindern, den Dienst direkt zu bedienen.

```nginx
# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}
```

Anmeldeinformationen generieren:

```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

Mit einer Basic-Authentifizierungs-Proxy-Schicht haben Angreifer eine zusätzliche Hürde – Benutzername und Passwort – vor der internen Dienstinstanz.

Eine weitere Option ist die Verwendung eines Dienstes wie [Traefik](https://traefik.io/) oder [Caddy](https://caddyserver.com/), der HTTPS und Basic-Authentifizierung für Sie automatisieren kann.
```

Wenn Sie viele Domains und Dienste mit einer Benutzeroberfläche verwalten möchten, empfehle ich Ihnen [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 Überwachung & Verifikation

- [Überprüfen Sie Ihre Ports](#check-your-ports)
- [Anzeige offener Ports](#view-open-ports)
- [Dateiüberwachung](#file-monitoring)

Dies ist **der wichtigste und am meisten übersehene Schritt.** Sie können die beste Firewall, das beste Netzwerk und die besten Praktiken haben, aber wenn Sie es nicht überprüfen, wissen Sie nicht, ob es funktioniert.

Außerdem kann das Wissen über einige Befehle oder wo man sie nachschlagen kann den Unterschied bei der Verhinderung eines Sicherheitsvorfalls ausmachen. Das Gefühl, ein Hacker zu sein, ist nur ein Bonus. (Für Details und Beispiele springen Sie vor zur [Überwachung & Verifikation](#-monitoring--verification)-Sektion.)

<p class="inset">Vertrauen Sie nicht, überprüfen Sie zweimal</p>

### Überprüfen Sie Ihre Ports

<p class="inset">⚠️ Wichtig: Scannen Sie keine Hosts, die Sie nicht besitzen.</p>

Ob Sie sich in einem Heimnetzwerk oder einem VPS befinden – Sie werden wissen wollen, welche Ports für die Öffentlichkeit geöffnet sind.

Es gibt zwei Möglichkeiten, dies zu überprüfen:

- Netzwerk prüfen (`nmap`, `masscan`)
- Betriebssystem befragen (`lsof`, `netstat`, `ss`)

#### Netzwerkaußenprüfung

Sie benötigen Ihre aktuelle (öffentliche) IP-Adresse, leicht erreichbar über Dienste wie `ifconfig.me`: `curl https://ifconfig.me`. Alternativ können Sie sie in der Konsole Ihres Hosting-Anbieters nachschlagen.

```bash title="Öffentliche IP abrufen"
curl -fsSL https://ifconfig.me
# --> AKTUELLE ÖFFENTLICHE IP
```

Sobald Sie Ihre öffentliche IP haben, müssen Sie **eine externe Netzwerkverbindung herstellen**. Dazu können Sie einen Freundes-Computer, ein Mobiltelefon/5G-Handy oder einen dedizierten Server-Host nutzen.

```bash title="nmap-Externer Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# Hinweis: Stellen Sie sicher, dass `$target_host` die gewünschte IP ist

# Spezifische Ports scannen:
nmap -A -p 80,443,8080 --open --reason $target_host
# Top 100 Ports:
nmap -A --top-ports 100 --open --reason $target_host
# Alle Ports:
nmap -A -p1-65535 --open --reason $target_host
```

#### Test in Ihrem Netzwerk

Üben Sie mit `nmap`, scannen Sie Ihr lokales Netzwerk oder einen Ihrer Server, prüfen Sie Ihren Router, Drucker, Smart-Kühlschrank.

{/* Während Portscans ein ständiger Bestandteil des Lebens sind, könnte dies eine Verletzung des CFAA (Computer Fraud and Abuse Act) in den USA sein. Scannen Sie daher nur Geräte, die Sie besitzen. */}

#### Beispiel-Scan-Befehle

```bash

# Scannen Sie Ihren localhost nach allen offenen Ports
nmap -sT localhost

# Scannen Sie die private IP Ihres Computers nach Diensten
nmap -sV 192.168.1.10

# Finden Sie Dienstdetails in Ihrem Netzwerk
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# Oder bei Docker 172.18.0.1/16
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

Lernen Sie `lsof` kennen – es ist unter MacOS und Linux verfügbar. Es zeigt detaillierte Netzwerk- und Scheibenaktivität an.

```bash title="lsof Befehle"
# Überwachen Sie einen spezifischen Port
sudo lsof -i:80 -Pn
```

```
# ETABLIERTE Verbindungen überwachen
sudo lsof -i -Pn | grep ESTABLISHED
# LISTEN anzeigen
sudo lsof -i -Pn | grep LISTEN

# Netzwerknamen anstelle von IP-Adressen anzeigen (Umkehrung von DNS-Lookups kann sehr langsam sein)
sudo lsof -i -P | grep LISTEN

# Alle Netzwerkverbindungen überwachen
sudo watch -n1 "lsof -i -Pn"
```

#### Beispiel Ausgabe

![nmap-Scan für Hörer](../lsof-scan-listen.webp)

### Dateiüberwachung

Um zu ermitteln, welche **Prozesse** die meisten **Festplattenbandbreiten** nutzen, können Sie `iotop` verwenden:

```bash
sudo iotop
```

Um Einzeldateiveränderungen zu beobachten, können Sie `inotifywait` unter Linux oder `fswatch` unter MacOS verwenden:

Dies kann nützlich sein, um unbefugtes oder ungewöhnliches Verhalten pro Ordner oder systemweit zu erkennen.

```bash
# Alle Dateiveränderungen in einem Verzeichnis überwachen
sudo inotifywait -m /pfad/zum/verzeichnis
```

Unter MacOS können Sie `fswatch` verwenden:

Installieren mit `brew install fswatch`

```bash
fswatch -r /pfad/zum/verzeichnis
```

## ⏰ Oft übersehene Tipps

1. **Rate Limiting** für Authentifizierungsversuche und andere kritische Endpunkte. Ob über das Nginx-Modul `limit_req` oder `fail2ban` für SSH-Zugriffe – das Drosseln von Brute-Force-Angriffen ist _wahrscheinlich_ eine gute Idee. Ich sage _wahrscheinlich_, weil in der Ära von IPv6 und günstigen Botnetzen das nicht mehr ganz so aussieht wie früher.

2. **Read-Only Volumes** einsetzen, soweit möglich:
   ```yaml
services:
     webapp:
       volumes:
         - ./config:/config:ro
```
   Kombiniert mit anderen Best Practices (nicht-root-Benutzer, minimale Ordnerberechtigungen) bietet die `:ro`-Volume-Mount-Option zusätzliche Schutzmaßnahmen gegen versehentliche Änderungen und einige Schreibversuche aus dem Container heraus. Es schützt den Host jedoch nicht vor Prozessen, die bereits umfassende Rechte besitzen.

3. **Container-Zugriffsrechte regelmäßig prüfen**.  
   Wenn ein Container ein Geheimnis, einen Port oder eine Mount-Datei nicht benötigt – entfernen!

4. **Achtung bei WiFi-Abenteurern**  
   Sicher, Sie würden niemals Ihren WiFi-Code an irgendwelche seltsamen Typen weitergeben, oder? Außer vielleicht an einige Freunde... Okay, vielleicht auch an Familienmitglieder. Man weiß nie, welche Apps sie installiert haben und ob diese Ihren SSID & Passwort an die Welt weitergeben.

### Heimnetzwerk vs. Öffentlicher Anbieter vs. Tunneling

1. **Virtuelle Isolation/DMZ**: Für Heimserverszenarien sie in eine separate VLAN oder DMZ legen, falls möglich. Dies schützt interne Geräte vor potenziellen Compromisen durch den Server.
   - Nutzen Sie einen separaten Router oder VLAN für Ihren Heimserver.
   - Nutzen Sie ein separates WiFi-Netzwerk für Ihren Heimserver.
   - Nutzen Sie ein separates Subnetz für Ihren Heimserver.

2. **Cloud-Anbieter**: Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure und Google Cloud bieten alle unterschiedliche Firewall-Funktionen.  
   - Einige Anbieter & Dienste schließen Ports standardmäßig. Andere bieten Optionen oder Zusatzdienste. Prüfen Sie die Dokumentation Ihres Anbieters.  
   - Viele Anbieter bieten erweiterte Überwachung und Bedrohungserkennungsdienste an.  

3. **VPNs & Tunneling**: Nutzen Sie eine VPN-ähnliche Option oder Tunneling-Dienst, um Dienste sicher über das Internet zu verbinden, ohne sie dem öffentlichen Internet auszusetzen.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.  

{/* 3. **Schutz vor internen/lateralen Angriffen**: Ein infiziertes Gerät kann ein gesamtes Netzwerk kompromittieren. Das Segmentieren von Docker-Diensten auf benutzerdefinierten Netzwerken, die Nutzung von Hardware, UFW-Regeln und das Blockieren unnötiger Ports können das Risiko reduzieren (wenn ordnungsgemäß konfiguriert). */}  

## 🚀 Produktions-Checkliste  

- [ ] **Geheimnisse**: Alle Geheimnisse zufällig generiert und sicher gespeichert  
- [ ] **Updates**: Container-Update-Strategie dokumentiert und automatisiert. (Okay, wenn es nur ein paar Befehle in einer Textdatei sind.)  
- [ ] **Netzwerk**: Nur notwendige Ports freigegeben, interne Netzwerke eingerichtet.  
- [ ] **Firewall-Regeln**: Standard-Verweigerung, explizite Erlaubnisse, Länderblockierungen bei Bedarf.  
- [ ] **Reverse Proxy**: Nginx, Caddy oder Traefik können eine Schicht Basis-Authentifizierung hinzufügen  
- [ ] **Canary Tokens**: Platzieren Sie sie in der Nähe der sensiblen Dateien und Anmeldeinformationen, die Sie tatsächlich untersuchen würden, wenn sie angefasst werden.  
- [ ] **Überwachung**: Nutzen Sie `nmap`, `lsof`, `inotifywait`, `glances`, usw., um Ihre Systeme zu kennen.  
- [ ] **Backup-Strategie**: Getestet, idealerweise automatisiert und extern gespeichert.  
- [ ] **Minimales Privileg**: Nicht-root-Container-Benutzer, schreibgeschützte Volumes.  

## 📚 Weitere Lektüre

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)  
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)  
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)  
- [Canarytokens.org für Canary Tokens](https://canarytokens.org/)  

## Dank  

Ein Lob an einige aufmerksame Redditer:  

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [thread](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>  
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>  
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>  
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>  
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>  

Vielen Dank fürs Lesen! Ich hoffe, Sie haben diese Anleitung hilfreich gefunden. Haben Sie Fragen oder Vorschläge? Kontaktieren Sie mich gerne über meine Social-Media-Kanäle unten, oder klicken Sie auf den Link `Edit on GitHub`, um einen Pull Request zu erstellen! ❤️
````
