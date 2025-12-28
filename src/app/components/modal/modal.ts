import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: false,
  template: `
    <div class="modal-backdrop" (click)="fechar()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        
        <div class="modal-header">
          <h3>{{ titulo }}</h3>
        </div>

        <div class="modal-body">
          <ng-content></ng-content>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); z-index: 1000;
      display: flex; justify-content: center; align-items: center;
    }
    .modal-content {
      background: white; padding: 25px; border-radius: 15px;
      width: 500px; max-width: 90%;
      box-shadow: 20px 20px 20px 20px rgba(0, 0, 0, 0.36);
    }
    .modal-header {
      display: flex; justify-content: space-between; align-items: center;
      border-bottom: 1px solid #ddd; margin-bottom: 15px;
    }
  `]
})
export class ModalComponent {
  @Input() titulo: string = '';
  @Output() aoFechar = new EventEmitter<void>();

  fechar() {
    this.aoFechar.emit();
  }
}