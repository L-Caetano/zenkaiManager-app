import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "src/app/header/header.component";
import { TournamentService } from 'src/app/services/tournamentService';
@Component({
  selector: 'app-criar-torneio',
  templateUrl: './criar-torneio.page.html',
  styleUrls: ['./criar-torneio.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent, ReactiveFormsModule]
})
export class CriarTorneioPage implements OnInit {
  form = this.fb.group({
    playerControl: [''],
  });
  tForm = this.fb.group({
    name: [''],
  });


  constructor(private fb: FormBuilder, private tournamentService: TournamentService) { }
  public rodadas: number = 1;
  public topCut: number = 2
  public timer: number = 0
  public players: string[] = [];
  public name: string = ""
  ngOnInit() {
  }
  addPlayer() {
    const player = this.form.controls.playerControl.value;

    if (!player) return;

    this.players.push(player);
  }
  removePlayer(i: number) {
    this.players.splice(i, 1)
  }
  timerChange() {

    this.timer == 0 ? this.timer = 50 : this.timer = 0
  }
  createTournament() {
    this.tournamentService.createTournament(this.name, this.timer, this.rodadas)
  }
}
