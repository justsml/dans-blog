# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.03
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed: bun run i18n:translate:chunked -- --slug docker-security-tips-for-self-hosting --locale it --model openrouter/qwen/qwen3-32b:nitro --chunk 6p --quiz-concurrency 20
## Raw Output

````mdx
---
title: Consigliessenziali per la sicurezza di Docker in auto‑hosting
subTitle: 'Proteggi i tuoi servizi auto‑ospitati, dalla difesa al monitoraggio!'
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

- 🧗‍♀️ [Per i coraggiosi](#️-for-the-brave)
- 🔄 [Il ballo del `:latest`](#-the-latest-dance)
- 🔐 [Gestione dei segreti: la via giusta](#-secrets-management)
- 🌐 [Pericolo di rete](#-network-hazard)
- 🛡️ [Controlli di accesso](#️-access-controls)
- 🔍 [Monitoraggio e verifica](#-monitoring--verification)
- ⏰ [Suggerimenti spesso trascurati](#-often-overlooked-tips)
- 🚀 [Checklist di produzione](#-production-checklist)
- 📚 [Approfondimenti](#-further-reading)

## 🧗‍♀️ Per i coraggiosi

Se stai auto‑ospitando servizi Docker, la sicurezza è una tua responsabilità dall’alto verso il basso—nessun provider cloud a proteggerti da scansioni di porte o configurazioni approssimative. Che tu stia lanciando applicazioni nella tua rete domestica o noleggiando VPS da provider come Vultr, DigitalOcean, Linode, AWS, Azure o Google Cloud, dovrai chiudere le porte—e verificare di averlo fatto correttamente.

In questa guida, percorreremo la sicurezza di Docker—da alcune tecniche `meno conosciute` a quelle `difficili da fare bene`; esploreremo token canary, volumi in sola lettura, regole firewall, segmentazione e rinforzo della rete, aggiunta di proxy autenticati e molto altro.

Lo confronteremo anche lereti domestiche con le configurazioni di cloud pubblico e ti mostreremo come impostare un proxy con autenticazione di base usando Nginx. Alla fine avrai diverse opzioni per tenere fuori la gente indesiderata (amici, familiari e, a volte, anche te stesso…).

È un sacco di roba! Ma gran parte è correlata, e puoi scegliere ciò che è più pertinente al tuo ambiente. 🍀

## 🔄 Il ballo del `:latest`

Mantenere le immagini aggiornate è fondamentale per la sicurezza. Tuttavia, fare affidamento su `:latest` può introdurre cambiamenti incompatibili o build vulnerabili senza una fase di revisione.

### Il modo sicuro per aggiornare

Combina i comandi di aggiornamento con `pull` o `build` in modo da rinfrescare deliberatamente le immagini, quindi riavvia durante una finestra in cui puoi rilevare eventuali rotture.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Pinning della Versione vs Latest

Scegliere la versione giusta da fissare è un compromesso tra stabilità e sicurezza. Ecco alcune strategie comuni:

```yaml
# docker-compose.yml
# ...
  # Pinning di versione esatta, ideale per servizi critici
  image: postgres:17.2

  # Pinning di versione patch, adatto per servizi non critici
  image: postgres:17.2

  # Pinning di versione major, perfetto per progetti hobby
  image: postgres:17

  # Yolo, da evitare se possibile
  image: postgres:latest
```

Usa [Dependabot](https://github.com/features/security) o [Renovate](https://github.com/renovatebot/renovate) per aprire PR di aggiornamento revisionabili. Per tutto ciò che non vuoi ricostruire alle 2 del mattino, fissa una versione specifica o un digest e lascia che l’automazione ti avvisi quando è il momento di passare alla successiva.

_Fammi sapere quali sono i tuoi strumenti preferiti per mantenere le immagini Docker aggiornate!_

## 🔐 Gestione dei Segreti

- [Genera Segreti Forti](#generate-strong-secrets)
- [Token Canary](#canary-tokens)
- [Aggiorna da `.env` a Keychain macOS](#upgrade-from-env-to-macos-keychain)
{/* - [Validazione Placeholder](#placeholder-validation) */}

Ci sono molti modi per gestire i segreti, ma una delle regole più importanti da rispettare è: **non inserire mai segreti direttamente nelle immagini Docker né commetterli su git**. È uno degli errori di sicurezza più comuni, comporta un rischio a lungo termine e richiede molto tempo per essere corretto.

La conservazione sicura dei segreti è un argomento vasto con numerose opzioni, dai file `.env`, [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), o un gestore di segreti come [HashiCorp Vault](https://www.vaultproject.io/) o AWS Secrets Manager.

Dovrai scegliere il livello “giusto” di sforzo e sicurezza per il tuo caso d'uso.

{/*
TODO: Move to Maintainer's Guide
// TODO: Move to Maintainer's Guide

### Validazione dei Placeholder

<blockquote>Non crederesti a quanto sia facile compromettere un token JWT quando il segreto non è segreto!</blockquote>
}

<p className='inset'>💡 Assicurati che i segreti siano sempre unici. Cerca di rendere impossibile l'esecuzione con valori predefiniti non sicuri o hard‑coded.</p>

Se usi segnaposto come `__WARNING_REPLACE_ME__` nei tuoi segreti, ottimo, magari qualcuno se ne accorgerà!

Nel caso, puoi aggiungere una piccola protezione a runtime con poco sforzo. Ecco come potresti farlo in JavaScript, Rust e Go:

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

### Token Canary

[**Canary Tokens**](https://canarytokens.org/) sono un ottimo modo per rilevare se i tuoi segreti sono stati compromessi (e usati). Funzionano come una trappola che puoi inserire in qualsiasi file sensibile, URL o token.

Considera di posizionarli accanto ai segreti di cui ti preoccupi davvero: file `.env`, variabili CI, gestori di password, cartelle di backup e credenziali cloud. Non trasformare tutto in uno spettacolo; metti le trappole dove un vero aggressore o un futuro te stesso potrebbero toccarle.

Esistono molti tipi di “token” canary tra cui scegliere, dai token AWS, numeri di [carta di credito falsi](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), file Excel e Word, file Kubeconfig, credenziali VPN, fino a dump SQL che possono contenere una trappola!

#### Best practice per i Token Canary

- **Posiziona Ovunque**: In ogni file `.env`, pipeline CI/CD e “secrets manager” che ti viene in mente.  
  - Metti un file `passwords.xlsx` o `passwords.docx` nella tua home directory.  
  - Aggiungi un profilo AWS `billing_prod` con un token canary come segreto.  
  - Genera un file `private.key` per la tua directory `~/.ssh`.  
  - Crea un dump SQL Canary `all_credit_cards.sql` per la tua directory `~/backups`.  
- **Monitora**: Configura regole/avvisi email per intercettare quando un token canary viene attivato.  

### Aggiornamento da `.env` a Keychain di macOS  

Per gli utenti Mac, una delle opzioni più semplici è usare Keychain.  

Ecco un modo rapido per automatizzare il caricamento dei segreti dal keychain di macOS, con supporto a `TouchID` e leggermente più sicuro rispetto ai file `.env`.  

Il credito originale va a <cite> [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) e [Jan Schaumann](https://www.netmeister.org/)</cite>  

<CodeTabs client:load tabs={[
  "Helper commands",
  "Persist secrets in environment",
  "Use secrets per command"]
}>
```bash title="keychain-secrets.sh"
### Funzioni per impostare e recuperare variabili d'ambiente dal keychain di macOS ###
### Adattato da: https://www.netmeister.org/blog/keychain-passwords.html e 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# Uso: get-keychain-secret VAR_ENV_SEGRETO
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Uso: set-keychain-secret VAR_ENV_SEGRETO
# Ti verrà chiesto di inserire il valore del segreto!
function set-keychain-secret () {
    [ -n "$1" ] || print "Manca il nome della variabile d'ambiente"
    
    # chiedi all'utente il segreto
    echo -n "Inserisci il segreto per ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Carica le variabili d'ambiente nella shell corrente
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Nota: Se un attaccante può eseguire `env` nella tua shell, questi segreti potrebbero essere esposti!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Specifica tutti i segreti per questo progetto
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Nota: Usare un wrapper di shell aiuta a prevenire che i segreti rimangano
# nell'ambiente. Ed è sicuro da committare.

# Uso:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY ...
```
</CodeTabs>

## 🌐 Pericolo di rete

### Reti personalizzate e porte interne

Isolare correttamente i servizi con le reti Docker è un modo importante per ridurre la superficie di attacco.

Fai attenzione a non aprire buchi nella tua rete! Un singolo port forwarding configurato male può avere conseguenze gravissime.

Per impostazione predefinita, i servizi su una LAN privata non sono esposti a Internet – devi esplicitamente inoltrare le porte dal tuo router.

### Docker su LAN

Che tu sia uno sviluppatore che esegue server di sviluppo in locale, o che auto‑hosti servizi dalla tua rete domestica, **le supposizioni sul modello di rete di Docker possono causare problemi.**

Gli sviluppatori rimangono spesso sorpresi nel constatare che i metodi “tradizionali” per mettere in sicurezza i server Linux (`iptables`, restrizioni alle opzioni sysctl tcp/ip) possono **fallire silenziosamente** sugli host Docker! Questo è particolarmente vero quando **si auto‑hosta o si opera su una tipica rete domestica.** (Per chi è dietro le quinte: questo può consentire l’accesso ai container di sviluppo sul tuo MacBook!!!)

> ⚠️ **Avviso #1:** Le porte pubblicate da Docker possono aggirare le regole firewall che pensavi stessero proteggendo l’host, specialmente con UFW su Ubuntu/Debian. Ciò non rende ogni regola firewall inutile, ma significa che “UFW dice deny” non è una prova. [Vedi issue #690: Docker bypasses ufw firewall rules](https://github.com/moby/moby/issues/690).

> ⚠️ **Avviso #2:** Il binding delle porte a indirizzi IP locali (es., `-p 127.0.0.1:8080:80`) è il valore predefinito corretto, ma le versioni di Docker Engine precedenti alla 28.0.0 presentavano casi in cui host sulla stessa rete L2 potevano comunque raggiungere le porte pubblicate su localhost. [Docker documenta la limitazione nella sua guida alla pubblicazione delle porte](https://docs.docker.com/engine/network/port-publishing/), e l’abitudine di verificare con nmap mostrata di seguito resta importante.

<p class="inset">Se sei sorpreso di apprendere questo, sei in buona compagnia!</p>

**Il binding a IP locali è ancora una buona pratica** e ha un impatto significativo in **ambienti cloud gestiti e reti appositamente configurate.** 
{/* Non considerare il tuo firewall o la rete privata come la tua difesa principale o unica, aggiungi le Docker Networks al mix per una migliore **isolazione**, e valuta sempre se sia davvero necessario esporre le porte. */}


### Esempio Docker Compose

Ecco un file `docker-compose.yml` di esempio che associa il servizio `app` a `127.0.0.1:8080` e collega entrambi i container alla rete personalizzata `backend`.

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

Come per tutte le misure di sicurezza, è fondamentale **testare e verificare** la configurazione di rete. */}

{/* Sebbene la sicurezza di rete e l’audit siano una responsabilità a tempo pieno nella maggior parte delle aziende, la maggior parte degli auto‑host non vi dedica ALCUN tempo! */}

{/* Lo so, può sembrare intimidatorio. _(Subnet, netmask, CIDR, VLAN e tabelle di routing, oh cielo! Se non ti è chiaro, va bene, sei nel posto giusto. Inoltre, per ora non dobbiamo preoccuparcene.)_ */}

### Best Practice di Rete

- 🏆 **Non pubblicare ALCUNE porte** Recentemente ho scoperto che è più utile di quanto si pensi! Quando si usa una rete nominata (bridge), i container hanno accesso reciproco non filtrato. Si comportano come se fossero dietro una rete locale (gateway NAT).
  - Anche se non è possibile in tutti gli scenari, può tornare utile per container che eseguono job batch o che vengono principalmente raggiunti tramite `attach` o `exec`.
- 🥇 **Usa le Docker Networks** per isolare e controllare quali container possono comunicare tra loro.
- 🥉 **Usa il binding su localhost**: Sebbene [imperfetto](https://github.com/moby/moby/issues/45610), è generalmente più sicuro associare le porte a un indirizzo di loopback (es. `127.0.0.1:8080:80`). Basta assicurarsi di [verificare la configurazione.](#-monitoring--verification)

## 🛡️ Controlli di Accesso

I controlli di accesso sono una parte cruciale per mettere in sicurezza i servizi Docker. Questo include limitare le capacità e i permessi dei container, restringere l’accesso al socket Docker e altro ancora.

- [Limitare le capacità dei container](#limiting-container-capabilities)
- [Accesso al socket Docker](#docker-socket-access)
- [Bloccare per Paese!](#blocking-country)
- [Rinforzare l’host proxy CloudFlare](#hardening-cloudflare-proxy-host)

### Limitare le capacità dei container

Un’altra pratica solida di controllo degli accessi è limitare le capacità dei container. Questo riduce il raggio d’azione di diverse minacce, dall’escalation di privilegi al dirottamento del traffico. Non è uno scudo, ma elimina permessi che la maggior parte dei container non ha mai necessitato.

**Cosa sono le capacità?** Permessi o abilità nominati definiti dal kernel Linux. (La pagina man [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) contiene l’elenco completo.) Includono cose come `CAP_CHOWN` (cambia il proprietario di un file), `CAP_NET_ADMIN` (configura interfacce di rete), `CAP_KILL` (termina qualsiasi processo) e molte altre.

I due modi per determinare le capacità necessarie sono:

1. **Prova ed errore**: Questo metodo più lento ma efficace parte da zero capacità, aggiungendole una alla volta finché l’app non funziona.
2. **Cerca lavori precedenti**: Cerca "`project-name` `cap_drop` Dockerfile" o "`project-name` `cap_drop` docker-compose.yml" per vedere se altri hanno già fatto il lavoro. Un LLM può suggerire un punto di partenza, ma trattalo come un’ipotesi finché non testi il container e leggi la documentazione dell’immagine.

#### Best Practice sulle capacità

- **Rimuovi tutte le capacità**: Usa `cap_drop: [ ALL ]` per eliminare tutte le capacità Linux dal container.
- **Nessun nuovo privilegio**: Usa `security_opt: [ no-new-privileges=true ]` per impedire al container di acquisire nuovi privilegi.

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

Usa l’opzione `--external`/`external:` per unirti a una **rete pre‑esistente**. Omettila per creare una nuova rete.

### Accesso al Docker Socket

#### ⚠️ Attenzione: `docker.sock` è praticamente accesso amministrativo all'host

<blockquote class="inset">⚠️ L'opzione `:ro` non influisce sull'I/O inviato tramite il socket!</blockquote>

Assicura solo che il percorso del socket sia montato in sola lettura. Le chiamate API inviate attraverso quel socket possono comunque creare container, montare percorsi dell'host e fare altre operazioni molto interessanti che probabilmente non intendevi delegare.

{/* Any process that can "open" the socket can (probably) gain root access on the host. */}

#### Best practice per il socket

- 🥇 **Evita di montare il socket Docker**, probabilmente esiste un’alternativa migliore.  
- 🫣 Se proprio devi farlo, **metti un proxy stretto davanti** e consenti solo gli endpoint API di cui l’app ha realmente bisogno. Dai un’occhiata al progetto `docker-socket-proxy` originariamente di Tecnativa, [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Poi verifica che le chiamate negate siano effettivamente bloccate.  
- 🤢 Ok, _forse_ condividerlo è accettabile in un ambiente di test **altamente fidato** e **a basso rischio**.  

#### Bloccare i Paesi!

A volte utile, ma non è una vera barriera di sicurezza.  

_Parliamo dell’entità geopolitica, non della musica…_  

Se ospiti applicazioni principalmente per la tua famiglia e i tuoi amici locali, puoi bloccare il traffico proveniente da paesi da cui non ti aspetti visite. Oppure consentire solo il traffico dai paesi che ti aspetti. Riduce il rumore; non ferma VPN, proxy, botnet o chiunque sia paziente.  

Dai un’occhiata a questo script per bloccare tutto il traffico dalla Cina:

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

Allo stesso modo, puoi consentire solo il traffico proveniente dagli Stati Uniti:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Rafforzare l'host proxy CloudFlare

Se il tuo server domestico è protetto dietro un IP CloudFlare (proxy), puoi limitare l'accesso esclusivamente agli IP di CloudFlare e alla tua rete locale.

È concettualmente simile al [Country blocking](#blocking-country) sopra, ma con un controllo molto più restrittivo.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Blocca tutto il traffico in ingresso!!!
ufw default allow outgoing # Consenti tutto il traffico in uscita
ufw allow ssh # Consenti SSH

# Consenti l'accesso per la subnet locale (idealmente una DMZ/VLAN dedicata per i servizi ospitati)
ufw allow from 10.0.0.0/8 to any port 443
```

#Consenti gli IP di CloudFlare
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# Aggiungi il supporto IPv6
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Per verificare le modifiche basate sulla geolocalizzazione, può essere utile usare una VPN con uscite nel paese di interesse. Maggiori dettagli nella sezione [Monitoring & Verification](#-monitoring--verification).

### Sicurezza a livello di applicazione

Una volta che la tua [rete e host sono stati induriti](#-network-hazard), potresti scoprire che c’è ancora altro da fare.

Ora dobbiamo considerare il livello “applicazione” dei nostri servizi.

<p class="inset">Quel database ha una password valida? Questo container automatizza HTTPS/certificati? L'app include l'autenticazione integrata? Ci sono limiti su quali email possono registrarsi? Esistono credenziali predefinite o variabili d'ambiente da modificare?</p>

L'unico modo per _sapere_ è controllare. In questo caso, inizia con il `README` e altri file chiave come `docker-compose.yml`, `Dockerfile` e `.env.*`. Fai lo stesso per il progetto e, idealmente, anche per i servizi di supporto (ad es. Postgres, Redis, ecc.).

#### Reverse Proxy

Un ulteriore livello di difesa è l'autenticazione di base. Non usarla senza HTTPS. Per i servizi legacy, mettere l'autenticazione di base davanti a una rotta admin è spesso sufficiente a bloccare richieste casuali e crawler non autenticati che tentano di accedere direttamente.

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

Con un proxy di autenticazione di base, gli aggressori devono superare un ostacolo aggiuntivo—username e password—prima di raggiungere il tuo servizio interno.

Un'altra opzione è usare un servizio come [Traefik](https://traefik.io/) o [Caddy](https://caddyserver.com/) che può automatizzare HTTPS e l'autenticazione di base per te.

Se vuoi gestire molti domini e servizi tramite un’interfaccia grafica, ti consiglio **[Nginx Proxy Manager](https://nginxproxymanager.com/)**.

## 🔍 Monitoraggio e Verifica

- [Check Your Ports](#check-your-ports)
- [View Open Ports](#view-open-ports)
- [File Monitoring](#file-monitoring)

Questo è il **passo più importante e più trascurato**. Puoi avere il firewall migliore, la rete migliore e le migliori pratiche, ma se non verifichi, non hai alcuna certezza che funzionino.

In più, conoscere solo qualche comando — o sapere dove trovarli — può fare la differenza nel prevenire una violazione. Sentirsi come un hacker è solo un bonus. (Per dettagli ed esempi, vai direttamente alla sezione [Monitoring & Verification](#-monitoring--verification).)

<p class="inset">Non fidarti, verifica due volte</p>

### Controlla le tue porte

<p class="inset">⚠️ IMPORTANTE: non scansionare host che non possiedi.</p>

Che tu sia su una rete domestica o su un VPS, è fondamentale sapere quali porte sono aperte verso il mondo.

Ci sono 2 modalità per farlo:

- Controllare la rete (`nmap`, `masscan`)
- Interrogare il sistema operativo (`lsof`, `netstat`, `ss`)

#### Testare al di fuori della tua rete

Ti servirà il tuo IP pubblico corrente, facilmente ottenibile con servizi come `ifconfig.me`: `curl https://ifconfig.me`. Oppure puoi trovarlo nella dashboard del tuo provider di hosting.

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

Una volta ottenuto l'IP pubblico, devi **connetterti a una rete esterna**. Puoi usare il computer di un amico, un hotspot telefonico/5G, o un server dedicato.

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# Nota: assicurati che `target_host` sia l'IP desiderato

# Scansiona porte specifiche:
nmap -A -p 80,443,8080 --open --reason $target_host
# Le 100 porte più comuni:
nmap -A --top-ports 100 --open --reason $target_host
# Tutte le porte
nmap -A -p1-65535 --open --reason $target_host
```

```

#### Testa nella tua rete

Esercita l’uso di `nmap`, scandisci la tua rete locale o uno dei tuoi server, controlla il router, la stampante, il frigorifero smart.

{/* Sebbene le scansioni di porte siano una costante della vita, potrebbero violare il CFAA (Computer Fraud and Abuse Act) negli Stati Uniti. Quindi, scansiona solo ciò che possiedi. */}

#### Comandi di scansione di esempio

```bash

# Scansiona il tuo localhost per tutte le porte aperte
nmap -sT localhost

# Scansiona l'IP privato della tua macchina per i servizi
nmap -sV 192.168.1.10

# Trova i dettagli dei servizi nella tua rete
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# O su una rete Docker 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="Scansione nmap" frame="terminal"
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

Familiarizzati con `lsof` – è disponibile su macOS e Linux. Mostra lo stato di rete a livello granulare e l’attività del disco.

```bash title="Comandi lsof"
# Monitora una porta specifica
sudo lsof -i:80 -Pn
```

# Monitora le connessioni ESTABLISHED
sudo lsof -i -Pn | grep ESTABLISHED
# Visualizza LISTEN
sudo lsof -i -Pn | grep LISTEN

# per vedere i nomi di rete invece degli indirizzi IP (può richiedere molto tempo a causa delle risoluzioni DNS inverse)
sudo lsof -i -P | grep LISTEN

# Monitora tutte le connessioni di rete
sudo watch -n1 "lsof -i -Pn"

```

#### Output di esempio

![scansione nmap per i listener](../lsof-scan-listen.webp)

### Monitoraggio dei file

Per identificare quali **processi** stanno consumando più **larghezza di banda del disco**, puoi usare `iotop`:

```bash
sudo iotop
```

Per vedere le modifiche ai singoli file, puoi usare `inotifywait` su Linux o `fswatch` su macOS:

Questo è utile per rilevare comportamenti non autorizzati o anomali a livello di cartella o dell’intero sistema.

```bash
# Monitora tutte le modifiche ai file in una directory
sudo inotifywait -m /path/to/directory
```

Su macOS puoi usare `fswatch`:

Installa con `brew install fswatch`

```bash
fswatch -r /path/to/directory
```

```

## ⏰ Suggerimenti Spesso Trascurati

1. **Rate Limiting** per i tentativi di autenticazione e per qualsiasi altro endpoint critico. Che sia tramite il modulo `limit_req` di Nginx o `fail2ban` per l'accesso SSH, limitare i brute‑force è _probabilmente_ una buona idea. Dico _probabilmente_ perché, nell'era IPv6 e dei botnet a basso costo, le cose non sono più come una volta.

2. **Usa Volumi Read‑Only** dove possibile:
   ```yaml

services:
     webapp:
       volumes:
         - ./config:/config:ro

```
   In combinazione con altre best practice (utenti non root, permessi di cartella minimi), l'opzione di mount `:ro` aggiunge una protezione contro modifiche accidentali e alcuni tentativi di scrittura dall'interno del container. Non protegge l'host da un processo che già possiede privilegi più ampi.

3. **Esegui Audit di Accesso ai Container** regolarmente.  
   Se un container non ha bisogno di un segreto, di una porta o di un mount, rimuovili!

4. **Attento al WiFi Riff‑Raff**  
   Sono sicuro che non darai mai la password del tuo WiFi, soprattutto a sconosciuti, vero? Beh, tranne qualche amico… Ok, forse anche alla famiglia. Non sai mai quali app hanno e quali potrebbero condividere SSID e password con il mondo.

### Rete Domestica vs. Provider Pubblico vs. Tunneling

1. **Isolamento Virtuale/DMZ**: Per i server domestici, mettili su una VLAN o DMZ separata, se possibile. Questo mantiene i tuoi dispositivi interni fuori dalla portata di eventuali compromissioni provenienti dal server.  
   - Usa un router separato o una VLAN per il tuo server domestico.  
   - Usa una rete WiFi separata per il tuo server domestico.  
   - Usa una subnet separata per il tuo server domestico.

2. **Provider Cloud**: Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure e Google Cloud offrono funzionalità firewall differenti.  
   - Alcuni provider e servizi bloccano le porte per impostazione predefinita. Altri propongono opt‑in o add‑on. Consulta la documentazione del tuo provider.  
   - Molti provider forniscono servizi avanzati di monitoraggio e rilevamento delle minacce.

3. **VPN e Tunneling**: Valuta l’uso di un’opzione tipo VPN o di un servizio di tunneling per collegare in modo sicuro i servizi attraverso Internet senza esporli al pubblico.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.

{/* 3. **Rinforzo contro attacchi interni/laterali**: Un dispositivo infetto può compromettere un’intera rete. Segmentare i servizi Docker su reti personalizzate, usare hardware, regole UFW e bloccare le porte non necessarie aiuta a ridurre il rischio (quando configurato correttamente.) */}

## 🚀 Checklist di Produzione

- [ ] **Segreti**: Tutti i segreti generati casualmente e conservati in modo sicuro  
- [ ] **Aggiornamenti**: Strategia di aggiornamento dei container documentata e automatizzata. (Va bene anche se è solo qualche comando in un file di testo.)  
- [ ] **Rete**: Esporre solo le porte necessarie, reti interne configurate.  
- [ ] **Regole Firewall**: Default deny, allow espliciti, blocchi per paese se necessario.  
- [ ] **Reverse Proxy**: Nginx, Caddy o Traefik possono aggiungere un livello di autenticazione di base.  
- [ ] **Canary Tokens**: Posizionali vicino ai file sensibili e alle credenziali che effettivamente indagheresti se toccati.  
- [ ] **Monitoraggio** Conosci i tuoi sistemi con `nmap`, `lsof`, `inotifywait`, `glances`, ecc.  
- [ ] **Strategia di Backup**: Testata, preferibilmente automatizzata, e off‑site.  
- [ ] **Principio del Minimo Privilegio**: Utenti container non root, volumi read‑only.

## 📚 Ulteriori Letture

- [Docker Security Best Practices](https://docs.docker.com/develop/security-best-practices/)
- [OWASP Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org for Canary Tokens](https://canarytokens.org/)

## Grazie

Un ringraziamento a qualche Redditor attento:

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [thread](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

Grazie per aver letto! Spero che questa guida ti sia stata utile. Se hai domande o suggerimenti, contattami sui miei social qui sotto, oppure clicca su `Edit on GitHub` per aprire una PR! ❤️
````
