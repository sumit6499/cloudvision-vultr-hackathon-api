FROM oven/bun:1

WORKDIR /app

COPY package.json .

COPY bun.lockb .

RUN bun install --frozen-lockfile --production

COPY . .

ENTRYPOINT [ "bun", "start"  ]

