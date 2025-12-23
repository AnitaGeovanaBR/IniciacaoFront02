import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-visualizador',
  standalone: false,
  template: `
    <div class="detalhes-container">
      <div *ngFor="let item of configuracao" class="detalhe-item">
        <strong>{{ item.rotulo }}:</strong>
        <span> {{ dados ? dados[item.chave] : '-' }} </span>
      </div>
    </div>
  `,
  styles: [`
    .detalhe-item { margin-bottom: 10px; font-size: 1.1rem; border-bottom: 1px dashed #eee; padding-bottom: 5px; }
    strong { color: #555; margin-right: 5px; }
  `]
})
export class VisualizadorComponent {
  @Input() dados: any; 
  
  @Input() configuracao: { rotulo: string, chave: string }[] = [];
}