import {client,getInfra} from '../../lib/ecs.config'

const runGetInfraTask=()=>{
    try {
        client.send(getInfra)
        console.log('infra creation started')
    } catch (error) {
        console.log(error)
    }
}

export default runGetInfraTask