-- CreateEnum
CREATE TYPE "RoundType" AS ENUM ('SWISS', 'PLAYOFF');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "eliminated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "type" "RoundType" NOT NULL DEFAULT 'SWISS';
