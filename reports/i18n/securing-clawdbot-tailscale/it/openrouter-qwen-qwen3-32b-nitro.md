# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: it
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/it/index.mdx
- Validation: deferred
- Runtime seconds: 61.74
- Input tokens: 12131
- Output tokens: 11768
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.003795
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Il tuo assistente AI mi ha dato l'accesso alla shell.
subTitle: >-
  Come proteggere la tua configurazione OpenClaw/Moltbot su ambiente locale o
  VPS
date: '2026-01-15'
modified: '2026-01-28'
tags:
  - security
  - moltbot
  - clawdbot
  - tailscale
  - ai
  - vpn
  - devops
  - ssh
category: Security
subCategory: AI Infrastructure
draft: false
cover_full_width: ../hero_wide.webp
cover_mobile: ../icon_square_200.webp
cover_icon: ../icon_square_200.webp
---
OpenClaw (precedentemente Clawdbot/Moltbot) ti fornisce un assistente AI personale che funziona su WhatsApp, Slack, Discord, iMessage e altri canali. Ma se esponi la sua gateway, i controlli dei nodi o l'SSH su internet pubblico senza autenticazione forte, stai dando a sconosciuti un accesso potenziale al tuo sistema.

Questa guida mostra l'impostazione più sicura: mantieni la gateway di OpenClaw su loopback, esponila solo al tuo tailnet con Tailscale Serve, blocca l'SSH e verifica dall'esterno che la gateway non sia pubblica.

L'adozione rapida del progetto ha rivelato preoccupazioni reali per la sicurezza: [Scansioni di Shodan hanno trovato 2.847 istanze esposte](https://socradar.io/blog/clawdbot-is-it-safe/) nelle prime settimane, e un [audit di sicurezza su GitHub ha segnalato 512 problemi](https://github.com/moltbot/moltbot/issues/1796) nel codice. Parte di questi risultati è output di scanner automatizzati e alcuni dati sono cambiati dopo il rinominamento a OpenClaw nel gennaio 2026, quindi considera questi numeri come un segnale di allerta piuttosto che un conteggio preciso delle vulnerabilità attuali. Non devi essere un esperto di sicurezza: devi solo evitare di pubblicare superfici operative prima di distribuire.

---

## Cosa Stai Effettivamente Esponendo

A seconda del modo in cui l'hai installato ed esposto, ci sono tre superfici da verificare:

- **Porta 22**: accesso SSH su un VPS  
- **Porta 18789**: Interfaccia di controllo del gateway e API WebSocket  
- **Controllo del browser/nodo**: esecuzione remota del nodo e automazione del browser tramite il modello di abbinamento gateway/nodo  

