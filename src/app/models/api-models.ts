export interface Biblioteca {
  idBiblioteca: string; 
  nome: string;
}

export interface Livro {
  idLivro: string;
  nome: string;
  autor: string;
  edicao: string;
  editora: string;
  isbn: string;
  descricao?: string;
  dataPublicacao: string; 
}

export interface CriarBibliotecaCommand {
  nome: string;
}

export interface CriarLivroCommand {
  nome: string;
  autor: string;
  edicao: string;
  editora: string;
  isbn: string;
  descricao?: string;
  dataPublicacao: string;
}