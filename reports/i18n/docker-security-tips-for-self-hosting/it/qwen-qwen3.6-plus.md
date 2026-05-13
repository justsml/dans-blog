# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: it
- Model: qwen/qwen3.6-plus
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.05
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug docker-security-tips-for-self-hosting --locale it --model qwen/qwen3.6-plus --chunk 6p --run-id 2026-05-13T19-05-13-381Z-80623 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
title: Consigli essenziali di sicurezza Docker per il self-hosting
subTitle: 'Proteggi i tuoi servizi self-hosted, dalla difesa al monitoraggio!'
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
import {CodeTabs} from '../../../../components/CodeTabs';

**Indice**

- 🧗‍♀️ [Per i coraggiosi](#️-per-i-coraggiosi)
- 🔄 [La danza del `:latest`](#-la-danza-del-latest)
- 🔐 [Gestione dei segreti: il modo giusto](#-gestione-dei-segreti)
- 🌐 [Pericolo di rete](#-pericolo-di-rete)
- 🛡️ [Controlli di accesso](#️-controlli-di-accesso)
- 🔍 [Monitoraggio e verifica](#-monitoraggio-e-verifica)
- ⏰ [Consigli spesso trascurati](#-consigli-spesso-trascurati)
- 🚀 [Checklist di produzione](#-checklist-di-produzione)
- 📚 [Ulteriori letture](#-ulteriori-letture)

## 🧗‍♀️ Per i coraggiosi

Se ti auto-ospiti servizi Docker, la sicurezza è interamente una tua responsabilità — nessun provider cloud ti protegge da scansioni di porte o configurazioni approssimative. Che tu stia lanciando app sulla tua rete domestica o noleggiando VPS da provider come Vultr, DigitalOcean, Linode, AWS, Azure o Google Cloud, dovrai blindare tutto — e verificare di averlo fatto correttamente.

In questa guida esploreremo la sicurezza di Docker — da alcune tecniche `meno note` ad altre `difficili da applicare correttamente`; vedremo token canarino, volumi in sola lettura, regole firewall, segmentazione e hardening di rete, aggiunta di proxy autenticati e molto altro.

Confronteremo anche le reti domestiche con le configurazioni su cloud pubblico e ti mostreremo come impostare un proxy di autenticazione base con Nginx. Alla fine, avrai diverse opzioni per tenere fuori la marmaglia (amici, famiglia, e a volte anche te stesso...).

È un bel po' di roba! Ma gran parte è correlata, e puoi scegliere ciò che è più rilevante per la tua configurazione. 🍀

## 🔄 La danza del `:latest`

Mantenere aggiornate le immagini è fondamentale per la sicurezza. Tuttavia, affidarsi a `:latest` può introdurre modifiche che rompono tutto o build vulnerabili senza un passaggio di revisione.

### Il modo sicuro per aggiornare

Combina i comandi di aggiornamento con `pull` o `build` in modo da aggiornare deliberatamente le immagini, poi riavvia durante una finestra in cui puoi notare eventuali rotture.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Pinning della versione vs Latest

Scegliere la versione giusta a cui fare il pin è un equilibrio tra stabilità e sicurezza. Ecco alcune strategie comuni:

```yaml
# docker-compose.yml
# ...
  # Pinning esatto della versione, ottimo per servizi critici
  image: postgres:17.2

  # Pinning della patch, buono per servizi non critici
  image: postgres:17.2

  # Pinning della major, perfetto per progetti hobbistici
  image: postgres:17

  # Yolo, da evitare se possibile
  image: postgres:latest
```

Usa [Dependabot](https://github.com/features/security) o [Renovate](https://github.com/renovatebot/renovate) per aprire PR di aggiornamento revisionabili. Per qualsiasi cosa che ti dispiacerebbe ricostruire alle 2 di notte, fai il pin a una versione o digest specifici e lascia che l'automazione ti dica quando muoverti.

_Fammi sapere quali sono i tuoi strumenti preferiti per mantenere aggiornate le immagini Docker!_

## 🔐 Gestione dei segreti

- [Generare segreti forti](#generate-strong-secrets)
- [Canary Tokens](#canary-tokens)
- [Passare da `.env` a MacOS Keychain](#upgrade-from-env-to-macos-keychain)
{/* - [Placeholder Validation](#placeholder-validation) */}

Ci sono molti modi per gestire i segreti, ma una delle regole più importanti da seguire è: **non hard-codare mai i segreti nelle tue immagini Docker o committarli in git.** È uno degli errori di sicurezza più comuni, presenta un rischio a lungo termine ed è un fastidio da correggere.

Archiviare in modo sicuro i segreti è un argomento sostanziale con molte opzioni, dai file `.env`, [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), o un gestore di segreti come [HashiCorp Vault](https://www.vaultproject.io/) o AWS Secrets Manager.

Dovrai scegliere il livello "giusto" di sforzo e sicurezza per il tuo caso d'uso.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Validazione dei placeholder

<blockquote>Non crederesti quanto sia facile hackerare un token JWT quando il segreto non è segreto!</blockquote>

<p className='inset'>💡 Assicurati che i segreti siano sempre unici. Cerca di rendere impossibile l'esecuzione con impostazioni predefinite non sicure/codificate.</p>

Se usi segnaposto come `__WARNING_REPLACE_ME__` nei tuoi segreti, bene, forse qualcuno se ne accorgerà!

Per ogni evenienza, puoi anche aggiungere un po' di sicurezza a runtime con poco sforzo. Ecco come potresti farlo in JavaScript, Rust e Go:

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

### Genera Segreti Forti

Ecco un piccolo script per generare nuovi segreti per un file `.env`:

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

### Canary Token

I [**Canary Token**](https://canarytokens.org/) sono un ottimo modo per rilevare se i tuoi segreti sono stati compromessi (e usati). Sono come un filo di inciampo che puoi aggiungere a qualsiasi file, URL o token sensibile.

Considera di metterli accanto ai segreti che ti preoccupano davvero: file `.env`, variabili CI, gestori di password, cartelle di backup e credenziali cloud. Non trasformarlo in una messinscena; posiziona i fili di inciampo dove un vero attaccante o un tuo errore futuro li toccherebbero.

Esistono molti tipi di "token" canary tra cui scegliere: token AWS, [numeri di carta di credito falsi](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), file Excel e Word, file Kubeconfig, credenziali VPN, persino file di dump SQL possono avere un filo di inciampo!

#### Best Practice per i Canary Token

- **Posiziona Ovunque**: In ogni file `.env`, pipeline CI/CD e "gestore di segreti" a cui puoi pensare.
  - Posiziona un file `passwords.xlsx` o `passwords.docx` nella tua home directory.
  - Aggiungi un profilo AWS `billing_prod` con un canary token come segreto.
  - Genera un file `private.key` per la tua directory `~/.ssh`.
  - Crea un dump SQL Canary `all_credit_cards.sql` per la tua directory `~/backups`.
- **Monitora**: Imposta regole/avvisi email per rilevare quando un canary token viene attivato.

### Aggiornamento da `.env` a MacOS Keychain

Per gli utenti Mac, una delle opzioni più semplici è usare Keychain.

Ecco un modo semplice per automatizzare il caricamento dei segreti dal keychain OSX, supporta `TouchID` ed è un po' più sicuro dei file `.env`.

Il merito originale <cite>va a [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) e [Jan Schaumann](https://www.netmeister.org/)</cite>

<CodeTabs client:load tabs={[
  "Comandi di supporto",
  "Persistere segreti nell'ambiente",
  "Usare segreti per comando"]
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

## 🌐 Pericoli di Rete

### Reti Personalizzate e Porte Interne

Isolare correttamente i servizi con le reti Docker è un modo importante per ridurre la superficie d'attacco.

Fai attenzione a bucare la tua rete! Un singolo port forwarding mal configurato può finire molto male.

Per impostazione predefinita, i servizi su una LAN privata non sono esposti a internet: devi esplicitamente inoltrare le porte dal tuo router.

### Docker su LAN

Che tu sia uno sviluppatore che esegue server di sviluppo in locale, o che stia auto-ospitando servizi dalla tua rete locale, **le supposizioni sul modello di rete di Docker possono portare a guai.**

Spesso gli sviluppatori scoprono con sorpresa che i metodi "tradizionali" per mettere in sicurezza i server Linux (`iptables`, limitare le opzioni sysctl di tcp/ip) possono **fallire silenziosamente** sugli host Docker! Questo è particolarmente vero quando **si auto-ospita o si opera su una tipica rete domestica.** (Per chi è in fondo: questo può permettere l'accesso ai container di sviluppo sul tuo MacBook!!!)

> ⚠️ **Avviso #1:** Le porte pubblicate da Docker possono bypassare le regole del firewall che pensavi proteggessero l'host, specialmente con UFW su Ubuntu/Debian. Questo non rende ogni regola del firewall inutile, ma significa che "UFW dice nega" non è una prova. [Vedi issue #690: Docker bypassa le regole del firewall ufw](https://github.com/moby/moby/issues/690).

> ⚠️ **Avviso #2:** Associare le porte a indirizzi IP locali (es. `-p 127.0.0.1:8080:80`) è il default corretto, ma le versioni di Docker Engine precedenti alla 28.0.0 presentavano casi in cui host sulla stessa rete L2 potevano comunque raggiungere le porte pubblicate su localhost. [Docker documenta l'avvertenza nella sua guida alla pubblicazione delle porte](https://docs.docker.com/engine/network/port-publishing/), e l'abitudine di verificare con nmap descritta sotto conta ancora.

<p class="inset">Se sei sorpreso di scoprirlo, idem!</p>

**Associare a IP locali rimane una buona pratica** e ha un impatto significativo in **ambienti cloud gestiti e reti configurate appositamente.**
{/* Non pensare al tuo firewall o alla tua rete privata come difesa principale o unica, aggiungi le reti Docker al mix per un migliore **isolamento**, e considera sempre se hai bisogno di esporre porte. */}

### Esempio di Docker Compose

Ecco un esempio di file `docker-compose.yml` che associa il servizio `app` a `127.0.0.1:8080` e connette entrambi i container alla rete personalizzata `backend`.

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

{/* #### Test e Verifica

Come per ogni misura di sicurezza, è fondamentale **testare e verificare** la configurazione di rete. */}

{/* Mentre la sicurezza e il monitoraggio della rete sono una responsabilità a tempo pieno nella maggior parte delle aziende, la maggior parte degli auto-ospitanti non ci dedica NESSUN tempo! */}

{/* Ok, lo capisco, può essere intimidatorio. _(Sottoreti, maschere di rete, CIDR, VLAN e tabelle di routing, oh mamma! Se non ha senso, va bene, sei nel posto giusto. Inoltre, non dobbiamo preoccuparci di tutto questo per ora.)_ */}

### Best Practice di Rete

- 🏆 **Non Pubblicare NESSUNA Porta** Di recente ho scoperto che è più utile di quanto ci si aspetti! Quando si utilizza una rete (bridge) con nome, i container hanno accesso senza filtri l'uno all'altro. Si comportano come se fossero dietro una rete locale (gateway NAT).
  - Sebbene non sia possibile in tutti i casi d'uso, può essere utile per container che eseguono job batch o accessibili principalmente tramite `attach` o `exec`.
- 🥇 **Usa le Reti Docker** per isolare e controllare quali container possono comunicare tra loro.
- 🥉 **Usa il Binding su Localhost**: Sebbene [imperfetto](https://github.com/moby/moby/issues/45610), in generale è meglio associare le porte a un indirizzo di loopback (es. `127.0.0.1:8080:80`). Assicurati solo di [verificare la configurazione.](#-monitoring--verification)

## 🛡️ Controlli di Accesso

I controlli di accesso sono una parte fondamentale della sicurezza dei tuoi servizi Docker. Questo include la limitazione delle capacità e dei permessi dei container, la restrizione dell'accesso al socket Docker e altro ancora.

- [Limitazione delle Capacità dei Container](#limiting-container-capabilities)
- [Accesso al Socket Docker](#docker-socket-access)
- [Blocco per Paese!](#blocking-country)
- [Indurimento del Proxy CloudFlare](#hardening-cloudflare-proxy-host)

### Limitazione delle Capacità dei Container

Un'altra solida pratica di controllo degli accessi è limitare le capacità dei container. Questo riduce il raggio d'esplosione di diverse minacce, dall'escalation dei privilegi al dirottamento del traffico. Non è un campo di forza, ma rimuove permessi che la maggior parte dei container non ha mai bisogno.

**Cosa sono le capacità?** Permessi o abilità nominati definiti dal kernel Linux. (La pagina man delle [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) ha un elenco completo.) Includono cose come `CAP_CHOWN` (cambiare proprietà dei file), `CAP_NET_ADMIN` (configurare interfacce di rete), `CAP_KILL` (uccidere qualsiasi processo) e molte altre.

I due modi per determinare le capacità necessarie sono:

1. **Prova ed Errore**: Questo metodo più lento ma efficace prevede di iniziare senza capacità, poi aggiungerle una per una finché l'app non funziona.
2. **Trova lavoro pregresso**: Cerca "`project-name` `cap_drop` Dockerfile" o "`project-name` `cap_drop` docker-compose.yml" per vedere se altri hanno già fatto il lavoro per te. Un LLM può suggerire un punto di partenza, ma trattalo come un'ipotesi finché non testi il container e leggi la documentazione dell'immagine.

#### Best Practice per le Capacità

- **Rimuovi Tutte le Capacità**: Usa `cap_drop: [ ALL ]` per rimuovere tutte le capacità Linux dal container.
- **Nessun Nuovo Privilegio**: Usa `security_opt: [ no-new-privileges=true ]` per impedire al container di ottenere nuovi privilegi.

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

Ora i tuoi servizi possono comunicare tra loro tramite la rete `db-network`. Docker Compose creerà automaticamente quella rete.

Usa l'opzione `--external`/`external:` per unirti a una **rete preesistente.** Omettila per creare una nuova rete.

### Accesso al Socket Docker

#### ⚠️ Attenzione: `docker.sock` è di fatto un accesso da amministratore all'host

<blockquote class="inset">⚠️ L'opzione \`:ro\` non influisce sull'I/O inviato attraverso il socket!</blockquote>

Si limita a montare il percorso del socket stesso in sola lettura. Le chiamate API inviate attraverso quel socket possono comunque creare container, montare percorsi dell'host e fare altre cose molto interessanti che probabilmente non intendevi delegare.

{/* Qualsiasi processo che possa "aprire" il socket può (probabilmente) ottenere accesso root sull'host. */}

#### Buona Pratica per il Socket

- 🥇 **Evita di montare il socket Docker,** probabilmente esiste un'alternativa migliore.
- 🫣 Se devi farlo, **metti un proxy stretto davanti** e permetti solo gli endpoint API di cui l'app ha realmente bisogno. Dai un'occhiata al progetto `docker-socket-proxy` originariamente di Tecnativa, [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Poi verifica che le chiamate negate siano effettivamente negate.
- 🤢 Ok, _forse_ condividerlo va bene in un ambiente di test a **fiducia molto alta** e **basso rischio**.

#### Bloccare un Paese!

A volte utile, ma non un vero confine di sicurezza.

_Parlo dell'entità geopolitica, non della musica..._

Se ospiti app principalmente per la tua famiglia e amici locali, puoi bloccare il traffico da paesi da cui non ti aspetti di ricevere traffico. Oppure permettere solo il traffico da paesi che ti aspetti. Riduce il rumore; non ferma VPN, proxy, botnet o chiunque abbia pazienza.

Dai un'occhiata a questo script per bloccare tutto il traffico dalla Cina:

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

Allo stesso modo, puoi permettere solo il traffico dagli Stati Uniti:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Hardening del proxy CloudFlare

Se il tuo server domestico è protetto dietro un IP CloudFlare (proxy), puoi limitare l'accesso ai soli IP CloudFlare e alla tua rete locale.

È un po' simile al [blocco per paese](#blocking-country) qui sopra, ma con un controllo molto più stretto.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Blocca tutto in ingresso!!!
ufw default allow outgoing # Permetti tutto in uscita
ufw allow ssh # Permetti SSH

# Permetti accesso per la subnet locale (preferibilmente DMZ/VLAN dedicata per i servizi ospitati)
ufw allow from 10.0.0.0/8 to any port 443
```

# Allow CloudFlare IPs
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# Add IPv6 support
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Per testare le modifiche basate sulla geolocalizzazione, una VPN con posizioni nel paese desiderato può essere utile. Vedi maggiori dettagli nella sezione [Monitoraggio e Verifica](#-monitoring--verification).

### Sicurezza a livello Applicativo

Una volta che la [rete e l'host sono stati induriti,](#-network-hazard) potresti scoprire che c'è ancora da fare.

Ora dobbiamo pensare al livello "applicativo" dei nostri servizi stessi.

<p class="inset">Quel database ha una password valida? Questo container automatizza HTTPS/certificati? L'app include autenticazione integrata? Ci sono limiti su quali email possono registrarsi? Ci sono credenziali predefinite o variabili d'ambiente da modificare?</p>

L'unico modo per _saperlo_ è controllare. In questo caso, inizia con il `README` e altri file chiave come `docker-compose.yml`, `Dockerfile` e `.env.*`. Sia nel progetto, sia idealmente nei suoi servizi di supporto (es. Postgres, Redis, ecc.).

#### Proxy Inverso

Un altro livello di difesa è l'autenticazione di base. Non usarla senza HTTPS. Per i servizi legacy, mettere l'autenticazione di base davanti a una route di admin è spesso sufficiente per fermare richieste casuali e crawler non autenticati che tentano di colpire direttamente il servizio.

```nginx

# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}

```

Genera le credenziali:

```bash

htpasswd -c /etc/nginx/.htpasswd admin

```

Con un proxy con autenticazione di base, gli attaccanti hanno un ostacolo in più — nome utente e password — prima di raggiungere il tuo servizio interno.

Un'altra opzione è usare un servizio come [Traefik](https://traefik.io/) o [Caddy](https://caddyserver.com/) che può automatizzare HTTPS e l'autenticazione di base per te.

Se vuoi gestire molti domini e servizi con un'interfaccia grafica, ti consiglio [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 Monitoraggio e Verifica

- [Controlla le tue porte](#check-your-ports)
- [Visualizza le porte aperte](#view-open-ports)
- [Monitoraggio dei file](#file-monitoring)

Questo è **il passo più importante e più trascurato.** Puoi avere il miglior firewall, la miglior rete e le migliori pratiche, ma se non verifichi, non hai idea se stanno funzionando.

In più, conoscere anche solo una manciata di comandi — o sapere dove cercarli — può fare la differenza tra prevenire una violazione o no. La sensazione di essere un hacker è solo un bonus. (Per dettagli ed esempi, vai direttamente alla sezione [Monitoraggio e Verifica](#-monitoring--verification).)

<p class="inset">Non fidarti, verifica due volte</p>

### Controlla le tue Porte

<p class="inset">⚠️ IMPORTANTE: Non scansionare host che non possiedi.</p>

Sia che tu sia su una rete domestica o su un VPS, vorrai sapere quali porte sono aperte al mondo.

Ci sono 2 modi per farlo:

- Controllare la Rete (`nmap`, `masscan`)
- Chiedere al Sistema Operativo (`lsof`, `netstat`, `ss`)

#### Testare Fuori dalla Tua Rete

Avrai bisogno del tuo IP (pubblico) attuale, facilmente ottenibile con servizi come `ifconfig.me`: `curl https://ifconfig.me`. Oppure consultalo nel pannello di controllo del tuo provider di hosting.

```bash title="Ottieni IP Pubblico"
curl -fsSL https://ifconfig.me
# --> IP PUBBLICO ATTUALE
```

Una volta ottenuto il tuo IP pubblico, ora devi **connetterti a una rete esterna.** Puoi usare il computer di un amico, un hotspot telefonico/5G, o un server host dedicato.

```bash title="Scansione Esterna con nmap"
target_host="$(curl -fsSL https://ifconfig.me)"

# Nota: Assicurati che `target_host` sia l'IP desiderato

# Scansiona porte specifiche:
nmap -A -p 80,443,8080 --open --reason $target_host
# Top 100 porte:
nmap -A --top-ports 100 --open --reason $target_host
# Tutte le porte
nmap -A -p1-65535 --open --reason $target_host
```

```

#### Testa all'interno della tua rete

Esercitati con `nmap`: scansiona la tua rete locale o uno dei tuoi server, controlla il router, la stampante, il frigorifero intelligente.

{/* Anche se le scansioni delle porte sono una realtà costante, potrebbero violare il CFAA (Computer Fraud and Abuse Act) negli Stati Uniti. Quindi, scansiona solo cose di tua proprietà. */}

#### Comandi di scansione di esempio

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

### Visualizza le porte aperte

Prendi familiarità con `lsof`: è disponibile su MacOS e Linux. Mostra lo stato granulare della rete e l'attività del disco.

```bash title="lsof Commands"
# Monitor specific port
sudo lsof -i:80 -Pn
```

# Monitora le connessioni ESTABLISHED
sudo lsof -i -Pn | grep ESTABLISHED
# Visualizza LISTEN
sudo lsof -i -Pn | grep LISTEN

# per vedere i nomi di rete invece degli indirizzi IP (può essere molto lento per le ricerche DNS inverse)
sudo lsof -i -P | grep LISTEN

# Monitora tutte le connessioni di rete
sudo watch -n1 "lsof -i -Pn"

```

#### Esempio di output

![scansione nmap per i listener](../lsof-scan-listen.webp)

### Monitoraggio dei file

Per identificare quali **processi** stanno usando più **larghezza di banda del disco**, puoi usare `iotop`:

```bash

sudo iotop

```

Per vedere le modifiche ai singoli file, puoi usare `inotifywait` su Linux o `fswatch` su MacOS:

Questo può essere utile per rilevare comportamenti non autorizzati o strani per cartella o a livello di sistema.

```bash

# Monitora tutte le modifiche ai file in una directory
sudo inotifywait -m /path/to/directory

```

Su MacOS puoi usare `fswatch`:

Installa con `brew install fswatch`

```bash

fswatch -r /path/to/directory
```

```

## ⏰ Consigli Spesso Trascurati

1. **Limitazione della Frequenza** per i tentativi di autenticazione e qualsiasi altro endpoint critico. Che sia tramite il modulo `limit_req` di Nginx o `fail2ban` per l'accesso SSH, limitare la forza bruta è _probabilmente_ una buona idea. Dico _probabilmente_ perché nell'era di IPv6 e botnet a buon mercato, beh, non è più come una volta.

2. **Usa Volumi in Sola Lettura** dove possibile:
   ```yaml

services:
     webapp:
       volumes:
         - ./config:/config:ro

```
   In combinazione con altre buone pratiche (utenti non root, permessi minimi delle cartelle), l'opzione di montaggio `:ro` fornisce ulteriori garanzie contro modifiche accidentali e alcuni tentativi di scrittura dall'interno del contenitore. Non protegge l'host da un processo che ha già privilegi più ampi.

3. **Controlla Regolarmente l'Accesso ai Contenitori**.
   Se un contenitore non ha bisogno di un segreto, di una porta o di un mount, rimuovilo!

4. **Attenzione ai Malintenzionati del WiFi**
   Sono sicuro che non daresti mai la password del tuo WiFi, specialmente a strani tipi, vero? Beh, tranne qualche amico... Ok, forse anche la famiglia. Non sai mai quali app hanno e quali potrebbero condividere il tuo SSID e password con il mondo.

### Rete Domestica vs. Provider Pubblico vs. Tunneling

1. **Isolamento Virtuale/DMZ**: Per i server domestici, mettili su una VLAN o DMZ separata se possibile. Questo mantiene i tuoi dispositivi interni al riparo da potenziali compromissioni provenienti dal lato server.
   - Usa un router o una VLAN separata per il tuo server domestico.
   - Usa una rete WiFi separata per il tuo server domestico.
   - Usa una sottorete separata per il tuo server domestico.
```

2. **Provider Cloud**: Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure e Google Cloud offrono tutti diverse funzionalità firewall.
   - Alcuni provider e servizi bloccano le porte per impostazione predefinita. Alcuni offrono opzioni di adesione volontaria o componenti aggiuntivi. Controlla la documentazione del tuo fornitore di servizi.
   - Molti provider offrono servizi avanzati di monitoraggio e rilevamento delle minacce.

3. **VPN e Tunneling**: Considera l'uso di un'opzione simile a una VPN o di un servizio di tunneling per connettere in modo sicuro i servizi attraverso Internet senza esporli alla rete pubblica.
   - TailScale, ngrok, ZeroTier.
   - WireGuard, OpenVPN.

{/* 3. **Hardening contro attacchi interni/laterali**: Un singolo dispositivo infetto può compromettere un'intera rete. Segmentare i servizi Docker su reti personalizzate, utilizzare hardware, regole UFW e bloccare le porte non necessarie può aiutare a ridurre il rischio (se configurato correttamente). */}

## 🚀 Checklist per la Produzione

- [ ] **Segreti**: Tutti i segreti generati casualmente e archiviati in modo sicuro
- [ ] **Aggiornamenti**: Strategia di aggiornamento dei container documentata e automatizzata. (Va bene se sono solo pochi comandi in un file di testo.)
- [ ] **Rete**: Solo le porte necessarie esposte, reti interne configurate.
- [ ] **Regole Firewall**: Negazione predefinita, autorizzazioni esplicite, blocchi per paese se necessario.
- [ ] **Proxy Inverso**: Nginx, Caddy o Traefik possono aggiungere un livello di autenticazione di base
- [ ] **Token Canarino**: Posizionali vicino ai file sensibili e alle credenziali che effettivamente indagheresti se toccati.
- [ ] **Monitoraggio**: Conosci i tuoi sistemi con `nmap`, `lsof`, `inotifywait`, `glances`, ecc.
- [ ] **Strategia di Backup**: Testata, preferibilmente automatizzata e fuori sede.
- [ ] **Minimo Privilegio**: Utenti container non root, volumi in sola lettura.

## 📚 Ulteriori Letture

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org per Canary Tokens](https://canarytokens.org/)

## Ringraziamenti

Un ringraziamento ad alcuni Redditor attenti:

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [thread](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

Grazie per aver letto! Spero che questa guida ti sia stata utile. Se hai domande o suggerimenti, sentiti libero di contattarmi sui miei social qui sotto, oppure clicca sul link `Modifica su GitHub` per creare una PR! ❤️
````
