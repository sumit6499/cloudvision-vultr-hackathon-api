import {terraform_code} from './terraform_generator'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
import { exit } from 'process'
const prisma = new PrismaClient()

export const diagramID=Bun.env.DIAGRAM_ID


if(!diagramID){
    console.log('diagramID not found')
    exit(0)
}


async function storeTerraformCode() {
    try {
        const terraform=await prisma.terraform.create({
            data:{
                uploadedAt:new Date(),
                terraformCode:terraform_code,
                status:'PROCESSED'
            }
        })

        console.log('code saved')
    
        await prisma.diagrams.update({
            where:{
                id:diagramID
            },
            data:{
                terraformID:terraform.id
            }
        })
    } catch (error) {
        console.log(error)
        console.log('inside')
        exit(0)
    }
    
}
if (terraform_code) {
    await storeTerraformCode()
    console.log("Terraform code has been saved to main.tf");
    exit(0)
} else {
    console.log("No code found to write to main.tf.");
}
  

