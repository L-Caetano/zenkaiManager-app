
import { IonicModule, ModalController } from '@ionic/angular';
import { Input, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Match, MatchesService } from '../../../services/matchesService';
import { CommonModule } from '@angular/common';
import { ReportarResultadoComponent } from '../reportar-resultado/reportar-resultado.component';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss'],
  imports: [CommonModule, IonicModule]
})
export class MatchesComponent implements OnInit {
  @Input() matches: Match[] = [];

  constructor(
    private route: ActivatedRoute,
    private matchesService: MatchesService,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async reportarResultado(i: number) {
    const modal = await this.modalCtrl.create({
      component: ReportarResultadoComponent,
      componentProps: {
        'match': this.matches[i]
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      //    this.message = `Hello, ${data}!`;
    }
  }

  loadMatches() {

  }

}
