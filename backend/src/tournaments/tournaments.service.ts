import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TournamentsService {
  constructor(private prisma: PrismaService) { }

  async getMatches(tournamentId: number) {
    const tournamentExists = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      select: { id: true },
    });

    if (!tournamentExists) {
      throw new NotFoundException('Tournament not found');
    }

    return this.prisma.match.findMany({
      where: { tournamentId },
      orderBy: [
        { finished: 'asc' }, // não finalizados primeiro
        { createdAt: 'asc' },
      ],
      include: {
        playerA: {
          select: { id: true, name: true },
        },
        playerB: {
          select: { id: true, name: true },
        },
      },
    });
  }

  async create(name: string) {
    return this.prisma.tournament.create({
      data: { name },
    });
  }

  async addPlayers(tournamentId: number, playerIds: number[]) {
    return this.prisma.tournament.update({
      where: { id: tournamentId },
      data: {
        players: {
          connect: playerIds.map((id) => ({ id })),
        },
      },
      include: {
        players: true,
      },
    });
  }
  async generateMatches(tournamentId: number) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: { players: true },
    });

    if (!tournament) {
      throw new BadRequestException('Tournament not found');
    }

    const players = tournament.players;

    if (players.length < 2) {
      throw new BadRequestException('Not enough players');
    }

    const matches: {
      playerAId: number;
      playerBId: number;
      tournamentId: number;
    }[] = [];

    // ROUND-ROBIN

    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const a = players[i].id;
        const b = players[j].id;

        matches.push({
          playerAId: Math.min(a, b),
          playerBId: Math.max(a, b),
          tournamentId: tournament.id,
        });
      }
    }

    await this.prisma.match.createMany({
      data: matches,
      skipDuplicates: true,
    });

    return {
      tournamentId,
      matchesGenerated: matches.length,
    };
  }
}
