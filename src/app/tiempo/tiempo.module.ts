import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiempoPageRoutingModule } from './tiempo-routing.module';

import { TiempoPage } from './tiempo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiempoPageRoutingModule
  ],
  declarations: [TiempoPage]
})
export class TiempoPageModule {}
