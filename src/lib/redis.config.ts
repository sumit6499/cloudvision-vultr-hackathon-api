import {Redis} from 'ioredis'

const redis_url=Bun.env.REDIS_URL as string

if(!redis_url){
    console.log('redis url not found')
}

export const initializeRedis=():Redis|undefined=>{
    try {
        const redis:Redis=new Redis(redis_url)
        return redis
    } catch (error) {
        console.log(error)
    }
}
