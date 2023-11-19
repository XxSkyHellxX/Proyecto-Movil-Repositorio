import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicio/api.service';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.page.html',
  styleUrls: ['./tiempo.page.scss'],
})
export class TiempoPage implements OnInit {
  data: any = {}; //Se usa para almacenar los datos recuperados de la API.
  constructor(private apiService: ApiService, private rutas: AppRoutingModule, private afAuth: AngularFireAuth,
    private navCtrl: NavController) { }
  //Se crea una instancia de tipo ApiService para realizar solicitudes a la api.

  componentes = this.rutas.componentes;
  usuario = this.rutas.usuarioFireBase

  ngOnInit() {
    this.llenarData();//Aqui simplemente se llama al metodo llenarData.

  }


  llenarData() { // lo que hace este metodo es realizar una solicitud HTTP a travez del servicio ApiService
    this.apiService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    })

    /*
      Este metodo es el encargado de obtener datos de la API utilizando el servicio ApiService
    
    this.apiService.getData(): Aquí se llama al método getData() del servicio apiService. 
                              Este método es el que se define en la clase ApiService que mencionaste anteriormente y 
                              que realiza una solicitud HTTP GET a una URL específica (la URL de la API definida en ApiService).

    .subscribe: Se utilizar para subscribirse a un flujo de datos observables, en este caso al respuesta de la solicitud HTTP.

    data => : En este contexto data es la respuesta de la solicitud HTTP, que es un objeto que contiene los datos obtenidos

    this.data=data : Aqui se llenamos el arreglo data[] con los datos obtenidos que se almacenan dentro de el objeto data
    */
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
