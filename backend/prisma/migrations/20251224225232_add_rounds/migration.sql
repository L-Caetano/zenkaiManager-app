/*
  Warnings:

  - You are about to drop the column `tournamentId` on the `Match` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roundId,playerAId,playerBId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roundId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_tournamentId_fkey";

-- DropIndex
DROP INDEX "Match_tournamentId_playerAId_playerBId_key";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "tournamentId",
ADD COLUMN     "roundId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tournamentId" INTEGER NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Round_tournamentId_number_key" ON "Round"("tournamentId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Match_roundId_playerAId_playerBId_key" ON "Match"("roundId", "playerAId", "playerBId");

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
