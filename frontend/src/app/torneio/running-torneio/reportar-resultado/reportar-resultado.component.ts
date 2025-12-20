import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-reportar-resultado',
  templateUrl: './reportar-resultado.component.html',
  styleUrls: ['./reportar-resultado.component.scss'],
  imports: [IonicModule],
})
export class ReportarResultadoComponent  implements OnInit {

 constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');
  }
  ngOnInit() {}

}
