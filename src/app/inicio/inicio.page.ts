import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { LoginPage } from '../login/login.page';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit{

  constructor(private rutas:AppRoutingModule,private user:LoginPage){
  }  

  menu:boolean=true;
  mensaje:boolean=false;
  nombre:any;
  evento(){
    this.menu=false;
    this.mensaje=true;
  }

  componentes=this.rutas.componentes;
  usuario=this.rutas.usuario;

  ngOnInit() {

  }
}
