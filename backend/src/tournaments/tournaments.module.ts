import { Module } from '@nestjs/common';
import { MatchesModule } from 'src/matches/matches.module';
import { TournamentsController } from './tournaments.controller';
import { TournamentsService } from './tournaments.service';
import { RoundModule } from 'src/round/round.module';

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService],
  imports: [MatchesModule, RoundModule]
})
export class TournamentsModule { }
