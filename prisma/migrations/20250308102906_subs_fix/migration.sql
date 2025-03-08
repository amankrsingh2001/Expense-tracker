/*
  Warnings:

  - You are about to drop the column `paid_via` on the `Subscription` table. All the data in the column will be lost.
  - Added the required column `active` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Paid" AS ENUM ('monthly', 'yearly');

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "paid_via",
ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "cancelled_at" TIMESTAMP(3),
ADD COLUMN     "paid" "Paid" NOT NULL DEFAULT 'monthly',
ADD COLUMN     "renewal_date" TIMESTAMP(3),
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "url" TEXT NOT NULL;
