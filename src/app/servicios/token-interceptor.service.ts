import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { UsuariosService } from '../servicios/usuarios.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _usuariosService:UsuariosService) {}

  intercept(req: { clone: (arg0: { setHeaders: { Autorization: string; }; }) => any; }, next: { handle: (arg0: any) => any; }) {

    const tokenreq = req.clone({
      setHeaders: {
        Autorization: `Bearer ${this._usuariosService.getToken()}`
      }
    })
    return next.handle(tokenreq);
  }
}
