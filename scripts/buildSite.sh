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
  dans-blog sh -c "yarn && yarn build:site"
