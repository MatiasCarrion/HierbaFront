import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

urlProvincias = '/api/ubicaciones/provincias';
urlLocalidades = '/api/ubicaciones/localidades';


  constructor(private http: HttpClient) { }

  getProvincias() {
    return this.http.get(this.urlProvincias);
  }

  getLocalidades() {
    return this.http.get(this.urlLocalidades);
  }

}


