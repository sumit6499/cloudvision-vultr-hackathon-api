import morgan from 'morgan'
import {createLogger,format, level, transports} from 'winston'
const {colorize,combine,json,timestamp}=format

const consoleFormat=combine(
  format.colorize(),
  format.printf(({level,message,timestamp})=>{
    return `${level}: ${message} : ${timestamp}`
  })
)



const winstonLogger=createLogger({
  level:'info',
  format:combine(
    json(),
    colorize(),
    timestamp(),
  ),
    transports:[

    new transports.Console({
      format:consoleFormat
    }),
  ]
    
})

const morganFormat=':method :url :status :response-time ms'

const logger=morgan(morganFormat,{
  stream:{
    write:(message:string)=>{
      const logObject={
        method: message.split(' ')[0],
        url:message.split(' ')[1],
        status:message.split(' ')[2],
        responseTime:message.split(' ')[3],
      };

      winstonLogger.info(JSON.stringify(logObject))
    }
  }
})



export{
  logger,
  winstonLogger,
} ;