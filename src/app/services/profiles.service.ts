import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs'
import { UserData } from '../interfaces/profile.UserData';
import { UserInfo } from '../interfaces/user-info.interface';

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
  return lastValueFrom(this.httpClient.get<any>(this.baseUrl));
}

//Creo la función getById para obtener un id en concreto
getById(_id: string): Promise<UserInfo> {
  return lastValueFrom(this.httpClient.get<UserInfo>(`${this.baseUrl}${_id}`));
  }


//Creo la función delete para eliminar un id en concreto
delete(_id: string): Promise<any>{
  return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${_id}`));
}

//Creo la función nuevo perfil
insert(formValue: any): Promise<UserInfo>{
  return lastValueFrom(this.httpClient.post<UserInfo>(this.baseUrl, formValue));
  } 

// Creo la función update
  updateProfile(formValue: UserInfo): Promise<any> {
  return lastValueFrom(this.httpClient.put(`${this.baseUrl}${formValue._id}`, formValue));
}
}

