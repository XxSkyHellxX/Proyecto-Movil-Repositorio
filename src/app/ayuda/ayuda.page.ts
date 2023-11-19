import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})

export class AyudaPage implements OnInit {

  constructor(private rutas: AppRoutingModule, private afAuth: AngularFireAuth,
    private navCtrl: NavController,private firestore:AngularFirestore,private alert:AlertController) { }

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

  navModifcarDatos(){
    this.navCtrl.navigateRoot("/modificar-datos")
  }

  EliminarCuenta(){
    const uid= this.rutas.uid;
    const collectionRef= this.firestore.collection('usuarios')

    //Eliminar de la Coleccion
    collectionRef.doc(uid).delete().then(()=>{
      //Eliminar Authentication
      this.afAuth.currentUser.then(user=>{
        user?.delete()
        console.log("Usuario ELiminado de Authentication")
      }).catch(error=>{
        console.log(error)
      })

      console.log('Perfil ' + uid + ' Eliminado ')        
      this.navCtrl.navigateRoot('/login')    
    })
    .catch(error=> {
      console.log(error)
    })

    
  }

  //Alerta de Confirmacion
  async mostrarConfirmacion() {
    const alert = await this.alert.create({
      header: 'Confirmación',
      message: '¿Estás seguro de eliminar tu cuenta? Esta accion es irremediable.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('No fue posible eliminar su cuenta');
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




}
