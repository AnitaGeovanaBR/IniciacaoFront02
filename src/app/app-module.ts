import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { BibliotecaComponent } from './paginas/biblioteca/biblioteca';
import { MenuComponent } from './components/menu/menu';
import { HomeComponent } from './paginas/home/home';
import { Rodape } from './components/rodape/rodape';
import { ModalComponent } from './components/modal/modal';
import { VisualizadorComponent } from './components/visualizador/visualizador';
import { LivroComponent } from './paginas/livro/livro';
 

@NgModule({
  declarations: [
    App,
    BibliotecaComponent,
    MenuComponent,
    HomeComponent,
    Rodape,
    ModalComponent,
    VisualizadorComponent,
    LivroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
