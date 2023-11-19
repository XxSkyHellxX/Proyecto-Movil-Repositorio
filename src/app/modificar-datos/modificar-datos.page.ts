import { Component, OnInit} from '@angular/core';
import { Datos, ServicesDatosService } from '../servicio/services-datos.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from '../app-routing.module';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-modificar-datos',
  templateUrl: './modificar-datos.page.html',
  styleUrls: ['./modificar-datos.page.scss'],
})

export class ModificarDatosPage implements OnInit {

  newDato: Datos = <Datos>{};
  block: boolean = true;

  uid:any = this.rutas.uid
  nuevosDatos={};
  selectedFile: File | undefined;

  constructor(private firestore:AngularFirestore, private rutas:AppRoutingModule,
    private navCtrl:NavController,private afAuth:AngularFireAuth,private alert:AlertController,private storageService:ServicesDatosService, private storage: AngularFireStorage) { 
      
    }

  ngOnInit() {
  }

  async mostrarConfirmacion() {
    const alert = await this.alert.create({
      header: 'Confirmación',
      message: '¿Estás seguro de continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Acción cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.modificarDatosFirestore()
            // Puedes colocar aquí la lógica que deseas ejecutar al confirmar
          }
        }
      ]
    });
  
    await alert.present();
  }

  async modificarDatosFirestore() {
    try {
      // Obtener la ubicación una vez al principio
      await this.storageService.getGeoLocation();
  
      // Verificar si uid es un valor válido antes de proceder
      if (this.uid !== null && this.uid !== undefined) {
        this.nuevosDatos = {
          apellido: this.newDato.apellido,
          celular: this.newDato.celular,
          nombre: this.newDato.nombre,
          pass: this.newDato.pass,
          rut: this.newDato.rut,
          vehiculo: this.newDato.vehiculo,
          fotoPerfil: await this.uploadImage(),
          destino: {
            latitud: this.storageService.latitude,
            longitud: this.storageService.longitude
          }
        };
  
        // Actualizar datos en Firestore
        await this.firestore.collection("usuarios").doc(this.uid).update(this.nuevosDatos);
  
        // Cerrar sesión
        await this.afAuth.signOut();
  
        console.log('Sesión cerrada exitosamente');
        this.navCtrl.navigateRoot("/login");
      } else {
        console.error('UID no válido o indefinido.');
      }
    } catch (error) {
      console.error('Error al modificar datos:', error);
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

        const filePath = `fotosPerfil/${this.selectedFile.name}`;
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


}
