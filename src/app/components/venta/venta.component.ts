import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { VentaService } from 'src/app/servicios/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

listaItems = this._VentaService.listaItems;

  constructor(private _VentaService: VentaService) {}
  
  ngOnInit(): void {
  }

  borrarItem(index: number): void {
    this.listaItems.splice(index,1);
  }

}
