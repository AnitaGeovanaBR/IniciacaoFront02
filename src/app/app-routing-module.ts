import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotecaComponent } from './paginas/biblioteca/biblioteca';
import { LivroComponent } from './paginas/livro/livro';

const routes: Routes = [
  {
    component: BibliotecaComponent,
    path: ''
  },
  {
    component: BibliotecaComponent,
    path: 'biblioteca'
  },
  {
    component: LivroComponent,
    path: 'livro'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
