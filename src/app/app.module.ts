
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';


import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './componentes/navbar/navbar.component';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './service/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HeaderComponent } from './componentes/shared/header/header.component';
import { FooterComponent } from './componentes/shared/footer/footer.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';

import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { FacturaComponent } from './componentes/factura/factura.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClienteComponent,
    HeaderComponent,
    FooterComponent,
    CategoriaComponent,
    ProductoComponent,
    UsuarioComponent,
    FacturaComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
