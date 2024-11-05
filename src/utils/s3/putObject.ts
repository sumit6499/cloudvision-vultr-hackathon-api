import {
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3client from '../../lib/s3.config'

export const putObjectData= async (buffer:BinaryType,name:string,mimetype:string)=>{

    const command = new PutObjectCommand({
        Bucket: Bun.env.VULTR_DIAGRAM_BUCKET_NAME,
        Key: `student/resume/${name}`,
        Body: buffer,
        ContentType: mimetype,
    });
      await s3client.send(command);
}

