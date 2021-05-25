import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private router:Router) { }

  //ruta de la api
  url = '/api/user/signin';

  // post user
  signIn(user: any) {
    return this.http.post<any>(this.url, user);
  }

  loggedIn() {
    if (localStorage.getItem('token')){
      return true
    }
    else {
      return false
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
