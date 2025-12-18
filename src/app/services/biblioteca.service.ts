import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private apiUrl = `${environment.apiUrl}/biblioteca`;

  constructor(private http: HttpClient) { }

  getBibliotecas(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getBiblioteca(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createBiblioteca(biblioteca: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, biblioteca).pipe(
      catchError(this.handleError)
    );
  }

  updateBiblioteca(id: string, biblioteca: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, biblioteca).pipe(
      catchError(this.handleError)
    );
  }

  deleteBiblioteca(id: string): Observable<any> {
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

