terraform {
    required_providers {
      vultr = {
        source = "vultr/vultr"
        version = "~> 2.0"
      }
    }
  }
  
  provider "vultr" {
    api_key = "QSAGGAMWXYC3SEEBVUXP5RRDJHAKPQNUQB4Q"
    rate_limit = 700
    retry_limit = 3
  }
  
  
  resource "vultr_instance" "instance_0" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-0"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }


  resource "vultr_instance" "instance_2" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-2"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }


  resource "vultr_instance" "instance_3" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-3"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }


  resource "vultr_instance" "instance_4" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-4"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }


  resource "vultr_block_storage" "storage_5" {
    size_gb = 10
    region = "ewr"
    label = "storage-5"
  }


  resource "vultr_instance" "instance_6" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-6"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }


  resource "vultr_instance" "instance_7" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-7"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }


  resource "vultr_instance" "instance_9" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-9"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }


  resource "vultr_instance" "instance_10" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-10"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }


  resource "vultr_instance" "instance_11" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-11"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }


  resource "vultr_instance" "instance_13" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-13"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }


  resource "vultr_instance" "instance_14" {
    plan = "vc2-1c-1gb"
    region = "ewr"
    os_id = 387 # Ubuntu 20.04 x64
    label = "instance-14"
    enable_ipv6 = true
    backups = "disabled"
    ddos_protection = false
    activation_email = false
  }