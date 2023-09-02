import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.page.html',
  styleUrls: ['./acerca-de.page.scss'],
})
export class AcercaDePage implements OnInit {

  constructor() { }
  componentes=[
    {
      icon: 'home',
      name: ' Inicio',
      redirecTo: '/inicio'
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
