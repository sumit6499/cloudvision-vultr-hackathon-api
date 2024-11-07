import { db } from "../lib/db.config"
import {winstonLogger as logger} from '../middlewares/logger'
import { Diagrams } from "../models/schema";
import { DiagramSchemaType } from "../validators";


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

const storeDiagram=async (data:Diagrams)=>{
  try {
    const diagram=await db.diagrams.create({
      data:{
        url:data.url,
        status:'PROCESSING',
        userID:data.userID,
      }
    })
  
    return diagram 
  } catch (error) {
    console.log(error)
    return error
  }
  
}

export const getDiagram=async (diagramID:string)=>{
  try {
    const diagram=await db.diagrams.findFirst({
      where:{
        id: diagramID
      }
    })
  
    return diagram?.terraformID
  } catch (error) {
    console.log(error)
    return error
  }
}

export {
  storeDiagram,
  connect,
};
