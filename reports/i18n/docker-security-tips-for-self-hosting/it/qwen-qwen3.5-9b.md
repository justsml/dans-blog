# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: it
- Model: qwen/qwen3.5-9b
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 240.04
- Input tokens: unknown
- Output tokens: unknown
- Thinking tokens: unknown
- Cached input tokens: unknown
- Cache write tokens: unknown
- Estimated cost: unknown
- Pricing source: unknown
- Note: Command failed after 240000ms: bun run i18n:translate:chunked -- --slug docker-security-tips-for-self-hosting --locale it --model qwen/qwen3.5-9b --chunk 6p --run-id 2026-05-13T18-15-57-947Z-61322 --run-lock-path /Users/dan/code/oss/dans-blog/.git/codex-i18n-translation-run.json --quiz-concurrency 24
## Raw Output

````mdx
---
title: Consigli Essenziali di Sicurezza Docker per Self-Hosting
subTitle: 'Proteggi i tuoi servizi auto-ospitati: dalla difesa al monitoraggio!'
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

**Indice**

- 🧗‍♀️ [Per i coraggiosi](#️-for-the-brave)
- 🔄 [La danza `:latest`](#-the-latest-dance)
- 🔐 [Gestione delle credenziali: il modo corretto](#-secrets-management)
- 🌐 [Pericoli di rete](#-network-hazard)
- 🛡️ [Controlli di accesso](#️-access-controls)
- 🔍 [Monitoraggio e verifica](#-monitoring--verification)
- ⏰ [Consigli spesso trascurati](#-often-overlooked-tips)
- 🚀 [Checklist per produzione](#-production-checklist)
- 📚 [Ulteriore lettura](#-further-reading)

## 🧗‍♀️ Per i coraggiosi

Se stai ospitando servizi Docker in modo autonomo, la responsabilità della sicurezza spetta interamente a te, senza un provider cloud a proteggerti da scansione di porte o configurazioni frettolose. Che tu stia avviando app sulla tua rete domestica o affittando VPS da provider come Vultr, DigitalOcean, Linode, AWS, Azure o Google Cloud, dovrai bloccare correttamente le configurazioni e verificare che tu l'abbia fatto davvero.

In questa guida, esploreremo la sicurezza Docker - da tecniche `meno note` a altre `difficili da implementare correttamente`; analizzeremo token canary, volumi in sola lettura, regole di firewall, segmentazione e hardening di rete, aggiunta di proxy autenticati e molto altro.

Confronteremo anche le reti domestiche con le configurazioni del cloud pubblico e ti mostreremo come configurare un proxy di autenticazione di base con Nginx. Alla fine, disporrai di diverse opzioni per tenere fuori le persone non desiderate (amici, famiglia e a volte anche te stesso...).

Sono tante le cose da trattare! Ma molte di esse sono interconnesse, e potrai scegliere quelle più rilevanti per la tua configurazione. 🍀

## 🔄 Il "gioco" con `:latest`

Aggiornare le immagini è cruciale per la sicurezza. Tuttavia, affidarsi a `:latest` può introdurre modifiche rotte o build vulnerabili senza un passo di revisione.

### Il modo sicuro per aggiornare

Combina i comandi di aggiornamento con `pull` o `build` in modo da aggiornare deliberatamente le immagini, quindi riavvia durante un periodo in cui puoi notare eventuali rotture.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Version Pinning vs Latest

Scegliere la versione corretta a cui fissare è un equilibrio tra stabilità e sicurezza. Ecco alcune strategie comuni:

```yaml
# docker-compose.yml
# ...
  # Versione esatta, ideale per servizi critici
  image: postgres:17.2

  # Fissaggio per patch, buono per servizi non critici
  image: postgres:17.2

  # Versione principale, perfetta per progetti hobbistici
  image: postgres:17

  # Evita se possibile
  image: postgres:latest
```

Utilizza [Dependabot](https://github.com/features/security) o [Renovate](https://github.com/renovatebot/renovate) per aprire PR di aggiornamento verificabili. Per qualsiasi cosa ti farebbe male ricostruire alle 2 del mattino, fissa a una versione specifica o digest e lascia che l'automazione ti dica quando spostarti.

_Fammi sapere i tuoi strumenti preferiti per tenere aggiornate le immagini Docker!_

## 🔐 Gestione dei segreti

- [Genera Segreti Forti](#generate-strong-secrets)
- [Canary Tokens](#canary-tokens)
- [Aggiorna da `.env` a MacOS Keychain](#upgrade-from-env-to-macos-keychain)
{/* - [Placeholder Validation](#placeholder-validation) */}

Esistono molte strategie per gestire i segreti, ma una delle regole più importanti da seguire è: **non codificare mai i segreti direttamente nelle immagini Docker né commetterli in git**. È uno degli errori di sicurezza più comuni, rappresenta un rischio a lungo termine e risulta un fastidio da risolvere.

La gestione sicura dei segreti è un argomento complesso con diverse opzioni disponibili, come i file `.env`, i [Docker secrets](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), o un gestore di segreti come [HashiCorp Vault](https://www.vaultproject.io/) o AWS Secrets Manager.

Dovrai scegliere il "giusto" livello di sforzo e sicurezza in base al tuo caso d'uso.

{/*
TODO: Spostare nella Guida per il Manutentore
// TODO: Spostare nella Guida per il Manutentore

### Validazione dei Placeholder

<blockquote>Non crederebbe a quanto sia facile hackerare un token JWT quando il segreto non è davvero segreto!</blockquote>

**Summary:**  
Questo articolo argomenta che gli utenti di Docker auto-ospitati hanno la piena responsabilità della sicurezza, offrendo strategie pratiche per mitigare i rischi da servizi non aggiornati, configurazioni errate ed esposti segreti. Argomenti chiave includono la version pinning rispetto a `:latest`, la gestione sicura dei segreti (ad esempio, evitando i file `.env`), la segmentazione di rete e gli strumenti di convalida in esecuzione come i canary tokens. Diretto agli utenti domestici e cloud che auto-ospitano, la guida stile tutorial mescola esempi di codice (ad esempio, la configurazione di un proxy di autenticazione Nginx) con metafore come "tenere fuori i malfattori" per presentare la sicurezza come un'attività proattiva e manuale. Sottolinea il bilanciamento tra sforzo e sicurezza, dal setup hobbistico alla protezione a livello di produzione.

{/*
TODO: Spostare nella Guida per il Manutentore
// TODO: Spostare nella Guida per il Manutentore

### Validazione dei Placeholder

<blockquote>Non crederebbe a quanto sia facile hackerare un token JWT quando il segreto non è davvero segreto!</blockquote>

### Genera segreti forti
--- CHUNK END ---
<p className='inset'>💡 Assicurati che i segreti siano sempre unici. Prova a rendere impossibile eseguire l'applicazione con valori predefiniti non sicuri.</p>

Se usi segnaposti come `__WARNING_REPLACE_ME__` nei tuoi segreti, bene, forse qualcuno li noterà!

Per sicurezza, puoi anche aggiungere un po' di sicurezza in esecuzione con poco sforzo. Ecco come potresti farlo in JavaScript, Rust e Go:

<CodeTabs client:load tabs={["JavaScript", "Rust", "Go"]}>

```javascript
// validateSecrets.js
const validateSecrets = () => {
  const unsafePlaceholder = /__WARNING_REPLACE_ME__/;
  const missingSecrets = Object.entries(process.env).filter(
    ([key, value]) => unsafePlaceholder.test(value)
  );

  if (missingSecrets.length) {
    console.error("Segreti non sicuri rilevati:", missingSecrets);
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
            panic!("Segreto non sicuro in {}", key);
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
			panic(fmt.Sprintf("Segreto non sicuro in %s", pair[0]))
		}
	}
}

func main() {
	validateSecrets()
}
```
</CodeTabs>

*/}

### Genera segreti forti

Ecco uno script per generare nuovi segreti per un file `.env`:

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

[**Canary Tokens**](https://canarytokens.org/) sono un ottimo modo per rilevare se i tuoi segreti sono stati compromessi (e utilizzati). Sono come un allarme che puoi aggiungere a qualsiasi file sensibile, URL o token.

Considera di posizionarli accanto ai segreti che ti preoccupano davvero: file `.env`, variabili CI, gestori di password, cartelle di backup e credenziali cloud. Non trasformare questo in teatro; posiziona gli allarmi dove un vero attaccante o un errore futuro potrebbe accedervi.

Esistono molti tipi di canary token disponibili, dagli [AWS token](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), numeri di [carta di credito fittizie](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), file Excel/Word, file Kubeconfig, credenziali VPN, fino a file di dump SQL con allarme integrato!

#### Best Practice per Canary Token

- **Posizionare ovunque**: In ogni file `.env`, pipeline CI/CD e "gestore delle credenziali" che puoi immaginare.
  - Posiziona un file `passwords.xlsx` o `passwords.docx` nella tua directory home.
  - Aggiungi un profilo AWS `billing_prod` con un canary token come segreto.
  - Genera un file `private.key` per la directory `~/.ssh`.
  - Crea un dump SQL Canary `all_credit_cards.sql` per la directory `~/backups`.
- **Monitoraggio**: Configura regole/email di allarme per rilevare quando un canary token viene attivato.

### Miglioramento da `.env` a Keychain macOS

Per gli utenti Mac, una delle opzioni più semplici è utilizzare Keychain.

Ecco un modo semplice per automatizzare il caricamento di segreti dal Keychain macOS, supporta `TouchID` e è più sicuro rispetto ai file `.env`.

L'originale <cite>merito va a [Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) e [Jan Schaumann](https://www.netmeister.org/</cite>

<CodeTabs client:load tabs={[
  "Comandi ausiliari",
  "Persistere segreti nell'ambiente",
  "Utilizzare segreti per comando"
]}>
```bash title="keychain-secrets.sh"
### Funzioni per impostare e ottenere variabili d'ambiente dal Keychain macOS ###
### Adattato da: https://www.netmeister.org/blog/keychain-passwords.html e 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# Utilizzo: get-keychain-secret VARIABILE_DI_AMBIENTE
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "variabile d'ambiente" -s "${1}"
}

# Utilizzo: set-keychain-secret VARIABILE_DI_AMBIENTE
# Ti verrà richiesto di inserire il valore del segreto!
function set-keychain-secret () {
    [ -n "$1" ] || print "Mancante il nome della variabile d'ambiente"
    
    # richiedi all'utente il segreto
    echo -n "Inserisci segreto per ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "variabile d'ambiente" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Carica le variabili d'ambiente nel shell corrente
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Nota: Se un attacco può eseguire `env` nel tuo shell, questi segreti potrebbero essere esposti!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secret.sh

# Specifica tutti i segreti per questo progetto
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Nota: L'utilizzo di un wrapper shell aiuta a prevenire che i segreti rimangano
# nell'ambiente. È sicuro committarlo.

# Utilizzo:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 Pericolo di Rete

### Rete Personalizzata & Porte Interne

Isolare correttamente i servizi con le reti Docker è un modo importante per ridurre la superficie d'attacco.

Fai attenzione a creare buchi nella tua rete! Un singolo inavvertito inoltro di porte può finire molto male.

Per default, i servizi su una LAN privata non saranno esposti a Internet: devi esplicitamente inoltrare le porte dal tuo router.

### Docker sulla LAN

Se sei uno sviluppatore che esegue server di sviluppo localmente o che ospita servizi dalla tua rete domestica, **le assunzioni sul modello di rete di Docker possono causare problemi**.

Gli sviluppatori spesso rimangono sorpresi nel trovare che i metodi "tradizionali" per proteggere i server Linux (`iptables`, limitare le opzioni sysctl tcp/ip) possono **fallire silenziosamente** sugli host Docker! Questo è particolarmente vero quando **si ospita autonomamente o si esegue su una tipica rete domestica**. (Per chi è in fondo alla stanza: Questo può permettere l'accesso ai container di sviluppo sul tuo MacBook!!!)

> ⚠️ **Attenzione #1:** Le porte pubblicate da Docker possono bypassare le regole del firewall che pensavi proteggessero l'host, specialmente con UFW su Ubuntu/Debian. Questo non rende inutili tutte le regole del firewall, ma significa che "UFW dice deny" non è una prova. [Vedi problema #690: Docker bypassa le regole del firewall UFW](https://github.com/moby/moby/issues/690).

> ⚠️ **Attenzione #2:** Collegare le porte agli indirizzi IP locali (es. `-p 127.0.0.1:8080:80`) è comunque una buona pratica, ma le versioni di Docker Engine precedenti alla 28.0.0 avevano casi in cui gli host sulla stessa rete L2 potevano comunque raggiungere le porte pubblicate su localhost. [Docker documenta questa eccezione nella sua guida alla pubblicazione delle porte](https://docs.docker.com/engine/network/port-publishing/), e l'abitudine di verificare con nmap qui sotto è comunque rilevante.

<p class="inset">Se sei sorpreso di scoprire questo, sei in buona compagnia!</p>

**Collegare alle porte locali è comunque una buona pratica** e ha un impatto significativo in **ambienti cloud gestiti e reti configurate in modo specifico**. 
{/* Non considerare il tuo firewall o la rete privata come la tua difesa principale o unica, aggiungi le reti Docker al mix per un migliore **isolamento**, e considera sempre se hai davvero bisogno di esporre le porte. */}

### Esempio Docker Compose

Ecco un esempio di file `docker-compose.yml` che collega il servizio `app` a `127.0.0.1:8080` e connette entrambi i contenitori alla rete personalizzata `backend`.

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # Collega a localhost se possibile
      - "127.0.0.1:8080:8080"
    # ... altre impostazioni
  database:
    image: postgres:17.1
    # Nessuna porta necessaria; accessibile all'interno della rete backend.
    networks:
      - backend

```

{/* #### Test & Verifica

Come per tutte le misure di sicurezza, è fondamentale che tu **testi e verifichi** la tua configurazione di rete. */}

{/* Mentre la sicurezza e l'audit della rete sono responsabilità a tempo pieno in molte aziende, la maggior parte delle persone che self-host non ci dedica NESSUN tempo! */}

{/* Dai, capisco, può sembrare scoraggiante. _(Sottoreti, maschere di sottorete, CIDR, VLAN e tabelle di routing, oh no! Se non ha avuto senso, va bene, sei nel posto giusto. Inoltre, non dobbiamo preoccuparci di nulla di questo per ora.)_ */}

### Prassi ottimali per le reti

- 🏆 **Non Pubblicare ALCUNA Porta** Recentemente ho scoperto che questo è più utile di quanto si possa immaginare! Quando si utilizza una rete denominata (bridge), i contenitori hanno accesso non filtrato l'uno all'altro. Si comportano come se fossero dietro una rete locale (gateway NAT.)
  - Sebbene non sia possibile in tutti i casi d'uso, potrebbe essere utile per contenitori che eseguono attività batch o principalmente accessibili tramite `attach` o `exec`.
- 🥇 **Usa le Rete Docker** per isolare e controllare quali contenitori possono comunicare tra loro.
- 🥉 **Usa il Binding su Localhost**: Sebbene [imperfetto](https://github.com/moby/moby/issues/45610), in generale è meglio collegare le porte a un indirizzo loopback (es. `127.0.0.1:8080:80`). Assicurati solo di [verificare la tua configurazione.](#-monitoring--verification)

## 🛡️ Controlli di Accesso

I controlli di accesso sono un elemento cruciale per la sicurezza dei tuoi servizi Docker. Questo include limitare le capacità dei contenitori, restringere l'accesso al socket Docker e altro.

- [Limitare le capacità dei contenitori](#limiting-container-capabilities)
- [Accesso al Socket Docker](#docker-socket-access)
- [Bloccare il Paese!](#blocking-country)
- [Rafforzare l'Host Proxy di CloudFlare](#hardening-cloudflare-proxy-host)

### Limitare le Capacità dei Contenitori

Un'altra pratica solida per i controlli di accesso è limitare le capacità dei contenitori. Questo riduce il raggio d'azione di minacce come escalation di privilegi o intercettazione del traffico. Non è un campo di forza, ma rimuove le autorizzazioni che la maggior parte dei contenitori non ha mai avuto bisogno.

**Cosa sono le capacità?** Permessi o abilità definite dal kernel Linux. (La pagina man [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) elenca tutte.) Includono cose come `CAP_CHOWN` (modifica della proprietà dei file), `CAP_NET_ADMIN` (configura interfacce di rete), `CAP_KILL` (elimina qualsiasi processo), e molte altre.

I due modi per determinare le capacità necessarie sono:

1. **Prova ed errore**: Questo metodo lento ma efficace ti fa iniziare senza capacità, aggiungendole una alla volta finché l'app non funziona.
2. **Trova lavoro precedente**: Cerca "`project-name` `cap_drop` Dockerfile" o "`project-name` `cap_drop` docker-compose.yml" per vedere se altri hanno già svolto il lavoro. Un modello linguistico può suggerire un punto di partenza, ma trattalo come un'ipotesi finché non testi il contenitore e leggi la documentazione dell'immagine.

#### Prassi ottimali per le capacità

- **Rimuovi tutte le capacità**: Usa `cap_drop: [ ALL ]` per rimuovere tutte le capacità Linux dal contenitore.
- **Nessun Nuovo Privilegio**: Usa `security_opt: [ no-new-privileges=true ]` per impedire al contenitore di acquisire nuovi privilegi.

```yaml title="Esempio: Rimuovi/Limita Capacità" {5-14}
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
    # ... altre impostazioni
networks:
  db-network:
```

Ora i tuoi servizi possono comunicare tra loro tramite la rete `db-network`. Docker Compose creerà automaticamente questa rete.

Usa l'opzione `--external`/`external:` per unirti a una **rete esistente**. Omettila per creare una nuova rete.

### Accesso al Socket Docker

#### ⚠️ Attenzione: `docker.sock` è praticamente l'accesso amministratore all'host

<blockquote class="inset">⚠️ L'opzione `:ro` non influisce sull'I/O inviato tramite il socket!</blockquote>

Garantisce solo che il percorso del socket stesso sia montato in sola lettura. Le chiamate API inviate tramite quel socket possono comunque creare contenitori, montare percorsi dell'host e fare altre cose molto interessanti che probabilmente non intendevi di delegare.

{/* Qualsiasi processo in grado di "aprire" il socket può (probabilmente) ottenere l'accesso root sull'host. */}

#### Prassi Migliori per il Socket

- 🥇 **Evitare di montare il socket Docker,** probabilmente esiste un'alternativa migliore.  
- 🫣 Se è assolutamente necessario, **posizionare un proxy ristretto davanti a esso** e consentire solo gli endpoint API che l'app effettivamente richiede. Esplora il progetto `docker-socket-proxy` originariamente sviluppato da Tecnativa, [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Poi verifica che le chiamate negate siano effettivamente negate.  
- 🤢 Okay, _forse_ condividere il socket è accettabile in un ambiente di test **molto affidabile** e **a basso rischio**.  

#### Blocco per Paese!  

A volte utile, ma non una reale barriera di sicurezza.  

_Parlando dell'entità geopolitica, non della musica..._  

Se ospiti app principalmente per la tua famiglia e amici, puoi bloccare il traffico da paesi da cui non ti aspetti ricevere traffico. Oppure consentire solo traffico da paesi che prevedi. Riduce il rumore; non blocca però VPN, proxy, botnet o chiunque abbia pazienza.  

Ecco uno script per bloccare tutto il traffico dalla Cina:

```bash title="blocca-cina.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

In modo simile, puoi consentire solo il traffico dagli Stati Uniti:

```bash title="consenti-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Rafforzamento del proxy host di CloudFlare

Se il tuo server domestico è protetto dietro un IP di CloudFlare (proxy), puoi limitare l'accesso solo agli IP di CloudFlare e alla tua rete locale.

Questo è simile al [Blocco per paese](#blocco-per-paese) sopra, ma con un controllo molto più stretto.

```bash title="elenco-bianco-ingresso-da-cloudflare.sh"
ufw default deny incoming # Blocca tutto l'ingresso!!!
ufw default allow outgoing # Consenti tutto l'uscita
ufw allow ssh # Consenti SSH

# Consenti l'accesso per la subnet locale (preferibilmente una DMZ/VLAN dedicata per i servizi ospitati)
ufw allow from 10.0.0.0/8 to any port 443
```

# Consenti gli indirizzi IP di CloudFlare
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# Aggiungi supporto IPv6
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done

```

Per testare modifiche basate sulla geolocalizzazione, può essere utile utilizzare un VPN con posizioni nel paese desiderato. Per saperne di più, vedi la sezione [Monitoraggio & Verifica](#-monitoring--verification).

### Sicurezza del livello applicazione

Una volta che [rete e host sono stati rafforzati dal punto di vista della sicurezza,](#-network-hazard) potresti scoprire che ci sarà molto altro da fare.

Ora dobbiamo pensare al "livello applicazione" dei nostri servizi stessi.

<p class="inset">Quel database ha una password valida? Questo contenitore automatizza l'HTTPS/certs? L'app include un'autenticazione integrata? Esistono limiti sugli indirizzi email che possono registrarsi? Ci sono credenziali predefinite o variabili d'ambiente da modificare?</p>

L'unico modo per <em>saperlo</em> è verificare. In questo caso, inizia con il file `README` e altri file chiave come `docker-compose.yml`, `Dockerfile` e `.env.*`. Controlla sia nel progetto che, idealmente, nei suoi servizi di supporto. (es. Postgres, Redis, ecc.)

#### Reverse Proxy

Un altro strato di difesa è l'autenticazione di base. Non utilizzarla senza HTTPS. Per servizi legacy, aggiungere l'autenticazione di base davanti a una rotta di amministrazione è spesso sufficiente per bloccare le richieste casuali e i ragni non autenticati che proverebbero a interagire direttamente con il servizio.

```nginx
# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Accesso Riservato";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}
```

Genera le credenziali:

```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

Con un reverse proxy con autenticazione di base, gli attaccanti devono superare un ulteriore ostacolo - nome utente e password - prima di poter raggiungere il tuo servizio interno.

Un'altra opzione è utilizzare un servizio come [Traefik](https://traefik.io/) o [Caddy](https://caddyserver.com/) che possono automatizzare l'HTTPS e l'autenticazione di base per te.

Se desideri gestire molti domini e servizi tramite un'interfaccia grafica, ti consiglio [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 Monitoraggio e Verifica

- [Controlla le tue porte](#check-your-ports)
- [Visualizza le porte aperte](#view-open-ports)
- [Monitoraggio dei file](#file-monitoring)

Questo è **il passo più importante e più trascurato.** Puoi avere il miglior firewall, la migliore rete e le migliori pratiche, ma se non verifichi, non sai se funzionano.

Inoltre, conoscere solo un paio di comandi - o dove cercarli - può fare la differenza nel prevenire un'incursione. Il senso di essere un hacker è solo un bonus. (Per dettagli ed esempi, vai avanti alla sezione [Monitoraggio e Verifica](#-monitoring--verification).)

<p class="inset">NON FIDARTI, VERIFICA DUE VOLTE</p>

### Controlla le Tue Porte

<p class="inset">⚠️ IMPORTANTE: Non scansionare host che non possiedi.</p>

Sia che tu sia su una rete domestica che su un VPS, vorrai sapere quali porte sono aperte al mondo esterno.

Ci sono 2 modi per farlo:

- Controlla la Rete (`nmap`, `masscan`)
- Chiedi al Sistema Operativo (`lsof`, `netstat`, `ss`)

#### Testare al di Fuori della Tua Rete

Avrai bisogno del tuo IP pubblico corrente, facilmente ottenibile con servizi come `ifconfig.me`: `curl https://ifconfig.me`. Oppure puoi cercarlo nel pannello di controllo del tuo provider di hosting.

```bash title="Get Public IP"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

Una volta che hai il tuo IP pubblico, dovrai **connetterti a una rete esterna**. Puoi usare un computer di un amico, un hotspot 5G del telefono o un host server dedicato.

```bash title="nmap External Scan"
target_host="$(curl -fsSL https://ifconfig.me)"

# Nota: Assicurati che `target_host` sia l'IP desiderato

# Scansiona porte specifiche:
nmap -A -p 80,443,8080 --open --reason $target_host
# Prime 100 porte:
nmap -A --top-ports 100 --open --reason $target_host
# Tutte le porte
nmap -A -p1-65535 --open --reason $target_host
```

#### Test all'interno della tua rete

Pratica l'uso di `nmap`, esegui una scansione della tua rete locale o di uno dei tuoi server, controlla il tuo router, stampante, frigorifero intelligente.

{/* Sebbene le scansione delle porte siano una costante nella vita quotidiana, potrebbe essere un'infrazione al CFAA (Computer Fraud and Abuse Act) negli Stati Uniti. Quindi, esegui le scansione solo su dispositivi che possiedi. */}

#### Comandi di scansione di esempio

```bash

# Scansione del localhost per tutte le porte aperte
nmap -sT localhost

# Scansione dell'IP privato del tuo dispositivo per i servizi
nmap -sV 192.168.1.10

# Trova dettagli sui servizi nella tua rete
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

### Visualizza porte aperte

Familiari con `lsof` - è disponibile su MacOS e Linux. Mostra lo stato della rete e l'attività del disco in modo dettagliato.

```bash title="Comandi lsof"
# Monitora una porta specifica
sudo lsof -i:80 -Pn
```

```
# Monitorare le connessioni ESTABLISHED
sudo lsof -i -Pn | grep ESTABLISHED
# Visualizzare le connessioni in LISTEN
sudo lsof -i -Pn | grep LISTEN

# Per visualizzare i nomi di rete invece degli indirizzi IP (le lookup DNS inverse possono essere molto lente)
sudo lsof -i -P | grep LISTEN

# Monitorare tutte le connessioni di rete
sudo watch -n1 "lsof -i -Pn"


```

#### Esempio di output

![scansione nmap per i listener](../lsof-scan-listen.webp)

### Monitoraggio file

Per identificare quali **processi** stanno utilizzando la **larghezza di banda del disco rigido** in modo più intenso, puoi usare `iotop`:

```bash

sudo iotop

```

Per osservare i cambiamenti individuali nei file, puoi usare `inotifywait` su Linux o `fswatch` su MacOS:

Questo può essere utile per rilevare comportamenti non autorizzati o strani a livello di cartella o su tutto il sistema.

```bash

# Monitorare tutti i cambiamenti nei file di una directory
sudo inotifywait -m /path/to/directory

```

Su MacOS puoi usare `fswatch`:

Installa con `brew install fswatch`

```bash

fswatch -r /path/to/directory
```

## ⏰ Consigli spesso trascurati

1. **Limitazione della frequenza** per tentativi di autenticazione e qualsiasi altra endpoint critico. Che si usi il modulo `limit_req` di Nginx o `fail2ban` per l'accesso SSH, limitare gli attacchi di forza bruta _probabilmente_ è una buona idea. Dico _probabilmente_ perché nell'era di IPv6 e botnet a basso costo, beh, non è più quel che era.

2. **Usare volumi in sola lettura** dove possibile:
   ```yaml
services:
     webapp:
       volumes:
         - ./config:/config:ro
```
   Combinato con altre best practice (utenti non root, permessi minimi per le cartelle), l'opzione di montaggio `:ro` fornisce protezioni aggiuntive contro modifiche accidentali e alcuni tentativi di scrittura dal contenitore. Non protegge l'host da un processo che abbia già privilegi più ampi.

3. **Auditare regolarmente l'accesso ai contenitori**.
   Se un contenitore non ne ha bisogno di un segreto, porta o mount, rimuovilo!

4. **Fate attenzione agli sgraditi in WiFi**
   Sono certo che non dareste mai la password del vostro WiFi a personaggi strani, giusto? A meno che non siano amici... Okay, forse anche parenti. Non si sa mai che app abbiano installato e che possano condividere il vostro SSID & password con il mondo.

### Rete domestica vs. Fornitore pubblico vs. Tunneling

1. **Isolamento virtuale/DMZ**: Per i server domestici, posizionarli su un VLAN o DMZ separato se possibile. Questo mantiene i vostri dispositivi interni inaccessibili a potenziali compromissioni dal lato del server.
   - Usare un router separato o VLAN per il vostro server domestico.
   - Usare una rete WiFi separata per il vostro server domestico.
   - Usare un sottorete separata per il vostro server domestico.

2. **Provider Cloud**: Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure e Google Cloud offrono tutte funzionalità di firewall diverse.  
   - Alcuni provider e servizi bloccano le porte di default. Altri offrono opzioni di abbonamento o servizi aggiuntivi. Consultare la documentazione del proprio provider.  
   - Molti provider offrono servizi avanzati di monitoraggio e rilevamento delle minacce.  

3. **VPNs e Tunneling**: Considerare l'uso di un'opzione simile a una VPN o un servizio di tunneling per connettere in modo sicuro i servizi su internet senza esporli alla rete pubblica.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.  

{/* 3. **Protezione da attacchi interni/laterali**: Un singolo dispositivo infetto può compromettere l'intera rete. Segmentare i servizi Docker su reti personalizzate, utilizzare hardware, regole UFW e bloccare le porte non necessarie può ridurre il rischio (se configurato correttamente). */}  

## 🚀 Checklist per l'ambiente di produzione  

- [ ] **Segreti**: Tutti i segreti generati casualmente e archiviati in modo sicuro  
- [ ] **Aggiornamenti**: Strategia di aggiornamento dei container documentata e automatizzata. (Va bene anche se si tratta solo di pochi comandi in un file di testo.)  
- [ ] **Rete**: Esposizione solo delle porte necessarie, reti interne configurate.  
- [ ] **Regole del firewall**: Blocco predefinito, autorizzazioni esplicite, blocco per paese se necessario.  
- [ ] **Reverse Proxy**: Nginx, Caddy o Traefik possono aggiungere un livello di autenticazione di base  
- [ ] **Token canary**: Posizionarli vicino ai file sensibili e alle credenziali che verifichereste effettivamente se toccati.  
- [ ] **Monitoraggio**: Conoscere il proprio sistema con `nmap`, `lsof`, `inotifywait`, `glances`, ecc.  
- [ ] **Strategia di backup**: Testata, preferibilmente automatizzata e fuori sede.  
- [ ] **Principio del minimo privilegio**: Utenti non root per i container, volumi in sola lettura.  

## 📚 Ulteriori Letture

- [Pratiche di Sicurezza Docker](https://docs.docker.com/develop/security-best-practices/)  
- [Foglio delle Prassi di Sicurezza Docker OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)  
- [Benchmark Docker CIS](https://www.cisecurity.org/benchmark/docker)  
- [Canarytokens.org per i Token di Avvertimento](https://canarytokens.org/)  

## Ringraziamenti  

Un ringraziamento a alcuni attenti utenti di Reddit:  

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [thread](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>  
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>  
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>  
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>  
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>  

Grazie per aver letto! Spero che ti sia stato utile questa guida. Se hai domande o suggerimenti, non esitare a contattarmi sui miei social qui sotto, o clicca sul link `Edit on GitHub` per creare un PR! ❤️
````
