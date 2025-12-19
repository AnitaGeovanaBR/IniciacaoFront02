import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { LivroService } from '../../../services/livro.service';

@Component({
  selector: 'app-livro-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './livro-editar.html'
})
export class LivroEditarComponent implements OnInit {
  idLivro!: string;
  nomeLivroOriginal: string = '';
  
  livro: any = {
    nome: '',
    autor: '',
    edicao: '',
    editora: '',
    isbn: '',
    descricao: '',
    dataPublicacao: ''
  };

  constructor(
    private service: LivroService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idLivro = id;
      this.service.buscarPorId(id).subscribe({
        next: (res: any) => {
          this.nomeLivroOriginal = res.nome;
          this.livro = { ...res };
          
          if (this.livro.dataPublicacao) {
            this.livro.dataPublicacao = this.livro.dataPublicacao.split('T')[0]; //input do tipo DateTime, interessante para facilitar a busca.
          }
          
          this.cdr.detectChanges();
        },
        error: (err: any) => alert('Erro ao carregar livro: ' + err.message)
      });
    }
  }

  salvarEdicao(): void {
    this.service.atualizar(this.idLivro, this.livro).subscribe({
      next: () => {
        alert('Livro atualizado com sucesso!');
        this.router.navigate(['/livro']);
      },
      error: (err: any) => alert('Erro ao salvar: ' + err.message)
    });
  }
}
