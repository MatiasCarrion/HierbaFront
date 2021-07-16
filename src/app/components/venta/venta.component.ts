import { Component, OnInit, Input } from '@angular/core';
import { VentaService } from '../../servicios/venta.service';
import { UbicacionesService } from '../../servicios/ubicaciones.service';
import { Provincia } from '../../models/provincias';
import Swal from 'sweetalert2';
import { PdfMakeWrapper, Txt, Img, ITable, Table  } from 'pdfmake-wrapper';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  listaItems = this._VentaService.listaItems;
  precioTotal: any;
  check: any;
  check_porcentaje: boolean = false;
  check_importe: boolean = false;
  check_retiro_tienda: boolean = true;
  check_envio_incluido: boolean = false;
  check_envio_cliente: boolean = false;
  descuento: any;
  montoDescuento: any;
  precioConDescuento: any;
  // envio
  calle:any;
  altura:any;
  codigo_postal:any;
  barrio:any;
  localidad:any;
  provincia:any;
  departamento:any;
  observaciones:any;
  listadoProvincias:any = [];
  listadoLocalidades:any = [];
  arrayAux:any = [];

  constructor(private _VentaService: VentaService,
              private _UbicacionesService: UbicacionesService) { }

  ngOnInit(): void {
    this._VentaService.sumaPrecio();
    this.precioTotal = this._VentaService.precioTotal;
    this.precioConDescuento = this.precioTotal;
    this.llenarListadoProvincias();
    this.llenarListadoLocalidades();
  }

  // async llenarListadoProvincias() {
  //   this.arrayAux = await this.traerProvincias();
  //   for (let e of this.arrayAux) {
  //     let unaProv = new Provincia(e.id, e.nombre);
  //     this.listadoProvincias.push(unaProv);
  //   }
  // }

  async llenarListadoProvincias() {
    this.listadoProvincias = await this.traerProvincias();
  }

  traerProvincias() {
    return new Promise((resolve, reject) => {
      this._UbicacionesService.getProvincias().subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject('err');
        }
      )
    })
  }

  async llenarListadoLocalidades() {
    this.listadoLocalidades = await this.traerLocalidades();
  }

  traerLocalidades() {
    return new Promise((resolve, reject) => {
      this._UbicacionesService.getLocalidades().subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject('err');
        }
      )
    })
  }

  borrarItem(index: number): void {
    this.listaItems.splice(index, 1);
  }

  checkPorc(evento: any) {
    if (evento.target.checked) {
      this.check_porcentaje = true;
      this.check_importe = false;
      this.check = document.getElementById("imp");
      this.check.checked = false;
    }
  }

  checkImp(evento: any) {
    if (evento.target.checked) {
      this.check_porcentaje = false;
      this.check_importe = true;
      this.check = document.getElementById("porc");
      this.check.checked = false;
    }
  }

  checkRT(evento: any) {
    if (evento.target.checked) {
      this.check_retiro_tienda = true;
      this.check_envio_cliente = false;
      this.check_envio_incluido = false;
      this.check = document.getElementById("checkEI");
      this.check.checked = false;
      this.check = document.getElementById("checkEC");
      this.check.checked = false;
    }
  }

  checkEI(evento: any) {
    if (evento.target.checked) {
      this.check_retiro_tienda = false;
      this.check_envio_cliente = false;
      this.check_envio_incluido = true;
      this.check = document.getElementById("checkRT");
      this.check.checked = false;
      this.check = document.getElementById("checkEC");
      this.check.checked = false;
    }
  }

  checkEC(evento: any) {
    if (evento.target.checked) {
      this.check_retiro_tienda = false;
      this.check_envio_cliente = true;
      this.check_envio_incluido = false;
      this.check = document.getElementById("checkRT");
      this.check.checked = false;
      this.check = document.getElementById("checkEI");
      this.check.checked = false;
    }
  }

  tomarDescuento(event:any){

    this.descuento = event.currentTarget.value;

    if (this.check_porcentaje) {
      this.montoDescuento = this.precioTotal * (this.descuento/100);
    }
    if (this.check_importe) {
      this.montoDescuento =  this.descuento;
    }

    this.precioConDescuento = this.precioTotal - this.montoDescuento;
    
  }

  async modificarItem(unItem: any) {
    console.log(unItem);
    let cantidad = await this.usuarioModifica(unItem);
    // console.log(this.listaItems[unItem._id - 1]);
    this.listaItems[unItem._id - 1].stock = cantidad.value;
  }

  async usuarioModifica(unItem: any) {
    let mensaje = '<h4>Stock disponible </h4> <span>' + unItem.stockMaximo + '</span>\
    <h4>Nueva cantidad: </h4>'

    const respuesta = await Swal.fire({
      title: 'Modificar compra',
      // text: mensaje,
      html: mensaje,
      input: 'number',
      // inputValidator: (value) => {
      //   if (value > unItem.stockMaximo) {
      //     return 'Estás excediendo la cantidad disponible'
      //   }
      // } ,
      icon: 'question',
      iconColor: '#DE944F',
      showCancelButton: true,
      confirmButtonText: 'Confirmado!',
      cancelButtonText: 'Cancelado',
      customClass: {
        title: 'fs-1',
        input: 'mw-100 text-center'
      },
      confirmButtonColor: '#198754'
    })
    return respuesta;
  }

  // // doctor haq

  // interface DataResponse {
  //   id: number;
  //   nombre: string;
  // }

  // type tableRow = [number, string];

  // // aux!: ITable;
  // // array(): ITable {
  // //   this.aux =  new Table([
  // //     ['hola', 'mundo'], 
  // //     ['soy', 'mati'],
  // //     ['probando', 'PDF puto']
  // //   ]).end;

  // //   return this.aux;
  // // }

  async generarPDF(){
    const pdf = new PdfMakeWrapper();
    // const data = await this.fetchData();

    // pdf.pageMargins(20);
    pdf.add(await new Img('https://i.ibb.co/6B8pGSs/Header-Presupuesto.jpg').height(130).width(512).build());
    
    // pdf.add(this.createTable(data));

    pdf.create().open();
  }

  // createTable(data: DataResponse[]): ITable {
  //   [{ }]
  //   return new Table([
  //     ["Item","nombre"],
  //     ...this.extractData(data)
  //   ]).end;
  // }

  // extractData(data: DataResponse[]): TableRow[] {
  //   return data.map(row => [row.id, row.nombre]);
  // }


  // async fetchData(): Promise<DataResponse[]> {
  //   const obj = JSON.parse(JSON.stringify(this.listaItems));  
  //   console.log(obj);
  //     return fetch(JSON.parse(obj))
  //       .then(response => response.json())
  //       .then(data => data.filter((_, index: number) => index < this.listaItems.length ));
  // }


}

