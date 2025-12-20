import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/header/header.component';
import { Match } from 'src/app/models/match';
import { Player } from 'src/app/models/player';
import { ReportarResultadoComponent } from './reportar-resultado/reportar-resultado.component';

@Component({
  selector: 'app-running-torneio',
  templateUrl: './running-torneio.page.html',
  styleUrls: ['./running-torneio.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent]

})
export class RunningTorneioPage implements OnInit {
  public rodadas:number = 1;
  public topCut:number = 2;
  public timer:number = 50;
  public players:Player[] = [ new Player('teste'), new Player('teste22'), new Player('test9'), new Player('teste26') ];
  public matches:Match[] = []

public generateSwissRound(players: Player[]){
  const sorted = [...players].sort((a, b) => b.pts - a.pts);
  const matches: Match[] = [];
  const used = new Set<Player>();

  for (let i = 0; i < sorted.length; i++) {
    if (used.has(sorted[i])) continue;

    for (let j = i + 1; j < sorted.length; j++) {
      if (used.has(sorted[j])) continue;
      if (!sorted[i].hasPlayedAgainst(sorted[j])) {
        matches.push(new Match(sorted[i], sorted[j]));
        sorted[i].registerMatch(sorted[j]);
        sorted[j].registerMatch(sorted[i]);
        used.add(sorted[i]);
        used.add(sorted[j]);
        break;
      }
    }
  }
  console.log(matches)
  this.matches= matches;
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
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.generateSwissRound(this.players)
  }

}
