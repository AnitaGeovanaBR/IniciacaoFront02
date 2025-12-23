import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Biblioteca, CriarBibliotecaCommand } from '../../models/api-models';

@Component({
  selector: 'app-biblioteca',
  standalone: false, 
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.css',
})
export class BibliotecaComponent implements OnInit {
  listaBibliotecas: Biblioteca[] = [];

  itemSelecionado: Biblioteca | null = null;
  modoModal: 'visualizar' | 'editar' | 'excluir' | null = null;
  
  configVisualizacao = [
    { rotulo: 'ID do Sistema', chave: 'idBiblioteca' },
    { rotulo: 'Nome da Biblioteca', chave: 'nome' }
  ];
  
  nomeNovaBiblioteca: string = ''; 

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarBibliotecas();
  }

  carregarBibliotecas() {
    this.apiService.getBibliotecas().subscribe({
      next: (res) => {
        this.listaBibliotecas = res;
        console.log('Lista atualizada:', res);
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Erro ao carregar:', err)
    });
  }

  salvarBiblioteca() {
    if (!this.nomeNovaBiblioteca.trim()) {
      alert('Por favor, digite um nome.');
      return;
    }

    const comando: CriarBibliotecaCommand = { nome: this.nomeNovaBiblioteca };

    this.apiService.criarBiblioteca(comando).subscribe({
      next: (res) => {
        console.log('Biblioteca criada:', res);
        this.nomeNovaBiblioteca = ''; 
        this.carregarBibliotecas();   
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao criar:', err);
        alert('Erro ao criar biblioteca.');
      }
    });
  }

  abrirVisualizacao(item: Biblioteca) {
    this.itemSelecionado = item;
    this.modoModal = 'visualizar';
  }

  abrirEdicao(item: Biblioteca) {
    this.itemSelecionado = { ...item }; 
    this.modoModal = 'editar';
  }

  abrirExclusao(item: Biblioteca) {
    this.itemSelecionado = item;
    this.modoModal = 'excluir';
  }

  fecharModal() {
    this.itemSelecionado = null;
    this.modoModal = null;
  }

  salvarEdicao() {
    if (!this.itemSelecionado) return;

    const comando: CriarBibliotecaCommand = { nome: this.itemSelecionado.nome };

    this.apiService.atualizarBiblioteca(this.itemSelecionado.idBiblioteca, comando).subscribe({
      next: () => {
        console.log('Biblioteca atualizada');
        this.carregarBibliotecas();
        this.fecharModal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao editar:', err);
        alert('Erro ao atualizar biblioteca.');
      }
    });
  }

  confirmarExclusao() {
    if (!this.itemSelecionado) return;

    this.apiService.excluirBiblioteca(this.itemSelecionado.idBiblioteca).subscribe({
      next: () => {
        console.log('Excluída com sucesso');
        this.carregarBibliotecas();
        this.fecharModal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao excluir:', err);
        alert('Erro ao excluir. Verifique se existem livros vinculados.');
        this.fecharModal();
      }
    });
  }
}