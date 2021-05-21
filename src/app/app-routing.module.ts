import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaStockComponent } from './components/consulta-stock/consulta-stock.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path:'', component: LoginComponent, pathMatch: 'full' }, //ruta de login
  { path:'home', component: HomeComponent },
  { path: 'consultaStock', component: ConsultaStockComponent  },
  { path:'**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
