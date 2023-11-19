import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificarDatosPage } from './modificar-datos.page';

const routes: Routes = [
  {
    path: '',
    component: ModificarDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificarDatosPageRoutingModule {}
