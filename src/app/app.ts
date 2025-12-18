import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MenuComponent } from './components/menu/menu';
import { RodapeComponent } from './components/rodape/rodape';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuComponent,
    RodapeComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
