/*
  Warnings:

  - You are about to drop the column `buttonPrimary` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `buttonSecondary` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `titleHighlight` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `titleLine1` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `titleLine2` on the `Hero` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hero" (
    "tenantId" TEXT NOT NULL PRIMARY KEY,
    "badge" TEXT,
    "title" TEXT,
    "highlightWord" TEXT,
    "description" TEXT,
    CONSTRAINT "Hero_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Hero" ("badge", "description", "tenantId") SELECT "badge", "description", "tenantId" FROM "Hero";
DROP TABLE "Hero";
ALTER TABLE "new_Hero" RENAME TO "Hero";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
