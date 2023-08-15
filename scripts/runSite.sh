#!/usr/bin/env bash
set -eou pipefail
IFS=$'\n\t'

# docker build -t dans-blog .
# With .env & GITHUB_TOKEN
docker run \
  --name dans-blog \
  --env-file .env \
  -it \
  --rm \
  -v "${PWD}:/app" \
  --env PORT=8000 \
  -p 8000:8000 \
  dans-blog sh -c "yarn gatsby develop"
