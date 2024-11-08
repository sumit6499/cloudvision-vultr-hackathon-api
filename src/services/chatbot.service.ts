import axios from 'axios'

const api_key=Bun.env.VULTR_INFERENCE_KEY

export const chatCompletion=async ()=>{

        let config={
            headers: { 
                'Authorization': `Bearer ${api_key}`, 
              },
        }
      const res= await axios.post(`https://api.vultrinference.com/v1/chat/completions/RAG`,config)
      return res.data; 
}




const storeEmbeddings=async (msg:string)=>{
let data = JSON.stringify({
  "content": msg,
  "description": "user messages"
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.vultrinference.com/v1/vector_store/cloudvision/items',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${api_key}`
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
})
.catch((error) => {
  console.log(error);
});


}

type chatbotRes={
    role:string,
    content:string
}

export const chatCompletionRAG=async(userMsg:string)=>{

  // const embeddings=await storeEmbeddings(userMsg)
  console.log("usermsg",userMsg)

let data = JSON.stringify({
  "collection": "cloudvision",
  "model": "zephyr-7b-beta-Q5_K_M",
  "messages": [
    {
      "role": "user",
      "content": userMsg
    }
  ],
  "max_tokens": 512,
  "seed": -1,
  "temperature": 0.8,
  "top_k": 40,
  "top_p": 0.9,
  "stream": false
});

let config = {
  method: 'post',
  url: 'https://api.vultrinference.com/v1/chat/completions',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${api_key}`
  },
  data : data
};

  try {
    
    const res=await axios.request(config)
    return res.data.choices[0].message.content as string
  } catch (error) {
    console.log(error)
  }

}




