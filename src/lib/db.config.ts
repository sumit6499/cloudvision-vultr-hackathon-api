import { PrismaClient } from "@prisma/client"

declare global{
    var cachedPrisma:PrismaClient
}

let prisma:PrismaClient

if(process.env.NODE_ENV==='production'){
    prisma=new PrismaClient({
        log: ['error','query','info','warn'],
    })
}else {
    if(!global.cachedPrisma)
        global.cachedPrisma=new PrismaClient({
            log: ['query','error'],
        });
    prisma=global.cachedPrisma
}

export const db=prisma