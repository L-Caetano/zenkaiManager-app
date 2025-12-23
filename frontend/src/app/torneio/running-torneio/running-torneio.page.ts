import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/header/header.component';
import { Match } from 'src/app/models/match';
import { ReportarResultadoComponent } from './reportar-resultado/reportar-resultado.component';
import { MatchesComponent } from './matches/matches.component';
import { TorneioRankingComponent } from './ranking/torneio-ranking/torneio-ranking.component';

@Component({
  selector: 'app-running-torneio',
  templateUrl: './running-torneio.page.html',
  styleUrls: ['./running-torneio.page.scss'],
  standalone: true,
  imports: [CommonModule, TorneioRankingComponent, MatchesComponent, IonicModule, HeaderComponent]

})
export class RunningTorneioPage implements OnInit {
  public rodadas: number = 1;
  public topCut: number = 2;
  public timer: number = 50;
  public matches: Match[] = []


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
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

}
