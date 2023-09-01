import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  //insertamos el inyectable para poder hacer las peticiones a API
  
  httpClient = inject(HttpClient)

  constructor() { }
}
