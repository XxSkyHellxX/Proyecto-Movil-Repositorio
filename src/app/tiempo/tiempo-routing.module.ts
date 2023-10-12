import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiempoPage } from './tiempo.page';

const routes: Routes = [
  {
    path: '',
    component: TiempoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiempoPageRoutingModule {}
