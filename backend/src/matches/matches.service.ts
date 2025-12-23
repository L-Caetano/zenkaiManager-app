import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Match } from './match.model';
import { randomUUID } from 'crypto';
import { PlayersService } from '../players/players.service';

@Injectable()
export class MatchesService {
  private matches: Match[] = [];

  constructor(
    private playersService: PlayersService,
    private prisma: PrismaService,
  ) { }

  create(tournamentId: string, playerA: string, playerB: string): Match {
    const match = new Match(randomUUID(), tournamentId, playerA, playerB);
    this.matches.push(match);
    return match;
  }

  findByTournament(tournamentId: string): Match[] {
    return this.matches.filter((m) => m.tournamentId === tournamentId);
  }

  async finishMatch(matchId: number, scoreA: number, scoreB: number) {
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    if (match.finished) {
      throw new BadRequestException('Match already finished');
    }

    // Atualiza a partida
    await this.prisma.match.update({
      where: { id: matchId },
      data: {
        scoreA,
        scoreB,
        finished: true,
      },
    });

    // Pontuação
    if (scoreA > scoreB) {
      await this.prisma.player.update({
        where: { id: match.playerAId },
        data: { pts: { increment: 3 } },
      });
    } else if (scoreB > scoreA) {
      await this.prisma.player.update({
        where: { id: match.playerBId },
        data: { pts: { increment: 3 } },
      });
    } else {
      await Promise.all([
        this.prisma.player.update({
          where: { id: match.playerAId },
          data: { pts: { increment: 1 } },
        }),
        this.prisma.player.update({
          where: { id: match.playerBId },
          data: { pts: { increment: 1 } },
        }),
      ]);
    }

    return { message: 'Match finished and points updated' };
  }
}
