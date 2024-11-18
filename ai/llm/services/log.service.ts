import Redis from 'ioredis'
import {initializeRedis} from '../lib/redis.config'
import {exit} from 'process'

type LogType="info" | "error" | "success"|"warning"

const diagramID=Bun.env.DIAGRAM_ID

if(!diagramID){
    console.log('diagramID not found')
    exit(1)
}

export class LogService {
    private publisher:Redis|undefined

    constructor() {
        try {
            const redis=initializeRedis()
            if(redis){
                this.publisher=redis
            }
        } catch (error) {
            console.log('redis error')
        }
        
    }

    public async publishLogs(type:LogType,message:string){
        if(this.publisher){
            await this.publisher.rpush(`logs-${diagramID}`,JSON.stringify({type,message}))
        }
    }
}