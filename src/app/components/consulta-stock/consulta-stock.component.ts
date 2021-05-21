import { Component, OnInit } from '@angular/core';
import { StockService } from '../../servicios/stock.service'
import { Stock } from '../../models/stock';

@Component({
  selector: 'app-consulta-stock',
  templateUrl: './consulta-stock.component.html',
  styleUrls: ['./consulta-stock.component.css']
})
export class ConsultaStockComponent implements OnInit {
  
  listaProd: Stock[] = [];

  constructor(private _StockService: StockService) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this._StockService.getStock().subscribe(
      res=>{
        // const response = res;
        // const { id, nombre, categoria, stock } = response
        console.log(res);
      },
      err => console.log(err)
    )
  }

}
