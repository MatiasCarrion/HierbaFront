import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ProductoStock } from '../models/productoStock';
import { Producto } from '../models/producto';
import { ProductoLog } from '../models/productoLog';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  // ruta de la api
  urlStock = '/api/stock';
  urlUnProd = '/api/stock/';
  urlAlterStock = '/api/stock/alterStock';
  urlCategorias = '/api/stock/categorias';
  urlNuevoProducto = '/api/stock/nuevoProducto';
  urlLogProducto = '/api/stock/logProducto';


  unProd!: ProductoStock;
  
  constructor(private http: HttpClient) { }
  
  // get stock
  getStock() {
    return this.http.get(this.urlStock);
  }

  getUnProd(id: number) {
    return this.http.get(this.urlUnProd+id);
  }

  alterStock(datos: ProductoStock) {
    return this.http.post(this.urlAlterStock, datos);
  }

  getCategorias() {
    return this.http.get(this.urlCategorias);
  }

  postProducto(unProd: Producto){
    return this.http.post(this.urlNuevoProducto, unProd);
  }

  postLogProducto(unLog: ProductoLog) {
    return this.http.post(this.urlLogProducto, unLog);
  }

}
