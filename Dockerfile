FROM node:20-alpine

WORKDIR /app

RUN npm i -g pnpm

RUN apk add --no-cache curl

COPY package.json tsconfig.json pnpm-lock.yaml ./

RUN npm i -g pnpm

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 8100

CMD ["pnpm", "start"]