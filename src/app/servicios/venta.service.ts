import { Injectable } from '@angular/core';
import { ProductoStock } from '../models/productoStock';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  listaItems: ProductoStock[] = [];

  constructor() { }

  agregar(item: ProductoStock) {
    this.listaItems.push(item);
    console.log(this.listaItems)
  }



}
