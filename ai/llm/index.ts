import llmText from './img_to_terraform'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
import defaultCode from './default/constant_code'
import { exit } from 'process'
const prisma = new PrismaClient()

const diagramID=Bun.env.DIAGRAM_ID 

if(!diagramID){
    console.log('diagramID not found')
    exit(0)
}

function extractCodeBetweenDelimiters(input: string): string | null {
  const codeMatch = input.match(/&&([\s\S]*?)&&/);

  if (codeMatch) {
      return codeMatch[1].trim();
  } else {
    console.warn("No code found between `&&` delimiters.");
    return defaultCode
  }
}


const extractedCode = extractCodeBetweenDelimiters(llmText);

async function storeTerraformCode() {
    try {
        const terraform=await prisma.terraform.create({
            data:{
                uploadedAt:new Date(),
                terraformCode:extractedCode || "",
                status:'PROCESSED'
            }
        })
    
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
        exit(0)
    }
    
}

if (extractedCode) {
    storeTerraformCode()
    console.log("Terraform code has been saved to main.tf");
} else {
    console.log("No code found to write to main.tf.");
}
  

