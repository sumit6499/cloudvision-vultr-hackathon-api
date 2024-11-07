import {PrismaClient} from '@prisma/client'
import {writeFileSync} from 'fs'
import {exec} from 'child_process'
import { error } from 'console'
import { exit } from 'process'
const prisma=new PrismaClient()

const terraformId=Bun.env.TERRAFORM_ID

if(!terraformId){
    console.log('terraform id not found')
    exit(0)
}

const getInfraCode=async ()=>{
    try {
        const terraformCode=await prisma.terraform.findFirst({
            where: {
                id: terraformId
            },
            select:{
                terraformCode:true
            }
        })
        return terraformCode?.terraformCode
    } catch (error) {
        console.log(error)
    }
    
}

const writeTerraformFile=async ()=>{
    const code=await getInfraCode() 
    if(code){
        writeFileSync('main.tf',code,'utf-8')
        const envs=`VULTR_API_KEY=${Bun.env.VULTR_API_KEY}`
        writeFileSync('terraform.tfvara',envs,'utf-8')
    }else{
        exit(0)
    }
}

const applyTerraformInfra=()=>{
    exec('terraform init',(error)=>{
        console.log('error in terraform init',error)
        exit(0)
    })
    exec('terraform plan',(error)=>{
        console.log('error in terraform plan',error)
    })
}

writeTerraformFile()
applyTerraformInfra()