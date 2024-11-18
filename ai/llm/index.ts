import {terraform_code} from './terraform_generator'
import { PrismaClient } from '@prisma/client'
import { exit } from 'process'
import {LogService} from './services/log.service'

const prisma = new PrismaClient()

export const diagramID=Bun.env.DIAGRAM_ID

const logSerive=new LogService()


if(!diagramID){
    console.log('diagramID not found')
    exit(1)
}


async function storeTerraformCode() {
    try {
        logSerive.publishLogs("info",`🔎 Image analysis is going on ... `)

        const terraform=await prisma.terraform.create({
            data:{
                uploadedAt:new Date(),
                terraformCode:terraform_code,
                status:'PROCESSED'
            }
        })

        logSerive.publishLogs("info",`✅ Image analysis is done !`)
        
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
        console.log('Error: ❌ An error occurred during the process!')
        logSerive.publishLogs("error",`${JSON.stringify(error)}`)
        exit(1)
    }
    
}
if (terraform_code) {
    logSerive.publishLogs("info",'🚀 Analyzing and Generating Terraform Code...')
    await storeTerraformCode()
    logSerive.publishLogs("success",'✅ Image processed and code generated successfully ')
    console.log('terraform code generated')
    exit(0)
} else {
    console.log("No code found to write to main.tf.");
    logSerive.publishLogs("error","Error: ❌ An error occurred during the process!")
    exit(1)
}
  

