FROM node:14-alpine3.15

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

RUN ls -a

RUN npm install
RUN npm install copyfiles --save-dev

RUN npm run build

## this is stage two , where the app actually runs

FROM node:14-alpine3.15

WORKDIR /usr

COPY package.json ./

RUN npm install --only=production

COPY --from=0 /usr/dist .
COPY ormconfig.js .

RUN npm install pm2 -g

EXPOSE 8080

CMD ["pm2-runtime","index.js"]
