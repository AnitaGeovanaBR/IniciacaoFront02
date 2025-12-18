import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private apiUrl = `${environment.apiUrl}/livro`;

  constructor(private http: HttpClient) { }

  getLivros(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getLivro(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createLivro(livro: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, livro).pipe(
      catchError(this.handleError)
    );
  }

  updateLivro(id: string, livro: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, livro).pipe(
      catchError(this.handleError)
    );
  }

  deleteLivro(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'Ocorreu um erro ao processar a solicitação';

    if (error.error instanceof ErrorEvent) {
      // Erro de rede
      errorMessage = `Erro de rede: ${error.error.message}`;
    } else if (error.status === 0) {
      // Conexão recusada
      errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
    } else if (error.status === 404) {
      errorMessage = 'Recurso não encontrado (404)';
    } else if (error.status === 500) {
      errorMessage = 'Erro no servidor (500)';
    } else if (error.status === 400) {
      errorMessage = error.error?.message || 'Requisição inválida (400)';
    } else if (error.status) {
      errorMessage = `Erro ${error.status}: ${error.statusText}`;
    }

    console.error('Erro na API:', error);
    return throwError(() => new Error(errorMessage));
  }
}

