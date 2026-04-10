-- CreateTable
CREATE TABLE "Theme" (
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
    "gradientEnd" TEXT NOT NULL
);
