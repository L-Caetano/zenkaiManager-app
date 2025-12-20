import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from "src/app/header/header.component";

@Component({
  selector: 'app-criar-torneio',
  templateUrl: './criar-torneio.page.html',
  styleUrls: ['./criar-torneio.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent,ReactiveFormsModule]
})
export class CriarTorneioPage implements OnInit {
form = this.fb.group({
    playerControl: [''],
  });

  constructor(private fb: FormBuilder)
 { }
  public rodadas:number = 1;
  public topCut:number = 2
  public timer:number = 0
  public players: string[] = [];

  ngOnInit() {
  }
  addPlayer(){
  const player = this.form.controls.playerControl.value;

if (!player) return;

this.players.push(player);
}
  timerChange(){

    this.timer == 0 ? this.timer = 50 : this.timer = 0
  }
}
