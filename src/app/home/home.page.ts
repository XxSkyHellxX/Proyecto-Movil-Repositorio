import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesDatosService } from '../servicio/services-datos.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router:Router,private service:ServicesDatosService) {}
  ngOnInit(){


   setTimeout(() => {
      this.router.navigate(['/login']);
    }, 4000);
  }


}
