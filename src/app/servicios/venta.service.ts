import { Injectable } from '@angular/core';
import { ProductoStock } from '../models/productoStock';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  listaItems: ProductoStock[] = [];
  precioTotal: number = 0;

  constructor() { }

  agregar(item: ProductoStock) {
    this.listaItems.push(item);
    console.log(this.listaItems)
  }

  sumaPrecio() {
    for (let item of this.listaItems) {
      this.precioTotal += (item.precioVenta * item.stock);
    }
  }

}
