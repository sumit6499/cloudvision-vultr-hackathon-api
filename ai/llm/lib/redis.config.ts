import {Redis} from 'ioredis'
import {exit} from 'process'

const redis_url=Bun.env.REDIS_URL as string

if(!redis_url){
    console.log('redis url not found')
    exit(1)
}

export const initializeRedis=():Redis|undefined=>{
    try {
        const redis:Redis=new Redis(redis_url)
        return redis
    } catch (error) {
        console.log(error)
    }
}
