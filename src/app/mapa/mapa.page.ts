import { Component, OnInit } from '@angular/core';
import { CoordInfo, Marker } from '../servicio/services-datos.service';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map = null;

  //coordInfo:CoordInfo=null;
  usuario = this.rutas.usuarioFireBase

  latitud= (this.rutas.destinoConductor['latitud'])
  longitud= (this.rutas.destinoConductor['longitud'])

  componentes=this.rutas.componentes;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  constructor(private rutas:AppRoutingModule, private afAuth: AngularFireAuth, private navCtrl: NavController) { }

  ngOnInit() {
    this.loadMap(this.latitud,this.longitud)

    console.log(this.usuario)
  }

  //, 

  loadMap(latitude:number,longitud:number) {
    const mapEle = document.getElementById('map');

    const myLatLng={
      lat: latitude,
      lng: longitud
    }

    const marker:Marker={
      position:{
        lat:latitude,
        lng:longitud
      }
    }


    this.map = new google.maps.Map(mapEle,{
      center:myLatLng,
      zoom:12
    })

    this.directionsDisplay.setMap(this.map)

    google.maps.event.addListenerOnce(this.map,'idle',()=>{
      this.addMarker()
      mapEle?.classList.add('show-map')
      this.calculateRoute(marker)
    })
    
  }

  calculateRoute(marker:Marker){
    this.directionsService.route({
      origin: { lat:-33.51081202583109, lng:-70.75242782698344},
      destination: marker.position,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response:any, status:any)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
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
  
  //Añadir marcador para poner el destino del pasajero 

  addMarker(){
    for(let i=0;i<this.usuario.length;i++){
      let elemento = this.usuario[i]

      const marker:Marker={
        position:{
          lat:elemento['destino']['latitud'],
          lng:elemento['destino']['longitud']
        }
      }

      return new google.maps.Marker({
        position:marker.position,
        map:this.map,
        title:"Tu Destino"
      })

    }
  }
  

}

