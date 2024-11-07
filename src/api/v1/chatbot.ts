import {Hono,Context} from 'hono'
import {chatCompletionRAG} from '../../services/chatbot.service'
import {  successMsgWithData } from '../../utils/responseMsg'

const router=new Hono()



router.post('/completion',async (c:Context)=>{
    const {userMessage} = await c.req.json()

    const res=await chatCompletionRAG(userMessage)

    return c.json(successMsgWithData({
        success:true,
        msg: `message from Chatbot`,
        data: res
    }))

})

export default router