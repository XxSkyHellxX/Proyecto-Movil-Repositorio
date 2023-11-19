import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //Se importa para realizar solicitudes HTTP a la API externa.
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  


  private urlApi = 'https://api.openweathermap.org/data/2.5/weather?lat=-33.51081202583109&lon=-70.75242782698344&appid=e20afbde0518afb7b6ef27afdf847251'; // se define una variable para contener la url de la API

  constructor(private http: HttpClient) { }
    //Se crea una instancia HttpCLient para que la clase utilize la funcionalidad importada HttpClient
  
    public getData(): Observable < any > {
    return this.http.get<any>(this.urlApi);
  
    /* 
      Este metodo se utiliza para realizar una solicitud GET a la url de la api definida
      en urlApi utilizando al instancia HttpClient.
  
      El metodo get() de HttpClient realiza la solicitud GET a la url y devuelve un objeto Observable
    */
  }
}
