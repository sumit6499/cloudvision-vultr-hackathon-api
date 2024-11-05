import { db } from "../lib/db.config"
import {winstonLogger as logger} from '../middlewares/logger'


const connect = async () => {
  await db
    .$connect()
    .then(() => {
      logger.info("Postgres connected successfully")
    })
    .catch((err:ErrorCallback) => {
      console.log(err)
      logger.error(JSON.stringify(err))      
    });
};


export default connect;
