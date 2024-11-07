const defaultCode=`# Configure the Vultr Provider
terraform {
  required_providers {
    vultr = {
      source  = "vultr/vultr"
      version = "~> 2.0"
    }
  }
}

provider "vultr" {
  api_key = var.vultr_api_key
}

# Store API Key in Variable for Security
variable "vultr_api_key" {
  type      = string
  sensitive = true
}

# Create Two Vultr Instances
resource "vultr_instance" "app_instance_1" {
  region     = "ewr"               # New Jersey region
  plan       = "vc2-1c-2gb"        # Choose a plan
  os_id      = 215                 # Ubuntu 20.04
  label      = "app-instance-1"
}

resource "vultr_instance" "app_instance_2" {
  region     = "ewr"
  plan       = "vc2-1c-2gb"
  os_id      = 215
  label      = "app-instance-2"
}

# Create a Vultr Managed Database (PostgreSQL)
resource "vultr_database" "example_db" {
  database_type   = "pg"            # PostgreSQL
  label           = "example-db"
  region          = "ewr"
  plan            = "vultr-vps-1c-1gb"   # Choose a database plan
  version         = "13"            # PostgreSQL version
  cluster_size    = 1               # Single node database
  admin_password  = "secure_password"
}

# Create a Vultr Object Storage Bucket
resource "vultr_object_storage" "example_object_storage" {
  label     = "example-storage"
  region    = "ewr"
  cluster_id = 1                    # Replace with your cluster ID
}

output "app_instance_1_ip" {
  value = vultr_instance.app_instance_1.main_ip
}

output "app_instance_2_ip" {
  value = vultr_instance.app_instance_2.main_ip
}

output "database_uri" {
  value = vultr_database.example_db.database_uri
}

output "object_storage_endpoint" {
  value = vultr_object_storage.example_object_storage.s3_hostname
}
`
export default defaultCode