/*
  Warnings:

  - The `amount` column on the `Income` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `price` on the `Expense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `unit` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Investment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Income" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "unit" INTEGER NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "otp" (
    "id" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);
