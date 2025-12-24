import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "src/app/header/header.component";
import { TournamentService } from 'src/app/services/tournamentService';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-criar-torneio',
  templateUrl: './criar-torneio.page.html',
  styleUrls: ['./criar-torneio.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent, ReactiveFormsModule]
})
export class CriarTorneioPage implements OnInit {
  public form = this.fb.group({
    playerControl: [''],
  });
  public tForm = this.fb.group({
    name: [''],
  });
  public rodadas: number = 1;
  public topCut: number = 2
  public timer: number = 0
  public players: string[] = [];
  public name: string = ""
  public id?: number | null = null;

  constructor(private fb: FormBuilder, private tournamentService: TournamentService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const requestNumber = this.activatedRoute.snapshot.paramMap.get('id')
    if (requestNumber) {
      this.id = Number(requestNumber);
      this.tournamentService.getTournamentSettings(this.id).then((r: any) => {
        console.log("rrr", r)
        this.tForm.controls.name.setValue(r.name)
        this.topCut = r.playOff != null ? r.playOff : 0
        this.timer = r.timer
        this.rodadas = r.rodadas
      })
    }
  }
  addPlayer() {
    const player = this.form.controls.playerControl.value;

    if (!player) return;
    if (!this.id) return;

    this.tournamentService.addNewPlayerToTournament(player, this.id).then(r => {
      this.players.push(r);
    })
  }
  removePlayer(i: number) {
    this.players.splice(i, 1)
  }
  timerChange() {
    this.timer == 0 ? this.timer = 50 : this.timer = 0
  }
  createTournament() {
    const name: string = this.tForm.controls['name'].value?.toString() != undefined ? this.tForm.controls['name'].value?.toString() : "teste"
    this.tournamentService.createTournament(name, this.timer, this.rodadas, this.topCut).then(r => {
      this.id = r.id;
      this.router.navigate(['/criarTorneio', this.id]);
    })
  }

  incrementRodadas() {
    this.rodadas++;
  }

  decrementRodadas() {
    if (this.rodadas > 1) {
      this.rodadas--;
    }
  }
}
