FROM ubuntu:latest

COPY dependecies.sh script.sh

RUN chmod +x script.sh

RUN ./script.sh

WORKDIR /app

COPY package.json .

COPY bun.lockb .

RUN bun install --frozen-lockfile --production

COPY . .

CMD [ "bun", "start"  ]

RUN terraform init

RUN terraform plan