import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesDatosService, Datos } from '../servicio/services-datos.service';
import { Platform, ToastController } from '@ionic/angular';
import { IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  datos: Datos[] = [];

  @ViewChild('correo', { static: false }) correo: IonInput;
  @ViewChild('pass', { static: false }) pass: IonInput;

  mensaje: string = '';
  bloqueo: boolean = true;
  boton: boolean = true;

  constructor(private router: Router, private storageService: ServicesDatosService,
    private plt: Platform, private ruta: AppRoutingModule) {
    this.plt.ready().then(() => {
      this.loadDatos();
    })
    this.correo = {} as IonInput
    this.pass = {} as IonInput
  }

  ngOnInit() {
    this.bloqueo = true
  }

  loadDatos() {
    this.storageService.getDatos().then(datos => {
      this.datos = datos;
    });
  }

  login() {
    for (let i = 0; i < this.datos.length; i++) {
      if (this.correo.value == this.datos[i].correo) {
        if (this.pass.value == this.datos[i].pass) {
          this.correo.value = "";
          this.pass.value = "";
          this.bloqueo = true;
          this.ruta.usuario.push(this.datos[i])
          this.router.navigate(['/inicio'])
        } else {
          this.bloqueo = false
        }
      } else {
        this.bloqueo = false;
      }
    }
  }
}
