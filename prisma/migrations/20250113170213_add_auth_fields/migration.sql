/*
  Warnings:

  - A unique constraint covering the columns `[resetToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailVerifyToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "city" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "zip" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "emailVerifyToken" TEXT,
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailVerifyToken_key" ON "User"("emailVerifyToken");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
