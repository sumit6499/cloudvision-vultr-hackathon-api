import {Hono,Context} from 'hono'
import {successMsgWithData,errorMsg, successMsg} from '../../utils/responseMsg'
import {ZodError} from 'zod'

const router=new Hono()

router.post('/create', async (c:Context) => {
    try {
        
        return c.json(successMsg({
            success:true,
            msg:"infrastructure creation started"
        }),200);

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

router.get('/all',async (c:Context) => {
    try {
        const { jobId } = c.req.query();
        // const status = await getInfrastructureStatus(jobId);
        const data:String[]=[];

        return c.json(successMsgWithData({
            success:true,
            msg:"Infrastucture fetched successfully",
            data:data
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