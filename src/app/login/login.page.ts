import { Component, OnInit} from '@angular/core';
import { ServicesDatosService, Datos,login } from '../servicio/services-datos.service';
import { Platform,LoadingController,NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  datos: Datos[] = [];
  User: Datos = <Datos>{}; 
  coleccion: Observable<any[]> | undefined;
  mensaje: string = '';
  bloqueo: boolean = true;
  boton: boolean = true;

  constructor(private router: Router, private storageService: ServicesDatosService,
    private plt: Platform,
    private loadingCtrl:LoadingController,
    private afAuth:AngularFireAuth,
    private navCtrl:NavController,
    private firestore:AngularFirestore,private rutas:AppRoutingModule) {
    this.plt.ready().then(() => {
      this.loadDatos();
    })
  }

  ngOnInit() {
    this.bloqueo = true
    this.User.correo="";
    this.User.pass="";
    this.rutas.vehiculos=[]



  }

  loadDatos() {
    this.storageService.getDatos().then(datos => {
      this.datos = datos;
    });
  }

  /*login() {
    for (let i = 0; i < this.datos.length; i++) {
      if (this.User.correo == this.datos[i].correo) {
        if (this.User.pass == this.datos[i].pass) {

          this.bloqueo = true;
          this.ruta.usuario.push(this.datos[i])
          this.router.navigate(['/inicio'])

        } else {
          this.bloqueo = false
        }
      } else {
        this.bloqueo = false;
      }
    }
  }*/

  async loginFirebase(){

    this.rutas.usuarioFireBase.splice(0,this.rutas.usuarioFireBase.length)

    let loader = await this.loadingCtrl.create({
      message:"Iniciando Sesion..."
    })

    await loader.present();

    try {
      await this.afAuth.signInWithEmailAndPassword(this.User.correo,this.User.pass).then(data=>{
        
        this.rutas.uid = data.user?.uid
        this.navCtrl.navigateRoot("/inicio")
        loader.dismiss()
      })

      //this.login();
      
      const Nombre_Coleccion:string = "usuarios";
      const coleccion_vehiculo:string = "vehiculo"

      const coleccion = this.firestore.collection(Nombre_Coleccion).doc(this.rutas.uid).valueChanges();

      const coleccionVehiculo = this.firestore.collection(coleccion_vehiculo).doc(this.rutas.uid).valueChanges();

      const vehiculos = this.firestore.collection(coleccion_vehiculo)

  

      vehiculos.get().subscribe(data =>{
          data.forEach(doc =>{
            this.rutas.vehiculos.push(doc.data())
          })
      })
 

      coleccionVehiculo.subscribe(data=>{
        this.rutas.usuarioVehiculo.push(data)  
      })

      coleccion.subscribe(data=>{
          this.rutas.usuarioFireBase.push(data);
      })


    } catch (error) {
      this.User.correo="";
      this.User.pass="";
      loader.dismiss()
      this.bloqueo = false
    } 
  }


}
