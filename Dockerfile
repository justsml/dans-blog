FROM node:12.22.9-slim

WORKDIR /app
COPY . /app

ENV PORT=8080
EXPOSE 8080

# RUN npm install yarn -g
RUN yarn install
RUN yarn build:site

CMD ["yarn", "start"]
