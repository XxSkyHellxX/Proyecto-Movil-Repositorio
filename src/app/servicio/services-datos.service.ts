import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppRoutingModule } from '../app-routing.module';
import {Geolocation} from '@awesome-cordova-plugins/geolocation/ngx'
import { resolve } from 'dns';

export interface login {
  correo: string,
  pass: string
}

export interface Datos {
  id: number,
  nombre: string,
  apellido: string,
  correo: string,
  celular: number,
  rut: string,
  pass: string,
  vehiculo: string,
  foto: string,
  destino: {
    latitud: number,
    longitud: number
  },
  modified: number;
}

export interface vehiculo {
  id: number,
  patente: string,
  modelo: string,
  color: string,
  marca: string,
  cantidadPasajeros: number,
  asientosOcupados: number
  foto: File,
  destino: {
    latitud: number,
    longitud: number
  },
  precio: number
  modified: number;
}


export interface Marker {
  position: {
    lat: number,
    lng: number
  }
}

export interface CoordInfo {
  country: string,
  city: string,
  marker: Marker
}




const ITEMS_KEY = 'my-datos'

@Injectable({
  providedIn: 'root'
})


export class ServicesDatosService {
  latitude: number = 0
  longitude: number = 0

  private _storage!: Storage;

  constructor(private storage: Storage,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController, private rutas: AppRoutingModule,private geolocation:Geolocation) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addDatos(dato: Datos): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((datos: Datos[]) => {
      if (datos) {
        datos.push(dato);
        return this.storage.set(ITEMS_KEY, datos);
      } else {
        return this.storage.set(ITEMS_KEY, [dato])
      }
    })

  }

  getDatos(): Promise<Datos[]> {
    return this.storage.get(ITEMS_KEY);
  }

  async deleteDatos(id: number): Promise<Datos> {
    return this.storage.get(ITEMS_KEY).then((datos: Datos[]) => {
      if (!datos || datos.length === 0) {
        return null;
      }
      let toKeep: Datos[] = [];

      for (let i of datos) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, toKeep)
    })
  }


  //Geolocalizacion

  getLocation(): Promise<{ latitud: number; longitud: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;

            resolve({
              latitud: this.latitude,
              longitud: this.longitude,
            });

          },
          (error) => {
            console.error('Error al obtener la ubicación:', error);
            reject(error);
          }
        );
      } else {
        console.error('La geolocalización no es compatible en este navegador.');
        reject('Geolocalización no compatible');
      }
    });
  }

  getGeoLocation(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        resolve(); // Resuelve la promesa una vez que las variables se han actualizado
      }).catch((error) => {
        console.log(error);
        reject(error); // Rechaza la promesa en caso de error
      });
    });
  }




}


