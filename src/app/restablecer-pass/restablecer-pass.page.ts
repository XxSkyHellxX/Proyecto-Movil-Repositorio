import { Component, OnInit } from '@angular/core';

import { Datos } from '../servicio/services-datos.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-restablecer-pass',
  templateUrl: './restablecer-pass.page.html',
  styleUrls: ['./restablecer-pass.page.scss'],
})
export class RestablecerPassPage implements OnInit {

  User: Datos = <Datos>{}; 

  constructor(private afAuth:AngularFireAuth,private navCtrl:NavController,private loadingCtrl:LoadingController) { }

  ngOnInit() {
  }

  async resetPassword():Promise<void>{

    let loader = await this.loadingCtrl.create({
      message:"Correo Enviado, Verifique su buzon."
    })

    await loader.present()

    try {
      this.afAuth.sendPasswordResetEmail(this.User.correo)
      this.navCtrl.navigateRoot('/login')
      loader.dismiss
    } catch (error) {
      console.log(error)
    }

    await loader.dismiss()

  }
  

}
