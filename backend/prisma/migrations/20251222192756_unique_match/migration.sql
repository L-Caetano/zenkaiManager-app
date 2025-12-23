/*
  Warnings:

  - A unique constraint covering the columns `[tournamentId,playerAId,playerBId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Match_tournamentId_playerAId_playerBId_key" ON "Match"("tournamentId", "playerAId", "playerBId");
