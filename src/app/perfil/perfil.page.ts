import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private rutas: AppRoutingModule, private afAuth: AngularFireAuth,
    private navCtrl: NavController,private firestore:AngularFirestore,private alert:AlertController) { }

  componentes = this.rutas.componentes;
  usuario = this.rutas.usuarioFireBase;

  ngOnInit() {



  }

  EliminarCuenta(){
    const uid= this.rutas.uid;
    const collectionRef= this.firestore.collection('usuarios')

    collectionRef.doc(uid).delete().then(()=>{
      console.log('Perfil ' + uid + ' Eliminado ')        
      this.navCtrl.navigateRoot('/login')    
    })
    .catch(error=> {
      console.log(error)
    })

  }

  async mostrarConfirmacion() {
    const alert = await this.alert.create({
      header: 'Confirmación',
      message: '¿Estás seguro de eliminar tu cuenta?',
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
            this.EliminarCuenta()
            // Puedes colocar aquí la lógica que deseas ejecutar al confirmar
          }
        }
      ]
    });
  
    await alert.present();
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
