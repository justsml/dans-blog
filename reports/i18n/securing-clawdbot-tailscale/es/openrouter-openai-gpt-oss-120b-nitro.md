# Translation Candidate
- Slug: securing-clawdbot-tailscale
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2026-01-26--securing-clawdbot-tailscale/es/index.mdx
- Validation: passed
- Runtime seconds: 19.47
- Input tokens: 12552
- Output tokens: 3865
- Thinking tokens: unknown
- Cached input tokens: 1664
- Cache write tokens: 0
- Estimated cost: $0.001185
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
title: Tu asistente de IA me dio acceso a la shell
subTitle: Cómo asegurar tu instalación local o VPS de OpenClaw/Moltbot
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
OpenClaw (anteriormente Clawdbot/Moltbot) te brinda un asistente de IA personal que funciona en WhatsApp, Slack, Discord, iMessage y otros canales. Pero si expones su gateway, los controles de nodo o SSH en internet público sin una autenticación robusta, estás proporcionando a extraños una vía directa hacia acceso de shell en tu máquina.

Esta guía muestra la configuración predeterminada más segura: mantener el gateway de OpenClaw en la interfaz de loopback, exponerlo solo a tu tailnet mediante Tailscale Serve, endurecer SSH y comprobar desde el exterior que el gateway no es público.

