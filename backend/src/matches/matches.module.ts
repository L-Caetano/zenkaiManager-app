import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { PlayersModule } from '../players/players.module';
@Module({
  controllers: [MatchesController],
  providers: [MatchesService],
  imports: [PlayersModule],
  exports: [MatchesService]
})
export class MatchesModule { }
