import {
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3client from '../../lib/s3.config'

export const putObjectData= async (buffer:Buffer,name:string,username:string,mimetype:string)=>{
    try {
        const bucket=Bun.env.VULTR_DIAGRAM_BUCKET_NAME
        if(!bucket){
            throw new Error('Please provide bucket name')
        }
        
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: `${username}/${name}`,
            Body: buffer,
            ContentType: mimetype,
        });
        await s3client.send(command);
        
    } catch (error) {
        console.log('error in put object')
        console.log(error)
    }

    

    
}

