import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { successMsg } from './utils/responseMsg'


app.get('/', (c) => {
  return c.json(successMsg({
    success:true,
    msg:"Hello form cloudvision server"
  }),200)
})

app.notFound((c)=>{
  return c.html("<h1>Route not found Please check route endpoint</h1>",404)
})

export default {
  port:process.env.PORT || 3000,
  fetch:app.fetch,
  maxRequestBodySize:1024*1024*200,
}
