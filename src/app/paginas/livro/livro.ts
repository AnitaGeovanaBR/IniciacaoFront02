import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Livro, CriarLivroCommand } from '../../models/api-models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro',
  standalone: false,
  templateUrl: './livro.html',
  styleUrl: './livro.css'
})
export class LivroComponent implements OnInit {
  listaLivros: Livro[] = [];
  itemSelecionado: Livro | null = null;
  modoModal: 'visualizar' | 'editar' | 'excluir' | null = null;

  livroForm: FormGroup;

  formularioAberto: boolean = false; 

toggleFormulario() {
  this.formularioAberto = !this.formularioAberto;
}

  configVisualizacao = [
    { rotulo: 'ID do Sistema',       chave: 'idLivro'},
    { rotulo: 'Título',                 chave: 'nome'},
    { rotulo: 'Autor',                 chave: 'autor'},
    { rotulo: 'ISBN',                   chave: 'isbn'},
    { rotulo: 'Editora',             chave: 'editora'},
    { rotulo: 'Edição',               chave: 'edicao'},
    { rotulo: 'Publicação',   chave: 'dataPublicacao'},
    { rotulo: 'Descrição',         chave: 'descricao'}
  ];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.livroForm = this.fb.group({
      nome:           ['', Validators.required],
      autor:          ['', Validators.required],
      isbn:           ['', [Validators.required, Validators.pattern(/^[0-9-]+$/)]],
      editora:        ['', Validators.required],
      edicao:         ['', Validators.required],
      dataPublicacao: ['', Validators.required],
      descricao:      ['', Validators.required]
    });
    }

  ngOnInit() {
    this.carregarLivros();
  }

  carregarLivros() {
    this.apiService.getLivros().subscribe({
      next: (res) => {
        this.listaLivros = res || []; 
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar livros:', err)
    });
  }

  salvarNovoLivro() {
    if (this.livroForm.invalid) {
      this.livroForm.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }

    this.apiService.criarLivro(this.livroForm.value).subscribe({
      next: () => {
        this.livroForm.reset();
        this.carregarLivros();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao cadastrar livro.', err);
      }
    });
  }
  abrirVisualizacao(item: Livro) {
    this.itemSelecionado = item;
    this.modoModal = 'visualizar';
    const itemFormatado = { ...item }
      if (itemFormatado.dataPublicacao) {
          const data = new Date(itemFormatado.dataPublicacao);
        itemFormatado.dataPublicacao = data.toLocaleDateString('pt-BR');
      }   
  this.itemSelecionado = itemFormatado;
  this.modoModal = 'visualizar';
    
  }

  abrirEdicao(item: Livro) {
    this.itemSelecionado = { ...item }; 
    this.livroForm.patchValue(this.itemSelecionado);
    const dadosParaFormulario = { ...item };

    if (item.dataPublicacao) {
      dadosParaFormulario.dataPublicacao = new Date(item.dataPublicacao)
        .toISOString()
        .split('T')[0];
    }
    this.livroForm.patchValue(dadosParaFormulario);
    this.modoModal = 'editar';
  }

  abrirExclusao(item: Livro) {
    this.itemSelecionado = item;
    this.modoModal = 'excluir';
  }

  fecharModal() {
    this.itemSelecionado = null;
    this.modoModal = null;
    this.livroForm.reset()
  }

  salvarEdicao() {
  if (!this.itemSelecionado) return;

  if (this.livroForm.invalid) {
    this.livroForm.markAllAsTouched();
    return;
  }
 
  const dadosDoFormulario = this.livroForm.value;

  const command: CriarLivroCommand = {
    nome: dadosDoFormulario.nome,
    autor: dadosDoFormulario.autor,
    edicao: dadosDoFormulario.edicao,
    editora: dadosDoFormulario.editora,
    isbn: dadosDoFormulario.isbn,
    descricao: dadosDoFormulario.descricao,
    dataPublicacao: dadosDoFormulario.dataPublicacao
  };

  this.apiService.atualizarLivro(this.itemSelecionado.idLivro, command).subscribe({
    next: () => {
      this.carregarLivros();
      this.fecharModal();
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(err);
      alert('Erro ao atualizar livro.');
    }
    });
  }

  confirmarExclusao() {
    if (!this.itemSelecionado) return;

    this.apiService.excluirLivro(this.itemSelecionado.idLivro).subscribe({
      next: () => {
        this.carregarLivros();
        this.fecharModal();
        this.cdr.detectChanges();
      },
      error: (err) => alert('Erro ao excluir livro.')
    });
  }
}
