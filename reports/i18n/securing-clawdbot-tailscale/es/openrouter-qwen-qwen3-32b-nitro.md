# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/es/index.mdx
- Validation: passed
- Runtime seconds: 25.42
- Input tokens: 10694
- Output tokens: 10989
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003493
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Tu asistente de IA me dio acceso a la shell
subTitle: Cómo segurizar tu configuración local o VPS de OpenClaw/Moltbot
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
OpenClaw (anteriormente Clawdbot/Moltbot) te proporciona un asistente de IA personal que funciona en WhatsApp, Slack, Discord, iMessage y otros canales. Pero si colocas su puerta de enlace, controles de nodo o SSH en internet público sin autenticación fuerte, estás permitiendo a desconocidos un acceso a la shell de tu máquina.  

Esta guía muestra la configuración más segura por defecto: mantén la puerta de enlace de OpenClaw en loopback, expónla solo a tu red tailnet mediante Tailscale Serve, restringe SSH y verifica desde el exterior que la puerta de enlace no esté pública.  

La rápida adopción del proyecto reveló preocupaciones reales de seguridad: [Escaneos de Shodan encontraron 2.847 instancias expuestas](https://socradar.io/blog/clawdbot-is-it-safe/) en las primeras semanas, y [un informe de auditoría de seguridad de GitHub reportó 512 hallazgos](https://github.com/moltbot/moltbot/issues/1796) en el código. Algunos de esos resultados son salidas de escáneres automatizados y otros han cambiado desde el renombrado a OpenClaw en enero de 2026, así que trata el número como una señal de alerta más que como un recuento preciso de vulnerabilidades actuales. No necesitas ser un experto en seguridad: solo debes evitar publicar superficies operativas antes de desplegar.  

## Qué Superficies Estás Exponiendo  

Dependiendo de cómo lo hayas instalado y expuesto, hay tres superficies que vale la pena revisar:

- **Puerto 22**: Acceso SSH en un VPS  
- **Puerto 18789**: Interfaz de control de la pasarela y API de WebSocket  
- **Control de navegador/nodo**: ejecución remota de nodos y automatización del navegador mediante el modelo de emparejamiento de pasarela/nodo  

Las [documentación de acceso remoto de OpenClaw](https://docs.molt.bot/gateway/remote) indica que el WebSocket de la pasarela se vincula a loopback por defecto y recomienda mantenerlo solo en loopback a menos que elijas explícitamente un vinculo LAN/tailnet/personalizado. Eso es bueno. El riesgo surge cuando modificas ese valor predeterminado, publicas los puertos de Docker, agregas un proxy inverso, activas Funnel o dejas el SSH abierto al mundo.  

La pasarela es la más crítica. Es la superficie operativa principal para tu asistente, incluyendo las rutas de invocación de herramientas. Si está accesible desde internet y la autenticación falta, es débil, se ha bypassado o se ha filtrado, un atacante podría controlar al agente o invocar herramientas con los permisos del usuario.  

El control del navegador es casi tan sensible. Las documentación actual de OpenClaw recomienda ejecutar el control del navegador a través de un host de nodo emparejado en la máquina del navegador y tratar el emparejamiento de nodos como acceso operativo. Si una pasarela puede invocar `system.run` en un nodo emparejado, eso es ejecución de código remoto en ese nodo, sujeto a la política de nodo de la pasarela y a las aprobaciones de ejecución propias del nodo.  

El SSH es SSH. Si estás ejecutando con autenticación por contraseña habilitada, los intentos de fuerza bruta son inevitables en un VPS público.

## La solución de Tailscale

Para OpenClaw, Tailscale ofrece acceso remoto sin publicar servicios de operador:

1. Tu instancia de OpenClaw se ejecuta en un VPS o en una máquina local  
2. La pasarela permanece vinculada a loopback y se accede a través de Tailscale Serve, o bien se vincula directamente a la IP de tailnet con autenticación explícita  
3. Instalas Tailscale tanto en el servidor como en tus dispositivos personales  
4. Accedes a OpenClaw a través de su IP de Tailscale o nombre de MagicDNS  
5. El resto del internet no ve nada, a menos que habilites intencionalmente Funnel u otro proxy público  

### ¿Deberías dejar que OpenClaw administre Tailscale?

OpenClaw tiene una [integración integrada de Tailscale](https://docs.molt.bot/gateway/tailscale) que puede configurar `tailscale serve` o `tailscale funnel` para la pasarela.

**El modo Serve** mantiene todo dentro de tu tailnet. La pasarela permanece vinculada a `127.0.0.1` mientras Tailscale maneja la enrutación y HTTPS. Cuando `gateway.auth.allowTailscale` está habilitado, OpenClaw puede autenticar el tráfico de Control UI/WebSocket usando encabezados de identidad de Tailscale y verificar el origen con `tailscale whois`. Este es el modo correcto para la mayoría de las implementaciones personales.

**Modo Funnel** expone la pasarela públicamente mediante la función de punto final público de Tailscale. Las propias documentaciones de Tailscale describen Funnel como el enrutamiento del tráfico desde internet hacia un servicio local. OpenClaw se niega a iniciar Funnel a menos que el modo de autenticación de la pasarela sea `password`, pero aún así estás eligiendo exponer públicamente una superficie operativa.  

La [documentación de seguridad](https://docs.molt.bot/gateway/security) de OpenClaw es clara al señalar que la inyección de prompts y el acceso a herramientas son riesgos fundamentales para un asistente personal. No proporciones al agente un camino para hacerse públicamente accesible sin notificación. Usa Serve de manera deliberada, evita Funnel a menos que necesites acceso público de verdad, y requiere aprobación de ejecución para cualquier comando `tailscale`.  

---

## Configuración segura de OpenClaw  

### Paso 1: Instalar Tailscale  

En tu VPS o servidor local:

```bash
# Instalar Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Autenticar (abre un navegador para iniciar sesión)
sudo tailscale up

# Obtener tu IP de Tailscale
tailscale ip -4
# Salida: 100.x.x.x
```

En tu máquina cliente, instala Tailscale desde la página de descarga oficial e inicia sesión en el mismo tailnet.

Ahora ambas máquinas están en la misma red privada. Puedes hacer ping a tu VPS usando su IP de Tailscale, y se enrutarán a través del túnel cifrado.

### Paso 2: Configurar OpenClaw para usar Tailscale

El patrón más seguro actualmente es: mantener la puerta de enlace en loopback y exponerla a tu tailnet con Tailscale Serve.

En la configuración de OpenClaw:

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

Luego inicia la puerta de enlace con Serve:

```bash
openclaw gateway --tailscale serve
```

La documentación de OpenClaw indica que esto mantiene la puerta de enlace en `127.0.0.1` mientras Tailscale proporciona HTTPS y enrutamiento a través de la red tailnet. Debes acceder a ella en `https://<magicdns-name>/`, no en la dirección IP pública de tu VPS.

Si prefieres un enlace directo a la red tailnet en lugar de usar Serve, utiliza autenticación explícita en la puerta de enlace:

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

Luego conecta desde otro dispositivo en la red tailnet:

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

Si estás ejecutando OpenClaw en Docker u otro entorno de contenedores, ten especial cuidado con la publicación de puertos. Una publicación como `-p 18789:18789` normalmente enlaza en todas las interfaces del host. Prefiere loopback más Tailscale Serve, o enlaza el lado del host explícitamente a la dirección IP de Tailscale después de confirmar que el contenedor sigue recibiendo tráfico:

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

Después de cualquier cambio en Docker, verifica desde afuera con `nmap` y localmente con `ss`. Docker puede ignorar o reordenar las suposiciones del firewall del host si no lo configuras correctamente.

### Paso 3: Bloquear SSH

Aunque uses Tailscale, debes asegurar correctamente SSH:

```bash
# Mantén tu sesión actual de SSH abierta mientras haces esto.
# Primero, desde tu máquina cliente, confirma que puedes acceder por SSH a través de Tailscale:
ssh your-user@SERVER_TAILSCALE_IP

# Coloca el refuerzo en un archivo de configuración adicional en lugar de reescribir sshd_config.
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# Valida antes de recargar. No lo saltes.
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

Esto deshabilita el inicio de sesión basado en contraseñas y el inicio de sesión como root. El siguiente paso usa UFW para bloquear completamente el SSH público, permitiendo aún el acceso SSH a través de `tailscale0`.

### Paso 4: Reglas de firewall

Configura un firewall como segunda capa:

```bash
# Usando UFW (Ubuntu/Debian)
sudo ufw allow in on tailscale0
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw enable
sudo ufw delete allow 22/tcp || true
sudo ufw reload
sudo ufw status verbose
```

La propia guía de refuerzo de Ubuntu de Tailscale utiliza esta misma estructura: permite `tailscale0`, deniega el tráfico de entrada restante, y luego verifica que el SSH público se agota mientras el acceso al dirección `100.x.y.z` sigue funcionando. Si ejecutas un sitio web público en el mismo VPS, mantén solo las reglas públicas que realmente necesites, como `80/tcp` y `443/tcp`.

## Verificación de tu exposición

### Verificar puertos abiertos desde el exterior

Desde una máquina que **NO** esté en tu red Tailscale:

```bash
# Verificar si puertos comunes públicos están expuestos
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# Salida esperada para una instancia segura:
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

Si `22` o `18789` muestran `open` en lugar de `filtered` o `closed`, tienes un problema. Si `80` o `443` están abiertos, asegúrate de que solo sea tu sitio web público intencional o endpoint de Tailscale Funnel, no accidentalmente el gateway de OpenClaw.

### Verificar qué está escuchando localmente

En tu servidor OpenClaw:

```bash
# Mostrar todos los puertos en escucha y a qué están vinculados
sudo ss -tulpn | grep LISTEN

# Buscar líneas como esta (buena para Serve):
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# O esta (aceptable para enlace directo en tailnet con autenticación):
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# NO como esta (malo):
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

Si ves `0.0.0.0` o `:::` (equivalente en IPv6), ese servicio está expuesto al mundo.

### Auditoría de seguridad integrada

OpenClaw incluye un [comando de auditoría de seguridad](https://docs.molt.bot/gateway/security) que verifica tu configuración contra mejores prácticas de seguridad:

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

La auditoría verifica la exposición del gateway, el modo Tailscale, configuraciones de autenticación, acceso a canales, políticas de herramientas, inventario de plugins e permisos de archivos. Trata `--fix` como una ayuda útil, no como sustituto de leer los hallazgos.

---

## Lo que esto no resuelve
---

Tailscale elimina el error más grave: la exposición pública del operador. No resuelve todo:

**Almacenamiento de credenciales**: OpenClaw almacena transcripciones de sesiones, tokens de OAuth y claves API en disco. Asegúrese de que estos archivos tengan permisos adecuados (`chmod 600` para archivos, `chmod 700` para directorios de configuración privados) y no estén en control de versiones. El análisis integrado revisa esto.

**Aislamiento de plugins**: Los plugins se ejecutan con todos los permisos del usuario. Solo instale plugins de fuentes de confianza y revise qué capacidades solicitan. La herramienta de auditoría enumera los plugins instalados.

**Seguridad del dispositivo**: Si alguien compromete su cuenta de Tailscale o roba un dispositivo en su red, podrá acceder a su instancia de OpenClaw. Habilite la [autorización de dispositivos en Tailscale](https://tailscale.com/kb/1099/device-authorization/) para exigir aprobación de nuevos dispositivos.

---

## Lista de verificación de despliegue

Antes de considerar que su instancia de OpenClaw/Moltbot está lista para producción:

- [ ] Tailscale instalado y autenticado en ambos servidores y clientes  
- [ ] Gateway mantenido en loopback con Tailscale Serve, o vinculado a `tailnet` con autenticación explícita  
- [ ] SSH configurado para deshabilitar la autenticación por contraseña y el inicio de sesión como root  
- [ ] Firewall (UFW o iptables/nftables) configurado para permitir `tailscale0` y denegar el ingreso público no necesario  
- [ ] Escaneo externo con nmap muestra todos los puertos `filtrados` o `cerrados`  
- [ ] `ss -tulpn` interno muestra que el gateway está vinculado solo a `127.0.0.1`, `::1` o la dirección IP de Tailscale  
- [ ] Archivos de credenciales con permisos 600 y directorios de configuración privados con permisos 700  
- [ ] Ejecute `openclaw security audit --deep` y resuelva todos los hallazgos  
- [ ] Si usa gestión de Tailscale en OpenClaw, las aprobaciones de ejecución están habilitadas  
- [ ] Configuración de copias de seguridad periódicas (datos y configuraciones de OpenClaw)  

---

## Recursos  

- [Guía de seguridad de OpenClaw](https://docs.molt.bot/gateway/security)  
- [Integración de Tailscale en OpenClaw](https://docs.molt.bot/gateway/tailscale)  
- [Referencia de la CLI de Tailscale Serve](https://tailscale.com/docs/reference/tailscale-cli/serve)  
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)  
- [Usar UFW para restringir un servidor Ubuntu](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)  
- [Auditoría de seguridad: 512 hallazgos (Problema de GitHub)](https://github.com/moltbot/moltbot/issues/1796)  
- [Guía de escaneo de redes con Nmap](https://nmap.org/book/man.html)
````
