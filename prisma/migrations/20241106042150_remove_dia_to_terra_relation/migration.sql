/*
  Warnings:

  - You are about to drop the column `diagramsId` on the `Terraform` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Terraform" DROP CONSTRAINT "Terraform_diagramsId_fkey";

-- AlterTable
ALTER TABLE "Terraform" DROP COLUMN "diagramsId";
