import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private rutas:AppRoutingModule) { }

  componentes=this.rutas.componentes;
  usuario = this.rutas.usuario;
  tabs = this.rutas.tabs;
  
  ngOnInit() {
  }


}
