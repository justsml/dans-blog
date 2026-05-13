# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: fr
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/fr/index.mdx
- Validation: passed
- Runtime seconds: 58.26
- Input tokens: 9689
- Output tokens: 12286
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003724
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Votre assistant IA m'a donné l'accès au shell
subTitle: Comment sécuriser votre configuration OpenClaw/Moltbot locale ou sur VPS
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
OpenClaw (anciennement Clawdbot/Moltbot) vous donne un assistant IA personnel fonctionnant sur WhatsApp, Slack, Discord, iMessage et d'autres canaux. Mais si vous exposez son passerelle, ses contrôles de nœud ou son accès SSH sur l'internet public sans authentification forte, vous offrez à des inconnus un accès potentiel vers votre machine.

Ce guide présente la configuration la plus sécurisée : conserver la passerelle OpenClaw sur l'interface de boucle, l'exposer uniquement à votre réseau Tailscale via Tailscale Serve, verrouiller l'SSH et vérifier depuis l'extérieur que la passerelle n'est pas publique.

L'adoption rapide du projet a révélé des préoccupations de sécurité réelles : [des scans Shodan ont trouvé 2 847 instances exposées](https://socradar.io/blog/clawdbot-is-it-safe/) lors des premières semaines, et une [vulnérabilité de sécurité GitHub a rapporté 512 findings](https://github.com/moltbot/moltbot/issues/1796) dans la base de code. Certains de ces résultats proviennent d'outils de balayage automatisés et d'autres ont changé depuis le renommage en OpenClaw en janvier 2026, considérez donc ces chiffres comme un signal d'alerte plutôt qu'un compte précis des vulnérabilités actuelles. Vous n'avez pas besoin d'être un expert en sécurité — il vous suffit simplement d'éviter d'exposer des surfaces d'opération avant le déploiement.

---

## Ce que vous exposez réellement

En fonction de la manière dont vous l'avez installé et exposé, trois surfaces méritent d'être vérifiées :

- **Port 22** : Accès SSH sur un VPS  
- **Port 18789** : Interface de contrôle de la passerelle et API WebSocket  
- **Contrôle navigateur/nœud** : exécution à distance des nœuds et automatisation du navigateur via le modèle de couplage passerelle/nœud  

