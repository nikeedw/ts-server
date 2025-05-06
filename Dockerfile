ARG BUILD_IMAGE=node:alpine3.20
#this smaller with 10mb but one can't attach remote containers to it
#ARG RUN_IMAGE=gcr.io/distroless/nodejs20-debian11
ARG RUN_IMAGE=node:alpine3.20

FROM $BUILD_IMAGE as static

WORKDIR /app

RUN npm i -g pnpm

COPY package.json tsconfig.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

FROM $RUN_IMAGE as RUN_IMAGE

WORKDIR /app

EXPOSE 8100

COPY --from=static /app/dist/server.mjs ./server.mjs
COPY --from=static /app/dist/server.mjs.map ./server.mjs.map
COPY --from=static /app/public/index.html ./public/index.html

CMD ["server.mjs"]


