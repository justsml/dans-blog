FROM node:10.16.3

WORKDIR /app
COPY . /app

ENV PORT=8080
EXPOSE 8080

# RUN npm install yarn -g
RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn install
RUN npx browserslist@latest --update-db
# RUN yarn build:site

CMD ["yarn", "start"]
