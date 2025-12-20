import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarTorneioPage } from './criar-torneio.page';

const routes: Routes = [
  {
    path: '',
    component: CriarTorneioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarTorneioPageRoutingModule {}
