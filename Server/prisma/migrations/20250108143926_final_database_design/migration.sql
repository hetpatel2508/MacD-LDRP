/*
  Warnings:

  - You are about to drop the column `itemType` on the `MealItem` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `MealItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meal" ALTER COLUMN "quantity" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MealItem" DROP COLUMN "itemType",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "MealItemsType";

-- AddForeignKey
ALTER TABLE "MealItem" ADD CONSTRAINT "MealItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
