import { Module } from '@nestjs/common';
import { MatchesModule } from 'src/matches/matches.module';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { RoundModule } from 'src/round/round.module';
import { TournamentsRepository } from './tournament.repository';
import { RoundRepository } from 'src/round/round.repository';

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService, TournamentsRepository, RoundRepository],
  imports: [MatchesModule, RoundModule],
})
export class TournamentsModule {}
