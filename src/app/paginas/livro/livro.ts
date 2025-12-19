import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './livro.html'
})
export class Livro implements OnInit {

  listaLivros: any[] = [];

  constructor(
    private service: LivroService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef // injetando o ChangeDetectorRef para atualizar sempre em qualquer mudança
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.service.listarTodas().subscribe({
      next: (dados) => {
        this.listaLivros = dados;
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  excluirLivro(id: string): void {
    const confirmar = window.confirm('Tem certeza que deseja excluir este livro?');
    if (!confirmar) return;

    this.service.excluir(id).subscribe({
      next: () => {
        alert('Excluído com sucesso!');
        this.carregarDados(); // ao chamar, a view será atualizada com o "detectChanges"
      },
      error: err => alert('Erro ao excluir: ' + err.message)
    });

  }

}
