-- CreateTable
CREATE TABLE "StoreSettings" (
    "tenantId" TEXT NOT NULL PRIMARY KEY,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "phone" TEXT,
    "phoneDisplay" TEXT,
    "instagram" TEXT,
    "whatsappMessage" TEXT,
    "footerDescription" TEXT,
    "footerNotice" TEXT,
    CONSTRAINT "StoreSettings_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tenant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "themeName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Tenant" ("createdAt", "id", "name", "status", "themeName", "updatedAt") SELECT "createdAt", "id", "name", "status", "themeName", "updatedAt" FROM "Tenant";
DROP TABLE "Tenant";
ALTER TABLE "new_Tenant" RENAME TO "Tenant";
CREATE UNIQUE INDEX "Tenant_name_key" ON "Tenant"("name");
CREATE INDEX "Tenant_status_idx" ON "Tenant"("status");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
