FROM oven/bun:edge AS base

WORKDIR /usr/src/app

FROM base as builder

COPY package.json bun.lockb ./

#we need devdep to build ts and other code
RUN bun install --production=false 

COPY . .

RUN bun build src/index.ts --outdir dist

FROM base AS runner

COPY --from=builder /app/dist  ./dist
COPY --from=builder /app/bun.lockb  ./bun.lockb
COPY --from=builder /app/package.json  ./package.json

RUN bun install --production --frozen-lockfile --verbose

ENTRYPOINT [ "bun","dist/index.js" ]