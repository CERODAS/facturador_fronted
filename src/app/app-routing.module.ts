import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './componentes/cliente/cliente.component';
import { CategoriaComponent } from './componentes/categoria/categoria.component';
import { ProductoComponent } from './componentes/producto/producto.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';

const routes: Routes = [
  {path: 'cliente', component: ClienteComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'usuario', component: UsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