Le [documentazioni attuali su accesso remoto di OpenClaw](https://docs.molt.bot/gateway/remote) indicano che l'API WebSocket del gateway si lega al loopback per default e raccomandano di mantenerla accessibile solo tramite loopback a meno che non si scelga esplicitamente un bind LAN/tailnet/personalizzato. Questo è corretto. Il rischio emerge quando si sovrascrive questa impostazione predefinita, si pubblicano porte Docker, si aggiunge un reverse proxy, si attiva Funnel o si lascia l'SSH aperto al pubblico.  

Il gateway è la superficie più critica. È l'interfaccia operativa per il tuo assistente, inclusi i percorsi di invocazione degli strumenti. Se è raggiungibile da Internet e l'autenticazione è assente, debole, bypassata o compromessa, un attaccante potrebbe controllare l'agente o invocare strumenti con le tue autorizzazioni utente.  

Il controllo del browser è quasi altrettanto sensibile. Le documentazioni correnti di OpenClaw suggeriscono di eseguire il controllo del browser tramite un nodo host abbinato sulla macchina del browser e di trattare l'abbinamento dei nodi come un accesso operativo. Se un gateway può invocare `system.run` su un nodo abbinato, si tratta di esecuzione remota di codice su quel nodo, soggetta alle politiche del gateway e alle approvazioni di esecuzione native del nodo stesso.  

L'SSH è SSH. Se stai eseguendo con l'autenticazione tramite password abilitata, i tentativi di forza bruta sono inevitabili su un VPS pubblico.

## La soluzione Tailscale

Per OpenClaw, Tailscale ti fornisce l'accesso remoto senza pubblicare servizi operativi:

1. La tua istanza OpenClaw gira su un VPS o una macchina locale  
2. Il gateway rimane vincolato a loopback e viene raggiunto tramite Tailscale Serve, oppure si lega direttamente all'indirizzo IP di tailnet con autenticazione esplicita  
3. Installi Tailscale sia sul server che sui tuoi dispositivi personali  
4. Accedi a OpenClaw attraverso il suo indirizzo IP Tailscale o il nome MagicDNS  
5. Tutti gli altri su internet non vedono nulla, a meno che non abiliti intenzionalmente Funnel o un altro proxy pubblico  

### Dovresti lasciare che OpenClaw gestisca Tailscale?

OpenClaw ha un'integrazione Tailscale integrata che può configurare `tailscale serve` o `tailscale funnel` per il gateway.

**Modalità Serve** mantiene tutto all'interno del tuo tailnet. Il gateway rimane vincolato a `127.0.0.1` mentre Tailscale gestisce routing e HTTPS. Quando `gateway.auth.allowTailscale` è abilitato, OpenClaw può autenticare il traffico Control UI/WebSocket utilizzando gli header di identità Tailscale e verificare la sorgente con `tailscale whois`. Questa è la modalità corretta per la maggior parte delle distribuzioni personali.

**Modalità Funnel** espone pubblicamente il gateway tramite la funzionalità di endpoint pubblico di Tailscale. La documentazione ufficiale di Tailscale descrive Funnel come il routing del traffico dall'intera rete internet a un servizio locale. OpenClaw rifiuta di avviare Funnel a meno che la modalità di autenticazione del gateway non sia `password`, ma stai comunque scegliendo l'esposizione pubblica per una superficie operativa.

La documentazione [sicurezza di OpenClaw](https://docs.molt.bot/gateway/security) chiarisce che l'iniezione di prompt e l'accesso agli strumenti sono rischi fondamentali per un assistente personale. Non fornire all'agente un percorso per renderlo pubblico in modo silenzioso. Usa Serve in modo deliberato, evita Funnel a meno che non tu abbia davvero bisogno di accesso pubblico, e richiedi l'approvazione di esecuzione per qualsiasi comando `tailscale`.

---

## Configurazione sicura di OpenClaw

### Passo 1: Installa Tailscale

Nel tuo VPS o server locale:

```bash
# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Authenticate (opens a browser to log in)
sudo tailscale up

# Get your Tailscale IP
tailscale ip -4
# Output: 100.x.x.x
```

Nella tua macchina client, installa Tailscale dalla pagina di download ufficiale e accedi allo stesso tailnet.

Ora entrambe le macchine sono sulla stessa rete privata. Puoi pingare il tuo VPS utilizzando il suo indirizzo IP Tailscale, e verrà instradato attraverso il tunnel crittografato.

### Passo 2: Configura OpenClaw per utilizzare Tailscale

Il modello più sicuro al momento è: mantieni il gateway su loopback ed esponilo al tuo tailnet utilizzando Tailscale Serve.

Nella configurazione di OpenClaw:

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

Quindi avvia il gateway con Serve:

```bash
openclaw gateway --tailscale serve
```

La documentazione di OpenClaw afferma che questa configurazione mantiene il gateway su `127.0.0.1` mentre Tailscale gestisce HTTPS e routing del tailnet. Per accedervi, utilizza `https://<magicdns-name>/` e non l'indirizzo IP pubblico del tuo VPS.

Se preferisci un bind diretto sul tailnet invece di Serve, utilizza l'autenticazione esplicita del gateway:

```js
{
  gateway: {
    bind: "tailnet",
    auth: {
      mode: "token",
      token: "replace-with-a-long-random-token",
    },
  },
}
```

Poi connetti da un altro dispositivo nel tailnet:

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

Se stai eseguendo in Docker o un altro runtime dei container, fai particolare attenzione alla pubblicazione delle porte. Una pubblicazione come `-p 18789:18789` tipicamente si binda su tutti gli interfacce host. Preferisci loopback più Tailscale Serve, oppure binda esplicitamente lato host sull'indirizzo Tailscale dopo aver verificato che il container riceva traffico:

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

Dopo ogni modifica a Docker, controlla dall'esterno con `nmap` e localmente con `ss`. Docker può bypassare o riordinare le assunzioni del firewall host se non lo consideri.

### Passo 3: Blocca SSH

Anche con Tailscale, è necessario configurare correttamente SSH:

```bash
# Mantieni la sessione SSH corrente aperta durante l'esecuzione di queste operazioni.
# Prima, dalla tua macchina client, conferma che puoi accedere tramite SSH su Tailscale:
ssh your-user@SERVER_TAILSCALE_IP

# Inserisci le configurazioni di sicurezza in un file drop-in anziché riscrivere sshd_config.
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# Esegui la convalida prima del ricaricamento. Non saltare questo passo.
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

Questo disabilita l'accesso tramite password e l'accesso come root. Il passo successivo utilizza UFW per bloccare completamente l'SSH pubblico mantenendo comunque abilitato l'SSH su `tailscale0`.

### Passo 4: Regole del firewall

Configura un firewall come seconda barriera:

```bash
# Utilizzando UFW (Ubuntu/Debian)
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

La guida di rafforzamento di Ubuntu di Tailscale utilizza questa stessa struttura: permetti `tailscale0`, nega il traffico in entrata da altre sorgenti, quindi verifica che l'SSH pubblico scada mentre l'SSH all'indirizzo `100.x.y.z` funziona correttamente. Se gestisci un sito web pubblico sullo stesso VPS, mantieni solo le regole pubbliche necessarie, come `80/tcp` e `443/tcp`.

## Verifica dell'esposizione

### Verifica le porte aperte da un dispositivo esterno

Da una macchina che **NON** fa parte della tua rete Tailscale:

```bash
# Verifica se le porte pubbliche comuni sono esposte
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# Output atteso per un'istanza protetta:
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

Se `22` o `18789` mostra `open` invece di `filtered` o `closed`, hai un problema. Se `80` o `443` è aperto, assicurati che si tratti solo del tuo sito web pubblico intenzionale o dell'endpoint Tailscale Funnel, non accidentalmente del gateway OpenClaw.

### Verifica cosa è in ascolto localmente

Sul tuo server OpenClaw:

```bash
# Mostra tutte le porte in ascolto e a cosa sono vincolate
sudo ss -tulpn | grep LISTEN

# Cerca righe come questa (buono per Serve):
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# O questa (accettabile per bind diretto su tailnet con autenticazione):
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# NON come questa (cattivo):
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

Se vedi `0.0.0.0` o `:::` (equivalente IPv6), quel servizio è esposto al mondo esterno.

### Controllo di sicurezza integrato

OpenClaw include un [comando di controllo della sicurezza](https://docs.molt.bot/gateway/security) che verifica la tua configurazione rispetto alle best practice di sicurezza:

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

Il controllo verifica l'esposizione del gateway, la modalità Tailscale, le impostazioni di autenticazione, l'accesso ai canali, le politiche degli strumenti, l'inventario dei plugin e i permessi sui file. Tratta `--fix` come un utile ausilio, non come sostitutivo della lettura dei risultati.

---

## Cosa Questo Non Risolve

Tailscale elimina l'errore più grave: l'esposizione pubblica degli operatori. Non risolve però tutto:

**Archiviazione delle credenziali**: OpenClaw salva i trascritti delle sessioni, i token OAuth e le chiavi API su disco. Assicurati che questi abbiano i permessi corretti (`chmod 600` per i file, `chmod 700` per le directory di configurazione private) e non siano inclusi nel controllo delle versioni. Lo strumento di audit integrato verifica questo aspetto.

**Isolamento dei plugin**: I plugin vengono eseguiti con i permessi completi dell'utente. Installa solo plugin da fonti di cui ti fidi e verifica le capacità che richiedono. Lo strumento di audit elenca i plugin installati.

**Sicurezza del dispositivo**: Se qualcuno compromette il tuo account Tailscale o ruba un dispositivo nel tuo tailnet, può accedere alla tua istanza di OpenClaw. Abilita l'[autorizzazione dei dispositivi Tailscale](https://tailscale.com/kb/1099/device-authorization/) per richiedere l'approvazione per nuovi dispositivi.

---

## Checklist per il Deployment

## Checklist per il Deployment

Prima di considerare pronta per la produzione la tua istanza di OpenClaw/Moltbot:

- [ ] Tailscale installato ed autenticato su server e client
- [ ] Gateway mantenuto su loopback con Tailscale Serve, oppure vincolato a `tailnet` con autenticazione esplicita
- [ ] SSH configurato per disabilitare l'autenticazione tramite password e il login come root
- [ ] Firewall (UFW o iptables/nftables) configurato per consentire `tailscale0` e negare l'ingresso pubblico non necessario
- [ ] Scansione esterna nmap mostra tutte le porte `filtered` o `closed`
- [ ] Esecuzione interna di `ss -tulpn` mostra il gateway vincolato a `127.0.0.1`, `::1` o solo all'indirizzo IP di Tailscale
- [ ] I file delle credenziali hanno permessi 600 e le directory di configurazione private hanno permessi 700
- [ ] Esegui `openclaw security audit --deep` e risolvi tutte le problematiche individuate
- [ ] Se si utilizza la gestione Tailscale di OpenClaw, sono abilitate le approvazioni per l'esecuzione
- [ ] Configurati backup regolari (dati di OpenClaw + configurazioni)

---

## Risorse

- [Guida alla sicurezza di OpenClaw](https://docs.molt.bot/gateway/security)
- [Integrazione Tailscale per OpenClaw](https://docs.molt.bot/gateway/tailscale)
- [Riferimento CLI Tailscale Serve](https://tailscale.com/docs/reference/tailscale-cli/serve)
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)
- [Utilizzo di UFW per proteggere un server Ubuntu](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [Audit di sicurezza: 512 problematiche (Issue GitHub)](https://github.com/moltbot/moltbot/issues/1796)
- [Guida alla scansione di rete con Nmap](https://nmap.org/book/man.html)
````
