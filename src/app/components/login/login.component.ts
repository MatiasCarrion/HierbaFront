import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _UsuariosService: UsuariosService,
    private router: Router
  ) { }

  user = {
    usuario: '',
    clave: ''
  }

  ngOnInit(): void {
  }

  singIn() {
    this._UsuariosService.signIn(this.user).subscribe(
      res => {
        sessionStorage.setItem('token', res.token);
        this.procesoExitoso();
      },
      err => console.log(err)
    )

  }

  getUsuario(usuario: string) {
    return new Promise((resolve, reject) => {
      this._UsuariosService.getUser(usuario).subscribe(
        res => {
          resolve(res);
        },
        err => {
          reject(err);
        }
      )
    })
  }

  async procesoExitoso() {
    this._UsuariosService.usuario = await this.getUsuario(this.user.usuario);
    await this.mensajeExito();
    this.router.navigate(['/consultaStock']);
  }

  mensajeError() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Datos Incorrectos!',
      showConfirmButton: false,
      timer: 1000,
      // backdrop: 'rgb(255,255,255)',
      // customClass: {
      //   popup: 'border'
      // }
    })
  }

  async mensajeExito() {
    await Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Bienvenido ' + this.user.usuario,
      showConfirmButton: false,
      timer: 1000
    })
  }
}