La rápida adopción del proyecto reveló problemas de seguridad reales: [escaneos de Shodan encontraron 2 847 instancias expuestas](https://socradar.io/blog/clawdbot-is-it-safe/) en las primeras semanas, y un [incidente de auditoría de seguridad en GitHub reportó 512 hallazgos](https://github.com/moltbot/moltbot/issues/1796) en el código. Parte de eso proviene de la salida de escáneres automatizados y parte ha cambiado desde el cambio de nombre a OpenClaw en enero de 2026, por lo que debes considerar el número como una señal de alerta y no como un recuento preciso de vulnerabilidades actuales. No necesitas ser un experto en seguridad; solo debes evitar publicar superficies operativas antes de desplegar.

---

## Lo Que Realmente Estás Exponiendo

Según cómo lo instalaste y lo expusiste, hay tres superficies que vale la pena revisar:

- **Puerto 22**: acceso SSH en una VPS  
- **Puerto 18789**: UI de control del gateway y API WebSocket  
- **Control del navegador/nodo**: ejecución remota de nodos y automatización del navegador mediante el modelo de emparejamiento gateway/nodo  

La documentación actual de [acceso remoto de OpenClaw](https://docs.molt.bot/gateway/remote) indica que el WebSocket del gateway se enlaza a *loopback* por defecto y recomienda mantenerlo solo en *loopback* a menos que elijas intencionalmente una LAN, un tailnet o un enlace personalizado. Eso está bien. El riesgo aparece cuando sobrescribes ese valor predeterminado, publicas puertos de Docker, añades un proxy inverso, activas Funnel o dejas el SSH abierto al mundo.

El gateway es el punto crítico. Es la superficie operativa de tu asistente, incluidos los caminos de invocación de herramientas. Si es accesible desde Internet y la autenticación falta, es débil, se elude o se filtra, un atacante podría conducir al agente o invocar herramientas con los permisos de tu usuario.

El control del navegador es casi tan sensible. La documentación actual de OpenClaw recomienda ejecutar el control del navegador a través de un nodo emparejado en la máquina del navegador y tratar el emparejamiento de nodos como acceso operativo. Si un gateway puede ejecutar `system.run` en un nodo emparejado, eso equivale a ejecución de código remoto en ese nodo, sujeto a la política de nodos del gateway y a las aprobaciones de ejecución propias del nodo.

SSH es SSH. Si tienes la autenticación por contraseña habilitada, los intentos de fuerza bruta son inevitables en una VPS pública.

## La solución de Tailscale

Para OpenClaw, Tailscale te brinda acceso remoto sin publicar los servicios operativos:

1. Tu instancia de OpenClaw se ejecuta en una VPS o máquina local  
2. El gateway permanece ligado al loopback y se alcanza a través de Tailscale Serve, o se enlaza directamente a la IP del tailnet con autenticación explícita  
3. Instalas Tailscale tanto en el servidor como en tus dispositivos personales  
4. Accedes a OpenClaw mediante su IP de Tailscale o su nombre MagicDNS  
5. Todos los demás en Internet no ven nada, a menos que actives intencionalmente Funnel u otro proxy público  

### ¿Debería dejar que OpenClaw administre Tailscale?

OpenClaw incluye una [integración nativa de Tailscale](https://docs.molt.bot/gateway/tailscale) que puede configurar `tailscale serve` o `tailscale funnel` para el gateway.

**Modo Serve** mantiene todo dentro de tu tailnet. El gateway sigue ligado a `127.0.0.1` mientras Tailscale se encarga del enrutamiento y HTTPS. Cuando `gateway.auth.allowTailscale` está habilitado, OpenClaw puede autenticar el tráfico de la UI/Control WebSocket usando encabezados de identidad de Tailscale y verificar el origen con `tailscale whois`. Este es el modo adecuado para la mayoría de despliegues personales.

**Modo Funnel** expone el gateway públicamente mediante la función de punto final público de Tailscale. La propia documentación de Tailscale describe Funnel como el enrutamiento de tráfico desde Internet hacia un servicio local. OpenClaw se niega a iniciar Funnel a menos que el modo de autenticación del gateway sea `password`, pero de todos modos estás eligiendo una exposición pública para una superficie operativa.

La [documentación de seguridad de OpenClaw](https://docs.molt.bot/gateway/security) deja claro que la inyección de prompts y el acceso a herramientas son riesgos principales para un asistente personal. No permitas que el agente encuentre una vía para hacerse público silenciosamente. Usa Serve de forma deliberada, evita Funnel a menos que realmente necesites acceso público y exige aprobación de ejecución para cualquier comando `tailscale`.

---

## Configuración segura de OpenClaw

### Paso 1: Instalar Tailscale

En tu VPS o servidor local:

```bash
# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Authenticate (opens a browser to log in)
sudo tailscale up

# Get your Tailscale IP
tailscale ip -4
# Output: 100.x.x.x
```

En la máquina cliente, instala Tailscale desde la página oficial de descargas y autentícate en la misma tailnet.

Ahora ambas máquinas están en la misma red privada. Puedes hacer ping a tu VPS usando su IP de Tailscale, y el tráfico se enruta a través del túnel cifrado.

### Paso 2: Configurar OpenClaw para usar Tailscale

El patrón más seguro actualmente es: mantener el gateway en la interfaz de loopback y exponerlo a tu tailnet con Tailscale Serve.

En la configuración de OpenClaw:

```js
{
  gateway: {
    bind: "loopback",
    tailscale: { mode: "serve" },
  },
}
```

Luego inicia el gateway con Serve:

```bash
openclaw gateway --tailscale serve
```

La documentación de OpenClaw indica que esto mantiene el gateway en `127.0.0.1` mientras Tailscale provee HTTPS y el enrutamiento por el tailnet. Lo expones en `https://<magicdns-name>/`, no en la IP pública de tu VPS.

Si prefieres enlazar directamente al tailnet en lugar de usar Serve, utiliza autenticación explícita del gateway:

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

Luego conéctate desde otro dispositivo del tailnet:

```text
http://<tailscale-ip>:18789/
ws://<tailscale-ip>:18789
```

Si ejecutas OpenClaw en Docker u otro runtime de contenedores, ten especial cuidado con la publicación de puertos. Un `-p 18789:18789` normalmente enlaza en todas las interfaces del host. Prefiere usar loopback más Tailscale Serve, o enlaza el lado del host explícitamente a la IP de Tailscale después de confirmar que el contenedor sigue recibiendo tráfico:

```bash
TAILSCALE_IP=$(tailscale ip -4)
docker run ... -p "$TAILSCALE_IP:18789:18789" ...
```

Tras cualquier cambio en Docker, verifica desde el exterior con `nmap` y localmente con `ss`. Docker puede eludir o reordenar las suposiciones del firewall del host si no lo consideras.

### Paso 3: Asegurar SSH

Incluso con Tailscale, debes asegurar SSH correctamente:

```bash
# Mantén tu sesión SSH actual abierta mientras haces esto.
# Primero, desde tu máquina cliente, confirma que puedes SSH a través de Tailscale:
ssh tu-usuario@IP_TAILSCALE_DEL_SERVIDOR

# Aplica el endurecimiento en un archivo drop‑in en lugar de reescribir sshd_config.
sudo tee /etc/ssh/sshd_config.d/99-openclaw-hardening.conf >/dev/null <<'EOF'
PasswordAuthentication no
PermitRootLogin no
KbdInteractiveAuthentication no
EOF

# Valida antes de recargar. No lo omitas.
sudo sshd -t
sudo systemctl reload ssh || sudo systemctl reload sshd
```

Esto desactiva el inicio de sesión con contraseña y el acceso como root. El siguiente paso usa UFW para bloquear completamente SSH público mientras sigue permitiendo SSH sobre `tailscale0`.

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

La guía de endurecimiento propia de Tailscale para Ubuntu utiliza esta misma forma: permitir `tailscale0`, denegar el resto del tráfico entrante y luego verificar que el SSH público agote el tiempo de espera mientras el SSH a la dirección `100.x.y.z` sigue funcionando. Si ejecutas un sitio web público en el mismo VPS, conserva solo las reglas públicas que realmente necesites, como `80/tcp` y `443/tcp`.

## Verificando su exposición

### Comprobar puertos abiertos desde el exterior

Desde una máquina que **no** forme parte de su red Tailscale:

```bash
# Check if common public ports are exposed
nmap -p 22,80,443,18789 YOUR_PUBLIC_IP

# Expected output for a secured instance:
# 22/tcp   filtered ssh
# 18789/tcp filtered unknown
```

Si el puerto `22` o `18789` aparecen como `open` en lugar de `filtered` o `closed`, hay un problema. Si el `80` o `443` está abierto, asegúrese de que solo corresponde a su sitio web público intencional o al punto final de Tailscale Funnel, y no al gateway de OpenClaw por accidente.

### Verificar qué está escuchando localmente

En su servidor OpenClaw:

```bash
# Mostrar todos los puertos en escucha y a qué están vinculados
sudo ss -tulpn | grep LISTEN

# Buscar líneas como estas (bueno para Serve):
# tcp   LISTEN 0   128   127.0.0.1:18789   *:*
#
# O así (aceptable para enlace directo al tailnet con autenticación):
# tcp   LISTEN 0   128   100.x.y.z:18789   *:*
#
# NO como esto (malo):
# tcp   LISTEN 0   128   0.0.0.0:18789     *:*
```

Si ve `0.0.0.0` o `:::` (equivalente IPv6), ese servicio está expuesto al mundo.

### Auditoría de Seguridad Incorporada

OpenClaw incluye un [comando de auditoría de seguridad](https://docs.molt.bot/gateway/security) que verifica su configuración contra las mejores prácticas de seguridad:

```bash
openclaw security audit --deep
openclaw security audit --deep --fix
```

La auditoría revisa la exposición del gateway, el modo de Tailscale, la configuración de autenticación, el acceso a canales, la política de herramientas, el inventario de plugins y los permisos de archivos. Considere `--fix` como un asistente útil, no como un sustituto de la revisión de los hallazgos.

---

## Lo Que Esto No Resuelve


Tailscale elimina el error más grave: la exposición pública del operador. No lo soluciona todo:

**Almacenamiento de credenciales**: OpenClaw guarda transcripciones de sesiones, tokens OAuth y claves API en disco. Asegúrese de que tengan los permisos de archivo correctos (`chmod 600` para archivos, `chmod 700` para directorios de configuración privados) y que no estén bajo control de versiones. La auditoría incorporada verifica esto.

**Aislamiento de plugins**: Los plugins se ejecutan con todos los permisos de su usuario. Instale solo plugins de fuentes en las que confíe y revise qué capacidades solicitan. La herramienta de auditoría inventaria los plugins instalados.

**Seguridad de dispositivos**: Si alguien compromete su cuenta de Tailscale o roba un dispositivo en su tailnet, podrá acceder a su instancia de OpenClaw. Active la [autorización de dispositivos de Tailscale](https://tailscale.com/kb/1099/device-authorization/) para requerir aprobación de nuevos dispositivos.

---

## Lista de Verificación para el Despliegue

Antes de considerar que su instancia de OpenClaw/Moltbot está lista para producción:

- [ ] Tailscale instalado y autenticado tanto en el servidor como en el cliente
- [ ] Puerta de enlace mantenida en loopback con Tailscale Serve, o vinculada al `tailnet` con autenticación explícita
- [ ] SSH configurado para desactivar la autenticación por contraseña y el acceso root
- [ ] Firewall (UFW o iptables/nftables) configurado para permitir `tailscale0` y denegar el ingreso público innecesario
- [ ] Escaneo externo con nmap muestra todos los puertos como `filtered` o `closed`
- [ ] `ss -tulpn` interno muestra la puerta de enlace vinculada a `127.0.0.1`, `::1` o solo a la IP de Tailscale
- [ ] Los archivos de credenciales tienen permisos 600 y los directorios de configuración privados tienen permisos 700
- [ ] Ejecutar `openclaw security audit --deep` y corregir todos los hallazgos
- [ ] Si usa la gestión de Tailscale de OpenClaw, las aprobaciones de ejecución están habilitadas
- [ ] Copias de seguridad regulares configuradas (datos de OpenClaw + configuraciones)

---

## Recursos

- [Guía de Seguridad de OpenClaw](https://docs.molt.bot/gateway/security)
- [Integración de OpenClaw con Tailscale](https://docs.molt.bot/gateway/tailscale)
- [Referencia de CLI de Tailscale Serve](https://tailscale.com/docs/reference/tailscale-cli/serve)
- [Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)
- [Usar UFW para asegurar un servidor Ubuntu](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [Auditoría de Seguridad: 512 hallazgos (Issue de GitHub)](https://github.com/moltbot/moltbot/issues/1796)
- [Guía de Escaneo de Red con Nmap](https://nmap.org/book/man.html)
````
