FROM node:10.16

ADD ./app/dist /app

ADD ./app/servers /app

WORKDIR /app

RUN npm i body-parser@^1.18.3 cors@^2.8.5 dotenv@^7.0.0 express@^4.16.4

ENV PROD_SERVER_PORT=4200

CMD node servers/prod_server.js