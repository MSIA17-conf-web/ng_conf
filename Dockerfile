### Stage 1-1 : Build Angulare Dist folder and UI dependencies
FROM node:10.16-alpine as ui_build

RUN mkdir /app

WORKDIR /app

COPY app/package.json app/package-lock.json ./

RUN npm ci

COPY ./app /app

RUN npm run build

### Stage 1-2 : Install and copy server
FROM node:10.16-alpine as server_build

COPY ./server /server

WORKDIR /server

RUN npm ci 

### Stage 1-3 : Serve dist folder with server
FROM node:10.16-alpine 

COPY --from=ui_build /app/dist /server/dist

COPY --from=server_build /server /server/server

WORKDIR /server/server

CMD ["npm", "start"]
