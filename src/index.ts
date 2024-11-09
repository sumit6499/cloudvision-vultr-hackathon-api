import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { successMsg } from './utils/responseMsg'
import {logger} from 'hono/logger'
import {connect as databaseConnect} from './services/database.service'
import router from './api/v1/route'
const app = new Hono()

app.use(cors())

app.use(logger())
databaseConnect()

//routers
app.route('/api/v1',router)

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
  port:Bun.env.PORT || 5000,
  fetch:app.fetch,
  maxRequestBodySize:1024*1024*200,
}
