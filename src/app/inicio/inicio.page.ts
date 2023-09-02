import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit{

  constructor(private rutas:AppRoutingModule) {
  }
  
  menu:boolean=true;
  mensaje:boolean=false;

  evento(){
    this.menu=false;
    this.mensaje=true;
  }

  componentes=this.rutas.componentes;

  ngOnInit() {
  }
}
