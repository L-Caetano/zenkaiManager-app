import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'torneio/criar/:id',
    loadComponent: () => import('./torneio/criar-torneio/criar-torneio.page').then(m => m.CriarTorneioPage)
  },
  {
    path: 'torneio/criar',
    loadComponent: () => import('./torneio/criar-torneio/criar-torneio.page').then(m => m.CriarTorneioPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'torneio/running/:id',
    loadComponent: () => import('./torneio/running-torneio/running-torneio.page').then(m => m.RunningTorneioPage)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
