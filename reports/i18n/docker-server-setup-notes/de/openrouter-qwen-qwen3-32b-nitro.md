# Translation Candidate
- Slug: docker-server-setup-notes
- Locale: de
- Model: openrouter/qwen/qwen3-32b:nitro
- Target: src/content/posts/2015-04-06--docker-server-setup-notes/de/index.mdx
- Validation: rejected: direct AI SDK translation failed
- Runtime seconds: 89.63
- Input tokens: 20620
- Output tokens: 8306
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- Estimated cost: $0.003643
- Pricing source: local-openrouter-estimate
- Note: Command failed: bun run i18n:validate --slug docker-server-setup-notes --locale de
## Raw Output

````mdx
---
social_image: ../desktop-social.webp
title: Docker-Server-Einrichtung
date: '2015-04-06'
modified: '2022-07-30'
subTitle: Datenbankserver mit einzelnen Befehlen starten
category: DevOps
subCategory: docker
tags:
  - devops
  - docker
  - server
  - postgres
  - mysql
  - mongodb
  - elasticsearch
  - setup
  - shell-script
related:
  - docker-makes-everything-better
  - docker-rocks
  - docker-security-tips-for-self-hosting
cover: ../markus-spiske-193031-unsplash.webp
cover_mobile: ../w300_markus-spiske-193031-unsplash.webp
cover_icon: ../icon_markus-spiske-193031-unsplash.webp
---
## Docker-Server-Setup

> Historische Anmerkung: Dies ist ein 2015 erschienener Leitfaden für lokale Entwicklungsumgebungen. Er eignet sich zur Verständnis der alten Arbeitsweisen, sollte aber nicht als aktuelle Produktivratschlag betrachtet werden. Moderne Docker-Compose-Dateien, benutzerdefinierte Netzwerke, fixierte Image-Versionen, Authentifizierung, Geheimnisse und überprüfte Update-Automatisierung sind heute sicherere Standardpraktiken.

### Für wen ist dieser Leitfaden?

- Haben Sie jemals ein App mit einer „wegwerfbaren“ Datenbank testen wollen?
- Haben Sie ein verdächtiges Codebase geerbt? Teilen Sie nicht gern Zugriff auf Ihre bestehende Datenbank?
- Arbeiten Sie mit sicherheitskritischen Kunden? Vermeiden Sie Kreuzkontamination! Nutzen Sie Container und steuern Sie die Datenspeicherung!
- Können Sie Ihr Entwicklungs-Setup nicht auf die neueste Datenbankversion upgraden, weil Ihre Legacy-Apps eine 12 Jahre alte MySQL-Version benötigen?

> Lassen Sie sich von diesen Gründen nie wieder aufhalten!

### Schnellverlinkung zu 1-Zeilen-Befehlen

Dieser Artikel enthält 1-Zeilen-Befehle, um einige der beliebtesten Datenbanken zu starten, darunter:

<section class="font-lg">

<p><a href="#postgres-server"><svg style={{display: 'inline-block', margin: '0 0.5rem'}} role="img" viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg"><title>PostgreSQL icon</title><path fill="currentColor" d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.827 2.865.305 4.482.415 6.682c.03.607.203 1.597.49 2.879s.69 2.783 1.193 4.152c.503 1.37 1.054 2.6 1.915 3.436.43.419 1.022.771 1.72.742.49-.02.933-.235 1.315-.552.186.245.385.352.566.451.228.125.45.21.68.266.413.103 1.12.241 1.948.1.282-.047.579-.139.875-.27.011.33.024.653.037.98.041 1.036.067 1.993.378 2.832.05.137.187.843.727 1.466.54.624 1.598 1.013 2.803.755.85-.182 1.931-.51 2.649-1.532.71-1.01 1.03-2.459 1.093-4.809.016-.127.035-.235.055-.336l.169.015h.02c.907.041 1.891-.088 2.713-.47.728-.337 1.279-.678 1.68-1.283.1-.15.21-.331.24-.643s-.149-.8-.446-1.025c-.595-.452-.969-.28-1.37-.197a6.27 6.27 0 0 1-1.202.146c1.156-1.947 1.985-4.015 2.458-5.845.28-1.08.437-2.076.45-2.947.013-.871-.058-1.642-.58-2.309C21.36.6 19.067.024 17.293.004c-.055-.001-.11-.002-.165-.001zm-.047.64c1.678-.016 3.822.455 5.361 2.422.346.442.449 1.088.437 1.884-.013.795-.16 1.747-.429 2.79-.522 2.02-1.508 4.375-2.897 6.488a.756.756 0 0 0 .158.086c.29.12.951.223 2.27-.048.332-.07.575-.117.827.075a.52.52 0 0 1 .183.425.704.704 0 0 1-.13.336c-.255.383-.758.746-1.403 1.045-.571.266-1.39.405-2.116.413-.364.004-.7-.024-.985-.113l-.018-.007c-.11 1.06-.363 3.153-.528 4.108-.132.77-.363 1.382-.804 1.84-.44.458-1.063.734-1.901.914-1.038.223-1.795-.017-2.283-.428-.487-.41-.71-.954-.844-1.287-.092-.23-.14-.528-.186-.926-.046-.398-.08-.885-.103-1.434a51.426 51.426 0 0 1-.03-2.523 3.061 3.061 0 0 1-1.552.76c-.689.117-1.304.002-1.671-.09a2.276 2.276 0 0 1-.52-.201c-.17-.091-.332-.194-.44-.397a.56.56 0 0 1-.057-.381.61.61 0 0  \n**Hinweis:** Diese Befehle wurden als lokale-Entwicklungsabkürzungen geschrieben. Falls Sie sie für die Produktion anpassen, fügen Sie zuerst Authentifizierung, Secrets-Management, Backups, Netzwerkpolitik, fixierte Images und einen Upgrade-Plan hinzu.

> **Fortgeschrittene Docker-Nutzer:** Falls Sie mit `docker-compose` vertraut sind, möchten Sie die unten stehenden Shellbefehle in Ihre `docker-compose.yml`-Dateien konvertieren.

### PostgreSQL-Server

> Starten Sie einen Container mit dem Namen `pg-localhost`

```sh
# Speichern Sie die DB-Dateien an einem lokalen Pfad außerhalb des Containers
mkdir -p $HOME/.postgres-data

docker run \
  --name pg-localhost \
  -p 127.0.0.1:5432:5432 \
  -e POSTGRES_PASSWORD=password \
  --restart unless-stopped \
  -it \
  --shm-size=256mb \
  postgres:16-alpine \
  postgres -c 'listen_addresses=*' \
    -c 'password_encryption=scram-sha-256' \
    -c 'shared_memory_type=sysv' \
    -c 'shared_buffers=256MB' \
    -c 'max_connections=200'
```

> Passen Sie die Befehlszeilenoptionen entsprechend an. (Die Postgres-Daemon-Argumente beginnen nach dem Docker-Image-Namen `postgres:16-alpine`. Siehe `postgres -c 'listen_addresses=*'...`)

> Zugriff auf den `psql`-Prompt als postgres-Benutzer

```sh
docker exec --user postgres -it pg-localhost psql
```

> Zugriff auf die Container-Shell als root

```sh
docker exec -it pg-localhost bash
```

**Hinweis:** Der obige Befehl verwendet die offiziellen Alpine-Linux-Grundimages. _Es ist nicht Ihre typische Debian-Umgebung._

> Um das debian/ubuntu-Grundimage zu verwenden, ändern Sie `postgres:12-alpine` in `postgres:12`.

### MongoDB-Server

```sh
mkdir -p $HOME/.mongodb/data

docker run -d \
  --name mongodb \
  --restart on-failure:5 \
  -p 127.0.0.1:27017:27017 \
  -v $HOME/.mongodb:/data \
  mongo:7 \
  bash -c 'mongod --bind_ip 0.0.0.0'
```

Stellen Sie nun sicher, dass Ihre Daten unter `$HOME/.mongodb` gespeichert sind:

```sh
ls -lach $HOME/.mongodb
```

Verbinden Sie sich mit dem Server mithilfe des `mongosh`-CLI-Tools. (Falls Sie dieses nicht installiert haben, siehe unten.)

```sh
#> Mit Standardargumenten:
mongosh
```

Sie sollten eine Ausgabe wie folgt sehen:

![Vorschau der MongoDB-Shell-Ausgabe](../mongo-shell-screenshot.webp)

#### Mongo CLI-Tools einrichten

##### Mit brew & OSX

```sh
brew tap mongodb/brew
brew install mongodb-community-shell
```

### MySQL-Server

> **ACHTUNG:** ÄNDERN SIE DAS PASSWORT IN `MYSQL_ROOT_PASSWORD` UNTER.

```sh
mkdir -p $HOME/.mysql

docker run -d \
  -v $HOME/.mysql:/var/lib/mysql \
  -p 127.0.0.1:3306:3306 \
  --name mysql-$USER \
  -e MYSQL_DATABASE=$USER \
  -e MYSQL_ROOT_HOST='172.*.*.*' \
  -e MYSQL_ROOT_PASSWORD='p@ssw0rd' \
  mysql/mysql-server:8
```

### ElasticSearch-Server

```sh
mkdir -p $HOME/.elastic

docker run -d \
  --name elastic \
  -p 127.0.0.1:9200:9200 \
  -p 127.0.0.1:9300:9300 \
  -v $HOME/.elastic:/data \
  docker.elastic.co/elasticsearch/elasticsearch:8.15.5 bash -c 'elasticsearch --cluster.name elastic_cluster --node.name elastic01 --path.data /data/elastic-data --path.logs /data/elastic-logs '
```

##### Sicherheitshinweise

> **HINWEIS:** Die `-p 127.0.0.1:27017:27017`-Portoption verhindert den Zugriff auf Ihre Instanz außer von der Docker-Server-localhost-Netzwerk.  
> Um die offenen Ports zu „veröffentlichen“, entfernen Sie den lokalen IP-Adresspräfix, um externen Zugriff zu ermöglichen: `-p 27017:27017`. **Stellen Sie sicher, dass Sie notwendige Sicherheitsvorkehrungen getroffen haben.**

**Empfohlen:** Verwenden Sie immer ein Port-Scanning-Tool (z. B. nmap/masscan), um Ihre Netzwerkkonfiguration zu überprüfen (von einem separaten System in einem anderen Netzwerk).

> Da Sie nun die Befehle zum Starten Ihrer Datenbankserver haben, ist der nächste Schritt, Ihre Anwendung als Docker-Image zu verpacken. Teil 2 folgt unten:

## Ein NodeJS-Web-App verpacken

1. Fügen Sie eine leere Datei namens `Dockerfile` in Ihrem Projektstammordner hinzu.
1. _(Optional, Empfohlen)_ Fügen Sie eine `.dockerignore`-Datei hinzu, die .gitignore-Regeln verwendet, um große nicht-essentielle Pfade auszuschließen. Standardmäßig werden alle Projektdateien eingeschlossen.

#### Erstellen Sie eine `Dockerfile` in der Wurzel Ihres Apps

```dockerfile
# Beispiel für NodeJS
FROM node:22
EXPOSE 3000
COPY . /app/
WORKDIR /app
RUN apt-get update && apt-get dist-upgrade -yqq
RUN ["npm", "install"]

# Übertragbarer Befehl
CMD ["npm", "start"]
```

Es ist einfacher, zu zeigen, wie man die Dockerfile nutzen und die Ergebnisse über die Konsol demonstrieren kann (siehe Befehle unten).

Im Terminal `cd` in den Projektordner und führen Sie den folgenden `build`-Befehl _jeweils_ aus, wenn Sie Änderungen bereitstellen – oder wenn Sie das Betriebssystem oder die Umgebungskonfiguration ändern/upgraden möchten.

```sh
docker build -t app-name-here .
```

{/*
#### Docker Install

Wenn Sie Docker nicht installiert haben, verwenden Sie den folgenden Befehl, um Docker auf Linux oder macOS zu installieren:

```sh
curl -sSL https://get.docker.com/ | sh
``` */}

### Wichtige Docker-Befehle

#### Docker-Image erstellen

```sh
docker build -t app-name-here .
```

#### Web-App erstellen/ausführen mit Verbindungen zu DB-Servern

```sh
docker network create app-local
docker network connect app-local mongodb
docker network connect app-local elastic
docker run -d --name webapp01 --network app-local -p 3000:3000 app-name-here
```

#### Interaktiv ausführen (nicht im Hintergrund, in der Konsole)

```sh
docker run -it --name webapp01 --network app-local -p 3000:3000 app-name-here bash
```

#### Container-Instanz oder -Image löschen

> Wichtig: Alle Daten, die nicht auf einem gemounteten Volume-Pfad gespeichert sind, gehen verloren!!

```sh
# Image löschen
docker rmi -f app-name-here
docker rm -f webapp01
# jetzt erneut Ihren `docker run...`-Befehl ausführen (siehe oben)
# Beispiel: Töten Sie Ihre DB-Instanzen oben, führen Sie aus: (beginnen Sie z. B. mit `docker stop {mongo,elastic}` )
docker rm -f mongo elastic
```

```
```
````
