import {runCreateInfraTask,runUpdateInfraTask,runDeleteInfraTask,runGetInfratask} from '../utils/ecs'
import {fetch_infra} from '../utils/vultr/fetch_infra'
import {createInfrastructure} from '../lib/ecs.config'

export const createInfra=async (terraformId:string)=>{
    
    await createInfrastructure(terraformId)
    return 'true'
}   

export const modifyInfra=()=>{
    // runUpdateInfraTask()
    //change infra creation status to processing
    //after processing set infra creation as true
}


export const destroyInfra=()=>{
    // runCreateInfraTask()
    //change infra creation status to processing
    //after processing set infra creation as true
}


export const getInfra=async ()=>{
    // runGetInfratask()
    const blockStorage=await fetch_infra('blocks')
    const instances=await fetch_infra('instances')
    const db=await fetch_infra('databases')
    return {
        blockStorage:blockStorage,
        instances:instances,
        db:db,
    }
}
