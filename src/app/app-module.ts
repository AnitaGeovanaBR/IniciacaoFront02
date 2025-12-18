import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MenuComponent } from './components/menu/menu';
import { BibliotecaComponent } from './paginas/biblioteca/biblioteca';
import { LivroComponent } from './paginas/livro/livro';
import { NotificationsComponent } from './components/notifications/notifications';

@NgModule({
  declarations: [
    App,
    MenuComponent,
    BibliotecaComponent,
    LivroComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
