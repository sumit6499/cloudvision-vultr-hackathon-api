-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOT_STARTED', 'UPLOADING', 'UPLOADED', 'PROCESSING', 'PROCESSED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('RS', 'USD');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagrams" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "userId" TEXT,
    "uploadAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NOT_STARTED',

    CONSTRAINT "Diagrams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Components" (
    "id" TEXT NOT NULL,
    "diagramsId" TEXT,
    "serviceName" TEXT NOT NULL DEFAULT 'vultr',
    "region" TEXT DEFAULT 'ap-south-1',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cost" (
    "id" TEXT NOT NULL,
    "componentsId" TEXT,
    "estimatedCost" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "currency" "Currency" NOT NULL DEFAULT 'RS',

    CONSTRAINT "Cost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cost_componentsId_key" ON "Cost"("componentsId");

-- AddForeignKey
ALTER TABLE "Diagrams" ADD CONSTRAINT "Diagrams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Components" ADD CONSTRAINT "Components_diagramsId_fkey" FOREIGN KEY ("diagramsId") REFERENCES "Diagrams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cost" ADD CONSTRAINT "Cost_componentsId_fkey" FOREIGN KEY ("componentsId") REFERENCES "Components"("id") ON DELETE SET NULL ON UPDATE CASCADE;
