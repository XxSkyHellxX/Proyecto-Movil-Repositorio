import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { LoginPage } from '../login/login.page';
import { ServicesDatosService } from '../servicio/services-datos.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { error } from 'console';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {

  constructor(private rutas: AppRoutingModule, private user: LoginPage, private storageService: ServicesDatosService,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController) {
  }


  menu: boolean = true;
  mensaje: boolean = false;
  nombre: any;

  vehiculo = this.rutas.vehiculos
  componentes = this.rutas.componentes;
  usuario = this.rutas.usuarioFireBase;

  ngOnInit() {
  }

  cerrarSesion() {
    this.afAuth.signOut()
      .then(() => {
        console.log('Sesión cerrada exitosamente');
        this.navCtrl.navigateRoot("/login")
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  }


  


}


