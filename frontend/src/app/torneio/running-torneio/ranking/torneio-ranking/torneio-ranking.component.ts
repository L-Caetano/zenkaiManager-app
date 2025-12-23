import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

import { Player } from 'src/app/models/player';
import { RankingService } from 'src/app/services/rankingService';
@Component({
  selector: 'app-torneio-ranking',
  templateUrl: './torneio-ranking.component.html',
  styleUrls: ['./torneio-ranking.component.scss'],

  imports: [IonicModule, CommonModule]
})
export class TorneioRankingComponent implements OnInit {
  public tournamentId!: number
  public players: any[] = [new Player('teste'), new Player('teste22'), new Player('test9'), new Player('teste26')];
  constructor(private rankingService: RankingService) { }

  ngOnInit() {
    this.tournamentId = 1;
    this.getPlayers()
  }
  getPlayers() {
    this.rankingService.getTournamentPlayers(
      this.tournamentId
    ).then((r: any[]) => {
      this.players = r
      console.log(this.players)
    });
  }
}
