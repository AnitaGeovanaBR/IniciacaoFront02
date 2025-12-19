import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly API = 'http://localhost:5000/api/livro'; 

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  buscarPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  cadastrar(livro: any): Observable<any> {
    return this.http.post<any>(this.API, livro);
  }

  atualizar(id: string, livro: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, livro);
  }

  excluir(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
