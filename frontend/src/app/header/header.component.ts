import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from "@ionic/angular";
import { CommonModule, Location } from '@angular/common';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class HeaderComponent {
  @Input() title?: string;
  @Input() showBack = false;
  @Input() showLogo = true;

  constructor(private location: Location, private router: Router) { }

  goBack() {
    this.location.back();
  }
  goHome() {
    this.router.navigate(['home']);
  }
}
