import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuariosService } from '../servicios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _usuariosService:UsuariosService,
              private router: Router){}

  canActivate(): boolean{
    if (this._usuariosService.loggedIn()) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
  
}
