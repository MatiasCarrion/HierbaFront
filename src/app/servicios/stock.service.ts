import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StockService {

  // ruta de la api
  url = '/api/stock';
  
  constructor(private http: HttpClient) { }
  
  // get stock
  getStock() {
    return this.http.get(this.url);
  }

}
