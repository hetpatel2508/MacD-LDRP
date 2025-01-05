/*
  Warnings:

  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Food_type" AS ENUM ('VEG', 'NONVEG', 'EGG', 'FISH');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "foodType" "Food_type" NOT NULL DEFAULT 'VEG',
ADD COLUMN     "image" TEXT NOT NULL;
