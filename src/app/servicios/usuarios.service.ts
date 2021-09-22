import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario'


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  usuario: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'responseType' : 'json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Headers' : 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
      'Access-Control-Allow-Methods' : 'GET, POST, OPTIONS, PUT, DELETE',
      'Allow' : 'GET, POST, OPTIONS, PUT, DELETE'
    }),
  };

  constructor(private http: HttpClient, private router: Router) { }

  //ruta de la api
  url = 'https://hb-growshop-backend.herokuapp.com/api/user';
  urlSignIn = 'https://hb-growshop-backend.herokuapp.com/api/user/signin';

  // post user
  signIn(user: any) {
    // console.log(user);
    return this.http.post<any>(this.urlSignIn, user, { ...this.httpOptions });
  }

  getUser(user: string) {
    return this.http.get(this.url + '/' + user);
  }

  loggedIn() {
    if (sessionStorage.getItem('token')) {
      return true
    }
    else {
      return false
    }
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
