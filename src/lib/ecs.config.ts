import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs"


if (!Bun.env.AWS_ACCESS_KEY || !Bun.env.AWS_SECRET_ACCESS_KEY ) {
    throw new Error("AWS credentials are not set in the environment variables");
}

const client=new ECSClient({
    region:'ap-south-1',
    credentials:{
        accessKeyId: Bun.env.AWS_ACCESS_KEY,
        secretAccessKey: Bun.env.AWS_SECRET_ACCESS_KEY 
    }
})

export const generateCode=async(diagramId:string,vultrAPI:string)=>{
    const generateInfraTask=new RunTaskCommand({
        taskDefinition:Bun.env.GENERATE_CODE_ARN,
        cluster:"arn:aws:ecs:ap-south-1:472838134367:cluster/terraform_server",
        launchType:'FARGATE',
        networkConfiguration:{
            awsvpcConfiguration:{
                assignPublicIp:'ENABLED',
                subnets:['subnet-09ad894044371ec83','subnet-030f098aa6944d1e1','subnet-05eb83d9aa4407fad'],
                securityGroups:['sg-0047dc1dc97fddc8b']
            }
            
        },
        overrides:{
            containerOverrides:[{
                name: 'terraform_generator',
                environment:[{
                  name:'DIAGRAM_ID',
                  value:diagramId
                },{
                    name:'VULTR_API',
                    value:vultrAPI
                }]
            }]
        }
    })
    await client.send(generateInfraTask)
}

export const createInfrastructure=async (terraformId:string,diagramID:string)=>{
    const createInfraTask=new RunTaskCommand({
        taskDefinition:Bun.env.INFRA_BUILD_ARN,
        cluster:"arn:aws:ecs:ap-south-1:472838134367:cluster/terraform_server",
        launchType:'FARGATE',
        networkConfiguration:{
            awsvpcConfiguration:{
                assignPublicIp:'ENABLED',
                subnets:['subnet-09ad894044371ec83','subnet-030f098aa6944d1e1','subnet-05eb83d9aa4407fad'],
                securityGroups:['sg-0047dc1dc97fddc8b']
            }
        },
        overrides:{
            containerOverrides:[{
                name: 'terraform',
                environment:[{
                    name: 'TERRAFORM_ID',
                    value: terraformId
                },
                {
                    name:'DIAGRAM_ID',
                    value: diagramID
                }
            ]
            }]
        }
    })
    await client.send(createInfraTask)
}



const destroyInfra=new RunTaskCommand({
    taskDefinition:"task-def-arn",
    cluster:"cluster-arn",
    launchType:'FARGATE',
    networkConfiguration:{
        awsvpcConfiguration:{
            subnets:[]
        }
    },
    overrides:{
        containerOverrides:[{
            name: 'name of container',
            environment:[]
        }]
    }
})

const updateInfra=new RunTaskCommand({
    taskDefinition:"task-def-arn",
    cluster:"cluster-arn",
    launchType:'FARGATE',
    networkConfiguration:{
        awsvpcConfiguration:{
            subnets:[]
        }
    },
    overrides:{
        containerOverrides:[{
            name: 'name of container',
            environment:[]
        }]
    }
})

const getInfra=new RunTaskCommand({
    taskDefinition:"task-def-arn",
    cluster:"cluster-arn",
    launchType:'FARGATE',
    networkConfiguration:{
        awsvpcConfiguration:{
            subnets:[]
        }
    },
    overrides:{
        containerOverrides:[{
            name: 'name of container',
            environment:[]
        }]
    }
})

export {
    client,
    destroyInfra,
    updateInfra,
    getInfra
}