import uploadRoutes from './upload'
import costRoutes from './cost'
import infraRoutes from './infra'
import chatBotRoutes from './chatbot'
import {Hono} from 'hono'
const router=new Hono()

router.route('/upload',uploadRoutes)
router.route('/cost',costRoutes)
router.route('/infra',infraRoutes)
router.route('/chatbot',chatBotRoutes)

export default router