ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine as build-stage

WORKDIR /app

COPY package.json ./

RUN npm i --only=prod && npm i @nestjs/cli

COPY . .

RUN npx prisma generate

FROM node:${NODE_VERSION}-alpine as runtime-stage

WORKDIR /app

COPY --from=build-stage /app/src ./src
COPY --from=build-stage /app/types ./types
COPY --from=build-stage /app/.env ./
COPY --from=build-stage /app/tsconfig.json ./
COPY --from=build-stage /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build-stage /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build-stage /app/prisma ./prisma

COPY package.json ./

RUN npm i && npm i @nestjs/cli  \
    && npm cache clean --force  \
    && rm -rf \
    ./node_modules/.cache \
    ./node_modules/.npm \
    ./node_modules/.yarn \
    ./node_modules/.pnpm

EXPOSE ${PORT}

CMD [ "npm", "run", "start:migrate:dev" ]
