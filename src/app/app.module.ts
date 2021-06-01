import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { VentaComponent } from './components/venta/venta.component';
import { VentaService } from './servicios/venta.service';

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
    PopupAgregarProdComponent,
    VentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [StockService, UsuariosService, TokenService, AuthGuard, VentaService,{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
