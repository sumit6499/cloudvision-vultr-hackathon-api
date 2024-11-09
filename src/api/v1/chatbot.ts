import {Hono,Context} from 'hono'
import {chatCompletionRAG} from '../../services/chatbot.service'
import {  successMsgWithData } from '../../utils/responseMsg'
import axios from 'axios'
const router=new Hono()



router.post('/completion',async (c:Context)=>{
    const {userMessage} = await c.req.json()
    console.log(userMessage)
    console.log("in")
    try {
        // const res=await chatCompletionRAG(userMessage)
        const data = JSON.stringify({
            collection: "cloudvision",
            model: "zephyr-7b-beta-Q5_K_M",
            messages: [{ role: "user", content: userMessage }],
            max_tokens: 512,
            seed: -1,
            temperature: 0.8,
            top_k: 40,
            top_p: 0.9,
            stream: false
          });
          const config = {
            method: 'post',
            url: 'https://api.vultrinference.com/v1/chat/completions',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${Bun.env.VULTR_INFERENCE_KEY}` },
            data,
            timeout: 5000
          };

        const res = await axios.request(config);
        res.data.choices[0]?.message?.content 
        console.log("res",res)
        return c.json(successMsgWithData({
            success:true,
            msg: `message from Chatbot`,
            data: res
        }))
    } catch (error) {
        return c.json({
            success:true,
            msg:"Internal Server error",
            err:error
        },500)
    }


})


export default router