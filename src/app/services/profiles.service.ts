import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs'
import { UserData } from '../interfaces/profile.UserData';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  //insertamos el inyectable para poder hacer las peticiones a API

  httpClient = inject(HttpClient)
  private baseUrl: string = "https://peticiones.online/api/users/";

  constructor() { }
//Me basaré en promesas para sacar las funciones del servicio
//Creo la función getAll para obtener todos los perfiles de la API
getAll(): Promise<UserData> {
  return lastValueFrom(this.httpClient.get<any>(this.baseUrl))
}

//Crep la función getById para obtener un id en concreto
getById(_id: string): Promise<UserData> {
  return lastValueFrom(this.httpClient.get<UserData>(`${this.baseUrl}${_id}`))
  }
}
