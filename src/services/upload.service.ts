import {getObjectData,putObjectData} from '../utils/s3'
import {Diagrams} from '../models/schema'


const handleUpload= async (file: Buffer,name:string,userName:string,mimetype:string) => {
    try {
        putObjectData(file,name,userName,mimetype)
        const url=await getObjectData(name,userName)
        return url
    } catch (error) {
        console.log('error in upload service')
    }
}

export default handleUpload