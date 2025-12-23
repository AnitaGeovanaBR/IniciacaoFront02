import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Livro, CriarLivroCommand } from '../../models/api-models';

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

  novoLivro: CriarLivroCommand = {
    nome: '',
    autor: '',
    edicao: '',
    editora: '',
    isbn: '',
    descricao: '',
    dataPublicacao: ''
  };

  configVisualizacao = [
    { rotulo: 'ID do Sistema', chave: 'idLivro' },
    { rotulo: 'Título', chave: 'nome' },
    { rotulo: 'Autor', chave: 'autor' },
    { rotulo: 'ISBN', chave: 'isbn' },
    { rotulo: 'Editora', chave: 'editora' },
    { rotulo: 'Edição', chave: 'edicao' },
    { rotulo: 'Publicação', chave: 'dataPublicacao' },
    { rotulo: 'Descrição', chave: 'descricao' }
  ];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

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
    if (!this.novoLivro.nome || !this.novoLivro.autor || !this.novoLivro.isbn) {
      alert('Preencha pelo menos Nome, Autor e ISBN.');
      return;
    }

    this.apiService.criarLivro(this.novoLivro).subscribe({
      next: () => {
        console.log('Livro criado');
        this.limparFormulario();
        this.carregarLivros();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar livro.');
      }
    });
  }

  limparFormulario() {
    this.novoLivro = {
      nome: '', autor: '', edicao: '', editora: '', 
      isbn: '', descricao: '', dataPublicacao: ''
    };
  }

  abrirVisualizacao(item: Livro) {
    this.itemSelecionado = item;
    this.modoModal = 'visualizar';
  }

  abrirEdicao(item: Livro) {
    this.itemSelecionado = { ...item }; 
    this.modoModal = 'editar';
  }

  abrirExclusao(item: Livro) {
    this.itemSelecionado = item;
    this.modoModal = 'excluir';
  }

  fecharModal() {
    this.itemSelecionado = null;
    this.modoModal = null;
  }

  salvarEdicao() {
    if (!this.itemSelecionado) return;
      const command: CriarLivroCommand = {
        nome: this.itemSelecionado.nome,
        autor: this.itemSelecionado.autor,
        edicao: this.itemSelecionado.edicao,
        editora: this.itemSelecionado.editora,
        isbn: this.itemSelecionado.isbn,
        descricao: this.itemSelecionado.descricao,
        dataPublicacao: this.itemSelecionado.dataPublicacao
      };

    this.apiService.atualizarLivro(this.itemSelecionado.idLivro, command).subscribe({
      next: () => {
        this.carregarLivros();
        this.fecharModal();
        this.cdr.detectChanges();
      },
      error: (err) => alert('Erro ao atualizar livro.')
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