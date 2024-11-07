import {client,createInfraTask} from '../../lib/ecs.config'
const runCreateInfraTask=()=>{
    try {
        client.send(createInfraTask)
        console.log('infra creation started')
    } catch (error) {
        console.log(error)
    }
}

export default runCreateInfraTask