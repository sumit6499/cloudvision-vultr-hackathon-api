import {Hono,Context} from 'hono'
import {successMsgWithData,errorMsg} from '../../utils/responseMsg'
import {ZodError} from 'zod'
import handleUpload from '../../services/upload.service'
import {getUser} from '../../services/user.service'
import { Diagrams } from '../../models/schema'
import { User } from '@prisma/client'
import {storeDiagram} from '../../services/database.service'
import {generateCode} from '../../lib/ecs.config'

const router=new Hono()
const vultr_api=Bun.env.VULTR_API_KEY as string

router.post('/diagram', async (c:Context) => {
    try {
        const body = await c.req.parseBody()
        const img=body['file']
        const username=body['username']
        
        
        
        if(img && img instanceof File ){

            const fileBuffer=Buffer.from(await img.arrayBuffer())

            //s3 push
            const url=await handleUpload(fileBuffer,img.name,'sumit',img.type) as string

            //store to database
            const user=await getUser('sumit') as User
            const diagram=new Diagrams(user.id,url)
            // const validData:DiagramSchemaType=DiagramSchema.parse(diagram)
            const dbDiagram=await storeDiagram(diagram) as Diagrams
            
            if(dbDiagram.id)
                await generateCode(dbDiagram.id,vultr_api)
            
            return c.json(successMsgWithData({
                success:true,
                msg:"File uploaded Successfully",
                data:{
                    dbDiagram,
                }
            }))

        }
        else{
            return c.json(errorMsg({
                success:false,
                msg:"File uploaded Successfully",
                error:'Image is not provided'
            }))
        }
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

export default router