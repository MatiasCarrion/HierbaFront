import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { StockService } from './../../servicios/stock.service';
import { Router } from '@angular/router'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-producto-nuevo',
  templateUrl: './producto-nuevo.component.html',
  styleUrls: ['./producto-nuevo.component.css']
})
export class ProductoNuevoComponent implements OnInit {

  listadoCategorias: Categoria[] = [];
  idSeleccionado: any;
  nombreCatSeleccionado: string = '';

  // atributos para crear un objeto producto.
  nombreProducto: string = '';
  categoriaId: number = 0;
  proveedorId: number = 0;
  precioCompra!: number;
  minGanancia: number = 0.2;
  maxGanancia: number = 0.4;
  precioVenta!: number;
  stock: number = 1;



  constructor(private _StockService: StockService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarCategorias();
  }

  listarCategorias() {
    this._StockService.getCategorias().subscribe(
      res => {
        this.agregarAlListado(res);
      },
      err => console.log(err)
    )
  }

  agregarAlListado(arrayCategorias: any) {

    for (let unaCategoria of arrayCategorias) {
      this.listadoCategorias.push(unaCategoria);
    }
  }

  async gestorNuevoProducto() {
    this.buscarNombreCategoria();
    if (this.sinVacios() && this.sinCeros()) {
      let respuesta = await this.usuarioConfirma();
      if (respuesta.isConfirmed) { // si el usuario confirma la creación, creamos el producto y redirigimos al stock.
        let producto = this.crearInstancia();
        this.crearProducto(producto);
        this.mensajeConfirmado();
        this.router.navigate(['/consultaStock']);
      }

    }
    else {
      this.mensajeErrorDatos();
    }
  }

  buscarNombreCategoria() {

    for (let cat of this.listadoCategorias) {
      if (cat.id == this.idSeleccionado) {
        this.nombreCatSeleccionado = cat.nombre;
        break;
      }
    }
  }
  
  async usuarioConfirma() {

    let mensaje = '<h4>Producto: </h4> <span>' + this.nombreProducto.toUpperCase() + '</span>\
                <h4>Categoria: </h4> <span>'+ this.nombreCatSeleccionado.toUpperCase() + '</span>\
                <h4>Cantidad: </h4> <span>'+ this.stock + '</span>\
                <h4>Precio Compra: </h4> <span>$'+ this.precioCompra + '</span>\
                <h4>Precio Venta: </h4> <span>$'+ this.precioVenta + '</span>';

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

  crearInstancia(): Producto {
    let id = this.listadoCategorias.length + 1;
    let producto = new Producto(id, this.nombreProducto.toUpperCase(), this.idSeleccionado, this.proveedorId, this.precioCompra, this.minGanancia, this.maxGanancia, this.precioVenta, this.stock);
    return producto;
  }
  
  crearProducto(unProducto: Producto) {

    this._StockService.postProducto(unProducto).subscribe(
      res => {
        this.resetCampos();
      },
      err => console.log(err)
    )
  }

  mensajeConfirmado() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto creado exitosamente!',
      showConfirmButton: false,
      timer: 2000
    })
  }

  mensajeErrorDatos() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Faltan datos!',
      showConfirmButton: false,
      timer: 1000
    })
  }

  
  sinVacios(): boolean {

    if (this.nombreProducto != '') {
      return true;
    }
    else {
      return false;
    }

  }

  sinCeros(): boolean {

    if (this.idSeleccionado != 0 && this.precioCompra != 0 && this.precioVenta != 0 && this.stock != 0 &&
      this.idSeleccionado != undefined && this.precioCompra != undefined && this.precioVenta != undefined &&
      this.stock != undefined) {

      return true;
    }
    else {
      return false;
    }
  }

  resetCampos() {
    this.nombreProducto = '';
    this.idSeleccionado = 0;
    this.stock = 0;
    this.precioCompra = 0;
    this.precioVenta = 0;
  }

}
