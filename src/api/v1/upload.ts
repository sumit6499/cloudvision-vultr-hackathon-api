import {Hono} from 'hono'
import {successMsgWithData,errorMsg} from '../../utils/responseMsg'
import {ZodError} from 'zod'
import {DiagramSchema,DiagramSchemaType} from '../../validators/'

const router=new Hono()

router.post('/upload', async (c) => {
    try {
        const body = await c.req.parseBody();
        
        console.log(body['file'])
        return c.json(successMsgWithData({
            success:true,
            msg:"File uploaded Successfully",
            data:"url"
        }))

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
    
});

export default router