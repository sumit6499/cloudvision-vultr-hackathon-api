export const getChatBotConfig=(data:string)=>{
  if (Bun.env.VULTR_CHATBOT_API)
      console.log('Chatbot API URL not found in env')
  const config = {
      method: 'post',
      url: Bun.env.VULTR_CHATBOT_API,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${Bun.env.VULTR_INFERENCE_KEY}` 
      },
      data,
    };

  return config
}