Les [docs d'accès à distance d'OpenClaw](https://docs.molt.bot/gateway/remote) indiquent que le WebSocket de la passerelle se lie à l'interface boucle par défaut et recommandent de le garder en boucle locale sauf si vous choisissez intentionnellement une liaison LAN/mesh réseau ou personnalisée. C'est une bonne pratique. Le risque apparaît lorsque vous modifiez cette valeur par défaut, publiez les ports Docker, ajoutez un reverse proxy, activez Funnel, ou laissez l'SSH ouvert au public.  

La passerelle est la plus critique. C'est la surface d'opération pour votre assistant, y compris les chemins d'invocation d'outils. Si elle est accessible depuis Internet et que l'authentification est absente, faible, contournée ou fuite, un attaquant pourrait exécuter l'agent ou invoquer des outils avec les permissions de l'utilisateur.  

Le contrôle du navigateur est presque aussi sensible. Les docs d'OpenClaw actuelles recommandent d'exécuter le contrôle du navigateur via un hôte nœud couplé sur la machine du navigateur et de traiter le couplage nœud comme un accès opérateur. Si une passerelle peut invoquer `system.run` sur un nœud couplé, il s'agit d'une exécution de code à distance sur ce nœud, soumise à la politique de nœud de la passerelle et aux autorisations d'exécution du nœud lui-même.  

L'SSH est l'SSH. Si vous exécutez avec l'authentification par mot de passe activée, les tentatives de force brute sont inévitables sur un VPS public.

## La solution Tailscale  

Pour OpenClaw, Tailscale vous offre un accès distant sans publier de services d'opérateur :  

1. Votre instance OpenClaw s'exécute sur un VPS ou une machine locale  
2. La passerelle reste liée à la boucle locale et est accessible via Tailscale Serve, ou elle se lie directement à l'IP du réseau Tailscale avec une authentification explicite  
3. Vous installez Tailscale à la fois sur le serveur et vos appareils personnels  
4. Vous accédez à OpenClaw via son IP Tailscale ou son nom MagicDNS  
5. Tout le monde ailleurs sur internet ne voit rien, sauf si vous activez intentionnellement Funnel ou un autre proxy public  

### Devriez-vous laisser OpenClaw gérer Tailscale ?  

OpenClaw propose une [intégration Tailscale intégrée](https://docs.molt.bot/gateway/tailscale) capable de configurer `tailscale serve` ou `tailscale funnel` pour la passerelle.  

**Le mode Serve** limite tout à votre réseau Tailscale. La passerelle reste liée à `127.0.0.1` tandis que Tailscale gère le routage et HTTPS. Lorsque `gateway.auth.allowTailscale` est activé, OpenClaw peut authentifier le trafic Control UI/WebSocket en utilisant les en-têtes d'identité Tailscale et vérifier la source via `tailscale whois`. Il s'agit du mode approprié pour la plupart des déploiements personnels.

**Mode Funnel** expose publiquement la passerelle via la fonctionnalité de point d'extrémité public de Tailscale. La documentation officielle de Tailscale décrit Funnel comme le routage du trafic depuis l'internet plus large vers un service local. OpenClaw refuse de démarrer Funnel tant que le mode d'authentification de la passerelle n'est pas `password`, mais vous choisissez quand même d'exposer publiquement une surface d'exploitation.

La [documentation de sécurité d'OpenClaw](https://docs.molt.bot/gateway/security) est claire sur le fait que l'injection de prompt et l'accès aux outils constituent des risques majeurs pour un assistant personnel. Ne donnez pas à l'agent un accès silencieux pour se rendre public. Utilisez Serve avec intention, évitez Funnel sauf si vous avez vraiment besoin d'un accès public, et exigez une approbation d'exécution pour toute commande `tailscale`.

---

## Mise en place sécurisée d'OpenClaw

### Étape 1 : Installer Tailscale

Sur votre VPS ou serveur local :

```bash
# Installez Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Authentifiez-vous (ouvre un navigateur pour se connecter)
sudo tailscale up

# Obtenez votre IP Tailscale
tailscale ip -4
# Sortie : 100.x.x.x
```

Sur votre machine client, installez Tailscale depuis la page de téléchargement officielle et connectez-vous au même réseau tailnet.

Les deux machines sont désormais sur le même réseau privé. Vous pouvez pinguer votre VPS en utilisant son IP Tailscale, et cela passera par le tunnel chiffré.

### Étape 2 : Configurer OpenClaw pour utiliser Tailscale

Le modèle le plus sécurisé actuellement est : garder la passerelle sur la boucle locale et l'exposer à votre réseau tailnet avec Tailscale Serve.

Dans la configuration OpenClaw :

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

Ensuite, démarrez la passerelle avec Serve :

```bash
openclaw gateway --tailscale serve
```

La documentation OpenClaw indique que cette configuration maintient la passerelle sur `127.0.0.1` tandis que Tailscale gère le HTTPS et le routage du réseau tailnet. Vous y accédez via `https://<magicdns-name>/`, pas via l'IP publique de votre VPS.

Si vous préférez une liaison directe sur le réseau tailnet plutôt que d'utiliser Serve, activez l'authentification explicite de la passerelle :

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

Connectez-vous ensuite depuis un autre appareil du réseau tailnet :

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

Si vous utilisez Docker ou un autre runtime de conteneurs, faites attention supplémentaire à la publication des ports. Une publication comme `-p 18789:18789` lie généralement tous les interfaces hôte. Préférez la boucle locale avec Tailscale Serve, ou liez explicitement l'interface hôte à l'IP Tailscale après avoir vérifié que le conteneur reçoit toujours le trafic :

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

Après tout changement Docker, vérifiez depuis l'extérieur avec `nmap` et localement avec `ss`. Docker peut contourner ou réorganiser les règles de pare-feu hôte si vous ne prenez pas en compte ces comportements.

### Étape 3 : Verrouiller SSH

Même avec Tailscale, vous devriez sécuriser correctement SSH :

```bash
# Gardez votre session SSH actuelle ouverte pendant que vous faites cela.
# Tout d'abord, depuis votre machine cliente, vérifiez que vous pouvez vous connecter en SSH via Tailscale :
ssh your-user@SERVER_TAILSCALE_IP

# Placez les règles de renforcement dans un fichier supplémentaire plutôt que de modifier sshd_config directement.
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# Validez avant de recharger. Ne sautez pas cette étape.
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

Cela désactive l'authentification par mot de passe et l'accès en tant que root. L'étape suivante utilise UFW pour bloquer complètement l'SSH public tout en conservant l'accès SSH via `tailscale0`.

### Étape 4 : Règles du pare-feu

Ajoutez un pare-feu en couche supplémentaire :

```bash
# Utilisation de UFW (Ubuntu/Debian)
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

Le guide de renforcement Ubuntu de Tailscale utilise exactement la même approche : autoriser `tailscale0`, bloquer tout autre trafic entrant, puis vérifier que l'SSH public expire tandis que l'SSH vers l'adresse `100.x.y.z` fonctionne toujours. Si vous hébergez un site web public sur le même VPS, conservez uniquement les règles publiques strictement nécessaires, comme `80/tcp` et `443/tcp`.

## Vérification de votre exposition

### Vérifier les ports ouverts depuis l'extérieur

Depuis une machine qui N'EST PAS sur votre réseau Tailscale :

```bash
# Vérifier si des ports publics courants sont exposés
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# Sortie attendue pour une instance sécurisée :
# 22/tcp   filtered ssh
# 1878.9/tcp filtered unknown
```

Si le port `22` ou `18789` affiche `open` au lieu de `filtered` ou `closed`, vous avez un problème. Si les ports `80` ou `443` sont ouverts, assurez-vous qu'il s'agit uniquement de votre site web public intentionnel ou de l'endpoint Tailscale Funnel, et non pas par erreur du gateway OpenClaw.

### Vérifier ce qui écoute localement

Sur votre serveur OpenClaw :

```bash
# Afficher tous les ports en écoute et à quoi ils sont liés
sudo ss -tulpn | grep LISTEN

# Rechercher des lignes comme celle-ci (acceptable pour Serve) :
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# Ou celle-ci (acceptable pour une liaison directe sur le réseau Tailscale avec authentification) :
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# ET NON celle-ci (mauvais) :
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

Si vous voyez `0.0.0.0` ou `:::` (équivalent IPv6), ce service est exposé au monde entier.

### Audit de sécurité intégré

OpenClaw inclut une [commande d'audit de sécurité](https://docs.molt.bot/gateway/security) qui vérifie votre configuration selon les meilleures pratiques de sécurité :

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

L'audit vérifie l'exposition de la passerelle, le mode Tailscale, les paramètres d'authentification, l'accès aux canaux, les politiques d'outils, l'inventaire des plugins et les permissions des fichiers. Considérez `--fix` comme un outil utile, mais pas comme un substitut à la lecture des résultats.

---

## Ce que cela ne résout pas

Tailscale élimine la plus grande erreur : l'exposition publique de l'opérateur. Elle ne résout pas tout :

**Stockage des identifiants** : OpenClaw stocke les transcriptions de session, les jetons OAuth et les clés API sur le disque. Assurez-vous que ces fichiers ont les bonnes permissions (`chmod 600` pour les fichiers, `chmod 700` pour les répertoires de configuration privés) et qu'ils ne sont pas inclus dans le contrôle de version. L'audit intégré vérifie cela.

**Sandboxing des plugins** : Les plugins s'exécutent avec les permissions totales de votre utilisateur. N'installez des plugins que depuis des sources de confiance, et vérifiez les capacités qu'ils demandent. L'outil d'audit répertorie les plugins installés.

**Sécurité des appareils** : Si quelqu'un compromet votre compte Tailscale ou vole un appareil sur votre réseau tailnet, il pourra accéder à votre instance OpenClaw. Activez l'[autorisation des appareils Tailscale](https://tailscale.com/kb/1099/device-authorization/) pour exiger une approbation pour les nouveaux appareils.

---

## Liste de vérification du déploiement

Avant de considérer votre instance OpenClaw/Moltbot comme prête pour la production :

- [ ] Tailscale installé et authentifié sur le serveur et le client  
- [ ] Passerelle maintenue sur l'interface de boucle avec Tailscale Serve, ou liée à `tailnet` avec une authentification explicite  
- [ ] SSH configuré pour désactiver l'authentification par mot de passe et la connexion en tant que root  
- [ ] Pare-feu (UFW ou iptables/nftables) configuré pour autoriser `tailscale0` et refuser l'accès public non nécessaire  
- [ ] Balayage externe avec nmap montre tous les ports `filtrés` ou `fermés`  
- [ ] Commande interne `ss -tulpn` montre que la passerelle est liée à `127.0.0.1`, `::1`, ou uniquement à l'IP Tailscale  
- [ ] Fichiers de credentials avec permissions 600 et répertoires de configuration privés avec permissions 700  
- [ ] Exécuter `openclaw security audit --deep` et traiter toutes les découvertes  
- [ ] Si vous utilisez la gestion Tailscale d'OpenClaw, les approbations d'exécution sont activées  
- [ ] Sauvegardes régulières configurées (données OpenClaw + configurations)  

---

## Ressources  

- [Guide de sécurité OpenClaw](https://docs.molt.bot/gateway/security)  
- [Intégration Tailscale d'OpenClaw](https://docs.molt.bot/gateway/tailscale)  
- [Référence CLI Tailscale Serve](https://tailscale.com/docs/reference/tailscale-cli/serve)  
- [Tunnel Tailscale](https://tailscale.com/docs/features/tailscale-funnel)  
- [Utiliser UFW pour sécuriser un serveur Ubuntu](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)  
- [Audit de sécurité : 512 découvertes (Problème GitHub)](https://github.com/moltbot/moltbot/issues/1796)  
- [Guide de balayage réseau Nmap](https://nmap.org/book/man.html)
````
