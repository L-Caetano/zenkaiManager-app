import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTournamentSettingsDto } from '../../DTOs/update-tournament-settings.dto';
@Injectable()
export class TournamentsService {
  constructor(private prisma: PrismaService) { }

  async getPlayers(tournamentId: number) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        players: {
          orderBy: {
            pts: 'desc',
          },
        },
      },
    });

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    return tournament.players;
  }

  async getMatches(tournamentId: number) {
    const tournamentExists = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      select: { id: true },
    });

    if (!tournamentExists) {
      throw new NotFoundException('Tournament not found');
    }

    return this.prisma.match.findMany({
      where: {
        round: {
          tournamentId,
        },
      },
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

  async create(name: string, timer: number, rodadas: number, playOff: number) {
    return this.prisma.tournament.create({
      data: { name, timer, rodadas, playOff },
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

    const round = await this.prisma.round.create({
      data: {
        number: 1,
        tournamentId: tournament.id,
      },
    });
    const matches: {
      playerAId: number;
      playerBId: number;
      roundId: number;
    }[] = [];

    // ROUND-ROBIN

    for (let i = 0; i < players.length; i++) {
      for (let j = i + 1; j < players.length; j++) {
        const a = players[i].id;
        const b = players[j].id;


        matches.push({
          playerAId: Math.min(a, b),
          playerBId: Math.max(a, b),
          roundId: round.id,
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

  async getTournamentSettings(tournamentId: number) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      select: {
        id: true,
        name: true,
        rodadas: true,
        playOff: true,
        timer: true,
      },
    });

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    return tournament;
  }

  async createPlayerAndAddToTournament(
    tournamentId: number,
    playerName: string,
  ) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
    });

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    if (!playerName || playerName.trim().length === 0) {
      throw new BadRequestException('Player name is required');
    }

    const player = await this.prisma.player.create({
      data: {
        name: playerName,
        tournaments: {
          connect: { id: tournamentId },
        },
      },
    });

    return player;
  }
  async updateSettings(
    tournamentId: number,
    data: UpdateTournamentSettingsDto,
  ) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      select: { id: true },
    });

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    return this.prisma.tournament.update({
      where: { id: tournamentId },
      data,
      select: {
        id: true,
        name: true,
        rodadas: true,
        playOff: true,
        timer: true,
      },
    });
  }

  async removePlayers(tournamentId: number, playerIds: number[]) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id: tournamentId },
      select: { id: true },
    });

    if (!tournament) {
      throw new NotFoundException('Tournament not found');
    }

    return this.prisma.$transaction([
      this.prisma.tournament.update({
        where: { id: tournamentId },
        data: {
          players: {
            disconnect: playerIds.map((id) => ({ id })),
          },
        },
      }),

      this.prisma.player.deleteMany({
        where: {
          id: { in: playerIds },
        },
      }),
    ]);
  }
}
