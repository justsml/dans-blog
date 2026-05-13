# Translation Candidate
- Slug: docker-security-tips-for-self-hosting
- Locale: es
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/es/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 53.96
- Input tokens: 24728
- Output tokens: 23446
- Thinking tokens: unknown
- Cached input tokens: 6656
- Cache write tokens: 0
- Estimated cost: $0.007605
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-security-tips-for-self-hosting --locale es
## Raw Output

````mdx
---
title: Consejos esenciales de seguridad para Docker en autoalojamiento
subTitle: 'Protege tus servicios autohospedados, desde defensa hasta monitoreo.'
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

**Tabla de contenidos**

- 🧗‍♀️ [Para los valientes](#-para-los-valientes)
- 🔄 [La danza de `:latest`](#-la-danza-de-latest)
- 🔐 [Gestión de secretos: La forma correcta](#-gestión-de-secretos)
- 🌐 [Riesgos de red](#-riesgos-de-red)
- 🛡️ [Control de acceso](#-control-de-acceso)
- 🔍 [Monitoreo y verificación](#-monitoreo--verificación)
- ⏰ [Consejos a menudo ignorados](#-consejos-a-menudo-ignorados)
- 🚀 [Lista de verificación para producción](#-lista-de-verificación-para-producción)
- 📚 [Lecturas adicionales](#-lecturas-adicionales)

## 🧗‍♀️ Para los valientes

Si estás autohospedando servicios de Docker, la seguridad es tu responsabilidad desde el principio hasta el fin: ningún proveedor de nube te protegerá de escaneos de puertos o configuraciones descuidadas. Ya sea que estés desplegando aplicaciones en tu red doméstica o alquilando VPS en proveedores como Vultr, DigitalOcean, Linode, AWS, Azure o Google Cloud, deberás asegurar los componentes y verificar que lo hayas hecho correctamente.

En esta guía, recorreremos la seguridad de Docker, desde técnicas `menos conocidas` hasta otras `difíciles de implementar correctamente`; exploraremos tokens canary, volúmenes de solo lectura, reglas de firewall, segmentación y endurecimiento de redes, proxies autenticados y mucho más.

También compararemos redes domésticas con configuraciones de nube pública y te mostraremos cómo configurar un proxy de autenticación básico con Nginx. Al finalizar, tendrás varias opciones para alejar a los intrusos (amigos, familia y, a veces, incluso a ti mismo...).

¡Eso es mucha información! Pero gran parte de ella está relacionada, y puedes elegir lo que sea más relevante para tu entorno. 🍀

## 🔄 La rutina de `:latest`

Mantener actualizadas las imágenes es crucial para la seguridad. Sin embargo, depender de `:latest` puede introducir cambios incompatibles o construcciones vulnerables sin un paso de revisión previo.

### La forma segura de actualizar

Combina comandos de actualización con `pull` o `build` para actualizar intencionalmente las imágenes y luego reiniciar durante un período en el que puedas detectar problemas.

```bash
#!/bin/bash
# update-and-run.sh
docker compose pull && \
  docker compose up -d
```

### Ajuste de versiones vs la última versión

Elegir la versión correcta para ajustar es un equilibrio entre estabilidad y seguridad. Aquí hay algunas estrategias comunes:

```yaml
# docker-compose.yml
# ...
  # Ajuste exacto de versiones, ideal para servicios críticos
  image: postgres:17.2

  # Ajuste de versiones de parche, adecuado para servicios no críticos
  image: postgres:17.2

  # Ajuste de versiones principales, perfecto para proyectos de ocio
  image: postgres:17

  # Yolo, evita si es posible
  image: postgres:latest
```

Usa [Dependabot](https://github.com/features/security) o [Renovate](https://github.com/renovatebot/renovate) para abrir solicitudes de actualización revisables. Para cualquier cosa que te haría triste reconstruir a las 2 a.m., ajusta a una versión específica o digest y deja que la automatización te indique cuándo moverte.

_¡Háblame de tus herramientas favoritas para mantener actualizadas las imágenes de Docker!_

## 🔐 Gestión de secretos

- [Generar secretos seguros](#generate-strong-secrets)
- [Tokens canario](#canary-tokens)
- [Actualizar desde `.env` a MacOS Keychain](#upgrade-from-env-to-macos-keychain)
{/* - [Validación de marcadores](#placeholder-validation) */}

Existen muchas formas de gestionar secretos, pero una de las reglas más importantes a seguir es: **nunca codifiques secretos en tus imágenes de Docker ni los comites a git.** Es uno de los errores de seguridad más comunes, representa un riesgo a largo plazo y es un dolor de cabeza arreglarlo.

Almacenar secretos de forma segura es un tema sustancial con muchas opciones, desde archivos `.env`, [secretos de Docker](https://docs.docker.com/compose/how-tos/use-secrets/), [1Password](https://1password.com/downloads/command-line)/[Bitwarden](https://bitwarden.com/developers/), o un gestor de secretos como [HashiCorp Vault](https://www.vaultproject.io/) o AWS Secrets Manager.

Tendrás que elegir el nivel "correcto" de esfuerzo y seguridad según tu caso de uso.

{/*
TODO: Mover a la Guía del Mantenedor
// TODO: Mover a la Guía del Mantenedor

### Validación de marcadores

<blockquote>No te lo creerías lo fácil que es hackear un token JWT cuando el secreto no es secreto!</blockquote>

**Resumen:**  
El artículo argumenta que los usuarios de Docker autoalojados deben asegurar proactivamente sus entornos, ya que ningún proveedor de la nube los protege de las amenazas. Destaca estrategias prácticas como el enclavamiento de versiones (evitar `:latest`), la gestión segura de secretos (por ejemplo, secretos de Docker, administradores externos), la segmentación de redes y la validación en tiempo de ejecución para evitar errores comunes. Dirigido a entusiastas y profesionales de pequeña escala, la guía con enfoque tutorial combina ejemplos de código operativos (por ejemplo, proxies de autenticación de Nginx, scripts de validación de secretos) con comparaciones entre configuraciones domésticas y en la nube. Presentado como un "desafío valiente", utiliza metáforas como "

{/*
TODO: Mover a la Guía del Mantenedor
// TODO: Mover a la Guía del Mantenedor

### Validación de marcadores

<blockquote>No te lo creerías lo fácil que es hackear un token JWT cuando el secreto no es secreto!</blockquote>

<p className='inset'>💡 Asegúrate de que los secretos sean siempre únicos. Intenta hacer imposible ejecutar con valores predeterminados inseguros o codificados.</p>

Si usas marcadores como `__WARNING_REPLACE_ME__` en tus secretos, genial, ¡quizás alguien lo note!

De todas formas, también puedes agregar un poco de seguridad en tiempo de ejecución con poco esfuerzo. Aquí hay ejemplos en JavaScript, Rust y Go:

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

### Generar secretos fuertes

### Generar secretos fuertes

Aquí hay un pequeño script para generar nuevos secretos para un archivo `.env`:

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

### Tokens de Canario

[**Tokens de Canario**](https://canarytokens.org/) son una excelente manera de detectar si tus secretos han sido comprometidos (y utilizados). Son como una alarma que puedes agregar a cualquier archivo sensible, URL y token.

Considera colocarlos junto a los secretos en los que realmente te preocupas: archivos `.env`, variables de CI, administradores de contraseñas, carpetas de respaldo y credenciales en la nube. No conviertas esto en teatro; coloca las alarmas donde un atacante real o un error futuro tuyo los tocaría.

Hay muchos tipos de tokens de canario para elegir, desde tokens de AWS, [números de tarjeta de crédito falsos](https://blog.thinkst.com/2024/12/its-baaack-credit-card-canarytokens-are-now-on-your-consoles.html), archivos de Excel y Word, archivos kubeconfig, credenciales de VPN, incluso los archivos de volcado de SQL pueden tener una alarma!

#### Mejores prácticas para Tokens de Canario

- **Colócalos en todas partes**: En cada archivo `.env`, pipeline de CI/CD y "administrador de secretos" que puedas imaginar.
  - Coloca un archivo `passwords.xlsx` o `passwords.docx` en tu directorio personal.
  - Añade un perfil de AWS `billing_prod` con un token de canario como secreto.
  - Genera un archivo `private.key` para tu directorio `~/.ssh`.
  - Crea un volcado de SQL de canario `all_credit_cards.sql` en tu directorio `~/backups`.
- **Monitorea**: Configura reglas o alertas por correo electrónico para detectar cuando un token de canario se active.

### Actualización desde `.env` a Keychain de MacOS

Para usuarios de Mac, una de las opciones más sencillas es usar Keychain.

Aquí hay una forma simple de automatizar la carga de secretos desde el Keychain de OSX, compatible con `TouchID`, y un poco más segura que los archivos `.env`.

El crédito original corresponde a <cite>[Brian Hetfield](https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd) y [Jan Schaumann](https://www.netmeister.org/)</cite>

<CodeTabs client:load tabs={[
  "Comandos auxiliares",
  "Persistir secretos en el entorno",
  "Usar secretos por comando"
]}>
```bash title="keychain-secrets.sh"
### Funciones para establecer y obtener variables de entorno desde el Keychain de OSX ###
### Adaptado de: https://www.netmeister.org/blog/keychain-passwords.html y 
### https://gist.github.com/bmhatfield/f613c10e360b4f27033761bbee4404fd

# Uso: get-keychain-secret SECRET_ENV_VAR
function get-keychain-secret () {
    security find-generic-password -w -a ${USER} -D "environment variable" -s "${1}"
}

# Uso: set-keychain-secret SECRET_ENV_VAR
# Se te pedirá que ingreses el valor del secreto!
function set-keychain-secret () {
    [ -n "$1" ] || print "Falta el nombre de la variable de entorno"
    
    # Solicita al usuario el secreto
    echo -n "Ingresa el secreto para ${1}"
    read secret
    [ -n "$secret" ] || return 1

    ( [ -n "$1" ] || [ -n "$secret" ] ) || return 1
    security add-generic-password -U -a ${USER} -D "environment variable" -s "${1}" -w "${secret}"
}
```

```bash title="~/code/app/.env-secrets.sh"
source ~/keychain-secrets.sh

# Carga variables de entorno en la shell actual
export AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID);
export AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY);
# Nota: Si un atacante puede ejecutar `env` en tu shell, estos secretos podrían exponerse!
```

```bash title="~/code/app/scripts/env-run.sh"
#!/usr/bin/env bash
source ~/keychain-secrets.sh

# Especifica todos los secretos para este proyecto
AWS_ACCESS_KEY_ID=$(get-keychain-secret AWS_ACCESS_KEY_ID) \
AWS_SECRET_ACCESS_KEY=$(get-keychain-secret AWS_SECRET_ACCESS_KEY) \
  "$@"

# Nota: Usar un envoltorio de shell ayuda a prevenir que los secretos permanezcan
# en el entorno. Y es seguro cometer (commit) estos scripts.

# Uso:
# ./scripts/env-run.sh docker compose up -d
# ./scripts/env-run.sh docker run -e AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS ...
```
</CodeTabs>

## 🌐 Peligro de red

### Redes personalizadas y puertos internos

Aislar correctamente los servicios con redes Docker es una forma importante de reducir tu superficie de ataque.

¡Ten cuidado al hacer agujeros en tu red! Un puerto mal configurado puede terminar muy mal.

Por defecto, los servicios en una LAN privada no se exponen a internet; debes redirigir explícitamente los puertos desde tu router.

### Docker en LAN

## Redes personalizadas y puertos internos

Aislar correctamente los servicios con redes Docker es una forma importante de reducir tu superficie de ataque.

¡Ten cuidado al hacer agujeros en tu red! Un puerto mal configurado puede terminar muy mal.

Por defecto, los servicios en una LAN privada no se exponen a internet; debes redirigir explícitamente los puertos desde tu router.

### Docker en LAN

Ya seas un desarrollador que ejecuta servidores de desarrollo localmente o que autohospedas servicios desde tu red local, **las suposiciones sobre el modelo de red de Docker pueden causar problemas.**

A los desarrolladores les sorprende a menudo descubrir que los métodos "tradicionales" para proteger servidores Linux (`iptables`, restringir opciones sysctl de TCP/IP) pueden **fallar silenciosamente** en anfitriones Docker. ¡Esto ocurre especialmente cuando **autohospedas o ejecutas en una red doméstica típica**! (Para los que están en la parte de atrás: Esto podría permitir el acceso a contenedores de desarrollo en tu MacBook!!!)

> ⚠️ **Advertencia #1:** Los puertos publicados por Docker pueden burlar las reglas de firewall que creías que protegían al anfitrión, especialmente con UFW en Ubuntu/Debian. Eso no hace que cada regla de firewall sea inútil, pero sí significa que "UFW dice denegar" no es prueba. [Ver problema #690: Docker burla las reglas de firewall de ufw](https://github.com/moby/moby/issues/690).

> ⚠️ **Advertencia #2:** Vincular puertos a direcciones IP locales (ej. `-p 127.0.0.1:8080:80`) es el valor predeterminado correcto, pero las versiones de Docker Engine anteriores a 28.0.0 tuvieron casos donde anfitriones en la misma red L2 aún podían alcanzar puertos publicados en localhost. [Docker documenta esta advertencia en su guía de publicación de puertos](https://docs.docker.com/engine/network/port-publishing/), y el hábito de verificar con nmap sigue siendo relevante.

<p class="inset">Si te sorprende aprender esto, ¡lo mismo!</p>

**Vincular a direcciones IP locales sigue siendo una buena práctica** y tiene un impacto significativo en **entornos en la nube gestionados y redes especialmente configuradas.** 
{/* No pienses en tu firewall o red privada como tu defensa principal o única, agrega redes Docker para una mejor **aislamiento**, y siempre considera si necesitas exponer puertos en absoluto. */}

### Ejemplo de Docker Compose

Aquí tienes un ejemplo de archivo `docker-compose.yml` que enlaza el servicio `app` a `127.0.0.1:8080` y conecta ambos contenedores a la red personalizada `backend`.

```yaml title="docker-compose.yml" {6-10,14-17}
networks:
  backend:

services:
  app:
    networks:
      - backend
    ports:
      # Enlazar a localhost si es posible
      - "127.0.0.1:8080:8080"
    # ... otras configuraciones
  database:
    image: postgres:17.1
    # No se necesitan puertos; accesible dentro de la red backend.
    networks:
      - backend

```

{/* #### Probar y verificar

Como con todas las medidas de seguridad, es crítico que **pruebes y verifiques** tu configuración de red. */}

{/* Aunque la seguridad y auditoría de redes es una responsabilidad a tiempo completo en la mayoría de las empresas, la mayoría de los usuarios de auto-hospedaje no le dedican ¡NINGUNO! tiempo a ello. */}

{/* Mira, lo entiendo, puede ser intimidante. _(Subredes, máscaras de red, CIDR, VLANs y tablas de enrutamiento, oh no. Si eso no tuvo sentido, está bien, estás en el lugar correcto. Además, no necesitamos preocuparnos por ninguno de eso por ahora.)_ */}

### Buenas prácticas de red

- 🏆 **No publiques NINGÚN puerto** Recientemente aprendí que esto es más útil de lo que podrías esperar. Al usar una red nombrada (puente), los contenedores tienen acceso sin filtrar entre sí. Se comportan como si estuvieran detrás de una red local (puerta de enlace NAT).
  - Aunque no sea posible en todos los casos, esto puede ser útil para contenedores que ejecutan tareas por lotes, o que se acceden principalmente mediante `attach` o `exec`.
- 🥇 **Usa redes Docker** para aislar y controlar qué contenedores pueden comunicarse entre sí.
- 🥉 **Usa enlace a localhost**: Aunque [imperfecto](https://github.com/moby/moby/issues/45610), generalmente es mejor enlazar puertos a una dirección de loopback (por ejemplo, `127.0.0.1:8080:80`). Asegúrate de [verificar tu configuración.](#-monitoring--verification)

## 🛡️ Controles de acceso

Los controles de acceso son una parte crítica para asegurar tus servicios Docker. Esto incluye limitar las capacidades y permisos de los contenedores, restringir el acceso al socket Docker, y más.

- [Limitar capacidades de contenedores](#limiting-container-capabilities)
- [Acceso al socket Docker](#docker-socket-access)
- [Bloqueo por país!](#blocking-country)
- [Fortalecer el host proxy de CloudFlare](#hardening-cloudflare-proxy-host)

### Limitar capacidades de contenedores

Otra buena práctica de control de acceso es limitar las capacidades de tus contenedores. Esto reduce el alcance de varios tipos de amenazas, desde escalada de privilegios hasta interceptación de tráfico. No es un escudo, pero elimina permisos que la mayoría de los contenedores nunca necesitaron.

**¿Qué son las capacidades?** Permisos o habilidades definidos por el kernel de Linux y nombrados. (La página [`capabilities`](https://man7.org/linux/man-pages/man7/capabilities.7.html) tiene una lista completa.) Incluyen cosas como `CAP_CHOWN` (cambiar propietario de archivos), `CAP_NET_ADMIN` (configurar interfaces de red), `CAP_KILL` (matar cualquier proceso), y muchas más.

Las dos formas de determinar las capacidades necesarias son:

1. **Prueba y error**: Este método lento pero efectivo consiste en comenzar sin capacidades y agregarlas una por una hasta que tu aplicación funcione.
2. **Buscar trabajo previo**: Busca "`project-name` `cap_drop` Dockerfile", o "`project-name` `cap_drop` docker-compose.yml" para ver si otros ya han hecho el trabajo por ti. Un LLM puede sugerir un punto de partida, pero trátalo como una suposición hasta que pruebes el contenedor y leas la documentación de la imagen.

#### Mejores prácticas con capacidades

- **Eliminar todas las capacidades**: Usa `cap_drop: [ ALL ]` para eliminar todas las capacidades de Linux del contenedor.
- **No permitir nuevos privilegios**: Usa `security_opt: [ no-new-privileges=true ]` para evitar que el contenedor gane nuevos privilegios.

```yaml title="Ejemplo: Eliminar/Limitar Capacidades" {5-14}
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
    # ... otras configuraciones
networks:
  db-network:
```

Ahora tus servicios pueden comunicarse entre sí a través de la red `db-network`. Docker Compose creará esa red automáticamente.

Usa la opción `--external`/`external:` para unirte a **una red preexistente**. Omítela para crear una nueva red.

### Acceso al Socket de Docker

#### ⚠️ Advertencia: `docker.sock` es esencialmente acceso de administrador del host

<blockquote class="inset">⚠️ La opción `:ro` no afecta la I/O enviada a través del socket!</blockquote>

Solo asegura que la ruta del socket en sí se monte de solo lectura. Las llamadas API enviadas a través de ese socket aún pueden crear contenedores, montar rutas del host y realizar otras cosas muy emocionantes que probablemente no pretendías delegar.

{/* Cualquier proceso que pueda "abrir" el socket puede (probablemente) obtener acceso root en el host. */}

#### Práctica recomendada para el socket

- 🥇 **Evite montar el socket de Docker,** probablemente exista una alternativa mejor.  
- 🫣 Si debe hacerlo, **coloque un proxy restringido delante** y permita solo los puntos finales de la API que la aplicación necesita realmente. Consulte el proyecto `docker-socket-proxy` original de Tecnativa, [docker-socket-proxy](https://github.com/Tecnativa/docker-socket-proxy). Luego verifique que las llamadas denegadas estén realmente bloqueadas.  
- 🤢 Bien, _quizás_ compartirlo sea aceptable en un entorno de prueba de **alta confianza** y **bajo riesgo**.  

#### Bloqueo por país  

A veces útil, pero no una frontera de seguridad real.  

_No se refiere a la música, sino a la entidad geopolítica..._  

Si sus aplicaciones están orientadas principalmente a familiares y amigos locales, puede bloquear tráfico de países de los que no espera recibir visitas. O permitir solo tráfico de países esperados. Reduce el ruido; no detiene a VPNs, proxies, botnets ni a quien tenga paciencia.  

Pruebe este script para bloquear todo el tráfico de China:

```bash title="block-china.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/cn.zone | \
  while read line; do ufw deny from $line to any; done

```

De manera similar, puede permitir solo tráfico de Estados Unidos:

```bash title="allow-usa.sh"
curl -fsSL https://www.ipdeny.com/ipblocks/data/countries/us.zone | \
  while read line; do ufw allow from $line to any; done
```

#### Fortalecer el host proxy de CloudFlare

Si su servidor doméstico está protegido detrás de una IP de CloudFlare (proxy), puede restringir el acceso solo a las IPs de CloudFlare y a su red local.

Esto es similar al [Bloqueo por país](#blocking-country) mencionado anteriormente, pero con un control mucho más estricto.

```bash title="whitelist-ingress-from-cloudflare.sh"
ufw default deny incoming # Bloquear todo el tráfico entrante!!!
ufw default allow outgoing # Permitir todo el tráfico saliente
ufw allow ssh # Permitir SSH

# Permitir acceso para la subred local (preferiblemente una DMZ/VLAN dedicada para servicios hospedados)
ufw allow from 10.0.0.0/8 to any port 443
```

```bash title="whitelist-ingress-from-cloudflare.sh"
# Permitir IPs de CloudFlare
curl -fsSL https://www.cloudflare.com/ips-v4 | \
  while read line; do ufw allow from $line to any port 443; done
# Agregar soporte para IPv6
# curl -fsSL https://www.cloudflare.com/ips-v6 | \
#   while read line; do ufw allow from $line to any port 443; done
```

Para probar cambios basados en geolocalización, puede ser útil usar una VPN con ubicaciones en el país deseado. Vea más en la sección [Monitoreo y verificación](#-monitoring--verification).

### Seguridad en la capa de aplicación

Una vez que [la red e host son endurecidos desde el punto de vista de la seguridad,](#-network-hazard) es posible que encuentre que hay más que hacer.

Ahora necesitamos pensar en la "capa de aplicación" de nuestros propios servicios.

<p class="inset">¿Tiene esa base de datos una contraseña válida? ¿Automatiza este contenedor HTTPS/certificados? ¿Incluye la aplicación autenticación integrada? ¿Existen límites sobre qué correos pueden registrarse? ¿Hay credenciales predeterminadas o variables de entorno que deban modificarse?</p>

La única forma de _saber_ es verificar. En este caso, comience por el `README` y otros archivos clave como `docker-compose.yml`, `Dockerfile` y `.env.*`. En el proyecto mismo, y de forma ideal en sus servicios complementarios también. (por ejemplo, Postgres, Redis, etc.)

#### Proxy inverso

Otra capa de defensa es la autenticación básica. No la use sin HTTPS. Para servicios legados, colocar autenticación básica frente a una ruta de administración suele ser suficiente para detener solicitudes aleatorias y crawlers no autenticados que intenten acceder directamente al servicio.

```nginx
# /etc/nginx/conf.d/secure-admin.conf
location /admin {
    auth_basic "Restricted Access";
    auth_basic_user_file /etc/nginx/.htpasswd;
    proxy_pass http://internal_admin:80;
    proxy_set_header X-Real-IP $remote_addr;
}
```

Generar credenciales:

```bash
htpasswd -c /etc/nginx/.htpasswd admin
```

Con un proxy de autenticación básica, los atacantes enfrentan un obstáculo adicional—nombre de usuario y contraseña—antes de alcanzar su servicio interno.

Otra opción es usar un servicio como [Traefik](https://traefik.io/) o [Caddy](https://caddyserver.com/) que pueda automatizar HTTPS y autenticación básica por usted.

Si desea administrar múltiples dominios y servicios con una interfaz gráfica, le recomiendo [Nginx Proxy Manager](https://nginxproxymanager.com/).

## 🔍 Monitoreo y verificación

- [Verifique sus puertos](#verifique-sus-puertos)
- [Vea los puertos abiertos](#vea-los-puertos-abiertos)
- [Monitoreo de archivos](#monitoreo-de-archivos)

Este es el **paso más importante y más ignorado.** Puede tener el mejor firewall, la mejor red y las mejores prácticas, pero si no verifica, no tiene idea de si funciona.

Además, conocer solo un puñado de comandos o dónde buscarlos puede marcar la diferencia para prevenir una violación. La sensación de ser un hacker es solo un bono. (Para detalles y ejemplos, avance hasta la sección [Monitoreo y verificación](#-monitoring--verification).)

<p class="inset">No confíe, verifique dos veces</p>

### Compruebe sus puertos

<p class="inset">⚠️ IMPORTANTE: No escanee hosts que no posea.</p>

Ya sea que esté en una red doméstica o en un VPS, querrá saber qué puertos están abiertos al mundo.

Hay 2 maneras de hacer esto:

- Comprobar la red (`nmap`, `masscan`)
- Consultar al sistema operativo (`lsof`, `netstat`, `ss`)

#### Pruebas fuera de su red

Necesitará su IP actual (pública), fácilmente con servicios como `ifconfig.me`: `curl https://ifconfig.me`. O búscala en el panel de control de tu proveedor de alojamiento.

```bash title="Obtener IP pública"
curl -fsSL https://ifconfig.me
# --> CURRENT PUBLIC IP
```

Una vez que tenga su IP pública, ahora necesita **conectarse a una red externa**. Puede usar una computadora de un amigo, un teléfono/celular con conexión 5G o un host de servidor dedicado.

```bash title="Escaneo externo con nmap"
target_host="$(curl -fsSL https://ifconfig.me)"

# Nota: Asegúrese de que `target_host` sea la IP deseada

# Escanear puertos específicos:
nmap -A -p 80,443,8080 --open --reason $target_host
# Top 100 puertos:
nmap -A --top-ports 100 --open --reason $target_host
# Todos los puertos
nmap -A -p1-65535 --open --reason $target_host
```

#### Prueba en tu red

Practique el uso de `nmap`, escanee su red local o uno de sus servidores, revise su router, impresora, refrigerador inteligente.

{/* Aunque los escaneos de puertos son una constante en la vida cotidiana, podría ser una violación del CFAA (Ley de Fraude y Abuso Informático) en EE.UU. Por lo tanto, solo escanee dispositivos que posea. */}

#### Comandos de escaneo

```bash

# Escanee su localhost para todos los puertos abiertos
nmap -sT localhost

# Escanee la dirección IP privada de su máquina para servicios
nmap -sV 192.168.1.10

# Encuentre detalles de servicios en su red
nmap -sn 192.168.0.0/24
nmap -sn 10.0.0.0/24
# O en una red Docker 172.18.0.1/16
nmap -sn 172.18.0.1/16

```

```text title="Escaneo con nmap" frame="terminal"
% nmap -A --open --reason 192.168.0.87

Iniciando Nmap 7.95 ( https://nmap.org ) el 2025-01-06 13:51 MST
Informe de escaneo de Nmap para dev02.local (192.168.0.87)
El host está activo, recibido syn-ack (0.0067s de latencia).
No mostrado: 995 puertos TCP cerrados (conn-refused)
PUERTO     ESTADO SERVICIO     RAZÓN   VERSIÓN
22/tcp   abierto  ssh         syn-ack OpenSSH 9.6p1 Ubuntu 3ubuntu13.5 (Ubuntu Linux; protocolo 2.0)
| ssh-hostkey:
|_  256 {FINGERPRINT} (ED25519)
80/tcp   abierto  http        syn-ack Caddy httpd
|_http-server-header: Caddy
|_http-title: Dev02.DanLevy.net
443/tcp  abierto  ssl/https   syn-ack
|_http-title: Dev02.DanLevy.net
1234/tcp abierto  http        syn-ack Node.js Express framework
|_http-cors: GET POST PUT DELETE PATCH
|_http-title: Dev02.DanLevy.net (application/json; charset=utf-8).
Información del servicio: SO: Linux; CPE: cpe:/o:linux:linux_kernel

Realizado el reconocimiento de servicios. Por favor, informe de resultados incorrectos en https://nmap.org/submit/ .
Nmap terminado: 1 dirección IP (1 host activo) escaneada en 13.36 segundos
```

### Ver puertos abiertos

Familiarícese con `lsof` - está disponible en MacOS y Linux. Muestra el estado detallado de la red y la actividad del disco.

```bash title="Comandos de lsof"
# Monitorear puerto específico
sudo lsof -i:80 -Pn
```

# Monitorear conexiones ESTABLISHED
sudo lsof -i -Pn | grep ESTABLISHED
# Ver LISTEN
sudo lsof -i -Pn | grep LISTEN

# para ver nombres de red en lugar de direcciones IP (puede ser muy lento hacer búsquedas inversas de DNS)
sudo lsof -i -P | grep LISTEN

# Monitorear todas las conexiones de red
sudo watch -n1 "lsof -i -Pn"

```

#### Salida de ejemplo

![escaneo de nmap para detectar escuchas](../lsof-scan-listen.webp)

### Monitoreo de archivos

Para identificar qué **procesos** están utilizando más **ancho de banda del disco duro**, puede usar `iotop`:

```bash
sudo iotop
```

Para ver cambios individuales en archivos, puede usar `inotifywait` en Linux o `fswatch` en MacOS:

Esto puede ser útil para detectar comportamientos no autorizados o extraños por carpeta o a nivel del sistema.

```bash
# Monitorear todos los cambios de archivos en un directorio
sudo inotifywait -m /path/to/directory
```

En MacOS puede usar `fswatch`:

Instale con `brew install fswatch`

```bash
fswatch -r /path/to/directory
```

## ⏰ Consejos a menudo ignorados

1. **Limitación de velocidad** para intentos de autenticación y cualquier otro punto final clave. Ya sea mediante el módulo `limit_req` de Nginx o `fail2ban` para acceso SSH, limitar los ataques de fuerza bruta _probablemente_ sea una buena idea. Digo _probablemente_ porque en la era de IPv6 y botnets baratos, bien, ya no es lo que solía ser.

2. **Usa volúmenes de solo lectura** cuando sea posible:
   ```yaml
   services:
      webapp:
        volumes:
          - ./config:/config:ro
   ```
   Combinado con otras prácticas recomendadas (usuarios no root, permisos mínimos en carpetas), la opción `:ro` de montaje de volúmenes proporciona protecciones adicionales contra cambios accidentales y algunos intentos de escritura desde dentro del contenedor. No protege el host de un proceso que ya tenga privilegios más amplios.

3. **Audita regularmente el acceso a los contenedores**.  
   Si un contenedor no necesita un secreto, puerto o montaje, ¡elimínalo!

4. **Ten cuidado con la WiFi y sus usuarios no deseados**  
   Seguro que nunca darías tu contraseña de WiFi a extraños, ¿verdad? Bueno, excepto algunos amigos... Bueno, quizás incluso a la familia. Nunca sabes qué aplicaciones tienen instaladas y cuáles podrían compartir tu SSID y contraseña con el mundo.

### Red doméstica vs. Proveedor público vs. Túneles

1. **Aislamiento virtual/DMZ**: Para servidores en casa, colócalos en una VLAN o DMZ separada si es posible. Esto mantiene tus dispositivos internos fuera del alcance de posibles compromisos desde el lado del servidor.  
   - Usa un router o VLAN separado para tu servidor doméstico.  
   - Usa una red WiFi independiente para tu servidor doméstico.  
   - Usa una subred separada para tu servidor doméstico.

2. **Proveedores de la nube**: Hetzner, Vultr, DigitalOcean, Linode, AWS, Azure y Google Cloud ofrecen distintas funciones de firewall.  
   - Algunos proveedores y servicios bloquean puertos por defecto. Otros ofrecen opciones de suscripción o complementos. Consulta la documentación de tu proveedor de servicio.  
   - Muchos proveedores ofrecen servicios de monitoreo avanzado y detección de amenazas.  

3. **VPNs y Túneles**: Considera usar una opción similar a una VPN o un servicio de túneles para conectar servicios a través de internet de manera segura sin exponerlos a internet público.  
   - TailScale, ngrok, ZeroTier.  
   - WireGuard, OpenVPN.  

{/* 3. **Hardening Against Internal/Lateral Attacks**: One infected device can compromise an entire network. Segmenting Docker services on custom networks, using hardware, UFW rules, and blocking unneeded ports can all help reduce risk (when properly configured.) */}  

## 🚀 Lista de verificación para producción  

- [ ] **Secretos**: Todos los secretos generados aleatoriamente y almacenados de forma segura  
- [ ] **Actualizaciones**: Estrategia documentada y automatizada para actualizar contenedores. (Está bien si solo son unos pocos comandos en un archivo de texto.)  
- [ ] **Red**: Solo los puertos necesarios expuestos, redes internas configuradas.  
- [ ] **Reglas de firewall**: Denegación por defecto, permisos explícitos, bloqueos por país si es necesario.  
- [ ] **Proxy inverso**: Nginx, Caddy o Traefik pueden agregar una capa de autenticación básica  
- [ ] **Tokens de canario**: Colócalos cerca de los archivos y credenciales sensibles que realmente investigarías si se tocaran.  
- [ ] **Monitoreo**: Conoce tus sistemas con `nmap`, `lsof`, `inotifywait`, `glances`, etc.  
- [ ] **Estrategia de respaldo**: Probada, preferiblemente automatizada y fuera del lugar.  
- [ ] **Privilegios mínimos**: Usuarios no root en contenedores, volúmenes de solo lectura.  

## 📚 Lectura adicional

## 📚 Lectura adicional

- [Prácticas recomendadas de seguridad de Docker](https://docs.docker.com/develop/security-best-practices/)
- [Hoja de trucos de seguridad de Docker de OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
- [Benchmark de Docker de CIS](https://www.cisecurity.org/benchmark/docker)
- [Canarytokens.org para Tokens de Canario](https://canarytokens.org/)

## Gracias

Un reconocimiento a algunos usuarios atentos de Reddit:

- <em className="cite">[u/JCBird1012](https://www.reddit.com/user/JCBird1012/) - [hilo](https://www.reddit.com/r/selfhosted/comments/1hv8jn6/comment/m5rvlzi/).</em>
- <em className="cite">[u/Salzig](https://www.reddit.com/user/Salzig/)</em>
- <em className="cite">[u/Myelrond](https://www.reddit.com/user/myelrond/)</em>
- <em className="cite">[u/shrimpdiddle](https://www.reddit.com/user/shrimpdiddle/)</em>
- <em className="cite">[u/troeberry](https://www.reddit.com/user/troeberry/)</em>

¡Gracias por leer! Espero que hayas encontrado esta guía útil. Si tienes alguna pregunta o sugerencia, no dudes en contactarme en mis redes sociales de abajo, o simplemente haz clic en el enlace `` `Editar en GitHub` `` para crear un PR. ❤️
````
