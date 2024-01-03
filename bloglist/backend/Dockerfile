FROM node:16

ENV SECRET=secret

WORKDIR /usr/src/app

COPY . .

RUN npm ci

CMD npm run start-prod
