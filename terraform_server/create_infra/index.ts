import { PrismaClient } from '@prisma/client';
import { writeFileSync } from 'fs';
import { exec } from 'child_process';
import { exit } from 'process';

const prisma = new PrismaClient();

const terraformId = Bun.env.TERRAFORM_ID 
console.log(terraformId)
if (!terraformId) {
    console.log('Terraform ID not found');
    exit(0);
}

const getInfraCode = async () => {
    try {
        const terraformCode = await prisma.terraform.findFirst({
            where: {
                id: terraformId,
            },
            select: {
                terraformCode: true,
            },
        });
        console.log(terraformCode)
        return terraformCode?.terraformCode;
    } catch (error) {
        console.log(error);
    }
};



const triggerTerraformCommands = () => {
    console.log('trigger')
    exec('terraform init', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error initializing Terraform: ${stderr}`);
            exit(1);
        }
        console.log(stdout);
        
        exec('terraform apply --auto-approve', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error running Terraform plan: ${stderr}`);
                exit(1);
            }
            console.log(stdout);
        });
    });
};

const writeTerraformFile = async () => {
    const code = await getInfraCode();
    if (code) {
        writeFileSync('main.tf', code, 'utf-8');
        triggerTerraformCommands();
        console.log('infra created')
    } else {
        exit(0);
    }
};

writeTerraformFile();
