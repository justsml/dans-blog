# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: es
- Model: openrouter/openai/gpt-oss-120b:nitro
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 7.14
- Input tokens: 10021
- Output tokens: 2940
- Thinking tokens: unknown
- Cached input tokens: 5376
- Cache write tokens: 0
- Estimated cost: $0.000920
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-security-for-admins-and-maintainers --locale es
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

## En progreso

**Tabla de contenidos**

1. [⚠️ Redes locales en riesgo](#-local-networks-at-risk)
2. [🛡️ Configuración del firewall](#-firewall-configuration)
3. [🔐 Gestión de secretos para desarrollo local](#-secrets-management-for-local-development)
4. [🕵️‍ Fugas de credenciales y ataques de canal lateral](#-credential-leaks-and-side-channel-attacks)
5. [🔍 Monitoreo y tokens canario](#-monitoring--canary-tokens)
6. [❌ Conceptos erróneos comunes](#-common-misconceptions)

<p class="inset"></p>

## ⚠️ Redes locales en riesgo

Seamos honestos, todos lo hemos hecho. Te has conectado a la Wi‑Fi de una cafetería cualquiera o has dejado que alguien use tu red doméstica sin pensarlo dos veces. Tal vez incluso confías en que tu nevera inteligente no comprometerá tu red. ¿La realidad? Estas decisiones casuales pueden exponer tu entorno de desarrollo local a riesgos innecesarios. Los atacantes no solo apuntan a sistemas de producción; los entornos locales suelen ser objetivos más blandos, ofreciendo una vía para acceder a proyectos sensibles.

### Escenarios de ataque

1. **Tráfico interceptado:** El tráfico sin cifrar puede capturarse y leerse con facilidad.
2. **Servicios sin protección:** Bases de datos o API locales expuestas en `0.0.0.0`.
3. **Suplantación de red:** Redirige el tráfico al dispositivo del atacante.

### Soluciones rápidas

- Prefiere redes privadas de Docker en lugar de depender exclusivamente de firewalls para limitar la exposición de la red.
- Evita Wi‑Fi pública o compartida; prefiere usar el hotspot de tu teléfono.
- Monitorea tu red local en busca de dispositivos desconocidos con herramientas como `arp-scan` y `nmap`.

## 🛡️ Configuración del firewall

### UFW con Docker (Ubuntu)

> ⚠️ **Advertencia:** Por defecto Docker en Ubuntu/Debian elude las reglas de UFW/iptables, lo que puede dejar tu sistema expuesto a ataques.  
> No importa si enlazas puertos a direcciones IP locales (p. ej. `-p 127.0.0.1:8080:80`).

¡Esto me sorprende cada vez que lo descubro! Docker elude las reglas de UFW por defecto, permitiendo que los contenedores se comuniquen con el host y entre sí sin restricciones.

### Mejor práctica

1. 🥇 **Usa redes de Docker** para aislar y controlar qué puede conectarse a cada contenedor o red.

###
2. 🥉 **Actualiza iptables** si necesitas usar una red `host`, o no puedes usar redes personalizadas, puedes mitigar el riesgo configurando iptables. No es para los débiles de corazón, [consulta la utilidad a continuación.](#uf)

#### Aislamiento de Red Docker

```bash
# Crear una nueva red Docker
docker network create my-network

# Ejecutar tu contenedor con la nueva red
docker run --network my-network my-container
```

#### Configuración de UFW (para redes `host`)

Hay mucho consejo erróneo sobre cómo solucionar esto. Configura UFW para que funcione con Docker usando UFW tal como podrías esperar.

He usado `ufw-docker` para configurar un sistema auto‑alojado y parece funcionar bien.

```bash title="install-ufw-docker.sh"
# Instalar el binario como root (necesita permisos de root de todos modos)
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# Instalar y modificar el archivo `after.rules` de `ufw`
ufw-docker install

ufw-docker help
```

```

Este comando realiza lo siguiente:

- Hace una copia de seguridad del archivo `/etc/ufw/after.rules`.
- Añade reglas relacionadas con Docker al final del archivo para integrarse correctamente con UFW.

**Fuente:** [ufw-docker GitHub](https://github.com/chaifeng/ufw-docker/tree/master#install)

**Ejemplo de uso:**

```bash

# Permitir contenedor Docker en el puerto 8080
ufw-docker allow <container_name> 8080/tcp

# Gestionar reglas de forma segura junto a tu configuración de UFW
ufw-docker status

```

**Nota:** La mayoría de los "parches" para conflictos Docker‑UFW implican reglas manuales de iptables, lo que puede ser propenso a errores y frágil durante actualizaciones.

### Firewall de macOS

1. Ve a **Preferencias del Sistema > Seguridad y Privacidad > Firewall**.
2. Activa el firewall y haz clic en "Opciones de Firewall".
3. Bloquea todas las conexiones entrantes salvo los servicios esenciales.

**Nota:** Puede que necesites buscar la configuración de tu firewall para permitir ciertos dispositivos inteligentes que uses, por ejemplo Google Cast/AirPlay y otros servicios.

### Comandos para usuarios avanzados (macOS y Linux)

#### macOS:

```bash

sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setblockall on  # Bloquear todo
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /path/to/app  # Permitir aplicación específica

```

#### Linux (ufw):

```bash

ufw default deny incoming  # Bloquear todo lo entrante
ufw allow ssh  # Permitir SSH
# permitir 443 y 80 para tráfico web
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable  # Activar firewall

```

**Pro Tip:** Usa herramientas como [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) en macOS y [ufw](https://help.ubuntu.com/community/UFW) en Linux para configuraciones más amigables.

## 🔐 Gestión de secretos para desarrollo local

### Validación proactiva de marcadores de posición

<p>💡 Asegúrate de que los secretos estén configurados con valores reales antes de ejecutar tu aplicación.</p>

Si utilizas marcadores de posición como `__WARNING_REPLACE_ME__` en tus secretos, genial, tal vez alguien lo note. Por si acaso, también puedes añadir una pequeña validación para proporcionar seguridad en tiempo de ejecución.

No te creerías lo fácil que es hackear completamente (modificar y volver a firmar) un token JWT cuando los atacantes pueden adivinar el secreto!

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

### Generando y almacenando secretos

<p class="inset">Nunca codifique secretos directamente en su código. Prefiera variables de entorno y bóvedas seguras.</p>


En lugar de `.env.example`, use `.env.generate.sh` para facilitar a los usuarios la obtención de un archivo `.env` con “valores predeterminados” seguros.

#### Ejemplo `.env.generate.sh`

```bash title=".env.generate.sh" frame="code"
#!/bin/bash
# Generates a secure .env file for local development

generate_secret() {
    local length=${1:-30}
    # add 4 bytes to account for padding
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}
# Bail out if .env file already exists
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

echo "New .env file generated!"
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

## 🕵️‍ Monitoreo y verificación doble

### Ejemplos de `nmap`

#### Probando dentro de su red

```bash

# Scan your localhost for all open ports
nmap -sT localhost

# Scan your machine’s private IP for services
nmap -sV 192.168.1.10

# Detect devices on your network
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
```

```

#### Probando fuera de su red

Para consultar su IP pública actual puede usar servicios como `ifconfig.me`: `curl https://ifconfig.me`.

Utilice una red externa o un servidor remoto para probar sus IP públicas:

```bash

print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# Cambie target_host por su IP pública o nombre de host
# Verifique el host usando técnicas avanzadas
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host

```

**¿Por qué probar ambos?**  
Las pruebas desde el interior revelan exposiciones internas, mientras que las pruebas externas identifican los servicios accesibles para los atacantes.

## 🛡️ Conceptos erróneos comunes


1. **Mi entorno local no es un objetivo.**  
   - Hecho: Los atacantes pueden pivotar desde tu máquina a tus sistemas de producción.  
2. **Los firewalls bloquean todo.**  
   - Hecho: Sólo bloquean lo que tú configuras.  
3. **Las IP privadas son seguras.**  
   - Hecho: Las vulnerabilidades como los bypass de NAT aún pueden afectar tu red.
````
