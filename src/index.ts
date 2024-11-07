import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { successMsg } from './utils/responseMsg'
import {logger} from 'hono/logger'
import {connect as databaseConnect} from './services/database.service'
import router from './api/v1/route'
const app = new Hono()

app.use(
  '/api/',
  cors({
    origin: '*',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'PUT','DELETE'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

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
  port:process.env.PORT || 3000,
  fetch:app.fetch,
  maxRequestBodySize:1024*1024*200,
}
