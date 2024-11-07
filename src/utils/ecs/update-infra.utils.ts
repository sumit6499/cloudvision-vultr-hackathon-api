import {client,updateInfra} from '../../lib/ecs.config'

const runDestroyInfraTask=()=>{
    try {
        client.send(updateInfra)
        console.log('infra creation started')
    } catch (error) {
        console.log(error)
    }
}

export default runDestroyInfraTask