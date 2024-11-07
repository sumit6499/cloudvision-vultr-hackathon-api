import {client,destroyInfra} from '../../lib/ecs.config'

const runDestroyInfraTask=()=>{
    try {
        client.send(destroyInfra)
        console.log('infra creation started')
    } catch (error) {
        console.log(error)
    }
}

export default runDestroyInfraTask