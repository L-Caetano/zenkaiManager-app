/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "createdAt";

-- CreateTable
CREATE TABLE "_TournamentPlayers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TournamentPlayers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TournamentPlayers_B_index" ON "_TournamentPlayers"("B");

-- AddForeignKey
ALTER TABLE "_TournamentPlayers" ADD CONSTRAINT "_TournamentPlayers_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TournamentPlayers" ADD CONSTRAINT "_TournamentPlayers_B_fkey" FOREIGN KEY ("B") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
