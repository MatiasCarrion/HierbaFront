import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductoStock } from '../models/productoStock';
import { Venta } from '../models/venta';
import { DetalleVenta } from '../models/detalleVenta';
import { Envio } from '../models/envio';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  listaItems: ProductoStock[] = [];
  precioTotal: number = 0;
  urlBase = 'https://hb-growshop-backend.herokuapp.com/api/ventas';
  urlGetDetalleVenta = '/getMaxIdDetalleVenta';
  urlGetDatosEnvio = '/getMaxIdDatosEnvio';
  urlAgregarVenta = '/agregarVenta';
  urlAgregarDetalles = '/agregarDetalles';
  urlAgregarEnvio = '/agregarEnvio';

  constructor(private http: HttpClient, private router: Router) { }

  agregar(item: ProductoStock) {
    this.listaItems.push(item);
    console.log(this.listaItems)
  }

  sumaPrecio() {
    this.precioTotal = 0;
    for (let item of this.listaItems) {
      this.precioTotal += (item.precioVenta * item.stock);
    }
  }

  getMaxIdDetalleVenta() {
    return this.http.get(this.urlBase+this.urlGetDetalleVenta);
  }

  getMaxIdDatosEnvio() {
    return this.http.get(this.urlBase+this.urlGetDatosEnvio);
  }

  insertVenta(unaVenta: Venta) {
    return this.http.post(this.urlBase+this.urlAgregarVenta,unaVenta);
  }

  insertDetallesVenta(detalles: any) {
    return this.http.post(this.urlBase+this.urlAgregarDetalles, detalles);
  }

  insertDetalleEnvio(datosEnvio: any) {
    return this.http.post(this.urlBase+this.urlAgregarEnvio, datosEnvio);
  }

}
