/*
  Warnings:

  - You are about to drop the column `componentsId` on the `Cost` table. All the data in the column will be lost.
  - You are about to drop the `Components` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Components" DROP CONSTRAINT "Components_diagramsId_fkey";

-- DropForeignKey
ALTER TABLE "Cost" DROP CONSTRAINT "Cost_componentsId_fkey";

-- DropIndex
DROP INDEX "Cost_componentsId_key";

-- AlterTable
ALTER TABLE "Cost" DROP COLUMN "componentsId";

-- DropTable
DROP TABLE "Components";

-- CreateTable
CREATE TABLE "Terraform" (
    "id" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "terraform_code" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_STARTED',
    "diagramsId" TEXT,

    CONSTRAINT "Terraform_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Terraform" ADD CONSTRAINT "Terraform_diagramsId_fkey" FOREIGN KEY ("diagramsId") REFERENCES "Diagrams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
