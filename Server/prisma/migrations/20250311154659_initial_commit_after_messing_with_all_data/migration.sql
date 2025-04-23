-- CreateEnum
CREATE TYPE "OrderServingTypeOptions" AS ENUM ('EATIN', 'DELIVERY');

-- CreateEnum
CREATE TYPE "paymentTransactionMethod" AS ENUM ('CASH', 'ONLINE');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "OrderServingType" "OrderServingTypeOptions" NOT NULL DEFAULT 'EATIN',
ADD COLUMN     "customerEmail" TEXT NOT NULL DEFAULT 'anonymous@example.com',
ADD COLUMN     "customerName" TEXT NOT NULL DEFAULT 'Anonymous',
ADD COLUMN     "paymentMethod" "paymentTransactionMethod" NOT NULL DEFAULT 'CASH';
