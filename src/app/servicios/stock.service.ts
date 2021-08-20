import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ProductoStock } from '../models/productoStock';
import { Producto } from '../models/producto';
import { ProductoLog } from '../models/productoLog';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'responseType' : 'json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers' : 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
      'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, DELETE',
      'Allow' : 'GET, POST, OPTIONS, PUT, DELETE'
    }),
  };
  // ruta de la api
  urlStock = '/api/stock';
  urlUnProd = '/api/stock/';
  urlAlterStock = '/api/stock/alterStock';
  urlCategorias = '/api/stock/categorias';
  urlNuevoProducto = '/api/stock/nuevoProducto';
  urlLogProducto = '/api/stock/logProducto';
  urlUPDStock = '/api/stock/updStockVenta';


  unProd!: ProductoStock;
  
  constructor(private http: HttpClient) { }
  
  // get stock
  getStock() {
    return this.http.get(this.urlStock, { ...this.httpOptions });
  }

  getUnProd(id: number) {
    return this.http.get(this.urlUnProd+id);
  }

  alterStock(datos: ProductoStock) {
    return this.http.post(this.urlAlterStock, datos);
  }

  updStockVenta(datos: any) {
    return this.http.post(this.urlUPDStock, datos);
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
