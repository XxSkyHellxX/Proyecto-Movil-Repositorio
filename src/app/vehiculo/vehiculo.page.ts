import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, NavController } from '@ionic/angular';
import { ServicesDatosService, vehiculo } from '../servicio/services-datos.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {

  constructor(private rutas: AppRoutingModule, private afAuth: AngularFireAuth, private navCtrl: NavController, private firestore: AngularFirestore, private loadingCtrl: LoadingController, private storage: AngularFireStorage, 
    private storageService: ServicesDatosService) { }

  componentes = this.rutas.componentes
  usuario = this.rutas.usuarioFireBase
  newVehiculo: vehiculo = <vehiculo>{};
  valida = this.rutas.usuarioVehiculo;
  validado: string = "";
  block: boolean = true;
  nuevosDatos = {}



  selectedFile: File | undefined;

  ngOnInit() {
    for (let i = 0; i < this.valida.length; i++) {
      let elemento = this.valida[i]

      if (elemento) {
        this.validado = elemento['patente']
      } else {
        console.log('Error')
      }

      this.newVehiculo.patente = elemento['patente']
      this.newVehiculo.modelo = elemento['modelo']
      this.newVehiculo.color = elemento['color']
      this.newVehiculo.marca = elemento['marca']
      this.newVehiculo.cantidadPasajeros = elemento['cantidadPasajeros']
      this.newVehiculo.precio = elemento['precio']
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

  async registrarVehiculo() {
    let loader = await this.loadingCtrl.create({
      message: "Espere por favor"
    })
    await loader.present();

    try {

      const destino = this.storageService.getLocation()


      if (this.rutas.uid) {
        await this.firestore.collection('vehiculo').doc(this.rutas.uid).set({
          patente: this.newVehiculo.patente,
          modelo: this.newVehiculo.modelo,
          color: this.newVehiculo.color,
          marca: this.newVehiculo.marca,
          cantidadPasajeros: this.newVehiculo.cantidadPasajeros,
          foto: await this.uploadImage(),
          asientosDisponibles: this.newVehiculo.cantidadPasajeros,
          listaDePasajeros: [],
          destino: {
            latitud: (await destino).latitud,
            longitud: (await destino).longitud
          },
          precio:this.newVehiculo.precio
        });

        loader.dismiss()
      }

      this.navCtrl.navigateRoot("/inicio");
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      // Manejar el error, mostrar mensajes de error, etc.
    }


  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }



  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.selectedFile) {
          console.error('No se seleccionó ninguna imagen.');
          reject('No se seleccionó ninguna imagen.');
          return;
        }

        const filePath = `vehiculos/${this.selectedFile.name}`;
        const fileRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, this.selectedFile);

        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((downloadURL) => {
              resolve(downloadURL);
            });
          })
        ).subscribe();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  async modificarDatosVehiculo() {
    try {
      // Verificar si uid es un valor válido antes de proceder
      if (this.rutas.uid !== null && this.rutas.uid !== undefined) {
        // Obtener la ubicación una vez al principio
        await this.storageService.getGeoLocation();
  
        this.nuevosDatos = {
          patente: this.newVehiculo.patente,
          modelo: this.newVehiculo.modelo,
          color: this.newVehiculo.color,
          marca: this.newVehiculo.marca,
          cantidadPasajeros: this.newVehiculo.cantidadPasajeros,
          foto: await this.uploadImage(),
          asientosDisponibles: this.newVehiculo.cantidadPasajeros,
          listaDePasajeros: [],
          destino: {
            latitud: this.storageService.latitude,
            longitud: this.storageService.longitude
          },
          precio: this.newVehiculo.precio
        };
  
        // Actualizar datos en Firestore
        await this.firestore.collection("vehiculo").doc(this.rutas.uid).update(this.nuevosDatos);
  
        // Cerrar sesión
        await this.afAuth.signOut();
  
        console.log('Sesión cerrada exitosamente');
        this.navCtrl.navigateRoot("/login");
      } else {
        console.error('UID no válido o indefinido.');
      }
    } catch (error) {
      console.error('Error al modificar datos del vehículo:', error);
    }
  }
  

}

