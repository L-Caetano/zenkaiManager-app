import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateTournamentSettingsDto } from '../../DTOs/update-tournament-settings.dto';
import { RoundService } from 'src/round/round.service';
import { MatchesService } from 'src/matches/matches.service';

import { Prisma } from '@prisma/client';
import { TournamentsRepository } from './tournament.repository';
import { RoundRepository } from 'src/round/round.repository';
import { MatchRepository } from 'src/matches/match.repository';
@Injectable()
export class TournamentsService {
  constructor(
    private prisma: PrismaService,
    private matchRepo: MatchRepository,
    private matchesService: MatchesService,
    private roundService: RoundService,
    private roundRepo: RoundRepository,
    private tournamentRepo: TournamentsRepository,
  ) {}

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

  async generateSwissRound(tournamentId: number) {
    const tournament =
      await this.tournamentRepo.getTournamentAndAllRounds(tournamentId);
    if (!tournament) {
      throw new Error('Tournament not found');
    }
    const nextRoundNumber = tournament.rounds.length + 1;
    if (nextRoundNumber > tournament.rodadas) {
      throw new Error('limite de rodadas excedido');
    }
    if (tournament.rounds.length > 0) {
      const currentRound = tournament.rounds
        .sort((a, b) => a.number - b.number)
        .find((round) => !round.finished);

      if (!currentRound) {
        throw new BadRequestException('No active round found');
      }

      const unfinishedMatches = await this.matchRepo.countUnfinishedMatches(
        currentRound.id,
      );

      if (unfinishedMatches > 0) {
        throw new BadRequestException(
          'All matches must be finished before generating the next swiss round',
        );
      }
      await this.roundRepo.updateFinishRound(currentRound.id);
    }

    const round = await this.roundRepo.createNewRound(
      nextRoundNumber,
      tournament.id,
    );

    // Histórico de confrontos
    const played = new Set<string>();
    tournament.rounds.forEach((r) => {
      r.matches.forEach((m) => {
        played.add([m.playerAId, m.playerBId].sort().join('-'));
      });
    });

    const players = [...tournament.players];

    const matches: Prisma.MatchCreateManyInput[] = [];

    while (players.length >= 2) {
      const p1 = players.shift();
      if (!p1) break;

      let opponentIndex = players.findIndex(
        (p) => !played.has([p1.id, p.id].sort().join('-')),
      );

      if (opponentIndex === -1) opponentIndex = 0;

      const p2 = players.splice(opponentIndex, 1)[0];
      if (!p2) break;

      matches.push({
        roundId: round.id,
        playerAId: p1.id,
        playerBId: p2.id,
      });
    }

    // Bye
    if (players.length === 1) {
      await this.prisma.player.update({
        where: { id: players[0].id },
        data: { pts: { increment: 1 } },
      });
    }

    await this.matchRepo.createManyMatches(matches);

    return {
      round,
      matchesCreated: matches.length,
    };
  }

  async getTournament(id: number) {
    const tournament =
      await this.tournamentRepo.getTournamentAndCurrentRound(id);
    return tournament;
  }

  async getTournamentSettings(tournamentId: number) {
    const tournament =
      await this.tournamentRepo.getTournamentSetting(tournamentId);

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
    try {
      return await this.tournamentRepo.updateTournamentSettings(
        tournamentId,
        data,
      );
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Tournament not found');
      }
      throw e;
    }
  }

  async removePlayers(tournamentId: number, playerIds: number[]) {
    try {
      return await this.prisma.$transaction([
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
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Tournament not found');
      }
      throw e;
    }
  }

  async getAllTournaments() {
    return await this.tournamentRepo.getAllTournamentsSettings();
  }
}
