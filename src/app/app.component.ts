import { Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private rutas:AppRoutingModule) {}
  componentes= this.rutas.componentes
}
