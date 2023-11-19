import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarVehiculoPage } from './buscar-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarVehiculoPageRoutingModule {}
