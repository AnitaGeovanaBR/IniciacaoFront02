import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './biblioteca.html'
})
export class Biblioteca implements OnInit {

  listaBibliotecas: any[] = [];

  constructor(
    private service: BibliotecaService,
    private cdr: ChangeDetectorRef // injetando o ChangeDetectorRef para atualizar sempre em qualquer mudança
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.service.listarTodas().subscribe({
      next: (dados) => {
        this.listaBibliotecas = dados;
        this.cdr.detectChanges();
      },
      error: err => console.error(err)
    });
  }

  excluirBiblioteca(id: string): void {
    const confirmar = window.confirm('Tem certeza que deseja excluir esta biblioteca?');
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
