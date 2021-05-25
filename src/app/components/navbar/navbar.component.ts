import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _usuariosService: UsuariosService) { }

  ngOnInit(): void {
  }

}
