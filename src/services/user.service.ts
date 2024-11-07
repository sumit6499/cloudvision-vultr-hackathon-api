import {User} from '../models/schema'
import {db} from '../lib/db.config'
import { error } from 'winston'

export const createUser=async (name:string,email:string,passwordHash:string)=>{
    try {
        const user=new User(name,email,passwordHash)
        const dbUser=await db.user.create({
            data:{
                name:user.name,
                email:user.email,
                passwordHash:passwordHash,
                updatedAt:new Date()
            }
        })

    user.setUserId(dbUser.id)

    return user
    } catch (error) {
        console.log("user service error",error)
        return error
    }
    
}


export const updateUser=()=>{

}

export const deleteUser=()=>{

}

export const getUser=async (name:string)=>{
    try {
        const user=await db.user.findFirst({
            where:{
                name: name
            }
        })
        if(!user){
            throw error('user not found')
        }
        return user
    } catch (error) {
        console.log("user service error",error)
        return error
    }
   
}