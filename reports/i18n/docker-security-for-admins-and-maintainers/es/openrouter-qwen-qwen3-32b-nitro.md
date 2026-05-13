# Translation Candidate
- Slug: docker-security-for-admins-and-maintainers
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-01-04--docker-security-for-admins-and-maintainers/es/index.mdx
- Validation: passed
- Runtime seconds: 24.10
- Input tokens: 9414
- Output tokens: 10511
- Thinking tokens: unknown
- Cached input tokens: 2048
- Cache write tokens: 0
- Estimated cost: $0.003276
- Pricing source: local-openrouter-estimate
- Note: Generated through the direct AI SDK chunked translator.
## Raw Output

````mdx
---
unlisted: true
draft: true
hidden: true
title: 'Seguridad de Docker: La Guía Olvidada para Desarrolladores'
subTitle: Aprende a proteger tu red contra amenazas y configuración peligrosa.
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

**Índice**

1. [⚠️ Redes locales en riesgo](#-local-networks-at-risk)
2. [🛡️ Configuración de cortafuegos](#-firewall-configuration)
3. [🔐 Gestión de secretos para desarrollo local](#-secrets-management-for-local-development)
4. [🕵️‍ Fugas de credenciales y ataques de canal lateral](#-credential-leaks-and-side-channel-attacks)
5. [🔍 Monitoreo y tokens canario](#-monitoring--canary-tokens)
6. [❌ Conceptos erróneos comunes](#-common-misconceptions)

<p class="inset"></p>

## ⚠️ Redes locales en riesgo

Vamos a ser honestos, a todos nos ha pasado. Te has conectado a una red Wi-Fi de una cafetería al azar o has dejado que alguien use tu red doméstica sin pensarlo dos veces. Incluso podrías confiar en que tu frigorífico inteligente no comprometa tu red. La realidad es que estas decisiones casuales pueden exponer tu entorno de desarrollo local a riesgos innecesarios. Los atacantes no solo se enfocan en los sistemas de producción; los entornos locales suelen ser objetivos más vulnerables, ofreciendo una vía de acceso a proyectos sensibles.

### Escenarios de ataque

1. **Tráfico interceptado:** El tráfico sin cifrar puede ser capturado y leído fácilmente.
2. **Servicios sin protección:** Bases de datos o APIs locales expuestas en `0.0.0.0`.
3. **Suplantación de red:** Redirige el tráfico hacia el dispositivo del atacante.

### Soluciones rápidas

- Prefiere redes privadas de Docker en lugar de firewalls para limitar la exposición de la red.
- Evita redes públicas o compartidas; opta por usar el hotspot de tu teléfono.
- Monitorea tu red local en busca de dispositivos desconocidos con herramientas como `arp-scan` y `nmap`.

## 🛡️ Configuración de firewall

### UFW con Docker (Ubuntu)

> ⚠️ **Advertencia:** De forma predeterminada, Docker en Ubuntu/Debian ignorará las reglas de UFW/iptables, lo que podría exponer tu sistema a ataques.
> No importa si enlazas puertos a direcciones IP locales (por ejemplo, `-p 127.0.0.1:8080:80`).

¡Siempre me sorprende cuando lo descubro! [Docker ignora las reglas de UFW por defecto](https://github.com/moby/moby/issues/4737), permitiendo que los contenedores se comuniquen con el host y otros contenedores sin restricciones.

### Mejor práctica

1. 🥇 **Usa redes de Docker** para aislar y controlar qué puede conectarse a cada contenedor o red.

2. 🥉 **Actualiza iptables** si debes usar una red `host`, o no puedes usar redes personalizadas, puedes mitigar el riesgo configurando iptables. No es para los débiles de corazón, [consulta la utilidad de abajo.](#uf)

#### Aislamiento de redes de Docker

```bash
# Crear una nueva red de Docker
docker network create my-network

# Ejecutar tu contenedor con la nueva red
docker run --network my-network my-container
```

#### Configuración de UFW (para redes `host`)

Hay mucha mala información sobre cómo solucionar esto por ahí. Configura UFW para que funcione con Docker usando UFW de manera similar a como lo harías normalmente.

He usado `ufw-docker` para configurar un sistema autoalojado y parece funcionar bien.

```bash title="install-ufw-docker.sh"
# Instalar el binario como root (de todos modos necesita permisos de root)
sudo wget -O /usr/local/bin/ufw-docker \
   https://github.com/chaifeng/ufw-docker/raw/master/ufw-docker
sudo chmod +x /usr/local/bin/ufw-docker
# Instalar y modificar el archivo `after.rules` de `ufw`
ufw-docker install

ufw-docker help
```

Este comando realiza lo siguiente:

- Respalda el archivo `/etc/ufw/after.rules`.
- Agrega reglas relacionadas con Docker al final del archivo para integrarse correctamente con UFW.

**Fuente:** [ufw-docker GitHub](https://github.com/chaifeng/ufw-docker/tree/master#install)

**Ejemplo de uso:**

```bash

# Permitir contenedor Docker en el puerto 8080
ufw-docker allow <container_name> 8080/tcp

# Gestionar reglas de forma segura junto con tu configuración de UFW
ufw-docker status

```

**Nota:** La mayoría de las "soluciones" para conflictos entre Docker y UFW implican reglas manuales de iptables, lo que puede ser propenso a errores y frágil durante actualizaciones.

### Firewall de macOS

1. Ve a **Preferencias del Sistema > Seguridad y privacidad > Firewall**.
2. Activa el firewall y haz clic en "Opciones de firewall".
3. Bloquea todas las conexiones entrantes excepto los servicios esenciales.

**Nota:** Es posible que necesites buscar la configuración de tu firewall para permitir ciertos dispositivos inteligentes que uses - por ejemplo, Google Cast/AirPlay y otros servicios.

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

**Consejo profesional:** Usa herramientas como [Little Snitch](https://www.obdev.at/products/littlesnitch/index.html) en macOS y [ufw](https://help.ubuntu.com/community/UFW) en Linux para configuraciones más amigables para el usuario.

## 🔐 Gestión de Secretos para el Desarrollo Local

### Validación Proactiva de Marcadores de Posición

<p>💡 Asegúrate de que los secretos estén configurados correctamente con valores reales antes de ejecutar tu aplicación.</p>

Si usas marcadores de posición como `__WARNING_REPLACE_ME__` en tus secretos, genial, quizás alguien lo note. De todas formas, también puedes agregar una validación adicional para garantizar la seguridad en tiempo de ejecución.

¡No te imaginas lo fácil que es hackear completamente (modificar y refirmar) un token JWT cuando los atacantes pueden adivinar el secreto!

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

<p class="inset">Nunca codifiques de forma rígida secretos en tu base de código. Prefiere usar variables de entorno y almacenes seguros.</p>

En lugar de `.env.example`, usa `.env.generate.sh` para facilitar a los usuarios obtener un archivo `.env` con "valores predeterminados" seguros.

#### Ejemplo de `.env.generate.sh`

```bash title=".env.generate.sh" frame="code"
#!/bin/bash
# Genera un archivo .env seguro para el desarrollo local

generate_secret() {
    local length=${1:-30}
    # agrega 4 bytes para tener en cuenta el relleno
    local generate_length=$((length + 4))
    openssl rand -base64 "$generate_length" | tr -d '+=/\n' | cut -c1-"$length"
}
# Sale si ya existe el archivo .env
[ -f .env ] && { echo ".env file already exists!"; exit 1; }

cat <<EOL > .env
# Configuración de base de datos y secretos
DB_USER=app_user
DB_PASSWORD=$(generate_secret 30)
REDIS_PASSWORD=$(generate_secret 20)
# Secretos de sesión
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

## 🕵️‍ Monitoreo y verificación adicional

### Ejemplos de `nmap`

#### Pruebas dentro de tu red

```bash

# Escanea tu localhost para todos los puertos abiertos
nmap -sT localhost

# Escanea la IP privada de tu máquina para servicios
nmap -sV 192.168.1.10

# Detecta dispositivos en tu red
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
```

#### Pruebas fuera de tu red

Puedes obtener fácilmente tu IP (pública) actual con servicios como `ifconfig.me`: `curl https://ifconfig.me`.

Usa una red externa o un servidor remoto para probar tus IPs públicas:

```bash

print_current_ip() {
  curl https://ifconfig.me
}

print_current_ip
# --> 123.456.789.012

# Cambia target_host por tu IP pública o nombre de host
# Verifica el host usando técnicas avanzadas
nmap -A --open --reason $target_host
nmap -A -F --open --reason $target_host
nmap -A -p1-65535 --open --reason $target_host

```

**¿Por qué probar ambos?**  
Las pruebas desde dentro revelan la exposición interna, mientras que las pruebas externas identifican los servicios accesibles para los atacantes.

## 🛡️ Mitos comunes

1. **Mi entorno local no es un objetivo.**  
   - Hecho: Los atacantes pueden pivotear desde tu máquina a tus sistemas de producción.  
2. **Los firewalls bloquean todo.**  
   - Hecho: Solo bloquean lo que les configures.  
3. **Las IPs privadas son seguras.**  
   - Hecho: Explotaciones como los bypasses de NAT aún pueden afectar tu red.
````
