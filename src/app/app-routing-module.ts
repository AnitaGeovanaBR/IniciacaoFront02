import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BibliotecaComponent } from './paginas/biblioteca/biblioteca';
import { HomeComponent } from './paginas/home/home';
import { LivroComponent } from './paginas/livro/livro';


const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'bibliotecas', component: BibliotecaComponent },
  {path: 'livros', component: LivroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
