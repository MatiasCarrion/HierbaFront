import { Component, OnInit, Input } from '@angular/core';
import { VentaService } from '../../servicios/venta.service';
import { StockService } from '../../servicios/stock.service';
import { UbicacionesService } from '../../servicios/ubicaciones.service';
import { Provincia } from '../../models/provincias';
import { Venta } from '../../models/venta';
import { DetalleVenta } from '../../models/detalleVenta';
import { Envio } from '../../models/envio';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'


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
  montoDescuento: any = 0;
  precioConDescuento: any;
  idDetalle: any;
  idDatosEnvio: any;
  tipoDesc: any;
  tipoEnvio: any = 1;
  objetoVenta: any;
  objetoEnvio: any;
  objetosDetalle: any[] = [];
  // envio
  calle: any = "Sin datos";
  altura: any = "1234";
  codigo_postal: any = "1234";
  barrio: any = "Sin datos";
  localidad: any = "Sin datos";
  provincia: any = "Sin datos";
  departamento: any = "Sin datos";
  observaciones: any = "Sin datos";
  listadoProvincias: any = [];
  listadoLocalidades: any = [];
  arrayAux: any = [];
  nombre_cliente: any = "Sin datos";
  dni_cliente: any = 1234;
  telefono_cliente: any = 1234;
  mail_cliente: any = "Sin@datos";

  constructor(private _VentaService: VentaService,
    private _UbicacionesService: UbicacionesService,
    private _StockService: StockService,
    private router: Router) { }

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

  tomarDescuento(event: any) {

    this.descuento = event.currentTarget.value;

    if (this.check_porcentaje) {
      this.montoDescuento = this.precioTotal * (this.descuento / 100);
    }
    if (this.check_importe) {
      this.montoDescuento = this.descuento;
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

  generarVenta() {
    this._VentaService.getMaxIdDetalleVenta().subscribe(
      res => {
        this.idDetalle = res;
        console.log("id detalle max ==> " + this.idDetalle);
        this._VentaService.getMaxIdDatosEnvio().subscribe(
          res => {
            this.idDatosEnvio = res;
            console.log("id datos envio max ==> " + this.idDatosEnvio);
            this.objetoVenta = this.crearInstanciaVenta();
            console.log(this.objetoVenta);
            this.crearInstanciasDetalles();
            console.log(this.objetosDetalle);
            this.validarEnvio();
            this.impactarEnBase();
            this.impactarDetalles();
            this.updateStock();
            this._VentaService.listaItems = [];
            this.mensajeExito();
            this.actualizarComponente();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  crearInstanciaVenta(): Venta {

    this.idDetalle = this.idDetalle + 1;
    this.tipoEnvio === 1 ? this.idDatosEnvio = 0 : this.idDatosEnvio = this.idDatosEnvio + 1;

    if (this.check_porcentaje) {
      this.tipoDesc = 1;
    }
    if (this.check_importe) {
      this.tipoDesc = 2;
    }
    if (!this.check_importe && !this.check_porcentaje) {
      this.tipoDesc = 3;
      this.montoDescuento = 0;
    }

    let objeto = new Venta(this.idDetalle,
      this.idDatosEnvio,
      this.precioTotal,
      this.montoDescuento,
      this.precioConDescuento,
      this.tipoDesc,
      this.nombre_cliente,
      this.dni_cliente,
      this.telefono_cliente,
      this.mail_cliente)

    return objeto;

  }

  crearInstanciasDetalles() {

    for (let item of this.listaItems) {
      let unObj = new DetalleVenta(this.idDetalle, item.id, item.stock, item.precioVenta)
      this.objetosDetalle.push(unObj);
    }

  }

  crearInstanciaEnvio(): Envio {

    if (this.check_retiro_tienda) {
      this.tipoEnvio = 1
    }
    if (this.check_envio_incluido) {
      this.tipoEnvio = 2
    }
    if (this.check_envio_cliente) {
      this.tipoEnvio = 3
    }

    return new Envio(this.idDatosEnvio, this.tipoEnvio, this.provincia, this.localidad,
      this.barrio, this.calle, this.altura, this.codigo_postal, this.departamento, this.observaciones)

  }

  validarEnvio() {
    if (!this.check_retiro_tienda) {
      this.objetoEnvio = this.crearInstanciaEnvio();
      console.log(this.objetoEnvio);
      this.impactarEnvio();
    }
  }

  impactarEnBase() {
    this._VentaService.insertVenta(this.objetoVenta).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }



  impactarDetalles() {
    this._VentaService.insertDetallesVenta(this.objetosDetalle).subscribe(
      res => {
        this.objetosDetalle = [];
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  impactarEnvio() {
    this._VentaService.insertDetalleEnvio(this.objetoEnvio).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  updateStock() {
    this._StockService.updStockVenta(this.listaItems).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  }

  mensajeExito() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Operación Exitosa!',
      showConfirmButton: false,
      timer: 1000
    })
  }
  actualizarComponente() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/consultaStock']);
    });
  }


  generarPDF() {

    const doc = new jsPDF();
    var img = new Image();
    img.src = 'assets/HeadPresupuesto.jpeg';
    doc.addImage(img, 'png', 50, 2, 120, 30);
    autoTable(doc, {html: '#tablaCarrito', startY:40});
    doc.save('tabla.pdf');

  }

}