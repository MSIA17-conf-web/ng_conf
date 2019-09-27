FROM node:10.16

ADD ./app /app

WORKDIR /app

RUN npm i

USER bower

RUN bower i

USER root

RUN npm run build

CMD npm run prod