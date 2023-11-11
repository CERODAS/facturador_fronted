import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './componentes/shared/header/header.component';
import { FooterComponent } from './componentes/shared/footer/footer.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';

import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { FacturaComponent } from './componentes/factura/factura.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    HeaderComponent,
    FooterComponent,
    CategoriaComponent,
    ProductoComponent,
    UsuarioComponent,
    FacturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
