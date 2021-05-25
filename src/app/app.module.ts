import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';

// componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ConsultaStockComponent } from './components/consulta-stock/consulta-stock.component';

//pipe
import { FilterPipe } from './pipes/filter.pipe';

//servicios
import { StockService } from './servicios/stock.service';
import { UsuariosService } from './servicios/usuarios.service'
import { TokenService } from './servicios/token.service'

//guards
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptorService } from './servicios/token-interceptor.service';
import { PopupAgregarProdComponent } from './components/popup-agregar-prod/popup-agregar-prod.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    ConsultaStockComponent,
    FilterPipe,
    PopupAgregarProdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [StockService, UsuariosService, TokenService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
