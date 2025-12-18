import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BibliotecaService } from '../../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca-novo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './biblioteca-novo.html' 
})
export class BibliotecaNovoComponent {
  novaBiblioteca = { nome: '' };

  constructor(private service: BibliotecaService, private router: Router) {}

  salvar() {
    this.service.cadastrar(this.novaBiblioteca).subscribe({
      next: () => {
        alert('Biblioteca salva com sucesso!');
        this.router.navigate(['/biblioteca']);
      },
      error: (err) => alert('Erro ao salvar: ' + err.message)
    });
  }
}
