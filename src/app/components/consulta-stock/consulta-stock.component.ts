import { Component, OnInit, Output } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { StockService } from '../../servicios/stock.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Venta } from 'src/app/models/venta';
import { VentaService } from '../../servicios/venta.service';

@Component({
  selector: 'app-consulta-stock',
  templateUrl: './consulta-stock.component.html',
  styleUrls: ['./consulta-stock.component.css']
})
export class ConsultaStockComponent implements OnInit {

  listaProd: any = [];
  filterProd: any = '';
  unProd!: Producto;
  cantidad: number = 1;
  listaItems: Producto[] = [];
  modal!: NgbModalRef;

  constructor(private _StockService: StockService,
    private _VentaService: VentaService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this._StockService.getStock().subscribe(
      res => {
        this.listaProd = res;
      },
      err => console.log(err)
    )
  }

  abrirModal(producto: Producto, modal: any) {
    this.unProd = producto;
    this.modal = this.modalService.open(modal, { size: 'lg' });
    this.cantidad = 1;
  }

  sumar(stock: number) {
    if (this.cantidad + 1 <= stock)
      this.cantidad++;
  }

  restar() {
    if (this.cantidad - 1 > 0) {
      this.cantidad--;
    }
  }

  agregar() {
    const item = new Producto(this.unProd.id, this.unProd.nombre, this.unProd.categoria, this.cantidad, this.unProd.precioCompra, this.unProd.precioVenta);
    if (item.stock > 0) {
      this._VentaService.agregar(item);
    }
    this.modal.close();
  }
}
