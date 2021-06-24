import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _usuariosService: UsuariosService) { }

  ngOnInit(): void {
  }

  async salir() {
    await this.mensajeAdios();
    this._usuariosService.logout()
  }

  async mensajeAdios() {
    await Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Hasta pronto!',
      showConfirmButton: false,
      timer: 1000
    })
  }
}
