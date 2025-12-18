import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {
  private readonly API = 'http://localhost:5000/api/biblioteca'; 

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }

  buscarPorId(id: string): Observable<any> {
  return this.http.get<any>(`http://localhost:5000/api/biblioteca/${id}`);
}

  cadastrar(biblioteca: any): Observable<any> {
    return this.http.post<any>(this.API, biblioteca);
  }

  atualizar(id: string, nomeDaBiblioteca: string): Observable<any> {
  const corpo = { nome: nomeDaBiblioteca }; 
  
  return this.http.put(`http://localhost:5000/api/biblioteca/${id}`, corpo);
}

  excluir(id: string): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}
