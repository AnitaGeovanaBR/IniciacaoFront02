import { Routes } from '@angular/router';
import { Inicio } from './paginas/inicio/inicio';
import { Biblioteca } from './paginas/biblioteca/biblioteca';
import { BibliotecaNovoComponent } from './paginas/biblioteca/biblioteca-novo/biblioteca-novo';
import { BibliotecaEditarComponent } from './paginas/biblioteca/biblioteca-editar/biblioteca-editar';
import { BibliotecaVisualizarComponent } from './paginas/biblioteca/biblioteca-visualizar/biblioteca-visualizar';

export const routes: Routes = [
  {
    path: '',
    component: Inicio,
  },
  {
    path: 'biblioteca',
    component: Biblioteca
  },
  {
    path: 'biblioteca/novo',
    component: BibliotecaNovoComponent
  },
  {
    path: 'biblioteca/visualizar/:id',
    component: BibliotecaVisualizarComponent
  },
  {
    path: 'biblioteca/editar/:id',
    component: BibliotecaEditarComponent
  }
];
