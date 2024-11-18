import { PrismaClient } from '@prisma/client';
import { writeFileSync } from 'fs';
import { exec } from 'child_process';
import { exit } from 'process';
import { LogService } from './services/log.service';

const logService = new LogService();
const prisma = new PrismaClient();

const terraformId = Bun.env.TERRAFORM_ID || "010daca1-8253-4862-93d3-7e9fb31ece68";
console.log(terraformId);

if (!terraformId) {
    console.log('Terraform ID not found');
    logService.publishLogs("error", "❌ Terraform ID not found");
    exit(1);
}

const getInfraCode = async () => {
    try {
        logService.publishLogs("info",`Finding terraform code and checking error !`)
        const terraformCode = await prisma.terraform.findFirst({
            where: { id: terraformId },
            select: { terraformCode: true },
        });
        return terraformCode?.terraformCode;
    } catch (error) {
        console.log(error);
        logService.publishLogs("error", `${JSON.stringify(error)}`);
    }
};

const triggerTerraformCommands = () => {
    console.log('trigger');
    
    exec('terraform init', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error initializing Terraform: ${stderr}`);
            logService.publishLogs("error", `Error initializing Terraform - ${stderr.toString()}`);
            exit(1);
        }

        console.log(stdout);
        logService.publishLogs("info", stdout.toString());
        
        exec('terraform apply --auto-approve', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error running Terraform plan: ${stderr}`);
                logService.publishLogs("error", `Error running Terraform plan - ${stderr.toString()}`);
                exit(1);
            }

            console.log(stdout);
            logService.publishLogs("info", stdout.toString());
            
            logService.publishLogs("info", "✅ Infrastructure Created Successfully! ");
            logService.publishLogs("success","🎉 Task Finished successfully!")
            console.log("✅ Infrastructure Created Successfully!");
        });
    });
};

const writeTerraformFile = async () => {
    logService.publishLogs("info", "⚙️ Initializing Infrastructure Creation...");
    
    const code = await getInfraCode();
    if (code) {
        writeFileSync('main.tf', code, 'utf-8');
        triggerTerraformCommands();
    } else {
        logService.publishLogs("error", "❌ Failed to retrieve Terraform code");
        exit(1);
    }
};

writeTerraformFile();
