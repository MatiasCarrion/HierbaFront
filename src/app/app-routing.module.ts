import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaStockComponent } from './components/consulta-stock/consulta-stock.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductoNuevoComponent } from './components/producto-nuevo/producto-nuevo.component';
import { VentaComponent } from './components/venta/venta.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path:'', component: LoginComponent, pathMatch: 'full' }, //ruta de login
  { path:'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'consultaStock', component: ConsultaStockComponent, canActivate: [AuthGuard] },
  { path: 'productoNuevo', component: ProductoNuevoComponent},
  { path: 'presupuesto', component: VentaComponent, canActivate: [AuthGuard] },
  { path:'**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }