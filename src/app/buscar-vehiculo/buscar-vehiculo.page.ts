import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, NavController } from '@ionic/angular';
import { ServicesDatosService, vehiculo } from '../servicio/services-datos.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-buscar-vehiculo',
  templateUrl: './buscar-vehiculo.page.html',
  styleUrls: ['./buscar-vehiculo.page.scss'],
})
export class BuscarVehiculoPage implements OnInit {

  constructor(private rutas: AppRoutingModule, private afAuth: AngularFireAuth, private navCtrl: NavController, private firestore: AngularFirestore, private storageService: ServicesDatosService) { }

  componentes = this.rutas.componentes
  usuario = this.rutas.usuarioFireBase
  usuarioVehiculo = this.rutas.usuarioVehiculo
  vehiculos = this.rutas.vehiculos
  nuevosDatos: any = {}
  pasajerosActuales: any = [];
  uidConductor: any;
  uid: any = this.rutas.uid
  patente: any;

  ngOnInit() {

    console.log(this.usuarioVehiculo)
  }


  async tomarViaje(patente: any, asientoDisponible: any) {
    try {
      // Verificar si uid es un valor válido antes de proceder
      const coleccion = await this.firestore.collection('vehiculo', ref => ref.where('patente', '==', patente));

      const snapshot = await coleccion.get().toPromise()


      snapshot?.forEach(doc => {
        this.uidConductor = doc.id
      })


      if (this.rutas.uid !== null && this.rutas.uid !== undefined) {
        const coleccionVehiculo = this.firestore.collection('vehiculo').doc(this.uidConductor).valueChanges();

        coleccionVehiculo.pipe(take(1)).subscribe(async (data: any) => {
          this.pasajerosActuales = data['listaDePasajeros']

          for (let i = 0; i < this.usuario.length; i++) {
            let elemento = this.usuario[i];
            let nuevoPasajero = { nombre: elemento['nombre'] + " " + elemento['apellido'], contacto: elemento['celular'], rut: elemento['rut'] };
          
            console.log("Nuevo pasajero:", nuevoPasajero);
          
            // Verificar si el pasajero ya está en la lista antes de agregarlo
            if (!this.pasajerosActuales.some((pasajero: { contacto: any; }) => pasajero.contacto === nuevoPasajero.contacto)) {
              this.pasajerosActuales.push(nuevoPasajero);
            }
          }


          this.nuevosDatos = {
            asientosDisponibles: asientoDisponible - 1,
            listaDePasajeros: this.pasajerosActuales,
          };


          await this.firestore.collection('vehiculo').doc(this.uidConductor).update(this.nuevosDatos);

        });

        this.verRuta(patente);
        this.Viaje();
      } else {
        console.error('UID no válido o indefinido.');
      }

    } catch (error) {
      console.error(error);
    }
  }

  async verRuta(patente: any) {
    try {
      // Verificar si uid es un valor válido antes de proceder
      const coleccion = await this.firestore.collection('vehiculo', ref => ref.where('patente', '==', patente));

      const snapshot = await coleccion.get().toPromise()


      snapshot?.forEach(doc => {
        this.uidConductor = doc.id
      })


      if (this.rutas.uid !== null && this.rutas.uid !== undefined) {
        const coleccionVehiculo = this.firestore.collection('vehiculo').doc(this.uidConductor).valueChanges();

        coleccionVehiculo.pipe(take(1)).subscribe(async (data: any) => {
          this.rutas.destinoConductor = data['destino']
          this.navCtrl.navigateRoot('/mapa')
        });

      } else {
        console.error('UID no válido o indefinido.');
      }

    } catch (error) {
      console.error(error);
    }
  }

  async Viaje() {
    try {
      // Obtener la ubicación una vez al principio
      await this.storageService.getGeoLocation();

      // Verificar si uid es un valor válido antes de proceder
      if (this.uid !== null && this.uid !== undefined) {
        this.nuevosDatos = {
          SeleccionViaje: "Si"
        };

        // Actualizar datos en Firestore
        await this.firestore.collection("usuarios").doc(this.uid).update(this.nuevosDatos);


      } else {
        console.error('UID no válido o indefinido.');
      }
    } catch (error) {
      console.error('Error al modificar datos:', error);
    }
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
