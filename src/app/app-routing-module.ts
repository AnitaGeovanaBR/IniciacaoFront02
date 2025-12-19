import { Routes } from '@angular/router';
import { Inicio } from './paginas/inicio/inicio';
import { Biblioteca } from './paginas/biblioteca/biblioteca';
import { BibliotecaNovoComponent } from './paginas/biblioteca/biblioteca-novo/biblioteca-novo';
import { BibliotecaEditarComponent } from './paginas/biblioteca/biblioteca-editar/biblioteca-editar';
import { BibliotecaVisualizarComponent } from './paginas/biblioteca/biblioteca-visualizar/biblioteca-visualizar';

import { Livro } from './paginas/livro/livro';
import { LivroNovoComponent } from './paginas/livro/livro-novo/livro-novo';
import { LivroEditarComponent } from './paginas/livro/livro-editar/livro-editar';
import { LivroVisualizarComponent } from './paginas/livro/livro-visualizar/livro-visualizar';

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
  },
  {
    path: 'livro',
    component: Livro
  },
  {
    path: 'livro/novo',
    component: LivroNovoComponent
  },
  {
    path: 'livro/visualizar/:id',
    component: LivroVisualizarComponent
  },
  {
    path: 'livro/editar/:id',
    component: LivroEditarComponent
  }
];
