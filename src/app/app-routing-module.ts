import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Inicio } from './paginas/inicio/inicio';
import { biblioteca } from './paginas/biblioteca/biblioteca';
import { BibliotecaVisualizarComponent } from './paginas/biblioteca/biblioteca-visualizar/biblioteca-visualizar';
import { BibliotecaEditarComponent } from './paginas/biblioteca/biblioteca-editar/biblioteca-editar';
import { BibliotecaNovoComponent } from './paginas/biblioteca/biblioteca-novo/biblioteca-novo';

export const routes: Routes = [
  {
    path: '', 
    component: Inicio
  },
  {
    path: 'biblioteca', 
    component: biblioteca
  },
  { path: 'biblioteca/novo',
  component: BibliotecaNovoComponent
  },
  { 
    path: 'biblioteca/visualizar/:id',
    component: BibliotecaVisualizarComponent
  },
  { 
    path: 'biblioteca/editar/:id',
    component: BibliotecaEditarComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
