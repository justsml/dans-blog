# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/it/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 50.80
- Input tokens: 9431
- Output tokens: 9044
- Thinking tokens: unknown
- Cached input tokens: 1024
- Cache write tokens: 0
- Estimated cost: $0.002925
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-security-for-admins-and-maintainers --locale it
## Raw Output

`````mdx
---
unlisted: true
draft: true
hidden: true
title: 'Sicurezza di Docker: La Guida Perduta per gli Sviluppatori'
subTitle: ''
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

## Lavoro in corso

**Indice**

1. [⚠️ Reti locali a rischio](#-reti-locali-a-rischio)
2. [🛡️ Configurazione del firewall](#-configurazione-del-firewall)
3. [🔐 Gestione delle credenziali per lo sviluppo locale](#-gestione-delle-credenziali-per-lo-sviluppo-locale)
4. [🕵️‍ Leak di credenziali e attacchi di canale laterale](#-leak-di-credenziali-e-attacchi-di-canale-laterale)
5. [🔍 Monitoraggio e token canarino](#-monitoraggio-e-token-canarino)
6. [❌ Errori comuni](#-errori-comuni)

<p class="inset"></p>

## ⚠️ Reti locali a rischio

Siamo onesti, l’abbiamo tutti fatto. Ti sei connesso a una Wi-Fi casuale di un bar o hai lasciato qualcuno usare la tua rete domestica senza pensarci due volte. Forse addirittura hai fiducia che il tuo frigorifero intelligente non comprometta la tua rete. La realtà? Queste decisioni casuali possono esporre il tuo ambiente di sviluppo locale a rischi inutili. Gli attaccanti non mirano solo ai sistemi in produzione—gli ambienti locali sono spesso bersagli più fragili, offrendo un accesso a progetti sensibili.

### Scenario di attacco

1. **Traffico intercettato:** Il traffico non crittografato può essere facilmente catturato e letto.
2. **Servizi non protetti:** Database o API locali esposti su `0.0.0.0`.
3. **Sostituzione di rete:** Ridirige il traffico verso il dispositivo dell’attaccante.

### Soluzioni rapide

- Preferisci le reti Docker private rispetto ai firewall per limitare l’esposizione di rete.
- Evita Wi-Fi pubblici o condivisi; preferisci usare l’hotspot del telefono.
- Monitora la tua rete locale per dispositivi sconosciuti con strumenti come `arp-scan` e `nmap`.

## 🛡️ Configurazione del firewall

### UFW con Docker (Ubuntu)

> ⚠️ **Attenzione:** Per impostazione predefinita, Docker su Ubuntu/Debian ignorerà le regole UFW/iptables, esponendo potenzialmente il tuo sistema agli attacchi.
> Non importa se associ i porte all'indirizzo IP locale (es. `-p 127.0.0.1:8080:80`).

Mi sorprende ogni volta quando lo scopro! [Docker ignora per default le regole UFW](https://github.com/moby/moby/issues/4737), permettendo ai container di comunicare con l'host e tra loro senza restrizioni.

### Prassi consigliata

1. 🥇 **Utilizza le reti Docker** per isolare e controllare cosa può connettersi a ciascun container o rete.

2. 🥉 **Aggiorna iptables** se devi usare la rete `host` o non puoi utilizzare reti personalizzate, puoi mitigare il rischio configurando iptables. Non per i deboli di cuore, [vedi l'utilità qui sotto.](#uf)

#### Isolamento della rete Docker

```bash
# Crea una nuova rete Docker
docker network create my-network

# Esegui il tuo container con la nuova rete
docker run --network my-network my-container
```

#### Configurazione di UFW (per reti `host`)

Ci sono molte informazioni errate su come risolvere questo problema. Configura UFW per funzionare con Docker in modo simile a quanto potresti aspettarti.

Ho utilizzato `ufw-docker` per configurare un sistema self-hosted e sembra funzionare bene.

```bash title="install-ufw-docker.sh"
# Installa il binario come root (richiede comunque i permessi di root)
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# Installa e modifica il file `after.rules` di `ufw`
ufw-docker install

