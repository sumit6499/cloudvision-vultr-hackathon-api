# CloudVision Vultr Hackathon API

## Overview

The **CloudVision Vultr Hackathon API** provides tools for managing infrastructure, tracking costs, and analyzing cloud resources. This project includes several services for interacting with the Vultr cloud platform, and utilizes Terraform for infrastructure automation.

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
5. [Project Structure](#project-structure)
6. [Configuration](#configuration)
7. [Scripts](#scripts)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

- **Infrastructure Management**: Manage cloud infrastructure with automated setup, update, and teardown operations.
- **Cost Tracking**: Monitor and analyze the cost of running infrastructure.
- **Resource Extraction**: Extract detailed cloud resource information.
- **Modular Services**: Built with a microservices approach for scalability.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version X.X or higher)
- [Docker](https://www.docker.com/)
- [Terraform](https://www.terraform.io/)
- [Bun](https://bun.sh/) 

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/username/cloudvision-vultr-hackathon-api.git
   cd cloudvision-vultr-hackathon-api
    ```

2. Install dependencies:
   ```bash
   cd your-project
    bun install --production
    ```

3. Start the application:
    ```bash
    bun start
    ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`= 'your_postgres_url'

`DIRECT_URL`='direct_url_for_db_migration'

`VULTR_HOST_NAME`='vultr host name'

`VULTR_SECRET_ACCESS_KEY`='your_secret_access_key'

`VULTR_DIAGRAM_BUCKET_NAME`='your_bucket_name'

`AWS_ACCESS_KEY`='your_access_key'

`AWS_SECRET_ACCESS_KEY`='your_secret_access_key'

`VULTR_API_KEY`='vultr_api_key'

`GENERATE_CODE_ARN`='ecs_task_arn'

`INFRA_BUILD_ARN`=='ecs_task_arn'


## API Reference

#### upload diagram and analyze diagrma

```http
  POST api/v1/upload/diagram
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Headers` | Authorization | **Required**. Bearer token |
| `file` | Multipart form-data containing files. | **Required**. Image file |
| `username` | string | **Required**. user name |

#### Response example
```json
{
    "success": true,
    "msg": "File uploaded Successfully",
    "data": {
        "dbDiagram": {
            "id": "diagram id",
            "userID": "userid",
            "userId": null,
            "uploadAt": "date",
            "url": "url",
            "status": "PROCESSING",
            "terraformID": null
        }
    }
}
```

#### Build infrastructure

```http
  POST /api/v1/infra/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Headers` | Authorization | **Required**. Bearer token |
| `diagramID` | string | **Required**. Image file |

#### Example request
```json
{
    "diagramID":"86bc9a12-6d0a-4eed-917e-686ccede55c7"
} 
```


#### Get item

```http
  GET /api/v1/infra/all
```

no need of request parameter

```json
{
    "success": true,
    "msg": "Infrastucture fetched successfully",
    "data": {
        "blockStorage": {
            "blocks": [],
            "meta": {
                "total": 0,
                "links": {
                    "next": "",
                    "prev": ""
                }
            }
        },
        "instances": {
            "instances": [],
            "meta": {
                "total": 0,
                "links": {
                    "next": "",
                    "prev": ""
                }
            }
        },
        "db": {
            "databases": [],
            "meta": {
                "total": 0
            }
        }
    }
}

```
## Services

The project uses several services to encapsulate core logic:

1. Cost Service (services/cost.service.ts): Handles cost estimation logic for infrastructure resources.

2. Infra Service (services/infra.service.ts): Manages infrastructure operations, including creation, fetching details, and deletion.
3. Upload Service (services/upload.service.ts): Handles file storage operations with S3.
4. User Service (services/user.service.ts): Manages user authentication and other user-related operations.

## Services

The project uses several services to encapsulate core logic:

1. Cost Service (services/cost.service.ts): Handles cost estimation logic for infrastructure resources.

2. Infra Service (services/infra.service.ts): Manages infrastructure operations, including creation, fetching details, and deletion.
3. Upload Service (services/upload.service.ts): Handles file storage operations with S3.
4. User Service (services/user.service.ts): Manages user authentication and other user-related operations.


## Tech Stack

**Client:** Next.js , TailwindCSS, Shadcn liberary

**Server:** Typescript , Bun , Hono , Vultr services, Aws services


