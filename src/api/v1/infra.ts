import {Hono,Context} from 'hono'
import {successMsgWithData,errorMsg, successMsg} from '../../utils/responseMsg'
import {ZodError} from 'zod'
import { createInfra, getInfra } from '../../services/infra.service'
import {db} from '../../lib/db.config'
import {getDiagram} from '../../services/database.service'
import { fetch_infra } from '../../utils/vultr/fetch_infra'

const router=new Hono()

router.post('/create', async (c:Context) => {
    try {
        const {diagramID}=await c.req.json()
        console.log(diagramID)
        const terraformId=await getDiagram(diagramID) as string
        console.log(terraformId)

        if(terraformId)
            await createInfra(terraformId,diagramID)
        
        return c.json(successMsg({
            success:true,
            msg:"infrastructure creation started"
        }),200);

    } catch (error) {
        console.log(error)
        if(error instanceof ZodError){
            const formattedError=error.format()
            return c.json(errorMsg({
                success:false,
                error:formattedError,
                msg:error.name
            }),400)
        }

        return c.json(errorMsg({
            success:false,
            msg:"Internal Server error",
            error:error
        }),500)
    }
  });

router.get('/all',async (c:Context) => {
    try {
        const { resource } = c.req.query();
        const getResource=await getInfra()


        return c.json(successMsgWithData({
            success:true,
            msg:"Infrastucture fetched successfully",
            data:getResource
        }));
    } catch (error) {
        if(error instanceof ZodError){
            const formattedError=error.format()
            return c.json(errorMsg({
                success:false,
                error:formattedError,
                msg:error.name
            }),400)
        }

        return c.json(errorMsg({
            success:false,
            msg:"Internal Server error",
            error:error
        }),500)
    }
    
})

export default router