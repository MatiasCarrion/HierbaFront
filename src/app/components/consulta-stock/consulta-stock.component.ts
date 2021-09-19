import { Component, OnInit, Output } from '@angular/core';
import { Producto } from '../../models/producto'
import { ProductoLog } from '../../models/productoLog';
import { ProductoStock } from 'src/app/models/productoStock';
import { StockService } from '../../servicios/stock.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { VentaService } from '../../servicios/venta.service';
import { UsuariosService } from '../../servicios/usuarios.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-stock',
  templateUrl: './consulta-stock.component.html',
  styleUrls: ['./consulta-stock.component.css']
})
export class ConsultaStockComponent implements OnInit {

  listaProd: any = [];
  filterProd: any = '';
  unProd!: ProductoStock;
  prodMod: any;
  cantidad: number = 1;
  cantStock: number = 1;
  nuevoPrecioVenta: number = 0;
  listaItems: ProductoStock[] = [];
  modalAgregar!: NgbModalRef;
  modalSumarStock!: NgbModalRef;
  datosProducto: any;

  constructor(private _StockService: StockService,
    private _VentaService: VentaService,
    private _UsuarioService: UsuariosService,
    private router: Router,
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

  mostrarUnProd(id: number) {
    this._StockService.getUnProd(id).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
  }

  abrirModalAgregar(producto: ProductoStock, modal: any) {
    this.unProd = producto;
    this.modalAgregar = this.modalService.open(modal, { size: 'lg' });
    this.cantidad = 1;
  }

  cerrarAgregar() {
    this.modalAgregar.close();
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
    const item = new ProductoStock(this.unProd.id, this.unProd.nombre, this.unProd.categoria, this.cantidad, this.unProd.precioCompra, this.unProd.precioVenta, this.unProd.stock);
    if (item.stock > 0) {
      this._VentaService.agregar(item);
      this.mensajeExito();
    }
    this.modalAgregar.close();
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

  abrirModalSumarStock(producto: ProductoStock, modal: any) {
    this.unProd = producto;
    this.modalSumarStock = this.modalService.open(modal, { size: 'lg' });
    this.cantidad = 1;
  }

  cerrarStock() {
    this.cantStock = 1;
    this.modalSumarStock.close();
  }

  async gestorAgregarStock() {
    let respuesta = await this.usuarioConfirma();
    
    if (respuesta.isConfirmed) { // si el usuario confirma la creación, creamos el producto y redirigimos al stock.
      // try {
      //   await this.gestorGenerarLog();
      // }
      // catch (error) {
      //   console.log(error);
      // }
      let producto = await this.crearInstancia();
      try {
        await this.agregarStock(producto);
      }
      catch (error) {
        console.log(error);
      }
      this.mensajeExito();
      this.modalSumarStock.close();
      this.actualizarComponente();
    }
  }

  async usuarioConfirma() {
    let mensaje = '<h4>Producto: </h4> <span>' + this.unProd.nombre + '</span>\
    <h4>Items a sumar: </h4> <span>'+ this.cantStock + '</span>'

    const respuesta = await Swal.fire({
      title: 'Está usted seguro?',
      // text: mensaje,
      html: mensaje,
      icon: 'question',
      iconColor: '#DE944F',
      showCancelButton: true,
      confirmButtonText: 'Confirmado!',
      cancelButtonText: 'Cancelado',
      customClass: {
        title: 'fs-1'
      },
      confirmButtonColor: '#198754'
    })
    return respuesta;
  }

  crearInstancia(): ProductoStock {
    const nuevoStock = this.unProd.stock + this.cantStock;
    this.nuevoPrecioVenta = 0 ? this.nuevoPrecioVenta = this.unProd.precioVenta : this.nuevoPrecioVenta;
    const item = new ProductoStock(this.unProd.id, this.unProd.nombre, this.unProd.categoria, nuevoStock, this.unProd.precioCompra, this.nuevoPrecioVenta, this.unProd.stock);
    return item;
  }


  agregarStock(item: ProductoStock) {
    console.log('Esperando respuesta del servidor...');
    return new Promise((resolve, reject) => {
      // updatear
      this._StockService.alterStock(item).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      )
    })
  }

  actualizarComponente() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/consultaStock']);
    });
  }

  async gestorGenerarLog() {
    this.datosProducto = await this.traerDatosProducto();
    const log = this.crearLog();
    try {
      await this.insertLog(log);
    }
    catch (error) {
      console.log(error);
    }
  }


  traerDatosProducto() {
    return new Promise((resolve, reject) => {
      this._StockService.getUnProd(this.unProd.id).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      )
    })
  }

  crearLog(): ProductoLog {
    const fechaHora = this.obtenerFechaHora();
    let log = new ProductoLog(1, this.datosProducto.id, this.datosProducto.categoriaId,
      this.datosProducto.proveedorId, this.datosProducto.precioCompra,
      this.datosProducto.minGanancia, this.datosProducto.maxGanancia,
      this.datosProducto.precioVenta, this.datosProducto.stock, this.cantStock,
      1, this._UsuarioService.usuario.id, fechaHora);
    return log;
  }

  obtenerFechaHora(): Date {
    let date = new Date();
    let fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    let hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    let fechaHora = new Date(fecha + ' ' + hora);
    return fechaHora;
  }

  insertLog(log: ProductoLog) {
    console.log('Esperando respuesta del servidor...');
    return new Promise(resolve => {
      // insertar
      this._StockService.postLogProducto(log).subscribe(
        res => {
          resolve(res);
        },
        err => console.log(err)
      )
    })
  }
  
}