ufw-docker help
```

````
Questo comando esegue le seguenti operazioni:

- Esegue il backup del file `/etc/ufw/after.rules`.
- Aggiunge regole correlate a Docker alla fine del file per integrarsi correttamente con UFW.

**Fonte:** [GitHub ufw-docker](https://github.com/chaifeng/ufw-docker/tree/master#install)

**Esempio di utilizzo:**

```bash
# Consenti il contenitore Docker sulla porta 8080
ufw-docker allow <container_name> 8080/tcp

# Gestisci le regole in sicurezza insieme alla tua configurazione UFW
ufw-docker status
```

**Nota:** La maggior parte delle "soluzioni" per conflitti tra Docker e UFW prevede regole manuali iptables, che possono essere facilmente errate e molto fragili durante gli aggiornamenti.

### Firewall macOS

1. Vai a **Preferenze di Sistema > Sicurezza e Privacy > Firewall**.
2. Abilita il firewall e clicca su "Opzioni Firewall".
3. Blocca tutte le connessioni in entrata tranne i servizi essenziali.

**Nota:** Potrebbe dover cercare le configurazioni del firewall per consentire determinati dispositivi intelligenti che utilizza - ad esempio Google Cast/AirPlay e altri servizi.

### Comandi per utenti avanzati (macOS e Linux)

#### macOS:

```bash
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on  # Blocca tutto
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/app  # Consenti app specifica
```

#### Linux (ufw):

```bash
ufw default deny incoming  # Blocca tutto in entrata
ufw allow ssh  # Consenti SSH
# Consenti 443 e 80 per il traffico web
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # Abilita firewall
```

**Consiglio professionale:** Utilizza strumenti come [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) su macOS e [ufw](https://help.ubuntu.com/community/UFW) su Linux per configurazioni più intuitive.
````

## 🔐 Gestione dei Secret per lo Sviluppo Locale

### Validazione Proattiva dei Placeholder

<p>💡 Assicurati che i secret siano correttamente configurati con valori reali prima di eseguire l'applicazione.</p>

Se usi placeholder come `__WARNING_REPLACE_ME__` nei tuoi secret, forse qualcuno noterà. Per sicurezza, puoi anche aggiungere una piccola validazione per garantire la sicurezza in fase di esecuzione.

Non potresti credere quanto sia facile compromettere completamente (modificare e rieseguire la firma) un token JWT quando gli attaccanti riescono a indovinare il secret!

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

### Generazione e Archiviazione dei Secret

<p class="inset">Non codificare mai i secret direttamente nel codice. Preferire le variabili d'ambiente e i vault sicuri.</p>

Invece di `.env.example`, usare `.env.generate.sh` per rendere facile agli utenti ottenere un file `.env` con "default" sicuri.

#### Esempio `.env.generate.sh`

```bash title=".env.generate.sh" frame="code"
#!/bin/bash
# Genera un file .env sicuro per lo sviluppo locale

generate_secret() {
    local length=${1:-30}
    # Aggiungi 4 byte per il padding
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}
# Esci se il file .env esiste già
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

echo "Nuovo file .env generato!"
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

## 🕵️‍ Monitoraggio e Verifica Doppia

### Esempi con `nmap`

#### Test all'interno della tua rete

```bash

# Scansione del localhost per tutte le porte aperte
nmap -sT localhost

# Scansione dell'IP privato della tua macchina per servizi
nmap -sV 192.168.1.10

# Rilevamento dei dispositivi sulla tua rete
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
```

#### Test al di fuori della tua rete

Puoi verificare facilmente il tuo (IP pubblico) corrente utilizzando servizi come `ifconfig.me`: `curl https://ifconfig.me`.

Utilizza una rete esterna o un server remoto per testare i tuoi IP pubblici:

```bash
print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# Cambia target_host con il tuo IP pubblico o hostname
# Verifica l'host utilizzando tecniche avanzate
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host
```

**Perché testare entrambi?**  
Il test interno rivela l'esposizione interna, mentre i test esterni identificano i servizi accessibili agli attaccanti.

## 🛡️ Falsi miti comuni

1. **Il mio ambiente locale non è un bersaglio.**  
   - Fatto: Gli attaccanti possono passare attraverso il tuo computer per raggiungere i tuoi sistemi di produzione.  
2. **I firewall bloccano tutto.**  
   - Fatto: Bloccano solo ciò che hai configurato loro.  
3. **Gli indirizzi IP privati sono sicuri.**  
   - Fatto: Esploi come NAT bypass possono comunque colpire la tua rete.
`````
