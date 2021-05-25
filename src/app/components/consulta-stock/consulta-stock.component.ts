import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { StockService } from '../../servicios/stock.service';

@Component({
  selector: 'app-consulta-stock',
  templateUrl: './consulta-stock.component.html',
  styleUrls: ['./consulta-stock.component.css']
})
export class ConsultaStockComponent implements OnInit {
  
  listaProd: any = [];
  filterProd:any = '';

  constructor(private _StockService: StockService) { }

  ngOnInit(): void {
    this.listarProductos();
  }
  
  listarProductos() {
    this._StockService.getStock().subscribe(
      res=>{
        this.listaProd = res;
      },
      err => console.log(err)
    )
  }

}
