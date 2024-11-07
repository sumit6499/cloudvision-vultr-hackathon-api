import llmRes from './img_to_terraform';

const vultr_api=Bun.env.VULTR_API

type Credentials = {
    apiKey: string;
};

export async function generateTerraformCode(
    infraDescription: string,
    cloudProvider: string,
    credentials: Credentials
) {
    const providerConfig = generateProviderConfig(credentials);
    const resources = parseInfrastructureDescription(infraDescription);

    return `
  ${providerConfig}
  
  ${generateResourceBlocks(resources)}
    `.trim();
}

function generateProviderConfig(credentials: Credentials) {
    return `
  terraform {
    required_providers {
      vultr = {
        source = "vultr/vultr"
        version = "~> 2.0"
      }
    }
  }
  
  provider "vultr" {
    api_key = "${credentials.apiKey}"
    rate_limit = 700
    retry_limit = 3
  }`;
}

function parseInfrastructureDescription(description: string) {
    // Parse the GPT-4 Vision API response for Vultr-specific resources
    const resources = [];
    const lines = description.split('\n');

    for (const line of lines) {
        if (line.toLowerCase().includes('instance') || line.toLowerCase().includes('server')) {
            resources.push({
                type: 'instance',
                details: line
            });
        } else if (line.toLowerCase().includes('block storage')) {
            resources.push({
                type: 'block_storage',
                details: line
            });
        } else if (line.toLowerCase().includes('private network')) {
            resources.push({
                type: 'private_network',
                details: line
            });
        } else if (line.toLowerCase().includes('load balancer')) {
            resources.push({
                type: 'load_balancer',
                details: line
            });
        } else if (line.toLowerCase().includes('database')) {
            resources.push({
                type: 'database',
                details: line
            });
        }
    }

    return resources;
}

function generateResourceBlocks(resources: unknown[]) {
    return resources
        .map((resource: any, index: number) => {
            switch (resource.type) {
                case 'instance':
                    return `
  resource "vultr_instance" "instance_${index}" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-${index}"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }`;

                case 'block_storage':
                    return `
  resource "vultr_block_storage" "storage_${index}" {
    size_gb = 10
    region = "ewr"
    label = "storage-${index}"
  }`;

                case 'database':
                    return ` resource "vultr_instance" "instance_${index}" {
                    database_engine= "postgres"
                    database_engine_version = "13"
                    plan         = "vultr-dbaas-startup"
                    region       = "ewr"
                    label        = "database-${index}

  }`;



                default:
                    return '';
            }
        })
        .filter((block) => block !== '')
        .join('\n\n');
}

// Example usage
export const terraform_code = await generateTerraformCode(
    llmRes,
    'vultr',
    { apiKey: vultr_api as string }
);

