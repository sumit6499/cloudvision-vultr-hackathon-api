import Redis from 'ioredis'
import {initializeRedis} from '../lib/redis.config'
class log {
    private subsriber:Redis|undefined
    constructor() {
        const redis=initializeRedis()
        if(redis){
            this.subsriber=redis
        }
    }

    public async subscribeLogs(){
        if(this.subsriber){
            const logs=await this.subsriber.psubscribe('logs')
            return logs
        }

    }
}