import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificarDatosPageRoutingModule } from './modificar-datos-routing.module';

import { ModificarDatosPage } from './modificar-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificarDatosPageRoutingModule
  ],
  declarations: [ModificarDatosPage]
})
export class ModificarDatosPageModule {}
