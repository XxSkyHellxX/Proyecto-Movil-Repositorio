import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.page.html',
  styleUrls: ['./acerca-de.page.scss'],
})
export class AcercaDePage implements OnInit {

  constructor(private rutas:AppRoutingModule) { }

  componentes=this.rutas.componentes;
  ngOnInit() {
  }

}
