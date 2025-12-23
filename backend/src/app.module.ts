import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { MatchesModule } from './matches/matches.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PlayersModule, MatchesModule, TournamentsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
