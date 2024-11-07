import axios from 'axios'
const apikey=Bun.env.VULTR_API_KEY



export const fetch_infra=async (endpoint:string)=>{
        let config={
            headers: { 
                'Authorization': 'Bearer L7JP4LB4BQAFAJHGIYIMYOLC24EUYZWG35XQ', 
              },
        }
      const res= await axios.get(`https://api.vultr.com/v2/${endpoint}`,config)
      return res.data; 
}



