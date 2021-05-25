import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private _UsuariosService: UsuariosService,
    private router:Router
    ) { }
 
  user = {
    usuario:'',
    clave:''
  }

  ngOnInit(): void {
  }

  singIn() {
    this._UsuariosService.signIn(this.user).subscribe(
      res => {
        localStorage.setItem('token',res.token);
        this.router.navigate(['/home']);
      },
      err => console.log(err)
    )

  }

  
}
