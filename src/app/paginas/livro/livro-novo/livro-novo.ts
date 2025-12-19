import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LivroService } from '../../../services/livro.service';

@Component({
  selector: 'app-livro-novo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './livro-novo.html'
})
export class LivroNovoComponent {
  novoLivro = {
    nome: '',
    autor: '',
    edicao: '',
    editora: '',
    isbn: '',
    descricao: '',
    dataPublicacao: ''
  };

  constructor(private service: LivroService, private router: Router) {}

  salvar() {
    this.service.cadastrar(this.novoLivro).subscribe({
      next: () => {
        alert('Livro salvo com sucesso!');
        this.router.navigate(['/livro']);
      },
      error: (err: any) => {
        console.error(err);
        alert('Erro ao salvar o livro. Verifique os campos e tente novamente.');
      }
    });
  }
}
