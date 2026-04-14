-- CreateTable
CREATE TABLE "Hero" (
    "tenantId" TEXT NOT NULL PRIMARY KEY,
    "badge" TEXT,
    "titleLine1" TEXT,
    "titleLine2" TEXT,
    "titleHighlight" TEXT,
    "description" TEXT,
    "buttonPrimary" TEXT,
    "buttonSecondary" TEXT,
    CONSTRAINT "Hero_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tenantId" TEXT NOT NULL,
    "icon" TEXT,
    "label" TEXT,
    "title" TEXT,
    "colors" JSONB,
    CONSTRAINT "Feature_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contactFields" (
    "tenantId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    CONSTRAINT "contactFields_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Theme" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "primary" TEXT NOT NULL,
    "primaryHover" TEXT NOT NULL,
    "secondary" TEXT NOT NULL,
    "secondaryDark" TEXT NOT NULL,
    "surface" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "textMuted" TEXT NOT NULL,
    "border" TEXT NOT NULL,
    "gradientStart" TEXT NOT NULL,
    "gradientMid" TEXT NOT NULL,
    "gradientEnd" TEXT NOT NULL,
    CONSTRAINT "Theme_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Theme" ("border", "gradientEnd", "gradientMid", "gradientStart", "id", "primary", "primaryHover", "secondary", "secondaryDark", "surface", "tenantId", "text", "textMuted") SELECT "border", "gradientEnd", "gradientMid", "gradientStart", "id", "primary", "primaryHover", "secondary", "secondaryDark", "surface", "tenantId", "text", "textMuted" FROM "Theme";
DROP TABLE "Theme";
ALTER TABLE "new_Theme" RENAME TO "Theme";
CREATE UNIQUE INDEX "Theme_tenantId_key" ON "Theme"("tenantId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_tenantId_idx" ON "User"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "contactFields_id_key" ON "contactFields"("id");
