import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Biblioteca, CriarBibliotecaCommand, Livro, CriarLivroCommand } from '../models/api-models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5023'; 

  constructor(private http: HttpClient) { }

  // --- BIBLIOTECA ---

  getBibliotecaPorId(id: string): Observable<Biblioteca> {
    return this.http.get<Biblioteca>(`${this.apiUrl}/biblioteca/${id}`);
  }

  getBibliotecas(): Observable<Biblioteca[]> {
    return this.http.get<Biblioteca[]>(`${this.apiUrl}/biblioteca/todas`);
  }

  criarBiblioteca(command: CriarBibliotecaCommand): Observable<Biblioteca> {
    return this.http.post<Biblioteca>(`${this.apiUrl}/biblioteca`, command);
  }

  atualizarBiblioteca(id: string, command: CriarBibliotecaCommand): Observable<Biblioteca> {
    return this.http.put<Biblioteca>(`${this.apiUrl}/biblioteca/${id}`, command);
  }

  excluirBiblioteca(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/biblioteca/${id}`);
  }

  // --- LIVRO ---

  getLivroPorId(id: string): Observable<Livro> {
    return this.http.get<Livro>(`${this.apiUrl}/livro/${id}`);
  }

  criarLivro(command: CriarLivroCommand): Observable<Livro> {
    return this.http.post<Livro>(`${this.apiUrl}/livro`, command);
  }
  getLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.apiUrl}/livro/todos`);
  }
  atualizarLivro(id: string, command: CriarLivroCommand): Observable<Livro> {
    return this.http.put<Livro>(`${this.apiUrl}/livro/${id}`, command);
  }
  excluirLivro(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/livro/${id}`);
  }
}