import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs"


if (!Bun.env.AWS_ACCESS_KEY_ID || !Bun.env.AWS_SECRET_ACCESS_KEY ) {
    throw new Error("AWS credentials are not set in the environment variables");
}

const client=new ECSClient({
    region:'ap-south-1',
    credentials:{
        accessKeyId: Bun.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: Bun.env.AWS_SECRET_ACCESS_KEY 
    }
})

const createInfraTask=new RunTaskCommand({
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
    createInfraTask,
    destroyInfra,
    updateInfra,
    getInfra
}