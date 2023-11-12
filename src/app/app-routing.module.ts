import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { FacturaComponent } from './componentes/factura/factura.component';

const routes: Routes = [
  {path: 'cliente', component: ClienteComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'factura', component: FacturaComponent},
  {
    path : '',
    component : HomeComponent,
    pathMatch : 'full'
  },
  
  {
    path : 'login',
    component : HomeComponent,
    pathMatch : 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
