import { Component, OnInit, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

import { RankingService } from 'src/app/services/rankingService';
@Component({
  selector: 'app-torneio-ranking',
  templateUrl: './torneio-ranking.component.html',
  styleUrls: ['./torneio-ranking.component.scss'],

  imports: [IonicModule, CommonModule]
})
export class TorneioRankingComponent implements OnInit {
  @Input() public players!: any[]
  constructor(private rankingService: RankingService) { }

  ngOnInit() {
  }

}
