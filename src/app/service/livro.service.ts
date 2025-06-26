import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Livro }      from '../models/livro';

@Injectable({ providedIn: 'root' })
export class LivroService {
  private url = 'http://localhost:8080/livro';

  constructor(private http: HttpClient) {}

  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.url);
  }

  buscarPorId(id: number): Observable<Livro> {
    return this.http.get<Livro>(`${this.url}/${id}`);
  }
  salvar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.url, livro);
  }
  atualizar(id: number, livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${this.url}/${id}`, livro);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
