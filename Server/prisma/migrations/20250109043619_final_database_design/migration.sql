/*
  Warnings:

  - Added the required column `price` to the `MealItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `MealItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MealItem_mealId_productId_key";

-- AlterTable
ALTER TABLE "MealItem" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
