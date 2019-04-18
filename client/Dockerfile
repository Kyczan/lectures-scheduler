FROM node:10-alpine

RUN mkdir -p /srv/app/client
WORKDIR /srv/app/client

COPY package*.json ./

RUN npm i

COPY . .

CMD [ "npm", "start" ]
