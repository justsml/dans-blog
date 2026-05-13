# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: es
- Model: deepseek/deepseek-v4-flash
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/es/index.mdx
- Validation: deferred
- Runtime seconds: 137.25
- Input tokens: 9296
- Output tokens: 10112
- Thinking tokens: unknown
- Cached input tokens: 768
- Cache write tokens: 0
- Estimated cost: $0.004027
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: true
draft: true
hidden: true
title: 'Seguridad en Docker: La guía perdida para desarrolladores'
subTitle: Aprende a proteger tu red de amenazas y configuraciones peligrosas.
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

## Trabajo en progreso

**Tabla de contenidos**

1. [⚠️ Redes locales en riesgo](#-local-networks-at-risk)
2. [🛡️ Configuración del cortafuegos](#-firewall-configuration)
3. [🔐 Gestión de secretos para desarrollo local](#-secrets-management-for-local-development)
4. [🕵️‍ Fugas de credenciales y ataques de canal lateral](#-credential-leaks-and-side-channel-attacks)
5. [🔍 Monitoreo y tokens canarios](#-monitoring--canary-tokens)
6. [❌ Conceptos erróneos comunes](#-common-misconceptions)

<p class="inset"></p>

## ⚠️ Redes locales en riesgo

Seamos honestos, todos lo hemos hecho. Te has conectado a un Wi-Fi aleatorio de una cafetería o has dejado que alguien use tu red doméstica sin pensarlo dos veces. Quizás incluso confías en que tu refrigerador inteligente no comprometa tu red. ¿La realidad? Estas decisiones casuales pueden exponer tu configuración de desarrollo local a riesgos innecesarios. Los atacantes no solo apuntan a sistemas de producción; los entornos locales suelen ser objetivos más blandos, ofreciendo una vía para acceder a proyectos sensibles.

### Escenarios de ataque

1. **Tráfico interceptado:** El tráfico no cifrado puede capturarse y leerse fácilmente.
2. **Servicios desprotegidos:** Bases de datos o APIs locales expuestas en `0.0.0.0`.
3. **Suplantación de red:** Redirige el tráfico al dispositivo de un atacante.

### Soluciones rápidas

- Prefiere redes privadas de Docker en lugar de cortafuegos para limitar la exposición de la red.
- Evita el Wi-Fi público o compartido; prefiere usar el punto de acceso de tu teléfono.
- Monitorea tu red local en busca de dispositivos desconocidos usando herramientas como `arp-scan` y `nmap`.

## 🛡️ Configuración del cortafuegos

### UFW con Docker (Ubuntu)

> ⚠️ **Advertencia:** Por defecto, Docker en Ubuntu/Debian omitirá las reglas de UFW/iptables, exponiendo potencialmente tu sistema a ataques.
> No importa si enlazas los puertos a direcciones IP locales (p. ej. `-p 127.0.0.1:8080:80`.)

¡Esto me sorprende cada vez que lo aprendo! [Docker omite las reglas de UFW por defecto](https://github.com/moby/moby/issues/4737), permitiendo que los contenedores se comuniquen con el host y otros contenedores sin restricciones.

### Mejores prácticas

1. 🥇 **Usa redes de Docker** para aislar y controlar qué puede conectarse a cada contenedor o red.

###
2. 🥉 **Actualiza iptables** si debes usar una red `host`, o no puedes usar redes personalizadas, puedes mitigar el riesgo configurando iptables. No apto para los débiles de corazón, [consulta la utilidad a continuación.](#uf)

#### Aislamiento de red de Docker

```bash
# Create a new Docker network
docker network create my-network

# Run your container with the new network
docker run --network my-network my-container
```

#### Configuración de UFW (para redes `host`)

Hay muchos consejos malos sobre cómo solucionar esto. Configura UFW para que funcione con Docker de la manera que cabría esperar.

He usado `ufw-docker` para configurar un sistema autoalojado y parece funcionar bien.

```bash title="install-ufw-docker.sh"
# Install binary as root (needs root permissions anyway)
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# Install and modify the `after.rules` file of `ufw`
ufw-docker install

ufw-docker help
```

```

Este comando realiza lo siguiente:

- Realiza una copia de seguridad del archivo `/etc/ufw/after.rules`.
- Agrega reglas relacionadas con Docker al final del archivo para integrarse correctamente con UFW.

**Fuente:** [ufw-docker GitHub](https://github.com/chaifeng/ufw-docker/tree/master#install)

**Ejemplo de uso:**

```bash

# Allow Docker container on port 8080
ufw-docker allow <container_name> 8080/tcp

# Manage rules safely alongside your UFW configuration
ufw-docker status

```

**Nota:** La mayoría de las "soluciones" para conflictos entre Docker y UFW implican reglas manuales de iptables, que pueden ser propensas a errores y frágiles durante las actualizaciones.

### Firewall de macOS

1. Ve a **Preferencias del Sistema > Seguridad y Privacidad > Firewall**.
2. Activa el firewall y haz clic en "Opciones de Firewall".
3. Bloquea todas las conexiones entrantes excepto los servicios esenciales.

**Nota:** Es posible que necesites revisar la configuración de tu firewall para permitir ciertos dispositivos inteligentes que uses, por ejemplo, Google Cast/AirPlay y otros servicios.

### Comandos para usuarios avanzados (macOS y Linux)

#### macOS:

```bash

sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on  # Block all
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/app  # Allow specific app

```

#### Linux (ufw):

```bash

ufw default deny incoming  # Block all incoming
ufw allow ssh  # Allow SSH
# allow 443 and 80 for web traffic
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # Enable firewall

```

**Consejo profesional:** Usa herramientas como [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) en macOS y [ufw](https://help.ubuntu.com/community/UFW) en Linux para configuraciones más amigables.

## 🔐 Gestión de Secretos para Desarrollo Local

### Validación Proactiva de Placeholders

<p>💡 Asegúrate de que los secretos estén configurados correctamente con valores reales antes de ejecutar tu aplicación.</p>

Si usas placeholders como `__WARNING_REPLACE_ME__` en tus secretos, genial, tal vez alguien se dé cuenta. Por si acaso, también puedes añadir una pequeña validación para brindar seguridad en tiempo de ejecución.

¡No te imaginas lo fácil que es hackear por completo (modificar y volver a firmar) un token JWT cuando los atacantes pueden adivinar el secreto!

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

### Generación y almacenamiento de secretos

<p class="inset">Nunca codifiques secretos directamente en tu código. Prefiere variables de entorno y bóvedas seguras.</p>

En lugar de `.env.example`, usa `.env.generate.sh` para que los usuarios puedan obtener un archivo `.env` con valores "por defecto" seguros.

#### Ejemplo de `.env.generate.sh`

```bash title=".env.generate.sh" frame="code"
#!/bin/bash
# Genera un archivo .env seguro para desarrollo local

generate_secret() {
    local length=${1:-30}
    # añade 4 bytes para compensar el padding
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}
# Sale si el archivo .env ya existe
[ -f .env ] && { echo "¡El archivo .env ya existe!"; exit 1; }

cat <<EOL > .env
# Configuración y secretos de base de datos
DB_USER=app_user
DB_PASSWORD=$(generate_secret 30)
REDIS_PASSWORD=$(generate_secret 20)
# Secretos de sesión
SESSION_KEY=$(generate_secret 32)
JWT_SECRET=$(generate_secret 64)
EOL

echo "¡Nuevo archivo .env generado!"
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

## 🕵️‍ Monitoreo y doble verificación

### Ejemplos con `nmap`

#### Pruebas dentro de tu red

```bash

# Escanea tu localhost en busca de todos los puertos abiertos
nmap -sT localhost

# Escanea la IP privada de tu máquina en busca de servicios
nmap -sV 192.168.1.10

# Detecta dispositivos en tu red
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
```

```

#### Pruebas fuera de tu red

Puedes consultar tu IP actual (pública) fácilmente con servicios como `ifconfig.me`: `curl https://ifconfig.me`.

Usa una red externa o un servidor remoto para probar tus IPs públicas:

```bash

print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# Change target_host to your public ip or hostname
# Check host using advanced techniques
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host

```

**¿Por qué probar ambas?**
Las pruebas desde dentro revelan la exposición interna, mientras que las pruebas externas identifican servicios accesibles para atacantes.

## 🛡️ Conceptos erróneos comunes
```

1. **Mi entorno local no es un objetivo.**
   - Hecho: Los atacantes pueden pivotar desde tu máquina hacia tus sistemas de producción.
2. **Los firewalls lo bloquean todo.**
   - Hecho: Solo bloquean lo que configuras para que bloqueen.
3. **Las IPs privadas son seguras.**
   - Hecho: Exploits como las evasiones de NAT aún pueden afectar tu red.
````
