import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunningTorneioPage } from './running-torneio.page';

const routes: Routes = [
  {
    path: '',
    component: RunningTorneioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunningTorneioPageRoutingModule {}
