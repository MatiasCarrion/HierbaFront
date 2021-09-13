import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

urlProvincias = 'https://hb-growshop-backend.herokuapp.com/api/ubicaciones/provincias';
urlLocalidades = 'https://hb-growshop-backend.herokuapp.com/api/ubicaciones/localidades';


  constructor(private http: HttpClient) { }

  getProvincias() {
    return this.http.get(this.urlProvincias);
  }

  getLocalidades() {
    return this.http.get(this.urlLocalidades);
  }

}


