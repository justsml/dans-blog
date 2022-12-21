# Dan's Personal Blog

Powered by GatsbyJS!

## Building the site

```sh
docker build -t dans-blog .
# With .env & GITHUB_TOKEN
docker run --name dans-blog --env-file .env -it --rm -v ${PWD}:/app -p 8000:8000 dans-blog yarn build:site

docker run --name dans-blog -it --rm -v ${PWD}:/app -p 8000:8000 dans-blog yarn build:site

```
