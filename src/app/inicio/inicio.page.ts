import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit{

  constructor() {
  }
  
  menu:boolean=true;

  componentes=[
    {
      icon:'person-outline',
      name:'Perfil',
      redirecTo:'/'
    },
    {
      icon:'help-outline',
      name:'Acerca De',
      redirecTo:'/acerca-de'
    }
  ];

  ngOnInit() {
  }
}
