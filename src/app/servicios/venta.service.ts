import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  listaItems: Producto[] = [];

  constructor() { }

  agregar(item: Producto) {
    this.listaItems.push(item);
    console.log(this.listaItems)
  }



}
