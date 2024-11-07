import {
    GetObjectCommand,
} from "@aws-sdk/client-s3";
import s3Client from '../../lib/s3.config'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

export const getObjectData=async (name:string,userName:string)=>{
    try {
        const getObjectCmd = new GetObjectCommand({
            Bucket: Bun.env.VULTR_DIAGRAM_BUCKET_NAME,
            Key: `${userName}/${name}`,
        });
    
        const url = await getSignedUrl(s3Client, getObjectCmd, {
          expiresIn: 60 * 60 * 24 * 7, //one week
        });

        return url
    
        return url;
    } catch (error) {
        console.log('error in get object')
        console.log(error)
    }
   
}