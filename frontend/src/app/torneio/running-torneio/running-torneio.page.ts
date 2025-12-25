import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/header/header.component';
import { Match } from 'src/app/models/match';
import { ReportarResultadoComponent } from './reportar-resultado/reportar-resultado.component';
import { MatchesComponent } from './matches/matches.component';
import { TorneioRankingComponent } from './ranking/torneio-ranking/torneio-ranking.component';
import { TournamentService } from 'src/app/services/tournamentService';

@Component({
  selector: 'app-running-torneio',
  templateUrl: './running-torneio.page.html',
  styleUrls: ['./running-torneio.page.scss'],
  standalone: true,
  imports: [CommonModule, TorneioRankingComponent, MatchesComponent, IonicModule, HeaderComponent]

})
export class RunningTorneioPage implements OnInit {
  public rodadas: number = 0;
  public topCut: number = 0;
  public timer: number = 0;
  public name: string = '';
  public matches: Match[] = []

  constructor(private modalCtrl: ModalController, private activatedRoute: ActivatedRoute, private tournamentService: TournamentService) { }

  ngOnInit() {
    const tournamentId = this.activatedRoute.snapshot.paramMap.get('id')
    this.tournamentService.getTournament(Number(tournamentId)).then((r: any) => {
      console.log('teste', r)
      this.rodadas = r.rodadas;
      this.timer = r.timer
      this.name = r.name
      this.topCut = r.playOff
    })
  }

  async reportarResultado() {
    const modal = await this.modalCtrl.create({
      component: ReportarResultadoComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //    this.message = `Hello, ${data}!`;
    }
  }



}
