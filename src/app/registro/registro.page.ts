import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesDatosService, Datos } from '../servicio/services-datos.service';
import { Platform, ToastController, IonList, LoadingController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  datos: Datos[] = [];
  newDato: Datos = <Datos>{};
  block: boolean = true;
  selectedFile: File | undefined;

  @ViewChild('myList') myList: IonList;

  constructor(private storageService: ServicesDatosService,
    private plt: Platform, private toastController: ToastController, private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
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

  async register() {
    let loader = await this.loadingCtrl.create({
      message: "Espere por favor"
    });
    await loader.present();
  
    try {
      // Crear el usuario en la autenticación de Firebase
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.newDato.correo, this.newDato.pass);
  
      // Obtener el UID del usuario recién creado
      const uid = userCredential.user?.uid;
  
      if (uid) {
        // Obtener la ubicación antes de guardar en Firestore
        await this.storageService.getGeoLocation();
  
        // Almacenar información adicional en la base de datos (Firestore)
        await this.firestore.collection('usuarios').doc(uid).set({
          nombre: this.newDato.nombre,
          apellido: this.newDato.apellido,
          correo: this.newDato.correo,
          celular: this.newDato.celular,
          rut: this.newDato.rut,
          pass: this.newDato.pass,
          fotoPerfil: await this.uploadImage(),
          vehiculo: this.newDato.vehiculo,
          destino: {
            latitud: this.storageService.latitude,
            longitud: this.storageService.longitude
          }
        });
  
        // Almacenar información adicional en el storage
        await this.addDatos();
  
        loader.dismiss();
        this.navCtrl.navigateRoot("login");
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      this.navCtrl.navigateRoot('/registro');
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







