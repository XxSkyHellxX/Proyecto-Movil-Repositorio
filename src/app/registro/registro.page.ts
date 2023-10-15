import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesDatosService, Datos } from '../servicio/services-datos.service';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  datos: Datos[] = [];
  newDato: Datos = <Datos>{};
  block: boolean = true;

  @ViewChild('myList') myList: IonList;

  
  constructor(private storageService: ServicesDatosService,
    private plt: Platform, private toastController: ToastController,private router:Router) {
    this.plt.ready().then(() => {
      this.loadDatos();
    })
    this.myList = {} as IonList
  }

  ngOnInit() {

  }

  loadDatos() {
    this.storageService.getDatos().then(datos => {
      this.datos = datos;
    });
  }

  addDatos() {
    this.newDato.modified = Date.now();
    this.newDato.id = Date.now();
    this.storageService.addDatos(this.newDato).then(dato => {
      this.newDato = <Datos>{};
      this.loadDatos();
    })
    
    console.log('datos enviados')

  }
  deleteDatos(dato: Datos) {
    this.storageService.deleteDatos(dato.id).then(item => {
      this.myList.closeSlidingItems();
      this.loadDatos();
    })
  }

}

