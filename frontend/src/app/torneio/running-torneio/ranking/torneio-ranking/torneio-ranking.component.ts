import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

import { Player } from 'src/app/models/player';
@Component({
  selector: 'app-torneio-ranking',
  templateUrl: './torneio-ranking.component.html',
  styleUrls: ['./torneio-ranking.component.scss'],

  imports: [IonicModule, CommonModule]
})
export class TorneioRankingComponent implements OnInit {

  public players: Player[] = [new Player('teste'), new Player('teste22'), new Player('test9'), new Player('teste26')];
  constructor() { }

  ngOnInit() { }

}
