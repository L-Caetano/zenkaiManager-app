import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";
import { MatchesService } from 'src/app/services/matchesService';

@Component({
  selector: 'app-reportar-resultado',
  templateUrl: './reportar-resultado.component.html',
  styleUrls: ['./reportar-resultado.component.scss'],
  imports: [IonicModule],
})
export class ReportarResultadoComponent implements OnInit {
  @Input() match: any;
  public result = {
    scoreA: 0,
    scoreB: 0
  }
  constructor(private modalCtrl: ModalController, private matchesService: MatchesService) { }
  increaseScore(type: string) {
    if (type == "A" && this.result.scoreA < 3)
      this.result.scoreA++
    else if (type == "B" && this.result.scoreB < 3)
      this.result.scoreB++
  }
  decreaseScore(type: string) {
    if (type == "A" && this.result.scoreA > 0)
      this.result.scoreA--
    else if (type == "B" && this.result.scoreB > 0)
      this.result.scoreB--

  }
  ngOnInit() { console.log("teste3333", this.match) }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  reportResult() {
    this.matchesService.finishMatch(this.match.id, this.result.scoreA, this.result.scoreB).then((r: any) => {
      console.log("works")
    })
  }
  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }

}
