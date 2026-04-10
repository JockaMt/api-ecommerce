/*
  Warnings:

  - A unique constraint covering the columns `[tenantId]` on the table `Theme` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Theme_tenantId_key" ON "Theme"("tenantId");
