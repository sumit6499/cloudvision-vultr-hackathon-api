import { Hono, Context } from 'hono';
import axios from 'axios';
import { errorMsg, successMsgWithData } from '../../utils/responseMsg';

const router = new Hono();

router.post('/completion', async (c: Context) => {
  try {
    const { userMessage } = await c.req.json();
    if(userMessage){
        const data = JSON.stringify({
            collection: 'cloudvision',
            model: 'zephyr-7b-beta-Q5_K_M',
            messages: [{ role: 'user', content: userMessage }],
            max_tokens: 512,
            seed: -1,
            temperature: 0.8,
            top_k: 40,
            top_p: 0.9,
            stream: false,
          });
      
          const config = {
            method: 'post',
            url: 'https://api.vultrinference.com/v1/chat/completions',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Bearer ${Bun.env.VULTR_INFERENCE_KEY}` 
            },
            data,
          };
      
          const response = await axios.request(config);
      
          return c.json(successMsgWithData({
            success: true,
            msg: 'Message from Chatbot',
            data: response.data.choices[0].message, 
          }));
    }
    else{
        return c.json(errorMsg({
            success: true,
            msg: 'Message from Chatbot',
            error:"please provide userMessage"
          }));
    }
   
  } catch (err:unknown) {
    console.log('Error:',err);
    return c.json({
      success: false,
      msg: 'Internal Server Error',
      err: err,
    }, 500);
  }
});

export default router;
