-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tenantId" TEXT NOT NULL,
    "icon" TEXT,
    "label" TEXT,
    "title" TEXT,
    "colors" JSONB,
    CONSTRAINT "Feature_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Feature" ("colors", "icon", "id", "label", "tenantId", "title") SELECT "colors", "icon", "id", "label", "tenantId", "title" FROM "Feature";
DROP TABLE "Feature";
ALTER TABLE "new_Feature" RENAME TO "Feature";
CREATE TABLE "new_Hero" (
    "tenantId" TEXT NOT NULL PRIMARY KEY,
    "badge" TEXT,
    "titleLine1" TEXT,
    "titleLine2" TEXT,
    "titleHighlight" TEXT,
    "description" TEXT,
    "buttonPrimary" TEXT,
    "buttonSecondary" TEXT,
    CONSTRAINT "Hero_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Hero" ("badge", "buttonPrimary", "buttonSecondary", "description", "tenantId", "titleHighlight", "titleLine1", "titleLine2") SELECT "badge", "buttonPrimary", "buttonSecondary", "description", "tenantId", "titleHighlight", "titleLine1", "titleLine2" FROM "Hero";
DROP TABLE "Hero";
ALTER TABLE "new_Hero" RENAME TO "Hero";
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "priceOriginal" REAL,
    "badge" TEXT,
    "image" TEXT,
    "rating" REAL,
    "reviews" INTEGER,
    "stock" INTEGER NOT NULL,
    "highlight" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Product_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("badge", "category", "createdAt", "description", "highlight", "id", "image", "name", "price", "priceOriginal", "rating", "reviews", "stock", "tenantId", "updatedAt") SELECT "badge", "category", "createdAt", "description", "highlight", "id", "image", "name", "price", "priceOriginal", "rating", "reviews", "stock", "tenantId", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE INDEX "Product_tenantId_idx" ON "Product"("tenantId");
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
    CONSTRAINT "Theme_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Theme" ("border", "gradientEnd", "gradientMid", "gradientStart", "id", "primary", "primaryHover", "secondary", "secondaryDark", "surface", "tenantId", "text", "textMuted") SELECT "border", "gradientEnd", "gradientMid", "gradientStart", "id", "primary", "primaryHover", "secondary", "secondaryDark", "surface", "tenantId", "text", "textMuted" FROM "Theme";
DROP TABLE "Theme";
ALTER TABLE "new_Theme" RENAME TO "Theme";
CREATE UNIQUE INDEX "Theme_tenantId_key" ON "Theme"("tenantId");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "id", "password", "tenantId", "updatedAt") SELECT "createdAt", "email", "id", "password", "tenantId", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_tenantId_idx" ON "User"("tenantId");
CREATE TABLE "new_contactFields" (
    "tenantId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    CONSTRAINT "contactFields_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_contactFields" ("id", "label", "placeholder", "required", "tenantId", "type") SELECT "id", "label", "placeholder", "required", "tenantId", "type" FROM "contactFields";
DROP TABLE "contactFields";
ALTER TABLE "new_contactFields" RENAME TO "contactFields";
CREATE UNIQUE INDEX "contactFields_id_key" ON "contactFields"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
