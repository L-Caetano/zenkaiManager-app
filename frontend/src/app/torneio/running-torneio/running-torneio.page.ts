import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/header/header.component';
import { MatchesComponent } from './matches/matches.component';
import { TorneioRankingComponent } from './ranking/torneio-ranking/torneio-ranking.component';
import { TournamentService } from 'src/app/services/tournamentService';

import { TournamentEntity } from 'src/app/models/tournament';
import { RoundEntity } from 'src/app/models/round';
@Component({
  selector: 'app-running-torneio',
  templateUrl: './running-torneio.page.html',
  styleUrls: ['./running-torneio.page.scss'],
  standalone: true,
  imports: [CommonModule, TorneioRankingComponent, MatchesComponent, IonicModule, HeaderComponent]

})
export class RunningTorneioPage implements OnInit {

  public tournament: TournamentEntity =
    {
      id: 0,
      name: '',
      timer: 0,
      rodadas: 0,
      playOff: 0,
      createdAt: new Date(),
      players: [],
      rounds: [],
    };
  constructor(private activatedRoute: ActivatedRoute, private tournamentService: TournamentService) { }

  getCurrentRound(): RoundEntity {
    if (!this.tournament?.rounds || this.tournament.rounds.length === 0) {
      return {
        id: 0,
        number: 0,        // rodada 1,2,3...
        finished: false,
        createdAt: new Date()

      }

    }
    const current = this.tournament.rounds.find(r => !r.finished);

    return current ?? this.tournament.rounds[this.tournament.rounds.length - 1];
  }
  ngOnInit() {
    const tournamentId = this.activatedRoute.snapshot.paramMap.get('id')
    this.tournamentService.getTournament(Number(tournamentId)).then((r: TournamentEntity) => {
      console.log('testaaaaaae', r)
      this.tournament = r;
    })
  }
  gerarNovaRodada() {
    this.tournamentService.gerarRound(this.tournament.id)
  }




}
