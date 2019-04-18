FROM node:10-alpine

RUN mkdir -p /srv/app/server
WORKDIR /srv/app/server

COPY package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "start" ]
