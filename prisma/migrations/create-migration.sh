#!/bin/bash

# Ensure the script is executable
# Run with: chmod +x create-migration.sh

# Check if a migration name is provided
if [ $# -eq 0 ]; then
    echo "Please provide a migration name"
    echo "Usage: ./create-migration.sh MigrationName"
    exit 1
fi

# Run Prisma migration
npx prisma migrate dev --name $1

# Generate Prisma Client
npx prisma generate
