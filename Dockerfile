ARG NODE_VERSION=18
ARG SERVER_PORT=3001

FROM node:$NODE_VERSION-buster AS base
WORKDIR /app

COPY package.json .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn lerna bootstrap && yarn build

FROM node:$NODE_VERSION-buster AS builder
WORKDIR /app
COPY --from=base /app/.env /app/
COPY --from=base /app/packages/client/dist/ /app/client/dist
COPY --from=base /app/packages/server/dist/ /app/server/dist
COPY --from=base /app/packages/server/package.json /app/server

FROM node:$NODE_VERSION-buster-slim AS production
WORKDIR /app
COPY --from=builder ./app .
RUN yarn install --cwd "/app/server" --production=true

EXPOSE $SERVER_PORT

CMD [ "node", "/app/server/dist/index.js" ]
