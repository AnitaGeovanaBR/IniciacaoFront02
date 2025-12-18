import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BibliotecaService } from '../../services/biblioteca.service';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './biblioteca.html'
})
export class biblioteca implements OnInit {
  listaBibliotecas: any[] = [];

  constructor(private service: BibliotecaService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
  this.listaBibliotecas = []; 

  this.service.listarTodas().subscribe({
    next: (dados) => {
      this.listaBibliotecas = dados;
    },
    error: (err) => console.error(err)
  });
}

  excluirBiblioteca(id: string): void {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta biblioteca?");
    if (confirmar) {
      this.service.excluir(id).subscribe({
        next: () => {
          alert("Excluído com sucesso!");
          this.carregarDados();
        },
        error: (err: any) => alert("Erro ao excluir: " + err.message)
      });
    }
  }
}
