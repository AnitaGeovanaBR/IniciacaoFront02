import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { MenuComponent } from './components/menu/menu';
import { rodape } from './components/rodape/rodape';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MenuComponent, 
    rodape         
  ],
  templateUrl: './app.html'
})
export class App { }
