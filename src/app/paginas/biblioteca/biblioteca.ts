import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Biblioteca, CriarBibliotecaCommand } from '../../models/api-models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-biblioteca',
  standalone: false, 
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.css',
})
export class BibliotecaComponent implements OnInit {
  listaBibliotecas: Biblioteca[] = [];
  
  bibliotecaForm: FormGroup; 
  formularioAberto: boolean = false;
  toggleFormulario() {
    this.formularioAberto = !this.formularioAberto;
  }

  itemSelecionado: Biblioteca | null = null;
  modoModal: 'visualizar' | 'editar' | 'excluir' | null = null;
  
  configVisualizacao = [
    { rotulo: 'ID do Sistema', chave: 'idBiblioteca' },
    { rotulo: 'Nome da Biblioteca', chave: 'nome' }
  ];
  
  nomeNovaBiblioteca: string = ''; 

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder 
  ) {
    this.bibliotecaForm = this.fb.group({
    nome: ['', Validators.required]
  });
  }

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
  if (this.bibliotecaForm.invalid) {
    this.bibliotecaForm.markAllAsTouched();
    this.cdr.detectChanges();
    return;
  }

  const comando: CriarBibliotecaCommand = this.bibliotecaForm.value;

  this.apiService.criarBiblioteca(comando).subscribe({
    next: (res) => {
      this.bibliotecaForm.reset(); 
      this.carregarBibliotecas();
      this.cdr.detectChanges();
    },
    error: (err) => alert('Erro ao criar biblioteca.')
  });
    
  }

  abrirVisualizacao(item: Biblioteca) {
    this.itemSelecionado = item;
    this.modoModal = 'visualizar';
  }

  abrirEdicao(item: Biblioteca) {
  this.itemSelecionado = { ...item };
  this.bibliotecaForm.patchValue({ nome: item.nome });
  this.modoModal = 'editar';
}

  abrirExclusao(item: Biblioteca) {
    this.itemSelecionado = item;
    this.modoModal = 'excluir';
  }

  fecharModal() {
  this.itemSelecionado = null;
  this.modoModal = null;
  this.bibliotecaForm.reset();
}

  salvarEdicao() {
  if (!this.itemSelecionado || this.bibliotecaForm.invalid) {
    this.bibliotecaForm.markAllAsTouched();
    return;
  }

  const comando: CriarBibliotecaCommand = { 
    nome: this.bibliotecaForm.value.nome 
  };

  this.apiService.atualizarBiblioteca(this.itemSelecionado.idBiblioteca, comando).subscribe({
    next: () => {
      this.carregarBibliotecas();
      this.fecharModal();
      this.cdr.detectChanges();
    },
    error: (err) => alert('Erro ao atualizar biblioteca.')
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