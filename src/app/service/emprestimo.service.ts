import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Emprestimo } from '../models/emprestimo';
import { EmprestimoDTO } from '../models/emprestimo-dto';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  private baseUrl = 'http://localhost:8080/emprestimos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.baseUrl);
  }
  buscarPorId(id: number): Observable<Emprestimo> {
    return this.http.get<Emprestimo>(`${this.baseUrl}/${id}`);
  }

  salvar(dto: EmprestimoDTO): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(this.baseUrl, dto);
  }
  atualizar(id: number, dto: EmprestimoDTO): Observable<Emprestimo> {
    return this.http.put<Emprestimo>(`${this.baseUrl}/${id}`, dto);
  }

  devolver(id: number): Observable<Emprestimo> {
    return this.http.put<Emprestimo>(`${this.baseUrl}/devolucao/${id}`, {});
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
