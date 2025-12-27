import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { PlayersModule } from '../players/players.module';
import { MatchRepository } from './match.repository';
@Module({
  controllers: [MatchesController],
  providers: [MatchesService, MatchRepository],
  imports: [PlayersModule],
  exports: [MatchesService, MatchRepository],
})
export class MatchesModule {}
