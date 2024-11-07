#!/bin/bash

sh -c bun run index.ts

terraform init

terraform plan --auto-approve